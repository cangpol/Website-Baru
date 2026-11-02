"use client";

import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section className="relative w-full bg-[#006bbd] overflow-hidden select-none" aria-label="Grand Gateway UPITRA">
      
      {/* ── CINEMATIC HERO BANNER (FIGMA 1440x810 SPECIFICATION) ─────────────── */}
      <div className="relative w-full overflow-hidden">
        
        {/* Full-bleed background photo & precise gradient overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/images/banners/hero-campus-students-optimized.jpg"
            alt="Mahasiswa Universitas Pignatelli Triputra Campus to Career"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-right lg:object-center"
          />

          {/* Desktop Left-to-Right Solid-to-Transparent Blue Gradient (Exact #006bbd) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #006bbd 0%, #006bbd 22%, rgba(0, 107, 189, 0.88) 38%, rgba(0, 107, 189, 0.45) 50%, rgba(0, 107, 189, 0) 62%)"
            }}
          />

          {/* Responsive Soft Gradient for Mobile / Tablet Devices */}
          <div className="absolute inset-0 pointer-events-none lg:hidden bg-gradient-to-t from-[#006bbd]/95 via-[#006bbd]/70 to-transparent" />
        </div>

        {/* Hero Content Container: 1440px Width, 810px Height, 120px Padding, 50px Gap */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto min-h-[580px] sm:min-h-[680px] lg:h-[810px] flex items-center px-6 sm:px-12 md:px-16 lg:px-[120px]">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[620px] flex flex-col justify-center gap-6 sm:gap-8 lg:gap-[50px] py-14 lg:py-0"
          >
            
            {/* Title & Description Block */}
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.14]">
                Universitas<br />
                Pignatelli Triputra<br />
                Campus to Career
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-white/95 leading-relaxed font-normal max-w-xl">
                Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di Universitas Pignatelli Triputra.
              </p>
            </div>

            {/* CTA Button: 196x50px, Yellow #FFD400, Rounded-xl */}
            <div>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-[180px] sm:w-[196px] h-[46px] sm:h-[50px] rounded-xl bg-[#FFD400] hover:bg-[#F2C900] text-slate-900 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Daftar Sekarang
              </motion.a>
            </div>

          </motion.div>
        </div>

      </div>

    </section>
  );
}
