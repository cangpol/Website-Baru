import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  BookOpen, 
  Laptop, 
  Briefcase, 
  LineChart, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Download
} from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan Kampus Digital & Karir - Universitas Pignatelli Triputra",
  description: "Direktori layanan terpadu UPITRA Surakarta: Perpustakaan digital, sistem E-Learning (LMS), Triputra Career Center, Tracer Study, dan Triputra Immersion Program.",
};

const layananCards = [
  {
    title: "Perpustakaan & E-Resources",
    href: "/layanan/perpustakaan",
    icon: BookOpen,
    desc: "Katalog online OPAC, ribuan e-book, repositori karya ilmiah, langganan e-journal internasional (ScienceDirect, IEEE), dan ruang baca modern.",
    tag: "Sumber Belajar",
  },
  {
    title: "E-Learning (LMS)",
    href: "/layanan/e-learning",
    icon: Laptop,
    desc: "Platform perkuliahan daring modern: akses materi kuliah 24/7, pengumpulan tugas, kuis interaktif, dan video conference tatap maya.",
    tag: "Perkuliahan Daring",
  },
  {
    title: "Triputra Career Development Center",
    href: "/layanan/career-center",
    icon: Briefcase,
    desc: "Pusat bimbingan karir mahasiswa: campus hiring langsung di ekosistem Triputra Group, konseling karir, dan magang bersertifikat 6 bulan.",
    tag: "Persiapan Karir",
  },
  {
    title: "Tracer Study Alumni",
    href: "/layanan/tracer-study",
    icon: LineChart,
    desc: "Portal survei penelusuran lulusan dan evaluasi relevansi kurikulum dengan data statistik serapan kerja 92% dalam waktu < 3 bulan.",
    tag: "Alumni & Mutu",
  },
  {
    title: "Triputra Immersion Program",
    href: "/layanan/immersion-program",
    icon: Sparkles,
    desc: "Program unggulan eksklusif mahasiswa UPITRA: penempatan praktik kerja langsung di unit-unit bisnis Triputra Group se-Indonesia dengan bimbingan mentor eksekutif.",
    tag: "Program Unggulan",
  },
  {
    title: "Download Center (Pusat Unduhan Resmi)",
    href: "/layanan/download-center",
    icon: Download,
    desc: "Unduh panduan resmi PMB 2026/2027, e-brosur 10 program studi lengkap, kurikulum, skema beasiswa Triputra Peduli, dan formulir akademik resmi format PDF.",
    tag: "Brosur & Panduan",
  },
];

export default function LayananIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Portal Layanan Mahasiswa & Sivitas"
        title="Layanan Kampus Terpadu"
        description="Menyediakan fasilitas pendukung pembelajaran digital, kepustakaan, dan percepatan karir profesional bagi seluruh sivitas akademika UPITRA."
        breadcrumbs={[
          { label: "Layanan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Layanan */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ekosistem Layanan Kampus</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Fasilitas Digital & Karir yang Mendukung Keberhasilan Studi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Setiap layanan dirancang untuk memberikan kemudahan akses, efisiensi operasional, dan kepastian jalur karir profesional. Pilih layanan yang Anda butuhkan di bawah ini:
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Sistem Informasi Terintegrasi</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Akses Daring 24 Jam Nonstop</span>
            </div>
          </div>
        </div>

        {/* 5 Sub-Menu Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {layananCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  <span>Akses Layanan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

