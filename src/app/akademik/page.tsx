import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Building2, 
  Cpu, 
  Briefcase, 
  Globe, 
  Stethoscope, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Program Akademik & 4 Fakultas - Universitas Pignatelli Triputra",
  description: "Portal akademik resmi UPITRA Surakarta: Fakultas Sains & Teknologi, Fakultas Ekonomi & Bisnis, Fakultas Sosial Humaniora, dan Fakultas Kesehatan.",
};

const fakultasCards = [
  {
    name: "Fakultas Sains & Teknologi",
    code: "FST",
    slug: "/fst",
    icon: Cpu,
    prodi: ["S1 Informatika (S.Kom.)", "S1 Sistem Informasi (S.Kom.)", "S1 Rekayasa Perangkat Lunak (S.Kom.)"],
    desc: "Mencetak insinyur software, data scientist, dan arsitek AI yang siap membangun transformasi digital industri terkemuka.",
  },
  {
    name: "Fakultas Ekonomi & Bisnis",
    code: "FEB",
    slug: "/feb",
    icon: Briefcase,
    prodi: ["S1 Manajemen (S.M.)", "S1 Akuntansi (S.Ak.)"],
    desc: "Mempersiapkan calon manajer operasional rantai pasok, akuntan bersertifikasi, dan pemimpin bisnis masa depan bersama Triputra Group.",
  },
  {
    name: "Fakultas Sosial Humaniora",
    code: "FSH",
    slug: "/fsh",
    icon: Globe,
    prodi: ["S1 Pariwisata (S.Par.)", "S1 Bahasa Inggris (S.S.)"],
    desc: "Mengembangkan kompetensi komunikasi bisnis internasional, tata kelola destinasi pariwisata, dan hospitality kelas dunia.",
  },
  {
    name: "Fakultas Kesehatan",
    code: "FKes",
    slug: "/fkes",
    icon: Stethoscope,
    prodi: ["S1 Keselamatan & Kesehatan Kerja (S.K3)", "S1 Fisioterapi (S.Ft)", "D3 Keperawatan (A.Md.Kep)"],
    desc: "Melahirkan ahli K3 industri bersertifikasi, fisioterapis muskuloskeletal & olahraga, serta perawat vokasional yang tangguh dan berjiwa kasih.",
  },
];

export default function AkademikPortalPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Portal Akademik UPITRA"
        title="Akademik & 4 Fakultas"
        description="Pendidikan tinggi transformatif yang menggabungkan kedalaman ilmu pengetahuan, integritas karakter, dan kesiapan karir nyata di industri nasional."
        breadcrumbs={[
          { label: "Akademik" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Penjaminan Mutu */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Standar Mutu Nasional</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Kurikulum Transformatif Berbasis Hasil (Outcome-Based Education)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Seluruh kurikulum pada 4 Fakultas UPITRA disusun bersama pakar industri dan asosiasi profesi, memastikan setiap lulusan memiliki kompetensi unggul, sertifikasi profesi, dan jalur karir langsung.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Akreditasi Institusi BAIK SEKALI BAN-PT</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
              <span>10 Program Studi Sarjana & Vokasi</span>
            </div>
          </div>
        </div>

        {/* 4 Fakultas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fakultasCards.map((fak, idx) => {
            const Icon = fak.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md bg-blue-100 text-blue-800">
                      {fak.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#0b2545] group-hover:text-blue-700 transition-colors">
                      {fak.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {fak.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Program Studi Terkait:</span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {fak.prodi.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={fak.slug}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                >
                  <span>Buka Halaman {fak.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
