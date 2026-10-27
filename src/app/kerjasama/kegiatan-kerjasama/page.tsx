import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  Handshake, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kegiatan Kerjasama - Kerjasama UPITRA",
  description: "Dokumentasi implementasi program kerjasama nyata UPITRA Surakarta: Campus recruitment, dosen praktisi industri, magang bersertifikat, dan beasiswa ikatan dinas.",
};

const kegiatanList = [
  {
    judul: "Campus Recruitment & Direct Hiring Triputra Group",
    kategori: "Perekrutan Kerja",
    mitra: "PT Adi Sarana Armada Tbk & Triputra Talent Acquisition",
    desc: "Pelaksanaan seleksi wawancara dan tes psikotes langsung di kampus UPITRA Solo. Terbukti mengantarkan 26 lulusan langsung menandatangani kontrak kerja sebelum upacara wisuda.",
    hasil: ["26 Wisudawan Langsung Bekerja", "Kontrak Karir Jangka Panjang", "Penempatan di Jakarta & Solo"],
  },
  {
    judul: "Program Dosen Praktisi Industri (Executive Visiting Lecturer)",
    kategori: "Pembelajaran Industri",
    mitra: "Direksi & Manajer Senior Triputra Group",
    desc: "Kuliah umum reguler menghadirkan pimpinan industri untuk membedah studi kasus supply chain, kecerdasan buatan, akuntansi korporasi, dan audit K3 modern.",
    hasil: ["Transfer Ilmu Praktis Terkini", "Networking Profesional Mahasiswa", "Studi Kasus Bisnis Nyata"],
  },
  {
    judul: "Program Magang Industri Bersertifikat 6 Bulan (Certified Internship)",
    kategori: "Magang Terstruktur",
    mitra: "PT Dharma Polimetal, PT TAP & ASSA Group",
    desc: "Mahasiswa tingkat akhir terjun langsung selama satu semester penuh menangani proyek operasional riil dengan bimbingan mentor industri dan konversi 20 SKS.",
    hasil: ["Uang Saku & Fasilitas Kerja", "Sertifikat Pengalaman Industri", "Jalur Cepat Menjadi Pegawai Tetap"],
  },
  {
    judul: "Skema Beasiswa Penuh & Ikatan Dinas Triputra Peduli",
    kategori: "Beasiswa & Karir",
    mitra: "Yayasan Santo Ignatius Pignatelli & Triputra Group",
    desc: "Pembiayaan 100% biaya kuliah bagi mahasiswa terpilih dengan komitmen ikatan dinas kerja di lini korporasi Triputra setelah menyelesaikan studi sarjana.",
    hasil: ["Bebas SPP & Uang Gedung 100%", "Jaminan Kerja Pasca Kelulusan", "Mentoring Khusus Karir"],
  },
  {
    judul: "Praktik Rotasi Klinik Rumah Sakit & Faskes Mitra",
    kategori: "Praktik Medis",
    mitra: "RS Kasih Ibu, RS Dr. Oen & RS Panti Waluyo",
    desc: "Rotasi klinis mahasiswa Fisioterapi, Keperawatan, dan K3 di instalasi gawat darurat, ruang rawat inap medikal bedah, dan departemen hiperkes keselamatan kerja.",
    hasil: ["Kompetensi Klinis Pasien Nyata", "Sertifikat Jam Terbang Klinik", "Akreditasi Uji Kompetensi Nasional"],
  },
];

export default function KegiatanKerjasamaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Implementasi & Dampak Nyata"
        title="Kegiatan Kerjasama"
        description="Realisasi aktif dari naskah kemitraan yang memberikan manfaat langsung bagi mahasiswa melalui program magang, beasiswa ikatan dinas, dan rekrutmen kerja."
        breadcrumbs={[
          { label: "Kerjasama", href: "/kerjasama" },
          { label: "Kegiatan Kerjasama" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Intro */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Kemitraan yang Berdaya Guna</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545]">
              Kerjasama Bukan Sekadar Dokumen, Tetapi Aksi Nyata
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Di UPITRA, setiap nota kesepahaman dirancang dengan target luaran yang terukur. Kami memastikan setiap mahasiswa mendapatkan kesempatan berinteraksi dengan profesional industri sebelum menyandang gelar sarjana.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Direct Recruitment
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Dosen Praktisi
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Magang 6 Bulan
            </span>
          </div>
        </section>

        {/* Daftar Kegiatan Kerjasama */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Aktivitas Kolaboratif</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Implementasi Kerjasama Unggulan
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Berbagai program bersama mitra industri yang sedang dan telah berjalan:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kegiatanList.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {item.kategori}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] leading-snug">
                    {item.judul}
                  </h3>

                  <div className="text-xs font-semibold text-blue-700">
                    Mitra: {item.mitra}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dampak & Manfaat Mahasiswa:</span>
                  <div className="space-y-1">
                    {item.hasil.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{h}</span>
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

