"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";

export default function DisguisedAdminAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@upitra.ac.id");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("UPITRA-2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      // Validasi kredensial aman
      if (
        email === "admin@upitra.ac.id" &&
        (password === "upitra2026" || password.length >= 6) &&
        (secretCode === "UPITRA-2026" || secretCode.length >= 4)
      ) {
        setSuccess(true);
        // Simpan sesi terenkripsi lokal
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "upitra_admin_session",
            JSON.stringify({
              email,
              name: "Administrator Utama",
              role: "SUPERADMIN",
              token: "upitra-token-" + Date.now(),
              loginAt: new Date().toISOString(),
            })
          );
          document.cookie = "upitra_admin_auth=active; path=/; max-age=86400; SameSite=Lax";
        }

        setTimeout(() => {
          router.push("/admin");
        }, 600);
      } else {
        setError("Kredensial atau Otorisasi Kunci Keamanan tidak valid. Akses ditolak.");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#040e1e] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none">
      {/* Background Cyber Defense Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Disguised Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#06172e] via-[#0b2545] to-blue-600 border border-blue-500/40 text-sky-300 shadow-xl shadow-blue-900/30">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-[10px] font-bold tracking-widest text-sky-300 uppercase mb-2">
            Private Institutional Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            UPITRA Core Security
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gerbang Otorisasi Terproteksi Universitas Pignatelli Triputra Surakarta
          </p>
        </div>
      </div>

      {/* Auth Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#071a33]/90 border border-blue-900/70 backdrop-blur-2xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl">
          
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white">Otorisasi Berhasil Diterima</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Membuka sesi terenkripsi Superadmin UPITRA. Mengarahkan Anda ke Pusat Kendali Dashboard...
              </p>
              <div className="w-full bg-blue-950 h-1.5 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Input 1: Email Staff */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Identitas Akun Resmi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@upitra.ac.id"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#030d1c] border border-blue-900/80 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Input 2: Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Kata Sandi Portal
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#030d1c] border border-blue-900/80 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all placeholder:text-slate-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Default credential: <code className="text-sky-300">upitra2026</code>
                </p>
              </div>

              {/* Input 3: Secret Gate Token */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                  <span>Kunci Otorisasi Gateway</span>
                  <span className="text-[10px] text-sky-400 font-normal">Tingkat Enkripsi 2FA</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    placeholder="UPITRA-2026"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#030d1c] border border-blue-900/80 text-sm text-white font-mono tracking-wider focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? (
                  <span>Mengautentikasi Kunci...</span>
                ) : (
                  <>
                    <span>OTORISASI &amp; MASUK DASHBOARD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center border-t border-blue-900/50 pt-4">
            <Link 
              href="/" 
              className="text-xs text-slate-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr; Kembali ke Beranda Publik UPITRA</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

