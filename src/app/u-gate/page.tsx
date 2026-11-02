"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { loginAdminAction } from "@/app/actions/auth";

function UGateLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gatewayKey, setGatewayKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Verifikasi Gateway Key instansi
    const validKey = process.env.NEXT_PUBLIC_ADMIN_GATEWAY_KEY || "UPITRA-GATEWAY-2026";
    if (gatewayKey.trim() !== validKey) {
      setError("Security Gateway Key instansi tidak valid. Akses ditolak.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);

      const result = await loginAdminAction({ success: false, message: "" }, formData);

      if (result.success) {
        // Alihkan ke rute admin yang dituju
        router.push(redirectTarget);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  const handleQuickDemoFill = () => {
    setEmail("admin@upitra.ac.id");
    setGatewayKey(process.env.NEXT_PUBLIC_ADMIN_GATEWAY_KEY || "UPITRA-GATEWAY-2026");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-sky-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Soft Blue Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card - Pure White with Soft Shadow */}
      <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-9 shadow-2xl shadow-blue-900/10 border border-blue-100/90 relative z-10 space-y-7">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md shadow-blue-900/10 border border-slate-100 ring-1 ring-blue-50 mx-auto">
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
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>UPITRA Internal Gateway</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#06172e] tracking-tight">
              Portal Otentikasi Staf
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sistem Manajemen Terpadu Universitas Pignatelli Triputra
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alamat Email Resmi
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@upitra.ac.id"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#06172e] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#06172e] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Gateway Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Security Gateway Key
              </label>
              <span className="text-[10px] text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                Kode Instansi
              </span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={gatewayKey}
                onChange={(e) => setGatewayKey(e.target.value)}
                placeholder="UPITRA-GATEWAY-2026"
                className="w-full bg-blue-50/40 border border-blue-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-blue-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
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
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4 transition cursor-pointer"
          >
            Isi Kredensial Default Otomatis (Klik di sini)
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-slate-500 space-y-1 relative z-10">
        <p>&copy; {new Date().getFullYear()} Universitas Pignatelli Triputra • Biro TI & Sistem Informasi</p>
        <p className="text-[10px] text-slate-400">Akses terbatas hanya untuk staf berwenang.</p>
      </div>
    </div>
  );
}

export default function UGateLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
        Memuat Portal Otentikasi...
      </div>
    }>
      <UGateLoginForm />
    </Suspense>
  );
}
