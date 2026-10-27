import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Cpu, 
  Code, 
  Database, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Laptop, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fakultas Sains & Teknologi (FST) - Universitas Pignatelli Triputra",
  description: "Fakultas Sains dan Teknologi UPITRA Surakarta: S1 Informatika, S1 Sistem Informasi, dan S1 Rekayasa Perangkat Lunak. Mencetak talenta komputasi dan AI berdaya saing global.",
};

const prodiListFST = [
  {
    name: "S1 Informatika",
    slug: "informatika",
    degree: "Sarjana Komputer (S.Kom.)",
    akreditasi: "BAIK SEKALI",
    desc: "Fokus pada kecerdasan buatan (Artificial Intelligence), data science, machine learning, cyber security, dan komputasi awan berstandar industri modern.",
    prospek: ["AI Engineer", "Data Scientist", "Cybersecurity Specialist", "Fullstack Developer"],
  },
  {
    name: "S1 Sistem Informasi",
    slug: "sistem-informasi",
    degree: "Sarjana Komputer (S.Kom.)",
    akreditasi: "BAIK SEKALI",
    desc: "Mengintegrasikan teknologi informasi dengan strategi bisnis korporasi, implementasi ERP (SAP), UI/UX product design, dan tata kelola TI enterprise.",
    prospek: ["IT Business Analyst", "ERP Consultant", "Product Manager", "Database Administrator"],
  },
  {
    name: "S1 Rekayasa Perangkat Lunak",
    slug: "rekayasa-perangkat-lunak",
    degree: "Sarjana Komputer (S.Kom.)",
    akreditasi: "BAIK",
    desc: "Mendalami metodologi rekayasa software berskala enterprise, arsitektur microservices, mobile app development (Flutter/React Native), dan DevOps automation.",
    prospek: ["Software Architect", "DevOps Engineer", "Mobile App Specialist", "Quality Assurance Lead"],
  },
];

const labFST = [
  {
    name: "Laboratorium Artificial Intelligence & Big Data",
    desc: "Dilengkapi workstation komputasi GPU tinggi untuk riset deep learning, computer vision, dan natural language processing.",
  },
  {
    name: "Laboratorium Rekayasa Perangkat Lunak & Cloud",
    desc: "Infrastruktur server lokal dan cloud sandboxing untuk simulasi deployment skala enterprise, CI/CD, dan fullstack development.",
  },
  {
    name: "Laboratorium Jaringan & Keamanan Siber",
    desc: "Fasilitas pelatihan penetration testing, konfigurasi router/switch enterprise, firewall, dan keamanan infrastruktur data.",
  },
];

export default function FakultasSainsTeknologiPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Fakultas UPITRA"
        title="Fakultas Sains & Teknologi (FST)"
        description="Pusat keunggulan pendidikan sains terapan dan rekayasa teknologi digital modern yang berorientasi pada riset kecerdasan buatan dan kesiapan industri 4.0."
        breadcrumbs={[
          { label: "Akademik", href: "/akademik" },
          { label: "Fakultas Sains & Teknologi" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Ringkasan Profil Fakultas */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Keunggulan FST UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Melahirkan Insinyur Perangkat Lunak, Pakar AI & Analis Sistem Siap Pakai di Triputra Group
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fakultas Sains dan Teknologi (FST) UPITRA dirancang dengan kurikulum berbasis proyek nyata (*Project-Based Learning*) yang diselaraskan langsung dengan kebutuhan ekosistem digital Triputra Group (seperti ASSA Logistik, Puninar, Triputra Agro, dll.) dan industri teknologi global.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Akreditasi Baik Sekali BAN-PT</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Smart Computer Labs</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Dosen Praktisi Industri & Akademisi S2/S3</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Kode Fakultas: FST</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mengintegrasikan fondasi ilmu komputasi matematika murni dengan rekayasa aplikasi praktis untuk memecahkan masalah industri riil.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              3 Program Studi Sarjana (S1)
            </div>
          </div>
        </section>

        {/* Daftar 3 Program Studi FST */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pilihan Jurusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Studi di Bawah Naungan FST
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Pilih program studi yang sesuai dengan minat dan target karir masa depan Anda:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {prodiListFST.map((prodi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                      Jenjang S1
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {prodi.akreditasi}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#0b2545] group-hover:text-blue-700 transition-colors">
                      {prodi.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {prodi.degree}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prodi.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prospek Karir Utama:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {prodi.prospek.map((p, pIdx) => (
                        <span key={pIdx} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${prodi.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                >
                  <span>Detail Kurikulum & Pendaftaran</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Fasilitas Lab Komputer FST */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Infrastruktur Riset & Praktikum</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fasilitas Laboratorium FST
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Dukungan fasilitas teknologi mutakhir guna mendukung kegiatan hands-on lab mahasiswa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labFST.map((lab, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <h4 className="text-sm font-bold text-[#0b2545]">
                  {lab.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lab.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Admission FST */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Tertarik Berkarir di Bidang Teknologi Informasi & AI?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftarkan diri Anda di Fakultas Sains & Teknologi UPITRA. Dapatkan Beasiswa Prestasi dan jalur magang eksklusif di ekosistem Triputra.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/ebrochure"
              className="px-5 py-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs font-bold text-white hover:bg-blue-900 transition-all"
            >
              Unduh Brosur FST
            </Link>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Daftar FST Online</span>
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
