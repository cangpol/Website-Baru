"use client";

import Link from "next/link";
import { Trophy, Globe, BookOpen, Building2, ArrowRight } from "lucide-react";

export default function ImmersionProgramSection() {
  const features = [
    {
      icon: Trophy,
      title: "Akreditasi",
      desc: "Terakreditasi oleh BAN-PT dan Lembaga Akreditasi Mandiri dengan standar pendidikan bertaraf internasional yang diakui secara global.",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Bermitra dengan lebih dari 200 industri dan institusi di beberapa negara untuk pertukaran akademik dan riset.",
    },
    {
      icon: BookOpen,
      title: "Kurikulum Inovatif",
      desc: "Kurikulum OBE dengan konsep 3+1 berbasis kompetensi yang relevan dengan kebutuhan industri dan perkembangan teknologi terkini.",
    },
    {
      icon: Building2,
      title: "Fasilitas",
      desc: "Kampus dengan fasilitas lengkap termasuk laboratorium, perpustakaan digital, dan pusat kreativitas.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Headings & 4 Feature Cards */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-500 uppercase block">
                MENGAPA UPITRA?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2545] tracking-tight leading-[1.15]">
                Keunggulan yang Membedakan Kami
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl pt-1">
                Universitas Pignatelli Triputra terus berkomitmen memberikan pendidikan berkualitas tinggi yang mampu mencetak lulusan berdaya saing global. Dengan dukungan dosen berkualitas, fasilitas modern, dan jaringan industri yang luas.
              </p>
            </div>

            {/* 4 Feature Items (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100/80 text-sky-500 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#0b2545] leading-snug group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Immersion Program Highlight CTA */}
            <div className="pt-2">
              <Link 
                href="/layanan/immersion-program"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group"
              >
                <span>Pelajari Lebih Lanjut Tentang Program Immersion 3+1</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: 4-Photo Asymmetrical Collage + Floating 3+1 Badge */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5">
              
              {/* Photo 1: Large Lecture Hall (Top Left) */}
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-100 group">
                <img
                  src="/images/kuliah-1.jpeg"
                  alt="Suasana Perkuliahan Interaktif UPITRA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 2: Amphitheater Presentation (Top Right) */}
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-100 group">
                <img
                  src="/images/kegiatan.jpg"
                  alt="Presentasi & Seminar Akademik Mahasiswa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 3: Students Walking in Green Campus (Bottom Left) */}
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-100 group">
                <img
                  src="/images/kampus-2.jpg"
                  alt="Lingkungan Kampus Hijau & Nyaman UPITRA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 4: High-Tech Computer Lab (Bottom Right) */}
              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-100 group">
                <img
                  src="/images/ar-vr.jpg"
                  alt="Laboratorium Komputer & Teknologi Canggih"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>

            {/* FLOATING BADGE: 3 + 1 Kuliah + Immersion (Mengacu pada Gambar) */}
            <div className="absolute -bottom-4 right-4 sm:right-6 z-10 bg-[#0284c7] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl shadow-xl shadow-sky-600/30 flex flex-col items-center justify-center border-2 border-white/90">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                3 + 1
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-sky-100 mt-0.5 whitespace-nowrap">
                Kuliah + Immersion
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
