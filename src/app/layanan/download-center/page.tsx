"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import { 
  Download, 
  FileText, 
  Eye, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  Phone, 
  X,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  GraduationCap
} from "lucide-react";

export interface BrochureItem {
  id: string;
  title: string;
  faculty: "all_pmb" | "fst" | "feb" | "fsh" | "fh";
  facultyName: string;
  degree: string;
  degreeTitle: string;
  fileSize: string;
  coverImage: string;
  pdfUrl: string;
  description: string;
  highlights: string[];
}

export const downloadBrochuresList: BrochureItem[] = [
  // 1. BROSUR UMUM PMB
  {
    id: "pmb-general",
    title: "Brosur PMB & Panduan Akademik 2026/2027",
    faculty: "all_pmb",
    facultyName: "Universitas Pignatelli Triputra",
    degree: "S1 & D3",
    degreeTitle: "Prospectus Resmi",
    fileSize: "6.2 MB",
    coverImage: "/images/brochures/1788939036_6aa10b1c44527.jpg",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1791794242_6acc9c42b5951.pdf",
    description: "Panduan resmi penerimaan mahasiswa baru UPITRA, skema beasiswa Triputra Peduli (potongan SPP s/d 100%), jadwal pendaftaran jalur tanpa tes, dan profil ekosistem kampus.",
    highlights: ["Jalur Rapor Bebas Tes", "Beasiswa Prestasi Triputra", "Estimasi Biaya Kuliah & Asrama", "Fasilitas Kampus Surakarta"],
  },

  // 2. FACULTY SAINS & TECHNOLOGY (FST)
  {
    id: "fst-inf",
    title: "E-Brosur S1 Informatika (Computer Science)",
    faculty: "fst",
    facultyName: "Fakultas Sains & Teknologi",
    degree: "S1",
    degreeTitle: "S.Kom.",
    fileSize: "19.5 MB",
    coverImage: "/images/brochures/1781243989_6a2ba055e65df.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157527_S1 Informatika.pdf",
    description: "Kurikulum berbasis rekayasa software modern, kecerdasan buatan (AI/ML), cloud computing, dan jalur magang industri langsung ke Triputra Group.",
    highlights: ["Software Engineering & Architecture", "Artificial Intelligence & Data Science", "Cloud & Cybersecurity", "Magang Industri Bersertifikat"],
  },
  {
    id: "fst-se",
    title: "E-Brosur S1 Rekayasa Perangkat Lunak (Software Engineering)",
    faculty: "fst",
    facultyName: "Fakultas Sains & Teknologi",
    degree: "S1",
    degreeTitle: "S.Kom.",
    fileSize: "17.4 MB",
    coverImage: "/images/brochures/1781244302_6a2ba18e4cad2.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157663_S1 Sofware engineering.pdf",
    description: "Fokus mendalam pada siklus rekayasa perangkat lunak skala enterprise, metodologi agile modern, DevOps automation, dan QA software testing.",
    highlights: ["Enterprise Microservices Architecture", "DevOps & CI/CD Pipelines", "Mobile & Web Platform Engineering", "Lab Komputasi FST"],
  },
  {
    id: "fst-si",
    title: "E-Brosur S1 Sistem Informasi (Information Systems)",
    faculty: "fst",
    facultyName: "Fakultas Sains & Teknologi",
    degree: "S1",
    degreeTitle: "S.Kom.",
    fileSize: "18.2 MB",
    coverImage: "/images/brochures/1781243035_6a2b9c9b505a7.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157341_S1 Sistem Informasi.pdf",
    description: "Menjembatani strategi transformasi bisnis perusahaan dengan analisis big data, Enterprise Resource Planning (ERP), dan tata kelola teknologi informasi korporasi.",
    highlights: ["Business Process Automation", "ERP & Enterprise Systems", "Big Data Analytics", "IT Governance & Strategy"],
  },

  // 3. FACULTY EKONOMI & BISNIS (FEB)
  {
    id: "feb-man",
    title: "E-Brosur S1 Manajemen Bisnis (Business Management)",
    faculty: "feb",
    facultyName: "Fakultas Ekonomi & Bisnis",
    degree: "S1",
    degreeTitle: "S.M.",
    fileSize: "20.8 MB",
    coverImage: "/images/brochures/1781244311_6a2ba19746727.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781152364_S1  Manajemen.pdf",
    description: "Membekali calon wirausahawan dan manajer operasional korporat dengan keunggulan strategic thinking, supply chain management, dan digital marketing.",
    highlights: ["Corporate Strategic Planning", "Supply Chain & Agribusiness Management", "Digital Marketing & Brand Strategy", "Inkubasi Bisnis UPITRA"],
  },
  {
    id: "feb-akt",
    title: "E-Brosur S1 Akuntansi (Accounting & Digital Finance)",
    faculty: "feb",
    facultyName: "Fakultas Ekonomi & Bisnis",
    degree: "S1",
    degreeTitle: "S.Ak.",
    fileSize: "17.1 MB",
    coverImage: "/images/brochures/1781243921_6a2ba0118eb8a.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157699_S1 Akuntansi.pdf",
    description: "Menghasilkan akuntan publik, auditor keuangan, dan financial analyst berintegritas tinggi dengan penguasaan teknologi audit digital dan standar IFRS.",
    highlights: ["Audit & Financial Reporting IFRS", "Digital Tax & Corporate Accounting", "Forensic Accounting & Risk Analysis", "Kerjasama Kantor Akuntan Publik"],
  },

  // 4. FACULTY SOSIAL HUMANIORA (FSH)
  {
    id: "fsh-par",
    title: "E-Brosur S1 Pariwisata (Hospitality & Tourism)",
    faculty: "fsh",
    facultyName: "Fakultas Sosial Humaniora",
    degree: "S1",
    degreeTitle: "S.Par.",
    fileSize: "21.2 MB",
    coverImage: "/images/brochures/1781244224_6a2ba140c96d9.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157500_S1 Pariwisata.pdf",
    description: "Mencetak profesional manajemen perhotelan bintang lima, penyelenggara MICE internasional, dan perencana destinasi pariwisata berkelanjutan.",
    highlights: ["International Hotel & Resort Management", "MICE & Event Production", "Cultural & Heritage Tourism", "Lab Simulasi Perhotelan FSH"],
  },
  {
    id: "fsh-ing",
    title: "E-Brosur S1 Bahasa Inggris (English for Business)",
    faculty: "fsh",
    facultyName: "Fakultas Sosial Humaniora",
    degree: "S1",
    degreeTitle: "S.Li.",
    fileSize: "16.9 MB",
    coverImage: "/images/brochures/1781244787_6a2ba373177a4.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157727_S1 Bahasa Inggris.pdf",
    description: "Mengasah kemahiran komunikasi bahasa Inggris tingkat tinggi untuk negosiasi bisnis multinasional, diplomasi internasional, dan penerjemahan profesional.",
    highlights: ["Global Business Communication", "Professional Translation & Interpreting", "Corporate PR & Public Speaking", "Studio Bahasa Multimedia"],
  },

  // 5. FACULTY KESEHATAN (FH)
  {
    id: "fh-k3",
    title: "E-Brosur S1 Keselamatan & Kesehatan Kerja (K3)",
    faculty: "fh",
    facultyName: "Fakultas Kesehatan",
    degree: "S1",
    degreeTitle: "S.Tr.Kes.",
    fileSize: "18.5 MB",
    coverImage: "/images/brochures/1781245590_6a2ba6961cc0c.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1783049270_6a472c36e0a11.pdf",
    description: "Mencetak ahli K3 korporat, auditor keselamatan kerja industri manufaktur, pertambangan, dan perancang sistem manajemen HSE bersama Triputra Group.",
    highlights: ["Industrial Safety & Ergonomics", "HSE Management Systems (SMK3)", "Industrial Hygiene & Toxicology", "Praktek Industri Lapangan"],
  },
  {
    id: "fh-fis",
    title: "E-Brosur S1 Fisioterapi (Physiotherapy)",
    faculty: "fh",
    facultyName: "Fakultas Kesehatan",
    degree: "S1",
    degreeTitle: "S.Ft.",
    fileSize: "19.1 MB",
    coverImage: "/images/brochures/1781245748_6a2ba734e352e.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157992_S1 Fisioterapi.pdf",
    description: "Fisioterapi klinis profesional, rehabilitasi muskuloskeletal, neuromuskular, penanganan cedera olahraga, dan rehabilitasi pascaoperasi medik.",
    highlights: ["Musculoskeletal Rehabilitation", "Sports Physiotherapy & Rehab", "Neuro-Pediatric Physical Therapy", "Jejaring Rumah Sakit Mitra"],
  },
  {
    id: "fh-kep",
    title: "E-Brosur D3 Keperawatan (Nursing)",
    faculty: "fh",
    facultyName: "Fakultas Kesehatan",
    degree: "D3",
    degreeTitle: "A.Md.Kep.",
    fileSize: "15.4 MB",
    coverImage: "/images/banners/hero-pmb.jpg",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1791794242_6acc9c42b5951.pdf",
    description: "Membekali perawat vokasi yang terampil, tanggap gawat darurat, dan beretika compassion dengan laboratorium keperawatan lengkap dan praktek klinis rumah sakit.",
    highlights: ["Keperawatan Medikal Bedah", "Kegawatdaruratan & Critical Care", "Asuhan Keperawatan Maternitas", "Kerjasama Rumah Sakit di Surakarta"],
  },
];

export default function DownloadCenterPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewBrochure, setPreviewBrochure] = useState<BrochureItem | null>(null);

  const facultyTabs = [
    { id: "all", label: "SEMUA DOKUMEN & BROSUR (11)" },
    { id: "all_pmb", label: "PANDUAN PMB & BEASISWA" },
    { id: "fst", label: "FAKULTAS SAINS & TEKNOLOGI" },
    { id: "feb", label: "FAKULTAS EKONOMI & BISNIS" },
    { id: "fsh", label: "FAKULTAS SOSIAL HUMANIORA" },
    { id: "fh", label: "FAKULTAS KESEHATAN" },
  ];

  const filteredBrochures = useMemo(() => {
    return downloadBrochuresList.filter((b) => {
      const matchFaculty = selectedFaculty === "all" || b.faculty === selectedFaculty;
      const matchSearch = searchQuery.trim() === "" || 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.degreeTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFaculty && matchSearch;
    });
  }, [selectedFaculty, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION - Deep Blue Executive Theme */}
        <section className="bg-gradient-to-r from-[#06172e] via-[#0b2545] to-[#0f3b73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto space-y-5 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-sky-300">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <span>/</span>
              <Link href="/layanan" className="hover:text-white transition-colors">Layanan</Link>
              <span>/</span>
              <span className="text-white font-semibold">Download Center</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Pusat Unduhan &amp; E-Brosur Resmi UPITRA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl">
              Download Center Universitas Pignatelli Triputra
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
              Dapatkan dokumen resmi, e-brosur program studi, kurikulum akademik, informasi jalur beasiswa Triputra Peduli 100%, serta formulir pendaftaran mahasiswa baru langsung dalam format PDF siap unduh.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs text-sky-200">
              <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-blue-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Format PDF Resolusi Tinggi</span>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-blue-700/60">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>100% Bebas Biaya &amp; Resmi</span>
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-blue-700/60">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>4 Fakultas &amp; 10 Program Studi</span>
              </span>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER BAR */}
        <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari brosur jurusan, kurikulum, atau fakultas..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all text-[#0b2545]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Direct PMB Action */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
                >
                  <span>Daftar PMB Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {facultyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFaculty(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFaculty === tab.id
                      ? "bg-blue-600 text-white shadow-xs shadow-blue-500/25 scale-102"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* BROCHURES GRID */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBrochures.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2545]">Brosur Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tidak ada dokumen brosur yang sesuai dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba kata kunci lain atau reset filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFaculty("all");
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBrochures.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  {/* Cover Image Container */}
                  <div className="relative h-60 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 opacity-92 group-hover:opacity-100"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes("/images/banners/hero-pmb.jpg")) {
                          target.src = "/images/banners/hero-pmb.jpg";
                        }
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-[#06172e]/90 text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs">
                        {item.degree} • {item.degreeTitle}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-bold shadow-xs">
                        {item.fileSize}
                      </span>
                    </div>

                    {/* Faculty Tag at bottom of cover */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                      <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
                        {item.facultyName}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="text-base sm:text-lg font-black text-[#0b2545] group-hover:text-blue-600 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Fokus &amp; Keunggulan
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.highlights.slice(0, 3).map((hl, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                            >
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Unduh PDF & Pratinjau */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                      {/* Tombol Unduh Brosur PDF Utama */}
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all text-center"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh PDF</span>
                      </a>

                      {/* Tombol Pratinjau Interaktif */}
                      <button
                        onClick={() => setPreviewBrochure(item)}
                        title="Pratinjau Brosur"
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-all cursor-pointer active:scale-95 shrink-0"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM CONSULTATION & PMB BANNER */}
        <section className="bg-slate-100 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#06172e] via-[#0b2545] to-[#0f3b73] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Pusat Konsultasi &amp; Pendaftaran PMB
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Butuh Bantuan Memilih Program Studi?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Tim Admisi UPITRA siap membantu Anda dan orang tua memberikan konsultasi pemilihan jurusan, rincian biaya studi, serta simulasi Beasiswa Triputra Peduli 100%.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20brosur%20dan%20pendaftaran%20kuliah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Chat WA Admisi</span>
              </a>

              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* MODAL PRATINJAU BROSUR */}
        {previewBrochure && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0b2545] line-clamp-1">
                      {previewBrochure.title}
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      {previewBrochure.facultyName} • {previewBrochure.fileSize}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewBrochure(null)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Image Preview */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[50vh] flex items-center justify-center">
                  <img
                    src={previewBrochure.coverImage}
                    alt={previewBrochure.title}
                    className="max-h-[50vh] w-auto object-contain mx-auto"
                  />
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
                    Deskripsi Program
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {previewBrochure.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h5 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
                    Mata Kuliah &amp; Fokus Utama
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {previewBrochure.highlights.map((hl, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[11px] font-medium">
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
                <button
                  onClick={() => setPreviewBrochure(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Tutup
                </button>

                <a
                  href={previewBrochure.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Brosur PDF ({previewBrochure.fileSize})</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
