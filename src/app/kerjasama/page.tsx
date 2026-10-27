import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Handshake, 
  Building2, 
  FileText, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kerjasama & Kemitraan Strategis - Universitas Pignatelli Triputra",
  description: "Portal kemitraan strategis UPITRA Surakarta: Mitra industri terkemuka, daftar nota kesepahaman (MoU/MoA), dan implementasi magang serta rekrutmen kerja.",
};

const kerjasamaCards = [
  {
    title: "Mitra Kerjasama",
    href: "/kerjasama/mitra-kerjasama",
    icon: Building2,
    desc: "Jejaring industri pendukung: ekosistem Triputra Group, perbankan nasional, rumah sakit terkemuka, dan perguruan tinggi bereputasi.",
    tag: "Jejaring Industri",
  },
  {
    title: "Daftar Kerjasama (MoU / MoA)",
    href: "/kerjasama/daftar-kerjasama",
    icon: FileText,
    desc: "Transparansi direktori nota kesepahaman (MoU) dan naskah perjanjian kerjasama teknis (MoA) yang aktif dan tersertifikasi.",
    tag: "Legalitas & Dokumen",
  },
  {
    title: "Kegiatan Kerjasama",
    href: "/kerjasama/kegiatan-kerjasama",
    icon: Briefcase,
    desc: "Realisasi konkrit program kemitraan: rekrutmen kerja langsung sebelum wisuda, kuliah dosen tamu praktisi, dan magang bersertifikat 6 bulan.",
    tag: "Program Nyata",
  },
];

export default function KerjasamaIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Portal Kerjasama & Kemitraan"
        title="Kerjasama Strategis UPITRA"
        description="Membangun sinergi kokoh antara perguruan tinggi dan dunia usaha/dunia industri (DUDI) untuk menghadirkan pendidikan yang relevan dan siap kerja."
        breadcrumbs={[
          { label: "Kerjasama" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Kerjasama */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Kantor Urusan Kerjasama</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Sinergi Nyata Bersama Triputra Group & Industri Nasional
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              UPITRA memposisikan diri sebagai mitra strategis industri dalam penyediaan talenta muda berintegritas tinggi dan terampil. Jelajahi menu kemitraan di bawah ini:
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>50+ Mitra Korporasi Nasional</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Handshake className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Prioritas Rekrutmen Karir Lulusan</span>
            </div>
          </div>
        </div>

        {/* 3 Sub-Menu Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kerjasamaCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

