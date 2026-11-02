import { BookOpen, Briefcase, Award, Rocket, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CareerPathwaySection() {
  const steps = [
    {
      step: "01",
      title: "Belajar Terapan & Karakter",
      subtitle: "Fondasi Akademik & Nilai Triputra",
      icon: BookOpen,
      desc: "Kurikulum berbasis studi kasus industri nyata. Membentuk kompetensi teknis sekaligus integritas dan etos kerja luhur khas Triputra DNA.",
      badges: ["Kurikulum Berbasis Kasus", "Dosen Praktisi", "Integritas & Etika"],
    },
    {
      step: "02",
      title: "Immersion Program 3+1",
      subtitle: "1 Tahun Magang di Dunia Nyata",
      icon: Briefcase,
      desc: "3 tahun belajar intensif di kampus, 1 tahun penuh terjun langsung ke operasional industri dan unit bisnis strategis Triputra Group.",
      badges: ["43+ Mitra Korporasi", "Mentor Profesional", "Uang Saku & Benefit"],
    },
    {
      step: "03",
      title: "Sertifikasi Kompetensi",
      subtitle: "Validasi Keahlian Berstandar",
      icon: Award,
      desc: "Mendapatkan sertifikasi profesi resmi BNSP dan sertifikasi internasional, serta membangun portofolio proyek riil yang siap dipamerkan.",
      badges: ["Sertifikasi BNSP", "Portofolio Riil", "Soft Skill Leadership"],
    },
    {
      step: "04",
      title: "Rekrutmen & Penempatan",
      subtitle: "Bekerja Sebelum Wisuda",
      icon: Rocket,
      desc: "Akses prioritas rekrutmen ke grup industri Triputra dan mitra multinasional. Didukung penuh oleh Pusat Karir UPITRA sejak semester awal.",
      badges: ["Jalur Prioritas MT", "95% Tingkat Serapan", "Pendampingan Karir"],
    },
  ];

  return (
    <section className="py-20 bg-[#06172e] text-white select-none relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#006bbd]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px] space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-[#FFD400]" />
            <span>Campus to Career Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Jalur Terarah Menuju Karier Impian
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Di Universitas Pignatelli Triputra, masa depan Anda dirancang terstruktur sejak hari pertama kuliah. Setiap tahapan diformulasikan agar Anda siap diserap industri sebelum wisuda.
          </p>
        </div>

        {/* 4 Steps Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-[#0b2244]/80 hover:bg-[#0f2e5a] border border-blue-900/60 hover:border-blue-500/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                {/* Step Number & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-blue-400/40 group-hover:text-[#FFD400] transition-colors duration-300">
                      {item.step}
                    </span>
                    <div className="p-3 rounded-xl bg-blue-600/20 text-[#38bdf8] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#FFD400]">
                      {item.subtitle}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Badges List */}
                <div className="pt-6 mt-6 border-t border-blue-900/50 space-y-2">
                  {item.badges.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Highlight Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/60 via-[#006bbd]/40 to-blue-900/60 border border-blue-700/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Ingin Tahu Lebih Lanjut Seputar Peluang Karier Anda?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Konsultasikan minat dan jurusan yang tepat bersama konselor pendidikan dan perwakilan industri UPITRA.
            </p>
          </div>

          <Link
            href="https://pmb.upitra.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFD400] hover:bg-[#F2C900] text-slate-900 font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Daftar PMB Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
