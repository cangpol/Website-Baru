// Shared (client + server) definitions for the editable content of the public pages.
// Banner (title, description, image) is stored separately via the page-header-banner setting.

export const PAGE_CONTENT_KEYS = ["riset", "kemahasiswaan", "kerjasama", "layanan"] as const;
export type PageContentKey = (typeof PAGE_CONTENT_KEYS)[number];

export type FieldSpec =
  | { key: string; label: string; type: "text" | "textarea" | "image" }
  | { key: string; label: string; type: "list"; itemLabel: string; fields: FieldSpec[] };

export const PAGE_LABELS: Record<PageContentKey, string> = {
  riset: "Riset",
  kemahasiswaan: "Kemahasiswaan",
  kerjasama: "Kerjasama",
  layanan: "Layanan",
};

export const BANNER_DEFAULTS: Record<PageContentKey, { title: string; description: string; imageUrl: string }> = {
  riset: {
    title: "Pusat Riset, Inovasi,\n& Pengabdian",
    description: "Mendorong riset terapan, inovasi, dan pengabdian kepada masyarakat yang berdampak bagi industri dan masyarakat.",
    imageUrl: "/images/kegiatan.jpg",
  },
  kemahasiswaan: {
    title: "Pengembangan\n& Kehidupan Mahasiswa",
    description: "Wadah pembinaan karakter, minat, bakat, dan prestasi mahasiswa\nUniversitas Pignatelli Triputra.",
    imageUrl: "/images/kemahasiswaan/banner.jpg",
  },
  kerjasama: {
    title: "Jejaring, Kemitraan,\n& Sinergi Industri",
    description: "Membangun kolaborasi strategis bersama industri, pemerintah, dan institusi pendidikan.",
    imageUrl: "/images/gedung-upitra.jpg",
  },
  layanan: {
    title: "Portal & Ekosistem\nKampus",
    description: "Akses layanan digital, perpustakaan, pembelajaran, dan karir Universitas Pignatelli Triputra dalam satu portal.",
    imageUrl: "/images/perpustakaan.jpg",
  },
};

// ── Defaults (identik dengan tampilan referensi; dipakai bila admin belum mengisi) ──
export const CONTENT_DEFAULTS = {
  riset: {
    about:
      "LPPM (Lembaga Penelitian dan Pengabdian kepada Masyarakat) Universitas Pignatelli Triputra menjadi pusat penelitian, pengabdian, dan inovasi sivitas akademika. LPPM mengoordinasikan perencanaan, pelaksanaan, monitoring, dan evaluasi kegiatan penelitian serta pengabdian kepada masyarakat, mendorong publikasi ilmiah, perlindungan kekayaan intelektual, dan hilirisasi hasil riset melalui kolaborasi dengan mitra industri dan ekosistem Triputra Group.",
    stats: [
      { value: "625+", label: "Publikasi" },
      { value: "2013+", label: "Pengabdian" },
      { value: "1689", label: "Penelitian" },
      { value: "70+", label: "Kolaborasi Penelitian" },
    ],
    research: Array.from({ length: 8 }, () => ({ title: "Judul Penelitian", meta: "Dosen Peneliti • 2025", image: "/images/kegiatan.jpg" })),
  },
  kemahasiswaan: {
    about:
      "Kemahasiswaan Universitas Pignatelli Triputra (UPITRA) adalah unit kerja/biro yang bertanggung jawab dalam memberikan pelayanan, pembinaan, dan pengembangan kesejahteraan mahasiswa di luar jalur akademik formal. Kemahasiswaan UPITRA berfungsi mengelola beasiswa, memfasilitasi legalitas dan kegiatan organisasi (BEM, HIMA, UKM), mendampingi kompetisi/prestasi mahasiswa, serta memberikan layanan bimbingan karir dan konseling.",
    tugas:
      "Bidang Kemahasiswaan UPITRA mengemban tugas pokok untuk merencanakan, melaksanakan, dan mengevaluasi program pembinaan karakter serta kesejahteraan mahasiswa di luar jalur akademik formal. Bidang ini menjalankan fungsi strategis dalam melegalisasi dan mengawasi Organisasi Mahasiswa (BEM, HIMA, UKM), memfasilitasi pengembangan minat, bakat, dan penalaran kompetisi, mengelola layanan beasiswa serta konseling, hingga mempersiapkan kesiapan karir alumni (tracer study).",
    programs: [
      {
        title: "Leadership Development",
        desc: "Program untuk mengasah jiwa kepemimpinan, karakter, dan manajerial mahasiswa, ditempa untuk berpikir kritis, berintegritas.",
        items: "Pelatihan seperti LKMM\nWorkshop Komunikasi\nForum problem solving",
      },
      {
        title: "Entrepreneurship Program",
        desc: "Wadah pembinaan untuk menumbuhkan jiwa wirausaha, kreativitas, dan kemandirian ekonomi mahasiswa.",
        items: "Penyusunan business plan\nPelatihan digital marketing\nPelatihan keuangan",
      },
      {
        title: "Career Preparation",
        desc: "Program pembinaan intensif untuk menjembatani mahasiswa tingkat akhir dan alumni muda menuju dunia kerja profesional.",
        items: "Penyusunan CV ATS-friendly\nSimulasi Wawancara\nOptimasi LinkedIn",
      },
    ],
    organisasi: [
      { name: "Badan Eksekutif Mahasiswa", image: "/images/kemahasiswaan/bem.jpg" },
      { name: "Himpunan Mahasiswa", image: "/images/kemahasiswaan/hima.jpg" },
    ],
    ukm: [
      { name: "Basket", image: "/images/kemahasiswaan/basket.jpg" },
      { name: "Badminton", image: "/images/kemahasiswaan/badminton.jpg" },
      { name: "Futsal", image: "/images/kemahasiswaan/futsal.jpg" },
      { name: "Voli", image: "/images/kemahasiswaan/voli.jpg" },
      { name: "E-Sports", image: "/images/kemahasiswaan/esports.jpg" },
      { name: "UPITRA Tech Club", image: "/images/kemahasiswaan/techclub.jpg" },
      { name: "Menari", image: "/images/kemahasiswaan/menari.jpg" },
      { name: "Paduan Suara", image: "/images/kemahasiswaan/paduan.jpg" },
    ],
    galeri: Array.from({ length: 10 }, () => ({ title: "Judul Prestasi", image: "/images/upitra-student-achiever.jpg" })),
  },
  kerjasama: {
    about:
      "Biro Kerjasama Universitas Pignatelli Triputra bertugas mengembangkan, mengelola, dan memelihara jejaring kemitraan dengan dunia usaha dan dunia industri, pemerintah, serta institusi pendidikan. Biro memfasilitasi penyusunan kesepakatan, pelaksanaan program kolaborasi, serta pengembangan peluang magang, rekrutmen, dan riset bersama untuk meningkatkan kompetensi mahasiswa dan relevansi pendidikan dengan kebutuhan industri.",
    stats: [
      { value: "109+", label: "Mitra Industri" },
      { value: "107+", label: "Kerjasama Nasional" },
      { value: "2", label: "Kerjasama Internasional" },
      { value: "109+", label: "Program Kolaborasi" },
    ],
    partners: [
      "PT Adi Sarana Armada Tbk",
      "PT Triputra Agro Persada Tbk",
      "PT Dharma Polimetal Tbk",
      "PT Kirana Megatara Tbk",
      "PT Puninar Logistics",
      "PT Daya Adicipta Mustika",
      "Bursa Efek Indonesia",
      "PT Bank Central Asia Tbk",
      "PT Bank Mandiri Tbk",
      "RS Kasih Ibu Surakarta",
    ].map((name) => ({ name, subtitle: "Mitra UPITRA", logo: "/images/logo-upitra.png" })),
    kegiatan: [
      { tag: "Education", image: "/images/kegiatan.jpg" },
      { tag: "Education", image: "/images/wisuda.jpg" },
      { tag: "Education", image: "/images/kampus-1.jpg" },
      { tag: "Awarding", image: "/images/anugerah.jpg" },
    ].map((k) => ({
      ...k,
      title: "MoU UPITRA dan SMA Marsudirini Muntilan",
      desc: "Universitas Pignatelli Triputra menandatangani nota kesepahaman dengan SMA Marsudirini Muntilan untuk memperluas kolaborasi pendidikan dan program pengembangan siswa.",
    })),
  },
  layanan: {
    sideImage: "/images/layanan-media-sosial.png",
    socials: [
      { name: "Instagram", handle: "@upitra_campus", url: "https://www.instagram.com/upitra_campus/" },
      { name: "Tiktok", handle: "@upitra_campus", url: "https://www.tiktok.com/@upitra_campus" },
      { name: "Youtube", handle: "UPITRA Official", url: "https://www.youtube.com/@upitracampus" },
      { name: "Facebook", handle: "UPITRA Campus", url: "https://www.facebook.com/upitracampus" },
      { name: "Threads", handle: "@upitra_campus", url: "https://www.threads.net/@upitra_campus" },
      { name: "Whatsapp", handle: "0811-290-7500", url: "https://wa.me/628112907500" },
    ],
  },
} satisfies Record<PageContentKey, Record<string, unknown>>;

export type PageContentMap = typeof CONTENT_DEFAULTS;

// ── Spesifikasi form editor admin ──
export const CONTENT_SPECS: Record<PageContentKey, FieldSpec[]> = {
  riset: [
    { key: "about", label: "Teks Tentang LPPM", type: "textarea" },
    { key: "stats", label: "Statistik Performa Akademik", type: "list", itemLabel: "Statistik", fields: [
      { key: "value", label: "Angka", type: "text" },
      { key: "label", label: "Keterangan", type: "text" },
    ] },
    { key: "research", label: "Penelitian Terbaru", type: "list", itemLabel: "Penelitian", fields: [
      { key: "title", label: "Judul", type: "text" },
      { key: "meta", label: "Keterangan (peneliti • tahun)", type: "text" },
      { key: "image", label: "Foto", type: "image" },
    ] },
  ],
  kemahasiswaan: [
    { key: "about", label: "Teks Tentang Kemahasiswaan", type: "textarea" },
    { key: "tugas", label: "Teks Tugas dan Fungsi", type: "textarea" },
    { key: "programs", label: "Program Pengembangan Mahasiswa", type: "list", itemLabel: "Program", fields: [
      { key: "title", label: "Judul", type: "text" },
      { key: "desc", label: "Deskripsi", type: "textarea" },
      { key: "items", label: "Butir kegiatan (satu per baris)", type: "textarea" },
    ] },
    { key: "organisasi", label: "Organisasi Mahasiswa", type: "list", itemLabel: "Organisasi", fields: [
      { key: "name", label: "Nama", type: "text" },
      { key: "image", label: "Foto", type: "image" },
    ] },
    { key: "ukm", label: "Unit Kegiatan Mahasiswa", type: "list", itemLabel: "UKM", fields: [
      { key: "name", label: "Nama", type: "text" },
      { key: "image", label: "Foto", type: "image" },
    ] },
    { key: "galeri", label: "Galeri Prestasi dan Capaian", type: "list", itemLabel: "Prestasi", fields: [
      { key: "title", label: "Judul", type: "text" },
      { key: "image", label: "Foto", type: "image" },
    ] },
  ],
  kerjasama: [
    { key: "about", label: "Teks Biro Kerjasama", type: "textarea" },
    { key: "stats", label: "Angka Mitra Kerjasama", type: "list", itemLabel: "Statistik", fields: [
      { key: "value", label: "Angka", type: "text" },
      { key: "label", label: "Keterangan", type: "text" },
    ] },
    { key: "partners", label: "Mitra Kerjasama", type: "list", itemLabel: "Mitra", fields: [
      { key: "name", label: "Nama Mitra", type: "text" },
      { key: "subtitle", label: "Keterangan", type: "text" },
      { key: "logo", label: "Logo", type: "image" },
    ] },
    { key: "kegiatan", label: "Galeri Kegiatan Kerjasama", type: "list", itemLabel: "Kegiatan", fields: [
      { key: "tag", label: "Label", type: "text" },
      { key: "title", label: "Judul", type: "text" },
      { key: "desc", label: "Ringkasan", type: "textarea" },
      { key: "image", label: "Foto", type: "image" },
    ] },
  ],
  layanan: [
    { key: "sideImage", label: "Foto Mahasiswi (seksi Media Sosial)", type: "image" },
    { key: "socials", label: "Media Sosial", type: "list", itemLabel: "Media Sosial", fields: [
      { key: "name", label: "Nama", type: "text" },
      { key: "handle", label: "Akun / Keterangan", type: "text" },
      { key: "url", label: "Tautan", type: "text" },
    ] },
  ],
};
