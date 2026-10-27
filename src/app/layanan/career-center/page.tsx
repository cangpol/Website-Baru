import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  ExternalLink 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Triputra Career Development Center (CDC) - Layanan UPITRA",
  description: "Pusat pengembangan karir dan bursa kerja Universitas Pignatelli Triputra Surakarta: Campus hiring eksklusif Triputra Group, konseling karir, dan magang bersertifikat.",
};

const layananCDC = [
  {
    judul: "Campus Hiring Eksklusif Triputra Group",
    desc: "Proses rekrutmen kerja langsung di kampus sebelum wisuda oleh korporasi terkemuka (PT ASSA Tbk, PT TAP Tbk, PT Dharma Polimetal Tbk, dll.).",
    manfaat: ["Jalur Prioritas Seleksi", "Proses Wawancara di Kampus Solo", "Penempatan Karir Cepat"],
  },
  {
    judul: "Konseling Karir & Pemetaan Potensi Diri",
    desc: "Sesi konsultasi privat satu lawan satu bersama psikolog industri dan praktisi HRD untuk memetakan minat karir dan rencana pasca kelulusan.",
    manfaat: ["Tes Asesmen Psikologi Karir", "Klarifikasi Minat & Bakat", "Rencana Pengembangan Karir Jangka Panjang"],
  },
  {
    judul: "Workshop Resume ATS & Simulasi Interview",
    desc: "Pelatihan intensif penulisan CV berstandar Applicant Tracking System (ATS), optimalisasi profil LinkedIn, dan simulasi wawancara kerja teknis.",
    manfaat: ["Bedah CV Secara Personal", "Simulasi Wawancara HR & User", "Tips Negosiasi Gaji Awal"],
  },
  {
    judul: "Program Magang Industri Bersertifikat 6 Bulan",
    desc: "Penempatan magang berbayar dengan konversi 20 SKS di departemen operasional industri riil, didampingi langsung oleh senior mentor profesional.",
    manfaat: ["Pengalaman Proyek Nyata", "Uang Saku & Benefit Magang", "Peluang Diangkat Karyawan Tetap"],
  },
];

const statistikSerapan = [
  { angka: "92%", label: "Lulusan Bekerja < 3 Bulan", sub: "Survei Tracer Study Resmi" },
  { angka: "50+", label: "Perusahaan Mitra Rekrutmen", sub: "Ekosistem Triputra & Nasional" },
  { angka: "26 Orang", label: "Lulusan Direkrut Sebelum Wisuda", sub: "Batch Terkini di ASSA Group" },
  { angka: "100%", label: "Pendampingan Karir", sub: "Sejak Semester 5 hingga Lulus" },
];

export default function CareerCenterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Pusat Karir & Alumni"
        title="Triputra Career Development Center (CDC)"
        description="Jembatan emas mahasiswa menuju dunia kerja profesional melalui program bimbingan karir terpadu, magang industri, dan rekrutmen prioritas di Triputra Group."
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Career Center" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Statistik Serapan Kerja */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Garansi Mutu Lulusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Rekor Penyerapan Kerja Tinggi di Jaringan Bisnis Terkemuka
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Triputra CDC tidak sekadar memberikan informasi lowongan kerja, tetapi mendampingi mahasiswa sejak bangku kuliah agar memiliki mentalitas kerja, etika profesional Ignasian, dan kompetensi yang langsung dapat diaplikasikan.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-blue-900/60">
            {statistikSerapan.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-sky-400">{stat.angka}</div>
                <div className="text-xs font-bold text-white">{stat.label}</div>
                <div className="text-[11px] text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Layanan Utama CDC */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Layanan Terpadu</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Layanan Karir CDC UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Dukungan komprehensif bagi persiapan masa depan karir mahasiswa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {layananCDC.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                    0{idx + 1}
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Keunggulan:</span>
                  <div className="space-y-1">
                    {item.manfaat.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
