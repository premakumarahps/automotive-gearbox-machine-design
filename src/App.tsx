import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveGearboxSimulator } from './components/InteractiveGearboxSimulator';
import { GearAnalysisMatrix } from './components/GearAnalysisMatrix';
import { ShaftFatigueViewer } from './components/ShaftFatigueViewer';
import { SolidEdgeCadViewer } from './components/SolidEdgeCadViewer';
import { PresentationSlidesViewer } from './components/PresentationSlidesViewer';
import { ReportReader } from './components/ReportReader';
import { Footer } from './components/Footer';
import { 
  Activity, 
  Layers, 
  ShieldAlert, 
  Box, 
  Sliders, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Cpu, 
  RotateCw, 
  Download 
} from 'lucide-react';
import { GEAR_STAGES, VEHICLE_PARAMS, ENGINE_SPECS } from './core/gearboxData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <main>
        {activeTab === 'overview' && (
          <div className="space-y-24">
            {/* Hero Section */}
            <Hero setActiveTab={handleTabChange} />

            {/* Core Transmission Innovations Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  KEY TRANSMISSION ENGINEERING HIGHLIGHTS
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight font-heading">
                  Designed for Heavy Gradeability & High Endurance
                </h2>
                <p className="text-slate-400 text-base mt-3">
                  Under Module ME3813, our design team engineered an optimized 5-speed manual gearbox tailored to the exact dynamic resistance characteristics of the Toyota Highlander.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Highlight 1 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">
                      Gradeability Target
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      35 km/h on 30° Incline
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      First gear delivers 30,068 N of tractive force, achieving a robust 2.33 factor of safety over the 12,915 N slope climb resistance.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">1st Gear Ratio</span>
                    <span className="text-amber-400 font-mono font-bold">1.800 (Comb. 6.489)</span>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-sky-500 uppercase tracking-wider font-semibold">
                      Powertrain Match
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      1,480 N·m Peak Torque
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Matched to Dongfeng Cummins L375-30 diesel engine (275 kW / 375 HP), operating strictly within the optimum 1,100–1,600 RPM band.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Optimum RPM</span>
                    <span className="text-sky-400 font-mono font-bold">1,100 – 1,600 RPM</span>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">
                      Fatigue Prevention
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      AISI 4340 Alloy Shafts
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Upgraded from AISI 1045 to AISI 4340 Ni-Cr-Mo steel (1,110 MPa tensile strength) to eliminate risk of torsional fatigue under sudden shock.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Endurance</span>
                    <span className="text-emerald-400 font-mono font-bold">+89% Fatigue Limit</span>
                  </div>
                </div>

                {/* Highlight 4 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-purple-500 uppercase tracking-wider font-semibold">
                      Geometry Standard
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      Constant Mesh 210mm
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Module 5mm with fixed center distance 210mm (sum of teeth = 84) paired with 3 sliding face dog clutches for rapid gear selection.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Tooth Sum</span>
                    <span className="text-purple-400 font-mono font-bold">84 Teeth (Fixed)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Spotlight 1: Interactive Simulator Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 rounded-3xl border border-slate-800 p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                      <Activity className="w-3.5 h-3.5" />
                      INTERACTIVE MECHANICAL CANVAS
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
                      Dynamic Transmission Simulator
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Shift through 5 forward gears, Neutral, and Reverse on an animated mechanical canvas. Observe spinning gears, dog clutch displacements, power flow routes, and live calculations for traction force, wheel torque, and Lewis tooth bending stress.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => handleTabChange('simulator')}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
                      >
                        Launch Interactive Dyno <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTabChange('gears-matrix')}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
                      >
                        View Lewis Equations <Layers className="w-4 h-4 text-sky-400" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div 
                      onClick={() => handleTabChange('simulator')}
                      className="cursor-pointer group relative rounded-2xl overflow-hidden border border-slate-700 bg-[#090e1d] p-4 shadow-2xl hover:border-amber-500/60 transition-all hover:scale-[1.01]"
                    >
                      <img 
                        src="/slides/slide_10.png" 
                        alt="Transmission Layout"
                        className="w-full h-72 object-cover rounded-xl bg-slate-950 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-mono text-amber-400 font-bold bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                            Launch Dynamic Simulator →
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Live Canvas Engine
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Spotlight 2: Solid Edge CAD & 14 Slides Previews */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CAD Models Card */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                        <Box className="w-3.5 h-3.5" />
                        SOLID EDGE 3D CAD & 2D DRAFTS
                      </div>
                      <span className="text-xs font-mono text-slate-500">Siemens Solid Edge</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      Parametric Digital Twin & Production Drafts
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Complete parametric modeling of the transmission assembly (<span className="text-cyan-400 font-mono font-semibold">Final Assembly.asm</span>), shafts, gears, and GD&T production drawings (<span className="text-amber-400 font-mono font-semibold">.DFT</span>).
                    </p>

                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-6">
                      <img 
                        src="/slides/slide_12.png" 
                        alt="3D CAD" 
                        className="w-full h-44 object-cover"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange('solid-edge-cad')}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
                  >
                    Inspect 3D CAD & Download .ASM <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>

                {/* Presentation & Report Card */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        <Sliders className="w-3.5 h-3.5" />
                        DEFENSE SLIDES & 98-PG REPORT
                      </div>
                      <span className="text-xs font-mono text-slate-500">14 Slides + 98 Pages</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      Final Defense Slides & Technical Report
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Authored by <span className="text-amber-400 font-semibold">Premakumara H.P.S. (210494D)</span> and Group 11. Includes handwritten engineering logbook and complete calculations.
                    </p>

                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-6">
                      <img 
                        src="/slides/slide_01.png" 
                        alt="Presentation Cover" 
                        className="w-full h-44 object-cover"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleTabChange('slides')}
                      className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
                    >
                      View 14 Slides <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                    <button
                      onClick={() => handleTabChange('report')}
                      className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
                    >
                      Read 98-Pg Report <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Interactive Transmission Simulator */}
        {activeTab === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <InteractiveGearboxSimulator />
          </div>
        )}

        {/* Tab 3: Gear Teeth & Stress Analysis Matrix */}
        {activeTab === 'gears-matrix' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <GearAnalysisMatrix />
          </div>
        )}

        {/* Tab 4: Shaft Fatigue & SKF Bearings */}
        {activeTab === 'shafts-bearings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <ShaftFatigueViewer />
          </div>
        )}

        {/* Tab 5: Solid Edge CAD Models & Drafts */}
        {activeTab === 'solid-edge-cad' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <SolidEdgeCadViewer />
          </div>
        )}

        {/* Tab 6: 14 Presentation Slides */}
        {activeTab === 'slides' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <PresentationSlidesViewer />
          </div>
        )}

        {/* Tab 7: 98-Page Design Report & Logbook */}
        {activeTab === 'report' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <ReportReader />
          </div>
        )}
      </main>

      {/* Persistent Academic Footer */}
      <Footer onNavigateTab={handleTabChange} />
    </div>
  );
}

export default App;
