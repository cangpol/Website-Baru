"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HomepageWaves, defaultHomepageWaves } from "@/lib/homepageData";

export default function WelcomeAdmissionWaves({ initialData }: { initialData?: HomepageWaves }) {
  const [wavesData, setWavesData] = useState<HomepageWaves>(initialData || defaultHomepageWaves);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((json) => {
          if (json?.ok && json.data?.waves) {
            setWavesData(json.data.waves);
          }
        })
        .catch(() => {});
    }
  }, [initialData]);

  return (
    <section 
      className="w-full bg-white py-14 sm:py-18 lg:py-20 select-none border-b border-slate-100" 
      aria-label="Gelombang Pendaftaran UPITRA"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px]">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#006bbd] tracking-tight font-sans">
            {wavesData.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {wavesData.subtitle}
          </p>
        </motion.div>

        {/* 3 Admission Wave Cards (1440x679 Frame Specification) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {wavesData.waves.map((wave, index) => (
            <motion.div
              key={wave.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={wave.link || "https://pmb.upitra.ac.id"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10.5] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={wave.image || "/images/pmb/wave-ready-early-hq.jpg"}
                    alt={`${wave.title} - ${wave.benefit}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                </div>

                {/* Card Typography & Benefit */}
                <div className="p-5 sm:p-6 space-y-1.5 bg-white">
                  <h3 className="text-lg sm:text-[20px] font-bold text-slate-900 font-sans tracking-tight group-hover:text-[#006bbd] transition-colors">
                    {wave.title}
                  </h3>
                  <p className="text-xs sm:text-[14px] font-bold text-[#006bbd] font-sans">
                    {wave.benefit}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

