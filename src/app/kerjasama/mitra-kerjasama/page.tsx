import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Building2, 
  Handshake, 
  ShieldCheck, 
  Hospital, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Briefcase 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mitra Kerjasama Strategis - Kerjasama UPITRA",
  description: "Jejaring kemitraan strategis Universitas Pignatelli Triputra Surakarta: Triputra Group, BUMN, rumah sakit terkemuka, dan perguruan tinggi bereputasi.",
};

const kelompokMitra = [
  {
    kategori: "Ekosistem Bisnis Triputra Group",
    badge: "Mitra Strategis Utama",
    desc: "Kerjasama penyerapan lulusan, program magang intensif, beasiswa ikatan dinas, dan transfer pengetahuan langsung dari praktisi industri.",
    mitraList: [
      { nama: "PT Adi Sarana Armada Tbk (ASSA)", sektor: "Logistics, Car Rental & Mobility Solutions" },
      { nama: "PT Triputra Agro Persada Tbk (TAP)", sektor: "Agribusiness, Sustainable Palm Oil & Rubber" },
      { nama: "PT Dharma Polimetal Tbk", sektor: "Automotive Component Manufacturing" },
      { nama: "PT Kirana Megatara Tbk", sektor: "Natural Rubber Processing & Export" },
      { nama: "PT Puninar Logistics", sektor: "Integrated Supply Chain & Warehousing" },
      { nama: "PT Daya Adicipta Mustika", sektor: "Honda Motorcycle Dealership & Distribution" },
    ],
  },
  {
    kategori: "Sektor Perbankan, Finansial & Pasar Modal",
    badge: "Keuangan & Investasi",
    desc: "Kerjasama edukasi pasar modal, tax center, magang perbankan syariah/konvensional, dan kurikulum akuntansi digital.",
    mitraList: [
      { nama: "Bursa Efek Indonesia (BEI / IDX)", sektor: "Galeri Investasi & Edukasi Pasar Modal" },
      { nama: "PT Bank Central Asia Tbk (BCA)", sektor: "Perbankan Komersial & Pembayaran Digital" },
      { nama: "PT Bank Mandiri (Persero) Tbk", sektor: "Layanan Perbankan & Program Magang Kampus" },
      { nama: "Bank Jateng", sektor: "Mitra Perbankan Daerah & Beasiswa Pemda" },
    ],
  },
  {
    kategori: "Rumah Sakit & Lembaga Layanan Kesehatan",
    badge: "Klinik & Rumah Sakit",
    desc: "Fasilitas praktik klinik mahasiswa Fakultas Kesehatan (K3, Fisioterapi, Keperawatan) dan riset kesehatan kerja.",
    mitraList: [
      { nama: "RS Kasih Ibu Surakarta", sektor: "Praktik Keperawatan & Fisioterapi" },
      { nama: "RS Dr. Oen Surakarta", sektor: "Praktik Medikal Bedah & Emergency Nursing" },
      { nama: "RS Panti Waluyo Surakarta", sektor: "Klinik Asuhan Keperawatan Komprehensif" },
      { nama: "Pusat K3 & Hiperkes Jawa Tengah", sektor: "Sertifikasi K3 & Higiene Industri" },
    ],
  },
];

export default function MitraKerjasamaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Jejaring Industri & Institusi"
        title="Mitra Kerjasama"
        description="UPITRA didukung jejaring kemitraan industri berskala nasional dan internasional untuk memastikan relevansi kurikulum dan percepatan karir lulusan."
        breadcrumbs={[
          { label: "Kerjasama", href: "/kerjasama" },
          { label: "Mitra Kerjasama" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Intro */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Konektivitas Industri Nyata</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Menghubungkan Kampus dengan Lebih dari 50 Unit Bisnis Terkemuka
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Keunggulan distingtif UPITRA terletak pada afiliasi erat dengan <strong>Triputra Group</strong> dan mitra strategis di sektor industri manufaktur, agribisnis, teknologi informasi, logistik, perhotelan, perbankan, dan rumah sakit. Mahasiswa menikmati kemudahan akses magang, penelitian studi kasus riil, hingga prioritas rekrutmen sebelum wisuda.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>MoU Resmi Aktif & Teregistrasi</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Program Magang Bersertifikat</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Kerjasama Triputra Ecosystem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Triputra Group mempekerjakan lebih dari 50.000 karyawan di seluruh Indonesia dan berkomitmen memprioritaskan talenta lulusan UPITRA.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              Serapan Lulusan 92% Bekerja
            </div>
          </div>
        </section>

        {/* Kelompok Mitra Industri */}
        <section className="space-y-10">
          {kelompokMitra.map((kel, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{kel.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    {kel.kategori}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 max-w-md sm:text-right">
                  {kel.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kel.mitraList.map((m, mIdx) => (
                  <div 
                    key={mIdx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 transition-all space-y-1.5"
                  >
                    <div className="text-xs font-bold text-blue-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{m.nama}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-6">
                      {m.sektor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

