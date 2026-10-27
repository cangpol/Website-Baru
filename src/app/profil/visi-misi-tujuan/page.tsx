import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visi, Misi & 7 Tujuan Strategis - Profil UPITRA",
  description: "Visi transformatif, 6 Misi institusi, dan 7 Tujuan Strategis Universitas Pignatelli Triputra Surakarta dalam mencetak lulusan unggul berkarakter Triputra DNA.",
};

const misiList = [
  {
    no: "01",
    title: "Pendidikan Transformatif & Karakter Berbelarasa",
    desc: "Menghadirkan pengalaman pendidikan transformatif bagi mahasiswa yang berfokus pada kedalaman pengetahuan keilmuan, kedalaman spiritualitas, kemampuan beradaptasi, kemampuan berkomunikasi, kerendahan hati, dan berbelarasa pada sesama maupun lingkungan.",
  },
  {
    no: "02",
    title: "Atmosfer Riset Kreatif & Inovatif",
    desc: "Menciptakan atmosfer akademik yang menumbuhkan kreativitas dan semangat berinovasi melalui penelitian-penelitian yang berdampak transformatif bagi masyarakat luas.",
  },
  {
    no: "03",
    title: "Pengabdian Berbasis Teknologi & Solusi Nyata",
    desc: "Mewujudkan atmosfer yang mendorong penerapan ilmu pengetahuan dan teknologi bagi penyelesaian masalah-masalah kemasyarakatan melalui kegiatan pengabdian kepada masyarakat.",
  },
  {
    no: "04",
    title: "Pendidikan Terjangkau & Berkelanjutan",
    desc: "Merealisasikan pendidikan tinggi yang terjangkau bagi masyarakat luas yang dikelola secara profesional dan dikembangkan secara berkelanjutan.",
  },
  {
    no: "05",
    title: "Kerjasama Strategis Industri & Pemerintahan",
    desc: "Mendorong terwujudnya kerjasama yang produktif dengan lembaga pendidikan, pemerintah, nonpemerintah, dan dunia usaha (Triputra Group & mitra) baik tingkat regional, nasional, maupun internasional.",
  },
  {
    no: "06",
    title: "Kampus Modern, Digital & Ramah Lingkungan",
    desc: "Menciptakan suasana kampus modern yang kondusif untuk proses pendidikan dengan prasarana dan sarana yang berkualitas, berbasis digital, dan ramah lingkungan.",
  },
];

const tujuanList = [
  "Melibatkan diri dalam usaha mencerdaskan kehidupan bangsa, memupuk rasa kesatuan dan persatuan bangsa yang dilandasi nilai-nilai Pancasila, etika akademis, moral, iman, dan takwa kepada Tuhan Yang Maha Esa.",
  "Menyelenggarakan proses pembelajaran yang transformatif dalam suasana akademik yang dinamis untuk menghasilkan lulusan yang bermoral, kompeten, berdaya saing global, mandiri, dan berkarakter Triputra DNA.",
  "Meningkatkan kuantitas dan kualitas penelitian dasar dan terapan yang berkontribusi nyata bagi pengembangan ilmu pengetahuan, teknologi, dan penyelesaian isu strategis masyarakat.",
  "Melaksanakan pengabdian kepada masyarakat yang berkesinambungan berbasis hasil riset dan inovasi teknologi untuk meningkatkan kesejahteraan sosial ekonomi masyarakat.",
  "Memperluas dan memperkuat jejaring kemitraan strategis dengan dunia usaha dan industri (khususnya Triputra Group), perguruan tinggi mitra dalam dan luar negeri, serta instansi pemerintah.",
  "Mewujudkan tata kelola perguruan tinggi yang baik (Good University Governance), transparan, akuntabel, dan berdaya saing tinggi dalam era transformasi digital.",
  "Menyediakan sarana dan prasarana kampus yang modern, aman, inklusif, dan ramah lingkungan guna menunjang ekosistem belajar yang inspiratif dan berdaya guna."
];

export default function VisiMisiTujuanPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Landasan Strategis Institusi"
        title="Visi, Misi & Tujuan"
        description="Arah kiblat dan komitmen fundamental Universitas Pignatelli Triputra dalam mewujudkan pendidikan berintegritas tinggi dan berdampak nyata bagi bangsa."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Visi Misi Tujuan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* VISI BESAR UPITRA */}
        <section className="bg-gradient-to-br from-[#06172e] via-[#092244] to-[#0b2b54] rounded-3xl p-8 sm:p-14 text-white shadow-xl border border-blue-900/60 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Visi Transformatif UPITRA 2040</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              &ldquo;Menjadi Perguruan Tinggi yang Unggul, Transformatif, Berkarakter, dan Berdaya Saing Global Berlandaskan Nilai-Nilai Kasih dan Integritas.&rdquo;
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              Visi ini menjadi penuntun seluruh insan akademika UPITRA dalam menciptakan ekosistem keilmuan yang adaptif terhadap disrupsi teknologi, berakar pada keluhuran budi, serta siap menjawab tantangan peradaban masa depan.
            </p>
          </div>
        </section>

        {/* 6 MISI INSTITUSI */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Mandat Kelembagaan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              6 Misi Strategis UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Langkah konkrit yang dilaksanakan secara terpadu oleh seluruh sivitas akademika:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misiList.map((misi) => (
              <div 
                key={misi.no}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center font-black text-sm">
                    {misi.no}
                  </div>
                  <h3 className="text-base font-bold text-[#0b2545] leading-snug">
                    {misi.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {misi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 TUJUAN STRATEGIS */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Capaian Berkelanjutan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              7 Tujuan Strategis UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Target pencapaian kelembagaan yang menjadi tolak ukur keberhasilan operasional universitas:
            </p>
          </div>

          <div className="space-y-3.5">
            {tujuanList.map((tujuan, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {tujuan}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fast Link to Profil Pimpinan */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-blue-50 border border-blue-200 flex-col sm:flex-row gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0b2545]">Ingin Mengenal Jajaran Pimpinan Rektorat & Dekanat?</h4>
            <p className="text-xs text-slate-600">Pelajari rekam jejak akademisi dan pimpinan yang memajukan UPITRA.</p>
          </div>
          <Link
            href="/profil/pimpinan-universitas"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <span>Lihat Pimpinan Universitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
