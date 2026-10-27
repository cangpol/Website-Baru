import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  FileText, 
  Handshake, 
  ShieldCheck, 
  Calendar, 
  Download, 
  Search, 
  CheckCircle2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Daftar Kerjasama (MoU & MoA) - Kerjasama UPITRA",
  description: "Direktori dokumen resmi nota kesepahaman (MoU) dan perjanjian kerjasama (MoA) aktif antara UPITRA Surakarta dengan institusi mitra industri, universitas, dan pemerintah.",
};

const mouList = [
  {
    nomor: "012/MOU/UPITRA-ASSA/I/2026",
    mitra: "PT Adi Sarana Armada Tbk (ASSA Group)",
    jenis: "MoU & MoA",
    bidang: "Perekrutan Lulusan, Magang Bersertifikat & Riset Logistik Cerdas",
    berlakuHingga: "Januari 2031",
    status: "Aktif",
  },
  {
    nomor: "009/MOU/UPITRA-TAP/XII/2025",
    mitra: "PT Triputra Agro Persada Tbk (TAP)",
    jenis: "MoU & MoA",
    bidang: "Beasiswa Ikatan Dinas, Praktik Lapangan K3 Perkebunan & Riset Otomasi",
    berlakuHingga: "Desember 2030",
    status: "Aktif",
  },
  {
    nomor: "007/MOU/UPITRA-DHARMA/XI/2025",
    mitra: "PT Dharma Polimetal Tbk",
    jenis: "MoA Teknis",
    bidang: "Penyelarasan Kurikulum Teknik, Audit K3 Manufaktur, dan Magang Industri",
    berlakuHingga: "November 2029",
    status: "Aktif",
  },
  {
    nomor: "005/MOU/UPITRA-BEI/IX/2025",
    mitra: "PT Bursa Efek Indonesia (IDX)",
    jenis: "MoU Edukasi",
    bidang: "Pendirian Galeri Investasi BEI, Pelatihan Analis Saham & Literasi Pasar Modal",
    berlakuHingga: "September 2028",
    status: "Aktif",
  },
  {
    nomor: "004/MOU/UPITRA-RSKI/VIII/2025",
    mitra: "Rumah Sakit Kasih Ibu Surakarta",
    jenis: "MoA Praktik",
    bidang: "Wahana Praktik Klinik Keperawatan & Fisioterapi Mahasiswa FKes",
    berlakuHingga: "Agustus 2028",
    status: "Aktif",
  },
  {
    nomor: "002/MOU/UPITRA-LLDIKTI6/VI/2025",
    mitra: "LLDIKTI Wilayah VI Jawa Tengah",
    jenis: "MoU Pembinaan",
    bidang: "Peningkatan Mutu Akreditasi, Hibah Dosen, dan Merdeka Belajar Kampus Merdeka",
    berlakuHingga: "Juni 2030",
    status: "Aktif",
  },
];

export default function DaftarKerjasamaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Dokumen Legalitas Kemitraan"
        title="Daftar Kerjasama (MoU & MoA)"
        description="Transparansi data naskah nota kesepahaman dan perjanjian kerjasama aktif yang mendasari sinergi akademik UPITRA bersama mitra korporasi dan institusi."
        breadcrumbs={[
          { label: "Kerjasama", href: "/kerjasama" },
          { label: "Daftar Kerjasama" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Ringkasan Jumlah Naskah */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Tata Kelola Kerjasama</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Kerjasama Resmi yang Sah & Terverifikasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Seluruh naskah kerjasama dikelola oleh Kantor Urusan Kerjasama & Kemitraan Strategis UPITRA sesuai dengan standar mutu akreditasi BAN-PT dan Kemendiktisaintek RI.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-2xl font-black text-blue-700">50+</div>
              <div className="text-[11px] font-bold text-slate-600 uppercase">Dokumen MoU/MoA</div>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-2xl font-black text-blue-700">100%</div>
              <div className="text-[11px] font-bold text-slate-600 uppercase">Teregistrasi</div>
            </div>
          </div>
        </div>

        {/* Tabel MoU / MoA */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg sm:text-xl font-black text-[#0b2545]">
              Direktori Naskah Kerjasama Aktif
            </h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Status: Semua Dokumen Aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Instansi Mitra</th>
                  <th className="py-3 px-4">Nomor Naskah Dokumen</th>
                  <th className="py-3 px-4">Ruang Lingkup Kerjasama</th>
                  <th className="py-3 px-4">Masa Berlaku</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mouList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-4 px-4 font-bold text-[#0b2545]">
                      {item.mitra}
                      <span className="block text-[10px] text-blue-700 font-normal mt-0.5">{item.jenis}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-mono text-xs">{item.nomor}</td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs">{item.bidang}</td>
                    <td className="py-4 px-4 text-slate-600 font-medium">{item.berlakuHingga}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
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

