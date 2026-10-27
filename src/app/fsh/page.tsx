import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Globe, 
  Compass, 
  Languages, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Hotel, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fakultas Sosial & Humaniora (FSH) - Universitas Pignatelli Triputra",
  description: "Fakultas Sosial Humaniora UPITRA Surakarta: S1 Pariwisata dan S1 Bahasa Inggris. Mengembangkan keahlian perhotelan global, komunikasi bisnis internasional, dan diplomasi budaya.",
};

const prodiListFSH = [
  {
    name: "S1 Pariwisata",
    slug: "pariwisata",
    degree: "Sarjana Pariwisata (S.Par.)",
    akreditasi: "BAIK",
    desc: "Mempelajari manajemen destinasi pariwisata berkelanjutan, industri perhotelan (*hospitality management*), MICE (Meeting, Incentive, Convention, Exhibition), dan ecotourism.",
    prospek: ["Hotel & Resort Manager", "Tourism Destination Planner", "MICE Event Director", "Travel & Tour Consultant"],
  },
  {
    name: "S1 Bahasa Inggris",
    slug: "bahasa-inggris",
    degree: "Sarjana Sastra (S.S.)",
    akreditasi: "BAIK SEKALI",
    desc: "Menitikberatkan pada komunikasi bisnis global (*English for Professional Communication*), penerjemahan profesional (*Translation & Interpreting*), dan penulisan konten media digital internasional.",
    prospek: ["Corporate Communications Specialist", "Professional Translator / Interpreter", "Content Strategist", "Diplomatic & Public Relations Officer"],
  },
];

const labFSH = [
  {
    name: "Tourism & Hospitality Lab (Mini Hotel & Mockup Suite)",
    desc: "Fasilitas praktikum tata hidang (F&B Service), front office hotel bintang lima, housekeeping, dan tata kelola operasional hospitality.",
  },
  {
    name: "Multimedia Language & Simultaneous Interpreting Lab",
    desc: "Laboratorium bahasa berbasis software canggih untuk pelatihan penerjemahan lisan simultan, tes TOEFL/IELTS, dan public speaking.",
  },
  {
    name: "International Cultural & Creative Content Studio",
    desc: "Studio kreatif pembuatan konten media pariwisata digital, podcast komunikasi internasional, dan simulasi negosiasi bisnis multibudaya.",
  },
];

export default function FakultasSosialHumanioraPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Fakultas UPITRA"
        title="Fakultas Sosial & Humaniora (FSH)"
        description="Mengembangkan talenta hospitality global, pakar komunikasi bisnis internasional, dan pemimpin industri pariwisata berwawasan budaya luhur."
        breadcrumbs={[
          { label: "Akademik", href: "/akademik" },
          { label: "Fakultas Sosial Humaniora" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Ringkasan Profil Fakultas */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Keunggulan FSH UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Pusat Pengembangan Keahlian Komunikasi Lintas Budaya & Manajemen Keramahtamahan Kelas Dunia
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fakultas Sosial dan Humaniora (FSH) UPITRA memadukan keunggulan bahasa internasional, literasi kebudayaan, dan penguasaan operasional industri perhotelan serta pariwisata modern. Lulusan FSH disiapkan menjadi komunikator ulung dan praktisi perhotelan yang berdaya saing di jaringan hotel dan perusahaan multinasional.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Akreditasi Baik Sekali BAN-PT</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Hotel className="w-4 h-4 text-blue-600" />
                <span>Mockup Lab Perhotelan Bintang 5</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Languages className="w-4 h-4 text-blue-600" />
                <span>Lab Bahasa & Translation Digital</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Kode Fakultas: FSH</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mengasah kecerdasan emosional, kompetensi multibahasa, dan keramahan profesional berakar pada nilai-nilai Ignasian.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              2 Program Studi Sarjana (S1)
            </div>
          </div>
        </section>

        {/* Daftar Program Studi FSH */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pilihan Jurusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Studi di Bawah Naungan FSH
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Jurusan bahasa dan pariwisata yang terhubung dengan industri kreatif dan pariwisata internasional:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prodiListFSH.map((prodi, idx) => (
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

        {/* Fasilitas Lab FSH */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Sarana Praktikum Modern</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fasilitas Laboratorium FSH
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Infrastruktur praktikum berstandar industri hospitality dan teknologi penerjemahan bahasa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labFSH.map((lab, idx) => (
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

        {/* CTA Admission FSH */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Siap Menembus Karir Global di Bidang Pariwisata & Komunikasi Internasional?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftarkan diri Anda di Fakultas Sosial & Humaniora UPITRA. Raih Beasiswa Penuh 100% dan pengalaman magang di jaringan industri perhotelan nasional.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/ebrochure"
              className="px-5 py-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs font-bold text-white hover:bg-blue-900 transition-all"
            >
              Unduh Brosur FSH
            </Link>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Daftar FSH Online</span>
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
