"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ChevronsRight,
  GraduationCap
} from "lucide-react";

interface ProgramItem {
  id: string;
  name: string;
  slug: string;
  degreeLevel: string;
  degreeTitle?: string | null;
  accreditation: string;
  campusLocation: string;
  shortDesc?: string | null;
  careerProspect?: string | null;
  tuitionFeeEst?: number | string | null;
  coverImage?: string | null;
  faculty?: {
    name: string;
    code: string;
  } | null;
}

const defaultPrograms: ProgramItem[] = [
  // 1. FAKULTAS SAINS & TECHNOLOGY (FST)
  {
    id: "fst-1",
    name: "Informatics – Software Architecture & AI",
    slug: "informatika",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Mencetak Software Engineer, AI Specialist, dan Cloud Architect berkarakter unggul yang siap berkiprah di industri teknologi nasional dan global.",
    careerProspect: "Software Engineer, Full-Stack Developer, AI/Machine Learning Specialist, Cloud Architect",
    tuitionFeeEst: 6500000,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Fakultas Sains & Technology", code: "FST" }
  },
  {
    id: "fst-2",
    name: "Information Systems – Enterprise & Data Science",
    slug: "sistem-informasi",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Menjembatani strategi transformasi proses bisnis perusahaan dengan tata kelola data intelijen dan sistem enterprise modern.",
    careerProspect: "Business Analyst, ERP Specialist, Data Analyst, Product Manager, IT Quality Assurance",
    tuitionFeeEst: 6500000,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Fakultas Sains & Technology", code: "FST" }
  },
  {
    id: "fst-3",
    name: "Software Engineering (Rekayasa Perangkat Lunak)",
    slug: "rekayasa-perangkat-lunak",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Fokus mendalam pada siklus hidup rekayasa software skala besar, clean architecture, DevOps, dan QA testing automation.",
    careerProspect: "DevOps Engineer, QA Automation Engineer, Mobile Application Architect, Software Project Lead",
    tuitionFeeEst: 6500000,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Fakultas Sains & Technology", code: "FST" }
  },

  // 2. FAKULTAS SOCIAL HUMANIORA (FSH)
  {
    id: "fsh-1",
    name: "Hospitality & Tourism Business (Pariwisata)",
    slug: "pariwisata",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Par.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Mencetak profesional dan manajer industri perhotelan bintang lima, manajemen destinasi wisata, serta MICE internasional.",
    careerProspect: "Hotel General Manager, Event & MICE Director, Tourism Destination Planner, Travel Consultant",
    tuitionFeeEst: 5800000,
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Fakultas Social Humaniora", code: "FSH" }
  },
  {
    id: "fsh-2",
    name: "English for Business & Communication",
    slug: "bahasa-inggris",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Li.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Mengasah kemahiran komunikasi bahasa Inggris tingkat tinggi untuk negosiasi bisnis internasional, diplomasi, dan media korporat.",
    careerProspect: "Corporate Communication Specialist, Professional Translator & Interpreter, International PR Officer",
    tuitionFeeEst: 5500000,
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Fakultas Social Humaniora", code: "FSH" }
  },

  // 3. FAKULTAS EKONOMIKA & BUSSINESS (FEB)
  {
    id: "feb-1",
    name: "International Business Management (IBM)",
    slug: "manajemen",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.M.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Mencetak pemimpin bisnis dan manajer operasional korporat dengan keunggulan strategic thinking, kepemimpinan, dan digital marketing.",
    careerProspect: "Business Development Manager, Marketing Director, Operations Executive, Business Consultant",
    tuitionFeeEst: 6000000,
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Faculty Ekonomic & Bussiness", code: "FEB" }
  },
  {
    id: "feb-2",
    name: "Accounting & Digital Finance",
    slug: "akuntansi",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Ak.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Menghasilkan akuntan publik, auditor keuangan, dan financial analyst berintegritas tinggi dengan penguasaan teknologi audit digital.",
    careerProspect: "Auditor Kantor Akuntan Publik (KAP), Tax Consultant, Financial Controller, Corporate Accountant",
    tuitionFeeEst: 6000000,
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Faculty Ekonomic & Bussiness", code: "FEB" }
  },

  // 4. FACULTY HEALTH (FH)
  {
    id: "fh-1",
    name: "Kesehatan & Keselamatan Kerja (K3)",
    slug: "kesehatan-dan-keselamatan-kerja",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Tr.Kes.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Mencetak ahli K3 korporat, auditor keselamatan kerja industri, dan perancang sistem manajemen HSE di sektor manufaktur, perkebunan, dan konstruksi.",
    careerProspect: "HSE Officer, K3 Industrial Specialist, Safety Auditor, Ergonomics Consultant, Corporate Risk Assessor",
    tuitionFeeEst: 5800000,
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Faculty Health", code: "FH" }
  },
  {
    id: "fh-2",
    name: "Fisioterapi (Physiotherapy)",
    slug: "fisioterapi",
    degreeLevel: "BACHELOR",
    degreeTitle: "S.Ft.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Menghasilkan fisioterapis klinis profesional dan sport injury specialist berstandar internasional yang terampil dalam terapi rehabilitasi medik.",
    careerProspect: "Fisioterapis Rumah Sakit, Sports Physiotherapist, Neuro-Pediatric Physical Therapist, Wellness & Rehab Director",
    tuitionFeeEst: 6000000,
    coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Faculty Health", code: "FH" }
  },
  {
    id: "fh-3",
    name: "Keperawatan (Nursing)",
    slug: "keperawatan",
    degreeLevel: "DIPLOMA",
    degreeTitle: "A.Md.Kep.",
    accreditation: "Baik Sekali",
    campusLocation: "Surakarta",
    shortDesc: "Membekali tenaga vokasi perawat terampil, tanggap gawat darurat, dan berdedikasi tinggi dengan etika compassion serta kemitraan rumah sakit jejaring.",
    careerProspect: "Perawat Klinis Rumah Sakit & Klinik, Perawat ICU/UGD, Home Care Specialist, Medical Assistant Triputra Care",
    tuitionFeeEst: 5200000,
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    faculty: { name: "Faculty Health", code: "FH" }
  },
];

export default function ProgramFinder({ initialPrograms }: { initialPrograms?: ProgramItem[] }) {
  const programs = initialPrograms && initialPrograms.length > 0 ? initialPrograms : defaultPrograms;
  const [selectedFaculty, setSelectedFaculty] = useState<string>("ALL");

  const faculties = [
    { code: "ALL", label: "SEMUA FAKULTAS" },
    { code: "FST", label: "FACULTY SAINS & TECHNOLOGY" },
    { code: "FEB", label: "FACULTY EKONOMIC & BUSSINESS" },
    { code: "FSH", label: "FACULTY SOCIAL HUMANIORA" },
    { code: "FH", label: "FACULTY HEALTH" },
  ];

  const filteredPrograms = programs.filter((p) => {
    return (
      selectedFaculty === "ALL" ||
      (p.faculty && (p.faculty.code === selectedFaculty || p.faculty.code === "FKES"))
    );
  });

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200" id="program-akademik">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading Persis ciputra.ac.id */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
            PROGRAM AKADEMIK SARJANA (S1) & DIPLOMA (D3)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
            YOUR FUTURE STARTS HERE
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Pilih jalur karir masa depan Anda melalui 4 Fakultas Unggulan UPITRA dengan bimbingan akademisi dan mentor industri.
          </p>
        </div>

        {/* Tab Navigation Persis Ciputra */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {faculties.map((f) => (
            <button
              key={f.code}
              onClick={() => setSelectedFaculty(f.code)}
              className={`px-5 py-3 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedFaculty === f.code
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Program Cards Grid Persis Ciputra */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Accreditation Tag */}
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <img
                  src={prog.coverImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"}
                  alt={prog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-[#0b2545]/90 backdrop-blur-sm text-white text-[11px] font-bold shadow-sm">
                    {prog.degreeLevel === "DIPLOMA" ? "D3" : "S1"} {prog.degreeTitle ? `(${prog.degreeTitle})` : ""}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-sky-200" />
                    {prog.accreditation}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {prog.faculty?.name || "UPITRA Surakarta"}
                  </div>
                  <h3 className="text-base font-extrabold text-[#0b2545] group-hover:text-blue-600 transition-colors leading-snug">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {prog.shortDesc}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Lokasi Kampus
                    </div>
                    <div className="text-xs font-bold text-[#0b2545]">
                      Kampus {prog.campusLocation}
                    </div>
                  </div>

                  <Link
                    href={`/${prog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Selengkapnya</span>
                    <ChevronsRight className="w-4 h-4 text-blue-600" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
