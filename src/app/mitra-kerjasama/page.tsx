"use client";

import { usePageContent } from "@/lib/usePageContent";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Handshake, 
  Search, 
  CheckCircle2, 
  Building2, 
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

interface PartnerData {
  nama: string;
  bidang?: string;
  kategori: "triputra" | "industry" | "health_tourism" | "institution";
  kategoriLabel: string;
  logo: string;
  status: string;
}


export default function MitraKerjasamaPage() {
  const __c = usePageContent("mitra-kerjasama").content as any;
  const allMitraList = __c.allMitraList as PartnerData[];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"name-asc" | "category">("name-asc");

  const categories = [
    { id: "all", label: "SEMUA MITRA (43)" },
    { id: "triputra", label: "TRIPUTRA GROUP & AFILIASI" },
    { id: "industry", label: "INDUSTRI & KORPORASI" },
    { id: "health_tourism", label: "KESEHATAN & PARIWISATA" },
    { id: "institution", label: "PEMERINTAH & PENDIDIKAN" },
  ];

  const filteredMitra = useMemo(() => {
    const list = allMitraList.filter((m) => {
      const matchCat = selectedCategory === "all" || m.kategori === selectedCategory;
      const matchSearch =
        m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.kategoriLabel.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortOrder === "name-asc") {
      list.sort((a, b) => a.nama.localeCompare(b.nama));
    } else {
      list.sort((a, b) => a.kategoriLabel.localeCompare(b.kategoriLabel));
    }

    return list;
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Header Banner - Blue & White Theme (Compact & Proportional) */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white py-8 sm:py-10 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-500/20 text-sky-200 text-[11px] font-bold uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5 text-sky-400" />
              Jejaring Kemitraan & Kolaborasi Industri
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Mitra Kerjasama UPITRA
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              Universitas Pignatelli Triputra menjalin kolaborasi strategis dengan <strong>Triputra Group</strong>, korporasi swasta & BUMN, rumah sakit jejaring klinis, dinas pemerintahan, serta perguruan tinggi untuk mempercepat serapan kerja dan magang bersertifikat bagi setiap mahasiswa.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar - Sleek, Minimalist & Proportional (Saves Vertical Space) */}
        <section className="py-2.5 sm:py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[53px] z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
              {/* Search Box - Compact */}
              <div className="relative w-full sm:w-80 md:w-96">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama mitra atau bidang kerjasama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>

              {/* Sorting and Count - Compact */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                  Menampilkan <strong className="text-blue-700">{filteredMitra.length}</strong> dari <strong>{allMitraList.length}</strong> mitra
                </span>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "name-asc" | "category")}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-600 bg-white cursor-pointer"
                >
                  <option value="name-asc">Urutkan: Nama A - Z</option>
                  <option value="category">Urutkan: Kategori Bidang</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills - Compact */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                      : "bg-slate-100/80 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Partners Grid - Proportional & Fast Loading */}
        <section className="py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-8">
          {filteredMitra.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">Mitra Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Tidak ada mitra yang cocok dengan kata kunci &quot;{searchTerm}&quot;. Silakan coba kata kunci lain atau pilih kategori &quot;Semua Mitra&quot;.
              </p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredMitra.map((item, itemIdx) => (
                <div
                  key={`${item.nama}-${itemIdx}`}
                  className="bg-white rounded-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-between h-[126px] sm:h-[132px] group"
                >
                  {/* Status Badge */}
                  <div className="w-full flex items-center justify-between text-[8.5px] font-semibold mb-1">
                    <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded truncate max-w-[75%] font-bold">
                      {item.kategoriLabel}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Aktif
                    </span>
                  </div>

                  {/* Logo Image with Lazy Loading & Fast Decoding */}
                  <div className="h-14 w-full flex items-center justify-center p-1.5 bg-slate-50/70 rounded-lg border border-slate-100">
                    <img
                      src={item.logo}
                      alt={item.nama}
                      loading="lazy"
                      decoding="async"
                      width={120}
                      height={48}
                      className="max-h-11 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Partner Name */}
                  <div className="w-full text-center pt-1">
                    <h3 className="text-[10.5px] font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                      {item.nama}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Partnership Proposal Callout */}
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-[#0b2545] to-[#071f3d] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Kolaborasi Tri Dharma Perguruan Tinggi
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Tertarik Menjalin Kemitraan Bersama UPITRA?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kami membuka kesempatan kolaborasi riset terapan, magang kerja mahasiswa, rekrutmen lulusan, serta beasiswa korporat bersama industri Anda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://wa.me/6281225008080?text=Halo%20Biro%20Kerjasama%20UPITRA,%20kami%20tertarik%20mengajukan%20MoU%20kemitraan%20industri"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-200" />
                <span>Hubungi Biro Kerjasama</span>
              </a>
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider border border-white/20 transition-all text-center"
              >
                Portal Admisi PMB
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

