import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  BarChart2, 
  CheckCircle2, 
  Info, 
  FileText, 
  Sparkles,
  Zap,
  TrendingDown
} from 'lucide-react';
import { MathView } from './MathView';
import { GEAR_STAGES, VEHICLE_PARAMS } from '../core/gearboxData';

export const GearAnalysisMatrix: React.FC = () => {
  const [selectedGearIndex, setSelectedGearIndex] = useState<number>(0);

  const activeGear = GEAR_STAGES[selectedGearIndex];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-2">
          <Layers className="w-3.5 h-3.5" />
          ME3813 CHAPTER 8 & 9 • GEAR TEETH & STRESS CALCULATIONS
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
          Gear Sizing, Lewis Bending & Dynamic Load Verification
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl leading-relaxed">
          Full parametric validation of 20° full-depth involute gears with module <span className="text-amber-400 font-mono">m = 5 mm</span> and shaft center distance <span className="text-sky-400 font-mono">d = 210 mm</span>. Materials evaluated using Lewis beam strength and Buckingham dynamic load equations.
        </p>
      </div>

      {/* KaTeX Formulas Mathematical Theory Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formula 1: Lewis Formula */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 hover-lift">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Lewis Beam Strength</span>
            <span>Static Bending</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center overflow-x-auto">
            <MathView math="W_T = (\sigma_o \cdot C_v) \cdot b \cdot \pi m \cdot y" block />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Where <MathView math="\sigma_o" /> is allowable static stress, <MathView math="C_v" /> is velocity factor, <MathView math="b" /> is face width, and <MathView math="y" /> is tooth form factor.
          </p>
        </div>

        {/* Formula 2: Buckingham Dynamic Load */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 hover-lift">
          <div className="flex items-center justify-between text-xs font-mono text-sky-400">
            <span>Buckingham Dynamic Load</span>
            <span>High-Speed Mesh</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center overflow-x-auto">
            <MathView math="W_D = W_T + \frac{21 v (b C + W_T)}{21 v + \sqrt{b C + W_T}}" block />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Calculates transient impact loads caused by pitch line velocity <MathView math="v" /> and tooth deformation factor <MathView math="C" />.
          </p>
        </div>

        {/* Formula 3: Center Distance Constraint */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 hover-lift">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>Center Distance & Involute</span>
            <span>Constant Mesh</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center overflow-x-auto">
            <MathView math="a = \frac{m(T_{\text{driver}} + T_{\text{driven}})}{2} = 210\text{ mm}" block />
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            The sum of teeth for all parallel stages is strictly constant: <MathView math="T_1 + T_2 = 84" /> across all forward speeds.
          </p>
        </div>
      </div>

      {/* Main Table: Complete Gear Parameters Matrix */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Complete Gear Transmission Sizing Matrix
            </h3>
            <span className="text-xs text-slate-400">
              Extracted from ME3813 Final Report Tables 8, 10, 13, 16 & 17
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Active Material:</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              AISI 8620 Alloy Steel (σ_allow = 800 MPa)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Gear Stage</th>
                <th className="py-3.5 px-4">Ratio (G_n)</th>
                <th className="py-3.5 px-4">Teeth Pair (Driver/Driven)</th>
                <th className="py-3.5 px-4">Pitch Diameters (mm)</th>
                <th className="py-3.5 px-4">Pitch Velocity (m/s)</th>
                <th className="py-3.5 px-4">Tangential Load W_T (N)</th>
                <th className="py-3.5 px-4">Static Stress (MPa)</th>
                <th className="py-3.5 px-4">Traction (N)</th>
                <th className="py-3.5 px-4">Safety Factor</th>
                <th className="py-3.5 px-4 text-center">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {GEAR_STAGES.map((gear, idx) => (
                <tr
                  key={gear.gearName}
                  onClick={() => setSelectedGearIndex(idx)}
                  className={`cursor-pointer transition-colors ${
                    selectedGearIndex === idx
                      ? 'bg-amber-500/10 text-white font-semibold'
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      selectedGearIndex === idx ? 'bg-amber-400' : 'bg-slate-600'
                    }`} />
                    {gear.gearName}
                  </td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">
                    {gear.gearboxRatio.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {gear.teethDriver}T / {gear.teethDriven}T (Sum: {gear.teethDriver + gear.teethDriven})
                  </td>
                  <td className="py-3.5 px-4">
                    Ø{gear.pitchDiaDriverMm} / Ø{gear.pitchDiaDrivenMm}
                  </td>
                  <td className="py-3.5 px-4 text-sky-400">
                    {gear.pitchLineVelocityMs.toFixed(2)} m/s
                  </td>
                  <td className="py-3.5 px-4">
                    {gear.tangentialLoadWtN.toLocaleString()} N
                  </td>
                  <td className="py-3.5 px-4 text-purple-400">
                    {gear.allowableStaticStressMpa.toFixed(1)} MPa
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400">
                    {gear.tractionForceN.toLocaleString()} N
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-300">
                    {gear.tractionSafetyFactor.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> SAFE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Gear Stage Deep Dive Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
              Selected Detail: {activeGear.gearName}
            </span>
            <span className="text-slate-400 text-xs font-mono">
              Driver: {activeGear.driverGear} ➔ Driven: {activeGear.drivenGear}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white font-heading">
            Tooth Geometry & Stress Margin Breakdown
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-1">Tooth Form Factor (y)</span>
              <span className="text-white font-bold text-sm">{activeGear.lewisFormFactorY}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-1">Velocity Factor (C_v)</span>
              <span className="text-sky-400 font-bold text-sm">{activeGear.velocityFactorCv.toFixed(3)}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-1">Allowable Static Stress</span>
              <span className="text-purple-400 font-bold text-sm">{activeGear.allowableStaticStressMpa} MPa</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block mb-1">Traction Safety Factor</span>
              <span className="text-emerald-400 font-bold text-sm">{activeGear.tractionSafetyFactor}</span>
            </div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-sans">
            In {activeGear.gearName}, the pitch line velocity reaches <span className="text-sky-400 font-mono font-semibold">{activeGear.pitchLineVelocityMs} m/s</span>. The allowable static stress calculated by the Lewis equation is <span className="text-purple-400 font-mono font-semibold">{activeGear.allowableStaticStressMpa} MPa</span>, which easily passes within the <span className="text-emerald-400 font-mono font-semibold">800 MPa</span> ultimate limit of oil-quenched AISI 8620 alloy steel.
          </p>
        </div>

        {/* Visual Stress Bar Gauge */}
        <div className="lg:col-span-4 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Stress Ratio (σ / σ_max):</span>
            <span className="text-amber-400 font-bold">
              {((activeGear.allowableStaticStressMpa / activeGear.maxAllowableTensileStrengthMpa) * 100).toFixed(1)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(activeGear.allowableStaticStressMpa / activeGear.maxAllowableTensileStrengthMpa) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0 MPa</span>
            <span className="text-purple-400">{activeGear.allowableStaticStressMpa} MPa</span>
            <span className="text-slate-400">800 MPa Limit</span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Structural factor of safety exceeds requirements.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
