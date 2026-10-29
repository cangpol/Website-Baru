import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { 
  GraduationCap, 
  Cpu, 
  TrendingUp, 
  Globe2, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  Award, 
  Sparkles, 
  Layers,
  Building2,
  Calendar,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Akademik & Fakultas - Universitas Pignatelli Triputra",
  description: "Jelajahi program akademik, 4 fakultas unggulan, dan kurikulum Immersion 3+1 berbasis industri di Universitas Pignatelli Triputra (UPITRA) Surakarta.",
};

const fakultasData = [
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains & Teknologi",
    slug: "/fst",
    color: "from-blue-600 to-sky-600",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    icon: Cpu,
    cover: "/images/ar-vr.jpg",
    desc: "Mencetak sarjana teknologi yang unggul dalam kecerdasan buatan (AI), rekayasa piranti lunak skala industri, analitika data, dan arsitektur komputasi modern.",
    prodiList: [
      { name: "S1 Informatika", degree: "S.Kom.", accreditation: "Baik Sekali" },
      { name: "S1 Sistem Informasi", degree: "S.Kom.", accreditation: "Baik Sekali" },
      { name: "S1 Rekayasa Perangkat Lunak", degree: "S.Kom.", accreditation: "Baik" },
      { name: "S1 Teknologi Informasi", degree: "S.Kom.", accreditation: "Baik" },
    ],
  },
  {
    id: "feb",
    code: "FEB",
    name: "Fakultas Ekonomi & Bisnis",
    slug: "/feb",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    icon: TrendingUp,
    cover: "/images/feb-full.jpg",
    desc: "Mempersiapkan profesional bisnis, akuntan korporasi, dan wirausahawan berkarakter Triputra yang siap memimpin transformasi ekonomi digital.",
    prodiList: [
      { name: "S1 Manajemen", degree: "S.M.", accreditation: "Baik Sekali" },
      { name: "S1 Akuntansi", degree: "S.Ak.", accreditation: "Baik Sekali" },
      { name: "S1 Bisnis Digital", degree: "S.B.D.", accreditation: "Baik" },
    ],
  },
  {
    id: "fsh",
    code: "FSH",
    name: "Fakultas Sosial Humaniora",
    slug: "/fsh",
    color: "from-purple-600 to-indigo-600",
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-500/30",
    icon: Globe2,
    cover: "/images/pariwisata/par-1.jpg",
    desc: "Mengembangkan kepemimpinan humanis, kompetensi komunikasi global, dan keahlian manajemen pariwisata berkelanjutan kelas dunia.",
    prodiList: [
      { name: "S1 Pariwisata", degree: "S.Par.", accreditation: "Baik Sekali" },
      { name: "S1 Bahasa Inggris", degree: "S.Li.", accreditation: "Baik Sekali" },
    ],
  },
  {
    id: "fkes",
    code: "FKes",
    name: "Fakultas Kesehatan",
    slug: "/fkes",
    color: "from-emerald-600 to-teal-600",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    icon: HeartPulse,
    cover: "/images/kuliah-1.jpeg",
    desc: "Menghasilkan tenaga kesehatan profesional, ahli keselamatan kerja industri (K3), dan fisioterapis yang berdedikasi tinggi bagi keselamatan manusia.",
    prodiList: [
      { name: "S1 Keselamatan & Kesehatan Kerja (K3)", degree: "S.K.K.K.", accreditation: "Baik Sekali" },
      { name: "S1 Fisioterapi", degree: "S.Fis.", accreditation: "Baik" },
      { name: "D3 Keperawatan", degree: "A.Md.Kep.", accreditation: "Baik Sekali" },
    ],
  },
];

const academicPillars = [
  {
    title: "Program Immersion 3+1 Triputra",
    description: "3 tahun perkuliahan teori & riset intensif di kampus, serta 1 tahun magang berbayar langsung di ekosistem korporasi Triputra Group se-Indonesia.",
    icon: Briefcase,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  {
    title: "Kurikulum OBE Berstandar Industri",
    description: "Pendekatan Outcome-Based Education yang memastikan setiap mata kuliah relevan dengan kebutuhan kompetensi industri masa kini dan masa depan.",
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    title: "Fasilitas & Lab Komputasi Modern",
    description: "Didukung workstation AI GPU canggih, Smart Classroom, laboratorium keperawatan & K3 terakreditasi, serta akses perpustakaan digital IEEE & Scopus.",
    icon: Layers,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
];

export default function AkademikOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. Page Header */}
      <PageHeader 
        badge="Ekosistem Akademik UPITRA"
        title="Akademik & Fakultas"
        description="Penyelenggaraan pendidikan tinggi berkarakter Triputra DNA dengan kurikulum Outcome-Based Education (OBE) dan program unggulan Immersion 3+1 yang terintegrasi langsung dengan dunia industri."
        breadcrumbs={[
          { label: "Akademik" }
        ]}
      />

      {/* 2. FIXED 1440px x 480px IMAGE DISPLAY SHOWCASE */}
      <section className="py-8 sm:py-10 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6">
          <div className="relative w-full max-w-[1440px] h-[320px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 group mx-auto">
            <Image
              src="/images/kuliah-1.jpeg"
              alt="Suasana Akademik & Pembelajaran Modern UPITRA"
              width={1440}
              height={480}
              priority
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Executive Gradient Overlay & Authoritative Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/45 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/90 text-sky-200 text-xs font-bold uppercase tracking-wider w-fit mb-3 backdrop-blur-md border border-white/20">
                <GraduationCap className="w-4 h-4 text-sky-300" />
                <span>Pendidikan Tinggi Unggul &amp; Berkarakter</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black max-w-3xl leading-tight text-white drop-shadow-md">
                Ekosistem Akademik Holistik Berbasis Karakter &amp; Kebutuhan Industri
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-200 mt-2.5 max-w-2xl leading-relaxed drop-shadow-xs">
                Mempersiapkan lulusan unggul yang tidak hanya cakap secara keilmuan teoritis, namun memiliki kematangan etika, integritas Triputra DNA, dan kesiapan karir sebelum wisuda.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                  🏛️ 4 Fakultas Unggulan
                </span>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                  🎯 10 Program Studi Sarjana &amp; Diploma
                </span>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                  💼 49+ Mitra Korporasi Industri
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR FACULTIES GRID */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Fakultas &amp; Program Studi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Pilihan Fakultas Berstandar Industri
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pilih rumpun keilmuan yang sesuai dengan minat dan aspirasi masa depanmu. Seluruh program studi didukung kurikulum link-and-match dengan industri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fakultasData.map((fakultas) => {
              const Icon = fakultas.icon;
              return (
                <div
                  key={fakultas.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={fakultas.cover}
                        alt={fakultas.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[#0b2545] font-black text-xs shadow-sm">
                          {fakultas.code}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-sky-400" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
                            Fakultas UPITRA
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white leading-tight">
                          {fakultas.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7 space-y-5">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {fakultas.desc}
                      </p>

                      <div className="space-y-2.5">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Program Studi Tersedia:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {fakultas.prodiList.map((prodi, idx) => (
                            <div 
                              key={idx}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 transition-colors"
                            >
                              <div className="text-xs font-bold text-[#0b2545] leading-snug">
                                {prodi.name}
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                                <span>Gelar: {prodi.degree}</span>
                                <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                  {prodi.accreditation}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0">
                    <Link
                      href={fakultas.slug}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#06172e] hover:bg-blue-600 text-white text-xs font-bold shadow-md transition-colors"
                    >
                      <span>Jelajahi Profil {fakultas.code}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. THREE ACADEMIC PILLARS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Keunggulan Kompetitif
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Pilar Pendidikan Berkarakter Triputra
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kurikulum UPITRA dirancang bersama pimpinan industri untuk memastikan kesiapan kerja, integritas kepemimpinan, dan relevansi keahlian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className={`w-12 h-12 rounded-2xl ${pillar.bgColor} flex items-center justify-center ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0b2545]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Links: Kalender Akademik & Download Center */}
          <div className="bg-[#06172e] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                Layanan &amp; Informasi Perkuliahan
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Akses Kalender Akademik &amp; Panduan Perkuliahan
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Unduh jadwal semester genap, ketentuan yudisium kelulusan, dan buku panduan akademik resmi UPITRA.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/kemahasiswaan/kalender-akademik"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Kalender Akademik</span>
              </Link>
              <Link
                href="/layanan/download-center"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 text-xs font-bold border border-white/20 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Download Center Brosur</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PMB ENROLLMENT CALL TO ACTION */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Penerimaan Mahasiswa Baru TA 2026/2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
            Siap Memulai Perjalanan Akademikmu di UPITRA?
          </h2>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Daftarkan dirimu sekarang melalui Jalur Beasiswa Triputra Unggul atau Jalur Prestasi Akademik. Dapatkan potongan biaya kuliah dan program magang prioritas industri.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pmb"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02]"
            >
              <span>Daftar PMB 2026 Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/628112658826?text=Halo%20Admin%20PMB%20UPITRA,%20saya%20ingin%20berkonsultasi%20mengenai%20pilihan%20program%20studi%20akademik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
            >
              <span>Konsultasi Program Studi</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
