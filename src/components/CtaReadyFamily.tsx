"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaReadyFamily() {
  return (
    <section 
      className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none border-b border-slate-100" 
      aria-label="Ajakan Bergabung UPITRA"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px] text-center flex flex-col items-center justify-center">
        
        {/* Eyebrow / Overline */}
        <motion.span 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-xs sm:text-[13px] font-bold text-[#006bbd] uppercase tracking-[0.12em] font-sans mb-3 sm:mb-4"
        >
          SIAP JADI KELUARGA UPITRA?
        </motion.span>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.25] font-sans max-w-3xl mx-auto mb-7 sm:mb-8"
        >
          Temukan potensi diri kamu dan<br className="hidden sm:inline" />
          {" "}mulai perjalanan karirmu bersama UPITRA
        </motion.h2>

        {/* CTA Button: Yellow #FFD400, dark text, rounded-xl */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="https://pmb.upitra.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#FFD400] hover:bg-[#F2C900] text-slate-900 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Daftar Sekarang
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

