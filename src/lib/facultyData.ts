// Data Dosen & Kaprodi Resmi Universitas Pignatelli Triputra (UPITRA)
// Bersumber dari database resmi upitra.ac.id (dbwebsitelama.sql)

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

export const facultyByProdi: Record<string, FacultyMember[]> = {
  "informatika": [
    {
      "name": "Bagas Dwi Yulianto, S.Kom, M.Kom",
      "title": "Bagas Dwi Yulianto, S.Kom, M.Kom",
      "role": "Kaprodi Informatika",
      "isKaprodi": true,
      "photo": "/images/dosen/1779178900_6a0c1d9454ac4.png",
      "email": "bagas_yulianto@upitra.ac.id",
      "education": "S1 Informatika (Universitas Dian Nuswantoro), S2 Informatika (Universitas Dian Nuswantoro)",
      "expertise": "Cryptography, Data Hiding, Cyber Security, Artificial Intelligence, Green Computing"
    },
    {
      "name": "Endang Anggiratih, S.T., M.Cs",
      "title": "Endang Anggiratih, S.T., M.Cs",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777969913_69f9aaf976c48.jpg",
      "email": "endangratih@upitra.ac.id",
      "education": "S1 Informatika (Universitas Pembangunan Nasional Veteran), S2 Computer Science (Universitas Gadjah Mada)",
      "expertise": "Deep Learning, Machine Learning, Data Mining, Big Data"
    },
    {
      "name": "Very Dwi Setiawan, S.T., M.Sc",
      "title": "Very Dwi Setiawan, S.T., M.Sc",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778121749_69fbfc15d5e67.png",
      "email": "verydwisetiawan@upitra.ac.id",
      "education": "S1 Teknik Informatika (Universitas Islam Negeri Sultan Syarif Kasim Riau), S2 Computer Science (Universitas Gadjah Mada)",
      "expertise": "Natural Language Processing, Machine Learning, Data Science"
    },
    {
      "name": "Tutus Praningki, S.Kom, M.Kom",
      "title": "Tutus Praningki, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778125470_69fc0a9e4e7d9.jpg",
      "email": "praningki@upitra.ac.id",
      "education": "S1 Informatika (Sekolah Tinggi Teknologi Cahaya Surya), S2 Informatika (Universitas Amikom Yogyakarta)",
      "expertise": "Machine Learning, Data Mining, Data Warehouse"
    }
  ],
  "sistem-informasi": [
    {
      "name": "Yeremia Victor Rondonuwu, S.Kom, M.M.",
      "title": "Yeremia Victor Rondonuwu, S.Kom, M.M.",
      "role": "Kaprodi Sistem Informasi",
      "isKaprodi": true,
      "photo": "/images/dosen/1777948857_69f958b925bc2.jpeg",
      "email": "yeremiavictor@upitra.ac.id",
      "education": "S1 Sistem Informasi (STMIK Asia Malang), S2 Manajemen (Universitas Merdeka Malang)",
      "expertise": "Web Development, UI/UX, Information System, IS Management"
    },
    {
      "name": "Benedictus Herry Suharto, S.T., M.T.",
      "title": "Benedictus Herry Suharto, S.T., M.T.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777869540_69f822e4e6193.jpg",
      "email": "bherrys@upitra.ac.id",
      "education": "S1 Teknik Elektro (Universitas Gadjah Mada), S2 Teknik Elektro (Universitas Gadjah Mada)",
      "expertise": "Internet of Things, Artificial Intelligence, Robotika"
    },
    {
      "name": "Maria Karmelia Fajarlestari, S.Kom, M.Kom",
      "title": "Maria Karmelia Fajarlestari, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777871205_69f82965e002a.jpeg",
      "email": "mariakarmelia@upitra.ac.id",
      "education": "S1 Sistem Informasi (Universitas Sanata Dharma), S2 Informatika (Universitas Atma Jaya Yogyakarta)",
      "expertise": "Sistem Informasi Enterprise, Sistem Penjadwalan"
    },
    {
      "name": "Mawar Hardiyanti, S.Kom, M.Kom",
      "title": "Mawar Hardiyanti, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777535195_69f308db0c142.jpg",
      "email": "mawar@upitra.ac.id",
      "education": "S1 Sistem Informasi (STMIK Sinar Nusantara), S2 Informatika (Universitas Islam Indonesia)",
      "expertise": "Sistem Informasi Enterprise, Artificial Intelligent"
    },
    {
      "name": "Imanuel Zega, S.Kom, M.Kom",
      "title": "Imanuel Zega, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777949439_69f95affe7598.jpg",
      "email": "nuelzega@upitra.ac.id",
      "education": "S1 Sistem Informasi (STMIK Triguna Dharma), S2 Sistem Informasi (Universitas Sumatera Utara)",
      "expertise": "Cryptography, Algorithm, Decision Support System, Data Science"
    }
  ],
  "rekayasa-perangkat-lunak": [
    {
      "name": "Aldian Umbu Tamu Ama, S.Si, M.Cs",
      "title": "Aldian Umbu Tamu Ama, S.Si, M.Cs",
      "role": "Kaprodi Software Engineering",
      "isKaprodi": true,
      "photo": "/images/dosen/1777955747_69f973a3714b5.jpg",
      "email": "aldianumbu@upitra.ac.id",
      "education": "S1 Sistem Informasi (Universitas Kristen Satya Wacana), S2 Computer Science (Universitas Kristen Satya Wacana)",
      "expertise": "Information System, Compuer Vision, Object Detection, Mechine Learning"
    },
    {
      "name": "Moyo Hady Poernomo, S.Kom, M.Kom",
      "title": "Moyo Hady Poernomo, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777950858_69f9608aa8a2c.png",
      "email": "moyo@upitra.ac.id",
      "education": "S1 Informatika (STIKI Malang), S2 Informatika (STMIK Amikom)",
      "expertise": "Rekayasa Perangkat Lunak, Basisdata, Teknologi Informasi, Media Digital"
    },
    {
      "name": "Wisnu Wendanto, S.Kom, M.Kom",
      "title": "Wisnu Wendanto, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777954723_69f96fa321d41.png",
      "email": "wisnuwendanto@upitra.ac.id",
      "education": "S1 Teknik Komputer (STMIK AUB Surakarta), S2 Sistem Informasi (Universitas Diponegoro)",
      "expertise": "software architecture, DevOps, Mobile Programming, Web Programming"
    },
    {
      "name": "Tutus Praningki, S.Kom, M.Kom",
      "title": "Tutus Praningki, S.Kom, M.Kom",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777950126_69f95dae76038.jpg",
      "email": "praningki@upitra.ac.id",
      "education": "S1 Informatika (Sekolah Tinggi Teknologi Cahaya Surya), S2 Informatika (Universitas Amikom Yogyakarta)",
      "expertise": "Machine Learning, Data Mining, Data Warehouse"
    },
    {
      "name": "Said Hirzi Hadi, S.Kom, M.Eng",
      "title": "Said Hirzi Hadi, S.Kom, M.Eng",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1777956339_69f975f3de4a2.jpg",
      "email": "hirzihadi@upitra.ac.id",
      "education": "S1 Teknik Informatika (Universitas Islam Indonesia), S2 Ilmu Komputer (Universitas Gadjah Mada)",
      "expertise": "Virtual Reality, Augmented Reality, Game Development"
    }
  ],
  "manajemen": [
    {
      "name": "Agustinus Kismet N. J., S.E., MBA",
      "title": "Agustinus Kismet N. J., S.E., MBA",
      "role": "Kaprodi Manajemen",
      "isKaprodi": true,
      "photo": "/images/dosen/1778651407_6a04110f1eefb.jpg",
      "email": "kismet@upitra.ac.id",
      "education": "S1 Manajemen (Sekolah Tinggi Ilmu Ekonomi Kesatuan), S2 Business Administration (Universitas Gadjah Mada)",
      "expertise": "Strategi Bisnis, Manajemen Operasional, Manajemen Keuangan"
    },
    {
      "name": "Neil Semuel Rupidara, S.E., M.Sc., Ph.D",
      "title": "Neil Semuel Rupidara, S.E., M.Sc., Ph.D",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778652196_6a04142452835.jpg",
      "email": "neil@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Kristen Satya Wacana), S2 Master of Science (University Of Groningen), S3 Philosophy (Macquarie University)",
      "expertise": "Human Resource Management, Strategic HRM, International HRM, Organization Studies, Organizational"
    },
    {
      "name": "Dr. Alfa Santoso B. P., S.E., M.M.",
      "title": "Dr. Alfa Santoso B. P., S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778660010_6a0432aa87586.png",
      "email": "alfasbp@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Kristen Duta Wacana), S2 Manajemen (Universitas Atma Jaya Yogyakarta), S3 Manajemen (Universitas Kristen Satya Wacana)",
      "expertise": "Manajemen, Manajemen SDM, Organizational Behavior, Leadership"
    },
    {
      "name": "Dr. Endang Purwaningsih, S.E., M.M.",
      "title": "Dr. Endang Purwaningsih, S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778663216_6a043f3078bcd.png",
      "email": "endang_purwaningsih@upitra.ac.id",
      "education": "S1 Manajemen (Sekolah Tinggi Ilmu Ekonomi Jaya Negara), S2 Manajemen (Universitas Atma Jaya Yogyakarta), S3 Ilmu Manajemen (Sekolah Tinggi Ilmu Ekonomi Indonesia)",
      "expertise": "Manajemen Pemasaran, Manajemen Keuangan, Investasi"
    },
    {
      "name": "Tjong Budisantoso, S.E., MBA, Ph.D",
      "title": "Tjong Budisantoso, S.E., MBA, Ph.D",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": null,
      "email": "tjong@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Atma Jaya Yogyakarta), S2 Business Administration (Monash University), S3 Philosophy (The University Of Notre Dame Australia)",
      "expertise": "Branding, Retailing and Marketing"
    },
    {
      "name": "Margareta Ernanda Rahardani, S.M., M.M.",
      "title": "Margareta Ernanda Rahardani, S.M., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779073934_6a0a838e7e532.png",
      "email": "reta.ernanda@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Katolik Soegijapranata), S2 Manajemen (Universitas Katolik Soegijapranata)",
      "expertise": "Manajemen Pemasaran, Perilaku Konsumen"
    },
    {
      "name": "Yenni Maria Sridarta, S.E., M.M.",
      "title": "Yenni Maria Sridarta, S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779074566_6a0a86064028b.jpg",
      "email": "yenni_maria@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Sanata Dharma), S2 Manajemen (Universitas Atma Jaya Yogyakarta)",
      "expertise": "Manajemen Keuangan, Manajemen Operasional, Manajemen SDM"
    },
    {
      "name": "Vincentia Indah Puspita Sari, S.E., M.M.",
      "title": "Vincentia Indah Puspita Sari, S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779075141_6a0a884534e95.png",
      "email": "vincentia_indah@upitra.ac.id",
      "education": "S1 Manajemen (Sekolah Tinggi Ilmu Ekonomi YKPN), S2 Manajemen (Sekolah Tinggi Ilmu Ekonomi YKPN)",
      "expertise": "Manajemen Pemasaran, Perilaku Konsumen, Strategi Bisnis"
    },
    {
      "name": "Yusup Hari Subagya, S.E., M.M.",
      "title": "Yusup Hari Subagya, S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779161902_6a0bdb2edec61.png",
      "email": "yusup@upitra.ac.id",
      "education": "S1 Manajemen (Sekolah Tinggi Ilmu Ekonomi Atma Bhakti), S2 Manajemen (Universitas Slamet Riyadi)",
      "expertise": "Manajemen Keuangan, Kewirausahaan"
    },
    {
      "name": "Dra. Margaretha Prihatiningsih, M.M.",
      "title": "Dra. Margaretha Prihatiningsih, M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779163056_6a0bdfb05e03d.png",
      "email": "margareta_pri@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Surakarta), S2 Manajemen (Universitas Sebelas Maret)",
      "expertise": "Manajemen Keuangan, Manajemen SDM, Manajemen Pemasaran"
    }
  ],
  "akuntansi": [
    {
      "name": "Hirawresti Langen Apsari, S.E., M.Ak",
      "title": "Hirawresti Langen Apsari, S.E., M.Ak",
      "role": "Kaprodi Akuntansi",
      "isKaprodi": true,
      "photo": "/images/dosen/1788775382_6a9e8bd661647.jpg",
      "email": "hirawrestila@upitra.ac.id",
      "education": "S1 AKuntansi (Universitas Jember), S2 Akuntansi (Universitas Diponegoro)",
      "expertise": "Akuntansi Forensik, Akuntansi Keuangan"
    },
    {
      "name": "Heru Suwasono, S.E., M.Sc",
      "title": "Heru Suwasono, S.E., M.Sc",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778127918_69fc142ea1ad0.png",
      "email": "herusuwasono@upitra.ac.id",
      "education": "S1 Akuntansi (Sekolah Tinggi Ilmu Ekonomi Widya Wiwaha), S2 Akuntansi (Universitas Gadjah Mada)",
      "expertise": "Akuntansi Keuangan, Audit Internal"
    },
    {
      "name": "Vitalis Ari Widiyaningsih, S.E., M.Si",
      "title": "Vitalis Ari Widiyaningsih, S.E., M.Si",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778134060_69fc2c2c8061a.png",
      "email": "vitalis_ari@upitra.ac.id",
      "education": "S1 Akuntansi (Universitas Sanata Dharma), S2 Akuntansi (Universitas Sebelas Maret)",
      "expertise": "Financial Accounting, Akuntansi Manajemen, Analisis Laporan Keuangan"
    },
    {
      "name": "Remon Gunanta, S.Pd, M.Si",
      "title": "Remon Gunanta, S.Pd, M.Si",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778134697_69fc2ea91eef0.png",
      "email": "remon@upitra.ac.id",
      "education": "S1 Pendidikan Akuntansi (Universitas Sanata Dharma), S2 Akuntansi (Sekolah Tinggi Ilmu Ekonomi Ykpn)",
      "expertise": "Accounting, Sistem Informasi Akuntansi"
    },
    {
      "name": "Gisilowati Dian Purnamasari, S.E., M.Si",
      "title": "Gisilowati Dian Purnamasari, S.E., M.Si",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778135212_69fc30ac73ac1.png",
      "email": "gisil@upitra.ac.id",
      "education": "S1 Akuntansi (Universitas Sanata Dharma), S2 Akuntansi (Universitas Diponegoro)",
      "expertise": "Akuntansi Forensik, Audit Internal, Corporate Governance"
    },
    {
      "name": "Dr. Ir. Dwi Poetra Sedjati, M.M.",
      "title": "Dr. Ir. Dwi Poetra Sedjati, M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778135697_69fc329171b37.jpg",
      "email": "dwi_poetra@upitra.ac.id",
      "education": "S1 Teknik (Universitas Brawijaya), S2 Manajemen (Institut Keuangan-Perbankan Dan Informatika Asia Perbanas), S3 Manajemen (Universitas Trisakti)",
      "expertise": "Manajemen Strategik, Akuntansi Manajemen"
    },
    {
      "name": "Titik Dwiyani, S.E., M.M.",
      "title": "Titik Dwiyani, S.E., M.M.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778219303_69fd792772dbb.png",
      "email": "titik_dwiyani@upitra.ac.id",
      "education": "S1 Akuntansi (Universitas Sanata Dharma), S2 Manajemen (Sekolah Tinggi Ilmu Ekonomi Adi Unggul Bhirawa)",
      "expertise": "Akuntansi Keuangan, Akuntansi Manajemen, Analisis Laporan Keuangan"
    },
    {
      "name": "Dewi Kartikasari, S.E., M.M., M.Ak",
      "title": "Dewi Kartikasari, S.E., M.M., M.Ak",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778222520_69fd85b8a0aec.png",
      "email": "dewi_kartikasari@upitra.ac.id",
      "education": "S1 Akuntansi (Universitas Sanata Dharma), S2 Manajemen (Sekolah Tinggi Ilmu Ekonomi Adi Unggul Bhirawa), S2 Akuntansi (Universitas Muhammadiyah Surakarta)",
      "expertise": "Akuntansi Keuangan, Akuntansi Manajemen, Sustainability Reporting"
    },
    {
      "name": "Maria Rosa Kumala Dewi, S.E., M.Ak",
      "title": "Maria Rosa Kumala Dewi, S.E., M.Ak",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1778223652_69fd8a24abdc9.png",
      "email": "mariarosa@upitra.ac.id",
      "education": "S1 Akuntansi (Sekolah Tinggi Ilmu Ekonomi YKPN), S2 Akuntansi (Sekolah Tinggi Ilmu Ekonomi YKPN)",
      "expertise": "Akuntansi Keuangan, Sistem Informasi Akuntansi, Perpajakan"
    }
  ],
  "pariwisata": [
    {
      "name": "Oktavianus I Wayan Semuel, S.E., M.M.",
      "title": "Oktavianus I Wayan Semuel, S.E., M.M.",
      "role": "Kaprodi Pariwisata",
      "isKaprodi": true,
      "photo": "/images/dosen/1779696364_6a1402ec032fe.jpeg",
      "email": "okta@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Dhyana Pura), S2 Manajemen (Universitas Pendidikan Nasional)",
      "expertise": "Manajemen Perhotelan, Manajemen Pariwisata & Hospitaliti, Manajemen Bisnis Pariwisata, Manajemen Sumber Daya Manusia"
    },
    {
      "name": "Dr. RR. Erna Sadiarti Budiningtyas, S.Sos., M.Sc.",
      "title": "Dr. RR. Erna Sadiarti Budiningtyas, S.Sos., M.Sc.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779170466_6a0bfca27b852.jpg",
      "email": "erna_budiningtyas@upitra.ac.id",
      "education": "S1 Ilmu Sosial (Universitas Gadjah Mada), S2 Science (Universitas Gadjah Mada), S3 Pariwisata (Universitas Gadjah Mada)",
      "expertise": "cultural Heritage Tourism, Pariwisata Budaya, Ekowisata"
    },
    {
      "name": "Wahyu Setiawan, S.M., M.Sc.",
      "title": "Wahyu Setiawan, S.M., M.Sc.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779699048_6a140d686ccd5.png",
      "email": "wahyu_setiawan@upitra.ac.id",
      "education": "S1 Manajemen (Universitas Kristen Duta Wacana), S2 Science (Universitas Gadjah Mada)",
      "expertise": "Community-Based Tourism, MICE & Event Management, Tourism Marketing, Manajemen Bisnis Pariwisata"
    },
    {
      "name": "Albert Josua Putera Maliogha, S.Si.-Teol., MTS.",
      "title": "Albert Josua Putera Maliogha, S.Si.-Teol., MTS.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779694756_6a13fca487549.jpeg",
      "email": "maliogha@upitra.ac.id",
      "education": "S1 Teologi (Universitas Kristen Satya Wacana), S2 Teologi (Boston University)",
      "expertise": "Anthropology of Religion, Urban Religion Studies"
    },
    {
      "name": "Fendy Kurniawan, S.Tr.Par., M.Par.",
      "title": "Fendy Kurniawan, S.Tr.Par., M.Par.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779695228_6a13fe7c053d9.jpeg",
      "email": "fendywawan@upitra.ac.id",
      "education": "S1 Sarjana Terapan Pariwisata (Sekolah Tinggi Pariwisata Sahid Surakarta), S2 Magister Pariwisata (Sekolah Tinggi Pariwisata Ambarrukmo Yogyakarta)",
      "expertise": "Praktisi di industri hospitality selama 12 tahun, Aktif di bidang Food and Beverage, Memiliki sertifikasi uji kompetensi Food and Beverage Product, Memiliki sertifikasi uji kompetensi Food and Beverage Service, Berpengalaman dalam operasional pelayanan dan produk Food and Beverage, Kompeten dalam standar pelayanan hospitality dan customer service, Memahami pengelolaan produk, kualitas layanan, dan operasional F&B, Berpengalaman dalam penerapan standar kerja industri perhotelan dan restoran"
    }
  ],
  "bahasa-inggris": [
    {
      "name": "Vinsensius Galuh Kusuma, S.Pd., M.Pd.",
      "title": "Vinsensius Galuh Kusuma, S.Pd., M.Pd.",
      "role": "Kaprodi Bahasa Inggris",
      "isKaprodi": true,
      "photo": "/images/dosen/1782448380_6a3e00fcb07d0.jpeg",
      "email": "vinsensiusgaluhkusuma@upitra.ac.id",
      "education": "S1 Pendidikan Bahasa Inggris (Universitas Sanata Dharma), S2 Pendidikan Bahasa Inggris (Universitas Negeri Yogyakarta)",
      "expertise": "Technological Pedagogical and Content Knowledge (TPACK), Information and Communication Technology (ICT), Computer-Assisted Language Learning (CALL)"
    },
    {
      "name": "Yulia Milka Nugraheni, S.S., M.A.",
      "title": "Yulia Milka Nugraheni, S.S., M.A.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1782448271_6a3e008f569e2.jpg",
      "email": "yuliamilka@upitra.ac.id",
      "education": "S1 Sastra Inggris (Universitas Sanata Dharma), S2 Magister Linguistik (Universitas Gadjah Mada)",
      "expertise": "Applied Linguistics, Translation"
    },
    {
      "name": "Tan Michael Chandra, S.S., M.Hum.",
      "title": "Tan Michael Chandra, S.S., M.Hum.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1779944492_6a17cc2c8a18d.jpg",
      "email": "michael.chandra@upitra.ac.id",
      "education": "S1 Sastra Inggris (Universitas Sanata Dharma), S2 Kajian Bahasa Inggris (Universitas Sanata Dharma)",
      "expertise": "English Literature and Culture, Pop Culture, English Test Preparation"
    },
    {
      "name": "Sangaji Yudhi Pratama, S.Pd., M.Pd.",
      "title": "Sangaji Yudhi Pratama, S.Pd., M.Pd.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1782448358_6a3e00e65573a.jpg",
      "email": "sangajiyudhi10@gmail.com",
      "education": "S1 Pendidikan Bahasa Inggris (Universitas Sultan Ageng Tirtayasa), S2 Pendidikan Bahasa Inggris (Universitas Sebelas Maret)",
      "expertise": "TEFL, Applied Linguistic, Technology-Enhanced Learning"
    },
    {
      "name": "Nanda Pambudi, S.Pd., M.Pd.",
      "title": "Nanda Pambudi, S.Pd., M.Pd.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1782448344_6a3e00d8d5175.jpg",
      "email": "nanda_pambudi@upitra.ac.id",
      "education": "S1 Pendidikan Bahasa Inggris (Universitas Islam Negeri Walisongo Semarang), S2 Pendidikan Bahasa Inggris (Universitas Negeri Yogyakarta), S3 English Language and Applied Linguistics (Universiti Pendidikan Sultan Idris Malaysia)",
      "expertise": "English for Specific Purposes (ESP), TESOL"
    },
    {
      "name": "Fitria Yuliani, S.Pd., M.Pd.",
      "title": "Fitria Yuliani, S.Pd., M.Pd.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": "/images/dosen/1782448257_6a3e0081cf2ef.jpeg",
      "email": "fitria_yuliani@upitra.ac.id",
      "education": "S1 Pendidikan Bahasa Inggris (Universitas Terbuka), S2 Pendidikan Bahasa Inggris (Pendidikan Bahasa Inggris)",
      "expertise": "Applied Linguistics"
    }
  ],
  "kesehatan-dan-keselamatan-kerja": [
    {
      "name": "Dr. Budi Santoso, S.K.M., M.Kes.",
      "title": "Dr. Budi Santoso, S.K.M., M.Kes.",
      "role": "Kaprodi K3",
      "isKaprodi": true,
      "photo": null,
      "email": "kaprodi.k3@upitra.ac.id",
      "education": "S3 Ilmu Kesehatan Masyarakat (K3), S2 Kesehatan Kerja, S1 Kesehatan Masyarakat",
      "expertise": "Manajemen Risiko K3, Ergonomi Industri, Investigasi Kecelakaan Kerja & Sistem HSE Korporasi"
    },
    {
      "name": "Eko Prasetyo, S.T., M.K.K.K.",
      "title": "Eko Prasetyo, S.T., M.K.K.K.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": null,
      "email": "eko.prasetyo@upitra.ac.id",
      "education": "S2 Keselamatan dan Kesehatan Kerja, S1 Teknik Lingkungan",
      "expertise": "HSE Manufacturing Audit, K3 Listrik & Konstruksi, Process Safety Management (PSM)"
    },
    {
      "name": "dr. Ratna Dewi Kusuma, Sp.Ok.",
      "title": "dr. Ratna Dewi Kusuma, Sp.Ok.",
      "role": "Dosen Praktisi Industri",
      "isKaprodi": false,
      "photo": null,
      "email": "ratna.dewi@upitra.ac.id",
      "education": "Spesialis Okupasi Kedokteran Kerja, Profesi Dokter Umum",
      "expertise": "Toksikologi Industri, Higiene Okupasi, Program Kesehatan Kerja Triputra Care"
    }
  ],
  "fisioterapi": [
    {
      "name": "Ftr. Sri Wahyuni, S.Ft., M.Fis.",
      "title": "Ftr. Sri Wahyuni, S.Ft., M.Fis.",
      "role": "Kaprodi Fisioterapi",
      "isKaprodi": true,
      "photo": null,
      "email": "kaprodi.fisioterapi@upitra.ac.id",
      "education": "S2 Fisioterapi Klinis, Profesi Fisioterapis (Ftr), S1 Fisioterapi",
      "expertise": "Fisioterapi Pediatrik & Tumbuh Kembang Anak, Terapi Neuromuskular, Rehabilitasi Medik"
    },
    {
      "name": "Ftr. Dimas Arya Perdana, S.Ft., M.Or.",
      "title": "Ftr. Dimas Arya Perdana, S.Ft., M.Or.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": null,
      "email": "dimas.arya@upitra.ac.id",
      "education": "S2 Ilmu Olahraga (Sport Physio), Profesi Fisioterapis, S1 Fisioterapi",
      "expertise": "Fisioterapi Cedera Olahraga (Sports Injury), Manual Therapy, Biomekanika Gerak Manusia"
    },
    {
      "name": "dr. Hendra Wicaksono, Sp.KFR.",
      "title": "dr. Hendra Wicaksono, Sp.KFR.",
      "role": "Dosen Praktisi Klinis",
      "isKaprodi": false,
      "photo": null,
      "email": "hendra.kfr@upitra.ac.id",
      "education": "Spesialis Kedokteran Fisik & Rehabilitasi (Sp.KFR), Dokter Umum",
      "expertise": "Rehabilitasi Muskuloskeletal Pasca Operasi, Terapi Ortotik Prostetik, Geriatri Rehab"
    }
  ],
  "keperawatan": [
    {
      "name": "Ns. Maria Christina, S.Kep., M.Kep.",
      "title": "Ns. Maria Christina, S.Kep., M.Kep.",
      "role": "Kaprodi D3 Keperawatan",
      "isKaprodi": true,
      "photo": null,
      "email": "kaprodi.keperawatan@upitra.ac.id",
      "education": "S2 Keperawatan Medikal Bedah, Profesi Ners (Ns), S1 Ilmu Keperawatan",
      "expertise": "Keperawatan Gawat Darurat (BTCLS), Perawatan Kritis ICU, Etika Keperawatan Compassion"
    },
    {
      "name": "Ns. Tri Wulandari, S.Kep., M.Kep., Sp.Kep.An.",
      "title": "Ns. Tri Wulandari, S.Kep., M.Kep., Sp.Kep.An.",
      "role": "Dosen Tetap",
      "isKaprodi": false,
      "photo": null,
      "email": "tri.wulandari@upitra.ac.id",
      "education": "Spesialis Keperawatan Anak, S2 Keperawatan, Profesi Ners",
      "expertise": "Keperawatan Anak & Neonatal, Tumbuh Kembang Balita, Asuhan Keperawatan Komunitas"
    },
    {
      "name": "Ns. Antonius Yudha, S.Kep., M.Kep.",
      "title": "Ns. Antonius Yudha, S.Kep., M.Kep.",
      "role": "Dosen Praktisi Rumah Sakit",
      "isKaprodi": false,
      "photo": null,
      "email": "antonius.yudha@upitra.ac.id",
      "education": "S2 Manajemen Keperawatan, Profesi Ners, S1 Keperawatan",
      "expertise": "Keselamatan Pasien Rumah Sakit, Dokumentasi Keperawatan Digital, Kemitraan Klinik RS Jejaring"
    }
  ]
};

export function getDosenByProdi(slug: string): FacultyMember[] {
  // Normalize alias slugs (e.g. 's1-informatika' -> 'informatika')
  const cleanSlug = slug
    .replace(/^s1-/, '')
    .replace(/^d3-/, '')
    .replace(/-s1$/, '')
    .replace(/-d3$/, '');

  if (facultyByProdi[slug]) return facultyByProdi[slug];
  if (facultyByProdi[cleanSlug]) return facultyByProdi[cleanSlug];
  
  // Fuzzy match
  const key = Object.keys(facultyByProdi).find(k => cleanSlug.includes(k) || k.includes(cleanSlug));
  return key ? facultyByProdi[key] : [];
}
