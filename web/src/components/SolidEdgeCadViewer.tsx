import React, { useState } from 'react';
import { 
  Box, 
  Download, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface CadItem {
  id: string;
  name: string;
  type: 'Assembly' | 'Shaft' | 'Gear' | 'Clutch' | 'Production Drawing';
  filename: string;
  filesize: string;
  description: string;
  downloadPath: string;
}

export const SolidEdgeCadViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const cadItems: CadItem[] = [
    {
      id: 'final_assembly',
      name: 'Final Transmission Assembly',
      type: 'Assembly',
      filename: 'Final Assembly.asm',
      filesize: '1.75 MB',
      description: 'Complete 3D CAD assembly in Solid Edge containing all 13 gears, input/lay/output shafts, dog clutches, and roller bearings.',
      downloadPath: '/cad_models/Final Assembly.asm'
    },
    {
      id: 'draft_input_shaft',
      name: 'Input Shaft Production Drawing',
      type: 'Production Drawing',
      filename: 'Input Shaft.dft',
      filesize: '540 KB',
      description: 'Complete 2D manufacturing draft with GD&T tolerances, surface finishes, keyways, and bearing mounting shoulders.',
      downloadPath: '/cad_models/Input Shaft.dft'
    },
    {
      id: 'draft_output_shaft',
      name: 'Output Shaft Production Drawing',
      type: 'Production Drawing',
      filename: 'OutPut Shaft.dft',
      filesize: '626 KB',
      description: 'Detailed drawing showing spline profiles for sliding dog clutches, bearing seats, and differential output flange.',
      downloadPath: '/cad_models/OutPut Shaft.dft'
    },
    {
      id: 'draft_lay_shaft',
      name: 'Counter / Lay Shaft Production Drawing',
      type: 'Production Drawing',
      filename: 'Lay Shaft.dft',
      filesize: '643 KB',
      description: 'Manufacturing drawing detailing parallel keyways for pressed gears b, d, f, h, j, and outer bearing press fits.',
      downloadPath: '/cad_models/Lay Shaft.dft'
    },
    {
      id: 'draft_idler_shaft',
      name: 'Reverse Idler Shaft Production Drawing',
      type: 'Production Drawing',
      filename: 'Idler Shaft.dft',
      filesize: '548 KB',
      description: 'Draft for stationary idler shaft supporting the needle roller bearing assembly of the 18T reverse idler gear.',
      downloadPath: '/cad_models/Idler Shaft.dft'
    },
    {
      id: 'draft_gear_a',
      name: 'Gear A (42T Input Drive) Drawing',
      type: 'Production Drawing',
      filename: '1.Gear A.dft',
      filesize: '679 KB',
      description: 'Production drawing with 20° involute tooth profile, module 5mm, pitch diameter Ø210mm, and internal bore keyway.',
      downloadPath: '/cad_models/1.Gear A.dft'
    },
    {
      id: 'draft_gear_b',
      name: 'Gear B (42T Countershaft) Drawing',
      type: 'Production Drawing',
      filename: '3.Gear B.dft',
      filesize: '540 KB',
      description: 'Precision draft for driven countershaft gear meshing with Gear A at a 1:1 speed ratio.',
      downloadPath: '/cad_models/3.Gear B.dft'
    },
    {
      id: 'draft_gear_a1',
      name: 'Gear a (54T 1st Gear Driven) Drawing',
      type: 'Production Drawing',
      filename: '4. Gear a.dft',
      filesize: '434 KB',
      description: '1st gear driven wheel with internal needle bearing track and dog teeth engagement splines.',
      downloadPath: '/cad_models/4. Gear a.dft'
    },
    {
      id: 'draft_gear_idler',
      name: 'Reverse Idler Gear Drawing',
      type: 'Production Drawing',
      filename: '2.Gear idler.dft',
      filesize: '475 KB',
      description: '18-tooth intermediate reverse gear designed to invert the direction of rotation for the output shaft.',
      downloadPath: '/cad_models/2.Gear idler.dft'
    },
    {
      id: 'part_input_shaft',
      name: 'Input Shaft 3D Model',
      type: 'Shaft',
      filename: 'Input Shaft.par',
      filesize: '344 KB',
      description: 'Solid Edge 3D part file of the Ø50mm input shaft designed for the clutch disc splines.',
      downloadPath: '/cad_models/Final Assembly.asm'
    },
    {
      id: 'part_lay_shaft',
      name: 'Counter / Lay Shaft 3D Model',
      type: 'Shaft',
      filename: 'Lay Shaft.par',
      filesize: '585 KB',
      description: 'Solid Edge 3D part file of the Ø65mm countershaft supporting 6 fixed gears.',
      downloadPath: '/cad_models/Final Assembly.asm'
    },
    {
      id: 'part_output_shaft',
      name: 'Main Output Shaft 3D Model',
      type: 'Shaft',
      filename: 'OutPut Shaft.par',
      filesize: '634 KB',
      description: 'Solid Edge 3D part file of the Ø75mm stepped output shaft with integral spline sections.',
      downloadPath: '/cad_models/Final Assembly.asm'
    },
    {
      id: 'part_dog_clutch_1',
      name: 'Dog Clutch 01 (1st - 2nd Gear)',
      type: 'Clutch',
      filename: 'Dog Cluch 01 New.par',
      filesize: '593 KB',
      description: 'Solid Edge 3D part file of the double-sided face dog collar with selector fork groove.',
      downloadPath: '/cad_models/Final Assembly.asm'
    }
  ];

  const categories = ['All', 'Assembly', 'Production Drawing', 'Shaft', 'Clutch'];

  const filteredItems = selectedCategory === 'All'
    ? cadItems
    : cadItems.filter(item => item.type === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
            <Box className="w-3.5 h-3.5" />
            SIEMENS SOLID EDGE 3D DIGITAL TWIN & 2D DRAFTS
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
            Solid Edge CAD Assembly & Production Drawings
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Modeled by TechGear WKS (Group 11) • University of Moratuwa • Ready for CNC Machining & Fabrication
          </p>
        </div>

        <a
          href="/cad_models/Final Assembly.asm"
          download="Final Assembly.asm"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
        >
          <Download className="w-4 h-4" />
          Download 3D Assembly (.ASM)
        </a>
      </div>

      {/* Visual CAD Showcase Grid: Renders from Slide 12 & 13 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Render Card 1: 3D Assembly */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3 hover-lift">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400 font-semibold">Slide 12: 3D CAD Virtual Assembly</span>
            <span className="text-slate-500 font-mono">Solid Edge .ASM</span>
          </div>
          <div 
            onClick={() => setZoomedImage('/slides/slide_12.png')}
            className="cursor-pointer relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 group"
          >
            <img 
              src="/slides/slide_12.png" 
              alt="Solid Edge 3D Assembly" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-mono flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Click to Expand
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Parametric digital twin of the complete 5-speed transmission showing input shaft (green), layshaft (blue), output shaft (amber), gears, and dog clutches.
          </p>
        </div>

        {/* Render Card 2: Production Drawings */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3 hover-lift">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-amber-400 font-semibold">Slide 13: 2D Production Drafts (.DFT)</span>
            <span className="text-slate-500 font-mono">ISO Standard GD&T</span>
          </div>
          <div 
            onClick={() => setZoomedImage('/slides/slide_13.png')}
            className="cursor-pointer relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 group"
          >
            <img 
              src="/slides/slide_13.png" 
              alt="Production Drafts" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-mono flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> Click to Expand
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Technical manufacturing drawings with dimensional tolerances, keyway depths, surface roughness (Ra 0.8 µm on gear teeth), and bearing shoulder radiuses.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CAD File List Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-heading">
            Solid Edge Engineering Asset Repository
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {filteredItems.length} Files Available
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="p-5 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {item.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-400 border border-slate-700">
                    {item.type}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {item.filesize}
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  {item.description}
                </p>
                <span className="text-[11px] font-mono text-amber-500/80 block">
                  File: {item.filename}
                </span>
              </div>

              <a
                href={item.downloadPath}
                download={item.filename}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all hover:scale-105 shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download File</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-cyan-400 font-mono text-sm font-bold">
              CAD Preview Viewer • Click anywhere to close
            </span>
            <button 
              onClick={() => setZoomedImage(null)}
              className="px-3 py-1 rounded-lg bg-slate-800 text-white text-xs font-mono"
            >
              Close [Esc]
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img 
              src={zoomedImage} 
              alt="Zoomed CAD" 
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
