"use client";

import { useState } from "react";
import Link from "next/link";
import { ProdiData } from "@/lib/prodiData";
import { getProdiTheme } from "@/lib/prodiThemes";
import { getDosenByProdi } from "@/lib/facultyData";
import { 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  BookOpen, 
  Briefcase, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Download, 
  PhoneCall, 
  Building2, 
  Sparkles, 
  Check, 
  Share2, 
  Zap, 
  TrendingUp, 
  Target, 
  Compass,
  CheckCircle,
  Cpu,
  Layers,
  Activity,
  HeartHandshake,
  Mail,
  User
} from "lucide-react";

interface ProdiDetailViewProps {
  prodi: ProdiData;
  relatedProdi: ProdiData[];
}

export default function ProdiDetailView({ prodi, relatedProdi }: ProdiDetailViewProps) {
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = getProdiTheme(prodi.slug);
  const dosenList = getDosenByProdi(prodi.slug);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-white text-slate-800">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION - Thematic Custom Color & Identity        */}
      {/* ========================================================= */}
      <section className={`relative bg-gradient-to-br ${theme.heroBgGradient} text-white pt-10 pb-16 lg:pb-20 overflow-hidden`}>
        {/* Background Image with Ambient Gradient & Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={prodi.heroImage} 
            alt={prodi.name} 
            className="w-full h-full object-cover opacity-45 filter saturate-125 scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
          />
          {/* Dual Scrim Protection for High Legibility & Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Breadcrumb Navigation - Sleek & Compact */}
          <nav className="flex items-center gap-2 text-[11px] font-medium text-slate-300 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/programs" className="hover:text-white transition-colors">Program Akademik</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-400">{prodi.faculty.name}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className={`${theme.accentText} font-bold`}>{prodi.name}</span>
          </nav>

          {/* Badges Row - Clean Thematic Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide border ${theme.accentPill}`}>
              <Zap className="w-3 h-3" />
              {theme.fieldBadge}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-xs">
              <GraduationCap className="w-3 h-3 text-blue-600" />
              Gelar: {prodi.degreeTitle} ({prodi.degreeFullName})
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Akreditasi {prodi.accreditation}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-slate-200 border border-white/20">
              Jenjang {prodi.degreeLevel} • {prodi.faculty.code}
            </span>
          </div>

          {/* Main Title & Headline - High-Contrast & Prominent */}
          <div className="max-w-4xl space-y-3.5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              {prodi.name}
            </h1>
            <p className={`text-base sm:text-xl font-semibold ${theme.accentText} italic drop-shadow-xs`}>
              {prodi.englishName}
            </p>
            <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed drop-shadow-xs">
              {prodi.tagline}
            </p>
          </div>

          {/* Fast Metrics Row (5 Cards) - Sleek Glassmorphism */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 pb-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-sky-400" />
                Jenjang Studi
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Program {prodi.degreeLevel}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                Masa Studi
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {prodi.duration}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-sky-400" />
                Beban SKS
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {prodi.totalSks}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-sky-400" />
                Pola Pembelajaran
              </div>
              <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                {prodi.studyMode}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 col-span-2 sm:col-span-1">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                Lokasi Kampus
              </div>
              <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                Surakarta, Solo
              </div>
            </div>
          </div>

          {/* Action CTAs - Proportional & Clean */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a 
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs shadow-md transition-all hover:scale-105 ${theme.navbarCtaClass}`}
            >
              <span>Daftar PMB 2026/2027</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link 
              href="/ebrochure"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-sky-300" />
              <span>Unduh Silabus & Brosur</span>
            </Link>

            <a 
              href={`https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20tertarik%20dengan%20${encodeURIComponent(prodi.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Konsultasi WhatsApp</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 text-xs font-medium border border-white/10 transition-all ml-auto"
              title="Salin tautan prodi ini"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Tersalin</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Bagikan</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECTION: WIDGET INTERAKTIF KHAS SPESIFIK BIDANG ILMU    */}
      {/* ========================================================= */}
      <section className="py-12 bg-gradient-to-b from-slate-900 to-[#07172b] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 ${theme.accentPill}`}>
                {theme.widget.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {theme.widget.title}
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {theme.widget.subtitle}
            </p>
          </div>

          {/* Grid Items Khas Prodi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {theme.widget.items.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-6 h-6 rounded-md bg-white/10 text-white font-black text-[11px] flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    {item.tag && (
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${theme.accentPill}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-white mb-1.5 group-hover:text-sky-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.metric && (
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[9.5px] text-slate-400 font-semibold uppercase">Output Kunci:</span>
                    <span className={`text-[11px] font-black ${theme.accentText}`}>{item.metric}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: RINGKASAN & KEUNGGULAN (PROFIL PRODI)         */}
      {/* ========================================================= */}
      <section id="ringkasan" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Kolom Kiri: Narasi Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                PROFIL PROGRAM STUDI
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Mempersiapkan Masa Depan Unggul di {prodi.name} UPITRA
              </h2>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {prodi.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Jaminan Karakter Triputra */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-[#0b2545]">
                    Pilar Karakter Integritas Triputra DNA
                  </h4>
                  <p className="text-[11.5px] text-slate-600 mt-0.5 leading-relaxed">
                    Setiap lulusan dibekali integritas moral, etika kerja pantang menyerah, dan kepedulian sosial yang terbukti membentuk ribuan profesional sukses di dunia usaha.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Snapshot Box Ala Brosur Eksklusif */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  KREDENSIAL AKADEMIK RESMI
                </div>
                <div className="text-base font-black text-[#0b2545] mt-0.5">
                  Universitas Pignatelli Triputra
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Gelar Lulusan</span>
                  <span className="font-extrabold text-blue-700">{prodi.degreeTitle} ({prodi.degreeFullName})</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Akreditasi Institusi</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">{prodi.accreditation} (BAN-PT)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Masa Kuliah</span>
                  <span className="font-bold text-slate-800">{prodi.duration}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Beban Studi</span>
                  <span className="font-bold text-slate-800">{prodi.totalSks}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Dukungan Industri</span>
                  <span className="font-bold text-blue-700">Triputra Group & Rekanan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Beasiswa Tersedia</span>
                  <span className="font-bold text-amber-600">Hingga 100% Penuh</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href={`/pmb?program=${prodi.slug}`}
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-extrabold text-xs shadow-xs transition-all text-center ${theme.navbarCtaClass}`}
                >
                  <span>Daftar Pada Program Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Daftar Dosen & Kaprodi (Menggantikan Why Study Here) */}
          <div id="dosen" className="pt-14">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
              <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                TENAGA PENGAJAR &amp; DOSEN PAKAR
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Dosen &amp; Kaprodi {prodi.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Didukung oleh akademisi bergelar magister &amp; doktoral dari perguruan tinggi ternama serta praktisi industri berpengalaman.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dosenList.map((dosen, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                    dosen.isKaprodi 
                      ? "ring-2 ring-blue-600/30 border-blue-400 bg-gradient-to-b from-blue-50/40 via-white to-white" 
                      : "border-slate-200"
                  }`}
                >
                  <div>
                    {/* Foto Dosen */}
                    <div className="relative aspect-4/5 bg-slate-100 overflow-hidden">
                      {dosen.photo ? (
                        <img
                          src={dosen.photo}
                          alt={dosen.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback Avatar */}
                      <div 
                        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0b2545] to-[#1e3a8a] text-white ${
                          dosen.photo ? "hidden" : "flex"
                        }`}
                      >
                        <div className="text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-xl font-black mb-2 border border-white/20">
                            {dosen.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-200">
                            Dosen UPITRA
                          </span>
                        </div>
                      </div>

                      {/* Badge Kaprodi */}
                      {dosen.isKaprodi && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/20">
                          Kaprodi
                        </div>
                      )}
                    </div>

                    {/* Informasi Dosen */}
                    <div className="p-4 space-y-2.5">
                      <div className="space-y-0.5">
                        <span className={`inline-block text-[9.5px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded ${
                          dosen.isKaprodi
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {dosen.role}
                        </span>
                        <h4 className="text-sm font-black text-[#0b2545] leading-snug pt-1">
                          {dosen.name}
                        </h4>
                      </div>

                      {dosen.education && (
                        <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          <span className="font-semibold text-slate-700 block text-[9.5px] uppercase text-slate-400">Pendidikan:</span>
                          <span className="line-clamp-2">{dosen.education}</span>
                        </div>
                      )}

                      {dosen.expertise && (
                        <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                          <span className="font-semibold text-slate-700 block text-[9.5px] uppercase text-slate-400">Keahlian &amp; Riset:</span>
                          <span className="line-clamp-2 text-blue-700 font-medium">{dosen.expertise}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Card: Email Kontak */}
                  {dosen.email && (
                    <div className="p-4 pt-0">
                      <a
                        href={`mailto:${dosen.email}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[11px] font-semibold border border-slate-200 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{dosen.email}</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: JALUR PEMINATAN / SPESIALISASI                */}
      {/* ========================================================= */}
      <section id="peminatan" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-1.5 mb-10">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              SPECIALIZATION TRACKS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Pilihan Peminatan Sesuai Minat & Tren Industri
            </h2>
            <p className="text-xs text-slate-600">
              Mahasiswa dapat memilih peminatan khusus untuk mengasah keahlian spesifik yang paling dibutuhkan oleh korporasi modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prodi.specializations.map((spec, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-b from-slate-50/80 to-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors shadow-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-black text-[#0b2545] mb-2 leading-snug">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {spec.description}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Keahlian & Teknologi Kunci:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[10.5px] font-semibold bg-white text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: KURIKULUM & TAHAPAN STUDI 4 TAHUN             */}
      {/* ========================================================= */}
      <section id="kurikulum" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-1.5 mb-10">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              CURRICULUM JOURNEY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Tahapan Studi & Mata Kuliah Unggulan
            </h2>
            <p className="text-xs text-slate-600">
              Disusun secara sistematis dari fondasi keilmuan, spesialisasi, hingga 1 tahun magang industri terstruktur.
            </p>
          </div>

          {/* Interactive Curriculum Stage Tabs - Sleek Segmented Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 mb-10">
            
            {/* Tab Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-100 pb-5 mb-5">
              {prodi.curriculumStages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCurriculumTab(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    activeCurriculumTab === idx
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className={`text-[9.5px] font-bold uppercase tracking-wider ${
                    activeCurriculumTab === idx ? "text-blue-200" : "text-slate-400"
                  }`}>
                    {stage.year}
                  </div>
                  <div className="text-xs font-extrabold mt-0.5 line-clamp-1">
                    {stage.stageTitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Stage Content */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {prodi.curriculumStages[activeCurriculumTab].year}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0b2545] mt-1.5">
                  {prodi.curriculumStages[activeCurriculumTab].stageTitle}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {prodi.curriculumStages[activeCurriculumTab].description}
              </p>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Fokus Pembelajaran & Mata Kuliah:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {prodi.curriculumStages[activeCurriculumTab].courses.map((course, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Flagship Courses Grid (Mata Kuliah Kunci) */}
          <div>
            <h3 className="text-base font-black text-[#0b2545] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>8 Mata Kuliah Kunci Berstandar Industri</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {prodi.coreCourses.map((course, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all flex items-start gap-2.5"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: PROSPEK KARIR & EKOSISTEM INDUSTRI            */}
      {/* ========================================================= */}
      <section id="karir" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-1.5 mb-10">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              CAREER OPPORTUNITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Peluang Karir Luas & Ekosistem Industri
            </h2>
            <p className="text-xs text-slate-600">
              Format karir lulusan UPITRA terbagi menjadi profesional korporat (intrapreneur), technopreneur mandiri, dan konsultan spesialis.
            </p>
          </div>

          {/* Grid Karir */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prodi.careerPaths.map((cp, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 hover:bg-blue-50/40 hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className={`inline-block text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full mb-2.5 ${
                    cp.category.includes("Professional")
                      ? "bg-blue-100 text-blue-800"
                      : cp.category.includes("Entrepreneur")
                      ? "bg-amber-100 text-amber-800"
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {cp.category}
                  </span>
                  <h3 className="text-sm font-black text-[#0b2545] mb-1.5 leading-snug">
                    {cp.role}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION: FASILITAS LABORATORIUM & STUDIO               */}
      {/* ========================================================= */}
      <section id="fasilitas" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-1.5 mb-10">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              LEARNING FACILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Laboratorium & Studio Riset Modern
            </h2>
            <p className="text-xs text-slate-600">
              Sarana dan prasarana modern dirancang khusus untuk mendukung simulasi kerja riil dan riset terapan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prodi.facilities.map((fac, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    Fasilitas {idx + 1}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#0b2545] mb-1.5">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION: BIAYA KULIAH & PROGRAM BEASISWA 100%          */}
      {/* ========================================================= */}
      <section id="biaya" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Kolom Kiri: Informasi Pendaftaran & Konsultasi Biaya PMB */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#07172b] to-[#0b2545] text-white p-6 sm:p-7 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500 text-white tracking-wider uppercase">
                  INFORMASI ADMISI PMB
                </span>

                <div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-0.5 leading-snug">
                    Konsultasi Biaya &amp; Beasiswa
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Dapatkan rincian skema pembiayaan studi yang transparan, kemudahan cicilan, serta panduan pendaftaran beasiswa melalui layanan admisi resmi UPITRA.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-[11.5px]">Transparansi biaya tanpa pungutan tersembunyi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-[11.5px]">Tersedia skema cicilan pembayaran fleksibel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 text-[11.5px]">Potongan pendaftaran jalur gelombang dini PMB</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2">
                  <a
                    href="https://pmb.upitra.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block py-3 px-4 rounded-xl font-extrabold text-xs text-center shadow-xs transition-all ${theme.navbarCtaClass}`}
                  >
                    DAFTAR PMB ONLINE
                  </a>
                  <a
                    href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20biaya%20kuliah%20dan%20beasiswa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-2.5 px-4 rounded-xl font-bold text-xs text-center bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                  >
                    KONSULTASI VIA WHATSAPP
                  </a>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Beasiswa Triputra Peduli 100% */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                SCHOLARSHIP OPPORTUNITIES
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] tracking-tight">
                Program Beasiswa Penuh 100% Triputra Peduli
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                UPITRA berkomitmen agar setiap talenta muda berprestasi dan berkarakter kuat dapat menempuh pendidikan tinggi tanpa terhalang kendala finansial melalui program beasiswa korporasi.
              </p>

              <div className="space-y-2.5 pt-1">
                {prodi.scholarships.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800">{s}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Syarat & Prosedur Pendaftaran Beasiswa</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SECTION: FAQ ACCORDION                                 */}
      {/* ========================================================= */}
      <section id="faq" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="text-center space-y-1.5 mb-10">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] tracking-tight">
              Pertanyaan Umum Seputar {prodi.name}
            </h2>
          </div>

          <div className="space-y-2.5">
            {prodi.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. SECTION: BOTTOM CALL-TO-ACTION BANNER                 */}
      {/* ========================================================= */}
      <section className="py-14 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white uppercase tracking-wider">
            PENERIMAAN MAHASISWA BARU 2026/2027
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mulai Perjalanan Karir Masa Depan Anda Bersama {prodi.name} UPITRA
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Daftarkan diri Anda sekarang untuk mengamankan kuota kelas dan kesempatan meraih Beasiswa Penuh 100% Triputra Peduli.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-black text-xs uppercase shadow-md transition-all hover:scale-105"
            >
              DAFTAR SEKARANG
            </a>

            <a
              href={`https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20mohon%20informasi%20pendaftaran%20${encodeURIComponent(prodi.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. SECTION: PROGRAM STUDI TERKAIT (RELATED PROGRAMS)     */}
      {/* ========================================================= */}
      {relatedProdi.length > 0 && (
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
              <div>
                <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                  PROGRAM STUDI LAINNYA
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0b2545] tracking-tight mt-0.5">
                  Eksplorasi Program Studi di UPITRA
                </h3>
              </div>
              <Link
                href="/programs"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua 10 Program Studi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProdi.map((rel) => (
                <div 
                  key={rel.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9.5px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {rel.degreeTitle}
                      </span>
                      <span className="text-[9.5px] text-slate-400 font-semibold">
                        {rel.faculty.name}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-[#0b2545] group-hover:text-blue-600 transition-colors mb-1.5">
                      {rel.name}
                    </h4>

                    <p className="text-[11.5px] text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.tagline}
                    </p>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11.5px] font-bold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded">
                      Jenjang {rel.degreeLevel} &bull; {rel.duration}
                    </span>
                    <Link
                      href={`/${rel.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                    >
                      <span>Lihat Profil</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
