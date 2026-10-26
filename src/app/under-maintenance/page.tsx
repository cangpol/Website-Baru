"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Construction, 
  ArrowLeft, 
  Phone, 
  Compass, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Home, 
  MessageCircle,
  ExternalLink
} from "lucide-react";

function MaintenanceContent() {
  const searchParams = useSearchParams();
  const menuName = searchParams.get("menu") || "Halaman Informasi";
  const categoryName = searchParams.get("cat") || "Layanan Universitas";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center">
      
      {/* Back button */}
      <div className="flex justify-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-xs font-semibold transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda UPITRA</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-xl shadow-blue-900/5 relative overflow-hidden">
        
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-100/50 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-sky-100/50 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Construction className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>MODUL INFORMASI: {categoryName}</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              {menuName}
            </h1>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              Sedang Dalam Tahap Pemutakhiran Data & Konten Digital
            </p>
          </div>

          {/* Notice Box */}
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
            <p>
              Mohon maaf atas ketidaknyamanan ini. Halaman resmi <strong>{menuName}</strong> sedang dipersiapkan dan dimutakhirkan oleh Biro Administrasi Akademik, Sistem Informasi & Humas <strong>Universitas Pignatelli Triputra (UPITRA)</strong> untuk memberikan data yang paling akurat dan komprehensif.
            </p>
            <p className="text-slate-500 text-[11px] pt-1">
              *Jika Anda memerlukan informasi mendesak terkait materi ini, silakan hubungi Sekretariat / Layanan PMB UPITRA.
            </p>
          </div>

          {/* Fast Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0b2545] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Beranda Utama</span>
            </Link>

            <a
              href="https://wa.me/6281225008080?text=Halo%20Admin%20UPITRA,%20saya%20ingin%20menanyakan%20informasi%20terkait%20halaman%20ini."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp PMB / Humas</span>
            </a>

            <Link
              href="/pmb"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Pendaftaran Mahasiswa Baru</span>
            </Link>

            <Link
              href="/ebrochure"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-blue-700 border border-slate-200 font-bold text-xs shadow-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Download E-Brosur</span>
            </Link>
          </div>

          {/* Guarantee Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-blue-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Akreditasi BAIK SEKALI BAN-PT
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Hotline PMB: 0812 2500 8080
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function UnderMaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-bold text-slate-500">Memuat Sistem Informasi UPITRA...</p>
          </div>
        }>
          <MaintenanceContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

