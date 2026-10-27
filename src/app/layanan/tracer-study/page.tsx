import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  LineChart, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  FileCheck 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tracer Study Alumni - Layanan UPITRA",
  description: "Portal survei penelusuran lulusan (Tracer Study) Universitas Pignatelli Triputra Surakarta: Evaluasi daya serap kerja, kepuasan pengguna lulusan, dan kuesioner alumni.",
};

const metrikTracer = [
  { angka: "92%", judul: "Tingkat Serapan Kerja", desc: "Alumni telah bekerja dalam rentang waktu kurang dari 3 bulan setelah kelulusan." },
  { angka: "87%", judul: "Kesesuaian Bidang Ilmu", desc: "Posisi pekerjaan alumni selaras langsung dengan program studi yang ditempuh." },
  { angka: "96%", judul: "Kepuasan Industri", desc: "Perusahaan pengguna menilai etika kerja, integritas, dan ketrampilan alumni 'Sangat Baik'." },
  { angka: "1.8x UMR", judul: "Rata-rata Penghasilan Awal", desc: "Gaji awal lulusan berada di atas rata-rata Upah Minimum Regional industri." },
];

const testimoniAlumni = [
  {
    nama: "Stefanus Aditya, S.Kom.",
    lulusan: "Alumni S1 Sistem Informasi",
    posisi: "ERP & Business Process Analyst di PT ASSA Tbk (Jakarta)",
    testimoni: "Kurikulum UPITRA yang berbasis kasus nyata dan pembinaan karakter Triputra DNA membuat saya sangat percaya diri saat memasuki dunia kerja. Sebelum wisuda pun saya sudah diterima bekerja.",
  },
  {
    nama: "Theresia Natalia, S.M.",
    lulusan: "Alumni S1 Manajemen",
    posisi: "Management Trainee Supply Chain di PT Triputra Agro Persada Tbk",
    testimoni: "Bimbingan dosen dan program magang bersertifikat di UPITRA memberi saya bekal manajemen operasional riil yang dicari korporasi besar. Kesempatan karirnya sangat luas.",
  },
];

export default function TracerStudyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Penelusuran Alumni & Evaluasi Mutu"
        title="Tracer Study UPITRA"
        description="Pelacakan jejak karir dan evaluasi relevansi kurikulum perguruan tinggi bersama alumni dan perusahaan pengguna lulusan di seluruh Indonesia."
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Tracer Study" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Kuesioner Alumni */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Bagi Alumni UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Isi Kuesioner Tracer Study Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Partisipasi Anda sangat berharga untuk peningkatan mutu akreditasi program studi dan pengembangan kurikulum UPITRA ke depan. Pengisian hanya membutuhkan waktu 5-7 menit.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="https://upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md"
            >
              <span>Isi Kuesioner Tracer Study</span>
              <ExternalLink className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </section>

        {/* 4 Metrik Capaian Tracer Study */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Hasil Penelusuran Resmi</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Statistik Serapan & Mutu Lulusan
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Data resmi pelaporan Tracer Study UPITRA ke pangkalan data Dikti:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrikTracer.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-3xl font-black text-blue-700">
                    {item.angka}
                  </div>
                  <h3 className="text-sm font-bold text-[#0b2545]">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimoni Alumni */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Suara Alumni</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Kisah Sukses Alumni UPITRA di Dunia Kerja
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Pengalaman nyata lulusan dalam meniti karir profesional bersama mitra industri:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimoniAlumni.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{t.testimoni}&rdquo;
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-0.5">
                  <div className="text-sm font-bold text-[#0b2545]">{t.nama}</div>
                  <div className="text-xs font-semibold text-blue-700">{t.posisi}</div>
                  <div className="text-[11px] text-slate-400">{t.lulusan}</div>
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

