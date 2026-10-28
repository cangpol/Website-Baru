"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaEnrollmentSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#edf6fd] border-b border-slate-200/80 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container with Framer Motion Elevation & Organic Orbs */}
        <motion.div 
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[2.25rem] bg-gradient-to-r from-[#20a4ea] via-[#1095de] to-[#0284c7] py-14 sm:py-20 px-6 sm:px-12 text-center text-white shadow-xl shadow-sky-600/20 border border-white/25 transition-shadow duration-300 hover:shadow-[0_24px_55px_-12px_rgba(2,132,199,0.38)]"
        >
          {/* Subtle Top Glass Reflection Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Organic Floating Dark Blue Orbs (Animasi Halus Melayang tanpa merubah warna) */}
          <motion.div
            animate={{
              x: [0, 16, -10, 0],
              y: [0, -12, 8, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-14 -left-14 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-blue-900/18 pointer-events-none blur-xl"
          />

          <motion.div
            animate={{
              x: [0, -18, 12, 0],
              y: [0, 14, -10, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-blue-900/18 pointer-events-none blur-xl"
          />

          {/* Ambient Center Glow */}
          <motion.div
            animate={{
              opacity: [0.12, 0.28, 0.12],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full bg-white/10 pointer-events-none blur-3xl"
          />

          {/* Card Content with Staggered Framer Motion Reveal */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-xs mb-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Penerimaan Mahasiswa Baru 2026/2027</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Siap Memulai Perjalanan Akademikmu?
            </motion.h2>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto leading-relaxed font-normal pt-1"
            >
              Bergabunglah dengan ribuan mahasiswa yang telah memilih Universitas Pignatelli Triputra sebagai tempat meraih masa depan cerah.
            </motion.p>

            {/* Action Buttons with Spring Micro-Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Button 1: Daftar PMB 2026 */}
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#f59e00] hover:bg-[#ea580c] text-white font-bold text-sm shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-orange-900/30 transition-all cursor-pointer"
              >
                <span>Daftar PMB 2026</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </motion.a>

              {/* Button 2: Hubungi Kami */}
              <motion.a
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 0.22)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20ingin%20konsultasi%20pendaftaran%20PMB%202026/2027"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Hubungi Kami</span>
              </motion.a>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}


