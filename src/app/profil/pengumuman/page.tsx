import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Bell, 
  Calendar, 
  FileText, 
  Download, 
  ChevronRight, 
  AlertCircle, 
  Clock, 
  Pin 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pengumuman Resmi - Profil UPITRA Surakarta",
  description: "Papan pengumuman resmi akademik, jadwal registrasi semester, informasi beasiswa, dan edaran universitas bagi mahasiswa UPITRA.",
};

const pengumumanList = [
  {
    id: "pengumuman-01",
    isPinned: true,
    kategori: "Akademik",
    nomorSurat: "042/UPITRA/AKD/X/2026",
    judul: "Panduan Registrasi Ulang & Pengisian Kartu Rencana Studi (KRS) Semester Genap TA 2026/2027",
    tanggal: "24 Oktober 2026",
    tenggatWaktu: "15 November 2026",
    deskripsi: "Seluruh mahasiswa aktif diwajibkan melakukan konsultasi dengan Dosen Pembimbing Akademik (DPA) dan menyelesaikan pengisian KRS melalui portal Sistem Informasi Akademik (SIAKAD) sebelum batas waktu yang ditentukan.",
    fileSize: "1.2 MB (PDF)",
  },
  {
    id: "pengumuman-02",
    isPinned: true,
    kategori: "Beasiswa",
    nomorSurat: "038/UPITRA/WR1/X/2026",
    judul: "Pembukaan Seleksi Berkas Beasiswa Penuh Triputra Peduli 100% Tahap II",
    tanggal: "20 Oktober 2026",
    tenggatWaktu: "10 November 2026",
    deskripsi: "Peluang beasiswa bebas biaya SPP dan uang gedung 100% bagi mahasiswa berprestasi dan mahasiswa berlatar belakang ekonomi rentan. Pengumpulan dokumen dilakukan secara daring di portal beasiswa.",
    fileSize: "850 KB (PDF)",
  },
  {
    id: "pengumuman-03",
    isPinned: false,
    kategori: "Kemahasiswaan",
    nomorSurat: "035/UPITRA/KMH/X/2026",
    judul: "Sosialisasi & Pendaftaran Program Triputra Immersion & Internship Batch 5",
    tanggal: "18 Oktober 2026",
    tenggatWaktu: "05 November 2026",
    deskripsi: "Program penempatan magang kerja terstruktur selama 6 bulan di unit bisnis Triputra Group (ASSA Logistik, Triputra Agro, Dharma Polimetal) bagi mahasiswa semester 5 ke atas.",
    fileSize: "2.1 MB (PDF)",
  },
  {
    id: "pengumuman-04",
    isPinned: false,
    kategori: "Akademik",
    nomorSurat: "031/UPITRA/AKD/IX/2026",
    judul: "Jadwal Pelaksanaan Ujian Tengah Semester (UTS) Gasal TA 2026/2027",
    tanggal: "12 Oktober 2026",
    tenggatWaktu: "30 Oktober 2026",
    deskripsi: "Pelaksanaan UTS tatap muka dan berbasis CBT di laboratorium kampus Solo. Mahasiswa diwajibkan membawa Kartu Tanda Mahasiswa (KTM) dan berpakaian rapi sesuai etika akademik.",
    fileSize: "640 KB (PDF)",
  },
  {
    id: "pengumuman-05",
    isPinned: false,
    kategori: "Layanan Kampus",
    nomorSurat: "027/UPITRA/PERPUS/IX/2026",
    judul: "Akses E-Resources Jurnal Internasional ScienceDirect & IEEE Xplore Melalui Perpustakaan",
    tanggal: "05 Oktober 2026",
    tenggatWaktu: "Aktif Hingga Akhir Tahun",
    deskripsi: "Perpustakaan UPITRA telah membuka langganan repositori jurnal internasional bereputasi bagi seluruh dosen dan mahasiswa aktif. Login menggunakan akun email @upitra.ac.id.",
    fileSize: "420 KB (PDF)",
  },
];

export default function PengumumanPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Papan Informasi Resmi"
        title="Pengumuman"
        description="Surat edaran, jadwal kegiatan akademik penting, pengumuman beasiswa, dan pemberitahuan resmi rektorat bagi sivitas akademika UPITRA."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Pengumuman" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545]">
              Daftar Edaran & Pengumuman Aktif
            </h2>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {pengumumanList.length} Pengumuman
            </span>
          </div>

          <div className="space-y-4">
            {pengumumanList.map((item) => (
              <div 
                key={item.id}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all ${
                  item.isPinned 
                    ? "border-blue-400/80 shadow-md ring-1 ring-blue-500/20" 
                    : "border-slate-200 shadow-xs hover:border-blue-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-4xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-md">
                          <Pin className="w-3 h-3" />
                          Pinned
                        </span>
                      )}
                      <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {item.kategori}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.nomorSurat}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug">
                      {item.judul}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Diterbitkan: {item.tanggal}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-amber-700">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Batas Waktu: {item.tenggatWaktu}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-xs font-bold transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh {item.fileSize}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bantuan Layanan Mahasiswa */}
        <div className="p-6 rounded-2xl bg-[#06172e] text-white border border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Membutuhkan Bantuan Terkait Administrasi Akademik?</h4>
            <p className="text-xs text-slate-300">Hubungi Biro Administrasi Akademik & Kemahasiswaan (BAAK) UPITRA Surakarta.</p>
          </div>
          <a
            href="https://wa.me/628112907500"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-colors shrink-0 shadow-xs"
          >
            Hubungi Helpdesk BAAK
          </a>
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

