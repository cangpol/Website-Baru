import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pimpinan Universitas & Rektorat - Universitas Pignatelli Triputra (UPITRA)",
  description: "Profil jajaran Pimpinan Eksekutif Universitas Pignatelli Triputra Surakarta: Rektor, para Wakil Rektor, dan Dekanat 4 Fakultas Unggulan.",
};

interface PimpinanItem {
  nama: string;
  jabatan: string;
  bidang: string;
  foto: string;
  deskripsi: string;
  kredensial: string[];
}

const pimpinanList: PimpinanItem[] = [
  {
    nama: "Neil Semuel Rupidara, S.E., M.Sc., Ph.D",
    jabatan: "Rektor Universitas Pignatelli Triputra",
    bidang: "Pimpinan Eksekutif Tertinggi Universitas",
    foto: "/images/pimpinan/rektor-neil-rupidara.jpg",
    deskripsi: "Memimpin arah strategis, penguatan kelembagaan, serta kolaborasi ekosistem pendidikan UPITRA dengan Triputra Group dan mitra industri nasional.",
    kredensial: ["University of Melbourne, Australia (Ph.D)", "Pakar Manajemen Strategis & Kepemimpinan", "Dosen & Peneliti Manajemen Korporat"],
  },
  {
    nama: "Prof. Johana Endang Prawitasari, Ph.D",
    jabatan: "Wakil Rektor 1 (Akademik & Kemahasiswaan)",
    bidang: "Bidang Akademik, Riset & Kemahasiswaan",
    foto: "/images/pimpinan/wr1-johana-prawitasari.jpg",
    deskripsi: "Bertanggung jawab atas penjaminan mutu kurikulum transformatif, peningkatan prestasi mahasiswa, kegiatan organisasi kemahasiswaan, dan riset inovatif.",
    kredensial: ["Guru Besar / Profesor Perguruan Tinggi", "Pakar Psikologi & Pendidikan Karakter", "Pengembang Kurikulum Transformatif Nasional"],
  },
  {
    nama: "Yohanes Bayu Samudro, S.Pd., M.Pd",
    jabatan: "Wakil Rektor 2 (Operasional, Keuangan & SDM)",
    bidang: "Bidang Sumber Daya, Keuangan & Operasional",
    foto: "/images/pimpinan/wr2-bayu-samudro.jpg",
    deskripsi: "Mengelola efisiensi operasional kampus modern, keberlanjutan keuangan, pengembangan sarana dan prasarana berbasis digital, serta tata kelola SDM prima.",
    kredensial: ["Magister Pendidikan (M.Pd)", "Pakar Manajemen Operasional Pendidikan", "Pengembang Infrastruktur Digital Kampus"],
  },
];

const dekanatList = [
  {
    fakultas: "Fakultas Sains & Technology (FST)",
    fokus: "Informatika, Sistem Informasi, Rekayasa Perangkat Lunak",
    desc: "Menyelenggarakan pendidikan komputasi mutakhir, kecerdasan buatan, arsitektur cloud, dan rekayasa perangkat lunak enterprise.",
    badge: "FST",
    color: "bg-blue-600",
  },
  {
    fakultas: "Faculty Ekonomic & Bussiness (FEB)",
    fokus: "Manajemen Bisnis Internasional, Akuntansi & Digital Finance",
    desc: "Membentuk pemimpin bisnis berkarakter unggul, akuntan publik profesional, dan analis keuangan korporat berintegritas tinggi.",
    badge: "FEB",
    color: "bg-amber-600",
  },
  {
    fakultas: "Faculty Social Humaniora (FSH)",
    fokus: "Pariwisata (Hospitality & MICE), Bahasa Inggris Bisnis",
    desc: "Mengembangkan industri hospitality bertaraf internasional, manajemen destinasi, komunikasi bisnis global, dan penerjemahan.",
    badge: "FSH",
    color: "bg-indigo-600",
  },
  {
    fakultas: "Faculty Health (FH)",
    fokus: "K3 (Kesehatan & Keselamatan Kerja), Fisioterapi, Keperawatan",
    desc: "Mendidik tenaga ahli keselamatan industri, fisioterapis klinis/olahraga, dan perawat vokasi yang tanggap gawat darurat serta berbelarasa.",
    badge: "FH",
    color: "bg-emerald-600",
  },
];

export default function PimpinanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white pt-12 pb-20 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
              <Users className="w-4 h-4 text-sky-400" />
              Tata Kelola & Kepemimpinan Universitas
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pimpinan Universitas (Rektorat)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Jajaran akademisi dan praktisi terkemuka yang memimpin arah transformasi strategis Universitas Pignatelli Triputra Surakarta menuju keunggulan berkarakter dan berdaya saing industri global.
            </p>
          </div>
        </section>

        {/* 1. SAMBUTAN REKTOR */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 bg-slate-200">
                <img 
                  src={pimpinanList[0].foto} 
                  alt={pimpinanList[0].nama}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-center w-full">
                    <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">Rektor UPITRA</div>
                    <div className="text-sm font-black leading-tight mt-0.5">{pimpinanList[0].nama}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                PESAN KEPEMIMPINAN REKTORAT
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Membangun Ekosistem Pendidikan yang Relevan dengan Industri & Berbudi Pekerti Luhur
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                &ldquo;Universitas Pignatelli Triputra hadir sebagai jawaban atas tantangan dunia nyata. Bersama ekosistem Triputra Group, kami berkomitmen menyajikan kurikulum transformatif yang membekali mahasiswa bukan hanya dengan kecakapan teknologi dan bisnis mutakhir, melainkan juga integritas moral, kerendahan hati, dan ketangguhan karakter.&rdquo;
              </p>

              <div className="pt-2 text-xs sm:text-sm font-bold text-slate-500">
                — Neil Semuel Rupidara, S.E., M.Sc., Ph.D (Rektor UPITRA)
              </div>
            </div>

          </div>
        </section>

        {/* 2. PROFIL LENGKAP REKTOR & PARA WAKIL REKTOR (SIMETRIS & CENTER) */}
        <section className="py-14 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
              <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                EXECUTIVE BOARD
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
                Jajaran Pimpinan Eksekutif Universitas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Pimpinan yang berdedikasi mengawal mutu akademik, kemahasiswaan, dan tata kelola berkelanjutan.
              </p>
            </div>

            {/* Grid 3 Kolom Simetris & Center */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {pimpinanList.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/90 rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between items-center text-center"
                >
                  <div className="w-full flex flex-col items-center">
                    
                    {/* Centered Portrait Frame */}
                    <div className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden shadow-md border-4 border-white mb-5 mx-auto bg-slate-200 shrink-0">
                      <img 
                        src={p.foto} 
                        alt={p.nama}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Centered Bidang Tag */}
                    <div className="mb-2">
                      <span className="inline-block bg-blue-600/95 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {p.bidang}
                      </span>
                    </div>

                    {/* Centered Jabatan dengan Tinggi Baseline Seragam */}
                    <div className="text-xs font-bold text-blue-700 uppercase tracking-wider min-h-[2.5rem] flex items-center justify-center px-2">
                      {p.jabatan}
                    </div>

                    {/* Centered Nama dengan Tinggi Baseline Seragam */}
                    <h3 className="text-base sm:text-lg font-black text-[#0b2545] mt-1 leading-snug min-h-[3rem] flex items-center justify-center px-2">
                      {p.nama}
                    </h3>

                    {/* Centered Deskripsi dengan Tinggi Baseline Seragam */}
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 min-h-[4.5rem] flex items-center justify-center text-center px-1">
                      {p.deskripsi}
                    </p>

                  </div>

                  {/* Kredensial List Rapi di Bawah */}
                  <div className="pt-4 mt-4 border-t border-slate-200/90 w-full space-y-1.5 text-left">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center pb-1">
                      Kualifikasi &amp; Kredensial:
                    </div>
                    {p.kredensial.map((kred, kIdx) => (
                      <div key={kIdx} className="flex items-start gap-2 text-[11px] font-medium text-slate-700 bg-white p-2 rounded-xl border border-slate-200/70 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{kred}</span>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. DEKANAT 4 FAKULTAS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              FACULTY DEANSHIP
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Struktur Dekanat 4 Fakultas UPITRA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mengawal mutu kurikulum, keunggulan riset terapan, dan kemitraan industri di setiap rumpun keilmuan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dekanatList.map((dek, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg text-white font-black text-xs ${dek.color}`}>
                      {dek.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Fakultas Terakreditasi
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#0b2545] mb-1">
                    {dek.fakultas}
                  </h3>
                  
                  <div className="text-xs font-bold text-blue-600 mb-2.5">
                    Program Studi: {dek.fokus}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dek.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <Link 
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Eksplorasi 10 Program Studi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/life-at-upitra"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all"
            >
              <span>Kehidupan Kampus (Life at UPITRA)</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

