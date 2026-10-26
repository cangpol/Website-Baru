"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Building, Award, CheckCircle2, Briefcase, HeartHandshake } from "lucide-react";

const corporatePartners = [
  { name: "PT Triputra Agro Persada", logo: "/images/mitra/mitra17.png" },
  { name: "PT Adaro Energy Indonesia Tbk", logo: "/images/mitra/mitra1.png" },
  { name: "PT Daya Adicipta Mustika", logo: "/images/mitra/1779428428_6a0fec4c95ef6.png" },
  { name: "PT Kirana Megatara Tbk", logo: "/images/mitra/mitra4.png" },
  { name: "PT Persada Capital Investama", logo: "/images/mitra/1779420091_6a0fcbbb0181c.png" },
  { name: "PT Surya Semesta Internusa Tbk", logo: "/images/mitra/mitra14.png" },
  { name: "PT Sumber Energi Pangan", logo: "/images/mitra/mitra12.png" },
  { name: "PT Pura Barutama (Pura Group)", logo: "/images/mitra/mitra11.png" },
];

export default function InstitutionalSynergySection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Sinergi Yayasan Santo Ignatius Pignatelli &amp; Triputra Group</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
            WIBAWA INSTITUSI &amp; KONEKTIVITAS INDUSTRI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Menyatukan keluhuran nilai moral Katolik dengan kekuatan ekosistem korporasi nasional terbesar di Indonesia untuk masa depan mahasiswa yang pasti.
          </p>
        </div>

        {/* 2-Column High-Impact Split (Blue & White) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Prakata Rektorat (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-600 shadow-md shrink-0 bg-slate-100">
                  <img
                    src="/images/rektor-fix.jpg"
                    alt="Rektor UPITRA"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    Prakata Pimpinan
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0b2545] leading-snug">
                    Dr. Ninik Yuniati, S.Pd., M.Hum.
                  </h3>
                  <p className="text-xs text-slate-500">
                    Rektor Universitas Pignatelli Triputra
                  </p>
                </div>
              </div>

              {/* Rector Quote */}
              <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-3 border-blue-600 pl-4 py-1">
                &ldquo;Pendidikan di UPITRA bukan sekadar transfer ilmu pengetahuan, melainkan pembentukan manusia utuh yang berintegritas, berbelarasa (compassion), serta memiliki kesiapan praktis untuk berkontribusi nyata bagi kemajuan industri nasional.&rdquo;
              </blockquote>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Dosen Berpengalaman Akademisi &amp; Praktisi Industri</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pendidikan Karakter &amp; Spiritualitas Holistik</span>
                </div>
              </div>
            </div>

            <Link
              href="/pimpinan"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors pt-2 group w-fit"
            >
              <span>Profil Dewan Pimpinan Universitas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: The Triputra Advantage & Mitra Industri (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b2545] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/30 text-sky-200 text-[11px] font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-sky-300" />
                <span>The Triputra Advantage</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Jaminan Jalur Karir &amp; Magang Bersama Triputra Group
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Mahasiswa UPITRA memiliki akses istimewa untuk program magang bersertifikat dan peluang rekrutmen prioritas di seluruh lini konglomerasi Triputra Group dan puluhan korporasi mitra nasional.
              </p>

              {/* Partner Logo Marquee Grid (Clean White Cards) */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider mb-2.5">
                  Mitra Industri &amp; Korporasi Terkemuka:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {corporatePartners.map((corp, idx) => (
                    <div
                      key={idx}
                      className="h-14 rounded-xl bg-white p-2 flex items-center justify-center border border-white/20 shadow-xs hover:border-blue-400 transition-all"
                      title={corp.name}
                    >
                      <img
                        src={corp.logo}
                        alt={corp.name}
                        className="max-h-9 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-300 font-medium">
                100+ Perusahaan Mitra Aktif di Indonesia
              </div>
              <Link
                href="/mitra-kerjasama"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-white transition-colors group"
              >
                <span>Lihat Seluruh Jejaring Kemitraan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

