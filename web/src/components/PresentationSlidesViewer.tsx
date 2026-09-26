import React, { useState } from 'react';
import { 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  Grid, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PRESENTATION_SLIDES, type PresentationSlide } from '../core/gearboxData';

export const PresentationSlidesViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const currentSlide: PresentationSlide = PRESENTATION_SLIDES[currentSlideIndex] || PRESENTATION_SLIDES[0];

  const goToNextSlide = () => {
    if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5" />
            FINAL DEFENSE PRESENTATION • 14 SLIDES
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
            Design Defense Presentation Deck
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Delivered by TechGear WKS (Group 11) • University of Moratuwa • Evaluated by Department Faculty
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Slide Mode
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid (14 Slides)
            </button>
          </div>

          <a
            href="/docs/ME3813_Presentation_Group11.pdf"
            download="ME3813_Presentation_Group11.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Download PDF Slides
          </a>
        </div>
      </div>

      {viewMode === 'carousel' ? (
        /* CAROUSEL SLIDE VIEWER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Slide Screen (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 lg:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 font-bold text-sm">
                  Slide {currentSlide.slideNumber} of {PRESENTATION_SLIDES.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium truncate max-w-[280px] sm:max-w-md">
                  {currentSlide.title}
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

            {/* Slide Image with Left/Right Nav Arrows */}
            <div className="relative group bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center min-h-[420px] border border-slate-800/80">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="max-h-[580px] w-auto object-contain transition-transform duration-200 select-none shadow-2xl"
                loading="eager"
              />

              {/* Prev Button */}
              {currentSlideIndex > 0 && (
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {currentSlideIndex < PRESENTATION_SLIDES.length - 1 && (
                <button
                  onClick={goToNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Scrubber */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={goToPrevSlide}
                disabled={currentSlideIndex === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <input
                type="range"
                min="0"
                max={PRESENTATION_SLIDES.length - 1}
                value={currentSlideIndex}
                onChange={(e) => setCurrentSlideIndex(parseInt(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />

              <button
                onClick={goToNextSlide}
                disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Slide Context & Filmstrip (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Slide Metadata Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                {currentSlide.topic}
              </span>
              <h3 className="text-xl font-bold text-white font-heading">
                {currentSlide.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {currentSlide.summary}
              </p>

              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Project:</span>
                  <span className="text-slate-200 font-mono">ME3813 (Sem 5)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Design Group:</span>
                  <span className="text-amber-400 font-mono font-medium">TechGear WKS (Group 11)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Author:</span>
                  <span className="text-white font-semibold">Premakumara H.P.S. (210494D)</span>
                </div>
              </div>
            </div>

            {/* Slide Thumbnail Filmstrip */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
                <span>Slide Filmstrip</span>
                <span className="font-mono text-slate-500">14 Slides</span>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                {PRESENTATION_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.slideNumber}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`relative rounded-lg overflow-hidden border transition-all ${
                      currentSlideIndex === idx
                        ? 'border-amber-500 ring-2 ring-amber-500/30 scale-95'
                        : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={`Slide ${slide.slideNumber}`}
                      className="w-full h-20 object-cover bg-slate-950"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[10px] font-mono text-center text-slate-300 py-0.5">
                      Slide {slide.slideNumber}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* GRID VIEW (ALL 14 SLIDES) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRESENTATION_SLIDES.map((slide, idx) => (
            <div
              key={slide.slideNumber}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setViewMode('carousel');
              }}
              className="group cursor-pointer bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 p-3 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/9] mb-3 flex items-center justify-center border border-slate-800">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-amber-400 font-bold">
                  #{slide.slideNumber}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  {slide.topic}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {slide.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-amber-400 font-mono text-sm font-bold">
                Slide {currentSlide.slideNumber}: {currentSlide.title}
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
              src={currentSlide.image}
              alt={currentSlide.title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
