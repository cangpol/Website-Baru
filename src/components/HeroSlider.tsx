"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HomepageHero, defaultHomepageHero } from "@/lib/homepageData";

export default function HeroSlider({ initialData }: { initialData?: HomepageHero }) {
  const [hero, setHero] = useState<HomepageHero>(initialData || defaultHomepageHero);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((json) => {
          if (json?.ok && json.data?.hero) {
            setHero(json.data.hero);
          }
        })
        .catch(() => {});
    }
  }, [initialData]);

  return (
    <section 
      className="relative w-full bg-slate-950 flex justify-center overflow-hidden select-none" 
      aria-label="Grand Gateway UPITRA"
    >
      <div 
        className="relative w-full max-w-[1440px] h-[70vw] min-h-[460px] max-h-[680px] sm:h-[min(50.5vw,680px)] sm:min-h-[420px] mx-auto overflow-hidden flex items-start pt-[72px] sm:pt-[clamp(72px,10.5vw,110px)] pb-12 px-[clamp(32px,8.8vw,120px)]"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={hero.imageUrl || "/images/hero-campus.jpg"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none origin-[left_bottom] scale-[1.25] object-cover object-[58%_center]"
          />

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, rgba(0, 107, 189, 0.96) 0%, rgba(0, 107, 189, 0.88) 22%, rgba(0, 107, 189, 0.52) 35%, rgba(0, 107, 189, 0.08) 43%, rgba(0, 107, 189, 0) 48%)"
            }}
          />

          <div className="absolute inset-0 pointer-events-none sm:hidden bg-gradient-to-t from-[#006bbd]/90 via-[#006bbd]/55 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 max-w-[520px] flex flex-col justify-start gap-5 sm:gap-6"
        >
          <div className="space-y-3 sm:space-y-3.5">
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-[clamp(2rem,4.6vw,3.5rem)] font-black text-white tracking-tight leading-[0.98] drop-shadow-[0_2px_8px_rgba(0,0,0,0.30)] font-sans whitespace-pre-line"
            >
              {hero.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-[11px] text-white leading-[1.35] font-medium max-w-[320px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
            >
              {hero.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <Link
              href={hero.ctaHref || "https://pmb.upitra.ac.id"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#FED406] hover:bg-[#F2C900] text-slate-900 font-bold text-xs shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer w-fit"
            >
              {hero.ctaLabel || "Daftar Sekarang"}
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
