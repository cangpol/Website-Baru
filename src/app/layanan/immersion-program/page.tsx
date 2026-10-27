import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Award 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Triputra Immersion Program - Layanan Unggulan UPITRA",
  description: "Program unggulan Triputra Immersion: Pengalaman kerja langsung mahasiswa UPITRA di unit bisnis Triputra Group di seluruh Indonesia dengan mentoring eksekutif.",
};

const keunggulanImmersion = [
  {
    judul: "Pengalaman Kerja Nyata di Site Industri",
    desc: "Mahasiswa diterjunkan langsung ke lokasi operasional unit bisnis Triputra Group (perkebunan kelapa sawit di Kalimantan/Sumatera, pabrik otomotif di Karawang/Cikarang, atau pusat logistik di Jakarta/Surabaya).",
  },
  {
    judul: "Mentoring Eksklusif oleh Pimpinan Senior",
    desc: "Setiap peserta mendapatkan bimbingan berkala (*one-on-one coaching*) dari General Manager dan Senior Manager profesional Triputra Group.",
  },
  {
    judul: "Fasilitas & Tunjangan Penuh",
    desc: "Akomodasi tempat tinggal, tiket transportasi, perlindungan asuransi kerja, dan uang saku bulanan ditanggung penuh oleh perusahaan mitra selama periode program.",
  },
  {
    judul: "Jalur Cepat Menjadi Pegawai Tetap (Fast-Track Hiring)",
    desc: "Peserta dengan penilaian kinerja prima mendapatkan tawaran kontrak kerja tetap atau percepatan program Management Trainee (MT) sebelum kelulusan.",
  },
];

const alurPendaftaran = [
  { tahap: "1. Pengajuan Berkas", desc: "Mahasiswa aktif semester 5 atau 6 dengan IPK minimal 3.00 mengunggah CV, transkrip nilai, dan surat rekomendasi Kaprodi." },
  { tahap: "2. Seleksi & Wawancara HRD", desc: "Tes asesmen kepribadian, wawancara motivasi, dan verifikasi kesiapan fisik/mental bersama tim Talent Triputra Group." },
  { tahap: "3. Pembekalan Pra-Penempatan", desc: "Bootcamp etika kerja, pelatihan keselamatan kerja K3 site, dan pengenalan budaya perusahaan (Triputra DNA)." },
  { tahap: "4. Pelaksanaan Immersion (3-6 Bulan)", desc: "Praktik kerja nyata menangani proyek terukur, rotasi departemen, dan pelaporan evaluasi kemajuan mingguan." },
  { tahap: "5. Sidang Evaluasi & Konversi SKS", desc: "Presentasi hasil proyek inovasi di hadapan dewan penguji dosen dan mentor industri dengan konversi hingga 20 SKS." },
];

export default function ImmersionProgramPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Program Unggulan Eksklusif"
        title="Triputra Immersion Program"
        description="Program pengalaman industri komprehensif yang menempatkan mahasiswa UPITRA langsung di garis depan operasional korporasi Triputra Group se-Indonesia."
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Immersion Program" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Immersion */}
        <section className="bg-gradient-to-r from-[#06172e] via-[#092244] to-[#0b2b54] rounded-3xl p-8 sm:p-14 text-white border border-blue-900 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Program Khas UPITRA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Belajar Langsung dari Jantung Industri Terkemuka Indonesia
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Triputra Immersion Program</strong> adalah program kebanggaan UPITRA yang dirancang untuk menjembatani jurang antara teori akademik di kampus dan kompleksitas pemecahan masalah operasional industri. Mahasiswa dilatih menjadi pribadi yang tangguh, adaptif, dan siap memimpin di masa depan.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 text-sky-300 text-xs font-semibold border border-blue-800">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Unit Bisnis Triputra Group</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 text-sky-300 text-xs font-semibold border border-blue-800">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Konversi Penuh 20 SKS Kuliah</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 text-center space-y-3">
            <div className="text-3xl font-black text-white">6 Bulan</div>
            <div className="text-xs font-bold uppercase text-sky-300 tracking-wider">Durasi Intensif</div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Penempatan di berbagai penjuru Nusantara dengan fasilitas akomodasi dan bimbingan mentor eksekutif.
            </p>
          </div>
        </section>

        {/* 4 Keunggulan Immersion */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Mengapa Memilih Immersion</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Keunggulan Triputra Immersion Program
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Nilai tambah eksklusif yang hanya dapat dirasakan oleh mahasiswa UPITRA:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keunggulanImmersion.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b2545]">
                  {item.judul}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Alur Seleksi & Penempatan */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Tahapan Pendaftaran</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Alur Seleksi & Pelaksanaan Program
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Prosedur yang dilalui oleh calon peserta Immersion:
            </p>
          </div>

          <div className="space-y-4">
            {alurPendaftaran.map((a, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-blue-50/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0b2545]">{a.tahap}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
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

