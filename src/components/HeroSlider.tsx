"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  GraduationCap, 
  Award, 
  MessageCircle, 
  ShieldCheck,
  FileCheck2
} from "lucide-react";
import { motion } from "framer-motion";
import { PromoBanner, defaultBanners, normalizeBannerPath } from "@/lib/bannerData";

interface HeroSliderProps {
  banners?: PromoBanner[];
}

export default function HeroSlider({ banners = defaultBanners }: HeroSliderProps) {
  // Hanya gunakan 1 foto utama (Foto Nomer 1: hero-pmb.jpg)
  const primaryBanner = (banners && banners.length > 0 ? banners[0] : defaultBanners[0]) || defaultBanners[0];
  const [imageSrc, setImageSrc] = useState<string>(() => normalizeBannerPath(primaryBanner.image));

  const handleImageError = () => {
    setImageSrc("/images/banners/hero-kampus.jpg");
  };

  return (
    <section className="relative w-full bg-[#06172e] text-white overflow-hidden select-none" aria-label="Grand Gateway UPITRA">
      {/* 1. CINEMATIC FULL-BLEED HERO CANVAS (1 Foto Utama Statis) */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Static Background Image with Cinematic Depth */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#06172e]">
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={imageSrc}
            alt={primaryBanner.alt || primaryBanner.title || "Universitas Pignatelli Triputra Surakarta"}
            loading="eager"
            decoding="async"
            onError={handleImageError}
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
          />

          {/* Deep Imperial Navy Gradient Overlay (Strict Blue & White Palette) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041122]/95 via-[#071f3d]/85 to-[#0b2545]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06172e] via-transparent to-transparent/40 z-10" />
        </div>

        {/* 2. HERO CONTENT LAYER WITH FRAMER MOTION ENTRANCE */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-5 sm:space-y-6"
          >
            
            {/* University Crest / Official Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>Universitas Pignatelli Triputra • Surakarta</span>
            </motion.div>

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
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60 transition-all cursor-pointer"
              >
                <span>Daftar PMB 2026/2027</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                href="#akademik"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/25 transition-all cursor-pointer"
              >
                <span>Jelajahi 4 Fakultas</span>
              </motion.a>
            </div>

          </motion.div>
        </div>

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
