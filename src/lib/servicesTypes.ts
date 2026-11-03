export interface ServiceMetadata {
  cleanDescription: string;
  attachmentUrl: string | null;
  attachmentName: string | null;
  attachmentSize: string | null;
  tag: string | null;
  category: string | null;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  category?: string;
  order?: number;
}

export const defaultLayananFaqs: FaqItem[] = [
  {
    id: "faq-1",
    q: "Bagaimana cara mendaftar sebagai mahasiswa baru di UPITRA?",
    a: "Pendaftaran dapat dilakukan secara mandiri melalui portal resmi https://pmb.upitra.ac.id atau langsung hadir ke Kantor Admisi Kampus UPITRA di Surakarta. Tersedia Jalur Bebas Tes (Jalur Rapor) serta berbagai skema beasiswa prestasi.",
    category: "PMB",
    order: 1,
  },
  {
    id: "faq-2",
    q: "Bagaimana cara mengakses Perpustakaan Daring (SIPER UPITRA)?",
    a: "Sivitas akademika dapat mengakses sistem perpustakaan melalui https://siper.upitra.ac.id menggunakan akun SSO (Single Sign-On) kampus untuk menelusuri katalog buku fisik, repositori karya ilmiah, dan koleksi e-journal internasional.",
    category: "Perpustakaan",
    order: 2,
  },
  {
    id: "faq-3",
    q: "Apa itu platform Unity E-Learning (LMS) dan bagaimana cara login?",
    a: "Unity LMS (https://unity.upitra.ac.id) adalah platform manajemen perkuliahan daring resmi UPITRA. Mahasiswa dan dosen menggunakan kredensial email kampus (@upitra.ac.id) untuk mengakses materi kuliah, kuis interaktif, pengumpulan tugas, dan presensi.",
    category: "Akademik",
    order: 3,
  },
  {
    id: "faq-4",
    q: "Apakah ada program beasiswa untuk mahasiswa baru?",
    a: "Ya, UPITRA menyediakan program Beasiswa Triputra Peduli dengan potongan biaya SPP hingga 100%, Beasiswa Prestasi Akademik/Non-Akademik, serta program KIP-Kuliah Kemendikbudristek.",
    category: "PMB",
    order: 4,
  },
  {
    id: "faq-5",
    q: "Bagaimana mekanisme Immersion Program 3+1 di Triputra Group?",
    a: "Melalui kurikulum 3+1, mahasiswa menempuh 3 tahun perkuliahan intensif di kampus dan 1 tahun program immersion (magang profesional bersertifikat dan berbayar) di unit bisnis Triputra Group dengan bimbingan mentor industri eksekutif.",
    category: "Karir",
    order: 5,
  },
  {
    id: "faq-6",
    q: "Ke mana saya dapat menghubungi jika membutuhkan bantuan layanan kampus?",
    a: "Anda dapat menghubungi Pusat Layanan Terpadu & WhatsApp Admisi di 0811-290-7500 atau melalui fitur AI Chat Assistant UPITRA yang selalu siap 24 jam di pojok kanan bawah layar website.",
    category: "Umum",
    order: 6,
  },
];

export interface PmbBrochureSetting {
  title: string;
  subTitle: string;
  fileName: string;
  fileSize: string;
  coverImage: string;
  pdfUrl: string;
  description: string;
  highlights: string[];
}

export const defaultPmbBrochure: PmbBrochureSetting = {
  title: "Penerimaan Mahasiswa Baru",
  subTitle: "Brosur PMB & Panduan Akademik TA 2026/2027 • PDF (6.2 MB)",
  fileName: "Brosur PMB & Panduan Akademik 2026/2027",
  fileSize: "6.2 MB",
  coverImage: "/images/brochures/1788939036_6aa10b1c44527.jpg",
  pdfUrl: "https://www.upitra.ac.id/files/brochures/1791794242_6acc9c42b5951.pdf",
  description:
    "Panduan resmi penerimaan mahasiswa baru UPITRA, skema beasiswa Triputra Peduli (potongan SPP s/d 100%), jadwal pendaftaran jalur tanpa tes, dan profil ekosistem kampus.",
  highlights: [
    "Jalur Rapor Bebas Tes",
    "Beasiswa Prestasi Triputra (s/d 100%)",
    "Estimasi Biaya Kuliah & Asrama",
    "Fasilitas Kampus Surakarta",
  ],
};

