import React from 'react';
import { 
  Settings, 
  Activity, 
  Box, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Sliders,
  Award
} from 'lucide-react';
import { MathView } from './MathView';
import { VEHICLE_PARAMS, ENGINE_SPECS } from '../core/gearboxData';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Industrial Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-sky-600/15 via-blue-600/10 to-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-sky-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Engineering Technical Grid Coordinate Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Academic Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Department of Mechanical Engineering</span>
            <span className="text-slate-600">•</span>
            <span>University of Moratuwa</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>MODULE ME3813: MACHINE ELEMENT DESIGN</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <span>GROUP 11: TECHGEAR WKS</span>
          </div>
        </div>

        {/* Main Title & Hero Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white">
            Design & Stress Optimization of a{' '}
            <span className="bg-gradient-to-r from-amber-400 via-sky-400 to-amber-300 bg-clip-text text-transparent">
              5-Speed Industrial Manual Gearbox
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
            A comprehensive automotive transmission engineering project for the <span className="text-white font-semibold">Toyota Highlander</span> powered by the <span className="text-amber-400 font-mono">Dongfeng Cummins L375-30</span> diesel engine. Complete with gear kinematics, Lewis tooth bending validation, Buckingham dynamic tooth loads, and ASME shaft fatigue calculations.
          </p>
        </div>

        {/* Team Attribution Box */}
        <div className="mt-8 max-w-3xl mx-auto bg-slate-900/80 rounded-2xl border border-slate-800 p-4 sm:p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              PROJECT DESIGN & AUTHORSHIP (TECHGEAR WKS - GROUP 11)
            </span>
            <span className="text-slate-500">Semester 5 • 2024</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Premakumara H.P.S. (Highlighted) */}
            <div className="relative p-3.5 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border-2 border-amber-500/60 shadow-lg shadow-amber-500/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-0.5">
                  Designer & Author
                </span>
                <h4 className="text-white font-bold text-sm tracking-tight">
                  Premakumara H.P.S.
                </h4>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
                  Index: 210494D
                </span>
                <span className="text-[10px] text-amber-400/80">UoM</span>
              </div>
            </div>

            {/* Themiya K.L. (Group Lead - Unhighlighted) */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium block mb-0.5">
                  Group Lead
                </span>
                <h4 className="text-slate-200 font-medium text-sm">
                  Themiya K.L.
                </h4>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Index: 210640A</span>
                <span className="text-[10px]">UoM</span>
              </div>
            </div>

            {/* Udayakantha D.A.W.I. (Member) */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium block mb-0.5">
                  Team Member
                </span>
                <h4 className="text-slate-200 font-medium text-sm">
                  Udayakantha D.A.W.I.
                </h4>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Index: 210660J</span>
                <span className="text-[10px]">UoM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Key Figures Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Metric 1 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Configuration</span>
              <Settings className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-heading">
              5 FWD + 1 REV
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Constant Mesh • 3 Dog Clutches
            </p>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Gradeability</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-heading">
              35 km/h @ 30°
            </div>
            <p className="text-xs text-slate-400 mt-1">
              1st Gear Traction SF = 2.33
            </p>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Peak Engine Torque</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-heading">
              1,480 N·m
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dongfeng Cummins L375-30
            </p>
          </div>

          {/* Metric 4 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Materials Chosen</span>
              <ShieldCheck className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-heading truncate">
              AISI 8620 / 4340
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Case Hardened & Fatigue Rated
            </p>
          </div>
        </div>

        {/* Quick Launch Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Activity className="w-4 h-4" />
            Launch 5-Speed Simulator
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setActiveTab('solid-edge-cad')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Box className="w-4 h-4 text-sky-400" />
            Solid Edge 3D CAD & Drafts
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            14 Presentation Slides
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            98-Page Design Report
          </button>
        </div>

      </div>
    </section>
  );
};
