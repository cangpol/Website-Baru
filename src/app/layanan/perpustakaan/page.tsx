import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Laptop, 
  FileText, 
  Download 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Perpustakaan & E-Resources - Layanan UPITRA",
  description: "Layanan Perpustakaan Universitas Pignatelli Triputra Surakarta: Katalog OPAC, ribuan e-book, akses jurnal internasional bereputasi, dan ruang baca modern.",
};

const layananPerpus = [
  {
    judul: "Katalog Online Publik (OPAC UPITRA)",
    desc: "Sistem penelusuran digital untuk mencari ketersediaan koleksi buku teks cetak, monograf, dan skripsi/tugas akhir mahasiswa di rak perpustakaan.",
    fitur: ["Pencarian Berdasarkan Judul & Penulis", "Informasi Status Ketersediaan Buku", "Reservasi Peminjaman Online"],
  },
  {
    judul: "Akses E-Journal Internasional & Nasional",
    desc: "Langganan basis data jurnal ilmiah bereputasi tinggi (ScienceDirect, IEEE Xplore, ProQuest, EBSCO, Garuda) yang dapat diakses dari jaringan kampus.",
    fitur: ["Akses Full-Text PDF Gratis", "Login Single Sign-On Mahasiswa", "Koleksi Terindeks Scopus & SINTA"],
  },
  {
    judul: "Repositori Karya Ilmiah & Skripsi Digital",
    desc: "Arsip digital karya penelitian, laporan magang industri, tesis, dan naskah publikasi dosen serta wisudawan UPITRA.",
    fitur: ["Cek Kemiripan / Plagiasi (Turnitin)", "Pemberian Bebas Pustaka Yudisium", "Metadata Standar Nasional"],
  },
  {
    judul: "Ruang Baca Nyaman & Diskusi Terpadu",
    desc: "Fasilitas fisik modern di Gedung Utama lantai 2: silent study pod, ruang diskusi kelompok tertutup, dan workstation komputer berkecepatan tinggi.",
    fitur: ["Koneksi Wi-Fi Gigabit", "Ruangan Ber-AC Penuh", "Kapasitas 150 Tempat Duduk"],
  },
];

export default function PerpustakaanPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Layanan Sumber Belajar"
        title="Perpustakaan & E-Resources"
        description="Pusat literasi informasi akademik yang menyediakan ribuan koleksi buku fisik, e-journal internasional, dan ruang belajar modern yang kondusif."
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Perpustakaan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Layanan OPAC */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Perpustakaan Santo Ignatius Pignatelli</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Gerbang Menuju Ribuan Literatur Ilmiah & Pengetahuan Terbuka
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Perpustakaan UPITRA berkomitmen mendukung proses pembelajaran dan riset sivitas akademika dengan menyediakan sumber daya informasi yang kredibel, mutakhir, serta didukung teknologi otomasi perpustakaan terintegrasi.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Senin - Jumat: 08.00 - 17.00 WIB</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Sabtu: 08.00 - 13.00 WIB</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Layanan Bebas Pustaka</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Surat Keterangan Bebas Pustaka (SKBP) untuk syarat yudisium dan wisuda dapat diajukan secara daring setelah mengunggah naskah skripsi ke repositori.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              Proses Online 1x24 Jam Kerja
            </div>
          </div>
        </section>

        {/* 4 Pilar Layanan Perpustakaan */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Fasilitas & Koleksi</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fasilitas & Layanan Perpustakaan
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Layanan komprehensif bagi kebutuhan belajar mandiri dan kelompok:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {layananPerpus.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                    0{idx + 1}
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fitur Utama:</span>
                  <div className="space-y-1">
                    {item.fitur.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
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
