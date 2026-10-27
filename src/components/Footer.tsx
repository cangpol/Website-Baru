"use client";

import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronUp, 
  Award, 
  Briefcase, 
  Building2, 
  ExternalLink,
  Microscope,
  Users,
  Handshake,
  BookOpen
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#06172e] text-slate-200 border-t border-blue-900/50 overflow-hidden font-sans">
      {/* Decorative Subtle Blue Accent Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-72 bg-radial from-blue-600/15 via-blue-900/5 to-transparent blur-3xl opacity-60" 
      />

      {/* Top Pre-Footer Bar: Fast Mobile Hotline & Direct Access */}
      <div className="relative border-b border-blue-900/40 bg-[#081e3b]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-200">
              Penerimaan Mahasiswa Baru TA 2026/2027 Sedang Berlangsung. <span className="text-sky-300 font-semibold hidden sm:inline">Beasiswa Penuh Triputra Peduli 100% Tersedia.</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href="https://wa.me/628112907500?text=Halo%20Admin%20PMB%20UPITRA%2C%20saya%20ingin%20konsultasi%20pendaftaran"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sky-300" />
              <span>Chat WhatsApp</span>
            </a>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white text-blue-950 hover:bg-slate-100 text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95"
            >
              <span>Daftar Online PMB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-900" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Kolom 1: Profil & Identitas Institusi (span 3 on lg) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group" aria-label="UPITRA Beranda">
              <div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shadow-[0_12px_28px_-4px_rgba(0,0,0,0.5),0_4px_10px_-2px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06)] border border-white/30 ring-1 ring-white/20 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.6)] transition-all duration-300 shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Logo UPITRA"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(6,23,46,0.25)] drop-shadow-[0_1px_2px_rgba(6,23,46,0.15)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-[0.16em] text-white uppercase font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:text-sky-300 transition-colors leading-none">
                    UPITRA
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
                <span className="text-[9px] tracking-[0.24em] text-sky-300/90 font-bold uppercase mt-1 leading-none">
                  Universitas Pignatelli Triputra
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              Perguruan tinggi berkualitas di Surakarta kolaborasi strategis <strong>Yayasan Santo Ignatius Pignatelli</strong> & <strong>Triputra Group</strong>. Berfokus mencetak lulusan berkarakter unggul, berintegritas, dan siap kerja.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800/60 text-sky-300 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Akreditasi BAIK SEKALI</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-blue-950/80 text-xs">
              <Link href="/profil/tentang-upitra" className="block text-slate-300 hover:text-sky-300 transition-colors">
                • Tentang UPITRA
              </Link>
              <Link href="/profil/visi-misi-tujuan" className="block text-slate-300 hover:text-sky-300 transition-colors">
                • Visi Misi Tujuan
              </Link>
              <Link href="/profil/pimpinan-universitas" className="block text-slate-300 hover:text-sky-300 transition-colors">
                • Pimpinan Universitas
              </Link>
              <Link href="/profil/prestasi-dan-capaian" className="block text-slate-300 hover:text-sky-300 transition-colors">
                • Prestasi &amp; Capaian
              </Link>
            </div>
          </div>

          {/* Kolom 2: Fakultas & Program Akademik (span 3 on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border-b border-blue-900/60 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                Akademik &amp; Fakultas
              </h4>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* FST */}
              <div className="space-y-1">
                <Link href="/fst" className="font-bold text-sky-300 hover:text-white transition-colors block">
                  Fakultas Sains &amp; Teknologi (FST)
                </Link>
                <div className="flex flex-col space-y-0.5 pl-2 border-l border-blue-900/70 text-slate-300 text-[11px]">
                  <Link href="/informatika" className="hover:text-sky-300 transition-colors">S1 Informatika (S.Kom.)</Link>
                  <Link href="/sistem-informasi" className="hover:text-sky-300 transition-colors">S1 Sistem Informasi (S.Kom.)</Link>
                  <Link href="/rekayasa-perangkat-lunak" className="hover:text-sky-300 transition-colors">S1 Rekayasa Perangkat Lunak (S.Kom.)</Link>
                </div>
              </div>

              {/* FEB */}
              <div className="space-y-1">
                <Link href="/feb" className="font-bold text-sky-300 hover:text-white transition-colors block">
                  Fakultas Ekonomi &amp; Bisnis (FEB)
                </Link>
                <div className="flex flex-col space-y-0.5 pl-2 border-l border-blue-900/70 text-slate-300 text-[11px]">
                  <Link href="/manajemen" className="hover:text-sky-300 transition-colors">S1 Manajemen (S.M.)</Link>
                  <Link href="/akuntansi" className="hover:text-sky-300 transition-colors">S1 Akuntansi (S.Ak.)</Link>
                </div>
              </div>

              {/* FSH */}
              <div className="space-y-1">
                <Link href="/fsh" className="font-bold text-sky-300 hover:text-white transition-colors block">
                  Fakultas Sosial Humaniora (FSH)
                </Link>
                <div className="flex flex-col space-y-0.5 pl-2 border-l border-blue-900/70 text-slate-300 text-[11px]">
                  <Link href="/pariwisata" className="hover:text-sky-300 transition-colors">S1 Pariwisata (S.Par.)</Link>
                  <Link href="/bahasa-inggris" className="hover:text-sky-300 transition-colors">S1 Bahasa Inggris (S.S.)</Link>
                </div>
              </div>

              {/* FKes */}
              <div className="space-y-1">
                <Link href="/fkes" className="font-bold text-sky-300 hover:text-white transition-colors block">
                  Fakultas Kesehatan (FKes)
                </Link>
                <div className="flex flex-col space-y-0.5 pl-2 border-l border-blue-900/70 text-slate-300 text-[11px]">
                  <Link href="/kesehatan-dan-keselamatan-kerja" className="hover:text-sky-300 transition-colors">S1 Keselamatan &amp; Kesehatan Kerja (S.K3)</Link>
                  <Link href="/fisioterapi" className="hover:text-sky-300 transition-colors">S1 Fisioterapi (S.Ft)</Link>
                  <Link href="/keperawatan" className="hover:text-sky-300 transition-colors">D3 Keperawatan (A.Md.Kep)</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 3: Riset & Kemahasiswaan (span 2 on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="border-b border-blue-900/60 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Microscope className="w-3.5 h-3.5 text-sky-400" />
                Riset &amp; Mahasiswa
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/riset/pusat-penelitian-dan-publikasi" className="font-semibold text-sky-300 hover:text-white transition-colors block">
                  Pusat Penelitian &amp; Publikasi
                </Link>
              </li>
              <li className="pt-2 border-t border-blue-950">
                <Link href="/kemahasiswaan/tugas-dan-fungsi" className="hover:text-sky-300 transition-colors block">
                  Tugas &amp; Fungsi Kemahasiswaan
                </Link>
              </li>
              <li>
                <Link href="/kemahasiswaan/program-pengembangan" className="hover:text-sky-300 transition-colors block">
                  Program Pengembangan Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/kemahasiswaan/organisasi-mahasiswa" className="hover:text-sky-300 transition-colors block">
                  Organisasi Mahasiswa (Ormawa)
                </Link>
              </li>
              <li>
                <Link href="/kemahasiswaan/prestasi-mahasiswa" className="hover:text-sky-300 transition-colors block">
                  Prestasi Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/kemahasiswaan/galeri-kegiatan" className="hover:text-sky-300 transition-colors block">
                  Galeri Kegiatan Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/kemahasiswaan/kalender-akademik" className="hover:text-sky-300 transition-colors block">
                  Kalender Akademik
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kerjasama & Layanan (span 2 on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="border-b border-blue-900/60 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Handshake className="w-3.5 h-3.5 text-sky-400" />
                Kerjasama &amp; Layanan
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/kerjasama/mitra-kerjasama" className="hover:text-sky-300 transition-colors block">
                  Mitra Kerjasama
                </Link>
              </li>
              <li>
                <Link href="/kerjasama/daftar-kerjasama" className="hover:text-sky-300 transition-colors block">
                  Daftar Kerjasama (MoU/MoA)
                </Link>
              </li>
              <li>
                <Link href="/kerjasama/kegiatan-kerjasama" className="hover:text-sky-300 transition-colors block">
                  Kegiatan Kerjasama
                </Link>
              </li>
              <li className="pt-2 border-t border-blue-950">
                <Link href="/layanan/perpustakaan" className="hover:text-sky-300 transition-colors block">
                  Perpustakaan &amp; E-Resources
                </Link>
              </li>
              <li>
                <Link href="/layanan/e-learning" className="hover:text-sky-300 transition-colors block">
                  E-Learning (LMS)
                </Link>
              </li>
              <li>
                <Link href="/layanan/career-center" className="hover:text-sky-300 transition-colors block">
                  Career Center (CDC)
                </Link>
              </li>
              <li>
                <Link href="/layanan/tracer-study" className="hover:text-sky-300 transition-colors block">
                  Tracer Studi
                </Link>
              </li>
              <li>
                <Link href="/layanan/immersion-program" className="font-semibold text-sky-300 hover:text-white transition-colors block">
                  Triputra Immersion Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Kampus Solo & Kontak Resmi (span 2 on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="border-b border-blue-900/60 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Kampus Solo
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <a 
                href="https://maps.google.com/?q=Universitas+Pignatelli+Triputra+Solo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed text-[11px]">
                  Jl. Duwet Raya, Karangasem, Laweyan, Surakarta, Jawa Tengah 57145
                </span>
              </a>

              <div className="space-y-1.5 pt-1">
                <a 
                  href="tel:08112907500" 
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors py-1 px-2 rounded-md bg-blue-950/60 border border-blue-900/40 text-[11px]"
                >
                  <Phone className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>0811-290-7500</span>
                </a>

                <a 
                  href="https://wa.me/628112907500" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors py-1 px-2 rounded-md bg-blue-950/60 border border-blue-900/40 text-[11px]"
                >
                  <MessageCircle className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>WhatsApp PMB</span>
                </a>

                <a 
                  href="mailto:pmb@upitra.ac.id" 
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors py-1 px-2 rounded-md bg-blue-950/60 border border-blue-900/40 text-[11px]"
                >
                  <Mail className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>pmb@upitra.ac.id</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2">
                <a 
                  href="https://upitra.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Website Resmi UPITRA" 
                  className="w-7 h-7 rounded-lg bg-blue-950/90 border border-blue-800/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-all shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://wa.me/628112907500" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="WhatsApp PMB UPITRA" 
                  className="w-7 h-7 rounded-lg bg-blue-950/90 border border-blue-800/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram Resmi" 
                  className="w-7 h-7 rounded-lg bg-blue-950/90 border border-blue-800/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-all shadow-xs text-[10px] font-bold"
                >
                  IG
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="YouTube Resmi UPITRA" 
                  className="w-7 h-7 rounded-lg bg-blue-950/90 border border-blue-800/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-all shadow-xs text-[10px] font-bold"
                >
                  YT
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer: Legal & Copyright Bar */}
      <div className="relative border-t border-blue-950 bg-[#040e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Universitas Pignatelli Triputra (UPITRA).</span>
            <span className="hidden sm:inline text-blue-900">•</span>
            <span className="text-slate-400">LLDIKTI Wilayah VI Kemendiktisaintek RI.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/profil/tentang-upitra" className="hover:text-white transition-colors">
              Profil UPITRA
            </Link>
            <span className="text-blue-900">•</span>
            <Link href="/fst" className="hover:text-white transition-colors">
              Fakultas
            </Link>
            <span className="text-blue-900">•</span>
            <Link href="/layanan/career-center" className="hover:text-white transition-colors">
              Karir Triputra
            </Link>
            <button
              onClick={scrollToTop}
              title="Kembali ke atas"
              className="ml-2 w-7 h-7 rounded-md bg-blue-950 border border-blue-800/70 hover:bg-blue-700 hover:text-white flex items-center justify-center text-slate-300 transition-all cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
