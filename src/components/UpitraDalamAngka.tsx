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
      className="w-full bg-[#cce1f2] py-12 sm:py-16 lg:py-18 overflow-hidden select-none"
      aria-label="UPITRA Dalam Angka"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Student Image Looking Up Towards Metrics (Transparent Cutout) */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-start items-end"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] h-[400px] sm:h-[460px] lg:h-[500px] drop-shadow-[0_10px_25px_rgba(0,107,189,0.15)]">
              <Image
                src={statsData.studentCutoutImage || "/images/upitra-student-achiever.png"}
                alt="Mahasiswi Berprestasi Universitas Pignatelli Triputra"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Title + 3x2 Grid of Metric Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Header: Right-aligned matching Figma 1440x642 reference */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-right space-y-1.5"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#006bbd] tracking-tight font-sans">
                {statsData.title}
              </h2>
              <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium font-sans">
                {statsData.subtitle}
              </p>
            </motion.div>

            {/* 6 Cards Grid (3 Columns x 2 Rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
              {statsData.metrics.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-white/60 min-h-[120px] sm:min-h-[135px]"
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

