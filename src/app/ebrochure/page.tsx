"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  ShieldCheck
} from "lucide-react";

interface BrochureItem {
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

const brochureList: BrochureItem[] = [
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
    facultyName: "Faculty Sains & Technology",
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
    title: "E-Brosur S1 Software Engineering",
    faculty: "fst",
    facultyName: "Faculty Sains & Technology",
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
    facultyName: "Faculty Sains & Technology",
    degree: "S1",
    degreeTitle: "S.Kom.",
    fileSize: "18.2 MB",
    coverImage: "/images/brochures/1781243035_6a2b9c9b505a7.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157341_S1 Sistem Informasi.pdf",
    description: "Menjembatani strategi transformasi bisnis perusahaan dengan analisis big data, Enterprise Resource Planning (ERP), dan tata kelola teknologi informasi korporasi.",
    highlights: ["Business Process Automation", "ERP & Enterprise Systems", "Big Data Analytics", "IT Governance & Strategy"],
  },

  // 3. FACULTY EKONOMIC & BUSSINESS (FEB)
  {
    id: "feb-man",
    title: "E-Brosur S1 Manajemen Bisnis (Business Management)",
    faculty: "feb",
    facultyName: "Faculty Ekonomic & Bussiness",
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
    facultyName: "Faculty Ekonomic & Bussiness",
    degree: "S1",
    degreeTitle: "S.Ak.",
    fileSize: "17.1 MB",
    coverImage: "/images/brochures/1781243921_6a2ba0118eb8a.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157699_S1 Akuntansi.pdf",
    description: "Menghasilkan akuntan publik, auditor keuangan, dan financial analyst berintegritas tinggi dengan penguasaan teknologi audit digital dan standar IFRS.",
    highlights: ["Audit & Financial Reporting IFRS", "Digital Tax & Corporate Accounting", "Forensic Accounting & Risk Analysis", "Kerjasama Kantor Akuntan Publik"],
  },

  // 4. FACULTY SOCIAL HUMANIORA (FSH)
  {
    id: "fsh-par",
    title: "E-Brosur S1 Pariwisata (Hospitality & Tourism)",
    faculty: "fsh",
    facultyName: "Faculty Social Humaniora",
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
    facultyName: "Faculty Social Humaniora",
    degree: "S1",
    degreeTitle: "S.Li.",
    fileSize: "16.9 MB",
    coverImage: "/images/brochures/1781244787_6a2ba373177a4.png",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1781157727_S1 Bahasa Inggris.pdf",
    description: "Mengasah kemahiran komunikasi bahasa Inggris tingkat tinggi untuk negosiasi bisnis multinasional, diplomasi internasional, dan penerjemahan profesional.",
    highlights: ["Global Business Communication", "Professional Translation & Interpreting", "Corporate PR & Public Speaking", "Studio Bahasa Multimedia"],
  },

  // 5. FACULTY HEALTH (FH)
  {
    id: "fh-k3",
    title: "E-Brosur S1 Keselamatan & Kesehatan Kerja (K3)",
    faculty: "fh",
    facultyName: "Faculty Health",
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
    facultyName: "Faculty Health",
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
    facultyName: "Faculty Health",
    degree: "D3",
    degreeTitle: "A.Md.Kep.",
    fileSize: "15.4 MB",
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    pdfUrl: "https://www.upitra.ac.id/files/brochures/1791794242_6acc9c42b5951.pdf",
    description: "Membekali perawat vokasi yang terampil, tanggap gawat darurat, dan beretika compassion dengan laboratorium keperawatan lengkap dan praktek klinis rumah sakit.",
    highlights: ["Keperawatan Medikal Bedah", "Kegawatdaruratan & Critical Care", "Asuhan Keperawatan Maternitas", "Kerjasama Rumah Sakit di Surakarta"],
  },
];

export default function EBrochurePage() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [previewBrochure, setPreviewBrochure] = useState<BrochureItem | null>(null);

  const facultyTabs = [
    { id: "all", label: "SEMUA E-BROSUR (11)" },
    { id: "all_pmb", label: "PANDUAN PMB UMUM" },
    { id: "fst", label: "FACULTY SAINS & TECH" },
    { id: "feb", label: "FACULTY EKONOMIC & BUSSINESS" },
    { id: "fsh", label: "FACULTY SOCIAL HUMANIORA" },
    { id: "fh", label: "FACULTY HEALTH" },
  ];

  const filteredBrochures = selectedFaculty === "all"
    ? brochureList
    : brochureList.filter((b) => b.faculty === selectedFaculty);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section - Blue & White Professional Theme */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white py-16 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Prospectus & Kurikulum Akademik Resmi 2026/2027
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              E-Brosur Universitas Pignatelli Triputra
            </h1>

            <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
              Unduh panduan resmi program studi <strong>Universitas Pignatelli Triputra (UPITRA)</strong> Surakarta. Temukan rincian mata kuliah, profil kompetensi lulusan, jalur beasiswa prestasi Triputra Peduli, serta estimasi biaya studi yang transparan.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-sky-200">
              <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-lg border border-blue-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Format PDF Resolusi Tinggi
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-lg border border-blue-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                100% Gratis Bebas Biaya
              </span>
              <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-lg border border-blue-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                4 Fakultas S1 & D3 Lengkap
              </span>
            </div>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section className="py-6 bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {facultyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFaculty(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFaculty === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Brochure Grid - Dipercantik, Berwibawa & Friendly User */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrochures.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Cover Image Container */}
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80";
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-[#0b2545]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                      {item.degree} • {item.degreeTitle}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/95 backdrop-blur-md text-white text-[10px] font-bold shadow-md flex items-center gap-1">
                      <FileText className="w-3 h-3 text-sky-200" />
                      PDF ({item.fileSize})
                    </span>
                  </div>

                  {/* Quick Preview Hover Trigger */}
                  <button
                    onClick={() => setPreviewBrochure(item)}
                    className="absolute inset-0 flex items-center justify-center bg-blue-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity cursor-pointer text-white font-bold text-xs gap-2"
                  >
                    <span className="px-4 py-2 rounded-full bg-white/20 border border-white/40 backdrop-blur-md shadow-lg flex items-center gap-1.5 hover:bg-white hover:text-blue-900 transition-colors">
                      <Eye className="w-4 h-4" />
                      Pratinjau Brosur
                    </span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>{item.facultyName}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0b2545] group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh PDF</span>
                    </a>

                    <button
                      onClick={() => setPreviewBrochure(item)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Pratinjau Brosur */}
        {previewBrochure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {previewBrochure.facultyName}
                  </span>
                  <h3 className="text-base font-bold text-[#0b2545]">
                    {previewBrochure.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewBrochure(null)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img
                      src={previewBrochure.coverImage}
                      alt={previewBrochure.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Jenjang Pendidikan</div>
                      <div className="text-sm font-bold text-[#0b2545]">
                        {previewBrochure.degree} ({previewBrochure.degreeTitle})
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Deskripsi Panduan</div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {previewBrochure.description}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase mb-1.5">Fokus Materi Brosur</div>
                      <div className="space-y-1">
                        {previewBrochure.highlights.map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
                      <div className="font-bold">Format Berkas: Dokumen PDF Resmi</div>
                      <div className="text-[11px] text-blue-700">Ukuran berkas sekitar {previewBrochure.fileSize}. Siap dibaca di ponsel pintar maupun komputer.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={previewBrochure.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Brosur PDF Sekarang</span>
                </a>

                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPreviewBrochure(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 font-bold text-xs text-center transition-colors"
                >
                  Daftar PMB Online &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Assistance Callout */}
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-[#0b2545] to-[#071f3d] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Layanan Informasi Admisi UPITRA
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Butuh Bantuan Konsultasi Pemilihan Jurusan?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tim Admisi UPITRA siap membantu memberikan penjelasan detail mengenai kurikulum, simulasi biaya kuliah per semester, serta kalkulasi beasiswa prestasi Triputra Peduli.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://wa.me/6281225008080?text=Halo%20Admisi%20UPITRA,%20saya%20sudah%20melihat%20E-Brosur%20dan%20ingin%20konsultasi%20pendaftaran%20PMB"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-200" />
                <span>Konsultasi via WhatsApp</span>
              </a>
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider border border-white/20 transition-all text-center"
              >
                Daftar PMB Online
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

