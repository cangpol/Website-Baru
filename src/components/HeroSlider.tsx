"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  MessageCircle, 
  Building, 
  Users, 
  TrendingUp, 
  ShieldCheck,
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { PromoBanner, defaultBanners, normalizeBannerPath } from "@/lib/bannerData";

interface HeroSliderProps {
  banners?: PromoBanner[];
}

export default function HeroSlider({ banners = defaultBanners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const bannerList = banners && banners.length > 0 ? banners : defaultBanners;

  // Auto-play timer (every 6 seconds)
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

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, banner: PromoBanner) => {
    const target = e.currentTarget;
    const tried = target.getAttribute("data-tried") || "0";
    if (tried === "0") {
      target.setAttribute("data-tried", "1");
      const cleanName = banner.image.replace(/^\/images\/(banners\/)?/, "");
      target.src = `/images/${cleanName}`;
    } else if (tried === "1") {
      target.setAttribute("data-tried", "2");
      target.src = "/images/gedung-upitra.jpg";
    }
  };

  const isExternalUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <section className="relative w-full bg-[#06172e] text-white overflow-hidden select-none" aria-label="Grand Gateway UPITRA">
      {/* 1. CINEMATIC FULL-BLEED HERO CANVAS */}
      <div 
        className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Background Slides */}
        <div
          className="absolute inset-0 flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerList.map((banner, idx) => {
            const normalizedSrc = normalizeBannerPath(banner.image);

            return (
              <div key={banner.id} className="w-full h-full shrink-0 relative overflow-hidden bg-[#06172e]">
                {/* Hero Photo Asset */}
                <img
                  src={normalizedSrc}
                  alt={banner.alt || banner.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => handleImageError(e, banner)}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000"
                />

                {/* Deep Imperial Navy Gradient Overlay (Strict Blue & White Palette) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#041122]/95 via-[#071f3d]/85 to-[#0b2545]/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06172e] via-transparent to-transparent/40 z-10" />
              </div>
            );
          })}
        </div>

        {/* 2. HERO CONTENT LAYER */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            
            {/* University Crest / Official Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>Universitas Pignatelli Triputra • Surakarta</span>
            </div>

            {/* Main Authoritative Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Membentuk Pemimpin <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-200">
                Berkarakter Luhur &amp; Unggul
              </span>
            </h1>

            {/* Official Mission Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Pendidikan tinggi Sarjana (S1) dan Diploma (D3) berakreditasi unggul di bawah naungan <strong>Yayasan Santo Ignatius Pignatelli</strong> &amp; <strong>Triputra Group</strong>. Kurikulum selaras industri nyata, fasilitas modern di Solo, serta akses prioritas karir nasional.
            </p>

            {/* Dual Action Buttons (Blue & White) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60 transition-all hover:-translate-y-0.5"
              >
                <span>Daftar PMB 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#akademik"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/25 transition-all hover:-translate-y-0.5"
              >
                <span>Jelajahi 4 Fakultas</span>
              </a>
            </div>

          </div>
        </div>

        {/* Carousel Slider Controls (Left/Right Chevrons) */}
        {bannerList.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-30 focus:outline-hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-30 focus:outline-hidden"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slider Indicator Dots */}
        {bannerList.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 z-30 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            {bannerList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentIndex === idx ? "w-6 bg-blue-400" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. INTEGRATED FAST-TRACK ACTION DOCK (Clean White & Navy Accents) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 -mt-10 sm:-mt-12">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-3 sm:p-4 text-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            
            {/* Dock 1: Program Studi */}
            <a
              href="#akademik"
              className="group p-3 sm:p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#0b2545] group-hover:text-blue-700 truncate">
                  10 Program Studi
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Sarjana S1 &amp; Diploma D3
                </div>
              </div>
            </a>

            {/* Dock 2: Beasiswa PMB */}
            <a
              href="#jalur-pendaftaran"
              className="group p-3 sm:p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#0b2545] group-hover:text-blue-700 truncate">
                  Beasiswa s/d 100%
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Program Triputra Peduli
                </div>
              </div>
            </a>

            {/* Dock 3: Pendaftaran Online */}
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 sm:p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#0b2545] group-hover:text-blue-700 truncate">
                  Daftar PMB Online
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Portal Seleksi Resmi
                </div>
              </div>
            </a>

            {/* Dock 4: Konsultasi WhatsApp */}
            <a
              href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20pendaftaran%20mahasiswa%20baru"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 sm:p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-extrabold text-[#0b2545] group-hover:text-blue-700 truncate">
                  WhatsApp Admisi
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  0811-290-7500
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* 4. PRESTIGE METRICS BASELINE (Strict Blue & White Institutional Bar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-blue-900/60 text-center">
          
          <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              BAIK SEKALI
            </div>
            <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Akreditasi BAN-PT
            </div>
            <p className="text-[11px] text-slate-300">
              Standar mutu institusi perguruan tinggi nasional
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              4 FAKULTAS
            </div>
            <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              10 Program Studi
            </div>
            <p className="text-[11px] text-slate-300">
              Pendidikan Sarjana (S1) &amp; Diploma (D3)
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              100+ MITRA
            </div>
            <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Ekosistem Industri
            </div>
            <p className="text-[11px] text-slate-300">
              Didukung korporasi besar Triputra Group
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              95%
            </div>
            <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Tingkat Serapan
            </div>
            <p className="text-[11px] text-slate-300">
              Alumni langsung berkarir atau berwirausaha
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
