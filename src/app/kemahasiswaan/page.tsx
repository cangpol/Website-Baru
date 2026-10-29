"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import KemahasiswaanSubnav, { KemahasiswaanTabKey } from "@/components/KemahasiswaanSubnav";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Target, 
  Sparkles, 
  Trophy, 
  Camera, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2,
  Award,
  BookOpen,
  Clock,
  Compass
} from "lucide-react";
import { initialAdminKemahasiswaanBanner, AdminKemahasiswaanBanner } from "@/lib/adminDataStore";

// ── 1. Data About Kemahasiswaan (Tupoksi) ──
const tupoksiList = [
  {
    no: "01",
    bidang: "Pembinaan Karakter & Spiritualitas Ignasian",
    tugas: "Menyelenggarakan program inkubasi nilai kepemimpinan Triputra DNA (Integritas, Etika, Belarasa, Keunggulan), pendampingan retret/rekoleksi karakter, dan penanaman budaya saling menghormati di kampus.",
  },
  {
    no: "02",
    bidang: "Penalaran, Keilmuan & Kreativitas Mahasiswa",
    tugas: "Mendorong keikutsertaan mahasiswa dalam Program Kreativitas Mahasiswa (PKM) Kemendiktisaintek, lomba inovasi teknologi, kompetisi debat bahasa Inggris, dan seleksi Mahasiswa Berprestasi (Mawapres).",
  },
  {
    no: "03",
    bidang: "Pembinaan Minat, Bakat, Seni & Olahraga",
    tugas: "Memfasilitasi pembinaan dan sarana aktivitas seluruh Unit Kegiatan Mahasiswa (UKM), menyelenggarakan kejuaraan rektor cup, serta memfasilitasi delegasi lomba di tingkat regional dan nasional.",
  },
  {
    no: "04",
    bidang: "Kesejahteraan Mahasiswa & Layanan Beasiswa",
    tugas: "Mengelola seleksi dan distribusi Beasiswa Penuh Triputra Peduli 100%, beasiswa prestasi akademik/non-akademik, serta menyediakan layanan konseling bimbingan psikologis gratis bagi mahasiswa.",
  },
  {
    no: "05",
    bidang: "Pengembangan Karir & Organisasi Kemahasiswaan (Ormawa)",
    tugas: "Mendampingi tata kelola BEM, DPM, dan Himpunan Mahasiswa Jurusan (HMPS) agar demokratis, transparan, berorientasi layanan, serta menyinergikan program persiapan karir bersama Triputra Career Center.",
  },
];

// ── 2. Data Program Pengembangan ──
const programList = [
  {
    title: "Triputra Leadership Camp (TLC)",
    kategori: "Kepemimpinan & Karakter",
    desc: "Program pelatihan kepemimpinan intensif selama 3 hari di alam terbuka yang dirancang khusus bersama tim Talent Management Triputra Group untuk mengasah ketangguhan mental, integritas, dan kerjasama tim.",
    manfaat: ["Internalisasi Triputra DNA", "Sertifikat Eksekutif Leadership", "Prioritas Seleksi Magang Triputra"],
  },
  {
    title: "Latihan Keterampilan Manajemen Mahasiswa (LKMM)",
    kategori: "Manajemen Organisasi",
    desc: "Pelatihan berjenjang (Tingkat Pra-Dasar hingga Tingkat Menengah) yang membekali pengurus ormawa kemampuan merumuskan visi kerja, tata kelola keuangan organisasi, manajemen konflik, dan evaluasi program.",
    manfaat: ["Keahlian Manajemen Proyek", "Sertifikasi Kepengurusan Ormawa", "Portofolio SKPI Resmi"],
  },
  {
    title: "Inkubasi Program Kreativitas Mahasiswa (PKM)",
    kategori: "Penalaran & Riset",
    desc: "Bootcamp bimbingan penulisan proposal PKM 8 bidang (Riset, Karsa Cipta, Kewirausahaan, Pengabdian Masyarakat, dll.) bersama dosen pendamping bereputasi nasional hingga lolos PIMNAS.",
    manfaat: ["Hibah Pendanaan Kemendikbud", "Rekognisi Konversi SKS Kuliah", "Pendampingan Paten HKI"],
  },
  {
    title: "Sertifikasi Kompetensi Profesi Industri",
    kategori: "Kesiapan Karir",
    desc: "Fasilitasi ujian sertifikasi kompetensi berstandar BNSP, Microsoft Certified Educator/Developer, Cisco CCNA, SAP ERP Financials, dan Brevet Pajak A & B bagi mahasiswa tingkat akhir.",
    manfaat: ["Sertifikat Lisensi Resmi BNSP", "Daya Saing Tinggi di Pasar Kerja", "Tertera dalam Surat Keterangan Pendamping Ijazah (SKPI)"],
  },
  {
    title: "Aksi Belarasa Peduli Sesama (Community Empowerment)",
    kategori: "Spiritualitas & Sosial",
    desc: "Kegiatan nyata terjun ke masyarakat untuk mendampingi pelaku UMKM, pelatihan melek digital bagi anak panti asuhan, dan bakti lingkungan hidup di wilayah Surakarta dan sekitarnya.",
    manfaat: ["Peningkatan Empati Sosial", "Pengalaman Lapangan Nyata", "Penanaman Nilai Kasih Ignasian"],
  },
];

// ── 3. Data Organisasi Mahasiswa ──
const lembagaUtama = [
  {
    nama: "Dewan Perwakilan Mahasiswa (DPM)",
    singkatan: "DPM UPITRA",
    peran: "Lembaga Legislatif & Pengawasan",
    desc: "Memegang kedaulatan aspirasi mahasiswa, mengesahkan anggaran organisasi kemahasiswaan, dan mengawasi implementasi program kerja kabinet eksekutif mahasiswa.",
  },
  {
    nama: "Badan Eksekutif Mahasiswa (BEM)",
    singkatan: "BEM UPITRA",
    peran: "Lembaga Eksekutif Tertinggi Mahasiswa",
    desc: "Menjalankan roda kepemimpinan eksekutif mahasiswa, menginisiasi gerakan sosial kemasyarakatan, advokasi kesejahteraan mahasiswa, dan event festival kampus tahunan.",
  },
];

const hmpsList = [
  { nama: "HIMATIF", prodi: "Himpunan Mahasiswa Informatika", fakultas: "FST" },
  { nama: "HIMASI", prodi: "Himpunan Mahasiswa Sistem Informasi", fakultas: "FST" },
  { nama: "HIMARPL", prodi: "Himpunan Mahasiswa Rekayasa Perangkat Lunak", fakultas: "FST" },
  { nama: "HIMAMA", prodi: "Himpunan Mahasiswa Manajemen", fakultas: "FEB" },
  { nama: "HIMAKSI", prodi: "Himpunan Mahasiswa Akuntansi", fakultas: "FEB" },
  { nama: "HIMAPAR", prodi: "Himpunan Mahasiswa Pariwisata", fakultas: "FSH" },
  { nama: "ESA", prodi: "English Students Association", fakultas: "FSH" },
  { nama: "HIMA K3", prodi: "Himpunan Mahasiswa Keselamatan & Kesehatan Kerja", fakultas: "FKes" },
  { nama: "HIMA FISIO", prodi: "Himpunan Mahasiswa Fisioterapi", fakultas: "FKes" },
  { nama: "HIMA KEP", prodi: "Himpunan Mahasiswa Keperawatan", fakultas: "FKes" },
];

const ukmList = [
  {
    nama: "UKM Olahraga Terpadu (Futsal, Basket, Badminton)",
    kategori: "Olahraga & Kebugaran",
    desc: "Wadah pengembangan bakat atletik mahasiswa, latihan rutin mingguan, dan partisipasi dalam kejuaraan antar universitas se-Jawa Tengah.",
  },
  {
    nama: "Paduan Suara Mahasiswa (PSM Gita Pignatelli)",
    kategori: "Seni Suara & Vokal",
    desc: "Grup paduan suara resmi universitas yang bertugas dalam upacara wisuda, dies natalis, serta kompetisi paduan suara nasional.",
  },
  {
    nama: "UKM Musik & Akustik Kampus",
    kategori: "Seni Musik & Kreativitas",
    desc: "Komunitas musisi kampus, pembinaan band mahasiswa, pelatihan instrumen musik, dan pengisi panggung apresiasi seni.",
  },
  {
    nama: "Robotics, IoT & Developer Student Club",
    kategori: "Sains & Teknologi Terapan",
    desc: "Klub riset terapan mikrokontroler Arduino/ESP32, autonomous robot, dan kompetisi hackathon teknologi.",
  },
  {
    nama: "Mahasiswa Pecinta Alam (MAPALA Pignatelli)",
    kategori: "Petualangan & Konservasi Alam",
    desc: "Eksplorasi pendakian gunung, susur gua (caving), konservasi hutan lindung, dan tanggap darurat bencana alam relawan kampus.",
  },
  {
    nama: "Kerohanian & Pelayanan Kasih Ignasian",
    kategori: "Spiritualitas & Sosial",
    desc: "Pembinaan rohani, doa bersama, retret tahunan, dan pelayanan bakti kasih sosial ke panti werdha dan anak asuh.",
  },
];

// ── 4. Data Prestasi Mahasiswa ──
const prestasiList = [
  {
    tahun: "2026",
    kategori: "Teknologi & AI",
    juara: "Juara 1 Tingkat Nasional",
    kejuaraan: "National Agri-Tech & Smart Farming Hackathon 2026",
    penyelenggara: "Kementerian Pertanian RI & Konsorsium Perguruan Tinggi",
    tim: "Bagas Satria & Tim (S1 Informatika & Sistem Informasi)",
    deskripsi: "Menciptakan prototipe sensorik tanah cerdas terkoneksi cloud untuk efisiensi pemupukan kelapa sawit di unit bisnis Triputra Agro Persada.",
  },
  {
    tahun: "2026",
    kategori: "Bisnis & Manajemen",
    juara: "Juara 2 & Best Presentation",
    kejuaraan: "National Corporate Case Competition Triputra Youth Summit",
    penyelenggara: "Triputra Group Talent Management Jakarta",
    tim: "Anisa Rahmawati & Tim (S1 Manajemen)",
    deskripsi: "Solusi optimalisasi rute distribusi logistik ramah lingkungan berbasis algoritma routing pintar di PT Adi Sarana Armada Tbk.",
  },
  {
    tahun: "2026",
    kategori: "Kesehatan & K3",
    juara: "Juara 1 Kategori Riset Terapan",
    kejuaraan: "Kompetisi Nasional Inovasi K3 Industri Manufaktur 2026",
    penyelenggara: "Dewan K3 Nasional (DK3N)",
    tim: "Rizky Pratama & Tim (S1 Keselamatan & Kesehatan Kerja)",
    deskripsi: "Aplikasi penilaian postur kerja otomatis menggunakan Computer Vision untuk menurunkan angka insiden Low Back Pain di pabrik otomotif.",
  },
  {
    tahun: "2026",
    kategori: "Bahasa & Debat",
    juara: "Juara 3 & Overall Best Speaker",
    kejuaraan: "Central Java University English Debating Championship",
    penyelenggara: "LLDIKTI Wilayah VI Jawa Tengah",
    tim: "Maria Jessica (S1 Bahasa Inggris)",
    deskripsi: "Membahas mosi regulasi kecerdasan buatan, etika data global, dan diplomasi ketahanan pangan negara berkembang.",
  },
  {
    tahun: "2025",
    kategori: "Pariwisata & Hospitality",
    juara: "Gold Medal Table Setting & Tourism Video",
    kejuaraan: "National Hospitality Skills Competition 2025",
    penyelenggara: "Asosiasi Pendidikan Tinggi Pariwisata Indonesia (HILDIKTIPARI)",
    tim: "Tim S1 Pariwisata UPITRA",
    deskripsi: "Peragaan standar tata hidang bintang lima berpadu unsur kearifan kuliner tradisional keraton Surakarta.",
  },
];

// ── 5. Data Kegiatan Mahasiswa ──
const galeriKegiatan = [
  {
    judul: "Pengenalan Kehidupan Kampus Mahasiswa Baru (P2K2)",
    kategori: "Inisiasi Mahasiswa",
    tanggal: "September 2026",
    lokasi: "Auditorium & Lapangan Kampus UPITRA Solo",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-blue-900 to-[#06172e]",
    deskripsi: "Penyambutan mahasiswa baru bernuansa edukatif tanpa perpeloncoan, berfokus pada pengenalan nilai Triputra DNA dan orientasi akademik modern.",
  },
  {
    judul: "Triputra Leadership Camp (TLC) Mahasiswa Berprestasi",
    kategori: "Kepemimpinan",
    tanggal: "Oktober 2026",
    lokasi: "Kawasan Lereng Gunung Lawu, Karanganyar",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-[#0b2545] to-blue-900",
    deskripsi: "Pelatihan pembentukan mental kepemimpinan tangguh, simulasi pemecahan masalah tim industri, dan malam keakraban api unggun.",
  },
  {
    judul: "UPITRA Innovation & Technopreneurship Expo 2026",
    kategori: "Pameran & Inovasi",
    tanggal: "Agustus 2026",
    lokasi: "Hall Utama Gedung Santo Ignatius",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-blue-950 to-blue-800",
    deskripsi: "Pameran prototipe aplikasi cerdas, karya inovasi produk pariwisata, klinik fisioterapi gratis, dan demo keselamatan kerja K3.",
  },
  {
    judul: "Bakti Sosial Belarasa Peduli Lingkungan & Masyarakat",
    kategori: "Sosial & Spiritualitas",
    tanggal: "Juli 2026",
    lokasi: "Kecamatan Laweyan, Surakarta",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-[#092244] to-blue-950",
    deskripsi: "Aksi kemanusiaan pembagian sembako, penyuluhan kesehatan ergonomis bagi perajin batik Solo, dan penanaman pohon penghijauan.",
  },
  {
    judul: "Rektor Cup Tournament & Pentas Seni Mahasiswa",
    kategori: "Olahraga & Seni",
    tanggal: "Juni 2026",
    lokasi: "Sport Hall & Gelanggang Terbuka UPITRA",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-blue-900 to-[#0b2b54]",
    deskripsi: "Ajang unjuk ketangkasan olahraga futsal, bola basket, badminton antar fakultas, ditutup panggung pertunjukan musik akustik kampus.",
  },
  {
    judul: "Kuliah Umum & Executive Sharing Bersama Triputra Group",
    kategori: "Wawasan Industri",
    tanggal: "Mei 2026",
    lokasi: "Smart Auditorium UPITRA",
    gambar: "/images/kegiatan.jpg",
    fallbackBg: "from-[#06172e] to-blue-900",
    deskripsi: "Sesi kuliah perdana bersama jajaran direksi Triputra Group tentang prospek karir masa depan dan nilai integritas korporasi.",
  },
];

export default function KemahasiswaanIndexPage() {
  const [banner, setBanner] = useState<AdminKemahasiswaanBanner>(initialAdminKemahasiswaanBanner);
  const [activeTab, setActiveTab] = useState<KemahasiswaanTabKey>("about");

  // Load dynamic banner from localStorage (editable via Admin if configured)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_kemahasiswaan");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER KEMAHASISWAAN (Full Width 1440px x 480px, Identik dengan /riset & /akademik) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/kegiatan.jpg"}
          alt={banner.title}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Executive Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/60 to-[#06172e]/30 flex flex-col justify-center text-white">
          <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            {/* Center Rata Kiri Content: Title & Description */}
            <div className="space-y-3 sm:space-y-4 max-w-4xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {banner.title || "Kemahasiswaan"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "Membina mahasiswa berkarakter luhur, berjiwa pemimpin berbelarasa, dan berprestasi tinggi di kancah nasional bersama ekosistem Triputra Group."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GAP / JEDA SPACING ELEGAN DENGAN BILAH TOMBOL SUBNAV PILL */}
      <div className="pt-8 sm:pt-10 pb-4 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KemahasiswaanSubnav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* 3. KONTEN RESPONSIF INTERAKTIF IN-PAGE (SESUAI DENGAN TAB YANG DIKLIK) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          
          {/* ── TAB 1: ABOUT KEMAHASISWAAN ── */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Header Tab */}
              <div className="space-y-2 border-b border-slate-200/80 pb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight flex items-center gap-2">
                    <span>About Kemahasiswaan</span>
                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Visi pembinaan karakter, mandat keilmuan, dan layanan pendampingan holistik Direktorat Kemahasiswaan UPITRA Surakarta.
                </p>
              </div>

              {/* Visi Pembinaan Kemahasiswaan */}
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Visi Direktorat Kemahasiswaan</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] leading-tight">
                    Membentuk Mahasiswa yang Unggul dalam Akademik, Luhur dalam Karakter, dan Peduli pada Sesama
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Bidang Kemahasiswaan UPITRA beroperasi di bawah koordinasi Wakil Rektor 1 Bidang Akademik &amp; Kemahasiswaan. Kami berkomitmen menyediakan lingkungan belajar yang inklusif, kondusif, dan suportif agar setiap mahasiswa dapat mengeksplorasi potensi terbaiknya selama masa perkuliahan di kampus Solo.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Nilai Karakter Triputra DNA</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                      <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Layanan Konseling Psikologis Gratis</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-7 rounded-2xl border border-blue-900 shadow-md space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-white">Layanan Terpadu Mahasiswa</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Biro Kemahasiswaan bertempat di Gedung Rektorat Lantai 1, siap melayani aspirasi, perizinan ormawa, dan konsultasi beasiswa setiap hari kerja.
                  </p>
                  <div className="pt-2 border-t border-blue-900/80 text-xs text-sky-300 font-semibold">
                    Senin – Jumat: 08.00 – 16.00 WIB
                  </div>
                </div>
              </section>

              {/* 5 Ruang Lingkup Tupoksi */}
              <section className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ruang Lingkup Kerja</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    5 Bidang Tugas &amp; Fungsi Pokok
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Fokus program kerja terpadu untuk mendampingi masa studi mahasiswa:
                  </p>
                </div>

                <div className="space-y-3.5">
                  {tupoksiList.map((item) => (
                    <div 
                      key={item.no}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-black text-sm border border-blue-200 shrink-0">
                        {item.no}
                      </div>

                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm sm:text-base font-bold text-[#0b2545]">
                          {item.bidang}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.tugas}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── TAB 2: PROGRAM PENGEMBANGAN ── */}
          {activeTab === "pengembangan" && (
            <motion.div
              key="pengembangan"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Header Tab */}
              <div className="space-y-2 border-b border-slate-200/80 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight flex items-center gap-2">
                  <span>Program Pengembangan Mahasiswa</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Membina insan akademika yang adaptif, berintegritas tinggi, berdaya saing global, dan siap menjadi motor transformasi di dunia industri.
                </p>
              </div>

              {/* Banner Nilai Pengembangan */}
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Holistic Student Development</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545]">
                    Pengembangan Diri Menyeluruh di Luar Ruang Kuliah
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Di UPITRA, pendidikan tidak terbatas pada ruang kelas formal. Melalui program pengembangan holistik, setiap mahasiswa dipersiapkan memiliki *hard skills* yang tajam dan *soft skills* kepemimpinan yang matang.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                    Leadership DNA
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                    Sertifikasi BNSP
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                    Inkubasi PKM
                  </span>
                </div>
              </section>

              {/* 5 Program Unggulan */}
              <section className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Inisiatif Terencana</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    5 Program Unggulan Pengembangan Mahasiswa
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Rangkaian program yang dapat diikuti mahasiswa selama masa studi di UPITRA:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {programList.map((prog, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                            {prog.kategori}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                            0{idx + 1}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug">
                          {prog.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {prog.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Manfaat &amp; Luaran Utama:</span>
                        <div className="space-y-1">
                          {prog.manfaat.map((m, mIdx) => (
                            <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── TAB 3: ORGANISASI MAHASISWA ── */}
          {activeTab === "organisasi" && (
            <motion.div
              key="organisasi"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Header Tab */}
              <div className="space-y-2 border-b border-slate-200/80 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight flex items-center gap-2">
                  <span>Organisasi Mahasiswa (Ormawa)</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Wadah aktualisasi diri, belajar berdemokrasi, dan mengasah keterampilan manajerial kepemimpinan melalui organisasi perwakilan dan unit kegiatan mahasiswa UPITRA.
                </p>
              </div>

              {/* Lembaga Tinggi Mahasiswa */}
              <section className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pemerintahan Mahasiswa</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    Lembaga Tinggi Mahasiswa
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Pilar utama kepemimpinan dan perwakilan aspirasi mahasiswa UPITRA:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {lembagaUtama.map((lem, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md bg-blue-100 text-blue-800">
                          {lem.singkatan}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {lem.peran}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-black text-[#0b2545]">
                        {lem.nama}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {lem.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 10 HMPS Program Studi */}
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Rumpun Jurusan</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    10 Himpunan Mahasiswa Program Studi (HMPS)
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Organisasi berbasis keilmuan spesifik pada masing-masing program studi:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {hmpsList.map((h, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 transition-all space-y-1">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        {h.fakultas}
                      </span>
                      <div className="text-sm sm:text-base font-black text-[#0b2545] pt-1">
                        {h.nama}
                      </div>
                      <div className="text-xs text-slate-500 leading-tight">
                        {h.prodi}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6 Unit Kegiatan Mahasiswa (UKM) */}
              <section className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Minat &amp; Bakat</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    Unit Kegiatan Mahasiswa (UKM)
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Komunitas hobi, seni budaya, olahraga, sains terapan, dan petualangan alam:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ukmList.map((u, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                        {u.kategori}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#0b2545] leading-snug">
                        {u.nama}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {u.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── TAB 4: PRESTASI MAHASISWA ── */}
          {activeTab === "prestasi" && (
            <motion.div
              key="prestasi"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Header Tab */}
              <div className="space-y-2 border-b border-slate-200/80 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight flex items-center gap-2">
                  <span>Prestasi Mahasiswa</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Dokumentasi torehan medali, piala, dan kejuaraan yang diraih oleh mahasiswa UPITRA dalam berbagai ajang kompetisi bergengsi tingkat regional dan nasional.
                </p>
              </div>

              {/* Banner Skema Apresiasi Prestasi */}
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Apresiasi Universitas</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545]">
                    Dukungan Penuh &amp; Penghargaan Bagi Mahasiswa Berprestasi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    UPITRA memberikan insentif pembinaan, pendanaan delegasi lomba, pembebasan biaya kuliah (SKS), hingga rekognisi Surat Keterangan Pendamping Ijazah (SKPI) bagi mahasiswa yang mengharumkan nama almamater.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Trophy className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Insentif Finansial &amp; Beasiswa</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Konversi Nilai Mata Kuliah Terkait</span>
                  </div>
                </div>
              </section>

              {/* Daftar Prestasi Terkini */}
              <section className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Rekam Jejak Kejuaraan</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2545] mt-1">
                    Daftar Prestasi Mahasiswa Terkini
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Bukti nyata dedikasi dan kualitas daya saing intelektual mahasiswa UPITRA:
                  </p>
                </div>

                <div className="space-y-4">
                  {prestasiList.map((p, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-3xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-black text-xs">
                            {p.tahun}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                            <Trophy className="w-3.5 h-3.5 text-blue-600" />
                            <span>{p.juara}</span>
                          </span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {p.kategori}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-[#0b2545] leading-snug">
                          {p.kejuaraan}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {p.deskripsi}
                        </p>

                        <div className="text-xs text-slate-500 pt-1">
                          <strong>Delegasi:</strong> {p.tim} • <em>{p.penyelenggara}</em>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          <Award className="w-3.5 h-3.5" />
                          <span>Terverifikasi</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── TAB 5: KEGIATAN MAHASISWA ── */}
          {activeTab === "kegiatan" && (
            <motion.div
              key="kegiatan"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              {/* Header Tab */}
              <div className="space-y-2 border-b border-slate-200/80 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight flex items-center gap-2">
                  <span>Kegiatan Mahasiswa</span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Rekaman visual ragam dinamika kemahasiswaan: inisiasi mahasiswa baru, kepemimpinan, bakti sosial kemasyarakatan, inovasi ilmiah, seni, dan olahraga kampus UPITRA Solo.
                </p>
              </div>

              {/* Grid 6 Album Foto Galeri Kegiatan */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0b2545]">
                      Momen &amp; Dokumentasi Terpilih
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Setiap aktivitas dirancang untuk memperkaya pengalaman hidup dan persaudaraan mahasiswa.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shrink-0">
                    {galeriKegiatan.length} Album Dokumentasi
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {galeriKegiatan.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className={`relative h-52 bg-gradient-to-br ${item.fallbackBg} flex items-center justify-center overflow-hidden`}>
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-blue-950/85 text-[10px] font-bold text-sky-300 uppercase tracking-wider border border-blue-800/60 backdrop-blur-xs">
                            {item.kategori}
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{item.tanggal}</span>
                            <span>•</span>
                            <span className="truncate">{item.lokasi}</span>
                          </div>

                          <h4 className="text-base font-bold text-[#0b2545] leading-snug group-hover:text-blue-700 transition-colors">
                            {item.judul}
                          </h4>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {item.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                        <span>Dokumentasi Resmi</span>
                        <Camera className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
