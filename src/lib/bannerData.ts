/**
 * Konfigurasi Banner Promosi Hero Slider UPITRA
 * 
 * PANDUAN PENGGANTIAN BANNER:
 * 1. Simpan file gambar Anda di folder `public/images/banners/` (atau `public/images/`).
 * 2. Format yang didukung: JPG, JPEG, PNG, WebP, SVG, atau URL eksternal (https://...).
 * 3. Ukuran file disarankan: < 500 KB (optimal: 100 KB - 250 KB rasio 16:9 atau 21:9).
 * 4. Komponen HeroSlider mendukung dua mode:
 *    - Mode Konten Kampus (default): background foto kampus + teks judul & tombol CTA elegan.
 *    - Mode Grafis Penuh (`isGraphicOnly: true`): jika Anda memasukkan gambar poster/flyer yang sudah memiliki teks sendiri.
 */

export interface PromoBanner {
  id: number;
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;
  link: string;
  ctaText?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  alt: string;
  isGraphicOnly?: boolean;
  fallbackGradient?: string;
}

export const defaultBanners: PromoBanner[] = [
  {
    id: 1,
    badge: "PENERIMAAN MAHASISWA BARU TA 2026/2027",
    title: "Wujudkan Karir Masa Depan di Kampus Berkarakter Industri",
    subtitle: "Dapatkan Beasiswa Penuh Triputra Peduli Prestasi hingga 100% dan jaminan prioritas magang di 43+ grup korporasi.",
    image: "/images/banners/hero-pmb.jpg",
    link: "https://pmb.upitra.ac.id",
    ctaText: "Daftar PMB Online",
    secondaryCtaText: "Informasi Beasiswa",
    secondaryCtaLink: "https://pmb.upitra.ac.id",
    alt: "Penerimaan Mahasiswa Baru UPITRA 2026/2027 - Gedung Kampus UPITRA Surakarta",
    fallbackGradient: "from-[#05172e] via-[#0b2545] to-[#0f3b73]",
  },
  {
    id: 2,
    badge: "FAKULTAS & PROGRAM STUDI UNGGULAN",
    title: "Pilihan Program Studi Berbasis Teknologi & Karakter Luhur",
    subtitle: "Fakultas Sains & Teknologi, Ekonomi & Bisnis, Sosial Humaniora, dan Kesehatan dengan kurikulum Outcome-Based Education.",
    image: "/images/banners/hero-fakultas.jpg",
    link: "/programs",
    ctaText: "Eksplorasi Program Studi",
    secondaryCtaText: "Unduh E-Brosur",
    secondaryCtaLink: "/ebrochure",
    alt: "Fakultas dan Program Studi Universitas Pignatelli Triputra",
    fallbackGradient: "from-[#08152c] via-[#0d2347] to-[#073244]",
  },
  {
    id: 3,
    badge: "LIFE AT UPITRA SURAKARTA",
    title: "Kampus Modern, Komunitas Kolaboratif & Fasilitas Terpadu",
    subtitle: "Rasakan atmosfer belajar dinamis di Surakarta dengan bimbingan dosen praktisi dan lingkungan ramah inovasi.",
    image: "/images/banners/hero-kampus.jpg",
    link: "/life-at-upitra",
    ctaText: "Jelajahi Kehidupan Kampus",
    secondaryCtaText: "Informasi PMB",
    secondaryCtaLink: "https://pmb.upitra.ac.id",
    alt: "Kehidupan Kampus dan Fasilitas Terpadu UPITRA Solo",
    fallbackGradient: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
  },
  {
    id: 4,
    badge: "PRIORITAS REKRUTMEN DUNIA KERJA",
    title: "Hampir Separuh Lulusan Direkrut Bekerja Sebelum Wisuda",
    subtitle: "Kemitraan strategis dengan puluhan industri nasional membuka jalan karir cepat bagi talenta muda UPITRA.",
    image: "/images/banners/hero-karir.jpg",
    link: "https://pmb.upitra.ac.id",
    ctaText: "Daftar PMB 2026",
    secondaryCtaText: "Mitra Industri",
    secondaryCtaLink: "/mitra",
    alt: "Wisuda dan Penyaluran Kerja Lulusan UPITRA ke Industri",
    fallbackGradient: "from-[#1a1306] via-[#2a1c07] to-[#1a1c1d]",
  },
];

/**
 * Normalisasi path gambar agar user bisa menulis:
 * - "banner1.jpg" -> "/images/banners/banner1.jpg"
 * - "/images/gedung-upitra.jpg" -> "/images/gedung-upitra.jpg"
 * - "/banner1.jpg" -> "/banner1.jpg"
 * - "https://..." -> "https://..."
 */
export function normalizeBannerPath(path: string): string {
  if (!path) return "/images/banners/hero-pmb.jpg";
  
  // URL eksternal
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  
  // Path absolut dari root
  if (path.startsWith("/")) {
    return path;
  }
  
  // Nama file relatif, defaultkan ke /images/banners/
  return `/images/banners/${path}`;
}
