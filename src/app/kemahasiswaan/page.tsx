import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Users, 
  Target, 
  Sparkles, 
  Trophy, 
  Camera, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kemahasiswaan - Portal Mahasiswa UPITRA Surakarta",
  description: "Direktori lengkap kemahasiswaan Universitas Pignatelli Triputra: Tugas dan fungsi, program pengembangan kepemimpinan, ormawa, prestasi, galeri, dan kalender akademik.",
};

const kemahasiswaanMenuCards = [
  {
    title: "Tugas dan Fungsi",
    href: "/kemahasiswaan/tugas-dan-fungsi",
    icon: Target,
    desc: "Visi dan mandat Direktorat Kemahasiswaan dalam mendampingi pembinaan karakter, minat bakat, dan penalaran mahasiswa.",
    tag: "Tupoksi",
  },
  {
    title: "Program Pengembangan Mahasiswa",
    href: "/kemahasiswaan/program-pengembangan",
    icon: Sparkles,
    desc: "Inisiatif unggulan: Triputra Leadership Camp (TLC), LKMM, inkubasi proposal PKM PIMNAS, dan sertifikasi profesi BNSP.",
    tag: "Pelatihan",
  },
  {
    title: "Organisasi Mahasiswa (Ormawa)",
    href: "/kemahasiswaan/organisasi-mahasiswa",
    icon: Users,
    desc: "Direktori lembaga perwakilan mahasiswa: BEM, DPM, 10 Himpunan Mahasiswa Jurusan (HMPS), dan ragam Unit Kegiatan Mahasiswa.",
    tag: "Aktivitas Kampus",
  },
  {
    title: "Prestasi Mahasiswa",
    href: "/kemahasiswaan/prestasi-mahasiswa",
    icon: Trophy,
    desc: "Hall of fame torehan medali kejuaraan mahasiswa UPITRA di ajang kompetisi sains, teknologi, bisnis, dan olahraga nasional.",
    tag: "Kejuaraan",
  },
  {
    title: "Galeri Kegiatan Mahasiswa",
    href: "/kemahasiswaan/galeri-kegiatan",
    icon: Camera,
    desc: "Dokumentasi visual serunya kehidupan kampus: inisiasi mahasiswa baru (P2K2), festival seni, pameran inovasi, dan bakti sosial.",
    tag: "Dokumentasi",
  },
  {
    title: "Kalender Akademik",
    href: "/kemahasiswaan/kalender-akademik",
    icon: Calendar,
    desc: "Jadwal resmi semester gasal & genap TA 2026/2027: masa her-registrasi, pengisian KRS, periode UTS/UAS, dan wisuda.",
    tag: "Jadwal Kuliah",
  },
];

export default function KemahasiswaanIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Portal Kemahasiswaan UPITRA"
        title="Kemahasiswaan & Dinamika Kampus"
        description="Membina mahasiswa berkarakter luhur, berjiwa pemimpin berbelarasa, dan berprestasi tinggi di kancah nasional bersama ekosistem Triputra Group."
        breadcrumbs={[
          { label: "Kemahasiswaan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Nilai Kemahasiswaan */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Direktorat Kemahasiswaan</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Pengalaman Mahasiswa yang Menginspirasi & Bermakna
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jelajahi seluruh layanan, peluang pengembangan diri, organisasi kampus, dan kalender kegiatan mahasiswa UPITRA melalui sub-menu di bawah ini:
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Karakter Ignasian & Triputra DNA</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Pendampingan Talenta Holistik</span>
            </div>
          </div>
        </div>

        {/* 6 Sub-Menu Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {kemahasiswaanMenuCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  <span>Buka Halaman</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

