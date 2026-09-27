import React from 'react';
import { 
  Download, 
  Box, 
  Award, 
  ChevronUp, 
  FileText, 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Layers,
  Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-slate-800 bg-[#060a14] text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Upper Attribution Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              UNIVERSITY OF MORATUWA • DEPT. OF MECHANICAL ENGINEERING
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
              5-Speed Industrial Manual Transmission Gearbox
            </h3>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Academic design project by <span className="text-amber-400 font-semibold underline decoration-amber-500/30 underline-offset-4">Premakumara H.P.S. (Index: 210494D)</span> and TechGear WKS (Group 11) under Module <span className="text-slate-200 font-mono">ME3813</span>. Engineered for the Toyota Highlander with Cummins L375-30 powertrain, Lewis bending verification, and ASME shaft fatigue analysis.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <a
              href="/cad_models/Final Assembly.asm"
              download="Final Assembly.asm"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-all hover:scale-105 shadow-lg"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              Download .ASM CAD Model
            </a>

            <a
              href="/docs/ME3813_Final_Report_Group11.pdf"
              download="ME3813_Final_Report_Group11.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              Download Report (98 Pgs)
            </a>
          </div>
        </div>

        {/* 4 Columns Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          
          {/* Column 1: Modules */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Project Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Interactive 5-Speed Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('gears-matrix')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Gear Teeth & Lewis Stress Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('shafts-bearings')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ASME Shaft Fatigue & SKF Bearings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('solid-edge-cad')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Solid Edge 3D CAD & 2D Drafts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('slides')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  14 Presentation Slides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('report')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  98-Page Report & Logbook
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Key Engineering Specs */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Key Engineering Metrics
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>• Target Vehicle: <span className="text-slate-200">Toyota Highlander</span></li>
              <li>• Gross Weight: <span className="text-slate-200">2,550 kg (5 Pass.)</span></li>
              <li>• Engine: <span className="text-slate-200">Cummins L375-30 (275 kW)</span></li>
              <li>• Peak Torque: <span className="text-amber-400">1,480 N·m @ 1100 RPM</span></li>
              <li>• Center Distance: <span className="text-slate-200">a = 210.0 mm</span></li>
              <li>• Module & Pressure: <span className="text-slate-200">m = 5 mm, 20° Involute</span></li>
            </ul>
          </div>

          {/* Column 3: Material Engineering */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Material Selections
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono">✔</span>
                <span><strong>Gears:</strong> AISI 8620 Alloy Steel (Case Hardened, 900 BHN)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono">✔</span>
                <span><strong>Shafts:</strong> AISI 4340 Ni-Cr-Mo Steel (Upgraded from 1045)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono">✔</span>
                <span><strong>Bearings:</strong> SKF Angular Contact (L_10h &gt; 10,000 hrs)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono">✔</span>
                <span><strong>Clutches:</strong> 3 Sliding Face Dog Clutches with Interlock</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Authorship & Academic Info */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Team & Academic Info
            </h4>
            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
              <div>
                <p className="text-white font-bold">Premakumara H.P.S.</p>
                <p className="font-mono text-amber-400 font-semibold">Index: 210494D</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-slate-300 font-medium">Themiya K.L. (Group Lead)</p>
                <p className="font-mono text-slate-500">Index: 210640A</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-slate-300 font-medium">Udayakantha D.A.W.I.</p>
                <p className="font-mono text-slate-500">Index: 210660J</p>
              </div>
              <p className="text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-800">
                Group 11: TechGear WKS • Sem 5
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ME3813 Machine Element Design. Industrial 5-Speed Manual Transmission designed and authored by Premakumara H.P.S. (210494D) and TechGear WKS (Group 11).
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://github.com/premakumarahps/automotive-gearbox-machine-design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://premakumarahps.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Main Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>


          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
