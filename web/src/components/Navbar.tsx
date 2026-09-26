import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Activity, 
  Layers, 
  ShieldAlert, 
  Box, 
  Sliders, 
  FileText, 
  Download, 
  Menu, 
  X,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // Scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // Scrolling up
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'simulator', label: 'Transmission Simulator', icon: Activity, badge: 'Live Physics' },
    { id: 'gears-matrix', label: 'Gear Sizing & Stress', icon: Layers, badge: 'Lewis/Buckingham' },
    { id: 'shafts-bearings', label: 'Shafts & SKF Bearings', icon: ShieldAlert, badge: 'AISI 4340' },
    { id: 'solid-edge-cad', label: 'Solid Edge CAD Models', icon: Box, badge: '.ASM / .DFT' },
    { id: 'slides', label: 'Presentation Slides', icon: Sliders, badge: '14 Slides' },
    { id: 'report', label: '98-Pg Report & Logbook', icon: FileText, badge: 'PDF' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } bg-[#080d1a]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/80`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Academic Title */}
            <div 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500/20 via-blue-600/30 to-amber-500/20 border border-sky-400/30 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-lg shadow-sky-500/10">
                <img 
                  src="/gear_logo.svg" 
                  alt="TechGear WKS Logo" 
                  className="w-full h-full object-contain gear-spin-cw" 
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-base tracking-wider text-white group-hover:text-amber-400 transition-colors">
                    TECHGEAR WKS
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    ME3813
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-tight">
                  5-Speed Industrial Gearbox • Univ. of Moratuwa
                </span>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-slate-800/90 shadow-md shadow-sky-500/5 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-mono px-1 py-0.5 rounded ${
                        isActive 
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 via-sky-400 to-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: CAD Model & Report Downloads */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="/cad_models/Final Assembly.asm"
                download="Final Assembly.asm"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-all hover:scale-[1.02]"
                title="Download Solid Edge 3D Assembly"
              >
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono">CAD .ASM</span>
              </a>

              <a
                href="/docs/ME3813_Final_Report_Group11.pdf"
                download="ME3813_Final_Report_Group11.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Report (98 Pgs)</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-2xl pt-24 pb-8 px-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-1">
              ME3813 Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-6 mt-4 border-t border-slate-800 flex flex-col gap-3">
              <a
                href="/cad_models/Final Assembly.asm"
                download="Final Assembly.asm"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs"
              >
                <Box className="w-4 h-4 text-cyan-400" />
                Download Solid Edge 3D Assembly (.ASM)
              </a>

              <a
                href="/docs/ME3813_Final_Report_Group11.pdf"
                download="ME3813_Final_Report_Group11.pdf"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                Download Full 98-Page Design Report
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
