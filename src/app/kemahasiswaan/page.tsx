"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import KemahasiswaanSubnav from "@/components/KemahasiswaanSubnav";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Target, 
  Sparkles, 
  Trophy, 
  Camera, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake 
} from "lucide-react";
import { initialAdminKemahasiswaanBanner, AdminKemahasiswaanBanner } from "@/lib/adminDataStore";

const kemahasiswaanMenuCards = [
  {
    title: "Tugas dan Fungsi",
    href: "/kemahasiswaan/tugas-dan-fungsi",
    icon: Target,
    desc: "Visi dan mandat Direktorat Kemahasiswaan dalam mendampingi pembinaan karakter, minat bakat, dan penalaran mahasiswa.",
    tag: "Tupoksi",
  },
  {
    title: "Program Pengembangan Mahasiswa",
    href: "/kemahasiswaan/program-pengembangan",
    icon: Sparkles,
    desc: "Inisiatif unggulan: Triputra Leadership Camp (TLC), LKMM, inkubasi proposal PKM PIMNAS, dan sertifikasi profesi BNSP.",
    tag: "Pelatihan",
  },
  {
    title: "Organisasi Mahasiswa (Ormawa)",
    href: "/kemahasiswaan/organisasi-mahasiswa",
    icon: Users,
    desc: "Direktori lembaga perwakilan mahasiswa: BEM, DPM, 10 Himpunan Mahasiswa Jurusan (HMPS), dan ragam Unit Kegiatan Mahasiswa.",
    tag: "Aktivitas Kampus",
  },
  {
    title: "Prestasi Mahasiswa",
    href: "/kemahasiswaan/prestasi-mahasiswa",
    icon: Trophy,
    desc: "Hall of fame torehan medali kejuaraan mahasiswa UPITRA di ajang kompetisi sains, teknologi, bisnis, dan olahraga nasional.",
    tag: "Kejuaraan",
  },
  {
    title: "Galeri Kegiatan Mahasiswa",
    href: "/kemahasiswaan/galeri-kegiatan",
    icon: Camera,
    desc: "Dokumentasi visual serunya kehidupan kampus: inisiasi mahasiswa baru (P2K2), festival seni, pameran inovasi, dan bakti sosial.",
    tag: "Dokumentasi",
  },
  {
    title: "Kalender Akademik",
    href: "/kemahasiswaan/kalender-akademik",
    icon: Calendar,
    desc: "Jadwal resmi semester gasal & genap TA 2026/2027: masa her-registrasi, pengisian KRS, periode UTS/UAS, dan wisuda.",
    tag: "Jadwal Kuliah",
  },
];

export default function KemahasiswaanIndexPage() {
  const [banner, setBanner] = useState<AdminKemahasiswaanBanner>(initialAdminKemahasiswaanBanner);

  // Load dynamic banner from localStorage (editable via Admin if configured)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_kemahasiswaan");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER KEMAHASISWAAN (Full Width 1440px x 480px, Identik dengan /riset & /akademik) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/kegiatan.jpg"}
          alt={banner.title}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Executive Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/60 to-[#06172e]/30 flex flex-col justify-center text-white">
          <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            {/* Center Rata Kiri Content: Title & Description */}
            <div className="space-y-3 sm:space-y-4 max-w-4xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {banner.title || "Kemahasiswaan"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "Membina mahasiswa berkarakter luhur, berjiwa pemimpin berbelarasa, dan berprestasi tinggi di kancah nasional bersama ekosistem Triputra Group."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SUBNAV BUTTON BAR SESUAI GAMBAR REFERENSI (5 TOMBOL PILL DI BAWAH BANNER) */}
      <KemahasiswaanSubnav />

      {/* 3. KONTEN UTAMA KEMAHASISWAAN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Nilai Kemahasiswaan */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Direktorat Kemahasiswaan</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Pengalaman Mahasiswa yang Menginspirasi & Bermakna
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jelajahi seluruh layanan, peluang pengembangan diri, organisasi kampus, dan kalender kegiatan mahasiswa UPITRA melalui sub-menu di bawah ini:
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Karakter Ignasian & Triputra DNA</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Pendampingan Talenta Holistik</span>
            </div>
          </div>
        </div>

        {/* 6 Sub-Menu Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {kemahasiswaanMenuCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  <span>Buka Halaman</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
