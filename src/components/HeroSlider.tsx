"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section 
      className="relative w-full bg-[#006bbd] flex justify-center overflow-hidden select-none" 
      aria-label="Grand Gateway UPITRA"
    >
      {/* ── CINEMATIC HERO BANNER (1440x810 FRAME SPECIFICATION) ─────────────── */}
      <div 
        className="relative w-full max-w-[1440px] h-[580px] sm:h-[680px] lg:h-[810px] mx-auto overflow-hidden flex items-center px-6 sm:px-12 md:px-16 lg:px-[120px]"
        style={{
          maxWidth: "1440px",
        }}
      >
        {/* Background Campus Photo with next/image priority */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/images/hero-campus.jpg"
            alt="Empat Mahasiswa Universitas Pignatelli Triputra di Kampus - Campus to Career"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_right] lg:object-center pointer-events-none"
          />

          {/* Desktop Left-to-Right Royal Blue Gradient Overlay (Fades at ~48-52%) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #006bbd 0%, #006bbd 24%, rgba(0, 107, 189, 0.92) 38%, rgba(0, 107, 189, 0.45) 50%, rgba(0, 107, 189, 0) 62%)"
            }}
          />

          {/* Mobile Vertical Gradient for readability */}
          <div className="absolute inset-0 pointer-events-none lg:hidden bg-gradient-to-t from-[#006bbd]/95 via-[#006bbd]/70 to-[#006bbd]/30" />
        </div>

        {/* Hero Content Layer: Left-aligned, 120px margin, 50px gap */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20 max-w-[580px] flex flex-col justify-center gap-6 sm:gap-8 lg:gap-[50px] py-12 lg:py-0"
        >
          {/* Main Title & Subtitle */}
          <div className="space-y-4 sm:space-y-5">
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] font-sans"
            >
              Universitas<br />
              Pignatelli Triputra<br />
              Campus to Career
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-[16px] text-white/95 leading-relaxed font-normal max-w-[440px] drop-shadow-xs"
            >
              Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di Universitas Pignatelli Triputra.
            </motion.p>
          </div>

          {/* CTA Button: Yellow #FFD400, dark text, rounded (~8-10px) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-lg bg-[#FFD400] hover:bg-[#F2C900] text-slate-900 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
            >
              Daftar Sekarang
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
