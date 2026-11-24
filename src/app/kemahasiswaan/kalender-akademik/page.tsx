import { EXTRA_DEFAULTS } from "@/lib/pageContentExtra";
import { getPageContentMerged } from "@/server/page-content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  FileText 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kalender Akademik TA 2026/2027 - Kemahasiswaan UPITRA",
  description: "Jadwal resmi kalender akademik Universitas Pignatelli Triputra Surakarta: Masa perkuliahan semester ganjil dan genap, registrasi KRS, jadwal UTS/UAS, dan wisuda.",
};



export default async function KalenderAkademikPage() {
  const __c = await getPageContentMerged("kalender-akademik");
  const jadwalGasal = __c.jadwalGasal as (typeof EXTRA_DEFAULTS)["kalender-akademik"]["jadwalGasal"];
  const jadwalGenap = __c.jadwalGenap as (typeof EXTRA_DEFAULTS)["kalender-akademik"]["jadwalGenap"];
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Panduan Waktu Perkuliahan"
        title="Kalender Akademik TA 2026/2027"
        description="Jadwal operasional akademik resmi universitas sebagai acuan perkuliahan, evaluasi hasil belajar, registrasi semester, dan agenda wisuda UPITRA."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Kalender Akademik" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Unduh PDF Kalender */}
        <div className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-10 text-white border border-blue-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Surat Keputusan Rektor</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Kalender Akademik Resmi Tahun Ajaran 2026/2027
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Disahkan oleh Rektor UPITRA sebagai pedoman baku seluruh sivitas akademika universitas.
            </p>
          </div>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md shrink-0"
          >
            <Download className="w-4 h-4 text-blue-900" />
            <span>Unduh Kalender Akademik (PDF)</span>
          </button>
        </div>

        {/* Semester Gasal */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Semester I</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                Semester Gasal TA 2026/2027
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              September 2026 - Januari 2027
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Nama Kegiatan Akademik</th>
                  <th className="py-3 px-4">Rentang Waktu Pelaksanaan</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jadwalGasal.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0b2545]">{item.kegiatan}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.tanggal}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.status === "Berlangsung" 
                          ? "bg-blue-100 text-blue-800" 
                          : item.status === "Selesai" 
                          ? "bg-slate-100 text-slate-600" 
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Semester Genap */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Semester II</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                Semester Genap TA 2026/2027
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Februari - Juli 2027
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Nama Kegiatan Akademik</th>
                  <th className="py-3 px-4">Rentang Waktu Pelaksanaan</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jadwalGenap.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0b2545]">{item.kegiatan}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{item.tanggal}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

