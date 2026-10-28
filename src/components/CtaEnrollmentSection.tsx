"use client";

import { ArrowRight } from "lucide-react";

export default function CtaEnrollmentSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#edf6fd] border-b border-slate-200/80 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.25rem] bg-gradient-to-r from-[#20a4ea] via-[#1095de] to-[#0284c7] py-14 sm:py-20 px-6 sm:px-12 text-center text-white shadow-xl shadow-sky-600/15">
          
          {/* Subtle Decorative Vignette Circles (Mengacu pada Gambar) */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-900/15 pointer-events-none blur-sm" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-blue-900/15 pointer-events-none blur-sm" />

          {/* Card Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Siap Memulai Perjalanan Akademikmu?
            </h2>

            <p className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
              Bergabunglah dengan ribuan mahasiswa yang telah memilih Universitas Pignatelli Triputra sebagai tempat meraih masa depan cerah.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              
              {/* Button 1: Daftar PMB 2026 */}
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#f59e00] hover:bg-[#ea580c] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Daftar PMB 2026</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Button 2: Hubungi Kami */}
              <a
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20ingin%20konsultasi%20pendaftaran%20PMB%202026/2027"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Hubungi Kami</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

