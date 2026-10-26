"use client";

import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  FileText,
  Users
} from "lucide-react";

export default function LifeAtUpitraSection() {
  const pillars = [
    {
      icon: MapPin,
      badge: "Kampus Asri di Solo",
      title: "Lingkungan Belajar Asri & Ramah Mahasiswa",
      desc: "Berada di Surakarta (Solo) dengan biaya hidup terjangkau, suasana kota budaya yang aman, asri, dan sangat kondusif untuk studi yang fokus.",
      color: "from-blue-600 to-sky-600",
      bgLight: "bg-blue-50/70 border-blue-100",
      accent: "text-blue-600",
    },
    {
      icon: HeartHandshake,
      badge: "Nilai Karakter Triputra",
      title: "Pembentukan Karakter & Spiritualitas",
      desc: "Menghadirkan pengalaman transformatif yang mengasah integritas, kedalaman spiritual, kerendahan hati, etika kerja, serta kepedulian sosial.",
      color: "from-sky-600 to-cyan-600",
      bgLight: "bg-sky-50/70 border-sky-100",
      accent: "text-sky-600",
    },
    {
      icon: Building2,
      badge: "Smart Campus & Lab",
      title: "Fasilitas Digital & Laboratorium Terpadu",
      desc: "Didukung Smart Classroom interaktif, Laboratorium Komputasi AI & Software Engineering FST, Hospitality Lab FSH, dan Accounting Lab FEB.",
      color: "from-indigo-600 to-blue-600",
      bgLight: "bg-indigo-50/70 border-indigo-100",
      accent: "text-indigo-600",
    },
    {
      icon: Briefcase,
      badge: "Jejaring Karir Industri",
      title: "Mentorship & Magang Triputra Group",
      desc: "Akses eksklusif program magang industri bersertifikat dan penyaluran karir langsung di ekosistem Triputra Group serta 43+ korporasi mitra.",
      color: "from-blue-700 to-indigo-700",
      bgLight: "bg-blue-50/70 border-blue-100",
      accent: "text-blue-700",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/80 to-white border-y border-slate-200/80 relative overflow-hidden" id="life-at-upitra">
      {/* Decorative soft glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Kehidupan Kampus & Mahasiswa
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0b2545] tracking-tight leading-tight">
            LIFE AT UNIVERSITAS PIGNATELLI TRIPUTRA
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Menemukan potensi terbaik, mengasah karakter unggul berstandar industri, dan bertumbuh bersama komunitas mahasiswa yang aktif, kreatif, dan inklusif di Surakarta.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.bgLight} ${item.accent}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Pelajari Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Action Banner */}
        <div className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-900/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs text-sky-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Visi, Misi, Tujuan & Jajaran Pimpinan Rektorat UPITRA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ingin Mengenal Lebih Dekat Budaya & Pimpinan UPITRA?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Ketahui visi kepemimpinan Rektor, kurikulum transformatif, profil pimpinan universitas, serta video dokumentasi kampus UPITRA Surakarta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/life-at-upitra"
              prefetch={true}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>JELAJAHI LIFE AT UPITRA</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </Link>

            <Link
              href="/ebrochure"
              prefetch={true}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider border border-white/20 backdrop-blur-sm transition-all"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>DOWNLOAD E-BROSUR</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

