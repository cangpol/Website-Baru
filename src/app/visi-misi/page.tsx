import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
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
  title: "Visi, Misi & 7 Tujuan Strategis - Universitas Pignatelli Triputra (UPITRA)",
  description: "Visi, 6 Misi resmi, dan 7 Tujuan Strategis UPITRA Surakarta. Membangun generasi unggul berkarakter Triputra DNA, berintegritas, dan berdaya saing industri.",
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
  "Melibatkan diri dalam usaha memperluas akses pendidikan tinggi bagi masyarakat yang kurang mampu melalui skema beasiswa berkeadilan (Beasiswa Triputra Peduli).",
  "Menghasilkan lulusan yang berbudi pekerti luhur, memiliki kedalaman spiritual, unggul dalam IPTEK, profesional, berintegritas, bertanggung jawab, santun, rendah hati, dan berwawasan lingkungan.",
  "Memberikan kontribusi yang berkualitas dalam pengembangan ilmu pengetahuan dan teknologi yang berdampak transformatif bagi kemajuan peradaban dan masyarakat.",
  "Menerapkan ilmu pengetahuan dan teknologi bagi penyelesaian masalah-masalah nyata di lingkungan industri korporasi dan sosial kemasyarakatan.",
  "Mengembangkan sistem jejaring kemitraan strategis dengan perguruan tinggi terkemuka, masyarakat, industri nasional, lembaga pendidikan, pemerintah, dan dunia usaha yang dilandasi etika akademik, manfaat timbal balik, dan keberlanjutan.",
  "Menciptakan tata kelola kampus modern, berbasis teknologi informasi dan komunikasi mutakhir serta berwawasan lingkungan (green campus) yang mendukung proses tridharma perguruan tinggi prima.",
];

const triputraValues = [
  {
    title: "Integrity & Ethics (Integritas)",
    desc: "Kejujuran tanpa kompromi, keselarasan antara perkataan dan perbuatan, serta menjunjung tinggi etika moral dalam setiap tindakan.",
  },
  {
    title: "Excellence & Hard Work (Keunggulan Kerja)",
    desc: "Selalu memberikan usaha terbaik (extra mile), pantang menyerah, dan berorientasi pada standar kualitas tertinggi.",
  },
  {
    title: "Humility & Continuous Learning (Kerendahan Hati)",
    desc: "Senantiasa rendah hati, bersedia mendengar, menghargai sesama, dan memiliki rasa lapar untuk terus belajar mengembangkan diri.",
  },
  {
    title: "Compassion (Berbelarasa)",
    desc: "Ketulusan hati untuk peduli dan berbelarasa kepada sesama yang membutuhkan serta kelestarian alam lingkungan hidup.",
  },
];

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white pt-12 pb-20 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
              <Compass className="w-4 h-4 text-sky-400" />
              Arah Strategis & Fondasi Kelembagaan UPITRA
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Visi, Misi & 7 Tujuan Strategis UPITRA
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Komitmen luhur Universitas Pignatelli Triputra Surakarta dalam menyelenggarakan pendidikan tinggi transformatif, riset berdampak nyata, dan penanaman karakter integritas Triputra DNA.
            </p>
          </div>
        </section>

        {/* 1. VISI UNIVERSITAS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
            
            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-sky-300 text-xs font-black uppercase tracking-wider">
                <Target className="w-4 h-4 text-sky-400" />
                VISI UNIVERSITAS PIGNATELLI TRIPUTRA
              </div>

              <blockquote className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
                &ldquo;Menjadi universitas berkarakter unggul, transformatif, dan berdaya saing global yang berlandaskan integritas, kepedulian sosial, serta keterhubungan erat dengan dunia industri.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-sky-200 leading-relaxed max-w-4xl">
                UPITRA bertekad menjadi mercusuar pendidikan tinggi di Indonesia yang menjembatani kecakapan intelektual dan keahlian terapan industri dengan kemuliaan budi pekerti serta kepemimpinan berintegritas.
              </p>
            </div>
          </div>
        </section>

        {/* 2. ENAM (6) MISI RESMI UPITRA */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
              <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                ENAM PILAR PENGABDIAN
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
                Misi Resmi UPITRA
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Langkah konkret dalam penyelenggaraan Tridharma Perguruan Tinggi yang berdampak luas bagi kemajuan bangsa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {misiList.map((misi) => (
                <div 
                  key={misi.no}
                  className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm shadow-blue-500/20">
                      {misi.no}
                    </div>
                    <h3 className="text-base font-black text-[#0b2545] mb-2 leading-snug">
                      {misi.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {misi.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. TUJUH (7) TUJUAN STRATEGIS UNIVERSITAS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              STRATEGIC GOALS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              7 Tujuan Strategis UPITRA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sasaran terukur yang memandu seluruh civitas akademika dalam mewujudkan keunggulan pendidikan tinggi.
            </p>
          </div>

          <div className="space-y-3.5 max-w-4xl mx-auto">
            {tujuanList.map((tujuan, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {tujuan}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. NILAI KARAKTER TRIPUTRA DNA */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
              <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                CORE VALUES & CULTURE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
                Nilai Karakter Luhur Triputra DNA
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Empat fondasi pembentukan kepribadian mahasiswa yang menjadi pembeda utama lulusan UPITRA di dunia profesional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {triputraValues.map((val, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-blue-500/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0b2545] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/pimpinan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Kenali Pimpinan Universitas (Rektorat)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

