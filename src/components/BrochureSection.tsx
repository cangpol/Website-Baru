"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function BrochureSection() {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState("");

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDownloaded(true);
    }
  };

  return (
    <section id="download-brosur" className="py-16 bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              Prospectus & Panduan Akademik 2026 / 2027
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Download Brosur UPITRA Terbaru
            </h2>
            <p className="text-sm text-slate-200 max-w-xl leading-relaxed">
              Dapatkan informasi komprehensif mengenai kurikulum 4 Fakultas (Sains & Tech, Ekonomic & Bussiness, Social Humaniora, Health), estimasi biaya kuliah per semester, profil lulusan, jalur beasiswa prestasi Triputra, dan fasilitas kampus.
            </p>
            <div className="pt-2">
              <Link
                href="/ebrochure"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-sm transition-all"
              >
                <span>Lihat Katalog 10 E-Brosur Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl">
              {downloaded ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-sky-300 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Tautan Brosur Terkirim!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    E-Brosur resmi UPITRA telah dikirimkan ke <strong>{email}</strong>. Anda juga dapat mengunduh langsung melalui tombol di bawah.
                  </p>
                  <button
                    onClick={() => setDownloaded(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh File PDF Sekarang
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDownload} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Masukkan Email Anda untuk Unduh Brosur
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-blue-900 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-sky-200" />
                    <span>DOWNLOAD E-BROSUR UPITRA (PDF)</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Bebas biaya & langsung dapat diunduh dalam format PDF</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

