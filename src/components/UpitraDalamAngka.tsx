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
    <section className="relative w-full overflow-hidden bg-[#006bbd] text-white" aria-label="UPITRA Dalam Angka">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center lg:min-h-[642px] lg:grid-cols-[minmax(0,864fr)_minmax(0,576fr)]">
        {/* Left: centered title + 3 × 2 metric cards */}
        <div className="flex flex-col items-center justify-center gap-6 px-4 pt-10 sm:px-12 lg:gap-7 lg:px-10 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center"
          >
            <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl lg:text-[32px]">
              {statsData.title}
            </h2>
            <p className="text-xs font-medium text-white/90 sm:text-sm">{statsData.subtitle}</p>
          </motion.div>

          <div className="grid w-full max-w-[692px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-[21px]">
            {statsData.metrics.map((item, index) => {
              const highlighted = index === 2;
              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`flex min-h-[112px] flex-col items-center justify-center rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-0.5 lg:min-h-[148px] ${
                    highlighted
                      ? "border border-white/40 bg-white/15 shadow-[0_2px_8px_rgba(15,23,42,0.18)] backdrop-blur-sm"
                      : "bg-white shadow-[0_2px_6px_rgba(15,23,42,0.18)]"
                  }`}
                >
                  <span
                    className={`mb-2 text-3xl font-extrabold leading-none tracking-tight lg:text-[40px] ${
                      highlighted ? "text-white" : "text-[#222]"
                    }`}
                  >
                    {item.value}
                  </span>
                  <span
                    className={`text-[11px] font-bold leading-tight sm:text-xs lg:text-sm ${
                      highlighted ? "text-white" : "text-[#006bbd]"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: student cutout, large, bleeding off the right edge and cropped at the bottom */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto aspect-[576/642] w-full max-w-[340px] sm:max-w-[400px] lg:mx-0 lg:max-w-none lg:self-end"
        >
          <Image
            src={statsData.studentCutoutImage || "/images/upitra-student-stats.webp"}
            alt="Mahasiswi Berprestasi Universitas Pignatelli Triputra"
            fill
            sizes="(max-width: 1024px) 400px, 576px"
            className="pointer-events-none object-cover object-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
