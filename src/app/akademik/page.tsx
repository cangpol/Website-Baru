"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AcademicCalendar from "@/components/AcademicCalendar";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight 
} from "lucide-react";
import { initialAdminAkademikBanner, AdminAkademikBanner } from "@/lib/adminDataStore";

const fakultasData = [
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains & Teknologi",
    slug: "/fst",
    cover: "/images/ar-vr.jpg",
    prodiTags: ["Informatika", "Sistem Informasi", "Rekayasa Perangkat Lunak"],
    desc: "Membekali mahasiswa dengan keahlian kecerdasan buatan, rekayasa perangkat lunak skala industri, analitika data, dan komputasi modern.",
  },
  {
    id: "feb",
    code: "FEB",
    name: "Fakultas Ekonomi & Bisnis",
    slug: "/feb",
    cover: "/images/feb-full.jpg",
    prodiTags: ["Manajemen", "Akuntansi", "Bisnis Digital"],
    desc: "Mencetak profesional bisnis, akuntan korporasi, dan entrepreneur tangguh berkarakter Triputra DNA yang adaptif di era transformasi ekonomi digital.",
  },
  {
    id: "fsh",
    code: "FSH",
    name: "Fakultas Sosial Humaniora",
    slug: "/fsh",
    cover: "/images/pariwisata/par-1.jpg",
    prodiTags: ["Pariwisata", "Bahasa Inggris"],
    desc: "Mengembangkan kepemimpinan humanis, kompetensi komunikasi internasional, dan keahlian manajemen hospitaliti & pariwisata berkelanjutan.",
  },
  {
    id: "fkes",
    code: "FKes",
    name: "Fakultas Kesehatan",
    slug: "/fkes",
    cover: "/images/kuliah-1.jpeg",
    prodiTags: ["Keselamatan & Kesehatan Kerja", "Fisioterapi", "Keperawatan"],
    desc: "Menghasilkan tenaga kesehatan profesional, ahli keselamatan kerja industri (K3), dan fisioterapis kompeten dengan dedikasi kemanusiaan tinggi.",
  },
];

export default function AkademikOverviewPage() {
  const [banner, setBanner] = useState<AdminAkademikBanner>(initialAdminAkademikBanner);

  // Load dynamic banner from localStorage (editable via /admin/banner-hero)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_akademik");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title === "Akademik & Fakultas") {
          parsed.title = "Akademik";
          parsed.description = "4 Fakultas, 10 Program Studi S1\n& D3 Keperawatan";
          localStorage.setItem("upitra_banner_akademik", JSON.stringify(parsed));
        }
        setBanner(parsed);
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER AKADEMIK (Full Width 1440px x 480px, Tanpa Border Melengkung, Full Gambar Edge-to-Edge) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/kuliah-1.jpeg"}
          alt={banner.title}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Executive Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/60 to-[#06172e]/30 flex flex-col justify-center text-white">
          <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            {/* Center Rata Kiri Content: Title & Description */}
            <div className="space-y-2 sm:space-y-3 max-w-3xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {banner.title || "Akademik"}
              </h1>

              <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-sky-200/95 leading-snug drop-shadow-xs whitespace-pre-line">
                {banner.description || "4 Fakultas, 10 Program Studi S1\n& D3 Keperawatan"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FOUR FACULTIES GRID - SESUAI GAMBAR REFERENSI (1 BARIS PENUH / 4 KOLOM DI DESKTOP) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Fakultas &amp; Program Studi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Pilihan Fakultas Berstandar Industri
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pilih rumpun keilmuan yang sesuai dengan minat dan aspirasi masa depanmu. Seluruh program studi didukung kurikulum link-and-match dengan industri.
            </p>
          </div>

          {/* Kotak Fakultas & Program Studi: Fixed Height 392px Sesuai Dimensi 335x392 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fakultasData.map((fakultas) => {
              return (
                <div
                  key={fakultas.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-[392px]"
                >
                  <div className="overflow-hidden flex flex-col">
                    {/* 1. Gambar Bagian Atas dengan Sudut Melengkung (rounded-2xl) */}
                    <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 shrink-0">
                      <Image
                        src={fakultas.cover}
                        alt={fakultas.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* 2. Judul Nama Fakultas */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight mb-2 line-clamp-1">
                      {fakultas.name}
                    </h3>

                    {/* 3. Tag Berwarna Biru: Daftar Program Studi Tanpa Keterangan S1/D3 */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {fakultas.prodiTags.map((prodi, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80 shadow-2xs"
                        >
                          {prodi}
                        </span>
                      ))}
                    </div>

                    {/* 4. Deskripsi Singkat Fakultas */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {fakultas.desc}
                    </p>
                  </div>

                  {/* 5. Tautan 'Selengkapnya ->' Berwarna Biru Mengarah ke Rute Fakultas Masing-Masing (/fst, /feb, /fsh, /fkes) */}
                  <div className="flex justify-end pt-2.5 border-t border-slate-100 mt-2 shrink-0">
                    <Link
                      href={fakultas.slug}
                      className="text-blue-700 hover:text-blue-800 font-bold text-xs inline-flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. KALENDER AKADEMIK INTERAKTIF */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
              Pusat Informasi &amp; Jadwal Perkuliahan
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Kalender Akademik Universitas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pantau jadwal perkuliahan, rentang evaluasi UTS &amp; UAS, hari libur nasional, periode pendaftaran mahasiswa baru, dan upacara wisuda resmi UPITRA.
            </p>
          </div>

          {/* Reusable Academic Calendar with Category Legend, Month Switcher, Grid & List Views, Event Modal, and Full-Width PDF Download Bar */}
          <AcademicCalendar />

        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
