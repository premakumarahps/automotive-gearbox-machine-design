import React, { useState } from 'react';
import { 
  ShieldAlert, 
  RotateCw, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  AlertTriangle, 
  Sparkles,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { MathView } from './MathView';
import { SHAFTS_DATA, type ShaftAnalysisData } from '../core/gearboxData';

export const ShaftFatigueViewer: React.FC = () => {
  const [selectedShaftId, setSelectedShaftId] = useState<string>('output_shaft');

  const activeShaft = SHAFTS_DATA.find(s => s.id === selectedShaftId) || SHAFTS_DATA[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          ME3813 CHAPTER 9 • SHAFT DIAMETER SIZING & BEARING LIFE
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
          ASME Code Shaft Fatigue & SKF Bearing Lifespan Analysis
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl leading-relaxed">
          Comprehensive three-dimensional bending moment vector decomposition (<MathView math="M_x, M_y \to M_{\text{resultant}}" />) and torsional stress verification using ASME shaft code. Material selection upgraded from AISI 1045 to <span className="text-amber-400 font-semibold">AISI 4340</span> alloy steel.
        </p>
      </div>

      {/* Material Justification Alert: Why AISI 4340 was chosen over AISI 1045 */}
      <div className="bg-slate-900/80 rounded-2xl border border-amber-500/30 p-6 flex flex-col md:flex-row items-start gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase font-mono tracking-wider">
              Critical Material Upgrade Decision (Section 15.2)
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              AISI 1045 ➔ AISI 4340
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans text-sm">
            Initial calculations with medium carbon steel <span className="text-red-400 font-mono font-medium">AISI 1045</span> (tensile strength 585 MPa) indicated an unacceptable vulnerability to torsional fatigue under peak Cummins engine torque shock loads (1,480 N·m). The engineering team upgraded all four shafts to <span className="text-emerald-400 font-mono font-bold">AISI 4340 Nickel-Chromium-Molybdenum alloy steel</span> (oil quenched & tempered, tensile strength 1,110 MPa, yield strength 710 MPa), increasing structural endurance by over <strong>89%</strong>.
          </p>
        </div>
      </div>

      {/* Shaft Selection Pills */}
      <div className="flex flex-wrap gap-3">
        {SHAFTS_DATA.map((shaft) => (
          <button
            key={shaft.id}
            onClick={() => setSelectedShaftId(shaft.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 border ${
              selectedShaftId === shaft.id
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-102'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{shaft.name}</span>
          </button>
        ))}
      </div>

      {/* Active Shaft Technical Deep Dive Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
              Shaft Sizing Dossier
            </span>
            <h3 className="text-2xl font-bold text-white font-heading mt-1">
              {activeShaft.name}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Material: {activeShaft.material}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Standard Selected Diameter</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono">
                Ø{activeShaft.standardSelectedDiameterMm}.0 mm
              </span>
            </div>
          </div>
        </div>

        {/* ASME Sizing Formulas & Key Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">Peak Bending Moment (M)</span>
            <span className="text-xl font-bold text-white font-mono">
              {activeShaft.maxBendingMomentNm.toFixed(1)} N·m
            </span>
            <span className="text-[10px] text-slate-400 block">3D Resultant Force Vector</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">Max Transmitted Torque (T_t)</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">
              {activeShaft.maxTorqueNm.toFixed(1)} N·m
            </span>
            <span className="text-[10px] text-slate-400 block">Peak Engine Shock Load</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">Equivalent Torque (T_e)</span>
            <span className="text-xl font-bold text-sky-400 font-mono">
              {activeShaft.equivalentTorqueTeNm.toFixed(1)} N·m
            </span>
            <span className="text-[10px] text-slate-400 block">ASME Fatigue Shock Factor</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-500 block">Min Calculated Diameter</span>
            <span className="text-xl font-bold text-purple-400 font-mono">
              Ø{activeShaft.calculatedMinDiameterMm.toFixed(1)} mm
            </span>
            <span className="text-[10px] text-emerald-400 block font-semibold">
              ✔ Selected: Ø{activeShaft.standardSelectedDiameterMm}.0 mm
            </span>
          </div>
        </div>

        {/* ASME Mathematical Equations */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">
            Governing ASME Code Equations (Combined Bending & Torsion)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
              <MathView math="T_e = \sqrt{(k_m M)^2 + (k_t T_t)^2}" block />
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
              <MathView math="d = \sqrt[3]{\frac{16 T_e}{\pi \tau_{\text{allow}}}} \implies \text{Safety Factor} \ge 2.0" block />
            </div>
          </div>
        </div>

        {/* Bearing Selection & Lifespan Card */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Selected Rolling Bearing</span>
              <h4 className="text-white font-bold text-sm font-heading">
                {activeShaft.bearingSpecification}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Precision SKF Angular Contact Ball Bearing with High Dynamic Capacity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Expected L_10h Life</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                {activeShaft.bearingLifeHours.toLocaleString()} Hours
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>&gt; 10,000 h Design Criterion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table: All 4 Shafts */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-base font-bold text-white font-heading">
            ASME Shaft Sizing & Bearing Specification Summary
          </h3>
          <span className="text-xs text-slate-400">
            Design Verification Across Input, Lay, Output, and Idler Shafts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Shaft Name</th>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Max M_b (N·m)</th>
                <th className="py-3.5 px-4">Max T_t (N·m)</th>
                <th className="py-3.5 px-4">Equivalent T_e (N·m)</th>
                <th className="py-3.5 px-4">Min Req. Ø</th>
                <th className="py-3.5 px-4">Standard Ø</th>
                <th className="py-3.5 px-4">Bearing Model</th>
                <th className="py-3.5 px-4">L_10h Life</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {SHAFTS_DATA.map((shaft) => (
                <tr
                  key={shaft.id}
                  onClick={() => setSelectedShaftId(shaft.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedShaftId === shaft.id
                      ? 'bg-amber-500/10 text-white font-semibold'
                      : 'hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-white">
                    {shaft.name}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400">
                    AISI 4340
                  </td>
                  <td className="py-3.5 px-4">
                    {shaft.maxBendingMomentNm.toFixed(1)} N·m
                  </td>
                  <td className="py-3.5 px-4">
                    {shaft.maxTorqueNm.toFixed(1)} N·m
                  </td>
                  <td className="py-3.5 px-4 text-sky-400 font-bold">
                    {shaft.equivalentTorqueTeNm.toFixed(1)} N·m
                  </td>
                  <td className="py-3.5 px-4 text-purple-400">
                    Ø{shaft.calculatedMinDiameterMm.toFixed(1)} mm
                  </td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">
                    Ø{shaft.standardSelectedDiameterMm}.0 mm
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {shaft.bearingSpecification.split(' ')[0]} {shaft.bearingSpecification.split(' ')[1]}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {shaft.bearingLifeHours.toLocaleString()} h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
