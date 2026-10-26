export interface InteractiveWidgetData {
  type: 
    | "ai-stack" 
    | "erp-pipeline" 
    | "devops-cicd" 
    | "case-boardroom" 
    | "audit-tracker" 
    | "luxury-resort" 
    | "diplomacy-booth" 
    | "safety-matrix" 
    | "sports-kinetic" 
    | "hospital-ward";
  badge: string;
  title: string;
  subtitle: string;
  items: {
    title: string;
    description: string;
    tag?: string;
    metric?: string;
    iconName?: string;
  }[];
}

export interface ProdiTheme {
  slug: string;
  themeName: string;
  fieldBadge: string;
  heroBgGradient: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentLightBg: string;
  accentPill: string;
  navbarBadgeBg: string;
  navbarBadgeText: string;
  navbarCtaClass: string;
  cardHighlightBorder: string;
  widget: InteractiveWidgetData;
}

export const prodiThemes: Record<string, ProdiTheme> = {
  // 1. INFORMATIKA - Cyber Midnight & Electric Cyan
  informatika: {
    slug: "informatika",
    themeName: "Cyber AI & Cloud",
    fieldBadge: "COMPUTER SCIENCE & ARTIFICIAL INTELLIGENCE",
    heroBgGradient: "from-[#040d1a] via-[#07172b] to-[#032840]",
    accentText: "text-cyan-400",
    accentBg: "bg-cyan-500",
    accentBorder: "border-cyan-500/40",
    accentLightBg: "bg-cyan-50/70 border-cyan-200",
    accentPill: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    navbarBadgeBg: "bg-cyan-500/20 border-cyan-500/40",
    navbarBadgeText: "text-cyan-300",
    navbarCtaClass: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30",
    cardHighlightBorder: "border-cyan-200 hover:border-cyan-400",
    widget: {
      type: "ai-stack",
      badge: "INTERACTIVE TECH & AI ECOSYSTEM",
      title: "Teknologi & Framework yang Dikuasai Mahasiswa Informatika",
      subtitle: "Kurikulum kurasi industri yang langsung dipraktikkan dalam rekayasa kecerdasan buatan, komputasi awan, dan platform digital.",
      items: [
        {
          title: "Artificial Intelligence & Deep Learning",
          description: "Model klasifikasi data, Computer Vision, dan NLP menggunakan PyTorch & TensorFlow.",
          tag: "AI & ML",
          metric: "98% Accuracy Model Lab",
        },
        {
          title: "Full-Stack Enterprise Web & Mobile",
          description: "Modern JavaScript/TypeScript (Next.js, React), Flutter, serta arsitektur backend Go & Node.js.",
          tag: "Architecture",
          metric: "Microservices Ready",
        },
        {
          title: "Cloud Native & Container Orchestration",
          description: "Deploy aplikasi di AWS dan Google Cloud Platform memanfaatkan Docker, Kubernetes, dan CI/CD pipeline.",
          tag: "DevOps",
          metric: "99.9% Uptime Deployment",
        },
        {
          title: "Cyber Defense & Ethical Hacking",
          description: "Vulnerability assessment, pengetesan penetrasi sistem, dan enkripsi data end-to-end.",
          tag: "Security",
          metric: "ISO 27001 Aligned",
        },
      ],
    },
  },

  // 2. SISTEM INFORMASI - Corporate Cobalt & Data Teal
  "sistem-informasi": {
    slug: "sistem-informasi",
    themeName: "Enterprise & Data Intelligence",
    fieldBadge: "ENTERPRISE RESOURCE PLANNING & DATA SCIENCE",
    heroBgGradient: "from-[#08152c] via-[#0d2347] to-[#073244]",
    accentText: "text-teal-400",
    accentBg: "bg-teal-500",
    accentBorder: "border-teal-500/40",
    accentLightBg: "bg-teal-50/70 border-teal-200",
    accentPill: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    navbarBadgeBg: "bg-teal-500/20 border-teal-500/40",
    navbarBadgeText: "text-teal-300",
    navbarCtaClass: "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30",
    cardHighlightBorder: "border-teal-200 hover:border-teal-400",
    widget: {
      type: "erp-pipeline",
      badge: "ENTERPRISE PROCESS PIPELINE",
      title: "Alur Transformasi Digital & Integrasi Bisnis Enterprise",
      subtitle: "Bagaimana mahasiswa Sistem Informasi UPITRA menjembatani proses operasional industri dengan automasi data cerdas.",
      items: [
        {
          title: "1. Business Process Modeling (BPMN)",
          description: "Memetakan inefisiensi alur pengadaan, pergudangan, dan distribusi korporat.",
          tag: "Process",
          metric: "Eliminasi Bottleneck 40%",
        },
        {
          title: "2. ERP Configuration & Implementation",
          description: "Konfigurasi sistem ERP terpadu (SAP & Odoo Enterprise) lintas divisi perusahaan.",
          tag: "ERP Systems",
          metric: "Real-time Sync",
        },
        {
          title: "3. Big Data Warehouse & ETL Pipeline",
          description: "Ekstraksi dan konsolidasi jutaan baris data transaksi ke repositori terpusat.",
          tag: "Data Warehouse",
          metric: "SQL & Cloud ETL",
        },
        {
          title: "4. Executive Business Intelligence Dashboard",
          description: "Visualisasi metrik KPI dan analitika prediktif untuk keputusan strategis direksi.",
          tag: "Decision Support",
          metric: "Power BI & Tableau",
        },
      ],
    },
  },

  // 3. REKAYASA PERANGKAT LUNAK - Dark Terminal & Neon Emerald
  "rekayasa-perangkat-lunak": {
    slug: "rekayasa-perangkat-lunak",
    themeName: "DevOps & Clean Code Engineering",
    fieldBadge: "ENTERPRISE SOFTWARE CRAFTSMANSHIP & DEVOPS",
    heroBgGradient: "from-[#08151f] via-[#092224] to-[#082b1c]",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500",
    accentBorder: "border-emerald-500/40",
    accentLightBg: "bg-emerald-50/70 border-emerald-200",
    accentPill: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    navbarBadgeBg: "bg-emerald-500/20 border-emerald-500/40",
    navbarBadgeText: "text-emerald-300",
    navbarCtaClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    cardHighlightBorder: "border-emerald-200 hover:border-emerald-400",
    widget: {
      type: "devops-cicd",
      badge: "SOFTWARE LIFECYCLE (CI/CD PIPELINE)",
      title: "Siklus Rancang Bangun Software Skala Besar",
      subtitle: "Standar rekayasa perangkat lunak modern dari penulisan kode bersih hingga deployment otomatis tanpa downtime.",
      items: [
        {
          title: "Clean Architecture & Design Patterns",
          description: "Penerapan Domain-Driven Design (DDD), refactoring kode, dan modularitas microservices.",
          tag: "Clean Code",
          metric: "Zero Spaghetti Code",
        },
        {
          title: "Automated QA & Test-Driven Development",
          description: "Unit testing, integration testing, dan automated regression test (Playwright & Cypress).",
          tag: "Testing Rigor",
          metric: "90%+ Code Coverage",
        },
        {
          title: "Containerization & Cloud Infrastructure",
          description: "Packaging microservices ke Docker container dan manajemen cluster Kubernetes.",
          tag: "Infrastructure",
          metric: "Immutable Builds",
        },
        {
          title: "Continuous Delivery & Monitoring (SRE)",
          description: "Pipeline CI/CD otomatis, health check monitoring Prometheus, dan log alert Grafana.",
          tag: "DevOps",
          metric: "Zero Downtime Release",
        },
      ],
    },
  },

  // 4. MANAJEMEN - Prestige Navy & Champagne Gold
  manajemen: {
    slug: "manajemen",
    themeName: "Executive Leadership & Strategy",
    fieldBadge: "INTERNATIONAL BUSINESS & STRATEGIC LEADERSHIP",
    heroBgGradient: "from-[#0a1829] via-[#0d223a] to-[#241c09]",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500",
    accentBorder: "border-amber-500/40",
    accentLightBg: "bg-amber-50/70 border-amber-200",
    accentPill: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    navbarBadgeBg: "bg-amber-500/20 border-amber-500/40",
    navbarBadgeText: "text-amber-300",
    navbarCtaClass: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/30",
    cardHighlightBorder: "border-amber-200 hover:border-amber-400",
    widget: {
      type: "case-boardroom",
      badge: "HARVARD CASE METHOD & TRIPUTRA MENTORSHIP",
      title: "Simulasi Kepemimpinan Eksekutif & Boardroom Matrix",
      subtitle: "Mahasiswa dilatih memecahkan studi kasus bisnis riil konglomerasi Triputra Group dengan perspektif CEO.",
      items: [
        {
          title: "Strategic Corporate Restructuring",
          description: "Analisis studi kasus merger, akuisisi, dan ekspansi pasar industri manufaktur serta agribisnis.",
          tag: "Boardroom",
          metric: "Executive Pitching",
        },
        {
          title: "Omni-Channel Digital Marketing Strategy",
          description: "Perumusan kampanye pemasaran modern berbasis data, perilaku konsumen, dan return on ad spend (ROAS).",
          tag: "Marketing",
          metric: "Data-Driven ROI",
        },
        {
          title: "Supply Chain & Operations Excellence",
          description: "Efisiensi pengadaan bahan baku, manajemen pergudangan otomatis, dan lean six sigma.",
          tag: "Operations",
          metric: "Cost Leadership",
        },
        {
          title: "Business Venture Incubation",
          description: "Akses permodalan awal dan mentoring langsung dari pengusaha sukses HIPMI & KADIN.",
          tag: "Entrepreneurship",
          metric: "Real Startup Launch",
        },
      ],
    },
  },

  // 5. AKUNTANSI - Precision Slate & FinTech Emerald
  akuntansi: {
    slug: "akuntansi",
    themeName: "Precision Audit & FinTech",
    fieldBadge: "ACCOUNTING STANDARDS (IFRS) & DIGITAL FORENSICS",
    heroBgGradient: "from-[#08131d] via-[#091f21] to-[#062417]",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500",
    accentBorder: "border-emerald-500/40",
    accentLightBg: "bg-emerald-50/70 border-emerald-200",
    accentPill: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    navbarBadgeBg: "bg-emerald-500/20 border-emerald-500/40",
    navbarBadgeText: "text-emerald-300",
    navbarCtaClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
    cardHighlightBorder: "border-emerald-200 hover:border-emerald-400",
    widget: {
      type: "audit-tracker",
      badge: "PROFESSIONAL CREDENTIAL & AUDIT SIMULATION",
      title: "Laboratorium Audit Digital & Perpajakan Terintegrasi",
      subtitle: "Kurikulum telah diselaraskan dengan silabus sertifikasi akuntan publik (CPA) dan Brevet Pajak A & B.",
      items: [
        {
          title: "Computer-Assisted Audit Techniques (CAATs)",
          description: "Pemeriksaan integritas jutaan transaksi keuangan digital secara akurat menggunakan software audit.",
          tag: "Digital Audit",
          metric: "Fraud Detection 99%",
        },
        {
          title: "Corporate Tax Strategy & Brevet A/B",
          description: "Perhitungan PPh Badan, PPN e-Faktur, dan perencanaan kepatuhan pajak korporasi terstruktur.",
          tag: "Taxation",
          metric: "Brevet Certified",
        },
        {
          title: "IFRS Consolidated Financial Reporting",
          description: "Penyusunan laporan keuangan konsolidasi holding korporasi sesuai standar akuntansi internasional.",
          tag: "IFRS Standards",
          metric: "Public KAP Standard",
        },
        {
          title: "Corporate Valuation & Capital Budgeting",
          description: "Analisis rasio solvabilitas, arus kas bebas (DCF), dan valuasi saham di Bursa Efek Indonesia.",
          tag: "FinTech",
          metric: "Financial Modeling",
        },
      ],
    },
  },

  // 6. PARIWISATA - Warm Terracotta & Sunset Amber
  pariwisata: {
    slug: "pariwisata",
    themeName: "Luxury Hospitality & MICE",
    fieldBadge: "WORLD-CLASS HOSPITALITY & MICE DESTINATION",
    heroBgGradient: "from-[#1a0e08] via-[#2d180c] to-[#3a190b]",
    accentText: "text-amber-400",
    accentBg: "bg-amber-600",
    accentBorder: "border-amber-500/40",
    accentLightBg: "bg-amber-50/70 border-amber-200",
    accentPill: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    navbarBadgeBg: "bg-amber-500/20 border-amber-500/40",
    navbarBadgeText: "text-amber-300",
    navbarCtaClass: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30",
    cardHighlightBorder: "border-amber-200 hover:border-amber-400",
    widget: {
      type: "luxury-resort",
      badge: "5-STAR HOSPITALITY & MEGA EVENT LAB",
      title: "Fasilitas Praktik Standar Hotel Bintang Lima & MICE",
      subtitle: "Menempa keramahan berkelas internasional, tata kelola food & beverage, dan eksekusi event akbar.",
      items: [
        {
          title: "Mock Presidential Suite & Front Office",
          description: "Simulasi check-in tamu VIP, penataan interior kamar mewah, dan protokol pelayanan prima (Butler).",
          tag: "Hotel Operations",
          metric: "5-Star Standard",
        },
        {
          title: "Mixology & Fine Dining Banquet Studio",
          description: "Pelatihan seni meracik minuman, barista kopi Nusantara, dan etika jamuan resmi kenegaraan.",
          tag: "Gastronomy",
          metric: "Fine Dining Etiquette",
        },
        {
          title: "MICE & International Convention Suite",
          description: "Perancangan tata letak pameran dagang (exhibition booth) dan manajemen logistik konferensi global.",
          tag: "Event Director",
          metric: "1000+ Delegate Sim",
        },
        {
          title: "Eco-Tourism & Sustainable Destination Hub",
          description: "Pemetaan kawasan wisata alam ramah lingkungan berbasis kearifan lokal Surakarta.",
          tag: "Eco-Tourism",
          metric: "CHSE Certified",
        },
      ],
    },
  },

  // 7. BAHASA INGGRIS - Royal Burgundy & Diplomatic Indigo
  "bahasa-inggris": {
    slug: "bahasa-inggris",
    themeName: "Diplomacy & Corporate PR",
    fieldBadge: "GLOBAL BUSINESS COMMUNICATION & DIPLOMACY",
    heroBgGradient: "from-[#1a0814] via-[#2b0c20] to-[#1a1236]",
    accentText: "text-pink-400",
    accentBg: "bg-pink-600",
    accentBorder: "border-pink-500/40",
    accentLightBg: "bg-pink-50/70 border-pink-200",
    accentPill: "bg-pink-500/20 text-pink-300 border-pink-400/30",
    navbarBadgeBg: "bg-pink-500/20 border-pink-500/40",
    navbarBadgeText: "text-pink-300",
    navbarCtaClass: "bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/30",
    cardHighlightBorder: "border-pink-200 hover:border-pink-400",
    widget: {
      type: "diplomacy-booth",
      badge: "SIMULTANEOUS INTERPRETING & MEDIA STUDIO",
      title: "Studio Komunikasi Global, Diplomasi, & Penerjemahan",
      subtitle: "Melatih juru bicara korporasi internasional, negosiator bisnis lintas budaya, dan interpreter simultan PBB.",
      items: [
        {
          title: "Simultaneous Interpreting Soundproof Booth",
          description: "Praktik penerjemahan lisan simultan real-time dengan headphone dan mikrofon standar konferensi PBB.",
          tag: "Interpreting",
          metric: "Live Translation Sim",
        },
        {
          title: "Corporate PR & Crisis Communication",
          description: "Penyusunan press release berbahasa Inggris, briefing media, dan simulasi penanganan krisis reputasi.",
          tag: "Public Relations",
          metric: "Spokesperson Ready",
        },
        {
          title: "Computer-Assisted Translation (CAT) Lab",
          description: "Penguasaan software penerjemahan profesional (SDL Trados & MemoQ) untuk dokumen hukum dan finansial.",
          tag: "Localization",
          metric: "CAT Tools Mastery",
        },
        {
          title: "Global Copywriting & Digital Podcasting",
          description: "Produksi narasi merek internasional, penulisan artikel SEO global, dan podcasting bahasa Inggris komersial.",
          tag: "Digital Media",
          metric: "Native Fluency Target",
        },
      ],
    },
  },

  // 8. K3 - Industrial Safety Amber & Charcoal
  "kesehatan-dan-keselamatan-kerja": {
    slug: "kesehatan-dan-keselamatan-kerja",
    themeName: "Occupational Safety (HSE)",
    fieldBadge: "OCCUPATIONAL SAFETY, HEALTH & INDUSTRIAL HYGIENE",
    heroBgGradient: "from-[#1a1306] via-[#2a1c07] to-[#1a1c1d]",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500",
    accentBorder: "border-amber-500/40",
    accentLightBg: "bg-amber-50/70 border-amber-200",
    accentPill: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    navbarBadgeBg: "bg-amber-500/20 border-amber-500/40",
    navbarBadgeText: "text-amber-300",
    navbarCtaClass: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/30",
    cardHighlightBorder: "border-amber-200 hover:border-amber-400",
    widget: {
      type: "safety-matrix",
      badge: "INDUSTRIAL HAZARD SIMULATION & LAB",
      title: "Laboratorium Keselamatan Kerja & Higiene Industri Pabrik",
      subtitle: "Akses inspeksi langsung di lantai manufaktur komponen otomotif PT Dharma Polimetal dan agribisnis Triputra.",
      items: [
        {
          title: "Hazard Identification (HIRADC & HAZOP)",
          description: "Metodologi asesmen risiko bahaya mekanik, listrik, kimia, dan pencegahan kecelakaan kerja fatal.",
          tag: "Risk Assessment",
          metric: "Zero Accident Target",
        },
        {
          title: "Industrial Hygiene & Air Monitoring",
          description: "Pengukuran tingkat kebisingan, intensitas cahaya, partikel debu respirabel, dan uji paparan gas beracun.",
          tag: "Hygiene Lab",
          metric: "Permissible Limits",
        },
        {
          title: "Fire Protection & Emergency Drill Ground",
          description: "Simulasi pemadaman kebakaran dengan APAR berbagai jenis, hydrant pabrik, dan evakuasi gedung tinggi.",
          tag: "Fire Drill",
          metric: "Emergency Protocol",
        },
        {
          title: "SMK3 (PP 50/2012) & ISO 45001 Auditing",
          description: "Pemeriksaan kepatuhan sistem manajemen keselamatan kerja industri untuk sertifikasi regulasi Kemenaker.",
          tag: "Auditing",
          metric: "Ahli K3 Umum Kemenaker",
        },
      ],
    },
  },

  // 9. FISIOTERAPI - Active Teal & Sports Coral
  fisioterapi: {
    slug: "fisioterapi",
    themeName: "Sports & Clinical Physiotherapy",
    fieldBadge: "PHYSIOTHERAPY & SPORTS INJURY REHABILITATION",
    heroBgGradient: "from-[#051717] via-[#082928] to-[#1c0d15]",
    accentText: "text-teal-400",
    accentBg: "bg-teal-500",
    accentBorder: "border-teal-500/40",
    accentLightBg: "bg-teal-50/70 border-teal-200",
    accentPill: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    navbarBadgeBg: "bg-teal-500/20 border-teal-500/40",
    navbarBadgeText: "text-teal-300",
    navbarCtaClass: "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30",
    cardHighlightBorder: "border-teal-200 hover:border-teal-400",
    widget: {
      type: "sports-kinetic",
      badge: "KINETIC MOVEMENT & REHAB CLINIC",
      title: "Klinik Fisioterapi Olahraga & Pemulihan Biomekanika Gerak",
      subtitle: "Peralatan rehabilitasi gerak mutakhir untuk penanganan cedera atletik, saraf pasca stroke, dan pediatri.",
      items: [
        {
          title: "Sports Injury Rehabilitation & Return-to-Play",
          description: "Protokol penanganan cedera ACL, dislokasi sendi, taping atletik, dan uji kesiapan tanding atlet profesional.",
          tag: "Sports Rehab",
          metric: "Athlete Recovery Protocol",
        },
        {
          title: "Advanced Electrotherapy & Physical Agents",
          description: "Penerapan Ultrasound terapi medik, TENS pereda nyeri, laser fisioterapi, dan Shortwave Diathermy (SWD).",
          tag: "Physical Modalities",
          metric: "Pain Relief Modulation",
        },
        {
          title: "Manual Therapy (Maitland & Mulligan)",
          description: "Keterampilan mobilisasi sendi, manipulasi muskuloskeletal, dan pelepasan ketegangan miofasial.",
          tag: "Manual Skills",
          metric: "Joint Mobility Restore",
        },
        {
          title: "Neurodevelopmental & Pediatric Rehab",
          description: "Stimulasi perkembangan motorik anak (Cerebral Palsy) dan reedukasi saraf motorik pasca stroke dewasa.",
          tag: "Neurology",
          metric: "Motor Functional Gain",
        },
      ],
    },
  },

  // 10. KEPERAWATAN - Medical Cyan & Hospital Compassion
  keperawatan: {
    slug: "keperawatan",
    themeName: "Clinical & Emergency Nursing",
    fieldBadge: "HOSPITAL NURSING CARE & EMERGENCY LIFE SUPPORT",
    heroBgGradient: "from-[#051522] via-[#082236] to-[#04121d]",
    accentText: "text-sky-400",
    accentBg: "bg-sky-500",
    accentBorder: "border-sky-500/40",
    accentLightBg: "bg-sky-50/70 border-sky-200",
    accentPill: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    navbarBadgeBg: "bg-sky-500/20 border-sky-500/40",
    navbarBadgeText: "text-sky-300",
    navbarCtaClass: "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30",
    cardHighlightBorder: "border-sky-200 hover:border-sky-400",
    widget: {
      type: "hospital-ward",
      badge: "MINI HOSPITAL & OSCE EMERGENCY LAB",
      title: "Laboratorium Mini Hospital & Penanganan Gawat Darurat",
      subtitle: "60% porsi pembelajaran praktik langsung di bangsal rawat inap tiruan dan stase rumah sakit mitra.",
      items: [
        {
          title: "Basic Trauma & Cardiac Life Support (BTCLS)",
          description: "Pelatihan resusitasi jantung paru (CPR), manajemen sumbatan jalan napas, dan penggunaan AED defibrilator.",
          tag: "Emergency Life Support",
          metric: "BTCLS Certified",
        },
        {
          title: "Mini Hospital Ward & Bedside Care",
          description: "Simulasi pemberian obat parenteral, pemasangan infus/kateter, dan asuhan kenyamanan pasien.",
          tag: "Clinical Practice",
          metric: "OSCE Standard Lab",
        },
        {
          title: "Modern Wound Dressing & Infection Control",
          description: "Perawatan luka diabetes dan luka pasca bedah memanfaatkan teknik balutan kelembaban modern (Moist Dressing).",
          tag: "Wound Care",
          metric: "Modern Healing",
        },
        {
          title: "Compassionate Palliative & Home Care",
          description: "Asuhan keperawatan gerontik lansia di rumah, pendampingan keluarga, dan komunikasi empati terapeutik.",
          tag: "Compassion Care",
          metric: "Holistic Well-being",
        },
      ],
    },
  },
};

export function getProdiTheme(slug: string): ProdiTheme {
  const cleanSlug = slug.toLowerCase().trim();
  // Check exact
  if (prodiThemes[cleanSlug]) return prodiThemes[cleanSlug];
  
  // Check aliases
  if (cleanSlug.includes("informatika") || cleanSlug.includes("informatics")) {
    return prodiThemes.informatika;
  }
  if (cleanSlug.includes("sistem-informasi") || cleanSlug.includes("information-systems")) {
    return prodiThemes["sistem-informasi"];
  }
  if (cleanSlug.includes("rekayasa") || cleanSlug.includes("rpl") || cleanSlug.includes("software")) {
    return prodiThemes["rekayasa-perangkat-lunak"];
  }
  if (cleanSlug.includes("manajemen") || cleanSlug.includes("management")) {
    return prodiThemes.manajemen;
  }
  if (cleanSlug.includes("akuntansi") || cleanSlug.includes("accounting")) {
    return prodiThemes.akuntansi;
  }
  if (cleanSlug.includes("pariwisata") || cleanSlug.includes("tourism")) {
    return prodiThemes.pariwisata;
  }
  if (cleanSlug.includes("bahasa") || cleanSlug.includes("english")) {
    return prodiThemes["bahasa-inggris"];
  }
  if (cleanSlug.includes("kesehatan") || cleanSlug.includes("k3") || cleanSlug.includes("hse")) {
    return prodiThemes["kesehatan-dan-keselamatan-kerja"];
  }
  if (cleanSlug.includes("fisioterapi") || cleanSlug.includes("physio")) {
    return prodiThemes.fisioterapi;
  }
  if (cleanSlug.includes("keperawatan") || cleanSlug.includes("nursing")) {
    return prodiThemes.keperawatan;
  }

  // Fallback to informatika
  return prodiThemes.informatika;
}

export interface FacultyGroupedProgram {
  facultyName: string;
  facultyCode: string;
  colorBadge: string;
  programs: {
    name: string;
    slug: string;
    degree: string;
  }[];
}

export const facultyGroupedPrograms: FacultyGroupedProgram[] = [
  {
    facultyName: "Fakultas Sains & Technology",
    facultyCode: "FST",
    colorBadge: "bg-cyan-100 text-cyan-800 border-cyan-200",
    programs: [
      { name: "S1 Informatika", slug: "informatika", degree: "S1" },
      { name: "S1 Sistem Informasi", slug: "sistem-informasi", degree: "S1" },
      { name: "S1 Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", degree: "S1" },
    ],
  },
  {
    facultyName: "Faculty Ekonomic & Bussiness",
    facultyCode: "FEB",
    colorBadge: "bg-amber-100 text-amber-800 border-amber-200",
    programs: [
      { name: "S1 Manajemen", slug: "manajemen", degree: "S1" },
      { name: "S1 Akuntansi", slug: "akuntansi", degree: "S1" },
    ],
  },
  {
    facultyName: "Faculty Social Humaniora",
    facultyCode: "FSH",
    colorBadge: "bg-purple-100 text-purple-800 border-purple-200",
    programs: [
      { name: "S1 Pariwisata", slug: "pariwisata", degree: "S1" },
      { name: "S1 Bahasa Inggris", slug: "bahasa-inggris", degree: "S1" },
    ],
  },
  {
    facultyName: "Faculty Health",
    facultyCode: "FH",
    colorBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    programs: [
      { name: "S1 Kesehatan & Keselamatan Kerja", slug: "kesehatan-dan-keselamatan-kerja", degree: "S1" },
      { name: "S1 Fisioterapi", slug: "fisioterapi", degree: "S1" },
      { name: "D3 Keperawatan", slug: "keperawatan", degree: "D3" },
    ],
  },
];


