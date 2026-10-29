// Central Data Store & Resilient Persistence for UPITRA Admin Dashboard
// Mendukung sinkronisasi Prisma saat database online, dan LocalStorage / In-Memory saat offline.

export interface VisitorMetric {
  totalPageviews: number;
  uniqueVisitors: number;
  avgDuration: string;
  bounceRate: string;
  conversionRate: string;
  activeOnline: number;
}

export interface TrafficLineItem {
  name: string;
  category: string;
  pageviews: number;
  percentage: number;
  trend: string;
}

export interface GeoTrafficItem {
  city: string;
  region: string;
  visitors: number;
  percentage: number;
}

export interface DeviceTrafficItem {
  device: string;
  percentage: number;
  count: number;
  iconName: string;
}

export interface ReferrerTrafficItem {
  source: string;
  channel: string;
  visitors: number;
  percentage: number;
}

export interface LiveVisitorLog {
  id: string;
  timestamp: string;
  ipMasked: string;
  city: string;
  pageVisited: string;
  device: string;
  referrer: string;
  durationSeconds: number;
}

export interface AdminProdiItem {
  id: string;
  faculty: "FST" | "FEB" | "FSH" | "FKES";
  facultyName: string;
  name: string;
  slug: string;
  degreeLevel: "S1" | "D3";
  degreeTitle: string;
  accreditation: string;
  tuitionPerSemester: string;
  shortDesc: string;
  careerProspects: string;
  totalStudentsEst: number;
  coverImage: string;
  featured: boolean;
}

export interface AdminLeadItem {
  id: string;
  fullName: string;
  phoneWhatsapp: string;
  email: string;
  highSchool: string;
  city: string;
  programChoice: string;
  targetYear: number;
  status: "BARU_MASUK" | "DIHUBUNGI" | "WAWANCARA" | "DITERIMA_BEASISWA" | "ENROLLED" | "BATAL";
  notes: string;
  createdAt: string;
}

export interface AdminArticleItem {
  id: string;
  title: string;
  slug: string;
  category: "Berita Kampus" | "Prestasi" | "Inovasi & Riset" | "Pengumuman" | "Kegiatan";
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  published: boolean;
  publishedAt: string;
  viewCount: number;
}

export interface AdminDownloadItem {
  id: string;
  title: string;
  category: "Brosur PMB" | "Fakultas Sains & Teknologi" | "Fakultas Ekonomi & Bisnis" | "Fakultas Sosial Humaniora" | "Fakultas Kesehatan" | "Panduan Akademik";
  fileName: string;
  fileSize: string;
  fileUrl: string;
  previewUrl: string;
  downloadCount: number;
  updatedAt: string;
}

export interface AdminMitraItem {
  id: string;
  name: string;
  category: "Triputra Group" | "Korporasi Nasional" | "Instansi Kesehatan" | "BUMN" | "Institusi Global";
  partnershipType: "Immersion 3+1" | "Beasiswa Industri" | "Penyerapan Karir" | "Riset & Magang";
  logo: string;
  mouYear: string;
  status: "Aktif" | "Dalam Perpanjangan";
}

export interface AdminServiceItem {
  id: string;
  name: string;
  category: "Akademik" | "Karir & Alumni" | "Fasilitas & Lab" | "Perpustakaan" | "Teknologi";
  pic: string;
  contact: string;
  url: string;
  status: "Operasional Normal" | "Maintenance";
  description: string;
}

export interface AdminBannerItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
  order: number;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPERADMIN" | "STAFF_PMB" | "CONTENT_WRITER";
  status: "Aktif" | "Nonaktif";
  lastLogin: string;
}

export interface InstagramSyncStatus {
  account: string;
  status: "TERHUBUNG_LIVE" | "TERTUNDA" | "ERROR";
  apiSource: "live_api" | "cached_feed";
  lastSyncedAt: string;
  activePostsCount: number;
  tokenExpiresAt: string;
  profileUrl: string;
  autoRefreshEnabled: boolean;
}

// Initial Mock Seed Data
export const initialVisitorMetric: VisitorMetric = {
  totalPageviews: 48720,
  uniqueVisitors: 18450,
  avgDuration: "3m 42s",
  bounceRate: "28.4%",
  conversionRate: "7.2%",
  activeOnline: 26,
};

export const initialTrafficByLine: TrafficLineItem[] = [
  { name: "S1 Informatika (FST)", category: "Program Studi", pageviews: 11420, percentage: 23.4, trend: "+18.2%" },
  { name: "Pendaftaran PMB & Beasiswa", category: "Admisi PMB", pageviews: 9840, percentage: 20.2, trend: "+24.5%" },
  { name: "S1 Manajemen Bisnis (FEB)", category: "Program Studi", pageviews: 7120, percentage: 14.6, trend: "+12.1%" },
  { name: "Download Center (Brosur)", category: "Layanan", pageviews: 5210, percentage: 10.7, trend: "+31.0%" },
  { name: "S1 Keselamatan & Kesehatan Kerja (FKES)", category: "Program Studi", pageviews: 4680, percentage: 9.6, trend: "+15.3%" },
  { name: "S1 Pariwisata (FSH)", category: "Program Studi", pageviews: 3950, percentage: 8.1, trend: "+9.8%" },
  { name: "Berita & Cerita Kampus", category: "Publikasi", pageviews: 3540, percentage: 7.3, trend: "+6.4%" },
  { name: "Mitra Kerjasama & Immersion", category: "Industri", pageviews: 2960, percentage: 6.1, trend: "+14.0%" },
];

export const initialGeoTraffic: GeoTrafficItem[] = [
  { city: "Solo Raya (Surakarta, Sukoharjo, Klaten, dll)", region: "Jawa Tengah", visitors: 9960, percentage: 54.0 },
  { city: "Semarang & Pantura Jawa Tengah", region: "Jawa Tengah", visitors: 3320, percentage: 18.0 },
  { city: "D.I. Yogyakarta", region: "DIY", visitors: 2210, percentage: 12.0 },
  { city: "Jawa Timur (Madiun, Surabaya, Ngawi)", region: "Jawa Timur", visitors: 1660, percentage: 9.0 },
  { city: "Jabodetabek & Luar Pulau Jawa", region: "Nasional", visitors: 1300, percentage: 7.0 },
];

export const initialDeviceTraffic: DeviceTrafficItem[] = [
  { device: "Mobile Smartphone", percentage: 71, count: 13100, iconName: "Smartphone" },
  { device: "Desktop & Laptop PC", percentage: 26, count: 4800, iconName: "Laptop" },
  { device: "Tablet & iPad", percentage: 3, count: 550, iconName: "Tablet" },
];

export const initialReferrerTraffic: ReferrerTrafficItem[] = [
  { source: "Direct Traffic (Ketik upitra.ac.id)", channel: "Direct", visitors: 7010, percentage: 38.0 },
  { source: "Instagram Resmi @upitra_campus", channel: "Media Sosial", visitors: 6270, percentage: 34.0 },
  { source: "Google Search (Organik)", channel: "Mesin Pencari", visitors: 3320, percentage: 18.0 },
  { source: "Hotline Admisi WhatsApp & Broadcast", channel: "WhatsApp", visitors: 1850, percentage: 10.0 },
];

export const initialHourlyTraffic = [
  { hour: "06:00", visitors: 210 },
  { hour: "08:00", visitors: 580 },
  { hour: "10:00", visitors: 1420 },
  { hour: "12:00", visitors: 1650 },
  { hour: "14:00", visitors: 1290 },
  { hour: "16:00", visitors: 940 },
  { hour: "18:00", visitors: 820 },
  { hour: "20:00", visitors: 1510 },
  { hour: "22:00", visitors: 730 },
];

export const initialLiveVisitorLogs: LiveVisitorLog[] = [
  { id: "log-1", timestamp: "Baru saja", ipMasked: "114.124.***.82", city: "Surakarta", pageVisited: "/informatika", device: "Android (Chrome)", referrer: "Instagram @upitra_campus", durationSeconds: 145 },
  { id: "log-2", timestamp: "1 mnt lalu", ipMasked: "182.253.***.14", city: "Sukoharjo", pageVisited: "/pmb", device: "iOS (Safari)", referrer: "Direct URL", durationSeconds: 210 },
  { id: "log-3", timestamp: "2 mnt lalu", ipMasked: "103.111.***.90", city: "Semarang", pageVisited: "/download-center", device: "Windows (Brave)", referrer: "Google Search", durationSeconds: 78 },
  { id: "log-4", timestamp: "4 mnt lalu", ipMasked: "118.99.***.43", city: "Yogyakarta", pageVisited: "/manajemen", device: "Android (Chrome)", referrer: "WhatsApp Hotline", durationSeconds: 312 },
  { id: "log-5", timestamp: "6 mnt lalu", ipMasked: "36.88.***.12", city: "Klaten", pageVisited: "/kesehatan-dan-keselamatan-kerja", device: "Android (Samsung)", referrer: "Instagram @upitra_campus", durationSeconds: 94 },
  { id: "log-6", timestamp: "8 mnt lalu", ipMasked: "140.213.***.71", city: "Karanganyar", pageVisited: "/pariwisata", device: "macOS (Safari)", referrer: "Google Search", durationSeconds: 185 },
];

export const initialAdminProdiList: AdminProdiItem[] = [
  {
    id: "prodi_01",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Informatika",
    slug: "informatika",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Pendidikan kecerdasan buatan (AI), rekayasa data cloud, dan cybersecurity berstandar internasional.",
    careerProspects: "AI Engineer, Software Architect, Cyber Security Specialist, Cloud Engineer",
    totalStudentsEst: 280,
    coverImage: "/images/ar-vr.jpg",
    featured: true,
  },
  {
    id: "prodi_02",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Sistem Informasi",
    slug: "sistem-informasi",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.250.000",
    shortDesc: "Menggabungkan arsitektur sistem korporasi (ERP SAP), manajemen proses bisnis, dan IT governance.",
    careerProspects: "Business Analyst, ERP Consultant, IT Auditor, Product Manager",
    totalStudentsEst: 210,
    coverImage: "/images/kuliah-1.jpeg",
    featured: true,
  },
  {
    id: "prodi_03",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Rekayasa Perangkat Lunak",
    slug: "rekayasa-perangkat-lunak",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Keahlian rekayasa piranti lunak end-to-end, mobile app, microservices, dan DevOps industri.",
    careerProspects: "Fullstack Developer, Mobile App Engineer, DevOps Engineer, QA Lead",
    totalStudentsEst: 195,
    coverImage: "/images/feb-full.jpg",
    featured: false,
  },
  {
    id: "prodi_04",
    faculty: "FEB",
    facultyName: "Fakultas Ekonomi & Bisnis",
    name: "S1 Manajemen",
    slug: "manajemen",
    degreeLevel: "S1",
    degreeTitle: "S.M.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.000.000",
    shortDesc: "Manajemen bisnis strategis terapan dengan immersion langsung di grup korporasi Triputra Group.",
    careerProspects: "Management Trainee, Financial Analyst, Supply Chain Manager, Technopreneur",
    totalStudentsEst: 340,
    coverImage: "/images/wisuda.jpg",
    featured: true,
  },
  {
    id: "prodi_05",
    faculty: "FEB",
    facultyName: "Fakultas Ekonomi & Bisnis",
    name: "S1 Akuntansi",
    slug: "akuntansi",
    degreeLevel: "S1",
    degreeTitle: "S.Ak.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 3.900.000",
    shortDesc: "Akuntansi forensik, audit digital, dan akuntansi korporasi modern terstandarisasi IFRS.",
    careerProspects: "Auditor Publik, Tax Specialist, Corporate Accountant, Financial Controller",
    totalStudentsEst: 230,
    coverImage: "/images/kegiatan.jpg",
    featured: false,
  },
  {
    id: "prodi_06",
    faculty: "FSH",
    facultyName: "Fakultas Sosial Humaniora",
    name: "S1 Pariwisata",
    slug: "pariwisata",
    degreeLevel: "S1",
    degreeTitle: "S.Par.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 3.800.000",
    shortDesc: "Pariwisata berkelanjutan, manajemen perhotelan internasional, event management, dan eco-tourism.",
    careerProspects: "Tourism Destination Manager, Hotel General Manager, Event Director, Travel Designer",
    totalStudentsEst: 180,
    coverImage: "/images/pariwisata/par-1.jpg",
    featured: true,
  },
  {
    id: "prodi_07",
    faculty: "FSH",
    facultyName: "Fakultas Sosial Humaniora",
    name: "S1 Bahasa Inggris",
    slug: "bahasa-inggris",
    degreeLevel: "S1",
    degreeTitle: "S.S.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 3.600.000",
    shortDesc: "Komunikasi korporasi global, diplomasi, penerjemahan tersumpah, dan literasi media internasional.",
    careerProspects: "Corporate PR, Certified Translator, Diplomatic Staff, Copywriter Global",
    totalStudentsEst: 140,
    coverImage: "/images/kuliah-1.jpeg",
    featured: false,
  },
  {
    id: "prodi_08",
    faculty: "FKES",
    facultyName: "Fakultas Kesehatan",
    name: "S1 Keselamatan & Kesehatan Kerja (K3)",
    slug: "kesehatan-dan-keselamatan-kerja",
    degreeLevel: "S1",
    degreeTitle: "S.K3",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.750.000",
    shortDesc: "Spesialis keselamatan kerja industri tambang, agribisnis, manufaktur, dan sertifikasi BNSP.",
    careerProspects: "HSE Specialist, Industrial Safety Auditor, Risk Analyst, Ahli K3 Umum",
    totalStudentsEst: 260,
    coverImage: "/images/kegiatan.jpg",
    featured: true,
  },
  {
    id: "prodi_09",
    faculty: "FKES",
    facultyName: "Fakultas Kesehatan",
    name: "S1 Fisioterapi",
    slug: "fisioterapi",
    degreeLevel: "S1",
    degreeTitle: "S.Ft",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.800.000",
    shortDesc: "Fisioterapi olahraga, rehabilitasi medik muskuloskeletal, neuromuskular, dan pediatri.",
    careerProspects: "Fisioterapis Olahraga Klub, Konsultan Rehabilitasi RS, Fisioterapi Mandiri",
    totalStudentsEst: 205,
    coverImage: "/images/ar-vr.jpg",
    featured: false,
  },
  {
    id: "prodi_10",
    faculty: "FKES",
    facultyName: "Fakultas Kesehatan",
    name: "D3 Keperawatan",
    slug: "keperawatan",
    degreeLevel: "D3",
    degreeTitle: "A.Md.Kep",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.400.000",
    shortDesc: "Pendidikan vokasi keperawatan klinis siap kerja di rumah sakit mitra nasional dan luar negeri.",
    careerProspects: "Perawat Klinis RS, Perawat Gawat Darurat, Perawat Internasional",
    totalStudentsEst: 175,
    coverImage: "/images/wisuda.jpg",
    featured: false,
  },
];

export const initialAdminLeads: AdminLeadItem[] = [
  {
    id: "lead-01",
    fullName: "Ahmad Rizky Pratama",
    phoneWhatsapp: "081234567890",
    email: "ahmad.rizky@gmail.com",
    highSchool: "SMKN 2 Surakarta",
    city: "Surakarta",
    programChoice: "S1 Informatika",
    targetYear: 2026,
    status: "BARU_MASUK",
    notes: "Minat pada peminatan Artificial Intelligence dan jalur Beasiswa Triputra Peduli.",
    createdAt: "29 Okt 2026, 10:15 WIB",
  },
  {
    id: "lead-02",
    fullName: "Theresia Amanda Putri",
    phoneWhatsapp: "085712345678",
    email: "theresia.amanda@yahoo.com",
    highSchool: "SMA Regina Pacis Surakarta",
    city: "Sukoharjo",
    programChoice: "S1 Manajemen",
    targetYear: 2026,
    status: "DIHUBUNGI",
    notes: "Tertarik dengan program Immersion 3+1 di Triputra Group. Meminta jadwal zoom konsultasi.",
    createdAt: "29 Okt 2026, 09:20 WIB",
  },
  {
    id: "lead-03",
    fullName: "Budi Santoso",
    phoneWhatsapp: "087812984561",
    email: "budi.santoso@gmail.com",
    highSchool: "SMAN 1 Klaten",
    city: "Klaten",
    programChoice: "S1 Keselamatan & Kesehatan Kerja (K3)",
    targetYear: 2026,
    status: "WAWANCARA",
    notes: "Jadwal wawancara beasiswa hari Jumat jam 14.00 WIB bersama Tim Admisi Kampus.",
    createdAt: "28 Okt 2026, 16:45 WIB",
  },
  {
    id: "lead-04",
    fullName: "Jessica Maharani",
    phoneWhatsapp: "082199887766",
    email: "jessica.mhrn@gmail.com",
    highSchool: "SMA Katolik St. Yosef",
    city: "Surakarta",
    programChoice: "S1 Pariwisata",
    targetYear: 2026,
    status: "DITERIMA_BEASISWA",
    notes: "Lolos Beasiswa Triputra Peduli 100% jalur Prestasi Akademik. Surat penerimaan telah dikirim.",
    createdAt: "27 Okt 2026, 11:30 WIB",
  },
  {
    id: "lead-05",
    fullName: "Daniel Christian",
    phoneWhatsapp: "081388776655",
    email: "daniel.ch@outlook.com",
    highSchool: "SMA Pangudi Luhur Giriwoyo",
    city: "Wonogiri",
    programChoice: "S1 Sistem Informasi",
    targetYear: 2026,
    status: "ENROLLED",
    notes: "Sudah melakukan her-registrasi dan pembayaran jas almamater. Nomor Induk Mahasiswa aktif.",
    createdAt: "26 Okt 2026, 14:10 WIB",
  },
];

export const initialAdminArticles: AdminArticleItem[] = [
  {
    id: "art-01",
    title: "Belum Wisuda, 26 Lulusan UPITRA Sudah Kantongi Pekerjaan di Triputra Group",
    slug: "belum-wisuda-26-lulusan-upitra-sudah-kantongi-pekerjaan-6ad05d3770972",
    category: "Prestasi",
    summary: "Berkat kurikulum Immersion Program 3+1, puluhan mahasiswa UPITRA berhasil direkrut bekerja sebelum toga wisuda disematkan.",
    content: "Surakarta — Integritas dan kesiapan kerja nyata sivitas akademika Universitas Pignatelli Triputra kembali membuahkan kebanggaan nasional...",
    coverImage: "/images/wisuda.jpg",
    author: "Humas UPITRA",
    published: true,
    publishedAt: "26 Okt 2026",
    viewCount: 4210,
  },
  {
    id: "art-02",
    title: "Latih Kepercayaan Diri Generasi Muda, UPITRA Gelar Seminar Public Speaking di SMAK PNK Surakarta",
    slug: "latih-kepercayaan-diri-generasi-muda-upitra-gelar-seminar-public-speaking-di-smak-pnk-surakarta-6acc34fe9d51a",
    category: "Kegiatan",
    summary: "Dosen dan mahasiswa Fakultas Sosial Humaniora UPITRA mendampingi ratusan siswa SMA mengasah kemampuan public speaking dan personal branding.",
    content: "Surakarta — Kemampuan komunikasi dan karakter kepemimpinan luhur menjadi fondasi penting bagi generasi penerus bangsa...",
    coverImage: "/images/kuliah-1.jpeg",
    author: "Tim Redaksi Kampus",
    published: true,
    publishedAt: "22 Okt 2026",
    viewCount: 2190,
  },
  {
    id: "art-03",
    title: "Sinergi UPITRA dan SMA BOSA: Jembatani Siswa Menuju Industri Melalui Pendidikan Karakter & Beasiswa",
    slug: "sinergi-upitra-dan-sma-bosa-jembatani-siswa-menuju-dunia-industri-melalui-pendidikan-karakter-dan-beasiswa-6abce7f2d4ee9",
    category: "Berita Kampus",
    summary: "Penandatanganan nota kesepahaman (MoU) beasiswa prioritas dan pelatihan vokasi teknologi antara UPITRA dan SMA BOSA Yogyakarta.",
    content: "Yogyakarta — Kolaborasi strategis institusi pendidikan dan dunia industri semakin kokoh diwujudkan UPITRA...",
    coverImage: "/images/feb-full.jpg",
    author: "Biro Kerjasama",
    published: true,
    publishedAt: "18 Okt 2026",
    viewCount: 3120,
  },
];

export const initialAdminDownloads: AdminDownloadItem[] = [
  {
    id: "dl-01",
    title: "Brosur Umum PMB & Panduan Akademik TA 2026/2027",
    category: "Brosur PMB",
    fileName: "Brosur-PMB-UPITRA-2026.pdf",
    fileSize: "4.8 MB",
    fileUrl: "/images/pariwisata/par-1.jpg",
    previewUrl: "/images/banners/hero-pmb.jpg",
    downloadCount: 1480,
    updatedAt: "28 Okt 2026",
  },
  {
    id: "dl-02",
    title: "E-Brosur Kurikulum & Keunggulan S1 Informatika",
    category: "Fakultas Sains & Teknologi",
    fileName: "Brosur-S1-Informatika-UPITRA.pdf",
    fileSize: "3.2 MB",
    fileUrl: "/images/ar-vr.jpg",
    previewUrl: "/images/ar-vr.jpg",
    downloadCount: 920,
    updatedAt: "25 Okt 2026",
  },
  {
    id: "dl-03",
    title: "E-Brosur Kurikulum & Immersion S1 Manajemen Bisnis",
    category: "Fakultas Ekonomi & Bisnis",
    fileName: "Brosur-S1-Manajemen-UPITRA.pdf",
    fileSize: "2.9 MB",
    fileUrl: "/images/feb-full.jpg",
    previewUrl: "/images/feb-full.jpg",
    downloadCount: 760,
    updatedAt: "24 Okt 2026",
  },
  {
    id: "dl-04",
    title: "E-Brosur Program Unggulan S1 Keselamatan & Kesehatan Kerja (K3)",
    category: "Fakultas Kesehatan",
    fileName: "Brosur-S1-K3-UPITRA.pdf",
    fileSize: "3.5 MB",
    fileUrl: "/images/kegiatan.jpg",
    previewUrl: "/images/kegiatan.jpg",
    downloadCount: 680,
    updatedAt: "22 Okt 2026",
  },
];

export const initialAdminMitra: AdminMitraItem[] = [
  {
    id: "mitra-01",
    name: "Triputra Agro Persada (TAP)",
    category: "Triputra Group",
    partnershipType: "Immersion 3+1",
    logo: "/images/logo.png",
    mouYear: "2024 - 2029",
    status: "Aktif",
  },
  {
    id: "mitra-02",
    name: "Dharma Polimetal Tbk",
    category: "Triputra Group",
    partnershipType: "Penyerapan Karir",
    logo: "/images/logo.png",
    mouYear: "2023 - 2028",
    status: "Aktif",
  },
  {
    id: "mitra-03",
    name: "RS Panti Waluyo Surakarta",
    category: "Instansi Kesehatan",
    partnershipType: "Riset & Magang",
    logo: "/images/logo.png",
    mouYear: "2024 - 2027",
    status: "Aktif",
  },
  {
    id: "mitra-04",
    name: "PT Kirana Megatara Tbk",
    category: "Triputra Group",
    partnershipType: "Beasiswa Industri",
    logo: "/images/logo.png",
    mouYear: "2023 - 2028",
    status: "Aktif",
  },
];

export const initialInstagramSyncStatus: InstagramSyncStatus = {
  account: "@upitra_campus",
  status: "TERHUBUNG_LIVE",
  apiSource: "live_api",
  lastSyncedAt: "29 Okt 2026, 12:45 WIB",
  activePostsCount: 5,
  tokenExpiresAt: "28 Des 2026 (60 hari lagi)",
  profileUrl: "https://www.instagram.com/upitra_campus/",
  autoRefreshEnabled: true,
};

export const initialAdminUsers: AdminUserItem[] = [
  {
    id: "usr-01",
    name: "Administrator Utama",
    email: "admin@upitra.ac.id",
    role: "SUPERADMIN",
    status: "Aktif",
    lastLogin: "29 Okt 2026, 12:55 WIB",
  },
  {
    id: "usr-02",
    name: "Staff Admisi PMB Solo",
    email: "pmb.admisi@upitra.ac.id",
    role: "STAFF_PMB",
    status: "Aktif",
    lastLogin: "29 Okt 2026, 09:12 WIB",
  },
  {
    id: "usr-03",
    name: "Editor Konten & Humas",
    email: "humas.redaksi@upitra.ac.id",
    role: "CONTENT_WRITER",
    status: "Aktif",
    lastLogin: "28 Okt 2026, 17:30 WIB",
  },
];

export const initialAdminServices: AdminServiceItem[] = [
  {
    id: "srv-01",
    name: "Perpustakaan Digital & Fisik UPITRA",
    category: "Perpustakaan",
    pic: "Drs. Bambang Sudarmo, M.Lib",
    contact: "library@upitra.ac.id",
    url: "/layanan/perpustakaan",
    status: "Operasional Normal",
    description: "Layanan peminjaman ribuan koleksi buku fisik, jurnal internasional IEEE, Scopus, dan repository tugas akhir digital.",
  },
  {
    id: "srv-02",
    name: "Pusat Karir & Tracer Study Triputra",
    category: "Karir & Alumni",
    pic: "Citra Lestari, S.Psi, M.M.",
    contact: "career@upitra.ac.id",
    url: "/layanan/karir-alumni",
    status: "Operasional Normal",
    description: "Pendampingan karir, pelatihan CV & wawancara, bursa kerja khusus, dan penyaluran program Immersion 3+1 Triputra Group.",
  },
  {
    id: "srv-03",
    name: "Laboratorium Komputasi AI & IoT",
    category: "Fasilitas & Lab",
    pic: "Riko Handoko, S.Kom., M.T.",
    contact: "lab.fst@upitra.ac.id",
    url: "/fasilitas/lab-komputer",
    status: "Operasional Normal",
    description: "Fasilitas workstation GPU NVIDIA RTX, IoT kit, VR headsets untuk riset deep learning mahasiswa FST.",
  },
  {
    id: "srv-04",
    name: "LMS & E-Learning Kampus",
    category: "Teknologi",
    pic: "Biro TI UPITRA",
    contact: "helpdesk.ti@upitra.ac.id",
    url: "https://elearning.upitra.ac.id",
    status: "Operasional Normal",
    description: "Platform perkuliahan hybrid interaktif dengan fitur presensi digital, tugas, dan materi kuliah daring.",
  },
];

export const initialAdminBanners: AdminBannerItem[] = [
  {
    id: "bnr-01",
    title: "Penerimaan Mahasiswa Baru Gelombang 1 TA 2026/2027",
    subtitle: "Raih Beasiswa Penuh Yayasan Santo Aloysius & Triputra Group untuk 10 Program Studi Unggulan di Solo Raya.",
    badge: "PMB 2026 DIBUKA",
    image: "/images/hero-1.jpg",
    ctaText: "Daftar Sekarang",
    ctaLink: "/admisi-pmb",
    active: true,
    order: 1,
  },
  {
    id: "bnr-02",
    title: "Program Immersion 3+1 Bersama Triputra Group",
    subtitle: "3 Tahun kuliah di kampus + 1 tahun magang intensif berbayar langsung di industri dengan jaminan kerja lulusan.",
    badge: "PROGRAM UNGGULAN",
    image: "/images/ar-vr.jpg",
    ctaText: "Pelajari Immersion",
    ctaLink: "/immersion",
    active: true,
    order: 2,
  },
  {
    id: "bnr-03",
    title: "Fasilitas Kampus Berstandar Industri di Jantung Kota Solo",
    subtitle: "Dilengkapi Smart Classroom, Laboratorium AI/IoT, dan suasana belajar humanis yang mendukung potensi terbaikmu.",
    badge: "KAMPUS MODERN",
    image: "/images/kegiatan.jpg",
    ctaText: "Jelajahi Fasilitas",
    ctaLink: "/fasilitas",
    active: true,
    order: 3,
  },
];

