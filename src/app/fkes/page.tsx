import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  HeartHandshake, 
  Activity, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Stethoscope, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fakultas Kesehatan (FKes) - Universitas Pignatelli Triputra",
  description: "Fakultas Kesehatan UPITRA Surakarta: S1 K3 (Kesehatan & Keselamatan Kerja), S1 Fisioterapi, dan D3 Keperawatan. Menyiapkan tenaga kesehatan dan ahli HSE profesional industri.",
};

const prodiListFKes = [
  {
    name: "S1 Keselamatan & Kesehatan Kerja (K3)",
    slug: "kesehatan-dan-keselamatan-kerja",
    degree: "Sarjana Keselamatan & Kesehatan Kerja (S.K3)",
    akreditasi: "BAIK SEKALI",
    desc: "Mempelajari manajemen risiko bahaya industri (*Hazard Identification & Risk Assessment*), higiene industri, ergonomi kerja, pencegahan kecelakaan kerja, dan audit SMK3/ISO 45001 di sektor manufaktur dan perkebunan.",
    prospek: ["HSE Specialist / K3 Officer", "Safety Auditor", "Industrial Hygiene Consultant", "Ergonomist Industri"],
  },
  {
    name: "S1 Fisioterapi",
    slug: "fisioterapi",
    degree: "Sarjana Fisioterapi (S.Ft)",
    akreditasi: "BAIK SEKALI",
    desc: "Fokus pada pemulihan dan rehabilitasi gerak fungsi tubuh manusia, penanganan cedera olahraga (*sports physiotherapy*), fisioterapi muskuloskeletal, neuromuskular, dan pediatri.",
    prospek: ["Sports Physiotherapist", "Clinical Physiotherapist RS", "Rehabilitation Specialist", "Wellness & Ergonomic Consultant"],
  },
  {
    name: "D3 Keperawatan",
    slug: "keperawatan",
    degree: "Ahli Madya Keperawatan (A.Md.Kep)",
    akreditasi: "BAIK SEKALI",
    desc: "Pendidikan vokasional intensif asuhan keperawatan profesional, gawat darurat (Basic Trauma Cardiac Life Support), keperawatan medikal bedah, dan etika keperawatan berhati belarasa.",
    prospek: ["Perawat Rumah Sakit / Klinik", "Industrial Occupational Health Nurse", "Emergency Response Nurse", "Perawat Home Care Mandiri"],
  },
];

const labFKes = [
  {
    name: "Laboratorium K3 & Higiene Industri",
    desc: "Dilengkapi instrumen pengukuran kebisingan (Sound Level Meter), pencahayaan (Lux Meter), debu/gas berbahaya (Dust Sampler), dan simulasi tanggap darurat APAR.",
  },
  {
    name: "Klinik Praktikum Fisioterapi & Elektroterapi",
    desc: "Fasilitas modalitas terapi modern: Ultrasound therapy, TENS, gym rehabilitasi muskuloskeletal, dan peralatan analisis postur tubuh.",
  },
  {
    name: "Mini Hospital & Laboratorium Keperawatan Medikal",
    desc: "Simulasi bangsal rawat inap terpadu, manikin resusitasi jantung paru (CPR), laboratorium keperawatan anak & maternitas, serta ruang tindakan steril.",
  },
];

export default function FakultasKesehatanPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Fakultas UPITRA"
        title="Fakultas Kesehatan (FKes)"
        description="Mencetak tenaga ahli keselamatan kerja industri (HSE), fisioterapis kompeten, dan perawat profesional yang berintegritas tinggi serta berjiwa belarasa."
        breadcrumbs={[
          { label: "Akademik", href: "/akademik" },
          { label: "Fakultas Kesehatan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Ringkasan Profil Fakultas */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Keunggulan FKes UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Pusat Pendidikan Ahli K3 Industri, Fisioterapi & Keperawatan Terkemuka di Jawa Tengah
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fakultas Kesehatan (FKes) UPITRA hadir menjawab tingginya kebutuhan tenaga K3 di sektor industri, manufaktur, dan perkebunan (termasuk unit bisnis Triputra Group), serta tenaga rehabilitasi medis dan keperawatan di rumah sakit nasional maupun internasional. Mahasiswa dilatih dengan standar keselamatan dan kompetensi klinis yang ketat.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Akreditasi Baik Sekali LAM-PTKes</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Lab Mini Hospital & Klinik Fisioterapi</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Peluang Karir HSE Officer di Triputra Group</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Kode Fakultas: FKes</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mendidik praktisi kesehatan yang mengedepankan keselamatan jiwa, etika profesi, dan ketulusan pelayanan kasih pada sesama.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              3 Program Studi (S1 & D3)
            </div>
          </div>
        </section>

        {/* Daftar 3 Program Studi FKes */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pilihan Jurusan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Program Studi di Bawah Naungan FKes
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Pilihan program sarjana dan diploma kesehatan dengan prospek kerja teruji di berbagai sektor:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {prodiListFKes.map((prodi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                      {prodi.degree.includes("Sarjana") ? "Jenjang S1" : "Jenjang D3"}
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

        {/* Fasilitas Lab FKes */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Laboratorium & Simulasi Klinis</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fasilitas Laboratorium FKes
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Sarana laboratorium canggih dan simulasi rumah sakit untuk mendukung keterampilan praktis mahasiswa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labFKes.map((lab, idx) => (
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

        {/* CTA Admission FKes */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Siap Menjadi Ahli K3 Industri atau Tenaga Kesehatan Handal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftarkan diri Anda di Fakultas Kesehatan UPITRA. Dapatkan Beasiswa Triputra Peduli 100% dan penempatan kerja di sektor industri dan kesehatan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/ebrochure"
              className="px-5 py-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs font-bold text-white hover:bg-blue-900 transition-all"
            >
              Unduh Brosur FKes
            </Link>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Daftar FKes Online</span>
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
