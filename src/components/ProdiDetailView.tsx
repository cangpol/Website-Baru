"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Check, 
  Share2, 
  Zap, 
  Sparkles,
  School
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
    <div className="bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. CINEMATIC HERO SECTION (Framer Motion Stagger Entrance) */}
      {/* ========================================================= */}
      <section className="relative bg-[#06172e] text-white pt-10 pb-16 lg:pb-24 overflow-hidden">
        {/* Background Image with Ambient Gradient & Deep Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={prodi.heroImage} 
            alt={prodi.name} 
            className="w-full h-full object-cover opacity-35 filter saturate-110 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041122]/95 via-[#071f3d]/85 to-[#0b2545]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06172e] via-transparent to-transparent/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Breadcrumb Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[11px] font-medium text-slate-300 mb-5 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/programs" className="hover:text-white transition-colors">Program Akademik</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-400">{prodi.faculty.name}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-sky-300 font-bold">{prodi.name}</span>
          </motion.nav>

          {/* Badges Row */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide bg-blue-600/30 border border-blue-400/40 text-sky-200 backdrop-blur-md">
              <Zap className="w-3 h-3 text-sky-300" />
              {theme.fieldBadge}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#0b2545] shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              Gelar: {prodi.degreeTitle} ({prodi.degreeFullName})
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-sky-200 border border-blue-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              Akreditasi {prodi.accreditation}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-slate-200 border border-white/20">
              Jenjang {prodi.degreeLevel} • {prodi.faculty.code}
            </span>
          </motion.div>

          {/* Main Title & Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl space-y-3"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {prodi.name}
            </h1>
            <p className="text-base sm:text-xl font-semibold text-sky-300 italic">
              {prodi.englishName}
            </p>
            <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
              {prodi.tagline}
            </p>
          </motion.div>

          {/* Fast Metrics Row (5 Cards) with Motion Stagger */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 pb-6"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 hover:bg-white/15 transition-colors">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-sky-300" />
                Jenjang Studi
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Program {prodi.degreeLevel}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 hover:bg-white/15 transition-colors">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                Masa Studi
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {prodi.duration}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 hover:bg-white/15 transition-colors">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                Beban SKS
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {prodi.totalSks}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 hover:bg-white/15 transition-colors">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-sky-300" />
                Pola Pembelajaran
              </div>
              <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                {prodi.studyMode}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 col-span-2 sm:col-span-1 hover:bg-white/15 transition-colors">
              <div className="text-slate-300 text-[10.5px] font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-300" />
                Lokasi Kampus
              </div>
              <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                Surakarta, Solo
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2.5 pt-1"
          >
            <a 
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Daftar PMB 2026/2027</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link 
              href="/ebrochure"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-sky-300" />
              <span>Unduh Silabus &amp; Brosur</span>
            </Link>

            <a 
              href={`https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(prodi.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Konsultasi WhatsApp</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="cursor-pointer inline-flex items-center gap-1 px-3 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 text-xs font-medium border border-white/10 transition-all ml-auto"
              title="Salin tautan prodi ini"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-sky-300 text-[11px]">Tersalin</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Bagikan</span>
                </>
              )}
            </button>
          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECTION: WIDGET INTERAKTIF SPESIFIK BIDANG ILMU         */}
      {/* ========================================================= */}
      <section className="py-14 bg-[#07172b] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className="inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 bg-blue-600/30 text-sky-300 border border-blue-400/30">
                {theme.widget.badge}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {theme.widget.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {theme.widget.subtitle}
            </p>
          </div>

          {/* Interactive Widget Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {theme.widget.items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/5 border border-white/10 hover:border-blue-400/50 rounded-2xl p-5 backdrop-blur-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-sky-300 uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-900/60 border border-blue-500/30">
                      {item.tag || `Pilar 0${idx + 1}`}
                    </span>
                    {item.metric && (
                      <span className="text-[11px] font-extrabold text-blue-300">
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: RINGKASAN & PEMINATAN STUDI                    */}
      {/* ========================================================= */}
      <section id="peminatan" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Ringkasan Profil */}
          <div id="ringkasan" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <School className="w-3.5 h-3.5 text-blue-600" />
                <span>Profil Program Studi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
                Mempersiapkan Ahli Berdaya Saing Global
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prodi.overview.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
                Keunggulan Utama Program:
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Kurikulum Terintegrasi Standar Industri Nasional &amp; Internasional</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Dosen Pembimbing Akademisi &amp; Praktisi Korporat Triputra Group</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Laboratorium Terpadu &amp; Akses Magang Kerja Nyata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Konsentrasi / Peminatan */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                SPECIALIZATION TRACKS
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Pilihan Peminatan &amp; Konsentrasi Keahlian
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {prodi.specializations.map((spec, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h4 className="text-sm font-bold text-[#0b2545]">
                      {spec.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Showcase Dosen & Kaprodi */}
          <div id="dosen" className="pt-10 space-y-8 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                FAKULTAS &amp; TENAGA PENGAJAR
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Dosen &amp; Kaprodi {prodi.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Dibimbing oleh dosen bergelar S2 &amp; S3 dari perguruan tinggi terkemuka serta praktisi industri berpengalaman.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dosenList.map((dosen, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                    dosen.isKaprodi ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
                  }`}
                >
                  <div>
                    {/* Foto Dosen */}
                    <div className="relative aspect-4/5 bg-slate-100 overflow-hidden">
                      {dosen.photo ? (
                        <img
                          src={dosen.photo}
                          alt={dosen.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback Avatar */}
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06172e] to-[#0b2545] text-white ${dosen.photo ? "hidden" : "flex"}`}>
                        <div className="text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-xl font-black mb-2 border border-white/20">
                            {dosen.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-200">
                            Dosen UPITRA
                          </span>
                        </div>
                      </div>

                      {/* Badge Kaprodi */}
                      {dosen.isKaprodi && (
                        <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          Kaprodi
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-2">
                      <div>
                        <div className="text-xs font-bold text-[#0b2545] leading-snug line-clamp-2">
                          {dosen.name}
                        </div>
                        <div className="text-[11px] text-blue-600 font-medium mt-0.5">
                          {dosen.role}
                        </div>
                      </div>
                      {dosen.expertise && (
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          Keahlian: {dosen.expertise}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: KURIKULUM & TAHAPAN STUDI (Animated Tabs)     */}
      {/* ========================================================= */}
      <section id="kurikulum" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              ACADEMIC ROADMAP
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              Kurikulum &amp; Tahapan Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Total {prodi.totalSks} dirancang dalam 8 tahapan semester terpadu dari penguasaan fondasi hingga magang industri riil.
            </p>
          </div>

          {/* Semester Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {prodi.curriculumStages.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCurriculumTab(idx)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCurriculumTab === idx
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {c.year} - {c.stageTitle}
              </button>
            ))}
          </div>

          {/* Animated Tab Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            {prodi.curriculumStages[activeCurriculumTab] && (
              <motion.div
                key={activeCurriculumTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-[#0b2545]">
                      {prodi.curriculumStages[activeCurriculumTab].year} — {prodi.curriculumStages[activeCurriculumTab].stageTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl">
                      {prodi.curriculumStages[activeCurriculumTab].description}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold w-fit shrink-0">
                    Tahapan Studi
                  </div>
                </div>

                {/* Course Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prodi.curriculumStages[activeCurriculumTab].courses.map((course, cIdx) => (
                    <div 
                      key={cIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs font-semibold text-slate-800"
                    >
                      <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                        {cIdx + 1}
                      </div>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: PROSPEK KARIR & LAPANGAN KERJA INDUSTRI       */}
      {/* ========================================================= */}
      <section id="karir" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              CAREER OPPORTUNITIES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              Prospek Karir &amp; Lapangan Kerja Luas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Lulusan {prodi.name} dipersiapkan berkiprah sebagai profesional korporat, konsultan spesialis, dan wirausahawan inovatif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prodi.careerPaths.map((cp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {cp.category}
                  </span>
                  <h3 className="text-sm font-black text-[#0b2545]">
                    {cp.role}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: FASILITAS LABORATORIUM & STUDIO               */}
      {/* ========================================================= */}
      <section id="fasilitas" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              LEARNING FACILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              Fasilitas Laboratorium &amp; Riset Terpadu
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Sarana modern kampus UPITRA Solo yang dirancang untuk riset terapan dan simulasi kerja industri nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prodi.facilities.map((fac, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Fasilitas 0{idx + 1}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-black text-[#0b2545]">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION: BEASISWA TRIPUTRA PEDULI                      */}
      {/* ========================================================= */}
      <section id="biaya" className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Kolom Kiri: Info Admisi & Konsultasi Biaya */}
            <div className="lg:col-span-5 bg-[#0b2545] text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-5">
              <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-500 text-white tracking-wider uppercase">
                INFORMASI ADMISI PMB
              </span>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Konsultasi Biaya &amp; Beasiswa
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Dapatkan rincian skema pembiayaan studi yang transparan, kemudahan cicilan, serta panduan pendaftaran beasiswa melalui layanan admisi resmi UPITRA.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-blue-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Transparansi biaya tanpa pungutan tersembunyi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Tersedia skema cicilan pembayaran fleksibel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Subsidi beasiswa prestasi &amp; jalur kemitraan</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 px-4 rounded-xl font-bold text-xs text-center bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all"
                >
                  DAFTAR PMB ONLINE
                </a>
                <a
                  href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20biaya%20dan%20beasiswa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-2.5 px-4 rounded-xl font-bold text-xs text-center bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                >
                  KONSULTASI VIA WHATSAPP
                </a>
              </div>
            </div>

            {/* Kolom Kanan: Program Beasiswa */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Program Beasiswa Triputra Peduli</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Beasiswa Penuh s/d 100% Bebas Uang Gedung
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                UPITRA berkomitmen agar setiap talenta muda berprestasi dan berkarakter kuat dapat menempuh pendidikan tinggi tanpa terhalang kendala finansial melalui program beasiswa korporasi Triputra Group.
              </p>

              <div className="space-y-2.5">
                {prodi.scholarships.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800">{s}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5"
                >
                  <span>Syarat &amp; Prosedur Pengajuan Beasiswa PMB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION: FAQ ACCORDION (Framer Motion Height)          */}
      {/* ========================================================= */}
      <section id="faq" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Pertanyaan Umum Seputar {prodi.name}
            </h2>
          </div>

          <div className="space-y-3">
            {prodi.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="cursor-pointer w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SECTION: CTA PENDAFTARAN PMB                           */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#06172e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Penerimaan Mahasiswa Baru TA 2026 / 2027</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Mulai Perjalanan Akademik Anda di {prodi.name} UPITRA
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Daftar sekarang untuk mengamankan kuota program studi pilihan Anda dan raih kesempatan beasiswa penuh dari Triputra Group.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/40 transition-all hover:scale-105"
            >
              <span>Daftar PMB Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20mendaftar%20${encodeURIComponent(prodi.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Admisi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. SECTION: PROGRAM STUDI TERKAIT                        */}
      {/* ========================================================= */}
      {relatedProdi.length > 0 && (
        <section className="py-14 sm:py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase">
                  EXPLORE MORE PROGRAMS
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] tracking-tight">
                  Program Studi Terkait di {prodi.faculty.name}
                </h3>
              </div>
              <Link
                href="/programs"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProdi.map((r, idx) => (
                <Link
                  key={idx}
                  href={`/${r.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                      Jenjang {r.degreeLevel} • Gelar {r.degreeTitle}
                    </span>
                    <h4 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors">
                      {r.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {r.tagline}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Lihat Rincian Program</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
