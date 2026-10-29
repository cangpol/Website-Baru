"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import { 
  BookOpen, 
  Laptop, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  Share2
} from "lucide-react";
import { initialAdminLayananBanner, AdminLayananBanner } from "@/lib/adminDataStore";

// ── SVG Brand Icons untuk Media Sosial Resmi ──
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function ThreadsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2c-5.522 0-9.999 4.477-9.999 10 0 5.011 3.69 9.159 8.52 9.878v-2.025c-3.73-.693-6.52-3.945-6.52-7.853 0-4.411 3.589-8 7.999-8 4.412 0 8.001 3.589 8.001 8 0 2.378-1.043 4.512-2.705 5.972-.943.83-2.091 1.378-3.376 1.554-1.29.177-2.618-.04-3.76-.628l-.946 1.782c1.472.782 3.167 1.059 4.846.829 1.67-.229 3.197-.954 4.444-2.05 2.062-1.812 3.497-4.42 3.497-7.459 0-5.523-4.477-10-10.001-10zm.04 6.5c-2.485 0-4.5 2.015-4.5 4.5 0 2.485 2.015 4.5 4.5 4.5 1.724 0 3.226-.97 3.992-2.396l-1.748-.988c-.46.826-1.328 1.384-2.244 1.384-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.928 0 1.784.542 2.227 1.353l1.734-.995c-.751-1.428-2.24-2.358-3.961-2.358z"/>
    </svg>
  );
}

function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36M7.85 18.5V10.13H5.06v8.37h2.79z"/>
    </svg>
  );
}

// ── 4 Kotak Layanan Utama (1 Baris di Layar Desktop) ──
const empatKotakLayanan = [
  {
    title: "Perpustakaan",
    href: "https://siper.upitra.ac.id",
    icon: BookOpen,
    desc: "Katalog online OPAC, repositori karya ilmiah, e-book, dan langganan e-journal internasional.",
    tag: "Sumber Belajar",
  },
  {
    title: "Unity E-Learning (LMS)",
    href: "https://unity.upitra.ac.id",
    icon: Laptop,
    desc: "Platform perkuliahan daring modern: akses materi kuliah 24/7, pengumpulan tugas, kuis interaktif, dan video conference.",
    tag: "Perkuliahan Daring",
  },
  {
    title: "Immersion Program",
    href: "https://immersion.upitra.ac.id",
    icon: Sparkles,
    desc: "Program penempatan praktik kerja langsung di unit-unit bisnis Triputra Group se-Indonesia dengan bimbingan mentor eksekutif.",
    tag: "Program Unggulan",
  },
  {
    title: "Tracer Study & Career Center",
    href: "https://ucc.upitra.ac.id",
    icon: Briefcase,
    desc: "Pusat bimbingan karir mahasiswa, campus hiring ekosistem Triputra Group, dan portal survei penelusuran lulusan alumni.",
    tag: "Karir & Alumni",
  },
];

// ── Daftar Media Sosial Resmi UPITRA Campus ──
const socialMediaList = [
  {
    name: "Instagram",
    handle: "@upitra_campus",
    url: "https://www.instagram.com/upitra_campus/",
    icon: InstagramIcon,
    accent: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white",
    badge: "Foto & Reels",
    desc: "Update foto harian kampus, info event, pengumuman beasiswa, dan prestasi mahasiswa.",
  },
  {
    name: "YouTube",
    handle: "UPITRA Official",
    url: "https://www.youtube.com/@upitracampus",
    icon: YoutubeIcon,
    accent: "bg-red-600 text-white",
    badge: "Video Resmi",
    desc: "Dokumentasi wisuda, profil program studi, seminar nasional, dan podcast edukatif.",
  },
  {
    name: "Facebook",
    handle: "UPITRA Campus",
    url: "https://www.facebook.com/upitracampus",
    icon: FacebookIcon,
    accent: "bg-blue-600 text-white",
    badge: "Komunitas",
    desc: "Informasi pendaftaran mahasiswa baru, agenda universitas, dan relasi sivitas.",
  },
  {
    name: "Threads",
    handle: "@upitra_campus",
    url: "https://www.threads.net/@upitra_campus",
    icon: ThreadsIcon,
    accent: "bg-slate-900 text-white",
    badge: "Diskusi Kampus",
    desc: "Obrolan santai, kabar kilat kegiatan kampus, dan interaksi interaktif mahasiswa.",
  },
  {
    name: "TikTok",
    handle: "@upitra_campus",
    url: "https://www.tiktok.com/@upitra_campus",
    icon: TiktokIcon,
    accent: "bg-slate-950 text-cyan-400",
    badge: "Tren & Kreatif",
    desc: "Video seru dinamika kehidupan kampus Solo, tips perkuliahan, dan konten kreatif.",
  },
  {
    name: "LinkedIn",
    handle: "Universitas Pignatelli Triputra",
    url: "https://www.linkedin.com/school/universitas-pignatelli-triputra/",
    icon: LinkedinIcon,
    accent: "bg-[#0a66c2] text-white",
    badge: "Jejaring Karir",
    desc: "Peluang karir, kemitraan Triputra Group, dan jejaring alumni profesional.",
  },
];

export default function LayananIndexPage() {
  const [banner, setBanner] = useState<AdminLayananBanner>(initialAdminLayananBanner);

  // Load dynamic banner from localStorage (editable via Admin if configured)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_layanan");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER LAYANAN (Full Width 1440px x 480px, Identik dengan /kemahasiswaan, /riset & /akademik) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/perpustakaan.jpg"}
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
                {banner.title || "Layanan"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "Ekosistem layanan digital, perpustakaan, karir, dan pembelajaran terpadu untuk mendukung kesuksesan akademik dan profesional seluruh sivitas akademika UPITRA."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. KONTEN UTAMA HALAMAN LAYANAN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* SECTION: TERHUBUNG DENGAN KAMI & 4 KOTAK LAYANAN DALAM 1 BARIS */}
        <section className="space-y-8">
          
          {/* Header Section: Terhubung dengan Kami (Menggantikan Kartu Putih Lama) */}
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ekosistem Layanan Terpadu</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Terhubung dengan Kami
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Akses langsung fasilitas digital, perpustakaan daring, sistem pembelajaran, dan pusat karir Universitas Pignatelli Triputra melalui portal resmi di bawah ini:
            </p>
          </div>

          {/* 4 Kotak Layanan: Dimuat Tepat 1 Baris di Layar Desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {empatKotakLayanan.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
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

                    <h3 className="text-lg font-black text-[#0b2545] group-hover:text-blue-700 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors"
                  >
                    <span>Akses Layanan</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: MEDIA SOSIAL RESMI UPITRA CAMPUS */}
        <section className="pt-10 border-t border-slate-200/80 space-y-8">
          
          {/* Header Section Media Sosial */}
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Kanal Resmi Mahasiswa</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <span>Media Sosial UPITRA Campus</span>
              <Share2 className="w-5 h-5 text-blue-600" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Tetap terhubung dan dapatkan informasi beasiswa, agenda kampus, prestasi mahasiswa, serta ragam event seru melalui media sosial resmi kami:
            </p>
          </div>

          {/* Grid 6 Akun Media Sosial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialMediaList.map((sosmed, idx) => {
              const Icon = sosmed.icon;
              return (
                <a
                  key={idx}
                  href={sosmed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${sosmed.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        {sosmed.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-[#0b2545] group-hover:text-blue-700 transition-colors">
                        {sosmed.name}
                      </h4>
                      <span className="text-xs font-semibold text-blue-600">
                        {sosmed.handle}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sosmed.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                    <span>Kunjungi Profil</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
