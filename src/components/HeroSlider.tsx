"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { PromoBanner, defaultBanners, normalizeBannerPath } from "@/lib/bannerData";

interface HeroSliderProps {
  banners?: PromoBanner[];
}

export default function HeroSlider({ banners = defaultBanners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const bannerList = banners && banners.length > 0 ? banners : defaultBanners;

  // Auto-play timer (every 6 seconds for better reading experience)
  useEffect(() => {
    if (isPaused || bannerList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, bannerList.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerList.length) % bannerList.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerList.length);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, banner: PromoBanner) => {
    const target = e.currentTarget;
    const tried = target.getAttribute("data-tried") || "0";
    if (tried === "0") {
      target.setAttribute("data-tried", "1");
      // Coba path alternatif di /images/ jika sebelumnya di /images/banners/
      const cleanName = banner.image.replace(/^\/images\/(banners\/)?/, "");
      target.src = `/images/${cleanName}`;
    } else if (tried === "1") {
      target.setAttribute("data-tried", "2");
      // Fallback ke foto kampus utama yang dijamin ada
      target.src = "/images/gedung-upitra.jpg";
    }
  };

  const isExternalUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <section className="relative w-full bg-slate-100/70 py-3 sm:py-5 border-b border-slate-200" aria-label="Banner Promosi">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Carousel Container */}
        <div
          className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-900 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides Track */}
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bannerList.map((banner, idx) => {
              const isLoaded = loadedImages[banner.id];
              const normalizedSrc = normalizeBannerPath(banner.image);
              const fallbackGrad = banner.fallbackGradient || "from-[#05172e] via-[#0b2545] to-[#0f3b73]";

              return (
                <div key={banner.id} className="w-full h-full shrink-0 relative overflow-hidden bg-slate-950">
                  {/* 1. Background Image */}
                  <img
                    src={normalizedSrc}
                    alt={banner.alt || banner.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={() => handleImageLoad(banner.id)}
                    onError={(e) => handleImageError(e, banner)}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* 2. Dark Gradient Overlay untuk Keterbacaan Teks Maksimal */}
                  {!banner.isGraphicOnly && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#04162e]/95 via-[#071f3d]/80 sm:via-[#071f3d]/65 to-transparent/40 z-10" />
                  )}

                  {/* 3. Text & CTA Overlay Content (Mode Konten Kampus) */}
                  {!banner.isGraphicOnly ? (
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
                      
                      {/* Badge Promosi */}
                      {banner.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/30 text-sky-200 text-[10px] sm:text-xs font-black tracking-wider uppercase backdrop-blur-md w-fit">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{banner.badge}</span>
                        </div>
                      )}

                      {/* Judul Headline */}
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                        {banner.title}
                      </h2>

                      {/* Deskripsi Subtitle */}
                      {banner.subtitle && (
                        <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl font-normal drop-shadow-xs">
                          {banner.subtitle}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {/* Primary Button */}
                        {isExternalUrl(banner.link) ? (
                          <a
                            href={banner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                          >
                            <span>{banner.ctaText || "Daftar Sekarang"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            href={banner.link}
                            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                          >
                            <span>{banner.ctaText || "Pelajari Selengkapnya"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}

                        {/* Secondary Button (Optional) */}
                        {banner.secondaryCtaText && banner.secondaryCtaLink && (
                          isExternalUrl(banner.secondaryCtaLink) ? (
                            <a
                              href={banner.secondaryCtaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/20 transition-all"
                            >
                              <span>{banner.secondaryCtaText}</span>
                            </a>
                          ) : (
                            <Link
                              href={banner.secondaryCtaLink}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/20 transition-all"
                            >
                              <span>{banner.secondaryCtaText}</span>
                            </Link>
                          )
                        )}
                      </div>

                    </div>
                  ) : (
                    /* Mode Grafis Penuh (Full Flyer Link) */
                    isExternalUrl(banner.link) ? (
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20"
                        title={banner.title}
                      />
                    ) : (
                      <Link
                        href={banner.link}
                        className="absolute inset-0 z-20"
                        title={banner.title}
                      />
                    )
                  )}
                </div>
              );
            })}
          </div>

          {/* Left Navigation Chevron Button */}
          {bannerList.length > 1 && (
            <button
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="cursor-pointer absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg z-30 focus:outline-hidden"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Right Navigation Chevron Button */}
          {bannerList.length > 1 && (
            <button
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              className="cursor-pointer absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg z-30 focus:outline-hidden"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Bottom Bar: Indicators & Counter */}
          {bannerList.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-5 inset-x-0 flex items-center justify-between px-4 sm:px-8 z-30 pointer-events-none">
              
              {/* Dots Indicator */}
              <div className="flex items-center gap-2 pointer-events-auto bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                {bannerList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Pindah ke banner ${idx + 1}`}
                    className={`cursor-pointer transition-all duration-300 rounded-full h-2.5 ${
                      currentIndex === idx
                        ? "w-8 bg-blue-500 shadow-xs"
                        : "w-2.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter Badge */}
              <div className="pointer-events-auto bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/15">
                <span>{currentIndex + 1}</span> / <span>{bannerList.length}</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
