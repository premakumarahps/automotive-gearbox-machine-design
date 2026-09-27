/**
 * Interactive Gearbox Kinematics, Dynamics & Stress Engine
 * Grounded in ME3813 Final Design Report & ASME Shaft Standards
 */

import { VEHICLE_PARAMS, ENGINE_SPECS, GEAR_STAGES, type GearStageData } from './gearboxData';

export interface SimulationState {
  engineRpm: number;
  selectedGear: number; // -1: Reverse, 0: Neutral, 1..5: Forward
  roadInclineDeg: number;
  vehicleGrossMassKg: number;
}

export interface SimulationResults {
  engineTorqueNm: number;
  enginePowerKw: number;
  inputShaftRpm: number;
  layShaftRpm: number;
  outputShaftRpm: number;
  wheelRpm: number;
  vehicleSpeedKmph: number;
  outputTorqueNm: number;
  wheelTorqueNm: number;
  tractionForceN: number;
  rollingResistanceN: number;
  gradeResistanceN: number;
  aeroResistanceN: number;
  totalResistanceN: number;
  netExcessForceN: number;
  accelerationMs2: number;
  activeGearData: GearStageData | null;
  pitchLineVelocityMs: number;
  tangentialToothForceN: number;
  radialToothForceN: number;
  lewisBendingStressMpa: number;
  allowableStressMpa: number;
  stressSafetyFactor: number;
  isEngineOverRev: boolean;
  isEngineStalling: boolean;
  powerFlowDescription: string;
}

/**
 * Cummins L375-30 Engine Torque Curve Interpolation
 */
export function getEngineTorque(rpm: number): number {
  if (rpm < 600) return 0; // Stalled
  if (rpm < 1100) {
    // Torque buildup from idle (800 rpm: ~1050 Nm to 1100 rpm: 1480 Nm)
    return 1000 + ((rpm - 800) / 300) * 480;
  }
  if (rpm <= 1400) {
    // Peak flat torque plateau
    return 1480;
  }
  if (rpm <= 2100) {
    // Gradual rolloff from 1480 Nm @ 1400 rpm to 1250 Nm @ 2100 rpm
    return 1480 - ((rpm - 1400) / 700) * 230;
  }
  // Rapid decay past rated redline (2100-2400)
  return Math.max(0, 1250 - ((rpm - 2100) / 300) * 500);
}

export function computeGearboxSimulation(state: SimulationState): SimulationResults {
  const { engineRpm, selectedGear, roadInclineDeg, vehicleGrossMassKg } = state;

  const engineTorqueNm = getEngineTorque(engineRpm);
  const enginePowerKw = (2 * Math.PI * engineRpm * engineTorqueNm) / (60 * 1000);

  const inputShaftRpm = engineRpm;
  // Drive pair is 42T / 42T, ratio = 1.0
  const layShaftRpm = inputShaftRpm;

  let activeGearData: GearStageData | null = null;
  let gearboxRatio = 0;
  let powerFlowDescription = 'Neutral - Output shaft disengaged. Gears spin freely on bearings.';

  if (selectedGear === 0) {
    gearboxRatio = 0;
  } else {
    activeGearData = GEAR_STAGES.find(g => g.gearNumber === selectedGear) || null;
    if (activeGearData) {
      gearboxRatio = activeGearData.gearboxRatio;
      if (selectedGear === -1) {
        powerFlowDescription = 'Reverse Gear engaged: Input -> Layshaft -> Idler Gear (18T) -> Output Gear k (33T). Direction inverted.';
      } else {
        powerFlowDescription = `${activeGearData.gearName} engaged: Input -> Layshaft -> ${activeGearData.driverGear} -> ${activeGearData.drivenGear} -> Dog Clutch -> Output Shaft.`;
      }
    }
  }

  // Output Shaft Speed
  let outputShaftRpm = 0;
  if (selectedGear !== 0 && gearboxRatio > 0) {
    if (selectedGear === -1) {
      outputShaftRpm = -layShaftRpm / gearboxRatio;
    } else {
      outputShaftRpm = layShaftRpm / gearboxRatio;
    }
  }

  // Wheel Speed & Linear Velocity
  const wheelRpm = outputShaftRpm / VEHICLE_PARAMS.differentialRatio;
  const wheelLinearVelocityMs = (2 * Math.PI * VEHICLE_PARAMS.tireRadiusM * Math.abs(wheelRpm)) / 60;
  const vehicleSpeedKmph = wheelLinearVelocityMs * 3.6;

  // Torques & Efficiencies
  const gearboxEfficiency = selectedGear === 0 ? 0 : 0.96;
  const differentialEfficiency = 0.95;

  let outputTorqueNm = 0;
  let wheelTorqueNm = 0;
  let tractionForceN = 0;

  if (selectedGear !== 0 && gearboxRatio > 0) {
    outputTorqueNm = engineTorqueNm * gearboxRatio * gearboxEfficiency;
    wheelTorqueNm = outputTorqueNm * VEHICLE_PARAMS.differentialRatio * differentialEfficiency;
    tractionForceN = wheelTorqueNm / VEHICLE_PARAMS.tireRadiusM;
  }

  // Environmental Resistances
  const g = 9.81;
  const inclineRad = (roadInclineDeg * Math.PI) / 180;
  const rollingResistanceCoeff = 0.015;
  const rollingResistanceN = rollingResistanceCoeff * vehicleGrossMassKg * g * Math.cos(inclineRad);
  const gradeResistanceN = vehicleGrossMassKg * g * Math.sin(inclineRad);

  const airDensity = 1.225; // kg/m^3
  const aeroResistanceN = 0.5 * airDensity * VEHICLE_PARAMS.dragCoefficient * VEHICLE_PARAMS.frontalAreaM2 * Math.pow(wheelLinearVelocityMs, 2);

  const totalResistanceN = rollingResistanceN + gradeResistanceN + aeroResistanceN;
  const netExcessForceN = selectedGear === 0 ? -totalResistanceN : tractionForceN - totalResistanceN;
  const accelerationMs2 = netExcessForceN / vehicleGrossMassKg;

  // Tooth Stress & Pitch Line Mechanics
  let pitchLineVelocityMs = 0;
  let tangentialToothForceN = 0;
  let radialToothForceN = 0;
  let lewisBendingStressMpa = 0;
  const allowableStressMpa = 800; // AISI 8620 Case Hardened

  if (activeGearData) {
    const pitchDiaM = activeGearData.pitchDiaDriverMm / 1000;
    pitchLineVelocityMs = (Math.PI * pitchDiaM * layShaftRpm) / 60;
    
    // Torque on the driving gear on lay shaft
    const drivingTorqueNm = engineTorqueNm;
    tangentialToothForceN = (2 * drivingTorqueNm) / pitchDiaM;
    radialToothForceN = tangentialToothForceN * Math.tan((20 * Math.PI) / 180);

    const faceWidthMm = 40; // 40mm standard face width from report
    const moduleMm = 5;
    const velocityFactorCv = 3 / (3 + pitchLineVelocityMs);
    const lewisFactorY = activeGearData.lewisFormFactorY;

    // Lewis Formula: sigma = W_t / (b * m * y * Cv)
    if (faceWidthMm > 0 && moduleMm > 0 && lewisFactorY > 0 && velocityFactorCv > 0) {
      lewisBendingStressMpa = tangentialToothForceN / (faceWidthMm * moduleMm * lewisFactorY * velocityFactorCv);
    }
  }

  const stressSafetyFactor = lewisBendingStressMpa > 0 
    ? Math.min(10, allowableStressMpa / lewisBendingStressMpa) 
    : 10;

  const isEngineOverRev = engineRpm > ENGINE_SPECS.redlineRpm;
  const isEngineStalling = engineRpm < 700;

  return {
    engineTorqueNm,
    enginePowerKw,
    inputShaftRpm,
    layShaftRpm,
    outputShaftRpm,
    wheelRpm,
    vehicleSpeedKmph,
    outputTorqueNm,
    wheelTorqueNm,
    tractionForceN,
    rollingResistanceN,
    gradeResistanceN,
    aeroResistanceN,
    totalResistanceN,
    netExcessForceN,
    accelerationMs2,
    activeGearData,
    pitchLineVelocityMs,
    tangentialToothForceN,
    radialToothForceN,
    lewisBendingStressMpa,
    allowableStressMpa,
    stressSafetyFactor,
    isEngineOverRev,
    isEngineStalling,
    powerFlowDescription,
  };
}
