"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";

interface FacultyItem {
  id: string;
  name: string;
  code: string;
  degreeLevel: string;
  desc: string;
  coverImage: string;
  programs: {
    name: string;
    slug: string;
    degreeTitle: string;
    level: string;
  }[];
}

const faculties: FacultyItem[] = [
  {
    id: "fst",
    name: "Fakultas Sains & Teknologi",
    code: "FST",
    degreeLevel: "Program Sarjana (S1)",
    desc: "Mencetak praktisi teknologi informasi, arsitek sistem cerdas, dan insinyur perangkat lunak yang berintegritas tinggi.",
    coverImage: "/images/ar-vr.jpg",
    programs: [
      { name: "Informatika", slug: "informatika", degreeTitle: "S.Kom.", level: "S1" },
      { name: "Sistem Informasi", slug: "sistem-informasi", degreeTitle: "S.Kom.", level: "S1" },
      { name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", degreeTitle: "S.Kom.", level: "S1" },
    ],
  },
  {
    id: "feb",
    name: "Fakultas Ekonomi & Bisnis",
    code: "FEB",
    degreeLevel: "Program Sarjana (S1)",
    desc: "Mengembangkan pemimpin bisnis visioner, analis finansial korporat, dan akuntan profesional terintegrasi industri.",
    coverImage: "/images/feb-full.jpg",
    programs: [
      { name: "Manajemen", slug: "manajemen", degreeTitle: "S.M.", level: "S1" },
      { name: "Akuntansi", slug: "akuntansi", degreeTitle: "S.Ak.", level: "S1" },
    ],
  },
  {
    id: "fsh",
    name: "Fakultas Sosial & Humaniora",
    code: "FSH",
    degreeLevel: "Program Sarjana (S1)",
    desc: "Mengasah keahlian hospitalitas kelas dunia, pariwisata berkelanjutan, dan komunikasi korporat global berkarakter luhur.",
    coverImage: "/images/fsh-full.jpg",
    programs: [
      { name: "Pariwisata", slug: "pariwisata", degreeTitle: "S.Par.", level: "S1" },
      { name: "Bahasa Inggris", slug: "bahasa-inggris", degreeTitle: "S.S.", level: "S1" },
    ],
  },
  {
    id: "fkes",
    name: "Fakultas Kesehatan",
    code: "FKes",
    degreeLevel: "Sarjana (S1) & Diploma (D3)",
    desc: "Mempersiapkan tenaga kesehatan profesional, ahli keselamatan industri (K3), fisioterapis, dan perawat berstandar rumah sakit nasional.",
    coverImage: "/images/kampus-4.jpg",
    programs: [
      { name: "Kesehatan & Keselamatan Kerja", slug: "kesehatan-dan-keselamatan-kerja", degreeTitle: "S.K3", level: "S1" },
      { name: "Fisioterapi", slug: "fisioterapi", degreeTitle: "S.Ft", level: "S1" },
      { name: "Keperawatan", slug: "d3-keperawatan", degreeTitle: "A.Md.Kep", level: "D3" },
    ],
  },
];

export default function FacultyBentoShowcase() {
  return (
    <section id="akademik" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Pendidikan Akademik Unggul</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              FAKULTAS &amp; PROGRAM STUDI UPITRA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Pilih disiplin keilmuan masa depan Anda. Seluruh program studi diselenggarakan dengan kurikulum berbasis praktik industri dan dibimbing oleh dosen berpengalaman.
            </p>
          </div>

          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0 group"
          >
            <span>Lihat Direktori Seluruh Program</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Faculty Grid (Clean Blue & White) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {faculties.map((fac) => (
            <div
              key={fac.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Header */}
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={fac.coverImage}
                  alt={fac.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/90 via-[#0b2545]/40 to-transparent" />
                
                {/* Faculty Code Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-sm">
                  {fac.code}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-bold text-sky-200 uppercase tracking-wider">
                    {fac.degreeLevel}
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                    {fac.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>

                {/* Programs List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-[#0b2545] uppercase tracking-wider">
                    Pilihan Program Studi:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fac.programs.map((prog) => (
                      <Link
                        key={prog.slug}
                        href={`/${prog.slug}`}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between group/link"
                      >
                        <div className="min-w-0 pr-1">
                          <div className="text-xs font-bold text-slate-800 group-hover/link:text-blue-700 truncate">
                            {prog.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            Jenjang {prog.level} • Gelar {prog.degreeTitle}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

