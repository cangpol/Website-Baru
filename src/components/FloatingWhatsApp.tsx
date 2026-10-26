"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip Chat */}
      <span className="hidden md:inline-block mr-3 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-lg text-xs font-bold text-[#0b2545] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat Admisi UPITRA
      </span>

      {/* Floating Button */}
      <a
        href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20ingin%20konsultasi%20pendaftaran%20PMB%202026/2027"
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi WhatsApp Admisi UPITRA"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 hover:scale-110 transition-all duration-300 relative"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Pulse effect */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </a>
    </aside>
  );
}

