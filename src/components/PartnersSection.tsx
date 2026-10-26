"use client";

import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

interface PartnerItem {
  name: string;
  category: "triputra" | "industry" | "health_tourism" | "institution";
  categoryLabel: string;
  logo: string;
}

const officialPartners: PartnerItem[] = [
  // 1. TRIPUTRA GROUP & AFILIASI KORPORASI
  {
    name: "PT Triputra Agro Persada",
    category: "triputra",
    categoryLabel: "Triputra Group",
    logo: "/images/mitra/mitra17.png",
  },
  {
    name: "PT Persada Capital Investama",
    category: "triputra",
    categoryLabel: "Triputra Group",
    logo: "/images/mitra/1779420091_6a0fcbbb0181c.png",
  },
  {
    name: "PT Daya Adicipta Mustika",
    category: "triputra",
    categoryLabel: "Triputra Group",
    logo: "/images/mitra/1779428428_6a0fec4c95ef6.png",
  },
  {
    name: "PT Adaro Energy Indonesia Tbk",
    category: "triputra",
    categoryLabel: "Afiliasi Triputra",
    logo: "/images/mitra/mitra1.png",
  },
  {
    name: "PT Kirana Megatara Tbk",
    category: "triputra",
    categoryLabel: "Afiliasi Triputra",
    logo: "/images/mitra/mitra4.png",
  },
  {
    name: "PT Surya Semesta Internusa Tbk",
    category: "triputra",
    categoryLabel: "Afiliasi Triputra",
    logo: "/images/mitra/mitra14.png",
  },
  {
    name: "PT Sumber Energi Pangan",
    category: "triputra",
    categoryLabel: "Afiliasi Triputra",
    logo: "/images/mitra/mitra12.png",
  },
  {
    name: "PT Lintas Samudra Borneo Line",
    category: "triputra",
    categoryLabel: "Afiliasi Triputra",
    logo: "/images/mitra/mitra6.png",
  },

  // 2. INDUSTRI, FINANSIAL & MANUFAKTUR
  {
    name: "PT Konimex",
    category: "industry",
    categoryLabel: "Farmasi & Manufaktur",
    logo: "/images/mitra/mitra5.png",
  },
  {
    name: "PT Dan Liris",
    category: "industry",
    categoryLabel: "Tekstil & Garment",
    logo: "/images/mitra/mitra2.png",
  },
  {
    name: "PT Bursa Efek Indonesia (BEI)",
    category: "industry",
    categoryLabel: "Pasar Modal & Finansial",
    logo: "/images/mitra/1779420683_6a0fce0b533be.jfif",
  },
  {
    name: "PT Pegadaian",
    category: "industry",
    categoryLabel: "BUMN & Finansial",
    logo: "/images/mitra/mitra8.png",
  },
  {
    name: "BUMN Perum Perhutani",
    category: "industry",
    categoryLabel: "BUMN Kehutanan",
    logo: "/images/mitra/mitra9.png",
  },
  {
    name: "PT Asuransi Sinarmas",
    category: "industry",
    categoryLabel: "Asuransi & Finansial",
    logo: "/images/mitra/mitra13.png",
  },
  {
    name: "PT ATMI Solo",
    category: "industry",
    categoryLabel: "Presisi & Manufaktur",
    logo: "/images/mitra/1779420875_6a0fcecb13dc7.jfif",
  },
  {
    name: "PT ATMI IGI Center",
    category: "industry",
    categoryLabel: "Engineering & IT",
    logo: "/images/mitra/1779420768_6a0fce60e1788.png",
  },
  {
    name: "Solo Techno Park",
    category: "industry",
    categoryLabel: "Riset & Inkubasi Solo",
    logo: "/images/mitra/1779420221_6a0fcc3d58c8e.png",
  },
  {
    name: "PT Aksara Solopos",
    category: "industry",
    categoryLabel: "Media & Komunikasi",
    logo: "/images/mitra/1779420481_6a0fcd41b273d.jfif",
  },
  {
    name: "PT Tribun Network",
    category: "industry",
    categoryLabel: "Media Nasional",
    logo: "/images/mitra/1779420518_6a0fcd668edd3.png",
  },
  {
    name: "PT. Periplus Bookindo",
    category: "industry",
    categoryLabel: "Retail & Literasi",
    logo: "/images/mitra/mitra10.png",
  },

  // 3. KESEHATAN (FACULTY HEALTH) & PARIWISATA (FSH)
  {
    name: "PT Persada Medika Raya",
    category: "health_tourism",
    categoryLabel: "Kesehatan & Klinis",
    logo: "/images/mitra/mitra11.png",
  },
  {
    name: "PT Persada Medika Utama",
    category: "health_tourism",
    categoryLabel: "Layanan Kesehatan & RS",
    logo: "/images/mitra/1779428488_6a0fec886b0a8.jfif",
  },
  {
    name: "PT Legian Hotel Management",
    category: "health_tourism",
    categoryLabel: "Hospitality & Perhotelan",
    logo: "/images/mitra/mitra15.png",
  },
  {
    name: "Asosiasi Pelaku Pariwisata Indonesia",
    category: "health_tourism",
    categoryLabel: "Pariwisata & MICE",
    logo: "/images/mitra/1779428318_6a0febde89159.jfif",
  },
  {
    name: "Dinas Kebudayaan & Pariwisata Solo",
    category: "health_tourism",
    categoryLabel: "Destinasi & Budaya",
    logo: "/images/mitra/1779427866_6a0fea1a28584.png",
  },

  // 4. INSTITUSI PENDIDIKAN & PEMERINTAHAN
  {
    name: "Pemerintah Kota Surakarta",
    category: "institution",
    categoryLabel: "Pemerintah Daerah",
    logo: "/images/mitra/1779427606_6a0fe916773a0.png",
  },
  {
    name: "Pemerintah Provinsi Jawa Tengah",
    category: "institution",
    categoryLabel: "Pemerintah Provinsi",
    logo: "/images/mitra/1779428364_6a0fec0c82bb1.png",
  },
  {
    name: "Universitas Atma Jaya Yogyakarta",
    category: "institution",
    categoryLabel: "Kerjasama Akademik",
    logo: "/images/mitra/1779428394_6a0fec2a38709.png",
  },
  {
    name: "LLDIKTI Wilayah IV",
    category: "institution",
    categoryLabel: "Lembaga Pendidikan Tinggi",
    logo: "/images/mitra/1779427903_6a0fea3fd6285.png",
  },
  {
    name: "Benny Subianto Foundation",
    category: "institution",
    categoryLabel: "Yayasan Beasiswa & Pendidikan",
    logo: "/images/mitra/1779428069_6a0feae5a234e.jfif",
  },
];

export default function PartnersSection() {
  const row1 = officialPartners.slice(0, 22);
  const row2 = officialPartners.slice(22);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200 overflow-hidden" id="mitra-kerjasama">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-4 h-4 text-blue-600" />
            Jejaring Kolaborasi Resmi UPITRA
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
            MITRA UNIVERSITAS & REKOGNISI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Didukung langsung oleh <strong>Triputra Group</strong> serta jejaring korporasi, rumah sakit/klinik kesehatan, perbankan, dan institusi pemerintahan untuk menjamin kesempatan magang kerja dan penyaluran karir lulusan UPITRA.
          </p>
        </div>

      </div>

      {/* 2-Row Marquee Tracks Scrolling Right to Left */}
      <div className="relative w-full overflow-hidden space-y-3 sm:space-y-4 py-2">
        {/* Edge Gradient Masks for Smooth Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

        {/* Row 1 Marquee Track */}
        <div className="animate-marquee-track-1 gap-3 sm:gap-4 px-2">
          {[...row1, ...row1].map((p, idx) => (
            <div
              key={`row1-${idx}`}
              className="group shrink-0 w-36 sm:w-42 h-20 sm:h-22 bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col items-center justify-between cursor-pointer select-none"
            >
              <div className="h-10 w-full flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={36}
                  className="max-h-8 sm:max-h-9 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="w-full text-center pt-1 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate leading-tight">
                  {p.name}
                </h4>
                <p className="text-[8.5px] text-slate-400 truncate font-medium">
                  {p.categoryLabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 Marquee Track */}
        <div className="animate-marquee-track-2 gap-3 sm:gap-4 px-2">
          {[...row2, ...row2].map((p, idx) => (
            <div
              key={`row2-${idx}`}
              className="group shrink-0 w-36 sm:w-42 h-20 sm:h-22 bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col items-center justify-between cursor-pointer select-none"
            >
              <div className="h-10 w-full flex items-center justify-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={36}
                  className="max-h-8 sm:max-h-9 max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="w-full text-center pt-1 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate leading-tight">
                  {p.name}
                </h4>
                <p className="text-[8.5px] text-slate-400 truncate font-medium">
                  {p.categoryLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Link to All 43+ Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 text-center">
        <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-white border border-slate-200 shadow-sm text-xs text-slate-600">
          <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">
            43+ MITRA RESMI
          </span>
          <span className="hidden sm:inline">Jejaring industri, kesehatan, dan perbankan yang terus bertumbuh.</span>
          <Link
            href="/mitra-kerjasama"
            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer ml-1 sm:ml-0"
          >
            <span>Lihat Detail Semua Mitra</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

