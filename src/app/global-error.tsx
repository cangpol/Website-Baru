"use client";

import { AlertOctagon, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl border border-slate-700 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">
              Sistem Mengalami Kendala Kritis
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Terjadi error pada tingkat root aplikasi. Tim teknis UPITRA telah mencatat insiden ini.
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-slate-500 bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-700/50">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <button
            onClick={() => reset()}
            className="w-full px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Muat Ulang Aplikasi
          </button>
        </div>
      </body>
    </html>
  );
}
