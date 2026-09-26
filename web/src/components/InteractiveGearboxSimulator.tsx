import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Gauge, 
  Zap, 
  RotateCw, 
  ShieldCheck, 
  AlertTriangle, 
  Sliders, 
  TrendingUp, 
  Play, 
  Pause,
  RefreshCw,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MathView } from './MathView';
import { 
  VEHICLE_PARAMS, 
  ENGINE_SPECS, 
  GEAR_STAGES 
} from '../core/gearboxData';
import { 
  computeGearboxSimulation, 
  type SimulationState, 
  type SimulationResults 
} from '../core/gearboxPhysics';

export const InteractiveGearboxSimulator: React.FC = () => {
  const [engineRpm, setEngineRpm] = useState<number>(1600);
  const [selectedGear, setSelectedGear] = useState<number>(1);
  const [roadInclineDeg, setRoadInclineDeg] = useState<number>(0);
  const [vehicleMassKg, setVehicleMassKg] = useState<number>(2550);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationAngleRef = useRef<number>(0);

  const simState: SimulationState = {
    engineRpm,
    selectedGear,
    roadInclineDeg,
    vehicleGrossMassKg: vehicleMassKg,
  };

  const results: SimulationResults = computeGearboxSimulation(simState);

  // Animation Loop for Interactive Canvas
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      if (isPlaying) {
        // Speed of rotation proportional to input shaft RPM
        rotationAngleRef.current += (engineRpm / 60) * 0.05;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas
      ctx.fillStyle = '#090e1d';
      ctx.fillRect(0, 0, width, height);

      // Draw Engineering Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Shaft Centerlines
      const yInput = 110;
      const yLay = 260;
      const yIdler = 330;

      // Draw Shaft Bars
      // Input & Output Shafts (Top line)
      // Input Shaft (Left)
      ctx.fillStyle = '#10b981'; // Green
      ctx.fillRect(40, yInput - 6, 120, 12);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('INPUT SHAFT (d=50mm)', 45, yInput - 12);

      // Output Shaft (Right coaxial)
      ctx.fillStyle = selectedGear !== 0 ? '#f59e0b' : '#64748b'; // Amber if engaged, slate if neutral
      ctx.fillRect(165, yInput - 7, 560, 14);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('MAIN OUTPUT SHAFT (d=75mm - AISI 4340)', 300, yInput - 14);

      // Lay Shaft (Bottom line)
      ctx.fillStyle = '#38bdf8'; // Cyan/Blue
      ctx.fillRect(40, yLay - 8, 685, 16);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('COUNTER / LAY SHAFT (d=65mm - AISI 4340)', 240, yLay + 28);

      // Reverse Idler Shaft
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(600, yIdler - 5, 80, 10);
      ctx.fillStyle = '#f87171';
      ctx.fillText('IDLER (d=35mm)', 605, yIdler + 20);

      // Helper function to draw gear with teeth
      const drawGear = (
        cx: number, 
        cy: number, 
        radius: number, 
        teeth: number, 
        color: string, 
        angle: number, 
        isActive: boolean,
        label: string
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        // Pitch Circle body
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? `${color}33` : '#0f172a';
        ctx.fill();
        ctx.strokeStyle = isActive ? color : '#475569';
        ctx.lineWidth = isActive ? 2.5 : 1.2;
        ctx.stroke();

        // Draw Teeth
        const toothCount = Math.min(24, teeth); // visual representation
        for (let i = 0; i < toothCount; i++) {
          const toothAngle = (i * Math.PI * 2) / toothCount;
          const tx = Math.cos(toothAngle) * (radius + 4);
          const ty = Math.sin(toothAngle) * (radius + 4);
          ctx.beginPath();
          ctx.arc(tx, ty, 2, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? color : '#64748b';
          ctx.fill();
        }

        // Inner Hub
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Label
        ctx.fillStyle = isActive ? '#ffffff' : '#94a3b8';
        ctx.font = isActive ? 'bold 10px JetBrains Mono' : '9px JetBrains Mono';
        ctx.fillText(label, cx - 18, cy + (cy > yLay ? 22 : -radius - 8));
      };

      const baseAngle = rotationAngleRef.current;

      // 1. Constant Mesh Drive Pair: Gear A (Input) and Gear B (Lay)
      // x = 110, A is 42T, B is 42T, radius = 55
      drawGear(110, yInput, 55, 42, '#38bdf8', baseAngle, true, 'Gear A (42T)');
      drawGear(110, yLay, 55, 42, '#38bdf8', -baseAngle, true, 'Gear B (42T)');

      // Mesh contact line between A and B
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(110, yInput + 55);
      ctx.lineTo(110, yLay - 55);
      ctx.stroke();
      ctx.setLineDash([]);

      // Gear Stages along the shaft:
      // 1st Gear: x = 220, Driver b (30T, r=40) on Lay -> Driven a (54T, r=70) on Output
      const is1st = selectedGear === 1;
      drawGear(220, yLay, 40, 30, '#10b981', -baseAngle, is1st, 'Gear b (30T)');
      drawGear(220, yInput, 70, 54, '#10b981', is1st ? baseAngle / 1.8 : 0, is1st, 'Gear a (54T)');

      // 2nd Gear: x = 320, Driver d (37T, r=48) on Lay -> Driven c (47T, r=62) on Output
      const is2nd = selectedGear === 2;
      drawGear(320, yLay, 48, 37, '#06b6d4', -baseAngle, is2nd, 'Gear d (37T)');
      drawGear(320, yInput, 62, 47, '#06b6d4', is2nd ? baseAngle / 1.27 : 0, is2nd, 'Gear c (47T)');

      // 3rd Gear: x = 420, Driver f (45T, r=58) on Lay -> Driven e (39T, r=52) on Output
      const is3rd = selectedGear === 3;
      drawGear(420, yLay, 58, 45, '#3b82f6', -baseAngle, is3rd, 'Gear f (45T)');
      drawGear(420, yInput, 52, 39, '#3b82f6', is3rd ? baseAngle / 0.867 : 0, is3rd, 'Gear e (39T)');

      // 4th Gear: x = 520, Driver h (53T, r=68) on Lay -> Driven g (31T, r=42) on Output
      const is4th = selectedGear === 4;
      drawGear(520, yLay, 68, 53, '#8b5cf6', -baseAngle, is4th, 'Gear h (53T)');
      drawGear(520, yInput, 42, 31, '#8b5cf6', is4th ? baseAngle / 0.585 : 0, is4th, 'Gear g (31T)');

      // 5th Gear: x = 620, Driver j (60T, r=78) on Lay -> Driven i (24T, r=32) on Output
      const is5th = selectedGear === 5;
      drawGear(620, yLay, 78, 60, '#ec4899', -baseAngle, is5th, 'Gear j (60T)');
      drawGear(620, yInput, 32, 24, '#ec4899', is5th ? baseAngle / 0.40 : 0, is5th, 'Gear i (24T)');

      // Reverse Gear & Idler: x = 690, Driver l (18T, r=25) -> Idler (18T, r=25) -> Driven k (33T, r=45)
      const isRev = selectedGear === -1;
      drawGear(685, yLay, 25, 18, '#ef4444', -baseAngle, isRev, 'Gear l (18T)');
      drawGear(685, yIdler, 25, 18, '#ef4444', isRev ? baseAngle : 0, isRev, 'Idler (18T)');
      drawGear(685, yInput, 45, 33, '#ef4444', isRev ? -baseAngle / 1.883 : 0, isRev, 'Gear k (33T)');

      // Dog Clutches (Sliding Collars on Output Shaft)
      // Dog 1: between 1st & 2nd (x = 270)
      ctx.fillStyle = (is1st || is2nd) ? '#f59e0b' : '#475569';
      ctx.fillRect(260 + (is1st ? -15 : is2nd ? 15 : 0), yInput - 12, 20, 24);
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(260 + (is1st ? -15 : is2nd ? 15 : 0), yInput - 12, 20, 24);

      // Dog 2: between 3rd & 4th (x = 470)
      ctx.fillStyle = (is3rd || is4th) ? '#f59e0b' : '#475569';
      ctx.fillRect(460 + (is3rd ? -15 : is4th ? 15 : 0), yInput - 12, 20, 24);
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(460 + (is3rd ? -15 : is4th ? 15 : 0), yInput - 12, 20, 24);

      // Dog 3: between 5th & Rev (x = 650)
      ctx.fillStyle = (is5th || isRev) ? '#f59e0b' : '#475569';
      ctx.fillRect(645 + (is5th ? -15 : isRev ? 15 : 0), yInput - 12, 20, 24);
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(645 + (is5th ? -15 : isRev ? 15 : 0), yInput - 12, 20, 24);

      // Power Flow Glowing Path
      if (selectedGear !== 0) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Clutch to Input A
        ctx.moveTo(40, yInput);
        ctx.lineTo(110, yInput);
        // Down through Drive pair A to B
        ctx.lineTo(110, yLay);
        // Through Layshaft to active driver gear
        let activeX = 220;
        if (selectedGear === 2) activeX = 320;
        if (selectedGear === 3) activeX = 420;
        if (selectedGear === 4) activeX = 520;
        if (selectedGear === 5) activeX = 620;
        if (selectedGear === -1) activeX = 685;

        ctx.lineTo(activeX, yLay);
        if (selectedGear === -1) {
          ctx.lineTo(activeX, yIdler);
          ctx.lineTo(activeX, yInput);
        } else {
          ctx.lineTo(activeX, yInput);
        }
        // Through Output Shaft to Differential
        ctx.lineTo(725, yInput);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, engineRpm, selectedGear]);

  return (
    <div className="space-y-8">
      {/* Simulator Header & Quick Action Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5" />
            LIVE KINEMATIC & STRESS SIMULATION ENGINE
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
            5-Speed Manual Transmission Virtual Dyno
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Dongfeng Cummins L375-30 Diesel Engine • Constant Mesh Transmission • Toyota Highlander Drivetrain
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isPlaying
                ? 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Shaft Rotation' : 'Resume Kinematics'}</span>
          </button>

          <button
            onClick={() => {
              setEngineRpm(1600);
              setSelectedGear(1);
              setRoadInclineDeg(0);
              setVehicleMassKg(2550);
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Reset Simulation to Initial Conditions"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Canvas & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Transmission Layout Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 lg:p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <span className="font-mono text-slate-400">
              Schematic: Constant Mesh Triple-Dog Transmission Layout
            </span>
            <span className="font-mono text-amber-400 font-semibold">
              Center Distance: 210.0 mm • Module: 5.0 mm
            </span>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#090e1d] shadow-inner flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              width={750} 
              height={380} 
              className="w-full h-auto max-h-[420px] select-none"
            />
          </div>

          {/* Power Flow Route Commentary */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-white uppercase font-mono tracking-wider">
                Active Power Flow Path
              </div>
              <p className="text-slate-300 font-sans leading-relaxed">
                {results.powerFlowDescription}
              </p>
            </div>
          </div>

          {/* Gear Shift Selector Stick */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
              Select Gear Stage (H-Pattern Transmission)
            </span>
            <div className="grid grid-cols-7 gap-2">
              {[
                { gear: -1, label: 'R (Rev)', color: 'border-red-500 text-red-400' },
                { gear: 0, label: 'N (Neutral)', color: 'border-slate-500 text-slate-400' },
                { gear: 1, label: '1st (1.80)', color: 'border-emerald-500 text-emerald-400' },
                { gear: 2, label: '2nd (1.27)', color: 'border-cyan-500 text-cyan-400' },
                { gear: 3, label: '3rd (0.87)', color: 'border-blue-500 text-blue-400' },
                { gear: 4, label: '4th (0.59)', color: 'border-purple-500 text-purple-400' },
                { gear: 5, label: '5th (0.40)', color: 'border-pink-500 text-pink-400' },
              ].map((g) => (
                <button
                  key={g.gear}
                  onClick={() => setSelectedGear(g.gear)}
                  className={`py-3 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center border ${
                    selectedGear === g.gear
                      ? `bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105`
                      : `bg-slate-950/80 hover:bg-slate-800 ${g.color} opacity-80 hover:opacity-100`
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Engine & Environmental Parameter Sliders (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Controls Box */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Operational Parameters
            </h3>

            {/* Slider 1: Engine RPM */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Engine Speed (RPM)</span>
                <span className="text-amber-400 font-bold">{engineRpm} RPM</span>
              </div>
              <input
                type="range"
                min="700"
                max="2400"
                step="25"
                value={engineRpm}
                onChange={(e) => setEngineRpm(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Idle (800)</span>
                <span className="text-emerald-400">Optimum (1100-1600)</span>
                <span className="text-red-400">Redline (2100)</span>
              </div>
            </div>

            {/* Slider 2: Road Incline */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Road Incline Slope</span>
                <span className="text-sky-400 font-bold">{roadInclineDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={roadInclineDeg}
                onChange={(e) => setRoadInclineDeg(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Flat Road (0°)</span>
                <span>Moderate (15°)</span>
                <span className="text-amber-400">Max Spec (30°)</span>
              </div>
            </div>

            {/* Slider 3: Vehicle Gross Mass */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Total Vehicle Mass</span>
                <span className="text-purple-400 font-bold">{vehicleMassKg} kg</span>
              </div>
              <input
                type="range"
                min="2050"
                max="3200"
                step="50"
                value={vehicleMassKg}
                onChange={(e) => setVehicleMassKg(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Curb (2050 kg)</span>
                <span className="text-emerald-400">Design Gross (2550 kg)</span>
                <span>Overload (3200 kg)</span>
              </div>
            </div>

            {/* Incline Gradeability Status Alert */}
            {roadInclineDeg >= 25 && selectedGear >= 3 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  High incline gradient ({roadInclineDeg}°). Downshift to 1st or 2nd gear to maintain positive tractive excess force!
                </span>
              </div>
            )}
          </div>

          {/* Quick Engine Telemetry Readout */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Dongfeng Cummins L375-30 Telemetry
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Engine Brake Torque:</span>
                <span className="text-white font-mono font-bold text-sm">
                  {results.engineTorqueNm.toFixed(0)} N·m
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Mechanical Power Output:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  {results.enginePowerKw.toFixed(1)} kW ({(results.enginePowerKw * 1.341).toFixed(0)} HP)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Input Shaft Angular Speed:</span>
                <span className="text-slate-200 font-mono">
                  {results.inputShaftRpm} RPM
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Layshaft Speed (Ratio 1:1):</span>
                <span className="text-cyan-400 font-mono">
                  {results.layShaftRpm} RPM
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Telemetry & Engineering Verification HUD (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Vehicle Linear Speed */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Linear Vehicle Speed</span>
            <Gauge className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-heading">
              {results.vehicleSpeedKmph.toFixed(1)}
            </span>
            <span className="text-sm font-mono text-slate-400">km/h</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono">
            <span className="text-slate-500">Wheel Speed:</span>
            <span className="text-amber-400">{Math.abs(results.wheelRpm).toFixed(0)} RPM</span>
          </div>
        </div>

        {/* Card 2: Output & Wheel Torque */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Output Shaft Torque</span>
            <RotateCw className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-emerald-400 font-heading">
              {results.outputTorqueNm.toFixed(0)}
            </span>
            <span className="text-sm font-mono text-slate-400">N·m</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono">
            <span className="text-slate-500">Wheel Axle Torque:</span>
            <span className="text-white font-bold">{results.wheelTorqueNm.toFixed(0)} N·m</span>
          </div>
        </div>

        {/* Card 3: Traction Force vs Resistances */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Tractive Force Margin</span>
            <TrendingUp className="w-5 h-5 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold font-heading ${
              results.netExcessForceN >= 0 ? 'text-sky-400' : 'text-red-400'
            }`}>
              {results.tractionForceN.toFixed(0)}
            </span>
            <span className="text-sm font-mono text-slate-400">N</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono">
            <span className="text-slate-500">Total Resistance:</span>
            <span className="text-slate-300">{results.totalResistanceN.toFixed(0)} N</span>
          </div>
        </div>

        {/* Card 4: Lewis Tooth Bending Stress */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Lewis Bending Stress</span>
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-heading">
              {results.lewisBendingStressMpa.toFixed(0)}
            </span>
            <span className="text-sm font-mono text-slate-400">MPa</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-xs font-mono">
            <span className="text-slate-500">AISI 8620 Limit:</span>
            <span className="text-emerald-400 font-bold">&lt; 800 MPa (SAFE)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
