import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Building2, 
  Target, 
  Users, 
  BookOpen, 
  Bell, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Institusi - Universitas Pignatelli Triputra (UPITRA)",
  description: "Direktori lengkap profil resmi Universitas Pignatelli Triputra Surakarta: Sejarah, Visi Misi, Pimpinan Rektorat, Berita, Pengumuman, dan Prestasi.",
};

const profilMenuCards = [
  {
    title: "Tentang UPITRA",
    href: "/profil/tentang-upitra",
    icon: Building2,
    desc: "Sejarah berdirinya UPITRA hasil kolaborasi Yayasan Santo Ignatius Pignatelli & Triputra Group, akreditasi Baik Sekali BAN-PT, dan filosofi logo.",
    tag: "Identitas Kampus",
  },
  {
    title: "Visi, Misi & Tujuan",
    href: "/profil/visi-misi-tujuan",
    icon: Target,
    desc: "Visi transformatif, 6 misi strategis institusi, 7 tujuan pengembangan keilmuan, dan 4 pilar karakter Triputra DNA.",
    tag: "Arah Strategis",
  },
  {
    title: "Pimpinan Universitas",
    href: "/profil/pimpinan-universitas",
    icon: Users,
    desc: "Profil Rektorat (Rektor Neil Semuel Rupidara, Ph.D, para Wakil Rektor), Senat Akademik, dan Dekanat 4 Fakultas Unggulan.",
    tag: "Struktur Organisasi",
  },
  {
    title: "Berita Kampus",
    href: "/profil/berita-kampus",
    icon: BookOpen,
    desc: "Warta terkini kegiatan akademik, publikasi riset dosen, inovasi mahasiswa, seminar nasional, dan kerjasama industri.",
    tag: "Kabar Terkini",
  },
  {
    title: "Pengumuman",
    href: "/profil/pengumuman",
    icon: Bell,
    desc: "Papan pengumuman resmi akademik: jadwal KRS, panduan beasiswa, kalender perkuliahan, dan surat edaran universitas.",
    tag: "Informasi Resmi",
  },
  {
    title: "Prestasi & Capaian",
    href: "/profil/prestasi-dan-capaian",
    icon: Trophy,
    desc: "Rekam jejak torehan juara kompetisi nasional mahasiswa, hibah riset dosen, dan capaian serapan kerja 92% di industri.",
    tag: "Keunggulan Mutu",
  },
];

export default function ProfilIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Portal Profil Institusi"
        title="Profil UPITRA"
        description="Mengenal lebih dekat Universitas Pignatelli Triputra Surakarta: sejarah kelembagaan, visi transformatif, kepemimpinan, dan warta civitas akademika."
        breadcrumbs={[
          { label: "Profil" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Ringkasan Profil Singkat */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Universitas Pignatelli Triputra</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Pendidikan Transformatif Berkarakter Unggul & Siap Kerja
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              UPITRA Surakarta hadir sebagai perwujudan sinergi antara nilai-nilai kemanusiaan luhur Ignasian dan profesionalisme industri ekosistem Triputra Group. Pilih submenu di bawah untuk mengeksplorasi profil institusi kami:
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Akreditasi Institusi BAIK SEKALI BAN-PT</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Kampus Terintegrasi Ekosistem Triputra</span>
            </div>
          </div>
        </div>

        {/* 6 Sub-Menu Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {profilMenuCards.map((item, idx) => {
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
                  <span>Lihat Selengkapnya</span>
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

