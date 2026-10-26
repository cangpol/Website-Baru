"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Eye, ArrowRight, MapPin } from "lucide-react";

export default function VirtualTourSection() {
  const [activeTab, setActiveTab] = useState(0);

  const spots = [
    {
      title: "Gedung Kampus Utama & Lobby",
      desc: "Area depan dan pelayanan administrasi akademik terpadu UPITRA Surakarta.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Laboratorium Komputasi FST",
      desc: "Ruang riset rekayasa perangkat lunak, AI, dan jaringan komputer canggih.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Laboratorium Hospitality FSH",
      desc: "Ruang simulasi perhotelan bintang lima dan studio bahasa komunikasi bisnis.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Business Center & Mini Bank FEB",
      desc: "Pusat simulasi transaksi keuangan, akuntansi korporat, dan inkubasi usaha.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-blue-600" />
              Eksplorasi Kampus Virtual
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
              UPITRA 360° VIRTUAL CAMPUS TOUR
            </h2>
          </div>

          <Link
            href="/campus-tour"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all self-start md:self-auto"
          >
            <span>Reservasi Kunjungan Langsung</span>
            <ArrowRight className="w-4 h-4 text-sky-200" />
          </Link>
        </div>

        {/* Spot Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {spots.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* 360 Viewport Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 sm:h-96 md:h-[420px] bg-slate-900 group">
          <img
            src={spots[activeTab].image}
            alt={spots[activeTab].title}
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
          />

          {/* 360 Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-600/95 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-300" />
              UPITRA 360° LIVE VIEW
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Surakarta (Solo)
            </span>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 sm:p-8 text-white space-y-1">
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight">
              {spots[activeTab].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {spots[activeTab].desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

