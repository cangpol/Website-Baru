"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalPublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#0b2545]">
            Terjadi Kendala Memuat Halaman
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mohon maaf atas ketidaknyamanan ini. Sistem mendeteksi gangguan saat memuat konten. Silakan coba muat ulang atau kembali ke beranda.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-slate-400 bg-slate-50 py-1 px-2 rounded-lg border border-slate-200">
              ID Kode: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

