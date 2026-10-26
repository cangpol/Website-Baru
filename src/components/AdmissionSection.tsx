"use client";

import Link from "next/link";
import { Award, ArrowRight, CheckCircle2, FileText, MessageCircle } from "lucide-react";

const admissionPathways = [
  {
    no: "01",
    tag: "Bebas Tes Masuk",
    title: "Jalur Seleksi Nilai Rapor",
    desc: "Seleksi berbasis nilai rapor SMA/SMK/MA semester 1–4 tanpa ujian tulis masuk.",
    points: ["Rapor min. rata-rata 75.0", "Verifikasi berkas 1x24 jam"],
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    no: "02",
    tag: "Beasiswa s/d 100%",
    title: "Beasiswa Triputra Peduli",
    desc: "Pembebasan uang gedung hingga 100% dan subsidi SPP dari Triputra Group.",
    points: ["Bebas uang gedung s/d 100%", "Subsidi SPP hingga kelulusan"],
    badgeColor: "bg-blue-50 text-blue-800 border-blue-300 font-black",
  },
  {
    no: "03",
    tag: "Prestasi & Bakat",
    title: "Jalur Prestasi Akademik",
    desc: "Apresiasi bagi juara sains, teknologi, olahraga, seni budaya, atau pengurus OSIS.",
    points: ["Sertifikat kota / nasional", "Potongan biaya pendidikan"],
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    no: "04",
    tag: "Mitra Sekolah",
    title: "Jalur Kemitraan Sekolah",
    desc: "Keringanan biaya khusus bagi siswa dari jejaring SMA/SMK mitra resmi UPITRA.",
    points: ["Rekomendasi guru BK / sekolah", "Diskon formulir pendaftaran"],
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

export default function AdmissionSection() {
  return (
    <section id="jalur-pendaftaran" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Penerimaan Mahasiswa Baru TA 2026 / 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              PILIHAN JALUR PENDAFTARAN &amp; BEASISWA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Tentukan skema seleksi yang paling tepat bagi kualifikasi Anda. Nikmati kemudahan pendaftaran online terpadu dan konsultasi beasiswa bersama tim admisi resmi UPITRA.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <span>Daftar PMB Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/ebrochure"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>E-Brosur</span>
            </Link>
          </div>
        </div>

        {/* 4 Pathway Cards (1 Baris di Desktop, Strict Blue & White) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {admissionPathways.map((item) => (
            <div
              key={item.no}
              className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] uppercase tracking-wide font-extrabold ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {item.no}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#0b2545] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">Pendaftaran Aktif</span>
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1"
                >
                  <span>Daftar</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Info Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b2545]">
                Butuh Bantuan &amp; Panduan Pendaftaran?
              </div>
              <div className="text-xs text-slate-600">
                Hubungi Customer Care PMB UPITRA melalui WhatsApp: <strong>0811-290-7500</strong>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20jalur%20pendaftaran"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-blue-200 hover:border-blue-400 text-blue-700 text-xs font-bold shadow-2xs hover:bg-blue-50 transition-all shrink-0"
          >
            Chat WhatsApp Admisi &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}

