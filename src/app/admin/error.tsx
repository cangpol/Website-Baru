"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Panel Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-blue-200 p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Admin Error Boundary
          </span>
          <h2 className="text-2xl font-black text-slate-900 pt-1">
            Gagal Memuat Modul Admin
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {error.message || "Terjadi kesalahan saat memproses data modul CMS. Hak akses Anda atau data input mungkin mengalami konflik."}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-500 bg-blue-50 py-1.5 px-3 rounded-lg border border-blue-100">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/admin"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-100 hover:bg-blue-100 text-slate-700 border border-blue-100 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

