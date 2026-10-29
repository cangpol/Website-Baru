"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import Image from "next/image";

export default function UGateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gatewayKey, setGatewayKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Kredensial Resmi Administrator UPITRA
    const validEmail = "admin@upitra.ac.id";
    const validPass = "upitra2026";
    const validKey = "UPITRA-2026";

    setTimeout(() => {
      if (email.trim().toLowerCase() === validEmail && password === validPass && gatewayKey.trim() === validKey) {
        // Simpan sesi terenkripsi di localStorage dan cookie
        const sessionData = {
          email: validEmail,
          name: "Administrator Utama UPITRA",
          role: "SUPERADMIN",
          loginAt: new Date().toISOString(),
        };
        localStorage.setItem("upitra_admin_session", JSON.stringify(sessionData));
        document.cookie = `upitra_admin_auth=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

        // Alihkan langsung ke dashboard admin
        router.push("/admin");
      } else {
        setError("Kredensial atau Security Gateway Key tidak valid. Akses ditolak.");
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail("admin@upitra.ac.id");
    setPassword("upitra2026");
    setGatewayKey("UPITRA-2026");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#040e1e] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-[#071a33]/90 backdrop-blur-xl border border-blue-900/60 rounded-3xl p-7 sm:p-9 shadow-2xl relative z-10 space-y-7">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2.5 shadow-lg shadow-blue-950/50 border border-slate-100 mx-auto">
            <Image
              src="/images/logo.png"
              alt="Logo UPITRA"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>UPITRA Internal Gateway</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Portal Otentikasi Staf
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sistem Manajemen Terpadu Universitas Pignatelli Triputra
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Resmi Akun
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@upitra.ac.id"
                className="w-full bg-[#051326] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#051326] border border-blue-900/50 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Gateway Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Security Gateway Key
              </label>
              <span className="text-[10px] text-amber-400 font-mono">Kode Instansi</span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={gatewayKey}
                onChange={(e) => setGatewayKey(e.target.value)}
                placeholder="UPITRA-2026"
                className="w-full bg-[#051326] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-amber-300 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memverifikasi...
              </span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="pt-4 border-t border-blue-950/80 text-center">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-[11px] text-slate-400 hover:text-amber-300 underline underline-offset-4 transition"
          >
            Isi Kredensial Default Otomatis (Klik di sini)
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-slate-500 space-y-1 relative z-10">
        <p>&copy; {new Date().getFullYear()} Universitas Pignatelli Triputra • Biro TI & Sistem Informasi</p>
        <p className="text-[10px] text-slate-600">Akses terbatas hanya untuk staf berwenang.</p>
      </div>
    </div>
  );
}

