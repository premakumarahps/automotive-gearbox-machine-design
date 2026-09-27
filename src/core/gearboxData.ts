/**
 * ME3813: Machine Element Design - Industrial 5-Speed Manual Gearbox
 * Academic Submission: TechGear WKS (Group 11)
 * Authors:
 *  - Premakumara H.P.S. (Index: 210494D) - Mechanical System Design & Analysis
 *  - Themiya K.L. (Index: 210640A) - Group Lead
 *  - Udayakantha D.A.W.I. (Index: 210660J) - Member
 * Department of Mechanical Engineering, University of Moratuwa, Sri Lanka
 */

export interface VehicleParameters {
  model: string;
  curbWeightKg: number;
  passengerWeightKg: number;
  totalGrossWeightKg: number;
  maxSpeedKmph: number;
  gradeabilitySpeedKmph: number;
  gradeAngleDeg: number;
  dragCoefficient: number;
  frontalAreaM2: number;
  widthMm: number;
  heightMm: number;
  tireSpec: string;
  tireRadiusM: number;
  tireLoadIndex: number;
  tireSpeedSymbol: string;
  differentialRatio: number;
  centerDistanceMm: number;
  gearModuleMm: number;
  pressureAngleDeg: number;
}

export const VEHICLE_PARAMS: VehicleParameters = {
  model: 'Toyota Highlander (5-Speed Manual Conversion)',
  curbWeightKg: 2050,
  passengerWeightKg: 500, // 5 passengers @ 100 kg
  totalGrossWeightKg: 2550,
  maxSpeedKmph: 170, // Tested capability up to 180 km/h
  gradeabilitySpeedKmph: 35,
  gradeAngleDeg: 30,
  dragCoefficient: 0.34,
  frontalAreaM2: 2.87, // 1.93m width * 1.755m height * 0.85
  widthMm: 1930,
  heightMm: 1755,
  tireSpec: '235/55R20',
  tireRadiusM: 0.38325,
  tireLoadIndex: 104, // 900 kg / wheel rating
  tireSpeedSymbol: 'T', // 190 km/h rating
  differentialRatio: 3.605,
  centerDistanceMm: 210, // a = m * (T1 + T2) / 2 = 5 * 84 / 2 = 210 mm
  gearModuleMm: 5,
  pressureAngleDeg: 20,
};

export interface EngineSpecification {
  model: string;
  maxPowerKw: number;
  maxTorqueNm: number;
  ratedRpm: number;
  peakTorqueRpmRange: [number, number];
  optimumRpmRange: [number, number];
  redlineRpm: number;
}

export const ENGINE_SPECS: EngineSpecification = {
  model: 'Dongfeng Cummins L375-30 Turbocharged Intercooled Diesel',
  maxPowerKw: 275, // 375 hp @ 2100 rpm
  maxTorqueNm: 1480, // Peak torque @ 1100-1400 rpm
  ratedRpm: 2100,
  peakTorqueRpmRange: [1100, 1400],
  optimumRpmRange: [1100, 1600],
  redlineRpm: 2200,
};

export interface GearStageData {
  gearNumber: number;
  gearName: string;
  gearboxRatio: number;
  totalCombinedRatio: number;
  driverGear: string;
  drivenGear: string;
  teethDriver: number;
  teethDriven: number;
  pitchDiaDriverMm: number;
  pitchDiaDrivenMm: number;
  wheelRpmAt1600: number;
  vehicleSpeedKmph: number;
  outputTorqueNm: number;
  wheelTorqueNm: number;
  tractionForceN: number;
  requiredTractionN: number;
  tractionSafetyFactor: number;
  pitchLineVelocityMs: number;
  velocityFactorCv: number;
  lewisFormFactorY: number;
  tangentialLoadWtN: number;
  allowableStaticStressMpa: number;
  maxAllowableTensileStrengthMpa: number;
  status: 'SAFE';
}

export const GEAR_STAGES: GearStageData[] = [
  {
    gearNumber: 1,
    gearName: '1st Gear',
    gearboxRatio: 1.800, // 54 / 30
    totalCombinedRatio: 6.489,
    driverGear: 'Gear b (30T)',
    drivenGear: 'Gear a (54T)',
    teethDriver: 30,
    teethDriven: 54,
    pitchDiaDriverMm: 150,
    pitchDiaDrivenMm: 270,
    wheelRpmAt1600: 243,
    vehicleSpeedKmph: 35.0,
    outputTorqueNm: 3167.64,
    wheelTorqueNm: 11425.91,
    tractionForceN: 30068,
    requiredTractionN: 12915,
    tractionSafetyFactor: 2.33,
    pitchLineVelocityMs: 12.57,
    velocityFactorCv: 0.323,
    lewisFormFactorY: 0.137,
    tangentialLoadWtN: 21078.45,
    allowableStaticStressMpa: 482.0,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  },
  {
    gearNumber: 2,
    gearName: '2nd Gear',
    gearboxRatio: 1.270, // 47 / 37
    totalCombinedRatio: 4.578,
    driverGear: 'Gear d (37T)',
    drivenGear: 'Gear c (47T)',
    teethDriver: 37,
    teethDriven: 47,
    pitchDiaDriverMm: 185,
    pitchDiaDrivenMm: 235,
    wheelRpmAt1600: 354,
    vehicleSpeedKmph: 52.0,
    outputTorqueNm: 2235.20,
    wheelTorqueNm: 8057.90,
    tractionForceN: 21217,
    requiredTractionN: 8037,
    tractionSafetyFactor: 2.64,
    pitchLineVelocityMs: 15.50,
    velocityFactorCv: 0.279,
    lewisFormFactorY: 0.135,
    tangentialLoadWtN: 17087.06,
    allowableStaticStressMpa: 461.0,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  },
  {
    gearNumber: 3,
    gearName: '3rd Gear',
    gearboxRatio: 0.867, // 39 / 45
    totalCombinedRatio: 3.125,
    driverGear: 'Gear f (45T)',
    drivenGear: 'Gear e (39T)',
    teethDriver: 45,
    teethDriven: 39,
    pitchDiaDriverMm: 225,
    pitchDiaDrivenMm: 195,
    wheelRpmAt1600: 515,
    vehicleSpeedKmph: 75.0,
    outputTorqueNm: 1525.92,
    wheelTorqueNm: 5500.94,
    tractionForceN: 14484,
    requiredTractionN: 5136,
    tractionSafetyFactor: 2.82,
    pitchLineVelocityMs: 18.84,
    velocityFactorCv: 0.242,
    lewisFormFactorY: 0.131,
    tangentialLoadWtN: 14057.76,
    allowableStaticStressMpa: 451.5,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  },
  {
    gearNumber: 4,
    gearName: '4th Gear',
    gearboxRatio: 0.585, // 31 / 53
    totalCombinedRatio: 2.109,
    driverGear: 'Gear h (53T)',
    drivenGear: 'Gear g (31T)',
    teethDriver: 53,
    teethDriven: 31,
    pitchDiaDriverMm: 265,
    pitchDiaDrivenMm: 155,
    wheelRpmAt1600: 748,
    vehicleSpeedKmph: 109.0,
    outputTorqueNm: 1029.60,
    wheelTorqueNm: 3711.71,
    tractionForceN: 9773,
    requiredTractionN: 3313,
    tractionSafetyFactor: 2.95,
    pitchLineVelocityMs: 22.20,
    velocityFactorCv: 0.213,
    lewisFormFactorY: 0.125,
    tangentialLoadWtN: 11933.15,
    allowableStaticStressMpa: 456.1,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  },
  {
    gearNumber: 5,
    gearName: '5th Gear',
    gearboxRatio: 0.400, // 24 / 60
    totalCombinedRatio: 1.442,
    driverGear: 'Gear j (60T)',
    drivenGear: 'Gear i (24T)',
    teethDriver: 60,
    teethDriven: 24,
    pitchDiaDriverMm: 300,
    pitchDiaDrivenMm: 120,
    wheelRpmAt1600: 1184, // Engine at 1741 rpm gives 170 km/h
    vehicleSpeedKmph: 170.0,
    outputTorqueNm: 792.00,
    wheelTorqueNm: 2855.16,
    tractionForceN: 7513,
    requiredTractionN: 2313,
    tractionSafetyFactor: 3.25,
    pitchLineVelocityMs: 27.35,
    velocityFactorCv: 0.180,
    lewisFormFactorY: 0.116,
    tangentialLoadWtN: 9685.69,
    allowableStaticStressMpa: 470.2,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  },
  {
    gearNumber: -1,
    gearName: 'Reverse Gear',
    gearboxRatio: 1.883, // (33/18) * (18/18) ?
    totalCombinedRatio: 6.788,
    driverGear: 'Gear l (18T)',
    drivenGear: 'Gear k (33T) via Idler (18T)',
    teethDriver: 18,
    teethDriven: 33,
    pitchDiaDriverMm: 90,
    pitchDiaDrivenMm: 165,
    wheelRpmAt1600: 235,
    vehicleSpeedKmph: 33.8,
    outputTorqueNm: 3314.08,
    wheelTorqueNm: 11947.26,
    tractionForceN: 31173,
    requiredTractionN: 13000,
    tractionSafetyFactor: 2.40,
    pitchLineVelocityMs: 7.54,
    velocityFactorCv: 0.443,
    lewisFormFactorY: 0.126,
    tangentialLoadWtN: 23500.00,
    allowableStaticStressMpa: 495.0,
    maxAllowableTensileStrengthMpa: 800.0,
    status: 'SAFE'
  }
];

export interface ShaftAnalysisData {
  id: string;
  name: string;
  material: string;
  ultimateTensileStrengthMpa: number;
  yieldStrengthMpa: number;
  allowableShearStressMpa: number;
  maxBendingMomentNm: number;
  maxTorqueNm: number;
  equivalentTorqueTeNm: number;
  equivalentBendingMomentMeNm: number;
  calculatedMinDiameterMm: number;
  standardSelectedDiameterMm: number;
  bearingSpecification: string;
  bearingLifeHours: number;
}

export const SHAFTS_DATA: ShaftAnalysisData[] = [
  {
    id: 'input_shaft',
    name: 'Input Shaft (Clutch Connection)',
    material: 'AISI 4340 Nickel-Chromium-Molybdenum Steel (Oil Quenched & Tempered)',
    ultimateTensileStrengthMpa: 1110,
    yieldStrengthMpa: 710,
    allowableShearStressMpa: 213,
    maxBendingMomentNm: 382.4,
    maxTorqueNm: 1480.0,
    equivalentTorqueTeNm: 1528.6,
    equivalentBendingMomentMeNm: 955.5,
    calculatedMinDiameterMm: 42.8,
    standardSelectedDiameterMm: 50.0,
    bearingSpecification: 'SKF QJ-218-N2MA Angular Contact Ball Bearing',
    bearingLifeHours: 15420
  },
  {
    id: 'lay_shaft',
    name: 'Counter / Lay Shaft',
    material: 'AISI 4340 Nickel-Chromium-Molybdenum Steel (Oil Quenched & Tempered)',
    ultimateTensileStrengthMpa: 1110,
    yieldStrengthMpa: 710,
    allowableShearStressMpa: 213,
    maxBendingMomentNm: 1245.8,
    maxTorqueNm: 1480.0,
    equivalentTorqueTeNm: 1935.2,
    equivalentBendingMomentMeNm: 1590.5,
    calculatedMinDiameterMm: 56.4,
    standardSelectedDiameterMm: 65.0,
    bearingSpecification: 'SKF QJ-316-N2MA Deep Groove / Angular Contact Bearing',
    bearingLifeHours: 12850
  },
  {
    id: 'output_shaft',
    name: 'Main Output Shaft (Splined Dog Clutches)',
    material: 'AISI 4340 Nickel-Chromium-Molybdenum Steel (Oil Quenched & Tempered)',
    ultimateTensileStrengthMpa: 1110,
    yieldStrengthMpa: 710,
    allowableShearStressMpa: 213,
    maxBendingMomentNm: 1876.5,
    maxTorqueNm: 3167.6, // In 1st gear
    equivalentTorqueTeNm: 3681.4,
    equivalentBendingMomentMeNm: 2779.0,
    calculatedMinDiameterMm: 68.2,
    standardSelectedDiameterMm: 75.0,
    bearingSpecification: 'SKF 3217 A Double-Row Angular Contact Ball Bearing',
    bearingLifeHours: 11200
  },
  {
    id: 'idler_shaft',
    name: 'Reverse Idler Shaft',
    material: 'AISI 4340 Nickel-Chromium-Molybdenum Steel',
    ultimateTensileStrengthMpa: 1110,
    yieldStrengthMpa: 710,
    allowableShearStressMpa: 213,
    maxBendingMomentNm: 412.0,
    maxTorqueNm: 0, // Idler gear rotates freely on needle roller bearings
    equivalentTorqueTeNm: 412.0,
    equivalentBendingMomentMeNm: 412.0,
    calculatedMinDiameterMm: 28.5,
    standardSelectedDiameterMm: 35.0,
    bearingSpecification: 'Needle Roller Bearing Assembly (Cage Guided)',
    bearingLifeHours: 18600
  }
];

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  topic: string;
  summary: string;
  image: string;
}

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  { slideNumber: 1, title: 'Title & Team Credits', topic: 'TechGear WKS (Group 11)', summary: 'Gear Box Design by Premakumara H.P.S. (210494D), Themiya K.L. (210640A, Group Lead), and Udayakantha D.A.W.I. (210660J).', image: '/slides/slide_01.png' },
  { slideNumber: 2, title: 'Vehicle Selection & Design Targets', topic: 'Toyota Highlander 2024', summary: 'Parameters: 2050 kg curb, 5 passengers, 0-170 km/h speed, 35 km/h @ 30 deg incline, Cd = 0.34, 1930 x 1755 mm.', image: '/slides/slide_02.png' },
  { slideNumber: 3, title: 'Gear Ratio Calculation Workflow', topic: 'Optimum RPM Progression', summary: 'Tire selection 235/55R20, flat/incline power curve, engine Cummins L375-30, geometric ratio progression.', image: '/slides/slide_03.png' },
  { slideNumber: 4, title: 'Gear Sizing & Strength Verification', topic: 'Lewis & Buckingham Methods', summary: 'Minimum shaft center distance (d=168 mm -> 210 mm), teeth counts, AISI 8620 case hardening, tangential and wear load verification.', image: '/slides/slide_04.png' },
  { slideNumber: 5, title: 'Shaft Material Selection', topic: 'AISI 4340 High-Strength Steel', summary: 'Replacement of AISI 1045 with AISI 4340 Ni-Cr-Mo alloy steel to withstand extreme torsional fatigue and bending moments.', image: '/slides/slide_05.png' },
  { slideNumber: 6, title: 'Bending Moment & Torque Analysis', topic: 'SF & BM 3D Force Vectors', summary: 'Three-dimensional force decomposition (tangential Ft + radial Fr) across Input, Lay, and Output shafts.', image: '/slides/slide_06.png' },
  { slideNumber: 7, title: 'Shaft Diameter Sizing', topic: 'ASME Code & Max Shear Stress', summary: 'Calculated minimum diameters under combined shock factors (Km=1.5, Kt=1.0) and rounding to standard metric sizes.', image: '/slides/slide_07.png' },
  { slideNumber: 8, title: 'Rolling Element Bearings', topic: 'SKF Angular Contact Ball Bearings', summary: 'Bearing reaction forces, dynamic equivalent load P, and minimum 10,000 hour rating calculation.', image: '/slides/slide_08.png' },
  { slideNumber: 9, title: 'Key & Spline Connections', topic: 'Parallel Sunk Keys & Involute Splines', summary: 'Shear and compressive crushing safety checks on shaft-to-gear keys and sliding dog clutch splines.', image: '/slides/slide_09.png' },
  { slideNumber: 10, title: 'Shifting Mechanism & Dog Clutches', topic: 'Constant Mesh 3-Dog Architecture', summary: 'Three sliding dog clutches for 1-2, 3-4, and 5-Reverse engagement with interlock selector fork.', image: '/slides/slide_10.png' },
  { slideNumber: 11, title: 'Casing & Thermal Heat Dissipation', topic: 'Cast Iron Transmission Housing', summary: 'Ribbed enclosure design, oil splash lubrication, thermal equilibrium at 80 deg C operating temperature.', image: '/slides/slide_11.png' },
  { slideNumber: 12, title: 'Solid Edge 3D CAD Assembly', topic: 'Full Parametric Digital Twin', summary: 'Complete exploded and assembled CAD models of all 13 gears, 4 shafts, dog clutches, and casing.', image: '/slides/slide_12.png' },
  { slideNumber: 13, title: 'Production & Manufacturing Drawings', topic: 'ISO Standard Drafts (.DFT)', summary: 'GD&T tolerances, surface finishes (Ra 0.8 um for teeth), and keyway machining specifications.', image: '/slides/slide_13.png' },
  { slideNumber: 14, title: 'Conclusion & Performance Verification', topic: 'Final Verification Matrix', summary: 'Safety factor confirmation: 1st gear traction SF = 2.33, 5th gear SF = 3.25, gradeability 35 km/h @ 30 deg verified.', image: '/slides/slide_14.png' }
];

export interface LogbookPage {
  pageNumber: number;
  author: string;
  studentIndex: string;
  title: string;
  summary: string;
  image: string;
}

export const LOGBOOK_PAGES: LogbookPage[] = [
  { pageNumber: 1, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Logbook Cover & Task Allocation', summary: 'Department of Mechanical Engineering, ME3813 Logbook. Personal records by Premakumara H.P.S. (210494D).', image: '/logbook/logbook_page_01.png' },
  { pageNumber: 2, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Vehicle Tractive Resistance & Incline Power', summary: 'Handwritten calculations of aerodynamic drag, rolling resistance (fr=0.015), and gradient force on 30 deg slope.', image: '/logbook/logbook_page_02.png' },
  { pageNumber: 3, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Engine Selection & Gear Ratio Progression', summary: 'Engine performance curve analysis, geometric ratio progression factor phi = 0.6875, and transmission speed matching.', image: '/logbook/logbook_page_03.png' },
  { pageNumber: 4, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Gear Teeth Sizing & Center Distance', summary: 'Center distance formula d = 9.5 * cuberoot(Tmax) -> 168 mm, tooth sum 84, module m = 5 mm verification.', image: '/logbook/logbook_page_04.png' },
  { pageNumber: 5, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Lewis Bending & Dynamic Load Buckingham', summary: 'Calculation of tangential tooth load, velocity factor Cv, Lewis form factor y, and dynamic increment load.', image: '/logbook/logbook_page_05.png' },
  { pageNumber: 6, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Shaft Bending Moments & Bearing Reactions', summary: 'Free-body diagrams of Layshaft and Output shaft, vertical and horizontal plane shear force and bending moment sketches.', image: '/logbook/logbook_page_06.png' },
  { pageNumber: 7, author: 'Premakumara H.P.S.', studentIndex: '210494D', title: 'Final Review & CAD Verification Notes', summary: 'Verification of ASME shaft sizing, SKF bearing L10h life ratings, and Solid Edge assembly alignment checks.', image: '/logbook/logbook_page_07.png' }
];
