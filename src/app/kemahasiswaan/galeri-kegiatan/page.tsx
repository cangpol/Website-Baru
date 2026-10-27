import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Camera, 
  Calendar, 
  Users, 
  Sparkles, 
  Tag, 
  HeartHandshake 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Kegiatan Mahasiswa - Kemahasiswaan UPITRA",
  description: "Dokumentasi visual momen inspiratif, festival seni, inisiasi mahasiswa baru, dan bakti sosial mahasiswa Universitas Pignatelli Triputra Surakarta.",
};

const galeriKegiatan = [
  {
    judul: "Pengenalan Kehidupan Kampus Mahasiswa Baru (P2K2)",
    kategori: "Inisiasi Mahasiswa",
    tanggal: "September 2026",
    lokasi: "Auditorium & Lapangan Kampus UPITRA Solo",
    gambar: "/images/kegiatan/p2k2-upitra.jpg",
    fallbackBg: "from-blue-900 to-[#06172e]",
    deskripsi: "Penyambutan mahasiswa baru bernuansa edukatif tanpa perpeloncoan, berfokus pada pengenalan nilai Triputra DNA dan orientasi akademik modern.",
  },
  {
    judul: "Triputra Leadership Camp (TLC) Mahasiswa Berprestasi",
    kategori: "Kepemimpinan",
    tanggal: "Oktober 2026",
    lokasi: "Kawasan Lereng Gunung Lawu, Karanganyar",
    gambar: "/images/kegiatan/leadership-camp.jpg",
    fallbackBg: "from-[#0b2545] to-blue-900",
    deskripsi: "Pelatihan pembentukan mental kepemimpinan tangguh, simulasi pemecahan masalah tim industri, dan malam keakraban api unggun.",
  },
  {
    judul: "UPITRA Innovation & Technopreneurship Expo 2026",
    kategori: "Pameran & Inovasi",
    tanggal: "Agustus 2026",
    lokasi: "Hall Utama Gedung Santo Ignatius",
    gambar: "/images/kegiatan/expo-upitra.jpg",
    fallbackBg: "from-blue-950 to-blue-800",
    deskripsi: "Pameran prototipe aplikasi cerdas, karya inovasi produk pariwisata, klinik fisioterapi gratis, dan demo keselamatan kerja K3.",
  },
  {
    judul: "Bakti Sosial Belarasa Peduli Lingkungan & Masyarakat",
    kategori: "Sosial & Spiritualitas",
    tanggal: "Juli 2026",
    lokasi: "Kecamatan Laweyan, Surakarta",
    gambar: "/images/kegiatan/baksos-upitra.jpg",
    fallbackBg: "from-[#092244] to-blue-950",
    deskripsi: "Aksi kemanusiaan pembagian sembako, penyuluhan kesehatan ergonomis bagi perajin batik Solo, dan penanaman pohon penghijauan.",
  },
  {
    judul: "Rektor Cup Tournament & Pentas Seni Mahasiswa",
    kategori: "Olahraga & Seni",
    tanggal: "Juni 2026",
    lokasi: "Sport Hall & Gelanggang Terbuka UPITRA",
    gambar: "/images/kegiatan/rektor-cup.jpg",
    fallbackBg: "from-blue-900 to-[#0b2b54]",
    deskripsi: "Ajang unjuk ketangkasan olahraga futsal, bola basket, badminton antar fakultas, ditutup panggung pertunjukan musik akustik kampus.",
  },
  {
    judul: "Kuliah Umum & Executive Sharing Bersama Triputra Group",
    kategori: "Wawasan Industri",
    tanggal: "Mei 2026",
    lokasi: "Smart Auditorium UPITRA",
    gambar: "/images/kegiatan/kuliah-umum.jpg",
    fallbackBg: "from-[#06172e] to-blue-900",
    deskripsi: "Sesi kuliah perdana bersama jajaran direksi Triputra Group tentang prospek karir masa depan dan nilai integritas korporasi.",
  },
];

export default function GaleriKegiatanMahasiswaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Dokumentasi & Dinamika Kampus"
        title="Galeri Kegiatan Mahasiswa"
        description="Rekaman visual ragam aktivitas kemahasiswaan: kepemimpinan, kepedulian sosial, pameran inovasi ilmiah, seni, dan olahraga di kampus UPITRA Solo."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Galeri Kegiatan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545]">
              Momen & Dokumentasi Terpilih
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Setiap aktivitas dirancang untuk memperkaya pengalaman hidup dan persaudaraan mahasiswa.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shrink-0">
            {galeriKegiatan.length} Album Dokumentasi
          </span>
        </div>

        {/* Grid Galeri Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galeriKegiatan.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`relative h-56 bg-gradient-to-br ${item.fallbackBg} flex items-center justify-center overflow-hidden`}>
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-950/30 flex items-center justify-center pointer-events-none">
                    <Camera className="w-10 h-10 text-white/40" />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-blue-950/80 text-[10px] font-bold text-sky-300 uppercase tracking-wider border border-blue-800/60 backdrop-blur-xs">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.tanggal}</span>
                    <span>•</span>
                    <span className="truncate">{item.lokasi}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0b2545] leading-snug group-hover:text-blue-700 transition-colors">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>Dokumentasi Resmi Biro Kemahasiswaan</span>
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
