import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Layers, 
  CheckCircle2,
  Award,
  Sparkles
} from 'lucide-react';
import { LOGBOOK_PAGES, type LogbookPage } from '../core/gearboxData';

interface ReportPageSample {
  pageNumber: number;
  chapter: string;
  title: string;
  summary: string;
  image: string;
}

export const ReportReader: React.FC = () => {
  const [activeDocType, setActiveDocType] = useState<'report' | 'logbook'>('report');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Key report pages rendered
  const reportKeyPages: ReportPageSample[] = [
    { pageNumber: 1, chapter: 'Title & Submission', title: 'ME3813 Gearbox Design Final Report', summary: 'Cover page: TechGear WKS (Group 11) - Premakumara H.P.S. (210494D), Themiya K.L. (210640A, Lead), Udayakantha D.A.W.I. (210660J).', image: '/report_pages/report_page_01.png' },
    { pageNumber: 2, chapter: '1. Table of Contents', title: 'Report Table of Contents', summary: 'Outlines the 15 major chapters from Vehicle Selection to Shaft Sizing, Bearings, and Design Justification.', image: '/report_pages/report_page_02.png' },
    { pageNumber: 3, chapter: '2. Design Parameters', title: 'Vehicle Parameters & Toyota Highlander', summary: 'Given constraints: 2050 kg curb, 5 passengers, 0-170 km/h, 35 km/h @ 30 deg incline, frontal dimensions 1930 x 1755 mm.', image: '/report_pages/report_page_03.png' },
    { pageNumber: 4, chapter: '3. Tyre Selection', title: 'Tire Sizing & Safety Factors (235/55R20)', summary: 'Selection of 235/55R20 tires with load index 104 (900 kg) and speed rating T (190 km/h).', image: '/report_pages/report_page_04.png' },
    { pageNumber: 18, chapter: '7. Gear Ratio Calculations', title: 'Engine Optimum RPM & Ratio Selection', summary: 'Plotting engine RPM vs wheel RPM to achieve geometric progression with progression factor phi = 0.6875.', image: '/report_pages/report_page_18.png' },
    { pageNumber: 19, chapter: '7. Gear Ratio Calculations', title: 'Geometric Ratio Distribution Curve', summary: 'Mathematical derivation of combined gear ratios I1 through I5 for 1100 to 1600 RPM optimum torque band.', image: '/report_pages/report_page_19.png' },
    { pageNumber: 20, chapter: '7. Gear Ratio Calculations', title: 'Transmission & Differential Ratios', summary: 'Differential ratio 3.605:1 gives 1st gear 1.826, 2nd 1.256, 3rd 0.863, 4th 0.594, 5th 0.408.', image: '/report_pages/report_page_20.png' },
    { pageNumber: 21, chapter: '7. Gear Ratio Calculations', title: 'Speed & Gear Ratio Summary Table', summary: 'Table 6: Speed in each gear at 1600 RPM (1st: 35 km/h, 2nd: 52 km/h, 3rd: 75 km/h, 4th: 109 km/h, 5th: 170 km/h).', image: '/report_pages/report_page_21.png' },
    { pageNumber: 22, chapter: '8. Gear Teeth Calculations', title: 'Involute System & Center Distance', summary: '20 deg full depth involute system to avoid pinion interference. Shaft center distance d = 9.5 * cuberoot(Tmax) -> 168 mm.', image: '/report_pages/report_page_22.png' },
    { pageNumber: 23, chapter: '8. Gear Teeth Calculations', title: 'Tooth Count Derivation (Sum = 84)', summary: 'Input drive pair 42T/42T, 1st 54T/30T, 2nd 47T/37T, 3rd 39T/45T, 4th 31T/53T, 5th 24T/60T.', image: '/report_pages/report_page_23.png' },
    { pageNumber: 24, chapter: '8. Gear Teeth Calculations', title: 'Actual Gear Ratios & Reverse Idler', summary: 'Reverse gear stage with 18T idler wheel. Module finalized at m = 5 mm after Lewis bending strength verification.', image: '/report_pages/report_page_24.png' },
    { pageNumber: 25, chapter: '8. Gear Teeth Calculations', title: 'Involute Geometry & Pitch Diameters', summary: 'Addendum 5mm, dedendum 6.25mm, tooth thickness 7.854mm, pitch circle diameters from 90mm to 300mm.', image: '/report_pages/report_page_25.png' },
    { pageNumber: 26, chapter: '8.2 Gear Strength & Material', title: 'AISI 8620 Alloy Steel Properties', summary: 'Oil-quenched and tempered at 540 deg C with allowable tensile strength 800 MPa and 900 BHN hardness.', image: '/report_pages/report_page_26.png' },
    { pageNumber: 27, chapter: '8.3 Tangential Load Calculations', title: 'Tangential Tooth Force & Angular Velocity', summary: 'Calculating pitch line velocities and permissible tangential tooth load with service factor Cs = 1.54.', image: '/report_pages/report_page_27.png' },
    { pageNumber: 28, chapter: '8.4 Dynamic Tooth Load', title: 'Buckingham Dynamic Tooth Load Equation', summary: 'Deformation factor C in N/mm and total dynamic load W_D verification against beam strength.', image: '/report_pages/report_page_28.png' },
    { pageNumber: 29, chapter: '8.5 Safety Check of Gears', title: 'Comprehensive Gear Safety Matrix', summary: 'Table 17: All gear pairs verified SAFE with allowable static stress sigma_0 < 800 MPa limit.', image: '/report_pages/report_page_29.png' },
    { pageNumber: 30, chapter: '9. Shaft Diameter Calculation', title: 'Overall Shaft Diameter Procedure', summary: 'ASME code equations for combined bending and torsion under shock factors Km=1.5 and Kt=1.0.', image: '/report_pages/report_page_30.png' },
    { pageNumber: 31, chapter: '9. Shaft Diameter Calculation', title: 'Input Shaft Shear & Bending Moments', summary: '3D resultant moment calculation for input shaft yielding minimum diameter d = 42.8 mm -> standard Ø50 mm.', image: '/report_pages/report_page_31.png' },
    { pageNumber: 32, chapter: '9. Shaft Diameter Calculation', title: 'Counter / Lay Shaft Bending Vectors', summary: 'Reaction forces at bearing supports and max bending moment M = 1245.8 N·m -> standard Ø65 mm.', image: '/report_pages/report_page_32.png' },
    { pageNumber: 33, chapter: '9. Shaft Diameter Calculation', title: 'Main Output Shaft Bending & Torque', summary: 'Peak output torque in 1st gear 3167.6 N·m -> minimum diameter d = 68.2 mm -> standard Ø75 mm.', image: '/report_pages/report_page_33.png' },
    { pageNumber: 34, chapter: '9. Shaft Diameter Calculation', title: 'Reverse Idler Shaft Sizing', summary: 'Stationary cantilever/simply-supported pin under pure bending -> standard Ø35 mm.', image: '/report_pages/report_page_34.png' },
    { pageNumber: 35, chapter: '10. Bearing Selection', title: 'SKF Rolling Element Bearing Ratings', summary: 'Dynamic equivalent load P and L10h life ratings exceeding 10,000 operating hours criterion.', image: '/report_pages/report_page_35.png' },
    { pageNumber: 92, chapter: '14. Design Verification', title: 'Traction Force & Incline Justification', summary: 'Verification of 1st gear traction 30,068 N (SF = 2.33) and 5th gear traction 7,513 N (SF = 3.25).', image: '/report_pages/report_page_92.png' },
    { pageNumber: 93, chapter: '15. Discussion', title: 'Material Selection Adjustments (AISI 4340)', summary: 'Engineering justification for upgrading shafts to AISI 4340 alloy steel to prevent fatigue failure.', image: '/report_pages/report_page_93.png' },
    { pageNumber: 94, chapter: '15. Discussion', title: 'Manufacturing & Heat Treatment Specs', summary: 'Recommendations for carburizing, oil quenching, precision tooth grinding (Ra 0.8 um), and maintenance.', image: '/report_pages/report_page_94.png' }
  ];

  const currentList = activeDocType === 'report' ? reportKeyPages : LOGBOOK_PAGES;
  const currentItem = currentList[currentPageIndex] || currentList[0];

  const goToNextPage = () => {
    if (currentPageIndex < currentList.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            ACADEMIC TECHNICAL DOCUMENTATION • 98 PAGES + LOGBOOK
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
            Design Report & Engineering Logbook Reader
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Department of Mechanical Engineering • University of Moratuwa • Module ME3813
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Doc Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => {
                setActiveDocType('report');
                setCurrentPageIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeDocType === 'report'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Final Report (98 Pgs)
            </button>
            <button
              onClick={() => {
                setActiveDocType('logbook');
                setCurrentPageIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeDocType === 'logbook'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Premakumara's Logbook (7 Pgs)
            </button>
          </div>

          {/* Download Buttons */}
          <a
            href={
              activeDocType === 'report'
                ? '/docs/ME3813_Final_Report_Group11.pdf'
                : '/docs/210494D_Logbook_Premakumara.pdf'
            }
            download={
              activeDocType === 'report'
                ? 'ME3813_Final_Report_Group11.pdf'
                : '210494D_Logbook_Premakumara.pdf'
            }
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Reader Canvas & Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Document Display Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 lg:p-6 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-400 font-bold text-sm">
                {activeDocType === 'report' 
                  ? `Report Page ${currentItem.pageNumber}` 
                  : `Logbook Page ${currentItem.pageNumber} of ${LOGBOOK_PAGES.length}`}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-medium truncate max-w-[280px] sm:max-w-md">
                {currentItem.title}
              </span>
            </div>

            <button
              onClick={() => setIsZoomed(true)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              title="Fullscreen Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Document Render Image */}
          <div className="relative group bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center min-h-[500px] border border-slate-800/80">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[700px] w-auto object-contain transition-transform duration-200 select-none shadow-2xl"
              loading="eager"
            />

            {/* Prev Button */}
            {currentPageIndex > 0 && (
              <button
                onClick={goToPrevPage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {currentPageIndex < currentList.length - 1 && (
              <button
                onClick={goToNextPage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Scrubber / Slider */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPageIndex === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>

            <input
              type="range"
              min="0"
              max={currentList.length - 1}
              value={currentPageIndex}
              onChange={(e) => setCurrentPageIndex(parseInt(e.target.value))}
              className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <button
              onClick={goToNextPage}
              disabled={currentPageIndex === currentList.length - 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Metadata & Thumbnails (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
              {activeDocType === 'report' ? (currentItem as ReportPageSample).chapter : 'Handwritten Engineering Log'}
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              {currentItem.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {currentItem.summary}
            </p>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Author:</span>
                <span className="text-white font-semibold">
                  {activeDocType === 'report' ? 'Premakumara H.P.S.' : (currentItem as LogbookPage).author}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Index:</span>
                <span className="text-amber-400 font-mono font-bold">210494D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="text-slate-300">Mechanical Engineering</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">University:</span>
                <span className="text-slate-300">University of Moratuwa</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Filmstrip */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
              <span>{activeDocType === 'report' ? 'Key Report Pages' : 'Logbook Pages'}</span>
              <span className="font-mono text-slate-500">{currentList.length} Total</span>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {currentList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`relative rounded-lg overflow-hidden border transition-all ${
                    currentPageIndex === idx
                      ? 'border-amber-500 ring-2 ring-amber-500/30 scale-95'
                      : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`P${item.pageNumber}`}
                    className="w-full h-24 object-cover bg-slate-950"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[10px] font-mono text-center text-slate-300 py-0.5">
                    P.{item.pageNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-amber-400 font-mono text-sm font-bold">
                Page {currentItem.pageNumber}: {currentItem.title}
              </span>
              <span className="text-slate-500 text-xs ml-3 font-mono">
                Click anywhere to close
              </span>
            </div>
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
