"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@upitra.ac.id");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@upitra.ac.id" && (password === "upitra2026" || password.length >= 6)) {
        setSuccess(true);
      } else {
        setError("Email atau kata sandi tidak valid. Gunakan akun admin resmi UPITRA.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#071f3d] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow - Blue */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 border border-blue-400/30 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <GraduationCap className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Portal Administrasi UPITRA
        </h2>
        <p className="text-xs text-sky-200">
          Sistem Pengelolaan PMB, 3 Fakultas & Konten Universitas Pignatelli Triputra
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0b2545]/90 border border-blue-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-sky-300 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Login Berhasil!</h4>
              <p className="text-xs text-slate-300">
                Selamat datang kembali, Administrator. Anda dapat mengelola pendaftaran PMB dan data program studi UPITRA.
              </p>
              <Link
                href="/"
                className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 shadow-md transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Email Akun Staff / Admin
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@upitra.ac.id"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-blue-900 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/80 border border-blue-900 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Default seed password: <code className="text-sky-300">upitra2026</code>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Memverifikasi..." : "MASUK KE DASHBOARD"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center border-t border-blue-900/60 pt-4">
            <Link href="/" className="text-xs text-slate-400 hover:text-sky-300 transition-colors">
              &larr; Kembali ke Website Utama UPITRA
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
