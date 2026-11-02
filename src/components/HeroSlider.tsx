"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section 
      className="relative w-full bg-slate-950 flex justify-center overflow-hidden select-none" 
      aria-label="Grand Gateway UPITRA"
    >
      {/* ── CINEMATIC HERO BANNER (1440x810 FRAME SPECIFICATION) ─────────────── */}
      <div 
        className="relative w-full max-w-[1440px] min-h-[500px] sm:min-h-[580px] lg:h-[680px] 2xl:h-[810px] mx-auto overflow-hidden flex items-start pt-12 sm:pt-16 lg:pt-20 xl:pt-24 pb-14 px-6 sm:px-12 md:px-16 lg:px-[120px]"
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
            quality={95}
            className="object-cover object-[right_center] sm:object-[90%_center] lg:object-[86%_center] pointer-events-none"
          />

          {/* Desktop Left-to-Right Royal Blue Gradient Overlay:
              - Shifted towards the left (fades out by ~36%) so it does NOT cover the photo or students
              - Semi-transparent (starts at ~0.82 opacity rather than 100% solid)
          */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, rgba(0, 107, 189, 0.82) 0%, rgba(0, 107, 189, 0.72) 16%, rgba(0, 107, 189, 0.38) 26%, rgba(0, 107, 189, 0.08) 33%, rgba(0, 107, 189, 0) 36%)"
            }}
          />

          {/* Mobile Vertical Gradient for readability */}
          <div className="absolute inset-0 pointer-events-none lg:hidden bg-gradient-to-t from-[#006bbd]/90 via-[#006bbd]/60 to-transparent" />
        </div>

        {/* Hero Content Layer: Left-aligned, 120px margin, 40-50px gap, tighter top spacing from navbar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 max-w-[580px] flex flex-col justify-start gap-6 sm:gap-8 lg:gap-11"
        >
          {/* Main Title & Subtitle */}
          <div className="space-y-4 sm:space-y-5">
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_8px_rgba(0,0,0,0.30)] font-sans"
            >
              Universitas<br />
              Pignatelli Triputra<br />
              Campus to Career
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-[15.5px] text-white leading-relaxed font-normal max-w-[430px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
            >
              Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di Universitas Pignatelli Triputra.
            </motion.p>
          </div>

          {/* CTA Button: Yellow #FED406, dark text, rounded-xl */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#FED406] hover:bg-[#F2C900] text-slate-900 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer w-fit"
            >
              Daftar Sekarang
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
