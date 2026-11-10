"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomepageStats, defaultHomepageStats } from "@/lib/homepageData";

export default function UpitraDalamAngka({ initialData }: { initialData?: HomepageStats }) {
  const [statsData, setStatsData] = useState<HomepageStats>(initialData || defaultHomepageStats);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((json) => {
          if (json?.ok && json.data?.stats) {
            setStatsData(json.data.stats);
          }
        })
        .catch(() => {});
    }
  }, [initialData]);

  return (
    <section 
      className="w-full bg-gradient-to-br from-[#2f6fcb] to-[#1f55b0] py-10 sm:py-12 md:py-10 overflow-hidden"
      aria-label="UPITRA Dalam Angka"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-12 md:px-[clamp(32px,8vw,120px)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] gap-6 md:gap-7 items-center">
          
          {/* Left Column: Student Image Looking Up Towards Metrics (Transparent Cutout) */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center md:justify-end items-end order-2"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[280px] lg:max-w-[340px] h-[360px] sm:h-[400px] md:h-[400px] lg:h-[400px]">
              <Image
                src={statsData.studentCutoutImage || "/images/upitra-student-achiever.png"}
                alt="Mahasiswi Berprestasi Universitas Pignatelli Triputra"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom md:object-cover md:object-top md:-translate-x-2 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Title + 3x2 Grid of Metric Cards */}
          <div className="flex flex-col justify-center space-y-5 order-1">
            
            {/* Header: Right-aligned matching Figma 1440x642 reference */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left space-y-1"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-white tracking-tight leading-tight font-sans uppercase">
                {statsData.title}
              </h2>
              <p className="text-xs sm:text-sm lg:text-[14px] text-blue-100 font-medium font-sans">
                {statsData.subtitle}
              </p>
            </motion.div>

            {/* 6 Cards Grid (3 Columns x 2 Rows) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
              {statsData.metrics.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-white rounded-xl p-4 sm:p-5 md:p-3 lg:p-4 flex flex-col items-center justify-center text-center shadow-[0_2px_4px_rgba(15,23,42,0.12)] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-white/60 min-h-[112px] md:min-h-[108px]"
                >
                  <span className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight font-sans leading-none mb-2">
                    {item.value}
                  </span>
                  <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-[#006bbd] font-sans leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
