"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flame, ArrowRight, CheckCircle2, ShieldCheck, RotateCcw, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/data/retechData";

interface HeroCarouselProps {
  onOpenValuation: () => void;
}

export default function HeroCarousel({ onOpenValuation }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -50) {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full relative py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${slide.bgColor} flex items-center`}
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                  <Flame className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                  {slide.badge}
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  {slide.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                  <a href="#trending">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-600/30 transition-all hover:scale-105">
                      {slide.ctaText} <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  </a>
                  <button
                    onClick={onOpenValuation}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base px-8 py-4 rounded-2xl backdrop-blur transition"
                  >
                    {slide.ctaSecondaryText}
                  </button>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-300 font-semibold">
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <CheckCircle2 className="h-4 w-4" /> 45-Point Tested
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <ShieldCheck className="h-4 w-4" /> 1-Year Warranty
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <RotateCcw className="h-4 w-4" /> 7-Day Easy Returns
                  </div>
                </div>
              </div>

              {/* Right Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md aspect-[4/3] sm:aspect-square rounded-3xl bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent p-4 sm:p-6 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <img
                      src={slide.image}
                      alt={slide.deviceTag}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl shadow-2xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                        {slide.discountTag}
                      </span>
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[3]" /> {slide.accentBadge}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white max-w-[200px] truncate">{slide.deviceTag}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-orange-400">{slide.price}</span>
                      <span className="text-xs text-slate-400 line-through">{slide.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/20 hover:bg-orange-600 text-white flex items-center justify-center backdrop-blur-md transition shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/20 hover:bg-orange-600 text-white flex items-center justify-center backdrop-blur-md transition shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "w-8 bg-orange-500 shadow-md shadow-orange-500/50" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}