"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HomepageCta, defaultHomepageCta } from "@/lib/homepageData";

export default function CtaReadyFamily({ initialData }: { initialData?: HomepageCta }) {
  const [ctaData, setCtaData] = useState<HomepageCta>(initialData || defaultHomepageCta);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((json) => {
          if (json?.ok && json.data?.cta) {
            setCtaData(json.data.cta);
          }
        })
        .catch(() => {});
    }
  }, [initialData]);

  return (
    <section 
      className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none border-b border-slate-100" 
      aria-label="Ajakan Bergabung UPITRA"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-12 md:px-16 lg:px-[120px] text-center flex flex-col items-center justify-center">
        
        {/* Eyebrow / Overline */}
        <motion.span 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-xs sm:text-[13px] font-bold text-[#006bbd] uppercase tracking-[0.12em] font-sans mb-3 sm:mb-4"
        >
          {ctaData.eyebrow}
        </motion.span>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.25] font-sans max-w-3xl mx-auto mb-7 sm:mb-8 whitespace-pre-line"
        >
          {ctaData.title}
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={ctaData.ctaHref || "https://pmb.upitra.ac.id"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#ffcc00] hover:bg-[#f2c200] text-blue-950 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            {ctaData.ctaLabel || "Daftar Sekarang"}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
