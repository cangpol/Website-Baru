"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const pillars = [
  { label: "Internship", image: "/images/kuliah-1.jpeg" },
  { label: "Community Development", image: "/images/kegiatan.jpg" },
  { label: "Entrepreneurship", image: "/images/kampus-2.jpg" },
  { label: "Independent Study", image: "/images/ar-vr.jpg" },
];

export default function HomepageImmersion() {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#2f6fcb] via-[#2b66c3] to-[#1f55b0] text-white"
      aria-label="Program Immersion 3+1"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-[120px] py-12 lg:py-0 lg:min-h-[310px]">
        <div className="grid grid-cols-1 lg:grid-cols-[170px_minmax(0,1fr)_minmax(0,1.15fr)] gap-8 lg:gap-6 items-center">
          {/* Left: 4 pillar thumbnails */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:py-6 order-2 lg:order-1">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-lg border border-white/40 bg-white/10 shadow-md"
              >
                <Image src={p.image} alt={p.label} fill sizes="170px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f55b0]/90 via-[#1f55b0]/20 to-transparent" />
                <span className="absolute inset-x-1 bottom-1 text-center text-[9px] font-semibold leading-tight">
                  {p.label}
                </span>
              </div>
            ))}
          </div>

          {/* Center: student cutout */}
          <div className="relative order-1 lg:order-2 mx-auto h-[300px] w-full max-w-[300px] lg:h-[380px] lg:self-end">
            <Image
              src="/images/upitra-student-achiever.png"
              alt="Mahasiswi Program Immersion UPITRA"
              fill
              sizes="(max-width: 1024px) 300px, 360px"
              className="object-contain object-bottom pointer-events-none"
            />
          </div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-3 flex flex-col items-start lg:items-end text-left lg:text-right gap-3 lg:py-10"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-tight">
              <span className="block font-light">Program</span>
              <span className="block font-black">Immersion</span>
            </h2>
            <span className="inline-block rounded-sm bg-[#fdc72f] px-4 py-1.5 text-sm font-bold text-[#0b2545]">
              3 Tahun Kuliah + 1 Tahun Internship
            </span>
            <p className="max-w-md text-[11px] sm:text-xs leading-relaxed text-white/90">
              3 tahun pembelajaran teori di kampus dan 1 tahun pengalaman nyata di dunia kerja maupun masyarakat.
              Program ini dirancang untuk menjembatani akademik dengan kebutuhan industri serta pemberdayaan wilayah.
            </p>
            <p className="text-sm font-bold">Konsep Utama</p>
            <div className="flex flex-wrap lg:justify-end gap-3">
              <Link
                href="/layanan/immersion-program"
                className="rounded-full border border-white/50 bg-white/10 px-5 py-2 text-center text-[11px] leading-tight hover:bg-white/20 transition-colors"
              >
                3 Tahun Belajar di Kampus
                <span className="block text-[9px] text-white/70">(Semester 1-6)</span>
              </Link>
              <Link
                href="/layanan/immersion-program"
                className="rounded-full border border-white/50 bg-white/10 px-5 py-2 text-center text-[11px] leading-tight hover:bg-white/20 transition-colors"
              >
                1 Tahun Praktik Lapangan
                <span className="block text-[9px] text-white/70">(Semester 6-7)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
