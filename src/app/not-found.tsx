import Link from "next/link";
import { Compass, Home, Search, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 my-12">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              404 - Halaman Tidak Ditemukan
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2545] pt-2">
              Halaman Yang Anda Cari Belum Tersedia
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
              Tautan yang Anda tuju mungkin telah dipindahkan, berganti slug, atau belum dipublikasikan oleh administrator.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <Link
              href="/riset"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Search className="w-4 h-4" />
              Jelajahi Berita &amp; Riset
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
