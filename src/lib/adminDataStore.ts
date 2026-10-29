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
  category: "Triputra Group" | "Industri & Finansial" | "Kesehatan & RS" | "Pemerintah & Pendidikan" | "Mitra Global";
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

export interface InstagramFeedCard {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
  category: string;
}

export interface ConnectedInstagramAccount {
  isConnected: boolean;
  username: string;
  displayName: string;
  profilePicUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  connectedAt: string;
  tokenExpiresAt: string;
  source: "official_login" | "graph_api";
  recentPosts: InstagramFeedCard[];
}

// ── Models for Profil, Kemahasiswaan, Riset, Kerjasama (Navbar /page CRUD) ──

export interface AdminProfilSection {
  id: string;
  type: "tentang" | "visi_misi" | "pimpinan" | "pengumuman" | "prestasi";
  title: string;
  subtitle?: string;
  content: string;
  extraMeta?: string;
  image?: string;
  updatedAt: string;
}

export interface AdminKemahasiswaanSection {
  id: string;
  type: "tugas_fungsi" | "pengembangan" | "ormawa" | "prestasi" | "galeri" | "kalender";
  title: string;
  category: string;
  description: string;
  dateOrSemester?: string;
  image?: string;
  link?: string;
  updatedAt: string;
}

export interface AdminRisetSection {
  id: string;
  title: string;
  researcher: string;
  faculty: string;
  journalName: string;
  indexedIn: "Scopus" | "SINTA 1" | "SINTA 2" | "IEEE" | "Prosiding";
  year: number;
  doiOrUrl: string;
  abstractText: string;
}

export interface AdminKerjasamaMouItem {
  id: string;
  partnerName: string;
  documentType: "MoU" | "MoA" | "Perjanjian Kerjasama (PKS)";
  scope: string;
  startYear: string;
  endYear: string;
  signatory: string;
  status: "Aktif" | "Dalam Perpanjangan" | "Selesai";
  fileUrl?: string;
}

// ── Initial Mock Seed Data ──────────────────────────────────────────────────

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
  { source: "Google Organic Search", channel: "Mesin Pencari", visitors: 3320, percentage: 18.0 },
  { source: "WhatsApp Admisi Hotline", channel: "Direct Message", visitors: 1850, percentage: 10.0 },
];

export const initialHourlyTraffic = [
  { hour: "06:00", visitors: 180 },
  { hour: "08:00", visitors: 620 },
  { hour: "10:00", visitors: 1140 },
  { hour: "12:00", visitors: 1480 },
  { hour: "14:00", visitors: 1210 },
  { hour: "16:00", visitors: 940 },
  { hour: "18:00", visitors: 820 },
  { hour: "20:00", visitors: 1350 },
  { hour: "22:00", visitors: 710 },
];

export const initialLiveVisitorLogs: LiveVisitorLog[] = [
  { id: "log-1", timestamp: "13:28:10", ipMasked: "114.122.**.**", city: "Surakarta", pageVisited: "/informatika", device: "Android / Chrome", referrer: "Instagram @upitra_campus", durationSeconds: 214 },
  { id: "log-2", timestamp: "13:27:54", ipMasked: "182.253.**.**", city: "Semarang", pageVisited: "/admisi-pmb", device: "iOS / Safari", referrer: "Direct Link", durationSeconds: 142 },
  { id: "log-3", timestamp: "13:27:20", ipMasked: "36.85.**.**", city: "Sukoharjo", pageVisited: "/layanan/download-center", device: "Windows / Chrome", referrer: "Google Search", durationSeconds: 385 },
  { id: "log-4", timestamp: "13:26:45", ipMasked: "180.252.**.**", city: "Yogyakarta", pageVisited: "/manajemen", device: "Android / Samsung", referrer: "WhatsApp Group", durationSeconds: 98 },
  { id: "log-5", timestamp: "13:26:12", ipMasked: "110.138.**.**", city: "Klaten", pageVisited: "/fkes", device: "iOS / Chrome", referrer: "Instagram Stories", durationSeconds: 160 },
  { id: "log-6", timestamp: "13:25:30", ipMasked: "103.144.**.**", city: "Madiun", pageVisited: "/kerjasama/mitra-kerjasama", device: "macOS / Safari", referrer: "Direct Link", durationSeconds: 270 },
];

export const initialAdminProdiList: AdminProdiItem[] = [
  {
    id: "prodi-01",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Informatika",
    slug: "informatika",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Program unggulan bidang Artificial Intelligence, Cloud Computing, Cyber Security, dan Rekayasa Perangkat Lunak.",
    careerProspects: "AI Specialist, Fullstack Software Engineer, Cloud Architect, Cyber Security Analyst.",
    totalStudentsEst: 280,
    coverImage: "/images/ar-vr.jpg",
    featured: true,
  },
  {
    id: "prodi-02",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Sains Data",
    slug: "sains-data",
    degreeLevel: "S1",
    degreeTitle: "S.Mat. / S.Si.",
    accreditation: "Baik",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Pendidikan analitika data skala besar (Big Data), Machine Learning, pemodelan statistik prediktif, dan Business Intelligence.",
    careerProspects: "Data Scientist, Data Analyst, Machine Learning Engineer, Business Intelligence Consultant.",
    totalStudentsEst: 140,
    coverImage: "/images/ar-vr.jpg",
    featured: true,
  },
  {
    id: "prodi-03",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Rekayasa Perangkat Lunak",
    slug: "rekayasa-perangkat-lunak",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Baik",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Fokus pada arsitektur sistem enterprise, DevOps, testing perangkat lunak berstandar internasional, dan mobile app development.",
    careerProspects: "Software Architect, DevOps Engineer, QA Automation Engineer, Mobile Application Developer.",
    totalStudentsEst: 160,
    coverImage: "/images/ar-vr.jpg",
    featured: false,
  },
  {
    id: "prodi-04",
    faculty: "FST",
    facultyName: "Fakultas Sains & Teknologi",
    name: "S1 Sistem Informasi",
    slug: "sistem-informasi",
    degreeLevel: "S1",
    degreeTitle: "S.Kom.",
    accreditation: "Sangat Baik",
    tuitionPerSemester: "Rp 4.500.000",
    shortDesc: "Menjembatani teknologi informasi dengan strategi bisnis modern, integrasi ERP, dan tata kelola TI enterprise.",
    careerProspects: "IS Project Manager, ERP Specialist, System Analyst, IT Governance Consultant.",
    totalStudentsEst: 210,
    coverImage: "/images/ar-vr.jpg",
    featured: true,
  },
  {
    id: "prodi-05",
    faculty: "FEB",
    facultyName: "Fakultas Ekonomi & Bisnis",
    name: "S1 Manajemen",
    slug: "manajemen",
    degreeLevel: "S1",
    degreeTitle: "S.M.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.250.000",
    shortDesc: "Membentuk intrapreneur dan entrepreneur tangguh melalui kurikulum Immersion 3+1 Triputra Group.",
    careerProspects: "Business Development Manager, Operations Executive, Marketing Strategist, Corporate Intrapreneur.",
    totalStudentsEst: 320,
    coverImage: "/images/feb-full.jpg",
    featured: true,
  },
  {
    id: "prodi-06",
    faculty: "FEB",
    facultyName: "Fakultas Ekonomi & Bisnis",
    name: "S1 Akuntansi",
    slug: "akuntansi",
    degreeLevel: "S1",
    degreeTitle: "S.Ak.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.250.000",
    shortDesc: "Keahlian akuntansi korporasi modern, audit forensik, perpajakan digital, dan Corporate Governance.",
    careerProspects: "Auditor Publik (KAP), Financial Controller, Tax Consultant, Corporate Accountant.",
    totalStudentsEst: 290,
    coverImage: "/images/feb-full.jpg",
    featured: true,
  },
  {
    id: "prodi-07",
    faculty: "FEB",
    facultyName: "Fakultas Ekonomi & Bisnis",
    name: "S1 Bisnis Digital",
    slug: "bisnis-digital",
    degreeLevel: "S1",
    degreeTitle: "S.B.D.",
    accreditation: "Baik",
    tuitionPerSemester: "Rp 4.250.000",
    shortDesc: "Transformasi bisnis era digital, E-Commerce management, digital marketing analytics, dan platform inovasi startup.",
    careerProspects: "Digital Product Manager, Growth Hacker, E-Commerce Specialist, Digital Transformation Lead.",
    totalStudentsEst: 150,
    coverImage: "/images/feb-full.jpg",
    featured: false,
  },
  {
    id: "prodi-08",
    faculty: "FKES",
    facultyName: "Fakultas Kesehatan",
    name: "S1 Keselamatan & Kesehatan Kerja (K3)",
    slug: "k3",
    degreeLevel: "S1",
    degreeTitle: "S.K.K.K. / S.K.M.",
    accreditation: "Baik Sekali",
    tuitionPerSemester: "Rp 4.750.000",
    shortDesc: "Program studi strategis dengan kebutuhan industri sangat tinggi pada sektor manufaktur, pertambangan, dan konstruksi nasional.",
    careerProspects: "HSE Officer, K3 Industrial Hygiene Auditor, Ergonomics Specialist, Safety Risk Assessor.",
    totalStudentsEst: 190,
    coverImage: "/images/kegiatan.jpg",
    featured: true,
  },
  {
    id: "prodi-09",
    faculty: "FSH",
    facultyName: "Fakultas Sosial Humaniora",
    name: "S1 Pariwisata",
    slug: "pariwisata",
    degreeLevel: "S1",
    degreeTitle: "S.Par.",
    accreditation: "Baik",
    tuitionPerSemester: "Rp 4.000.000",
    shortDesc: "Pengembangan destinasi berkelanjutan, hospitaliti internasional, dan MICE event management di pusat kebudayaan Solo Raya.",
    careerProspects: "Destination Planner, Hospitality Manager, MICE Organizer, Tourism Marketing Consultant.",
    totalStudentsEst: 160,
    coverImage: "/images/fsh-full.jpg",
    featured: true,
  },
  {
    id: "prodi-10",
    faculty: "FSH",
    facultyName: "Fakultas Sosial Humaniora",
    name: "S1 Bahasa Inggris Komunikasi Bisnis",
    slug: "bahasa-inggris",
    degreeLevel: "S1",
    degreeTitle: "S.Li. / S.S.",
    accreditation: "Baik",
    tuitionPerSemester: "Rp 4.000.000",
    shortDesc: "Komunikasi korporasi global, public speaking, penerjemahan profesional, dan negosiasi bisnis internasional.",
    careerProspects: "Corporate Communications Lead, International Public Relations, Professional Translator, Content Strategist.",
    totalStudentsEst: 120,
    coverImage: "/images/fsh-full.jpg",
    featured: false,
  },
];

export const initialAdminLeads: AdminLeadItem[] = [
  {
    id: "lead-01",
    fullName: "Rian Anggoro Wicaksono",
    phoneWhatsapp: "081234567890",
    email: "rian.anggoro@gmail.com",
    highSchool: "SMA Regina Pacis Surakarta",
    city: "Surakarta",
    programChoice: "S1 Informatika",
    targetYear: 2026,
    status: "BARU_MASUK",
    notes: "Berminat di bidang kecerdasan buatan dan beasiswa Triputra Group.",
    createdAt: "29 Okt 2026",
  },
  {
    id: "lead-02",
    fullName: "Nathania Kusuma Putri",
    phoneWhatsapp: "085712349988",
    email: "nathania.putri@yahoo.com",
    highSchool: "SMK Negeri 1 Sukoharjo",
    city: "Sukoharjo",
    programChoice: "S1 Manajemen",
    targetYear: 2026,
    status: "DIHUBUNGI",
    notes: "Sudah dihubungi tim admisi via WhatsApp, menanyakan jadwal tes beasiswa gelombang 1.",
    createdAt: "28 Okt 2026",
  },
  {
    id: "lead-03",
    fullName: "Fajar Pratama Jaya",
    phoneWhatsapp: "082199887711",
    email: "fajar.pratama@gmail.com",
    highSchool: "SMA Negeri 3 Surakarta",
    city: "Surakarta",
    programChoice: "S1 Keselamatan & Kesehatan Kerja (K3)",
    targetYear: 2026,
    status: "WAWANCARA",
    notes: "Jadwal wawancara online hari Jumat pukul 14:00 WIB bersama dekanat FKES.",
    createdAt: "27 Okt 2026",
  },
  {
    id: "lead-04",
    fullName: "Clara Stephanie Dewi",
    phoneWhatsapp: "087834567712",
    email: "clara.stephanie@gmail.com",
    highSchool: "SMA Santo Yosef Surakarta",
    city: "Surakarta",
    programChoice: "S1 Akuntansi",
    targetYear: 2026,
    status: "DITERIMA_BEASISWA",
    notes: "Lolos Beasiswa Prestasi Akademik Bebas Biaya SPP 100% Semester 1-2.",
    createdAt: "25 Okt 2026",
  },
  {
    id: "lead-05",
    fullName: "Kevin Aditya Nugroho",
    phoneWhatsapp: "081390882244",
    email: "kevin.aditya@gmail.com",
    highSchool: "SMA Negeri 1 Boyolali",
    city: "Boyolali",
    programChoice: "S1 Informatika",
    targetYear: 2026,
    status: "ENROLLED",
    notes: "Sudah melunasi registrasi awal dan resmi mendapatkan NIM Mahasiswa Baru UPITRA 2026.",
    createdAt: "22 Okt 2026",
  },
];

export const initialAdminArticles: AdminArticleItem[] = [
  {
    id: "art-01",
    title: "Belum Wisuda, 26 Lulusan UPITRA Sudah Kantongi Pekerjaan di Triputra Group",
    slug: "belum-wisuda-26-lulusan-upitra-sudah-kantongi-pekerjaan-6ad05d3770972",
    category: "Prestasi",
    summary: "Dua lulusan Sistem Informasi langsung direkrut ASSA Group, lini bisnis mobility & trading terkemuka Triputra Group.",
    content: "Sebelum toga dikenakan dan ijazah diterima, 26 lulusan Universitas Pignatelli Triputra (UPITRA) ternyata sudah lebih dulu mengantongi pekerjaan di industri...",
    coverImage: "/images/wisuda.jpg",
    author: "Humas UPITRA",
    published: true,
    publishedAt: "26 Okt 2026",
    viewCount: 1420,
  },
  {
    id: "art-02",
    title: "Sinergi UPITRA dan SMA BOSA: Jembatani Siswa Menuju Dunia Industri Melalui Pendidikan Karakter",
    slug: "sinergi-upitra-dan-sma-bosa-jembatani-siswa-menuju-dunia-industri-melalui-pendidikan-karakter-dan-beasiswa-6abce7f2d4ee9",
    category: "Berita Kampus",
    summary: "Kolaborasi intensif kurikulum holistik dan workshop orientasi karir bagi calon mahasiswa baru.",
    content: "Universitas Pignatelli Triputra kembali memperkuat jaringan edukasi dengan mengunjungi SMA BOSA Yogyakarta dalam rangka sosialisasi beasiswa industri...",
    coverImage: "/images/kegiatan.jpg",
    author: "Redaksi Kampus",
    published: true,
    publishedAt: "24 Okt 2026",
    viewCount: 980,
  },
  {
    id: "art-03",
    title: "Hadirkan Inovasi dan SDM Berdampak Lewat Kerja Sama Resmi dengan Pemprov Jateng",
    slug: "hadirkan-inovasi-dan-sdm-berdampak-lewat-kerja-sama-dengan-pemprov-jateng-69d7865ab850b",
    category: "Inovasi & Riset",
    summary: "Nota kesepahaman strategis pengembangan talenta digital dan riset terapan di Jawa Tengah.",
    content: "Penandatanganan kerjasama antara Pemerintah Provinsi Jawa Tengah dan UPITRA menegaskan komitmen kampus dalam memajukan riset terapan dan inovasi ekonomi daerah...",
    coverImage: "/images/ar-vr.jpg",
    author: "Biro Kerjasama",
    published: true,
    publishedAt: "20 Okt 2026",
    viewCount: 1150,
  },
  {
    id: "art-04",
    title: "Penerimaan Mahasiswa Baru Gelombang 1 TA 2026/2027 Resmi Dibuka",
    slug: "penerimaan-mahasiswa-baru-gelombang-1-ta-2026-2027-resmi-dibuka",
    category: "Pengumuman",
    summary: "Kesempatan mendapatkan beasiswa penuh dan fasilitas immersion 3+1 bersama Triputra Group.",
    content: "Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027 telah dibuka secara daring di pmb.upitra.ac.id. Calon mahasiswa dapat memilih 10 program studi unggulan...",
    coverImage: "/images/hero-1.jpg",
    author: "Admisi PMB",
    published: true,
    publishedAt: "18 Okt 2026",
    viewCount: 2340,
  },
];

export const initialAdminDownloads: AdminDownloadItem[] = [
  {
    id: "dl-01",
    title: "Brosur Resmi Penerimaan Mahasiswa Baru (PMB) UPITRA TA 2026/2027",
    category: "Brosur PMB",
    fileName: "Brosur-Resmi-PMB-UPITRA-2026.pdf",
    fileSize: "4.8 MB",
    fileUrl: "/images/hero-1.jpg",
    previewUrl: "/images/hero-1.jpg",
    downloadCount: 1420,
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

// ── 49 Authentic Partners from ModifikasiUpitra ─────────────────────────────
export const initialAdminMitra: AdminMitraItem[] = [
  // 1. TRIPUTRA GROUP & AFILIASI
  { id: "mitra-01", name: "PT Triputra Agro Persada Tbk", category: "Triputra Group", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra17.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-02", name: "PT Persada Capital Investama", category: "Triputra Group", partnershipType: "Beasiswa Industri", logo: "/images/mitra/1779420091_6a0fcbbb0181c.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-03", name: "PT Daya Adicipta Mustika", category: "Triputra Group", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779428428_6a0fec4c95ef6.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-04", name: "PT Adaro Energy Indonesia Tbk", category: "Triputra Group", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra1.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-05", name: "PT Kirana Megatara Tbk", category: "Triputra Group", partnershipType: "Penyerapan Karir", logo: "/images/mitra/mitra4.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-06", name: "PT Surya Semesta Internusa Tbk", category: "Triputra Group", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra14.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-07", name: "PT Sumber Energi Pangan", category: "Triputra Group", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra12.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-08", name: "PT Lintas Samudra Borneo Line", category: "Triputra Group", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra6.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-09", name: "PT Java Energy Semesta", category: "Triputra Group", partnershipType: "Penyerapan Karir", logo: "/images/mitra/mitra3.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-10", name: "PT Mitra Selera Bersama", category: "Triputra Group", partnershipType: "Beasiswa Industri", logo: "/images/mitra/mitra16.png", mouYear: "2024 - 2029", status: "Aktif" },

  // 2. INDUSTRI, FINANSIAL & MANUFAKTUR
  { id: "mitra-11", name: "PT Konimex", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra5.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-12", name: "PT Dan Liris", category: "Industri & Finansial", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra2.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-13", name: "PT Bursa Efek Indonesia (IDX)", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/1779420683_6a0fce0b533be.jfif", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-14", name: "PT Pegadaian", category: "Industri & Finansial", partnershipType: "Beasiswa Industri", logo: "/images/mitra/mitra8.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-15", name: "BUMN Perum Perhutani", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra9.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-16", name: "PT Asuransi Sinarmas", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/mitra13.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-17", name: "KAP Naufal Widita Jati", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra7.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-18", name: "PT ATMI Solo", category: "Industri & Finansial", partnershipType: "Immersion 3+1", logo: "/images/mitra/1779420875_6a0fcecb13dc7.jfif", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-19", name: "PT ATMI IGI Center", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779420768_6a0fce60e1788.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-20", name: "PT ATMI Bizdec", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/1779420830_6a0fce9e9fd48.jfif", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-21", name: "Solo Techno Park", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/1779420221_6a0fcc3d58c8e.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-22", name: "PT Mitra Data Abadi", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779420438_6a0fcd1610bb3.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-23", name: "PT Aksara Solopos", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/1779420481_6a0fcd41b273d.jfif", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-24", name: "PT Tribun Network", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779420518_6a0fcd668edd3.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-25", name: "PT Periplus Bookindo", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra10.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-26", name: "PT Hailai Sinar Cemerlang", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779420734_6a0fce3e7a99f.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-27", name: "PT Kartika Cemerlang Jaya Abadi", category: "Industri & Finansial", partnershipType: "Riset & Magang", logo: "/images/mitra/1779420978_6a0fcf32e9137.jfif", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-28", name: "PT Astra International Tbk", category: "Industri & Finansial", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra1.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-29", name: "PT Telkom Indonesia (Persero) Tbk", category: "Industri & Finansial", partnershipType: "Penyerapan Karir", logo: "/images/mitra/mitra11.png", mouYear: "2025 - 2030", status: "Aktif" },

  // 3. KESEHATAN (FACULTY HEALTH) & PARIWISATA (FSH)
  { id: "mitra-30", name: "PT Persada Medika Raya", category: "Kesehatan & RS", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra11.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-31", name: "PT Persada Medika Utama", category: "Kesehatan & RS", partnershipType: "Immersion 3+1", logo: "/images/mitra/1779428488_6a0fec886b0a8.jfif", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-32", name: "RS Kasih Ibu Surakarta", category: "Kesehatan & RS", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra5.png", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-33", name: "RS Dr. Oen Surakarta", category: "Kesehatan & RS", partnershipType: "Riset & Magang", logo: "/images/mitra/mitra13.png", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-34", name: "RS Panti Waluyo Surakarta", category: "Kesehatan & RS", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra15.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-35", name: "PT Legian Hotel Management", category: "Kesehatan & RS", partnershipType: "Immersion 3+1", logo: "/images/mitra/mitra15.png", mouYear: "2023 - 2028", status: "Aktif" },
  { id: "mitra-36", name: "PT Citra Pariwisata Indonesia", category: "Kesehatan & RS", partnershipType: "Penyerapan Karir", logo: "/images/mitra/1779427566_6a0fe8ee65999.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-37", name: "Asosiasi Pelaku Pariwisata Indonesia (ASPPI)", category: "Kesehatan & RS", partnershipType: "Riset & Magang", logo: "/images/mitra/1779428318_6a0febde89159.jfif", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-38", name: "Dinas Kebudayaan & Pariwisata Kota Surakarta", category: "Kesehatan & RS", partnershipType: "Riset & Magang", logo: "/images/mitra/1779427866_6a0fea1a28584.png", mouYear: "2024 - 2029", status: "Aktif" },

  // 4. INSTITUSI PENDIDIKAN & PEMERINTAHAN
  { id: "mitra-39", name: "Pemerintah Kota Surakarta", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779427606_6a0fe916773a0.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-40", name: "Pemerintah Provinsi Jawa Tengah", category: "Pemerintah & Pendidikan", partnershipType: "Beasiswa Industri", logo: "/images/mitra/1779428364_6a0fec0c82bb1.png", mouYear: "2026 - 2031", status: "Aktif" },
  { id: "mitra-41", name: "Pemerintah Desa Karangasem", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779427944_6a0fea68ef8b4.png", mouYear: "2024 - 2027", status: "Aktif" },
  { id: "mitra-42", name: "Diskominfo Tuban", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779427994_6a0fea9a93851.png", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-43", name: "LLDIKTI Wilayah VI Kemendiktisaintek RI", category: "Pemerintah & Pendidikan", partnershipType: "Beasiswa Industri", logo: "/images/mitra/1779427903_6a0fea3fd6285.png", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-44", name: "Universitas Atma Jaya Yogyakarta", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779428394_6a0fec2a38709.png", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-45", name: "Universitas Keio, Jepang", category: "Mitra Global", partnershipType: "Riset & Magang", logo: "/images/logo.png", mouYear: "2025 - 2030", status: "Aktif" },
  { id: "mitra-46", name: "Benny Subianto Foundation", category: "Pemerintah & Pendidikan", partnershipType: "Beasiswa Industri", logo: "/images/mitra/1779428069_6a0feae5a234e.jfif", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-47", name: "Yayasan Adikarya Pusaka Indonesia", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779428283_6a0febbb40932.png", mouYear: "2024 - 2028", status: "Aktif" },
  { id: "mitra-48", name: "Gereja Santo Petrus Surakarta", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779428153_6a0feb39bba5c.jfif", mouYear: "2024 - 2029", status: "Aktif" },
  { id: "mitra-49", name: "Kevikepan Surakarta", category: "Pemerintah & Pendidikan", partnershipType: "Riset & Magang", logo: "/images/mitra/1779428204_6a0feb6c2b074.jfif", mouYear: "2024 - 2029", status: "Aktif" },
];

export const initialConnectedInstagramAccount: ConnectedInstagramAccount = {
  isConnected: true,
  username: "upitra_campus",
  displayName: "Universitas Pignatelli Triputra",
  profilePicUrl: "/images/logo.png",
  bio: "Official Account of Universitas Pignatelli Triputra (UPITRA) Surakarta. Membangun Generasi Unggul Berkarakter Triputra.",
  followersCount: 4820,
  followingCount: 142,
  postsCount: 184,
  connectedAt: "29 Okt 2026, 12:45 WIB",
  tokenExpiresAt: "Permanen (Sampai Logout Manual)",
  source: "official_login",
  recentPosts: [
    {
      id: "ig_post_01",
      caption: "🌍 Suka petualangan & dunia kreatif? Pilih jurusan sesuai passionmu di S1 Pariwisata UPITRA! Belajar berbasis praktik dengan Immersion industri langsung dan mentor praktisi berpengalaman.",
      mediaUrl: "/images/pariwisata/par-1.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-28T14:30:00Z",
      timeAgo: "1 hari yang lalu",
      likeCount: 368,
      commentCount: 32,
      category: "S1 Pariwisata",
    },
    {
      id: "ig_post_02",
      caption: "🚀 Siap kerja sebelum wisuda! Mahasiswa UPITRA menjalani Immersion Program 3+1 di berbagai unit bisnis Triputra Group se-Indonesia. Teori di kelas, aksi nyata di industri!",
      mediaUrl: "/images/kegiatan.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-26T09:15:00Z",
      timeAgo: "3 hari yang lalu",
      likeCount: 289,
      commentCount: 19,
      category: "Immersion 3+1",
    },
    {
      id: "ig_post_03",
      caption: "🏆 Bangga! Mahasiswa Fakultas Sains & Teknologi UPITRA kembali memboyong medali kejuaraan inovasi komputasi dan kecerdasan buatan. Integritas dan karakter membuahkan prestasi nyata!",
      mediaUrl: "/images/ar-vr.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-23T11:00:00Z",
      timeAgo: "6 hari yang lalu",
      likeCount: 415,
      commentCount: 34,
      category: "Prestasi Mahasiswa",
    },
    {
      id: "ig_post_04",
      caption: "📚 Suasana belajar modern, interaktif, dan kolaboratif di kampus UPITRA Solo. Fasilitas laboratorium mutakhir dan perpustakaan digital siap mendampingi riset kreatifmu.",
      mediaUrl: "/images/kuliah-1.jpeg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-20T08:20:00Z",
      timeAgo: "1 minggu yang lalu",
      likeCount: 256,
      commentCount: 15,
      category: "Fasilitas Kampus",
    },
    {
      id: "ig_post_05",
      caption: "🤝 Kunjungan industri dan penandatanganan sinergi strategis antara UPITRA dengan mitra korporasi nasional. Menghubungkan kurikulum kampus dengan kebutuhan industri masa depan.",
      mediaUrl: "/images/feb-full.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-15T13:45:00Z",
      timeAgo: "2 minggu yang lalu",
      likeCount: 420,
      commentCount: 28,
      category: "Kemitraan Industri",
    },
  ],
};

// Compatibility aliases
export type InstagramSyncStatus = ConnectedInstagramAccount;
export const initialInstagramSyncStatus = initialConnectedInstagramAccount;

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
    url: "/layanan/career-center",
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
    url: "/layanan/e-learning",
    status: "Operasional Normal",
    description: "Platform perkuliahan hybrid interaktif dengan fitur presensi digital, tugas, dan materi kuliah daring.",
  },
  {
    id: "srv-05",
    name: "Tracer Study Alumni",
    category: "Karir & Alumni",
    pic: "Biro Kemahasiswaan & Alumni",
    contact: "tracer@upitra.ac.id",
    url: "/layanan/tracer-study",
    status: "Operasional Normal",
    description: "Sistem pelacakan jejak karir dan evaluasi relevansi kurikulum pendidikan UPITRA dengan dunia industri.",
  },
  {
    id: "srv-06",
    name: "Triputra Immersion Program 3+1",
    category: "Karir & Alumni",
    pic: "Direktorat Kerjasama Industri",
    contact: "immersion@upitra.ac.id",
    url: "/layanan/immersion-program",
    status: "Operasional Normal",
    description: "Program unggulan 3 tahun kuliah di kampus dan 1 tahun magang intensif berbayar di ekosistem Triputra Group.",
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
    ctaLink: "/layanan/immersion-program",
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

// ── Initial Profil Sections (Tentang, Visi Misi, Pimpinan, Prestasi, Pengumuman) ──
export const initialAdminProfilList: AdminProfilSection[] = [
  {
    id: "prof-01",
    type: "tentang",
    title: "Tentang Universitas Pignatelli Triputra (UPITRA)",
    subtitle: "Penggabungan Historis & Transformasi Perguruan Tinggi Berkualitas di Solo",
    content: "Universitas Pignatelli Triputra (UPITRA) merupakan institusi pendidikan tinggi hasil sinergi strategis antara Yayasan Santo Aloysius dengan konglomerasi Triputra Group. Memadukan nilai keluhuran karakter Kristiani dengan profesionalisme dan keunggulan ekosistem korporasi nasional.",
    extraMeta: "Didirikan Resmi: 2022 • Akreditasi: BAIK SEKALI BAN-PT",
    image: "/images/gedung-upitra.jpg",
    updatedAt: "28 Okt 2026",
  },
  {
    id: "prof-02",
    type: "visi_misi",
    title: "Visi, Misi & Nilai Inti (Triputra DNA)",
    subtitle: "Menjadi Universitas Unggul yang Berkarakter, Berdaya Saing Global, dan Berakar pada Kemanusiaan",
    content: "Visi: Menjadi perguruan tinggi rujukan berstandar industri dengan penguatan soft skill, integritas etika, dan kesiapan karir. Misi: Menyelenggarakan pendidikan holistik dengan model Immersion 3+1, riset terapan berkelanjutan, dan pengabdian masyarakat.",
    extraMeta: "Nilai Inti: Integrity & Ethics, Excellence, Compassion, Humility",
    image: "/images/kampus-1.jpg",
    updatedAt: "27 Okt 2026",
  },
  {
    id: "prof-03",
    type: "pimpinan",
    title: "Dr. Fr. Ninik Yudianti, M.Acc., QIA., CSRA",
    subtitle: "Rektor Universitas Pignatelli Triputra (UPITRA)",
    content: "Memimpin UPITRA dalam akselerasi transformasi kurikulum berbasis industri, digitalisasi sistem akademik, dan ekspansi kemitraan strategis Triputra Group.",
    extraMeta: "Pendidikan: S1 Undip, S2 UGM, S3 Curtin University Australia",
    image: "/images/rektor-fix.jpg",
    updatedAt: "25 Okt 2026",
  },
  {
    id: "prof-04",
    type: "prestasi",
    title: "Gold Medal AISEEF 2025 & Bronze Medal Saint Angela Choir 2026",
    subtitle: "Pencapaian Prestasi Mahasiswa Bidang Riset Sains dan Seni Budaya",
    content: "Mahasiswa FST UPITRA meraih medali emas inovasi komputasi cerdas, disusul capaian medali paduan suara Genta Dikara di kancah paduan suara internasional.",
    extraMeta: "Kategori: Internasional & Nasional",
    image: "/images/anugerah.jpg",
    updatedAt: "24 Okt 2026",
  },
];

// ── Initial Kemahasiswaan Sections (Ormawa, Kalender, Galeri) ──
export const initialAdminKemahasiswaanList: AdminKemahasiswaanSection[] = [
  {
    id: "kmh-01",
    type: "ormawa",
    title: "Badan Eksekutif Mahasiswa (BEM) UPITRA",
    category: "Eksekutif Mahasiswa",
    description: "Organisasi payung tertinggi pergerakan mahasiswa UPITRA yang aktif mengawal aspirasi mahasiswa, advokasi, dan program sosial kemasyarakatan.",
    dateOrSemester: "Periode 2026/2027",
    image: "/images/kegiatan.jpg",
    link: "/kemahasiswaan/organisasi-mahasiswa",
    updatedAt: "28 Okt 2026",
  },
  {
    id: "kmh-02",
    type: "kalender",
    title: "Jadwal Perkuliahan & Ujian Semester Genap TA 2025/2026",
    category: "Kalender Akademik",
    description: "Masa perkuliahan efektif minggu 1-16, Ujian Tengah Semester (UTS), Ujian Akhir Semester (UAS), dan batas yudisium kelulusan.",
    dateOrSemester: "Semester Genap 2026",
    image: "/images/kalender.jpg",
    link: "/kemahasiswaan/kalender-akademik",
    updatedAt: "27 Okt 2026",
  },
  {
    id: "kmh-03",
    type: "galeri",
    title: "Dokumentasi Malam Keakraban & Inaugurasi Mahasiswa Baru",
    category: "Galeri Kegiatan",
    description: "Penyambutan mahasiswa baru dengan orientasi kepemimpinan, outbound karakter, dan pentas apresiasi bakat seni mahasiswa.",
    dateOrSemester: "September 2026",
    image: "/images/kampus-2.jpg",
    link: "/kemahasiswaan/galeri-kegiatan",
    updatedAt: "25 Okt 2026",
  },
];

// ── Initial Riset & Publikasi Sections ──
export const initialAdminRisetList: AdminRisetSection[] = [
  {
    id: "rst-01",
    title: "Penerapan Deep Learning Convolutional Neural Network untuk Klasifikasi Mutu Karet Alam Industri",
    researcher: "Riko Handoko, S.Kom., M.T. & Tim FST UPITRA",
    faculty: "Fakultas Sains & Teknologi",
    journalName: "IEEE Transactions on Industrial Informatics",
    indexedIn: "Scopus",
    year: 2026,
    doiOrUrl: "https://doi.org/10.1109/TII.2026.01428",
    abstractText: "Riset terapan kolaborasi bersama PT Kirana Megatara Tbk untuk otomatisasi inspeksi kualitas getah karet menggunakan computer vision.",
  },
  {
    id: "rst-02",
    title: "Analisis Pengaruh Penerapan Green Supply Chain Management terhadap Kinerja Finansial Agribisnis",
    researcher: "Citra Lestari, S.Psi, M.M. & Dosen FEB",
    faculty: "Fakultas Ekonomi & Bisnis",
    journalName: "Jurnal Riset Manajemen & Bisnis Terapan",
    indexedIn: "SINTA 2",
    year: 2025,
    doiOrUrl: "https://doi.org/10.21009/JRMBT.2025.0210",
    abstractText: "Studi kasus empiris implementasi rantai pasok berkelanjutan pada perkebunan kelapa sawit PT Triputra Agro Persada Tbk.",
  },
];

// ── Initial Kerjasama MoU List ──
export const initialAdminMouList: AdminKerjasamaMouItem[] = [
  {
    id: "mou-01",
    partnerName: "Triputra Group",
    documentType: "MoU",
    scope: "Penyelenggaraan Program Immersion 3+1, Magang Industri Berbayar, Beasiswa Penuh, dan Penyerapan Karir Lulusan",
    startYear: "2023",
    endYear: "2028",
    signatory: "Rektor UPITRA & CEO Triputra Group",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
  {
    id: "mou-02",
    partnerName: "Pemerintah Provinsi Jawa Tengah",
    documentType: "MoU",
    scope: "Pengembangan SDM Daerah, Riset Kebijakan Publik, dan Pelatihan Kompetensi Digital ASN dan Pemuda Jawa Tengah",
    startYear: "2026",
    endYear: "2031",
    signatory: "Rektor UPITRA & Gubernur Jawa Tengah",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
  {
    id: "mou-03",
    partnerName: "PT Astra International Tbk",
    documentType: "MoU",
    scope: "Pengembangan SDM Industri Otomotif, Kuliah Umum Praktisi, dan Program Rekrutmen Kampus",
    startYear: "2024",
    endYear: "2029",
    signatory: "Dekan FST & Head of HR Astra International",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
  {
    id: "mou-04",
    partnerName: "Universitas Keio, Jepang",
    documentType: "MoA",
    scope: "Student Exchange Program, Riset Kolaboratif AI & Smart City, dan Pertukaran Dosen Tamu Internasional",
    startYear: "2025",
    endYear: "2030",
    signatory: "Rektor UPITRA & Dean of International Affairs Keio",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
];
