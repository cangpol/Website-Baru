import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  TrendingUp, 
  Briefcase, 
  LineChart, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Award, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fakultas Ekonomi & Bisnis (FEB) - Universitas Pignatelli Triputra",
  description: "Fakultas Ekonomi dan Bisnis UPITRA Surakarta: S1 Manajemen dan S1 Akuntansi. Membentuk pemimpin bisnis, manajer korporat, dan akuntan profesional terintegrasi Triputra Group.",
};

const prodiListFEB = [
  {
    name: "S1 Manajemen",
    slug: "manajemen",
    degree: "Sarjana Manajemen (S.M.)",
    akreditasi: "BAIK SEKALI",
    desc: "Mempelajari manajemen operasional rantai pasok (Supply Chain Management), manajemen sumber daya manusia korporasi, strategi pemasaran digital, dan kepemimpinan bisnis adaptif.",
    prospek: ["Corporate Management Trainee", "Supply Chain Analyst", "Human Capital Specialist", "Business Development Manager"],
  },
  {
    name: "S1 Akuntansi",
    slug: "akuntansi",
    degree: "Sarjana Akuntansi (S.Ak.)",
    akreditasi: "BAIK SEKALI",
    desc: "Fokus pada akuntansi forensik, audit internal korporasi, perpajakan digital, dan analisis sistem informasi akuntansi berbasis ERP (SAP) berstandar IFRS/PSAK.",
    prospek: ["Financial Auditor", "Corporate Tax Consultant", "Management Accountant", "Financial Analyst"],
  },
];

const labFEB = [
  {
    name: "Laboratorium Pasar Modal & Galeri Investasi BEI",
    desc: "Simulasi perdagangan efek real-time, analisis fundamental dan teknikal saham, serta edukasi pasar modal terintegrasi.",
  },
  {
    name: "Tax Center UPITRA & Lab Perpajakan",
    desc: "Pusat pelatihan perpajakan Brevet A & B, aplikasi e-SPT, konsultasi pajak, dan riset kepatuhan wajib pajak.",
  },
  {
    name: "Business Incubator & Entrepreneurship Hub",
    desc: "Wadah inkubasi bisnis rintisan mahasiswa dengan bimbingan mentor eksekutif bisnis dari Triputra Group.",
  },
];

export default function FakultasEkonomiBisnisPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Fakultas UPITRA"
        title="Fakultas Ekonomi & Bisnis (FEB)"
        description="Membentuk pemimpin bisnis berintegritas, manajer korporasi handal, dan akuntan profesional yang siap bersaing dalam era ekonomi digital global."
        breadcrumbs={[
          { label: "Akademik", href: "/akademik" },
          { label: "Fakultas Ekonomi & Bisnis" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Ringkasan Profil Fakultas */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Keunggulan FEB UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Pendidikan Bisnis Terintegrasi dengan Ekosistem Korporasi Skala Nasional
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fakultas Ekonomi dan Bisnis (FEB) UPITRA memadukan teori ekonomi mutakhir dengan studi kasus riil dari unit-unit usaha <strong>Triputra Group</strong>. Mahasiswa dibekali kompetensi manajerial, kecakapan analitis keuangan berbasis teknologi, serta fondasi etika bisnis yang kokoh.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Akreditasi Baik Sekali BAN-PT / LAMEMBA</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Galeri Investasi & Tax Center</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Peluang Jalur MT di Triputra Group</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Kode Fakultas: FEB</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mengembangkan kepemimpinan strategis, literasi pasar modal, dan ketajaman tata kelola keuangan modern.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              2 Program Studi Sarjana (S1)
            </div>
          </div>
        </section>

        {/* Daftar Program Studi FEB */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pilihan Jurusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Studi di Bawah Naungan FEB
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Jurusan bisnis dan akuntansi dengan prospek karir tinggi dan rekam jejak serapan industri prima:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prodiListFEB.map((prodi, idx) => (
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

        {/* Fasilitas Lab FEB */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Laboratorium & Pusat Riset</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fasilitas Pembelajaran FEB
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Sarana laboratorium modern untuk mengasah keterampilan praktis bisnis dan perpajakan mahasiswa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labFEB.map((lab, idx) => (
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

        {/* CTA Admission FEB */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Siap Memulai Karir Eksekutif di Dunia Bisnis & Keuangan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftarkan diri Anda di Fakultas Ekonomi & Bisnis UPITRA. Raih Beasiswa Penuh Triputra Peduli 100% dan penempatan karir strategis.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/ebrochure"
              className="px-5 py-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs font-bold text-white hover:bg-blue-900 transition-all"
            >
              Unduh Brosur FEB
            </Link>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Daftar FEB Online</span>
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
