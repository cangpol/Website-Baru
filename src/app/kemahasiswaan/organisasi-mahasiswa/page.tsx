import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Users, 
  Building2, 
  Trophy, 
  Sparkles, 
  Music, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Mountain, 
  HeartHandshake 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Organisasi Mahasiswa (Ormawa) & UKM - Kemahasiswaan UPITRA",
  description: "Direktori organisasi kemahasiswaan Universitas Pignatelli Triputra Surakarta: BEM, DPM, Himpunan Mahasiswa Program Studi (HMPS), dan ragam Unit Kegiatan Mahasiswa (UKM).",
};

const lembagaUtama = [
  {
    nama: "Dewan Perwakilan Mahasiswa (DPM)",
    singkatan: "DPM UPITRA",
    peran: "Lembaga Legislatif & Pengawasan",
    desc: "Memegang kedaulatan aspirasi mahasiswa, mengesahkan anggaran organisasi kemahasiswaan, dan mengawasi implementasi program kerja kabinet eksekutif mahasiswa.",
  },
  {
    nama: "Badan Eksekutif Mahasiswa (BEM)",
    singkatan: "BEM UPITRA",
    peran: "Lembaga Eksekutif Tertinggi Mahasiswa",
    desc: "Menjalankan roda kepemimpinan eksekutif mahasiswa, menginisiasi gerakan sosial kemasyarakatan, advokasi kesejahteraan mahasiswa, dan event festival kampus tahunan.",
  },
];

const hmpsList = [
  { nama: "HIMATIF", prodi: "Himpunan Mahasiswa Informatika", fakultas: "FST" },
  { nama: "HIMASI", prodi: "Himpunan Mahasiswa Sistem Informasi", fakultas: "FST" },
  { nama: "HIMARPL", prodi: "Himpunan Mahasiswa Rekayasa Perangkat Lunak", fakultas: "FST" },
  { nama: "HIMAMA", prodi: "Himpunan Mahasiswa Manajemen", fakultas: "FEB" },
  { nama: "HIMAKSI", prodi: "Himpunan Mahasiswa Akuntansi", fakultas: "FEB" },
  { nama: "HIMAPAR", prodi: "Himpunan Mahasiswa Pariwisata", fakultas: "FSH" },
  { nama: "ESA", prodi: "English Students Association", fakultas: "FSH" },
  { nama: "HIMA K3", prodi: "Himpunan Mahasiswa Keselamatan & Kesehatan Kerja", fakultas: "FKes" },
  { nama: "HIMA FISIO", prodi: "Himpunan Mahasiswa Fisioterapi", fakultas: "FKes" },
  { nama: "HIMA KEP", prodi: "Himpunan Mahasiswa Keperawatan", fakultas: "FKes" },
];

const ukmList = [
  {
    nama: "UKM Olahraga Terpadu (Futsal, Basket, Badminton)",
    kategori: "Olahraga & Kebugaran",
    desc: "Wadah pengembangan bakat atletik mahasiswa, latihan rutin mingguan, dan partisipasi dalam kejuaraan antar universitas se-Jawa Tengah.",
  },
  {
    nama: "Paduan Suara Mahasiswa (PSM Gita Pignatelli)",
    kategori: "Seni Suara & Vokal",
    desc: "Grup paduan suara resmi universitas yang bertugas dalam upacara wisuda, dies natalis, serta kompetisi paduan suara nasional.",
  },
  {
    nama: "UKM Musik & Akustik Kampus",
    kategori: "Seni Musik & Kreativitas",
    desc: "Komunitas musisi kampus, pembinaan band mahasiswa, pelatihan instrumen musik, dan pengisi panggung apresiasi seni.",
  },
  {
    nama: "Robotics, IoT & Developer Student Club",
    kategori: "Sains & Teknologi Terapan",
    desc: "Klub riset terapan mikrokontroler Arduino/ESP32, autonomous robot, dan kompetisi hackathon teknologi.",
  },
  {
    nama: "Mahasiswa Pecinta Alam (MAPALA Pignatelli)",
    kategori: "Petualangan & Konservasi Alam",
    desc: "Eksplorasi pendakian gunung, susur gua (*caving*), konservasi hutan lindung, dan tanggap darurat bencana alam relawan kampus.",
  },
  {
    nama: "Kerohanian & Pelayanan Kasih Ignasian",
    kategori: "Spiritualitas & Sosial",
    desc: "Pembinaan rohani, doa bersama, retret tahunan, dan pelayanan bakti kasih sosial ke panti werdha dan anak asuh.",
  },
];

export default function OrganisasiMahasiswaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Aktivitas & Kepemimpinan Kampus"
        title="Organisasi Mahasiswa (Ormawa)"
        description="Wadah aktualisasi diri, belajar berdemokrasi, dan mengasah keterampilan manajerial kepemimpinan melalui organisasi dan unit kegiatan mahasiswa UPITRA."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Organisasi Mahasiswa" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Lembaga Eksekutif & Legislatif */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pemerintahan Mahasiswa</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Lembaga Tinggi Mahasiswa
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Pilar utama kepemimpinan dan perwakilan aspirasi mahasiswa UPITRA:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lembagaUtama.map((lem, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md bg-blue-100 text-blue-800">
                    {lem.singkatan}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {lem.peran}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#0b2545]">
                  {lem.nama}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lem.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Himpunan Mahasiswa Program Studi (HMPS) */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Rumpun Jurusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              10 Himpunan Mahasiswa Program Studi (HMPS)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Organisasi berbasis keilmuan spesifik pada masing-masing program studi:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hmpsList.map((h, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 transition-all space-y-1">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {h.fakultas}
                </span>
                <div className="text-base font-black text-[#0b2545] pt-1">
                  {h.nama}
                </div>
                <div className="text-xs text-slate-600">
                  {h.prodi}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unit Kegiatan Mahasiswa (UKM) */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Minat & Bakat</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Unit Kegiatan Mahasiswa (UKM)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kembangkan potensi non-akademik, hobi, dan kepemimpinan dalam komunitas mahasiswa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ukmList.map((ukm, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {ukm.kategori}
                  </span>
                  <h3 className="text-base font-bold text-[#0b2545] leading-snug">
                    {ukm.nama}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ukm.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

