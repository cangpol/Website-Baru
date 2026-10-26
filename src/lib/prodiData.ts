export interface SpecializationTrack {
  title: string;
  description: string;
  skills: string[];
}

export interface CurriculumStage {
  year: string;
  stageTitle: string;
  description: string;
  courses: string[];
}

export interface CareerPath {
  category: "Professional / Intrapreneur" | "Entrepreneur / Technopreneur" | "Consultant / Specialist";
  role: string;
  description: string;
}

export interface Facility {
  name: string;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FacultyMember {
  name: string;
  title: string;
  role: string;
  isKaprodi: boolean;
  photo?: string | null;
  email?: string | null;
  education?: string;
  expertise?: string;
}

export interface ProdiData {
  slug: string;
  aliases: string[];
  name: string;
  englishName: string;
  degreeLevel: "S1" | "D3";
  degreeTitle: string;
  degreeFullName: string;
  accreditation: string;
  accreditationBody: string;
  faculty: {
    name: string;
    code: string;
    slug: string;
  };
  campusLocation: string;
  duration: string;
  totalSks: string;
  studyMode: string;
  heroImage: string;
  tagline: string;
  overview: string[];
  whyUs: {
    title: string;
    description: string;
    icon: string;
  }[];
  specializations: SpecializationTrack[];
  curriculumStages: CurriculumStage[];
  coreCourses: string[];
  careerPaths: CareerPath[];
  facilities: Facility[];
  industryPartners: string[];
  tuitionFeePerSemester: number;
  scholarships: string[];
  faqs: FAQItem[];
  dosenList?: FacultyMember[];
}

export const prodiList: ProdiData[] = [
  // ==========================================
  // 1. S1 INFORMATIKA (FST)
  // ==========================================
  {
    slug: "informatika",
    aliases: ["s1-informatika", "informatics"],
    name: "S1 Informatika",
    englishName: "Bachelor of Informatics / Computer Science",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    degreeFullName: "Sarjana Komputer",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT / LAM INFOKOM",
    faculty: {
      name: "Fakultas Sains & Technology",
      code: "FST",
      slug: "fst",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Program Magang Industri 1 Tahun",
    heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80",
    tagline: "Mencetak Software Engineer, AI Specialist, & Cloud Architect Berdaya Saing Global dengan Karakter Triputra DNA",
    overview: [
      "Program Studi S1 Informatika Universitas Pignatelli Triputra (UPITRA) dirancang dengan kurikulum berbasis industri terkini yang memadukan kedalaman ilmu komputasi, kecerdasan buatan (Artificial Intelligence), rekayasa perangkat lunak modern, dan etika profesional.",
      "Dengan kemitraan strategis bersama ekosistem Triputra Group dan jaringan industri teknologi nasional, mahasiswa tidak hanya mempelajari teori algoritma di kelas, namun langsung terlibat dalam proyek nyata (Project-Based Learning) dan magang industri terstruktur selama satu tahun penuh.",
      "Lulusan disiapkan menjadi inovator teknologi yang mampu merancang sistem perangkat lunak skala enterprise, mengolah big data menjadi wawasan bisnis prediktif, serta mendirikan startup teknologi mandiri."
    ],
    whyUs: [
      {
        title: "Kurikulum Terkini AI & Cloud",
        description: "Materi pembelajaran selalu diperbarui mengikuti standar teknologi global seperti Machine Learning, Deep Learning, DevOps, Microservices, dan Cloud Computing (GCP/AWS).",
        icon: "Cpu"
      },
      {
        title: "Jalur Karir Industri Triputra",
        description: "Kesempatan magang bergengsi dan rekrutmen prioritas di 100+ anak perusahaan Triputra Group serta mitra korporasi teknologi terkemuka.",
        icon: "Briefcase"
      },
      {
        title: "Laboratorium Komputasi Canggih",
        description: "Didukung Lab AI & Data Science, High Performance Computing, serta Lab Rekayasa Perangkat Lunak dengan perangkat komputasi modern.",
        icon: "Server"
      },
      {
        title: "Sertifikasi Profesi Internasional",
        description: "Setiap mahasiswa dibekali peluang sertifikasi kompetensi industri berstandar global (seperti AWS, Google Cloud, Cisco, atau Oracle) sebelum wisuda.",
        icon: "Award"
      }
    ],
    specializations: [
      {
        title: "Artificial Intelligence & Data Intelligence",
        description: "Fokus pada rekayasa model kecerdasan buatan, Computer Vision, Natural Language Processing, dan analitik Big Data untuk otomasi industri modern.",
        skills: ["Machine Learning", "Deep Learning (PyTorch/TensorFlow)", "NLP", "Big Data Analytics", "Computer Vision"]
      },
      {
        title: "Full-Stack Software Architecture & Cloud",
        description: "Mendalami arsitektur aplikasi skala besar, microservices, containerization, DevOps pipeline, serta rekayasa platform web dan mobile mutakhir.",
        skills: ["Next.js / React", "Spring Boot / Go / Node.js", "Docker & Kubernetes", "CI/CD & Cloud Native", "API Architecture"]
      },
      {
        title: "Cyber Security & Digital Infrastructure",
        description: "Mempelajari pertahanan siber, ethical hacking, keamanan sistem terdistribusi, serta tata kelola keamanan informasi enterprise.",
        skills: ["Network Security", "Penetration Testing", "Cryptography", "Security Information & Event Management (SIEM)"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Computational Thinking & Fundamental Coding",
        description: "Fondasi logika pemrograman, struktur data, algoritma, matematika komputasi, dan penanaman integritas karakter Triputra DNA.",
        courses: ["Dasar Pemrograman (Python & C++)", "Struktur Data & Algoritma", "Matematika Diskrit", "Arsitektur Komputer", "Karakter & Etika Moral"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Core Software Engineering & Database Systems",
        description: "Penguasaan rekayasa sistem basis data relational/NoSQL, pemrograman berorientasi objek, jaringan komputer, dan rekayasa web terintegrasi.",
        courses: ["Basis Data Lanjut & NoSQL", "Object-Oriented Programming (Java/Go)", "Jaringan Komputer & Cloud Basics", "Rekayasa Web Modern", "Probabilitas & Statistika Terapan"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Advanced Specialization & Industry Projects",
        description: "Pendalaman jalur spesialisasi (AI, Full-Stack, atau Cyber Security) dan pengerjaan proyek riil bersama mitra korporasi.",
        courses: ["Machine Learning & Deep Learning", "Arsitektur Microservices & DevOps", "Pengembangan Aplikasi Mobile", "Manajemen Proyek Perangkat Lunak", "Metodologi Riset Informatika"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "1-Year Corporate Internship & Capstone Project",
        description: "Magang penuh di industri mitra (Triputra Group / Tech Startups) dan penyelesaian tugas akhir berbobot solusi praktis.",
        courses: ["Magang Industri Terstruktur (6 Bulan)", "Praktik Profesi Teknologi Informasi", "Capstone Project / Skripsi Inovasi Teknologi"]
      }
    ],
    coreCourses: [
      "Artificial Intelligence & Machine Learning",
      "Cloud Computing & Distributed Systems",
      "Full-Stack Web & Mobile Engineering",
      "Big Data Analytics & Business Intelligence",
      "DevOps, Docker & Kubernetes Automation",
      "Network Defense & Ethical Hacking",
      "Database Systems & Data Modeling",
      "Software Architecture & Design Patterns"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Software Engineer / Full-Stack Developer",
        description: "Merancang, menguji, dan mengembangkan aplikasi platform digital terintegrasi untuk kebutuhan industri dan pasar global."
      },
      {
        category: "Professional / Intrapreneur",
        role: "AI & Machine Learning Engineer",
        description: "Membangun algoritma kecerdasan buatan, predictive models, dan otomasi cerdas untuk efisiensi operasional korporat."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Cloud Architect & DevOps Engineer",
        description: "Mengelola infrastruktur komputasi awan, pipeline CI/CD, dan ketahanan sistem produksi skala besar."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Tech Startup Founder & Product Lead",
        description: "Mendirikan startup berbasis produk digital inovatif, memvalidasi ide bisnis, dan memimpin pengembangan teknologi."
      },
      {
        category: "Consultant / Specialist",
        role: "IT Consultant & System Analyst",
        description: "Menganalisis kebutuhan bisnis perusahaan dan memberikan rekomendasi solusi transformasi digital yang efisien."
      },
      {
        category: "Consultant / Specialist",
        role: "Cyber Security Analyst",
        description: "Memantau, menganalisis ancaman siber, dan mengamankan aset data berharga korporasi dari serangan peretasan."
      }
    ],
    facilities: [
      {
        name: "Artificial Intelligence & Data Intelligence Lab",
        description: "Dilengkapi workstation berkemampuan GPU komputasi tinggi untuk pelatihan model Machine Learning dan riset computer vision.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Software Engineering & DevOps Lab",
        description: "Ruang kolaboratif bertaraf modern untuk simulasi Scrum/Agile, code review, server deployment, dan uji otomatis perangkat lunak.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Computer Networking & Cyber Security Suite",
        description: "Laboratorium jaringan terspesialisasi dengan rack server, router enterprise, dan perangkat simulasi penetrasi keamanan sistem.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Triputra Group",
      "PT Dharma Polimetal Tbk",
      "PT Astra Otoparts Tbk",
      "Google Developer Student Clubs",
      "AWS Academy",
      "Microsoft Learn for Educators"
    ],
    tuitionFeePerSemester: 6500000,
    scholarships: [
      "Beasiswa Penuh 100% Triputra Peduli (Bebas Biaya Kuliah & Uang Masuk)",
      "Beasiswa Prestasi Akademik Nilai Rapor & UTBK",
      "Beasiswa Juara Kompetisi Sains, Teknologi & Olahraga",
      "Skema Cicilan Ringan 0% Biaya Pendidikan"
    ],
    faqs: [
      {
        question: "Apakah mahasiswa baru yang belum pernah belajar coding bisa mendaftar?",
        answer: "Tentu saja! Kurikulum semester awal dirancang dari dasar (fondasi logika dan dasar pemrograman) dengan asistensi mentor dosen dan kakak tingkat sehingga siapapun yang memiliki tekad belajar kuat dapat mengikutinya dengan sangat baik."
      },
      {
        question: "Bagaimana sistem magang industri di Program Studi Informatika UPITRA?",
        answer: "UPITRA menerapkan program magang 1 tahun penuh di semester akhir pada perusahaan mitra industri terkemuka (seperti anak perusahaan Triputra Group dan tech company rekanan), di mana mahasiswa mengerjakan proyek riil dan berpeluang direkrut sebelum lulus."
      },
      {
        question: "Gelar apa yang diperoleh lulusan S1 Informatika UPITRA?",
        answer: "Lulusan berhak menyandang gelar Sarjana Komputer (S.Kom.) yang diakui secara nasional dan internasional."
      }
    ]
  },

  // ==========================================
  // 2. S1 SISTEM INFORMASI (FST)
  // ==========================================
  {
    slug: "sistem-informasi",
    aliases: ["s1-sistem-informasi", "information-systems"],
    name: "S1 Sistem Informasi",
    englishName: "Bachelor of Information Systems – Enterprise & Data Science",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    degreeFullName: "Sarjana Komputer",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT / LAM INFOKOM",
    faculty: {
      name: "Fakultas Sains & Technology",
      code: "FST",
      slug: "fst",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Program Magang Industri 1 Tahun",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
    tagline: "Menjembatani Strategi Bisnis Korporasi & Tata Kelola Sistem Enterprise Berbasis Data Intelijen",
    overview: [
      "Program Studi S1 Sistem Informasi UPITRA mencetak para profesional yang menjadi jembatan strategis antara kebutuhan bisnis korporasi dengan kapabilitas teknologi informasi mutakhir.",
      "Mahasiswa dilatih menguasai Enterprise Resource Planning (ERP), pemodelan proses bisnis, tata kelola IT (IT Governance & COBIT), serta visualisasi data analytics untuk pengambilan keputusan eksekutif.",
      "Melalui kurikulum aplikatif yang didukung langsung oleh sistem operasional korporat berskala nasional, lulusan memiliki keunggulan kompetitif dalam memimpin transformasi digital di era industri 4.0."
    ],
    whyUs: [
      {
        title: "Keahlian Enterprise ERP Riil",
        description: "Praktik langsung menggunakan platform ERP terkemuka (SAP, Odoo Enterprise) yang digunakan ribuan korporasi multinasional.",
        icon: "Building2"
      },
      {
        title: "Fokus Analitika Data Bisnis",
        description: "Mengolah kumpulan data besar perusahaan menjadi dashboard interaktif, analitika prediktif, dan wawasan bisnis strategis.",
        icon: "LineChart"
      },
      {
        title: "Kombinasi Bisnis & IT",
        description: "Keseimbangan ideal antara pemahaman manajemen bisnis, keuangan, supply chain dengan arsitektur sistem perangkat lunak.",
        icon: "Shuffle"
      },
      {
        title: "Prospek Karir Luas & Bergengsi",
        description: "Lulusan Sistem Informasi dicari di seluruh sektor industri: perbankan, manufaktur, logistik, agribisnis, hingga konsultan IT.",
        icon: "TrendingUp"
      }
    ],
    specializations: [
      {
        title: "Enterprise Systems & ERP Implementation",
        description: "Fokus pada integrasi proses bisnis hulu ke hilir (keuangan, pengadaan, logistik, SDM) menggunakan sistem ERP modern.",
        skills: ["ERP Systems (SAP/Odoo)", "Business Process Modeling (BPMN)", "Enterprise Architecture", "Supply Chain IT"]
      },
      {
        title: "Business Intelligence & Data Analytics",
        description: "Spesialisasi pengolahan big data, pembuatan data warehouse, ETL pipeline, dan dashboard visual eksekutif.",
        skills: ["Power BI & Tableau", "SQL & Data Warehousing", "Data Mining", "Predictive Analytics", "Python for Analytics"]
      },
      {
        title: "Digital Product Management & IT Governance",
        description: "Mempelajari siklus hidup manajemen produk digital, UI/UX research, audit sistem informasi, dan manajemen risiko teknologi.",
        skills: ["Product Roadmap", "IT Audit (COBIT/ITIL)", "Risk Management", "Scrum Product Ownership"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Business Fundamentals & IT Introduction",
        description: "Pengantar proses bisnis perusahaan, dasar algoritma & pemrograman, sistem informasi manajemen, dan pembentukan integritas pribadi.",
        courses: ["Pengantar Sistem Informasi", "Dasar Pemrograman Bisnis", "Proses Bisnis Perusahaan", "Matematika Sistem Informasi", "Komunikasi Bisnis"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Systems Analysis & Database Architecture",
        description: "Perancangan analisis sistem informasi, pemodelan basis data relasional, rekayasa kebutuhan perangkat lunak, dan interaksi manusia-komputer.",
        courses: ["Analisis & Perancangan Sistem", "Sistem Basis Data Enterprise", "Pemrograman Web Berbasis Komponen", "UI/UX Design & User Research", "Statistika Bisnis"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Enterprise Resource Planning & Data Analytics",
        description: "Implementasi ERP, Business Intelligence, tata kelola dan audit sistem informasi, serta manajemen proyek teknologi skala besar.",
        courses: ["Implementasi Sistem ERP", "Business Intelligence & Data Warehouse", "Tata Kelola & Audit TI (COBIT)", "Manajemen Proyek TI", "E-Commerce & Digital Business"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Corporate Internship & Strategic Capstone",
        description: "Program magang intensif di departemen IT / Digital Transformation korporasi mitra dan penyusunan karya skripsi solutif.",
        courses: ["Magang Industri Enterprise (1 Tahun)", "Praktik Audit & Konsultasi TI", "Skripsi Transformasi Sistem Digital"]
      }
    ],
    coreCourses: [
      "Enterprise Resource Planning (ERP)",
      "Business Intelligence & Analytics",
      "Business Process Reengineering (BPR)",
      "IT Governance, Risk & Compliance (GRC)",
      "Data Warehousing & Big Data Systems",
      "System Analysis & Object-Oriented Design",
      "Digital Product Strategy & UX",
      "Information Systems Project Management"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Business Analyst (IT & Process)",
        description: "Menganalisis inefisiensi alur kerja perusahaan dan merancang spesifikasi sistem digital yang meningkatkan produktivitas."
      },
      {
        category: "Professional / Intrapreneur",
        role: "ERP Consultant & Implementation Specialist",
        description: "Mengonfigurasi dan mengimplementasikan sistem ERP korporat untuk menyatukan departemen keuangan, inventaris, dan operasional."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Data Analyst / BI Developer",
        description: "Menggali pola data historis perusahaan dan membangun visualisasi metrik kunci untuk pengambilan keputusan direksi."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Digital Product Manager",
        description: "Memimpin siklus hidup produk digital dari riset pengguna, perumusan fitur, hingga peluncuran di pasar."
      },
      {
        category: "Consultant / Specialist",
        role: "IT Auditor & Compliance Officer",
        description: "Memeriksa kepatuhan, keandalan, dan keamanan sistem informasi korporat berdasarkan kerangka kerja COBIT / ISO 27001."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Technopreneur / Digital Solution Agency Owner",
        description: "Mendirikan agensi penyedia solusi automasi proses bisnis dan konsultasi perangkat lunak untuk UMKM dan industri."
      }
    ],
    facilities: [
      {
        name: "Enterprise ERP & Process Simulation Lab",
        description: "Laboratorium simulasi sistem ERP terintegrasi tempat mahasiswa mempraktikkan alur pengadaan, pergudangan, dan pembukuan industri riil.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Data Intelligence & Analytics Studio",
        description: "Dilengkapi perangkat lunak pengolahan data modern (Power BI, Tableau, SQL Server) untuk analisis tren bisnis korporasi.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Collaborative Innovation & UX Lab",
        description: "Ruang diskusi fleksibel untuk perancangan desain antarmuka, usability testing, dan workshop ideation produk teknologi.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Triputra Group Corporate IT",
      "PT Kirana Megatara Tbk",
      "PT Triputra Agro Persada Tbk",
      "SAP University Alliances",
      "Microsoft for Higher Education"
    ],
    tuitionFeePerSemester: 6500000,
    scholarships: [
      "Beasiswa Triputra Peduli 100% Bebas Biaya SPP & Gedung",
      "Beasiswa Prestasi Nilai Rapor & Portofolio IT",
      "Skema Pendanaan Magang Industri Berbayar"
    ],
    faqs: [
      {
        question: "Apa perbedaan Sistem Informasi dengan Informatika di UPITRA?",
        answer: "Informatika lebih menitikberatkan pada aspek teknis mendalam perancangan perangkat lunak, algoritma, AI, dan arsitektur kode. Sedangkan Sistem Informasi berfokus pada penerapan teknologi untuk menyelesaikan masalah bisnis, automasi proses korporat (ERP), dan analisis data strategis."
      },
      {
        question: "Apakah lulusan Sistem Informasi bisa menjadi programmer?",
        answer: "Ya! Lulusan dibekali fondasi pemrograman web, mobile, dan basis data yang kuat, sehingga memiliki fleksibilitas berkarir sebagai pengembang perangkat lunak maupun posisi strategis seperti Business Analyst dan Product Manager."
      },
      {
        question: "Gelar apa yang disandang lulusan S1 Sistem Informasi UPITRA?",
        answer: "Lulusan memperoleh gelar Sarjana Komputer (S.Kom.)."
      }
    ]
  },

  // ==========================================
  // 3. S1 REKAYASA PERANGKAT LUNAK (FST)
  // ==========================================
  {
    slug: "rekayasa-perangkat-lunak",
    aliases: ["s1-rekayasa-perangkat-lunak", "rpl", "software-engineering"],
    name: "S1 Rekayasa Perangkat Lunak",
    englishName: "Bachelor of Software Engineering",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    degreeFullName: "Sarjana Komputer",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT / LAM INFOKOM",
    faculty: {
      name: "Fakultas Sains & Technology",
      code: "FST",
      slug: "fst",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Program Magang Industri 1 Tahun",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=80",
    tagline: "Ahli Rancang Bangun Software Skala Enterprise, Clean Architecture, & DevOps Automation",
    overview: [
      "Program Studi S1 Rekayasa Perangkat Lunak (Software Engineering) UPITRA memfokuskan pembinaan mahasiswa pada seluruh siklus hidup rekayasa perangkat lunak (Software Development Life Cycle / SDLC) skala besar.",
      "Mahasiswa dididik menjadi Software Architect yang mampu membangun sistem perangkat lunak yang andal (robust), memiliki skalabilitas tinggi (scalable), aman, dan menerapkan standar Clean Code, Test-Driven Development (TDD), serta automasi DevOps modern.",
      "Kemitraan erat dengan industri manufaktur dan korporasi digital memungkinkan mahasiswa terlibat langsung dalam pengembangan aplikasi mission-critical yang menopang operasional bisnis nyata."
    ],
    whyUs: [
      {
        title: "Clean Architecture & Design Patterns",
        description: "Penekanan kuat pada standar industri penulisan kode berkualitas tinggi, refactoring, microservices, dan modular software architecture.",
        icon: "Layers"
      },
      {
        title: "DevOps & Cloud Automation",
        description: "Praktik langsung pipeline CI/CD, container orchestration (Docker/K8s), infrastructure as code, dan pemantauan performa sistem.",
        icon: "Terminal"
      },
      {
        title: "Quality Assurance & Testing Rigor",
        description: "Penguasaan komprehensif unit testing, integration testing, automation test framework (Cypress, Selenium, Playwright), dan performance load testing.",
        icon: "CheckCircle"
      },
      {
        title: "Peluang Kerja Lulusan Sangat Tinggi",
        description: "Software Engineer adalah salah satu profesi paling dicari di dunia dengan kompensasi karir yang sangat kompetitif.",
        icon: "TrendingUp"
      }
    ],
    specializations: [
      {
        title: "Enterprise Software Architecture",
        description: "Merancang sistem terdistribusi, event-driven architecture, API gateway, dan database clustering untuk jutaan pengguna.",
        skills: ["Domain-Driven Design", "Microservices (Go/Java)", "Kafka / RabbitMQ", "System Scalability"]
      },
      {
        title: "DevOps, SRE & Cloud Engineering",
        description: "Automasi deployment, manajemen cluster cloud (AWS/GCP), monitoring keandalan sistem (Site Reliability Engineering), dan GitOps.",
        skills: ["Kubernetes & Docker", "Terraform & Ansible", "CI/CD Pipelines", "Prometheus & Grafana"]
      },
      {
        title: "Mobile & Multi-Platform Engineering",
        description: "Pengembangan aplikasi mobile native dan hybrid berperforma tinggi untuk ekosistem Android dan iOS.",
        skills: ["Flutter & Kotlin", "Swift / SwiftUI", "Offline-First Sync", "Mobile Security"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Coding Fundamentals & Software Thinking",
        description: "Fondasi pemrograman terstruktur, algoritma, matematika komputasi, dan pengenalan prinsip rekayasa software berkarakter.",
        courses: ["Dasar Pemrograman Lanjut", "Struktur Data & Kompleksitas Algoritma", "Dasar Rekayasa Perangkat Lunak", "Logika Matematika", "Etika Profesi IT"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Object-Oriented Design & Clean Architecture",
        description: "Penerapan pola desain (Design Patterns), basis data terdistribusi, arsitektur web modern, dan metodologi pengembangan Agile/Scrum.",
        courses: ["Software Design Patterns", "Sistem Basis Data Lanjut", "Full-Stack Web Engineering", "Agile & Scrum Methodologies", "User Experience Engineering"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Advanced SDLC, QA Automation & DevOps",
        description: "Spesialisasi pengujian otomatis, containerization, arsitektur microservices, keamanan perangkat lunak, dan proyek aplikasi korporat.",
        courses: ["Software Testing & QA Automation", "DevOps & Cloud Native Architecture", "Pengembangan Sistem Terdistribusi", "Rekayasa Aplikasi Mobile Terapan", "Software Project Management"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Industry Engineering Residency & Capstone",
        description: "Praktik rekayasa langsung sebagai Software Engineer magang di perusahaan mitra selama 1 tahun dan penyusunan karya tugas akhir berstandar industri.",
        courses: ["Residency Magang Software Engineer (1 Tahun)", "Praktik Code Review & Arsitektur", "Tugas Akhir Rekayasa Sistem Perangkat Lunak"]
      }
    ],
    coreCourses: [
      "Software Architecture & Design Patterns",
      "DevOps & Continuous Delivery",
      "Software Testing & Quality Assurance Automation",
      "Microservices & Distributed Systems",
      "Mobile Multi-Platform Development",
      "Cloud Infrastructure & Containerization",
      "Software Security & Secure Coding",
      "Agile Project Management & Team Collaboration"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Software Engineer / Software Architect",
        description: "Memimpin perancangan struktur perangkat lunak yang tangguh, aman, dan dapat diskalakan seiring pertumbuhan bisnis."
      },
      {
        category: "Professional / Intrapreneur",
        role: "DevOps Engineer / Site Reliability Engineer (SRE)",
        description: "Mengotomasi proses build, testing, dan rilis aplikasi serta menjaga uptime infrastruktur sistem 24/7."
      },
      {
        category: "Professional / Intrapreneur",
        role: "QA Automation Engineer",
        description: "Menulis skrip uji otomatis untuk menjamin tidak ada cacat atau bug sebelum perangkat lunak digunakan oleh konsumen."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Mobile Application Developer",
        description: "Menciptakan aplikasi smartphone yang intuitif, cepat, dan terhubung dengan berbagai API layanan perbankan atau e-commerce."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Software House Founder & Tech Lead",
        description: "Membangun studio perangkat lunak independen yang melayani pembuatan platform digital kustom untuk klien dalam dan luar negeri."
      },
      {
        category: "Consultant / Specialist",
        role: "Software Quality & Security Consultant",
        description: "Melakukan audit kualitas kode, vulnerability assessment, dan optimasi performa bagi platform digital enterprise."
      }
    ],
    facilities: [
      {
        name: "Software Architecture & Coding Studio",
        description: "Studio bernuansa tech startup dilengkapi dual monitor, mechanical keyboard, dan papan kanban untuk simulasi Agile development.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "QA Automation & Testing Laboratory",
        description: "Laboratorium pengujian dengan berbagai platform perangkat keras mobile, tablet, dan desktop untuk automated cross-browser testing.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Cloud Server & DevOps Sandbox",
        description: "Lingkungan virtual cluster untuk simulasi stress testing, load balancing, dan otomatisasi container deployment skala besar.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Triputra Group Tech Division",
      "PT Dharma Electrindo Manufacturing",
      "GitLab for Education",
      "Red Hat Academy",
      "Komunitas Pengembang Perangkat Lunak Indonesia"
    ],
    tuitionFeePerSemester: 6500000,
    scholarships: [
      "Beasiswa Penuh 100% Triputra Peduli",
      "Beasiswa Jalur Prestasi Coding & Hackathon",
      "Program Beasiswa Ikatan Kerja Anak Perusahaan Triputra"
    ],
    faqs: [
      {
        question: "Apa bedanya Rekayasa Perangkat Lunak (RPL) dengan Informatika?",
        answer: "Informatika mencakup spektrum ilmu komputasi yang sangat luas termasuk teori kecerdasan buatan, matematika komputasi, dan riset murni. Sedangkan RPL berfokus secara sangat mendalam pada praktik rekayasa perangkat lunak profesional: bagaimana membangun software skala besar dengan arsitektur bersih, pengujian otomatis, dan siklus rilis DevOps."
      },
      {
        question: "Apakah lulusan S1 RPL UPITRA bergelar S.Kom?",
        answer: "Benar, lulusan berhak atas gelar akademik resmi Sarjana Komputer (S.Kom.)."
      },
      {
        question: "Apakah mahasiswa difasilitasi magang di industri software?",
        answer: "Ya, UPITRA memiliki program magang 1 tahun penuh di mana mahasiswa ditempatkan langsung di tim rekayasa perangkat lunak korporasi mitra."
      }
    ]
  },

  // ==========================================
  // 4. S1 MANAJEMEN (FEB)
  // ==========================================
  {
    slug: "manajemen",
    aliases: ["manajemen-bisnis", "s1-manajemen", "business-management"],
    name: "S1 Manajemen",
    englishName: "Bachelor of Management – International Business & Entrepreneurship",
    degreeLevel: "S1",
    degreeTitle: "S.M.",
    degreeFullName: "Sarjana Manajemen",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT / LAMEMBA",
    faculty: {
      name: "Faculty Ekonomic & Bussiness",
      code: "FEB",
      slug: "feb",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Kelas Eksekutif Bisnis",
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80",
    tagline: "Membentuk Pemimpin Bisnis Berkarakter Unggul, Ahli Strategi Operasional, & Wirausahawan Tangguh",
    overview: [
      "Program Studi S1 Manajemen Universitas Pignatelli Triputra mempersiapkan calon manajer, pemimpin perusahaan, dan wirausahawan masa depan yang memiliki visi strategis tajam serta integritas moral kokoh.",
      "Kurikulum menggabungkan studi kasus bisnis kelas dunia (Harvard Case Study Method) dengan praktik langsung operasional bisnis di lingkungan grup korporasi Triputra yang bergerak di bidang manufaktur, logistik, agribisnis, dan jasa.",
      "Mahasiswa dibekali keterampilan kepemimpinan adaptif, manajemen pemasaran digital, manajemen rantai pasok (Supply Chain), serta literasi keuangan korporasi yang siap diaplikasikan di panggung global."
    ],
    whyUs: [
      {
        title: "Mentoring Langsung Eksekutif Korporasi",
        description: "Mendapatkan bimbingan dan kuliah tamu berkala dari para CEO, Director, dan Senior Manager di jaringan konglomerasi Triputra Group.",
        icon: "Users"
      },
      {
        title: "Inkubator Bisnis & Pendanaan Awal",
        description: "Dukungan inkubasi bisnis bagi mahasiswa yang ingin membangun usaha sendiri dengan akses mentoring dan peluang permodalan.",
        icon: "Rocket"
      },
      {
        title: "Fokus Manajemen Operasional & Supply Chain",
        description: "Keahlian langka yang sangat dicari industri manufaktur dan distribusi modern untuk efisiensi rantai pasok.",
        icon: "Truck"
      },
      {
        title: "Karakter Triputra DNA",
        description: "Penanaman budaya integritas, etika kerja unggul, kerja keras, dan kepedulian sosial yang menjadi fondasi keberhasilan ribuan pemimpin.",
        icon: "Shield"
      }
    ],
    specializations: [
      {
        title: "International Business & Strategic Management",
        description: "Mempelajari ekspansi bisnis lintas batas, analisis pasar global, strategi merger & akuisisi, serta manajemen perubahan korporat.",
        skills: ["Strategic Planning", "Global Market Entry", "Corporate Governance", "Change Leadership"]
      },
      {
        title: "Digital Marketing & Brand Strategy",
        description: "Menguasai strategi pemasaran modern berbasis data, branding omni-channel, social media marketing, dan growth hacking.",
        skills: ["Digital Ads & Analytics", "Brand Management", "Consumer Psychology", "Content Strategy"]
      },
      {
        title: "Supply Chain & Operations Excellence",
        description: "Fokus pada optimalisasi rantai pasok, manajemen pergudangan, lean manufacturing, dan logistik industri modern.",
        skills: ["Logistics & Warehousing", "Lean Six Sigma", "Procurement Management", "Inventory Control"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Business Fundamentals & Economics",
        description: "Fondasi pengantar manajemen, teori ekonomi mikro & makro, akuntansi dasar untuk pengambil keputusan, dan pembentukan integritas karakter.",
        courses: ["Pengantar Manajemen & Bisnis", "Ekonomi Mikro & Makro", "Dasar Akuntansi Bisnis", "Matematika Bisnis", "Pengembangan Karakter Kepemimpinan"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Functional Management Mastery",
        description: "Penguasaan 4 pilar fungsional bisnis: Manajemen Pemasaran, Manajemen Keuangan, Manajemen Operasional, dan Manajemen Sumber Daya Manusia.",
        courses: ["Manajemen Pemasaran Lanjut", "Manajemen Keuangan Korporat", "Manajemen Operasional & Mutu", "Manajemen SDM Strategis", "Hukum & Etika Bisnis"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Strategic Integration & Entrepreneurial Venture",
        description: "Integrasi strategi korporat, simulasi bisnis (Business Simulation Games), riset pasar, dan inkubasi rintisan usaha mahasiswa.",
        courses: ["Manajemen Strategis", "Perilaku Konsumen & Riset Pasar", "Supply Chain Management", "Inkubasi Bisnis & Kewirausahaan", "Metodologi Penelitian Manajemen"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Corporate Leadership Internship & Business Thesis",
        description: "Program magang kepemimpinan di unit operasional korporasi mitra dan penyusunan skripsi analisis strategis bisnis.",
        courses: ["Magang Manajemen Industri (1 Tahun)", "Praktik Kepemimpinan Eksekutif", "Skripsi Analisis Strategis Bisnis"]
      }
    ],
    coreCourses: [
      "Strategic Management & Corporate Policy",
      "Supply Chain & Operations Management",
      "Digital Marketing & Consumer Analytics",
      "Corporate Financial Planning & Valuation",
      "Human Capital Strategy & Leadership",
      "International Business & Global Trade",
      "New Venture Creation & Business Incubation",
      "Business Ethics & Corporate Governance"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Management Trainee (MT) / Operations Executive",
        description: "Menempuh jalur karir cepat (fast-track) menjadi manajer operasional di korporasi manufaktur, ritel, atau jasa."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Brand & Digital Marketing Manager",
        description: "Memimpin strategi komunikasi merek, kampanye pemasaran digital, dan peningkatan pangsa pasar produk perusahaan."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Supply Chain & Logistics Specialist",
        description: "Mengoptimalkan distribusi produk, negosiasi dengan pemasok global, dan efisiensi biaya logistik pergudangan."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Business Owner / Startup Founder",
        description: "Merintis dan mengelola bisnis mandiri dengan fondasi tata kelola keuangan, pemasaran, dan tim yang profesional."
      },
      {
        category: "Consultant / Specialist",
        role: "Business Development Consultant",
        description: "Memberikan analisis pasar dan bimbingan strategi pertumbuhan bagi pelaku usaha yang ingin memperluas skala bisnis."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Human Capital & Talent Development Officer",
        description: "Merancang program rekrutmen, pelatihan kompetensi karyawan, dan budaya organisasi yang berkinerja tinggi."
      }
    ],
    facilities: [
      {
        name: "Business Simulation & Decision Room",
        description: "Ruang rapat eksekutif bergaya boardroom dilengkapi layar multi-proyeksi untuk presentasi pitching bisnis dan simulasi pasar.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Entrepreneurship Innovation Hub",
        description: "Co-working space dinamis tempat mahasiswa inkubator bisnis berdiskusi, merancang purwarupa produk, dan bertemu investor.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Smart Presentation Studio",
        description: "Studio berteknologi perekaman audio-visual modern untuk melatih keterampilan public speaking, negosiasi, dan presentasi korporat.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Triputra Group Head Office",
      "PT Kirana Megatara Tbk",
      "PT Triputra Agro Persada Tbk",
      "PT Dharma Polimetal Tbk",
      "KADIN (Kamar Dagang & Industri) Jawa Tengah",
      "Himpunan Pengusaha Muda Indonesia (HIPMI)"
    ],
    tuitionFeePerSemester: 6000000,
    scholarships: [
      "Beasiswa Triputra Peduli Penuh 100%",
      "Beasiswa Wirausaha Muda Berprestasi",
      "Beasiswa Kepemimpinan OSIS / Organisasi Siswa",
      "Fasilitas Cicilan Pembayaran Fleksibel 0%"
    ],
    faqs: [
      {
        question: "Apakah mahasiswa difasilitasi untuk langsung magang di Triputra Group?",
        answer: "Ya, mahasiswa Program Studi S1 Manajemen UPITRA memiliki akses prioritas ke program magang kepemimpinan dan Management Trainee di berbagai lini bisnis Triputra Group (otomotif, agribisnis, logistik, dan perdagangan)."
      },
      {
        question: "Apa saja gelar yang didapat setelah lulus?",
        answer: "Lulusan menyandang gelar resmi Sarjana Manajemen (S.M.)."
      },
      {
        question: "Apakah ada bimbingan untuk mendirikan bisnis sendiri?",
        answer: "Tentu ada. UPITRA memiliki unit inkubasi bisnis kampus yang membimbing mahasiswa mulai dari validasi ide produk, strategi pemasaran, hingga pitching di hadapan mentor industri."
      }
    ]
  },

  // ==========================================
  // 5. S1 AKUNTANSI (FEB)
  // ==========================================
  {
    slug: "akuntansi",
    aliases: ["s1-akuntansi", "accounting", "accounting-digital-finance"],
    name: "S1 Akuntansi",
    englishName: "Bachelor of Accounting & Digital Finance",
    degreeLevel: "S1",
    degreeTitle: "S.Ak.",
    degreeFullName: "Sarjana Akuntansi",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT / LAMEMBA",
    faculty: {
      name: "Faculty Ekonomic & Bussiness",
      code: "FEB",
      slug: "feb",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Program Magang KAP / Korporasi",
    heroImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&auto=format&fit=crop&q=80",
    tagline: "Menghasilkan Akuntan Publik, Auditor Digital, & Analis Keuangan Korporat Berintegritas Tinggi",
    overview: [
      "Program Studi S1 Akuntansi UPITRA memadukan standar akuntansi keuangan internasional (IFRS) dengan penguasaan teknologi audit digital, analitika data keuangan, dan perencanaan perpajakan modern.",
      "Di era transformasi digital, seorang akuntan tidak lagi sekadar mencatat transaksi, melainkan menjadi penasihat keuangan strategis (Strategic Financial Advisor) yang memberikan rekomendasi alokasi modal dan kepatuhan bagi pimpinan perusahaan.",
      "Dengan landasan integritas moral tanpa kompromi, mahasiswa dilatih melakukan audit forensik, menguasai software akuntansi enterprise, serta dipersiapkan menempuh sertifikasi profesi bergengsi (CPA, CA, CMA, Brevet Pajak A & B)."
    ],
    whyUs: [
      {
        title: "Integrasi Teknologi Audit Digital",
        description: "Menggunakan software audit mutakhir, spreadsheet modeling lanjut, dan alat analitika forensik untuk mendeteksi anomali data keuangan.",
        icon: "FileCheck"
      },
      {
        title: "Jalur Cepat Sertifikasi CPA & Brevet",
        description: "Kurikulum telah diselaraskan dengan silabus sertifikasi akuntan publik (CPA Indonesia), Chartered Accountant (CA), dan Brevet Pajak A & B.",
        icon: "Award"
      },
      {
        title: "Kemitraan Kantor Akuntan Publik (KAP)",
        description: "Jaringan magang langsung di KAP nasional dan multinasional serta departemen audit internal korporasi konglomerasi.",
        icon: "Briefcase"
      },
      {
        title: "Penekanan Etika & Integritas Tinggi",
        description: "Menanamkan nilai kejujuran mutlak dalam pelaporan keuangan sesuai filosofi budaya kerja Triputra Group.",
        icon: "ShieldCheck"
      }
    ],
    specializations: [
      {
        title: "Digital Audit & Assurance",
        description: "Mempelajari metodologi audit keuangan independen, audit berbasis risiko, fraud examination, dan evaluasi pengendalian internal.",
        skills: ["Financial Auditing", "Computer-Assisted Audit Techniques (CAATs)", "Internal Controls", "Forensic Accounting"]
      },
      {
        title: "Corporate Taxation & Tax Strategy",
        description: "Fokus pada hukum perpajakan Indonesia dan internasional, perencanaan pajak legal (tax planning), dan e-tax compliance.",
        skills: ["PPh & PPN Compliance", "Corporate Tax Planning", "Transfer Pricing Basics", "Brevet Pajak A & B"]
      },
      {
        title: "Corporate Financial Analysis & FinTech",
        description: "Analisis valuasi perusahaan, manajemen arus kas, penganggaran modal, dan integrasi teknologi finansial dalam pelaporan.",
        skills: ["Financial Modeling", "Corporate Valuation", "Capital Budgeting", "FinTech Integration"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Accounting Principles & Mathematics",
        description: "Fondasi siklus akuntansi jasa, dagang, dan manufaktur, hukum bisnis, matematika ekonomi, dan penanaman integritas moral.",
        courses: ["Pengantar Akuntansi 1 & 2", "Hukum Bisnis & Regulasi", "Matematika Ekonomi", "Pengantar Bisnis & Manajemen", "Etika & Karakter Integritas"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Intermediate Accounting & Cost Systems",
        description: "Akuntansi keuangan menengah berbasis IFRS, akuntansi biaya produksi, sistem informasi akuntansi, dan dasar-dasar perpajakan.",
        courses: ["Akuntansi Keuangan Menengah 1 & 2", "Akuntansi Biaya & Manajemen Biaya", "Sistem Informasi Akuntansi (SIA)", "Perpajakan Indonesia (PPh & PPN)", "Statistika Keuangan"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Advanced Accounting, Auditing & Tax Planning",
        description: "Pemeriksaan akuntansi (Auditing), akuntansi keuangan lanjutan (konsolidasi), audit forensik, akuntansi sektor publik, dan lab software.",
        courses: ["Auditing & Asurans 1 & 2", "Akuntansi Keuangan Lanjutan", "Laboratorium Software Akuntansi & Pajak", "Akuntansi Manajemen Strategis", "Analisis Laporan Keuangan"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Corporate / KAP Residency & Research Thesis",
        description: "Program magang intensif di Kantor Akuntan Publik atau departemen akuntansi/pajak korporasi, serta penyelesaian skripsi.",
        courses: ["Magang Profesi Akuntansi (1 Tahun)", "Praktik Audit Independen", "Skripsi Akuntansi & Keuangan Terapan"]
      }
    ],
    coreCourses: [
      "Financial Accounting & Reporting (IFRS)",
      "Auditing & Assurance Standards",
      "Corporate Taxation & Tax Planning",
      "Accounting Information Systems & ERP",
      "Cost & Strategic Management Accounting",
      "Financial Statement Analysis & Valuation",
      "Forensic Accounting & Fraud Examination",
      "Professional Ethics in Accounting"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Auditor Kantor Akuntan Publik (KAP)",
        description: "Melakukan pemeriksaan independen atas kewajaran laporan keuangan berbagai korporasi klien nasional dan multinasional."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Corporate Accountant & Financial Controller",
        description: "Mengelola pembukuan, rekonsiliasi, dan penyusunan laporan keuangan konsolidasi di perusahaan berskala besar."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Tax Specialist / Tax Consultant",
        description: "Menghitung, melaporkan, dan merancang strategi efisiensi perpajakan perusahaan sesuai peraturan perundang-undangan."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Internal Auditor / Fraud Investigator",
        description: "Memantau kepatuhan prosedur operasional, mitigasi risiko keuangan, dan melakukan investigasi kecurangan internal."
      },
      {
        category: "Consultant / Specialist",
        role: "Financial Analyst & Wealth Advisor",
        description: "Menganalisis kinerja saham, rasio solvabilitas, dan kelayakan investasi modal bagi investor dan manajemen."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Accounting & Tax Services Agency Founder",
        description: "Membuka kantor konsultan jasa akuntansi dan perpajakan independen untuk membantu ratusan pelaku usaha."
      }
    ],
    facilities: [
      {
        name: "Accounting & Digital Tax Simulation Lab",
        description: "Laboratorium komputer yang dilengkapi software akuntansi populer (Accurate, Zahir, SAP Financial) dan aplikasi e-Faktur/e-SPT pajak.",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Financial Market & Investment Corner",
        description: "Fasilitas pemantauan data pasar modal real-time (Bursa Efek Indonesia) untuk praktik analisis rasio keuangan dan portofolio saham.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Mock Auditing Room",
        description: "Ruang simulasi pemeriksaan audit tempat mahasiswa mempraktikkan proses vouching dokumen, wawancara klien, dan working paper audit.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Ikatan Akuntan Indonesia (IAI)",
      "Kantor Akuntan Publik (KAP) Mitra Jawa Tengah & Jakarta",
      "Departemen Finance & Accounting Triputra Group",
      "Kantor Pelayanan Pajak (KPP) Surakarta",
      "Bursa Efek Indonesia (BEI)"
    ],
    tuitionFeePerSemester: 6000000,
    scholarships: [
      "Beasiswa Triputra Peduli Penuh 100%",
      "Beasiswa Juara Olimpiade Akuntansi & Ekonomi",
      "Subsidi Khusus Ujian Sertifikasi Profesi Brevet Pajak"
    ],
    faqs: [
      {
        question: "Apakah lulusan S1 Akuntansi UPITRA bisa langsung bekerja di Kantor Akuntan Publik?",
        answer: "Sangat bisa! Kurikulum S1 Akuntansi UPITRA dirancang selaras dengan standar audit KAP dan mahasiswa dibekali pengalaman magang langsung di kantor akuntan publik mitra."
      },
      {
        question: "Apa gelar yang didapatkan?",
        answer: "Gelar akademik yang diperoleh adalah Sarjana Akuntansi (S.Ak.)."
      },
      {
        question: "Apakah ada pelatihan sertifikasi Brevet Pajak A & B di kampus?",
        answer: "Ya, UPITRA menyelenggarakan pelatihan dan sertifikasi Brevet Pajak A & B terintegrasi di dalam laboratorium perpajakan kampus."
      }
    ]
  },

  // ==========================================
  // 6. S1 PARIWISATA (FSH)
  // ==========================================
  {
    slug: "pariwisata",
    aliases: ["s1-pariwisata", "hospitality-tourism", "tourism"],
    name: "S1 Pariwisata",
    englishName: "Bachelor of Tourism & Hospitality Business Management",
    degreeLevel: "S1",
    degreeTitle: "S.Par.",
    degreeFullName: "Sarjana Pariwisata",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT",
    faculty: {
      name: "Fakultas Social Humaniora",
      code: "FSH",
      slug: "fsh",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Praktik Industri Hospitaliti Internasional",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80",
    tagline: "Mencetak Pemimpin Industri Hospitaliti Bintang Lima, Pengelola Destinasi Wisata, & Event/MICE Director",
    overview: [
      "Program Studi S1 Pariwisata UPITRA dirancang untuk melahirkan para profesional berkelas dunia dan inovator di industri hospitality, travel, destinasi wisata berkelanjutan, serta penyelenggaraan event berskala internasional (MICE).",
      "Berada di kota Surakarta yang kaya akan warisan budaya adiluhung sekaligus pusat destinasi wisata Jawa Tengah, mahasiswa memiliki laboratorium hidup untuk mempelajari manajemen pariwisata berbasis budaya, kuliner, dan eco-tourism.",
      "Melalui kurikulum bertaraf internasional yang memadukan keahlian tata kelola hotel berbintang, strategi pemasaran destinasi, dan kemampuan multi-bahasa, lulusan disiapkan memimpin hotel rantai global, resort mewah, maupun konsultan pariwisata nasional."
    ],
    whyUs: [
      {
        title: "Jejaring Hotel Bintang Lima Internasional",
        description: "Kemitraan magang dan penempatan karir dengan jaringan hotel terkemuka (Marriott, Accor, Santika, Archipelago, dll.).",
        icon: "Building"
      },
      {
        title: "Laboratorium Mock Hotel & Suite Lengkap",
        description: "Fasilitas praktik front office, suite room, mock bar & restaurant, dan dapur perhotelan berstandar industri bintang 5.",
        icon: "Utensils"
      },
      {
        title: "Fokus Event & MICE Internasional",
        description: "Penguasaan manajemen konferensi, pameran internasional, dan festival seni berskala nasional maupun global.",
        icon: "Calendar"
      },
      {
        title: "Kemahiran Bahasa Asing Komersial",
        description: "Pembekalan intensif bahasa Inggris profesional serta bahasa asing kedua (Mandarin / Jepang) untuk melayani wisatawan global.",
        icon: "Globe"
      }
    ],
    specializations: [
      {
        title: "Luxury Hotel & Resort Management",
        description: "Manajemen operasional perhotelan mewah, revenue management, standar pelayanan tamu VIP, dan tata kelola food & beverage.",
        skills: ["Hotel Operations", "Yield & Revenue Management", "Customer Experience Design", "F&B Cost Control"]
      },
      {
        title: "MICE & International Event Planning",
        description: "Perancangan dan eksekusi event besar, festival musik, pameran dagang (exhibition), dan konferensi internasional.",
        skills: ["Event Budgeting & Logistics", "Vendor Coordination", "Sponsorship Acquisition", "Crisis Event Protocol"]
      },
      {
        title: "Sustainable Destination Planning & Eco-Tourism",
        description: "Perencanaan kawasan wisata ramah lingkungan, pengembangan desa wisata berbasis komunitas, dan pelestarian cagar budaya.",
        skills: ["Community-Based Tourism", "Tourism GIS Mapping", "Sustainability Assessment", "Heritage Interpretation"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Hospitality Foundations & World Geography",
        description: "Fondasi industri pariwisata global, geografi pariwisata, etika pelayanan prima (Hospitality Mindset), dan kemahiran bahasa Inggris.",
        courses: ["Pengantar Ilmu Pariwisata", "Prinsip Hospitaliti & Service Excellence", "Geografi Pariwisata Indonesia & Dunia", "Bahasa Inggris Pariwisata 1", "Etika & Tata Krama Internasional"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Hotel Operations & Tourism Marketing",
        description: "Praktik operasional kantor depan (Front Office), tata graha (Housekeeping), tata hidang (F&B Service), dan pemasaran digital destinasi.",
        courses: ["Operasional Kantor Depan & Tata Graha", "Manajemen Makanan & Minuman (F&B)", "Pemasaran Destinasi Wisata Digital", "Manajemen Usaha Perjalanan Wisata", "Bahasa Asing Komersial (Mandarin/Jepang)"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "MICE Management & Strategic Tourism Business",
        description: "Penyelenggaraan event MICE riil, revenue management perhotelan, manajemen risiko pariwisata, dan perencanaan pariwisata berkelanjutan.",
        courses: ["Manajemen MICE & Event Exhibition", "Revenue Management & Hotel Accounting", "Perencanaan & Pengembangan Destinasi", "Hukum & Kebijakan Pariwisata", "Metodologi Penelitian Pariwisata"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Global Hospitality Internship & Tourism Capstone",
        description: "Magang profesional 1 tahun di hotel bintang 5 atau dinas pariwisata / event organizer terkemuka, serta penyusunan karya skripsi.",
        courses: ["Magang Industri Hospitaliti / MICE (1 Tahun)", "Praktik Kepemimpinan Operasional Hotel", "Skripsi Studi Kelayakan Bisnis Pariwisata"]
      }
    ],
    coreCourses: [
      "Hotel & Resort Operations Management",
      "MICE & Mega-Event Organization",
      "Tourism Destination Marketing & Branding",
      "Sustainable Eco-Tourism & Heritage Tourism",
      "Food & Beverage Management & Mixology",
      "Hospitality Revenue & Yield Management",
      "Cross-Cultural Communication & Languages",
      "Tourism Business Feasibility Studies"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Hotel General Manager / Department Head",
        description: "Memimpin operasional menyeluruh hotel berbintang, mengelola ratusan staf, dan menjamin kepuasan tamu kelas dunia."
      },
      {
        category: "Professional / Intrapreneur",
        role: "MICE & Corporate Event Director",
        description: "Merencanakan, mengelola anggaran, dan mengeksekusi pameran bisnis serta konferensi tingkat menteri dan korporat."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Tourism Destination Developer & Consultant",
        description: "Bekerja di instansi pemerintah atau badan pariwisata untuk memetakan dan mengembangkan kawasan destinasi wisata baru."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Revenue & Yield Manager",
        description: "Mengoptimalkan penetapan tarif kamar hotel berdasarkan algoritma permintaan pasar untuk memaksimalkan profit."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Boutique Resort Owner / Travel Agency Founder",
        description: "Mendirikan resort bernuansa unik, glamping, atau biro perjalanan wisata tematik yang menarik wisatawan mancanegara."
      },
      {
        category: "Consultant / Specialist",
        role: "Sustainable Tourism Specialist",
        description: "Membantu pengelola destinasi wisata menerapkan standar ramah lingkungan dan sertifikasi CHSE internasional."
      }
    ],
    facilities: [
      {
        name: "Mock Hotel Room & Presidential Suite Lab",
        description: "Fasilitas kamar hotel bintang lima tiruan lengkap untuk praktik penataan kamar, housekeeping, dan standar inspeksi kamar VIP.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Fine Dining Restaurant & Bar Training Suite",
        description: "Restoran simulasi fine dining lengkap dengan bar counter untuk praktik table setting, pelayanan banquet, dan barista training.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "MICE & Event Planning Workshop",
        description: "Ruang kolaborasi kreatif untuk simulasi tender proposal acara, denah tata pameran (floor plan), dan audio-visual event.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Perhimpunan Hotel & Restoran Indonesia (PHRI)",
      "Accor Group",
      "Marriott International Partners",
      "Dinas Kepemudaan, Olahraga & Pariwisata Surakarta",
      "Asosiasi Perusahaan Pameran Indonesia (ASPERAPI)"
    ],
    tuitionFeePerSemester: 5800000,
    scholarships: [
      "Beasiswa Triputra Peduli 100% Penuh",
      "Beasiswa Duta Pariwisata Daerah (Mas/Mbak Solo & Jateng)",
      "Beasiswa Jalur Prestasi Bakat Seni & Budaya"
    ],
    faqs: [
      {
        question: "Apakah lulusan S1 Pariwisata hanya bisa bekerja di perhotelan?",
        answer: "Tidak! Spektrum karir S1 Pariwisata sangat luas, mencakup manajemen event (MICE), konsultan destinasi wisata, kementerian/dinas pariwisata, maskapai penerbangan internasional, perusahaan kapal pesiar, hingga wirausaha travel dan resort."
      },
      {
        question: "Gelar apa yang disandang lulusan?",
        answer: "Lulusan memperoleh gelar Sarjana Pariwisata (S.Par.)."
      },
      {
        question: "Apakah ada kesempatan magang di luar negeri?",
        answer: "Ya, UPITRA memfasilitasi mahasiswa berprestasi untuk mengikuti program magang industri hospitality di luar negeri (seperti Malaysia, Singapura, dan Timur Tengah) melalui jaringan mitra internasional."
      }
    ]
  },

  // ==========================================
  // 7. S1 BAHASA INGGRIS (FSH)
  // ==========================================
  {
    slug: "bahasa-inggris",
    aliases: ["s1-bahasa-inggris", "english", "english-business-communication"],
    name: "S1 Bahasa Inggris",
    englishName: "Bachelor of English for Business & Corporate Communication",
    degreeLevel: "S1",
    degreeTitle: "S.Li.",
    degreeFullName: "Sarjana Linguistik",
    accreditation: "Baik Sekali",
    accreditationBody: "BAN-PT",
    faculty: {
      name: "Fakultas Social Humaniora",
      code: "FSH",
      slug: "fsh",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Praktik Penerjemahan / Media Korporat",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
    tagline: "Menguasai Komunikasi Bisnis Global, Diplomasi Korporat, & Industri Penerjemahan Profesional",
    overview: [
      "Program Studi S1 Bahasa Inggris UPITRA menekankan aplikasi bahasa Inggris tingkat tinggi untuk kebutuhan bisnis global, hubungan masyarakat korporat (Corporate PR), diplomasi internasional, serta industri penerjemahan dan lokalisasi konten digital.",
      "Mahasiswa tidak hanya mendalami kaidah tata bahasa dan linguistik, namun dilatih menjadi komunikator strategis yang piawai menyusun siaran pers korporat, memimpin negosiasi bisnis multibahasa, menyunting dokumen hukum komersial, dan memproduksi konten digital bertaraf internasional.",
      "Dengan kurikulum komunikatif berbasis proyek dan laboratorium multimedia canggih, lulusan tampil percaya diri berkarir di perusahaan multinasional, kedutaan besar, media internasional, maupun agensi komunikasi terkemuka."
    ],
    whyUs: [
      {
        title: "Fokus English for Business & PR",
        description: "Kurikulum diarahkan langsung pada kebutuhan riil dunia kerja korporasi: negosiasi, presentasi eksekutif, dan penulisan laporan bisnis internasional.",
        icon: "Briefcase"
      },
      {
        title: "Laboratorium Penerjemahan Simultan",
        description: "Dilengkapi booth interpreter simultan berstandar konferensi PBB untuk melatih penerjemah lisan (interpreter) dan tulisan (translator).",
        icon: "Headphones"
      },
      {
        title: "Penguasaan AI Tools untuk Linguistik",
        description: "Memanfaatkan teknologi Computer-Assisted Translation (CAT Tools) dan AI prompt engineering untuk lokalisasi konten modern.",
        icon: "Cpu"
      },
      {
        title: "Kemitraan Perusahaan Multinasional",
        description: "Jaringan penempatan magang di divisi Public Relations dan External Communications perusahaan mitra Triputra Group dan agensi internasional.",
        icon: "Globe"
      }
    ],
    specializations: [
      {
        title: "Corporate Communication & Public Relations",
        description: "Menyusun strategi komunikasi krisis, menjalin relasi media internasional, branding korporat, dan penyelenggaraan press conference.",
        skills: ["Media Relations", "Crisis Communication", "Speech Writing", "Corporate Social Responsibility (CSR) Storytelling"]
      },
      {
        title: "Professional Translation & Localization",
        description: "Penerjemahan teks hukum, medis, finansial, subtitle film, serta lokalisasi antarmuka aplikasi digital dari bahasa Inggris ke Indonesia dan sebaliknya.",
        skills: ["CAT Tools (SDL Trados/MemoQ)", "Subtitling & Dubbing", "Legal Translation", "Localization Engineering"]
      },
      {
        title: "Global Content Strategy & Digital Media",
        description: "Memproduksi copywriting persuasif, artikel jurnalisme investigatif internasional, podcasting bahasa Inggris, dan pengelolaan media sosial.",
        skills: ["SEO Copywriting", "Content Marketing", "Audio-Visual Storytelling", "Brand Journalism"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Advanced English Proficiency & Foundations",
        description: "Penguasaan tata bahasa tingkat lanjut, pengucapan standar internasional (Phonetics), percakapan akademik, dan pengantar ilmu linguistik.",
        courses: ["Advanced English Grammar", "Pronunciation & Oral Communication", "Academic Reading & Critical Thinking", "Introduction to Linguistics", "Pengembangan Karakter Komunikasi"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Business Communication & Translation Basics",
        description: "Keterampilan korespondensi bisnis, penulisan artikel persuasif, dasar teori penerjemahan, dan linguistik korpus komputer.",
        courses: ["Business English Writing & Correspondence", "Public Speaking & Presentation Skills", "Theory & Practice of Translation", "Sociolinguistics & Culture", "Intercultural Communication"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Simultaneous Interpreting & Corporate PR",
        description: "Praktik penerjemahan lisan konferensi (Interpreting), manajemen PR korporasi internasional, penyuntingan teks, dan CAT tools.",
        courses: ["Simultaneous & Consecutive Interpreting", "Corporate Public Relations in English", "Computer-Assisted Translation (CAT Tools)", "Subtitling & Audio-Visual Translation", "Metodologi Penelitian Bahasa"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Corporate Communications Internship & Thesis",
        description: "Magang kerja profesional selama 1 tahun di divisi komunikasi korporat atau agensi penerjemahan, serta penulisan skripsi.",
        courses: ["Magang Komunikasi Korporat / Translator (1 Tahun)", "Praktik Negosiasi & Diplomasi Bisnis", "Skripsi Linguistik Terapan / Studi Terjemahan"]
      }
    ],
    coreCourses: [
      "Advanced Business English & Negotiation",
      "Corporate Public Relations & Crisis Management",
      "Simultaneous & Consecutive Interpreting",
      "Legal, Financial & Medical Translation",
      "Computer-Assisted Translation (CAT) & Localization",
      "Digital Content Strategy & Copywriting",
      "Cross-Cultural Management & Global Etiquette",
      "Discourse Analysis & Media Studies"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Corporate Communication Specialist / International PR",
        description: "Menjadi juru bicara dan perancang strategi pesan komunikasi korporat dengan mitra bisnis global dan media massa."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Professional Conference Interpreter",
        description: "Menerjemahkan pidato dan pembicaraan secara langsung (simultan) pada konferensi tingkat menteri dan seminar internasional."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Certified Sworn Translator / Localization Specialist",
        description: "Menerjemahkan dokumen hukum, kontrak bisnis, dan melokalisasi perangkat lunak agar sesuai dengan pasar bahasa target."
      },
      {
        category: "Professional / Intrapreneur",
        role: "International Diplomatic Staff / Liaison Officer",
        description: "Mendampingi delegasi asing, memfasilitasi komunikasi bilateral, dan mengelola hubungan diplomatik kelembagaan."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Translation Agency & Language Services Founder",
        description: "Mendirikan agensi jasa penerjemahan, voice-over, dan penulisan konten multibahasa yang melayani pasar ekspor."
      },
      {
        category: "Consultant / Specialist",
        role: "Global Copywriter & Content Strategist",
        description: "Menulis narasi kampanye promosi dan landing page produk berbahasa Inggris untuk merek-merek kelas dunia."
      }
    ],
    facilities: [
      {
        name: "Simultaneous Interpreting & Conference Lab",
        description: "Ruang simulasi konferensi internasional berstandar ISO dengan soundproof booth, headset nirkabel, dan mikrofon konferensi.",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Multimedia Translation & Subtitling Studio",
        description: "Laboratorium komputer dengan software CAT tools berlisensi (Trados, MemoQ) dan software penyuntingan subtitle film.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Podcast & Corporate PR Broadcast Studio",
        description: "Studio rekaman podcast kedap suara untuk latihan siaran pers, interview media, dan produksi konten komunikasi korporasi.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Himpunan Penerjemah Indonesia (HPI)",
      "Perhumas (Perhimpunan Hubungan Masyarakat Indonesia)",
      "Divisi Corporate Communications Triputra Group",
      "Penerbit & Kantor Berita Nasional",
      "Pusat Kebudayaan Asing di Indonesia"
    ],
    tuitionFeePerSemester: 5500000,
    scholarships: [
      "Beasiswa Triputra Peduli 100% Penuh",
      "Beasiswa Prestasi Juara Debat Bahasa Inggris / MUN",
      "Beasiswa TOEFL / IELTS Skor Tinggi"
    ],
    faqs: [
      {
        question: "Apakah lulusan S1 Bahasa Inggris hanya menjadi guru bahasa Inggris?",
        answer: "Sama sekali tidak! Program Studi S1 Bahasa Inggris UPITRA berfokus pada aplikasi bisnis korporat, penerjemah tersumpah (sworn translator), interpreter simultan konferensi, PR internasional, dan diplomat, bukan prodi keguruan."
      },
      {
        question: "Gelar apa yang didapat setelah lulus?",
        answer: "Lulusan berhak menyandang gelar resmi Sarjana Linguistik (S.Li.)."
      },
      {
        question: "Apakah ada pelatihan sertifikasi penerjemah profesional?",
        answer: "Ya, UPITRA bekerja sama dengan Himpunan Penerjemah Indonesia (HPI) untuk membekali mahasiswa dengan sertifikasi profesi penerjemahan resmi."
      }
    ]
  },

  // ==========================================
  // 8. S1 KESEHATAN & KESELAMATAN KERJA (FH)
  // ==========================================
  {
    slug: "kesehatan-dan-keselamatan-kerja",
    aliases: ["k3", "s1-k3", "occupational-health-safety", "hse"],
    name: "S1 Kesehatan & Keselamatan Kerja (K3)",
    englishName: "Bachelor of Applied Health in Occupational Safety & Health (OSH / HSE)",
    degreeLevel: "S1",
    degreeTitle: "S.Tr.Kes.",
    degreeFullName: "Sarjana Terapan Kesehatan",
    accreditation: "Baik Sekali",
    accreditationBody: "LAM-PTKes",
    faculty: {
      name: "Faculty Health",
      code: "FH",
      slug: "fh",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Praktik Inspeksi Lapangan Industri Triputra",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop&q=80",
    tagline: "Mencetak Ahli K3 Korporat, HSE Manager, & Auditor Keselamatan Industri Manufaktur & Energi",
    overview: [
      "Program Studi S1 Kesehatan & Keselamatan Kerja (K3) / HSE UPITRA mendidik para ahli keselamatan dan kesehatan lingkungan kerja yang memegang peranan krusial dalam melindungi nyawa tenaga kerja, aset pabrik, dan kelestarian lingkungan hidup.",
      "Sesuai regulasi wajib undang-undang ketenagakerjaan nasional dan standar internasional (ISO 45001 & ISO 14001), setiap industri manufaktur, pertambangan, minyak & gas, konstruksi, perkebunan, dan rumah sakit wajib mempekerjakan tenaga ahli K3 bersertifikat.",
      "Keunggulan unik UPITRA terletak pada akses laboratorium lapangan langsung di pabrik-pabrik manufaktur komponen otomotif (PT Dharma Polimetal) dan perkebunan kelapa sawit skala besar Triputra Group, sehingga mahasiswa memahami implementasi nyata manajemen risiko bahaya industri."
    ],
    whyUs: [
      {
        title: "Laboratorium Hidup Pabrik & Industri Triputra",
        description: "Praktik inspeksi keselamatan riil di lantai pabrik manufaktur dan operasional industri berat mitra Triputra Group.",
        icon: "Factory"
      },
      {
        title: "Sertifikasi Resmi Ahli K3 Umum Kemenaker",
        description: "Lulusan difasilitasi memperoleh sertifikasi kompetensi Ahli K3 Umum yang diterbitkan oleh Kementerian Ketenagakerjaan RI.",
        icon: "ShieldAlert"
      },
      {
        title: "Kebutuhan Pasar Kerja Sangat Tinggi",
        description: "Kepatuhan K3 adalah kewajiban hukum perusahaan, menjadikan lulusan K3 selalu dicari dengan tingkat serapan kerja yang luar biasa.",
        icon: "TrendingUp"
      },
      {
        title: "Peralatan Higiene Industri Lengkap",
        description: "Didukung instrumen pengukuran kebisingan (Sound Level Meter), pencahayaan (Lux Meter), gas detektor, dan alat uji debu.",
        icon: "Activity"
      }
    ],
    specializations: [
      {
        title: "Industrial Safety Management & HSE Auditing",
        description: "Identifikasi bahaya dan penilaian risiko (HIRADC), investigasi kecelakaan kerja, audit sistem manajemen K3 (SMK3 / ISO 45001).",
        skills: ["HIRADC / JSA Risk Assessment", "SMK3 & ISO 45001 Auditing", "Incident Investigation", "Emergency Response Protocol"]
      },
      {
        title: "Industrial Hygiene & Ergonomics",
        description: "Pengukuran faktor bahaya fisika, kimia, dan biologi di tempat kerja, analisis postur kerja ergonomis (REBA/RULA), dan pencegahan penyakit akibat kerja.",
        skills: ["Ergonomic Assessment (RULA/REBA)", "Noise & Dust Monitoring", "Chemical Safety & MSDS", "Occupational Disease Prevention"]
      },
      {
        title: "Environmental Health & Waste Safety",
        description: "Pengelolaan limbah B3 (Bahan Berbahaya dan Beracun), audit kepatuhan lingkungan hidup (ISO 14001 / AMDAL), dan keselamatan kerja maritim/energi.",
        skills: ["Hazardous Waste (B3) Management", "ISO 14001 Environmental Audit", "Wastewater Monitoring", "Carbon Emission Tracking"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Health Science & Safety Foundations",
        description: "Dasar anatomi dan fisiologi tubuh manusia, pengantar kesehatan masyarakat, dasar keselamatan kerja, dan etika profesi keselamatan.",
        courses: ["Anatomi & Fisiologi Manusia", "Dasar Kesehatan & Keselamatan Kerja", "Pengantar Higiene Industri", "Fisika & Kimia Dasar untuk K3", "Etika & Regulasi Ketenagakerjaan"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Risk Identification & Industrial Hazards",
        description: "Metodologi identifikasi bahaya kerja (HIRADC), toksikologi industri, keselamatan kerja listrik & mekanik, ergonomi, dan keselamatan kebakaran.",
        courses: ["Manajemen Risiko K3 (HIRADC & HAZOP)", "Ergonomi Industri & Fisiologi Kerja", "Keselamatan Kebakaran & Tanggap Darurat", "Toksikologi Industri & B3", "Higiene Industri: Faktor Fisik & Kimia"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "SMK3 Auditing & Corporate HSE Leadership",
        description: "Audit SMK3 (PP 50/2012) & ISO 45001, investigasi kecelakaan kerja, keselamatan konstruksi dan manufaktur, serta sertifikasi K3.",
        courses: ["Sistem Manajemen K3 (SMK3 & ISO 45001)", "Investigasi & Analisis Kecelakaan Kerja", "K3 Konstruksi, Manufaktur & Agribisnis", "Pengelolaan Lingkungan Hidup (ISO 14001)", "Metodologi Riset K3"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Industrial HSE Residency & Capstone Project",
        description: "Magang kerja penuh sebagai HSE Officer di pabrik manufaktur atau perkebunan mitra selama 1 tahun, serta penyusunan skripsi terapan.",
        courses: ["Residency Magang HSE Officer (1 Tahun)", "Praktik Audit Keselamatan Lapangan", "Skripsi Rekayasa Pengendalian Risiko K3"]
      }
    ],
    coreCourses: [
      "Hazard Identification & Risk Assessment (HIRADC)",
      "Safety Management Systems (ISO 45001 & SMK3)",
      "Industrial Hygiene & Environmental Monitoring",
      "Ergonomics & Work Physiology Assessment",
      "Fire Protection & Disaster Preparedness",
      "Accident Investigation & Root Cause Analysis",
      "Chemical & Hazardous Waste (B3) Management",
      "Occupational Disease Prevention & First Aid"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "HSE (Health, Safety & Environment) Officer",
        description: "Mengawasi penerapan standar keselamatan kerja harian, briefing keselamatan (safety talk), dan kepatuhan APD di pabrik atau proyek."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Corporate HSE Manager / Director",
        description: "Merumuskan kebijakan keselamatan jangka panjang korporasi, memimpin tim keselamatan lintas pabrik, dan mengelola audit SMK3."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Industrial Ergonomist & Workplace Assessor",
        description: "Menganalisis postur kerja operator di lini perakitan untuk mencegah cedera otot (musculoskeletal disorders) dan meningkatkan efisiensi."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Hospital & Healthcare Safety Officer",
        description: "Menjaga keselamatan kerja tenaga medis, tata kelola limbah medis infeksius, dan sistem proteksi kebakaran di rumah sakit."
      },
      {
        category: "Consultant / Specialist",
        role: "HSE Auditor & Environmental Consultant",
        description: "Melakukan audit independen kepatuhan ISO 45001, ISO 14001, dan menyusun dokumen analisis dampak lingkungan untuk perusahaan."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Safety Equipment & OSH Training Agency Founder",
        description: "Mendirikan lembaga pelatihan keselamatan kerja bersertifikasi dan penyedia alat pelindung diri (APD) terakreditasi."
      }
    ],
    facilities: [
      {
        name: "Industrial Hygiene & Ergonomics Laboratory",
        description: "Dilengkapi sound level meter, lux meter, heat stress monitor, personal dust sampler, dan manekin uji postur ergonomi.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Fire Safety & Emergency Response Simulation Ground",
        description: "Area pelatihan pemadaman api menggunakan berbagai jenis APAR (alat pemadam api ringan), hydrant, dan simulasi evakuasi darurat.",
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "First Aid & Occupational Health Mock Clinic",
        description: "Ruang simulasi pertolongan pertama pada kecelakaan kerja (P3K), CPR resuscitation trainer, dan evaluasi tanda vital pekerja.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Kementerian Ketenagakerjaan RI",
      "PT Dharma Polimetal Tbk (Manufaktur Otomotif)",
      "PT Triputra Agro Persada Tbk (Agribisnis)",
      "Asosiasi Ahli Keselamatan & Kesehatan Kerja (A2K3)",
      "RS Jejaring Triputra Care"
    ],
    tuitionFeePerSemester: 5800000,
    scholarships: [
      "Beasiswa Penuh 100% Triputra Peduli",
      "Beasiswa Calon Ahli K3 Berprestasi",
      "Subsidi Khusus Pelatihan Sertifikasi Ahli K3 Umum Kemenaker"
    ],
    faqs: [
      {
        question: "Apakah lulusan K3 UPITRA mendapatkan sertifikat Ahli K3 Umum?",
        answer: "Ya, UPITRA mengintegrasikan kurikulum sertifikasi Ahli K3 Umum Kemenaker sehingga mahasiswa yang memenuhi syarat kompetensi bisa memperoleh lisensi resmi saat lulus."
      },
      {
        question: "Gelar apa yang didapat setelah menyelesaikan studi S1 K3?",
        answer: "Lulusan berhak menyandang gelar Sarjana Terapan Kesehatan (S.Tr.Kes.)."
      },
      {
        question: "Di mana saja sarjana K3 bisa bekerja?",
        answer: "Setiap sektor industri membutuhkan ahli K3: pabrik manufaktur otomotif, tambang, perminyakan, konstruksi gedung/jembatan, bandar udara, pelabuhan, rumah sakit, hingga instansi pemerintahan (Kemenaker/Kemenkes)."
      }
    ]
  },

  // ==========================================
  // 9. S1 FISIOTERAPI (FH)
  // ==========================================
  {
    slug: "fisioterapi",
    aliases: ["s1-fisioterapi", "physiotherapy", "sports-physiotherapy"],
    name: "S1 Fisioterapi",
    englishName: "Bachelor of Physiotherapy & Sports Rehabilitation",
    degreeLevel: "S1",
    degreeTitle: "S.Ft.",
    degreeFullName: "Sarjana Fisioterapi",
    accreditation: "Baik Sekali",
    accreditationBody: "LAM-PTKes",
    faculty: {
      name: "Faculty Health",
      code: "FH",
      slug: "fh",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "8 Semester (4 Tahun)",
    totalSks: "144 SKS",
    studyMode: "Reguler & Praktik Klinis Rumah Sakit Jejaring",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&auto=format&fit=crop&q=80",
    tagline: "Ahli Terapi Pemulihan Gerak & Fungsi Tubuh, Rehabilitasi Cedera Olahraga, & Fisioterapi Klinis",
    overview: [
      "Program Studi S1 Fisioterapi UPITRA mencetak para profesional kesehatan ahli gerak dan fungsi tubuh manusia yang terampil dalam asesmen, diagnosis fisioterapi, intervensi manual terapi, elektroterapi, dan perancangan program rehabilitasi medik.",
      "Seiring meningkatnya kesadaran masyarakat akan gaya hidup sehat, tren olahraga intensif, serta penuaan populasi (geriatri), kebutuhan fisioterapis kompeten di rumah sakit, klinik spesialis, pusat kebugaran, dan klub olahraga profesional melonjak drastis.",
      "Mahasiswa UPITRA dibekali fasilitas klinik simulasi rehabilitasi modern, laboratorium elektroterapi dan hidroterapi, serta rotasi praktik klinis langsung di rumah sakit rekanan ternama di Jawa Tengah dan sekitarnya."
    ],
    whyUs: [
      {
        title: "Fokus Fisioterapi Olahraga (Sports Rehab)",
        description: "Penguasaan teknik penanganan cedera atletik, return-to-sport testing, kinesio-taping, dan peningkatan performa atlet profesional.",
        icon: "Dumbbell"
      },
      {
        title: "Klinik Fisioterapi Kampus Modern",
        description: "Praktik langsung melayani pasien nyata di bawah supervisi dosen fisioterapis senior di klinik rehabilitasi kampus.",
        icon: "HeartHandshake"
      },
      {
        title: "Rotasi Klinis di Rumah Sakit Rujukan",
        description: "Penempatan stase klinis di bangsal saraf, ortopedi, kardiorespirasi, pediatri, dan unit rawat intensif (ICU).",
        icon: "Building2"
      },
      {
        title: "Jenjang Lanjutan Profesi Fisioterapis",
        description: "Kurikulum dirancang berkesinambungan untuk memudahkan lulusan melanjutkan ke program Pendidikan Profesi Fisioterapis.",
        icon: "GraduationCap"
      }
    ],
    specializations: [
      {
        title: "Sports & Musculoskeletal Physiotherapy",
        description: "Penanganan cedera ligamen (ACL/MCL), dislokasi sendi, nyeri punggung bawah (LBP), terapi manual sendi, dan pemulihan performa olahraga.",
        skills: ["Manual Therapy (Maitland/Mulligan)", "Sports Injury Taping", "Dry Needling Basics", "Biomechanical Motion Analysis"]
      },
      {
        title: "Neurological & Pediatric Physiotherapy",
        description: "Rehabilitasi fungsi motorik pasca stroke, cedera saraf tulang belakang, Parkinson, serta stimulasi tumbuh kembang anak berkebutuhan khusus (Cerebral Palsy).",
        skills: ["Bobath / Neurodevelopmental Technique", "Gait Training Rehabilitation", "Sensory Integration", "Pediatric Motor Assessment"]
      },
      {
        title: "Cardiorespiratory & Geriatric Wellness",
        description: "Fisioterapi paru dan jantung pasca operasi bedah, pembersihan jalan napas, serta program kebugaran lansia pencegahan risiko jatuh.",
        skills: ["Chest Physiotherapy & Drainage", "Cardiac Rehab Protocol", "Balance Training in Elderly", "ICU Early Mobilization"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Biomedical Science & Functional Anatomy",
        description: "Fondasi anatomi muskuloskeletal terinci, fisiologi gerak manusia, kinesiologi, biomekanika sendi, dan penanaman etika empati medis.",
        courses: ["Anatomi Muskuloskeletal & Saraf", "Fisiologi Sistem Gerak Manusia", "Kinesiologi & Biomekanika", "Fisika & Elektroterapi Dasar", "Etika Profesi Fisioterapi"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Physiotherapy Assessment & Manual Modalities",
        description: "Pemeriksaan fungsi gerak spesifik, palpasi klinis, modalitas terapi latihan, elektroterapi (TENS, Ultrasound, Laser), dan terapi manual.",
        courses: ["Pemeriksaan & Pengukuran Fisioterapi", "Terapi Latihan & Gimnastik Medis", "Elektroterapi & Sumber Fisis", "Teknik Terapi Manual Sendi", "Patologi Umum & Sistem Penyakit"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Clinical Specialties & Sports Rehabilitation",
        description: "Penanganan fisioterapi pada kasus muskuloskeletal, neurologi, kardiorespirasi, pediatri, dan manajemen cedera olahraga lapangan.",
        courses: ["Fisioterapi Muskuloskeletal & Bedah", "Fisioterapi Neurologi Dewasa & Anak", "Fisioterapi Kardiorespirasi & ICU", "Fisioterapi Olahraga & Kebugaran", "Metodologi Riset Fisioterapi"]
      },
      {
        year: "Tahun 4 (Semester 7 - 8)",
        stageTitle: "Clinical Hospital Internship & Research Thesis",
        description: "Praktik stase klinis komprehensif di rumah sakit jejaring, penanganan pasien di bawah supervisi klinis, dan penulisan skripsi.",
        courses: ["Praktik Klinik Fisioterapi Rumah Sakit (1 Tahun)", "Praktik Komprehensif Klinik Olahraga", "Skripsi Evaluasi Klinis Terapi Gerak"]
      }
    ],
    coreCourses: [
      "Functional Anatomy & Applied Kinesiology",
      "Manual Therapy & Joint Mobilization",
      "Sports Injury Management & Return-to-Play",
      "Neurological Rehabilitation (Stroke & Spine)",
      "Electrotherapy & Physical Agents",
      "Cardiopulmonary Physiotherapy & ICU Care",
      "Pediatric Motor Development Therapy",
      "Geriatric Balance & Fall Prevention"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Fisioterapis Rumah Sakit & Pusat Rehabilitasi Medik",
        description: "Melakukan asesmen dan merawat pasien pasca stroke, operasi tulang, atau penyakit kronis di instalasi rehabilitasi medik."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Sports Team Physiotherapist",
        description: "Mendampingi atlet dan klub olahraga profesional dalam pencegahan cedera, pertolongan di tepi lapangan, dan pemulihan performa."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Pediatric Physical Therapist",
        description: "Membantu anak-anak dengan kelainan tumbuh kembang fisik dan motorik agar mencapai kemandirian gerak optimal."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Occupational Ergonomics & Posture Consultant",
        description: "Bekerja sama dengan tim K3 korporasi untuk mengatasi keluhan nyeri leher dan punggung akibat postur kerja kantor/pabrik."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Private Physiotherapy Clinic & Wellness Studio Owner",
        description: "Membuka klinik mandiri fisioterapi dan pusat pemulihan cedera olahraga berfasilitas gym medik modern."
      },
      {
        category: "Consultant / Specialist",
        role: "Geriatric & Active Aging Specialist",
        description: "Merancang program kebugaran dan terapi gerak aktif untuk komunitas lansia agar tetap bugar dan bebas nyeri sendi."
      }
    ],
    facilities: [
      {
        name: "Sports Physiotherapy & Gym Rehabilitation Lab",
        description: "Dilengkapi treadmill medik, leg press, balance board, suspension trainer, dan peralatan functional movement screen (FMS).",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Electrotherapy & Physical Modalities Suite",
        description: "Memiliki perangkat Ultrasound Therapy, TENS/Interferensial Current, Shortwave Diathermy (SWD), Infrared, dan Traction Bed otomatis.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Pediatric & Neuro-Developmental Training Room",
        description: "Ruangan empuk bersahabat anak dengan gym ball, matras sensori, parallel bar anak, dan alat bantu stimulasi motorik halus/kasar.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Ikatan Fisioterapi Indonesia (IFI)",
      "RS Ortopedi Prof. Dr. R. Soeharso Surakarta",
      "Klub Olahraga Atletik & Sepak Bola Regional",
      "Klinik Rehabilitasi Medik Jejaring Triputra Care",
      "Pusat Pelatihan Atlet Daerah (KONI)"
    ],
    tuitionFeePerSemester: 6000000,
    scholarships: [
      "Beasiswa Triputra Peduli Penuh 100%",
      "Beasiswa Calon Tenaga Kesehatan Berprestasi",
      "Beasiswa Atlet & Prestasi Cabang Olahraga"
    ],
    faqs: [
      {
        question: "Apakah lulusan S1 Fisioterapi langsung bisa praktik?",
        answer: "Lulusan S1 Fisioterapi berhak menyandang gelar S.Ft. Untuk membuka praktik mandiri secara legal sesuai regulasi kesehatan, lulusan melanjutkan ke program Pendidikan Profesi Fisioterapis selama 1 tahun untuk mendapatkan Surat Tanda Registrasi (STR)."
      },
      {
        question: "Di mana mahasiswa melaksanakan praktik klinis?",
        answer: "Mahasiswa menjalani rotasi klinis di rumah sakit rujukan ortopedi ternama di Surakarta, rumah sakit umum daerah, klinik fisioterapi mandiri, dan fasilitas kesehatan jejaring."
      },
      {
        question: "Apakah program ini menerima lulusan SMA dari semua jurusan?",
        answer: "Program S1 Fisioterapi menerima lulusan SMA/MA jurusan IPA, SMK Kesehatan, dan lulusan dengan ketertarikan kuat pada ilmu anatomi tubuh manusia."
      }
    ]
  },

  // ==========================================
  // 10. D3 KEPERAWATAN (FH)
  // ==========================================
  {
    slug: "keperawatan",
    aliases: ["d3-keperawatan", "nursing", "vocational-nursing"],
    name: "D3 Keperawatan",
    englishName: "Diploma in Nursing – Clinical & Emergency Care",
    degreeLevel: "D3",
    degreeTitle: "A.Md.Kep.",
    degreeFullName: "Ahli Madya Keperawatan",
    accreditation: "Baik Sekali",
    accreditationBody: "LAM-PTKes",
    faculty: {
      name: "Faculty Health",
      code: "FH",
      slug: "fh",
    },
    campusLocation: "Kampus Utama UPITRA, Surakarta",
    duration: "6 Semester (3 Tahun)",
    totalSks: "108 SKS",
    studyMode: "Vokasi Praktik Klinis Rumah Sakit & Komunitas",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1600&auto=format&fit=crop&q=80",
    tagline: "Tenaga Vokasi Keperawatan Terampil, Tanggap Gawat Darurat, & Berdedikasi Penuh Empati Kasih",
    overview: [
      "Program Studi Diploma 3 (D3) Keperawatan UPITRA berfokus pada pembinaan perawat vokasi yang terampil, tangkas, beretika luhur, dan siap bekerja langsung di lini depan pelayanan kesehatan (Rumah Sakit, Klinik, Puskesmas, dan Home Care).",
      "Sebagai program vokasi, kurikulum menitikberatkan pada keterampilan praktis klinis (60% praktik laboratorium dan rumah sakit, 40% teori). Mahasiswa dilatih menguasai prosedur asuhan keperawatan menyeluruh, penanganan gawat darurat (Basic Trauma & Cardiac Life Support / BTCLS), serta komunikasi terapeutik penuh welas asih.",
      "Melalui jejaring kemitraan rumah sakit terkemuka dan ekosistem pelayanan kesehatan Triputra Care, lulusan memiliki tingkat keterserapan kerja sangat cepat, bahkan banyak yang telah menandatangani kontrak kerja sebelum wisuda."
    ],
    whyUs: [
      {
        title: "Laboratorium Mini Hospital & OSCE Lengkap",
        description: "Fasilitas laboratorium ruang rawat inap simulasi, ruang gawat darurat (ICU/IGD), dan manekin simulator berteknologi tinggi.",
        icon: "Hospital"
      },
      {
        title: "Sertifikasi Wajib BTCLS Berlisensi",
        description: "Setiap calon lulusan dibekali sertifikasi Basic Trauma & Cardiac Life Support (BTCLS) sebagai modal wajib kerja di RS modern.",
        icon: "HeartPulse"
      },
      {
        title: "Jalur Cepat Kerja Lulusan (Fast Employment)",
        description: "Lulusan vokasi keperawatan memiliki tingkat permintaan sangat tinggi dan langsung diserap oleh jejaring rumah sakit mitra.",
        icon: "Briefcase"
      },
      {
        title: "Pendidikan Berkarakter Welas Asih",
        description: "Menanamkan nilai compassion, kesabaran, integritas moral, dan ketulusan melayani pasien tanpa memandang latar belakang.",
        icon: "Heart"
      }
    ],
    specializations: [
      {
        title: "Emergency, ICU & Critical Care Nursing",
        description: "Keterampilan resusitasi jantung paru, triage kegawatdaruratan, pemantauan pasien kritis di ruang ICU, dan respon tanggap bencana.",
        skills: ["BTCLS Life Support", "Ventilator Monitoring", "Emergency Triage", "Disaster Nursing Response"]
      },
      {
        title: "Medical-Surgical & Wound Care Nursing",
        description: "Perawatan pasien pra dan pasca operasi bedah, penatalaksanaan luka modern (modern wound dressing), dan asuhan penyakit dalam.",
        skills: ["Modern Wound Care Certified", "Pre & Post-Operative Care", "Infusion & Medication Safety", "Infection Control"]
      },
      {
        title: "Gerontik & Professional Home Care",
        description: "Pelayanan asuhan keperawatan lansia di panti wreda, rehabilitasi kronis, dan layanan perawat pribadi berkunjung ke rumah (home care).",
        skills: ["Elderly Daily Living Support", "Chronic Disease Monitoring", "Palliative Care", "Therapeutic Family Counseling"]
      }
    ],
    curriculumStages: [
      {
        year: "Tahun 1 (Semester 1 - 2)",
        stageTitle: "Fundamental Nursing Science & Skills",
        description: "Fondasi anatomi fisiologi, konsep dasar keperawatan, kebutuhan dasar manusia (KDM), farmakologi, dan keterampilan dasar di lab.",
        courses: ["Anatomi & Fisiologi Manusia", "Kebutuhan Dasar Manusia (KDM) 1 & 2", "Praktik Keterampilan Dasar Keperawatan", "Farmakologi Keperawatan", "Etika & Komunikasi Terapeutik"]
      },
      {
        year: "Tahun 2 (Semester 3 - 4)",
        stageTitle: "Clinical Nursing & Hospital Rotations",
        description: "Asuhan keperawatan medikal bedah, keperawatan anak, keperawatan maternitas (kebidanan), dan praktik stase bangsal rumah sakit.",
        courses: ["Keperawatan Medikal Bedah 1 & 2", "Keperawatan Maternitas & Bayi Baru Lahir", "Keperawatan Anak & Tumbuh Kembang", "Praktik Klinik Keperawatan Rumah Sakit 1", "Dokumentasi & Standar Asuhan Keperawatan"]
      },
      {
        year: "Tahun 3 (Semester 5 - 6)",
        stageTitle: "Emergency, Critical Care & Community Practice",
        description: "Pelatihan intensif kegawatdaruratan (BTCLS), keperawatan jiwa, keperawatan gerontik/komunitas, dan uji kompetensi nasional.",
        courses: ["Keperawatan Gawat Darurat & Kritis (BTCLS)", "Keperawatan Jiwa & Komunitas", "Keperawatan Gerontik & Home Care", "Praktik Komprehensif Rumah Sakit 2", "Uji Kompetensi Nasional & Karya Tulis Ilmiah"]
      }
    ],
    coreCourses: [
      "Basic Trauma & Cardiac Life Support (BTCLS)",
      "Medical-Surgical Nursing (KMB)",
      "Emergency & Intensive Critical Care Nursing",
      "Maternal & Pediatric Clinical Care",
      "Modern Wound Dressing & Care Management",
      "Psychiatric & Mental Health Nursing",
      "Community & Gerontological Home Care",
      "Patient Safety & Nosocomial Infection Control"
    ],
    careerPaths: [
      {
        category: "Professional / Intrapreneur",
        role: "Perawat Klinis Rumah Sakit (Staff Nurse)",
        description: "Memberikan asuhan keperawatan profesional di ruang rawat inap, bangsal bedah, anak, atau penyakit dalam di rumah sakit pemerintah dan swasta."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Perawat Gawat Darurat & ICU (Critical Care Nurse)",
        description: "Bertugas di instalasi gawat darurat (IGD) dan unit perawatan intensif menangani pasien darurat dan resusitasi kritis."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Perawat Klinik & Unit Kesehatan Perusahaan (Occupational Nurse)",
        description: "Bekerja di klinik perusahaan manufaktur atau perkebunan mitra Triputra untuk melayani kesehatan preventif karyawan."
      },
      {
        category: "Professional / Intrapreneur",
        role: "Certified Wound Care Nurse Specialist",
        description: "Praktisi ahli perawatan luka diabetes dan luka bakar menggunakan teknik balutan modern di klinik spesialis."
      },
      {
        category: "Entrepreneur / Technopreneur",
        role: "Home Care & Palliative Nursing Service Founder",
        description: "Membuka layanan jasa perawat pribadi profesional bagi pasien pasca stroke atau lansia di rumah."
      },
      {
        category: "Consultant / Specialist",
        role: "International Healthcare Nurse",
        description: "Berpeluang berkarir di fasilitas kesehatan luar negeri (Jepang / Timur Tengah / Jerman) melalui program G-to-G dan mitra resmi."
      }
    ],
    facilities: [
      {
        name: "Mini Hospital & OSCE Simulation Ward",
        description: "Ruang rawat inap rumah sakit simulasi lengkap dengan tempat tidur elektrik, pipa oksigen sentral, suction, dan troli obat emergensi.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Emergency & ICU Nursing Simulator Lab",
        description: "Fasilitas perawatan gawat darurat dengan monitor tanda vital, defribilator AED, ambu bag, dan manekin simulator resusitasi interaktif.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
      },
      {
        name: "Maternal, Child & Pediatric Nursing Suite",
        description: "Laboratorium simulasi pertolongan persalinan fisiologis, inkubator bayi prematur, dan area pemeriksaan kesehatan balita.",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
      }
    ],
    industryPartners: [
      "Persatuan Perawat Nasional Indonesia (PPNI)",
      "RSUP Surakarta & RSUD Moewardi Rekanan",
      "Klinik Medika Triputra Care Group",
      "Dinas Kesehatan Kota Surakarta",
      "Lembaga Pelatihan BTCLS Terakreditasi Nasional"
    ],
    tuitionFeePerSemester: 5200000,
    scholarships: [
      "Beasiswa Triputra Peduli Penuh 100%",
      "Beasiswa Khusus Putra/Putri Tenaga Kesehatan",
      "Program Ikatan Dinas Kerja di Klinik & RS Mitra"
    ],
    faqs: [
      {
        question: "Apakah lulusan D3 Keperawatan UPITRA bisa langsung bekerja di Rumah Sakit?",
        answer: "Bisa sekali! Kurikulum D3 Keperawatan UPITRA dirancang fokus pada keterampilan praktis klinis dan pendampingan kelulusan Uji Kompetensi Nasional (UKOM), sehingga setelah memperoleh Surat Tanda Registrasi (STR) lulusan langsung dapat bekerja di RS pemerintah maupun swasta."
      },
      {
        question: "Apakah bisa melanjutkan ke jenjang S1 Keperawatan & Ners di kemudian hari?",
        answer: "Tentu! Lulusan D3 dapat melanjutkan ke jenjang S1 Keperawatan jalur transfer / alih jenjang dan profesi Ners kapan saja saat sudah bekerja."
      },
      {
        question: "Gelar apa yang disandang lulusan D3 Keperawatan?",
        answer: "Lulusan menyandang gelar vokasi resmi Ahli Madya Keperawatan (A.Md.Kep.)."
      }
    ]
  }
];

export function getAllProdi(): ProdiData[] {
  return prodiList;
}

export function getProdiBySlug(slug: string): ProdiData | undefined {
  const clean = slug.toLowerCase().trim();
  return prodiList.find(
    (p) => p.slug === clean || p.aliases.includes(clean)
  );
}

export function getRelatedProdi(currentSlug: string, count: number = 3): ProdiData[] {
  const current = getProdiBySlug(currentSlug);
  if (!current) return prodiList.slice(0, count);
  
  const sameFaculty = prodiList.filter(
    (p) => p.slug !== current.slug && p.faculty.code === current.faculty.code
  );
  if (sameFaculty.length >= count) return sameFaculty.slice(0, count);
  
  const others = prodiList.filter(
    (p) => p.slug !== current.slug && p.faculty.code !== current.faculty.code
  );
  return [...sameFaculty, ...others].slice(0, count);
}
