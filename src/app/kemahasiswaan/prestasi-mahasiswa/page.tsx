import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Users, 
  ShieldCheck 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prestasi Mahasiswa - Kemahasiswaan UPITRA",
  description: "Daftar torehan prestasi dan penghargaan mahasiswa Universitas Pignatelli Triputra Surakarta dalam kompetisi akademik, inovasi sains, bisnis, seni, dan olahraga tingkat nasional.",
};

const prestasiList = [
  {
    tahun: "2026",
    kategori: "Teknologi & AI",
    juara: "Juara 1 Tingkat Nasional",
    kejuaraan: "National Agri-Tech & Smart Farming Hackathon 2026",
    penyelenggara: "Kementerian Pertanian RI & Konsorsium Perguruan Tinggi",
    tim: "Bagas Satria & Tim (S1 Informatika & Sistem Informasi)",
    deskripsi: "Menciptakan prototipe sensorik tanah cerdas terkoneksi cloud untuk efisiensi pemupukan kelapa sawit di unit bisnis Triputra Agro Persada.",
  },
  {
    tahun: "2026",
    kategori: "Bisnis & Manajemen",
    juara: "Juara 2 & Best Presentation",
    kejuaraan: "National Corporate Case Competition Triputra Youth Summit",
    penyelenggara: "Triputra Group Talent Management Jakarta",
    tim: "Anisa Rahmawati & Tim (S1 Manajemen)",
    deskripsi: "Solusi optimalisasi rute distribusi logistik ramah lingkungan berbasis algoritma routing pintar di PT Adi Sarana Armada Tbk.",
  },
  {
    tahun: "2026",
    kategori: "Kesehatan & K3",
    juara: "Juara 1 Kategori Riset Terapan",
    kejuaraan: "Kompetisi Nasional Inovasi K3 Industri Manufaktur 2026",
    penyelenggara: "Dewan K3 Nasional (DK3N)",
    tim: "Rizky Pratama & Tim (S1 Keselamatan & Kesehatan Kerja)",
    deskripsi: "Aplikasi penilaian postur kerja otomatis menggunakan Computer Vision untuk menurunkan angka insiden Low Back Pain di pabrik otomotif.",
  },
  {
    tahun: "2026",
    kategori: "Bahasa & Debat",
    juara: "Juara 3 & Overall Best Speaker",
    kejuaraan: "Central Java University English Debating Championship",
    penyelenggara: "LLDIKTI Wilayah VI Jawa Tengah",
    tim: "Maria Jessica (S1 Bahasa Inggris)",
    deskripsi: "Membahas mosi regulasi kecerdasan buatan, etika data global, dan diplomasi ketahanan pangan negara berkembang.",
  },
  {
    tahun: "2025",
    kategori: "Pariwisata & Hospitality",
    juara: "Gold Medal Table Setting & Tourism Video",
    kejuaraan: "National Hospitality Skills Competition 2025",
    penyelenggara: "Asosiasi Pendidikan Tinggi Pariwisata Indonesia (HILDIKTIPARI)",
    tim: "Tim S1 Pariwisata UPITRA",
    deskripsi: "Peragaan standar tata hidang bintang lima berpadu unsur kearifan kuliner tradisional keraton Surakarta.",
  },
];

export default function PrestasiMahasiswaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Hall of Fame & Penghargaan"
        title="Prestasi Mahasiswa"
        description="Dokumentasi torehan medali, piala, dan kejuaraan yang diraih oleh mahasiswa UPITRA dalam berbagai ajang kompetisi bergengsi tingkat regional dan nasional."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Prestasi Mahasiswa" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Skema Apresiasi Prestasi */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Apresiasi Universitas</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Dukungan Penuh & Penghargaan Bagi Mahasiswa Berprestasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              UPITRA memberikan insentif pembinaan, pendanaan delegasi lomba, pembebasan biaya kuliah (SKS), hingga rekognisi Surat Keterangan Pendamping Ijazah (SKPI) bagi mahasiswa yang mengharumkan nama almamater.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Trophy className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Insentif Finansial & Beasiswa</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Konversi Nilai Mata Kuliah Terkait</span>
            </div>
          </div>
        </section>

        {/* Timeline Daftar Prestasi */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Rekam Jejak Kejuaraan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Daftar Prestasi Mahasiswa Terkini
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Bukti nyata dedikasi dan kualitas daya saing intelektual mahasiswa UPITRA:
            </p>
          </div>

          <div className="space-y-4">
            {prestasiList.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-black text-xs">
                      {p.tahun}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                      <Trophy className="w-3.5 h-3.5 text-blue-600" />
                      <span>{p.juara}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {p.kategori}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] leading-snug">
                    {p.kejuaraan}
                  </h3>

                  <div className="text-xs font-semibold text-blue-700">
                    Oleh: {p.tim}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.deskripsi}
                  </p>

                  <div className="text-[11px] text-slate-400">
                    Penyelenggara: {p.penyelenggara}
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700">
                  <Medal className="w-7 h-7" />
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
