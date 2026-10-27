import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Award, 
  Trophy, 
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  GraduationCap 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prestasi & Capaian - Profil UPITRA",
  description: "Daftar capaian prestasi akademik, rekor serapan kerja lulusan di Triputra Group, akreditasi Baik Sekali, dan torehan juara mahasiswa UPITRA.",
};

const prestasiMahasiswa = [
  {
    kegiatan: "National IoT & AI Innovation Hackathon 2026",
    raihan: "Juara 1 Tingkat Nasional",
    tim: "Tim FST UPITRA (Informatika & Sistem Informasi)",
    penyelenggara: "Kementerian Komunikasi dan Informatika & Perguruan Tinggi Terkemuka",
    deskripsi: "Mengembangkan inovasi 'Smart Agri-Telemetry System' untuk pemantauan perkebunan sawit berkelanjutan berbasis IoT dan edge computing.",
  },
  {
    kegiatan: "National Business Case Competition Triputra Youth Summit 2026",
    raihan: "Juara 2 Nasional & Best Presentation",
    tim: "Tim FEB UPITRA (Manajemen & Akuntansi)",
    penyelenggara: "Triputra Group Talent Management",
    deskripsi: "Menyusun strategi optimalisasi logistik rantai pasok 'Green Cold-Chain Logistics' yang efisien dan ramah lingkungan.",
  },
  {
    kegiatan: "Lomba Inovasi K3 & Ergonomi Industri Manufaktur 2026",
    raihan: "Juara 1 Kategori Riset Terapan",
    tim: "Mahasiswa S1 K3 (Fakultas Kesehatan)",
    penyelenggara: "Dewan Keselamatan dan Kesehatan Kerja Nasional (DK3N)",
    deskripsi: "Rancang bangun aplikasi mobile audit risiko ergonomis berbasis Computer Vision untuk pekerja manufaktur komponen otomotif.",
  },
  {
    kegiatan: "Central Java English Debate Championship 2026",
    raihan: "Juara 3 & Overall Best Speaker",
    tim: "Debating Society S1 Bahasa Inggris UPITRA",
    penyelenggara: "Kopertis / LLDIKTI Wilayah VI Jawa Tengah",
    deskripsi: "Berhasil melaju ke babak semifinal dan meraih predikat pembicara terbaik dalam mosi etika kecerdasan buatan global.",
  },
];

const capaianInstitusi = [
  {
    angka: "BAIK SEKALI",
    label: "Akreditasi Institusi",
    instansi: "BAN-PT (Badan Akreditasi Nasional)",
    desc: "Penjaminan mutu tata kelola perguruan tinggi modern, kurikulum adaptif, dan sarana prasarana digital prima.",
  },
  {
    angka: "92%",
    label: "Tingkat Serapan Kerja Lulusan",
    instansi: "Tracer Study UPITRA & Triputra CDC",
    desc: "Lulusan telah diterima bekerja di ekosistem Triputra Group dan perusahaan mitra nasional sebelum masa tunggu 3 bulan.",
  },
  {
    angka: "100%",
    label: "Beasiswa Triputra Peduli",
    instansi: "Yayasan Santo Ignatius Pignatelli",
    desc: "Ratusan mahasiswa berprestasi dan berlatar belakang ekonomi rentan didanai beasiswa pendidikan penuh.",
  },
  {
    angka: "50+",
    label: "Jejaring Industri Aktif",
    instansi: "Triputra Group & Mitra Strategis",
    desc: "Kerjasama magang bersertifikat, campus recruitment, dan penyelarasan kurikulum bersama industri riil.",
  },
];

export default function PrestasiDanCapaianPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Keunggulan & Rekam Jejak"
        title="Prestasi & Capaian"
        description="Bukti dedikasi sivitas akademika UPITRA dalam melahirkan karya keilmuan bereputasi, juara kompetisi inovasi, dan rekor penyerapan karir lulusan."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Prestasi & Capaian" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* STATISTIK CAPAIAN INSTITUSI */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Metrik Mutu</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Capaian Kelembagaan & Serapan Kerja
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Indikator nyata keunggulan akademik dan relevansi kurikulum UPITRA dengan kebutuhan pasar kerja profesional:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capaianInstitusi.map((c, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight">
                    {c.angka}
                  </div>
                  <h3 className="text-sm font-bold text-[#0b2545]">
                    {c.label}
                  </h3>
                  <div className="text-[11px] font-semibold text-sky-700">
                    {c.instansi}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRESTASI MAHASISWA & INOVASI */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Hall of Fame</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Prestasi Mahasiswa Tingkat Nasional
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kompetensi mahasiswa UPITRA yang teruji dalam ajang kompetisi sains, teknologi, bisnis, dan kesehatan:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {prestasiMahasiswa.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5 text-blue-600" />
                    <span>{p.raihan}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug">
                    {p.kegiatan}
                  </h3>

                  <div className="text-xs font-semibold text-slate-700">
                    {p.tim}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Penyelenggara: {p.penyelenggara}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                    {p.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Callout Kolaborasi Karir Triputra */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Siap Mengukir Prestasi Anda Bersama UPITRA?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Dapatkan bimbingan dosen bereputasi, akses laboratorium mutakhir, dan jalur karir langsung ke lebih dari 50 perusahaan di bawah Triputra Group.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md"
            >
              <span>Daftar Seleksi PMB 2026/2027</span>
              <Sparkles className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

