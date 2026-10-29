"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AcademicCalendar from "@/components/AcademicCalendar";
import Link from "next/link";
import Image from "next/image";
import { 
  Cpu, 
  TrendingUp, 
  Globe2, 
  HeartPulse, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Calendar,
  ExternalLink,
  Home,
  ChevronRight
} from "lucide-react";
import { initialAdminAkademikBanner, AdminAkademikBanner } from "@/lib/adminDataStore";

const fakultasData = [
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains & Teknologi",
    slug: "/fst",
    color: "from-blue-600 to-sky-600",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    icon: Cpu,
    cover: "/images/ar-vr.jpg",
    desc: "Mencetak sarjana teknologi unggul dalam AI, rekayasa piranti lunak, analitika data, dan komputasi modern.",
    prodiList: [
      { name: "S1 Informatika", degree: "S.Kom.", accreditation: "Baik Sekali" },
      { name: "S1 Sistem Informasi", degree: "S.Kom.", accreditation: "Baik Sekali" },
      { name: "S1 Rekayasa Perangkat Lunak", degree: "S.Kom.", accreditation: "Baik" },
      { name: "S1 Teknologi Informasi", degree: "S.Kom.", accreditation: "Baik" },
    ],
  },
  {
    id: "feb",
    code: "FEB",
    name: "Fakultas Ekonomi & Bisnis",
    slug: "/feb",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    icon: TrendingUp,
    cover: "/images/feb-full.jpg",
    desc: "Mempersiapkan profesional bisnis, akuntan korporasi, dan entrepreneur berkarakter Triputra.",
    prodiList: [
      { name: "S1 Manajemen", degree: "S.M.", accreditation: "Baik Sekali" },
      { name: "S1 Akuntansi", degree: "S.Ak.", accreditation: "Baik Sekali" },
      { name: "S1 Bisnis Digital", degree: "S.B.D.", accreditation: "Baik" },
    ],
  },
  {
    id: "fsh",
    code: "FSH",
    name: "Fakultas Sosial Humaniora",
    slug: "/fsh",
    color: "from-purple-600 to-indigo-600",
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-500/30",
    icon: Globe2,
    cover: "/images/pariwisata/par-1.jpg",
    desc: "Mengembangkan kepemimpinan humanis, kompetensi komunikasi global, dan keahlian pariwisata berkelanjutan.",
    prodiList: [
      { name: "S1 Pariwisata", degree: "S.Par.", accreditation: "Baik Sekali" },
      { name: "S1 Bahasa Inggris", degree: "S.Li.", accreditation: "Baik Sekali" },
    ],
  },
  {
    id: "fkes",
    code: "FKes",
    name: "Fakultas Kesehatan",
    slug: "/fkes",
    color: "from-emerald-600 to-teal-600",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    icon: HeartPulse,
    cover: "/images/kuliah-1.jpeg",
    desc: "Menghasilkan tenaga kesehatan profesional, ahli K3 industri, dan fisioterapis berdedikasi tinggi.",
    prodiList: [
      { name: "S1 Keselamatan & Kesehatan Kerja", degree: "S.K.K.K.", accreditation: "Baik Sekali" },
      { name: "S1 Fisioterapi", degree: "S.Fis.", accreditation: "Baik" },
      { name: "D3 Keperawatan", degree: "A.Md.Kep.", accreditation: "Baik Sekali" },
    ],
  },
];

export default function AkademikOverviewPage() {
  const [banner, setBanner] = useState<AdminAkademikBanner>(initialAdminAkademikBanner);

  // Load dynamic banner from localStorage (editable via /admin/banner-hero)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_akademik");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/60 to-[#06172e]/30 flex flex-col justify-between text-white">
          <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12">
            {/* Top: Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-slate-300">
                <li>
                  <Link 
                    href="/" 
                    className="hover:text-sky-300 transition-colors flex items-center gap-1.5"
                  >
                    <Home className="w-3.5 h-3.5 text-sky-400" />
                    <span>Beranda</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sky-300 font-semibold" aria-current="page">
                    Akademik
                  </span>
                </li>
              </ol>
            </nav>

            {/* Bottom Content: Title & Description */}
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {banner.title}
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed drop-shadow-xs max-w-2xl">
                {banner.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FOUR FACULTIES GRID - SATU BARIS (4 KOLOM DI DESKTOP) */}
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

          {/* Kotak Fakultas & Program Studi: 1 Baris Penuh (4 Kolom di Layar Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fakultasData.map((fakultas) => {
              const Icon = fakultas.icon;
              return (
                <div
                  key={fakultas.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={fakultas.cover}
                        alt={fakultas.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#0b2545] font-black text-xs shadow-sm">
                          {fakultas.code}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
                            Fakultas UPITRA
                          </span>
                        </div>
                        <h3 className="text-base font-black text-white leading-tight">
                          {fakultas.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 sm:p-5 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {fakultas.desc}
                      </p>

                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                          Program Studi:
                        </div>
                        <div className="space-y-1.5">
                          {fakultas.prodiList.map((prodi, idx) => (
                            <div 
                              key={idx}
                              className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/60 transition-colors"
                            >
                              <div className="text-xs font-bold text-[#0b2545] leading-snug">
                                {prodi.name}
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                                <span>{prodi.degree}</span>
                                <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                  {prodi.accreditation}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 pt-0">
                    <Link
                      href={fakultas.slug}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#06172e] hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      <span>Lihat Profil {fakultas.code}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. KALENDER AKADEMIK INTERAKTIF (Menggantikan Pilar Berkarakter sesuai ModifikasiUpitra) */}
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

          {/* Reusable Academic Calendar with Category Legend, Month Switcher, Grid & List Views, and Event Modal */}
          <AcademicCalendar />

          {/* Quick Links: Panduan Perkuliahan & Download Center */}
          <div className="bg-[#06172e] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900/40">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                Dokumen Pedoman Resmi
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                Butuh Salinan Kalender Akademik Resmi?
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Unduh salinan Surat Keputusan Rektor mengenai kalender operasional akademik tahun ajaran 2026/2027 dalam format PDF.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/kemahasiswaan/kalender-akademik"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Halaman Kalender Penuh</span>
              </Link>
              <Link
                href="/layanan/download-center"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 text-xs font-bold border border-white/20 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Download Center Brosur</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PMB ENROLLMENT CALL TO ACTION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Penerimaan Mahasiswa Baru TA 2026/2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
            Siap Memulai Perjalanan Akademikmu di UPITRA?
          </h2>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Daftarkan dirimu sekarang melalui Jalur Beasiswa Triputra Unggul atau Jalur Prestasi Akademik. Dapatkan potongan biaya kuliah dan program magang prioritas industri.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pmb"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02]"
            >
              <span>Daftar PMB 2026 Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/628112658826?text=Halo%20Admin%20PMB%20UPITRA,%20saya%20ingin%20berkonsultasi%20mengenai%20pilihan%20program%20studi%20akademik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
            >
              <span>Konsultasi Program Studi</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
