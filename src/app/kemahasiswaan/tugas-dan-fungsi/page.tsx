import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Users, 
  Target, 
  HeartHandshake, 
  Trophy, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tugas dan Fungsi Bidang Kemahasiswaan - UPITRA Surakarta",
  description: "Tugas pokok dan fungsi Direktorat Kemahasiswaan Universitas Pignatelli Triputra dalam membina karakter, penalaran, minat bakat, dan kesejahteraan mahasiswa.",
};

const tupoksiList = [
  {
    no: "01",
    bidang: "Pembinaan Karakter & Spiritualitas Ignasian",
    tugas: "Menyelenggarakan program inkubasi nilai kepemimpinan Triputra DNA (Integritas, Etika, Belarasa, Keunggulan), pendampingan retret/rekoleksi karakter, dan penanaman budaya saling menghormati di kampus.",
  },
  {
    no: "02",
    bidang: "Penalaran, Keilmuan & Kreativitas Mahasiswa",
    tugas: "Mendorong keikutsertaan mahasiswa dalam Program Kreativitas Mahasiswa (PKM) Kemendiktisaintek, lomba inovasi teknologi, kompetisi debat bahasa Inggris, dan seleksi Mahasiswa Berprestasi (Mawapres).",
  },
  {
    no: "03",
    bidang: "Pembinaan Minat, Bakat, Seni & Olahraga",
    tugas: "Memfasilitasi pembinaan dan sarana aktivitas seluruh Unit Kegiatan Mahasiswa (UKM), menyelenggarakan kejuaraan rektor cup, serta memfasilitasi delegasi lomba di tingkat regional dan nasional.",
  },
  {
    no: "04",
    bidang: "Kesejahteraan Mahasiswa & Layanan Beasiswa",
    tugas: "Mengelola seleksi dan distribusi Beasiswa Penuh Triputra Peduli 100%, beasiswa prestasi akademik/non-akademik, serta menyediakan layanan konseling bimbingan psikologis gratis bagi mahasiswa.",
  },
  {
    no: "05",
    bidang: "Pengembangan Karir & Organisasi Kemahasiswaan (Ormawa)",
    tugas: "Mendampingi tata kelola BEM, DPM, dan Himpunan Mahasiswa Jurusan (HMPS) agar demokratis, transparan, berorientasi layanan, serta menyinergikan program persiapan karir bersama Triputra Career Center.",
  },
];

export default function TugasDanFungsiKemahasiswaanPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Direktorat Kemahasiswaan"
        title="Tugas dan Fungsi Bidang Kemahasiswaan"
        description="Membimbing, mengayomi, dan mengoptimalkan potensi intelektual, spiritual, dan kepemimpinan mahasiswa UPITRA agar tumbuh menjadi lulusan berkarakter unggul."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Tugas dan Fungsi" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Visi Pembinaan Kemahasiswaan */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Visi Direktorat Kemahasiswaan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Membentuk Mahasiswa yang Unggul dalam Akademik, Luhur dalam Karakter, dan Peduli pada Sesama
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bidang Kemahasiswaan UPITRA beroperasi di bawah koordinasi Wakil Rektor 1 Bidang Akademik & Kemahasiswaan. Kami berkomitmen menyediakan lingkungan belajar yang inklusif, kondusif, dan suportif agar setiap mahasiswa dapat mengeksplorasi potensi terbaiknya selama masa perkuliahan di kampus Solo.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Nilai Karakter Triputra DNA</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                <span>Layanan Konseling Psikologis Gratis</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Layanan Terpadu Mahasiswa</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Biro Kemahasiswaan bertempat di Gedung Rektorat Lantai 1, siap melayani aspirasi, perizinan ormawa, dan konsultasi beasiswa setiap hari kerja.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              Senin - Jumat: 08.00 - 16.00 WIB
            </div>
          </div>
        </section>

        {/* 5 BIDANG TUPOKSI */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ruang Lingkup Kerja</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              5 Bidang Tugas & Fungsi Pokok
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Fokus program kerja terpadu untuk mendampingi masa studi mahasiswa:
            </p>
          </div>

          <div className="space-y-4">
            {tupoksiList.map((item) => (
              <div 
                key={item.no}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-black text-base border border-blue-200 shrink-0">
                  {item.no}
                </div>

                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-bold text-[#0b2545]">
                    {item.bidang}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.tugas}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigasi Cepat Submenu Kemahasiswaan */}
        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0b2545]">Ingin Melihat Organisasi Mahasiswa & UKM di Kampus?</h4>
            <p className="text-xs text-slate-600">Jelajahi BEM, DPM, Himpunan Mahasiswa, dan ragam komunitas hobi yang aktif.</p>
          </div>
          <Link
            href="/kemahasiswaan/organisasi-mahasiswa"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs shrink-0"
          >
            <span>Organisasi Mahasiswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
