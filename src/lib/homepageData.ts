// ── Homepage Types & Default Content ────────────────────────────────────────

export interface HomepageHero {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
}

export const defaultHomepageHero: HomepageHero = {
  title: "Universitas\nPignatelli Triputra\nCampus to Career",
  subtitle:
    "Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di Universitas Pignatelli Triputra.",
  ctaLabel: "Daftar Sekarang",
  ctaHref: "https://pmb.upitra.ac.id",
  imageUrl: "/images/hero-campus.jpg",
};

export interface AdmissionWaveItem {
  id: string;
  title: string;
  benefit: string;
  image: string;
  link: string;
}

export interface HomepageWaves {
  title: string;
  subtitle: string;
  waves: AdmissionWaveItem[];
}

export const defaultHomepageWaves: HomepageWaves = {
  title: "Selamat Datang di UPITRA",
  subtitle: "Gelombang pendaftaran yang sedang kami buka.",
  waves: [
    {
      id: "ready-early",
      title: "Ready Early",
      benefit: "Beasiswa 100% DPP & SKS",
      image: "/images/pmb/wave-ready-early-hq.jpg",
      link: "https://pmb.upitra.ac.id",
    },
    {
      id: "ready-achievement",
      title: "Ready Achievement",
      benefit: "Beasiswa hingga 100% DPP & SKS",
      image: "/images/pmb/wave-ready-achievement-hq.jpg",
      link: "https://pmb.upitra.ac.id",
    },
    {
      id: "ready-admission",
      title: "Ready Admission",
      benefit: "Beasiswa hingga 100% Uang DPP",
      image: "/images/pmb/wave-ready-admission-hq.jpg",
      link: "https://pmb.upitra.ac.id",
    },
  ],
};

export interface StatMetricItem {
  id: string;
  value: string;
  label: string;
}

export interface HomepageStats {
  title: string;
  subtitle: string;
  studentCutoutImage: string;
  metrics: StatMetricItem[];
}

export const defaultHomepageStats: HomepageStats = {
  title: "UPITRA Dalam Angka",
  subtitle: "Beberapa prestasi & capaian kami dalam 4 tahun terakhir.",
  studentCutoutImage: "/images/upitra-student-achiever.png",
  metrics: [
    { id: "mahasiswa", value: "600+", label: "Mahasiswa Aktif" },
    { id: "fakultas", value: "4", label: "Fakultas" },
    { id: "prodi", value: "10", label: "Program Studi" },
    { id: "dosen", value: "65+", label: "Dosen & Peneliti" },
    { id: "riset", value: "1200+", label: "Riset & Publikasi" },
    { id: "lulusan", value: "85%", label: "Lulusan Bekerja dalam 6 Bulan" },
  ],
};

export interface HomepageInstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timeAgo: string;
  category: string;
}

export interface HomepageInstagram {
  title: string;
  subtitle: string;
  handle: string;
  profileUrl: string;
  posts: HomepageInstagramPost[];
}

export const defaultHomepageInstagram: HomepageInstagram = {
  title: "KABAR & CERITA KAMPUS",
  subtitle:
    "Ikuti dinamika kehidupan mahasiswa, pengumuman beasiswa, serta sivitas akademika langsung dari postingan terbaru Instagram @upitra_campus.",
  handle: "@upitra_campus",
  profileUrl: "https://www.instagram.com/upitra_campus/",
  posts: [
    {
      id: "ig_post_01",
      caption: "✨ Prestasi Mahasiswa UPITRA dalam ajang kompetisi nasional 2026.",
      mediaUrl: "/images/instagram/ig-1.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timeAgo: "1 hari yang lalu",
      category: "PRESTASI MAHASISWA",
    },
    {
      id: "ig_post_02",
      caption: "🎓 Kegiatan kampus dan perkuliahan interaktif mahasiswa UPITRA.",
      mediaUrl: "/images/instagram/ig-2.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timeAgo: "4 hari yang lalu",
      category: "KEGIATAN KAMPUS",
    },
    {
      id: "ig_post_03",
      caption: "🔥 Info Beasiswa PMB UPITRA 2026 potongan UKT & DPP hingga 100%.",
      mediaUrl: "/images/instagram/ig-3.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timeAgo: "6 hari yang lalu",
      category: "INFO BEASISWA PMB",
    },
    {
      id: "ig_post_04",
      caption: "📚 Fasilitas kampus modern, laboratorium komputer, dan perpustakaan digital.",
      mediaUrl: "/images/instagram/ig-4.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timeAgo: "1 minggu yang lalu",
      category: "FASILITAS KAMPUS",
    },
    {
      id: "ig_post_05",
      caption: "🤝 Kemitraan industri strategis dengan puluhan unit bisnis Triputra Group.",
      mediaUrl: "/images/instagram/ig-5.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timeAgo: "2 minggu yang lalu",
      category: "KEMITRAAN INDUSTRI",
    },
  ],
};

export interface HomepageCta {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

export const defaultHomepageCta: HomepageCta = {
  eyebrow: "SIAP JADI KELUARGA UPITRA?",
  title: "Temukan potensi diri kamu dan\nmulai perjalanan karirmu bersama UPITRA",
  ctaLabel: "Daftar Sekarang",
  ctaHref: "https://pmb.upitra.ac.id",
};

export interface HomepageVisibility {
  hero: boolean;
  waves: boolean;
  stats: boolean;
  instagram: boolean;
  cta: boolean;
}

export const defaultHomepageVisibility: HomepageVisibility = {
  hero: true,
  waves: true,
  stats: true,
  instagram: true,
  cta: true,
};

