"use client";

import { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Tag, 
  X, 
  List, 
  CalendarDays,
  Sparkles,
  ArrowRight,
  Download,
  FileText
} from "lucide-react";
import { generateAcademicCalendarPdf } from "@/lib/generateAcademicCalendarPdf";

export interface CalendarEvent {
  id: number | string;
  name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  category: "Akademik" | "Ujian" | "Libur" | "Wisuda" | "PMB" | "Kemahasiswaan";
  description?: string;
  all_day?: boolean;
}

// Modern hex colors matching ModifikasiUpitra blue & white executive palette
export const categoryColors: Record<string, { bg: string; text: string; hex: string; badge: string }> = {
  akademik: { bg: "bg-[#0284c7]", text: "text-white", hex: "#0284c7", badge: "bg-sky-50 text-[#0284c7] border-sky-200" },
  ujian: { bg: "bg-[#0c4a6e]", text: "text-white", hex: "#0c4a6e", badge: "bg-slate-100 text-[#0c4a6e] border-slate-300" },
  libur: { bg: "bg-slate-500", text: "text-white", hex: "#64748b", badge: "bg-slate-50 text-slate-700 border-slate-200" },
  wisuda: { bg: "bg-[#0369a1]", text: "text-white", hex: "#0369a1", badge: "bg-blue-50 text-[#0369a1] border-blue-200" },
  pmb: { bg: "bg-[#38bdf8]", text: "text-slate-900", hex: "#38bdf8", badge: "bg-sky-50 text-sky-800 border-sky-300" },
  kemahasiswaan: { bg: "bg-[#2563eb]", text: "text-white", hex: "#2563eb", badge: "bg-blue-50 text-[#2563eb] border-blue-200" },
};

export const initialAcademicEvents: CalendarEvent[] = [
  // --- JANUARI 2026 ---
  {
    id: 101,
    name: "Libur Tahun Baru 2026 Masehi",
    start_date: "2026-01-01",
    end_date: "2026-01-01",
    category: "Libur",
    description: "Libur nasional menyambut Tahun Baru 2026 bagi seluruh sivitas akademika UPITRA.",
    all_day: true,
  },
  {
    id: 102,
    name: "UAS Semester Gasal TA 2025/2026",
    start_date: "2026-01-05",
    end_date: "2026-01-16",
    category: "Ujian",
    description: "Pelaksanaan Ujian Akhir Semester Gasal untuk seluruh program studi dan mata kuliah teori/praktikum.",
    all_day: true,
  },
  {
    id: 103,
    name: "Batas Akhir Input Nilai KHS Semester Gasal",
    start_date: "2026-01-19",
    end_date: "2026-01-23",
    category: "Akademik",
    description: "Batas waktu penginputan nilai Kartu Hasil Studi (KHS) oleh dosen pengampu di portal SIAKAD.",
    all_day: true,
  },
  {
    id: 104,
    name: "Pembayaran SPP & Her-Registrasi Semester Genap",
    start_date: "2026-01-21",
    end_date: "2026-01-30",
    category: "Akademik",
    description: "Periode pembayaran biaya kuliah dan her-registrasi semester genap tahun akademik 2025/2026.",
    all_day: true,
  },
  {
    id: 105,
    name: "Konsultasi Dosen PA & Pengisian KRS Online Genap",
    start_date: "2026-01-26",
    end_date: "2026-01-31",
    category: "Akademik",
    description: "Bimbingan rencana studi dengan Dosen Pembimbing Akademik dan persetujuan KRS online.",
    all_day: true,
  },

  // --- FEBRUARI 2026 ---
  {
    id: 201,
    name: "Awal Perkuliahan Efektif Semester Genap TA 2025/2026",
    start_date: "2026-02-02",
    end_date: "2026-02-02",
    category: "Akademik",
    description: "Hari pertama perkuliahan tatap muka dan daring semester genap bagi seluruh mahasiswa aktif.",
    all_day: true,
  },
  {
    id: 202,
    name: "Masa Perubahan Rencana Studi (KPRS) Semester Genap",
    start_date: "2026-02-09",
    end_date: "2026-02-13",
    category: "Akademik",
    description: "Kesempatan bagi mahasiswa untuk menambah atau membatalkan mata kuliah dengan persetujuan Dosen PA.",
    all_day: true,
  },
  {
    id: 203,
    name: "Pendaftaran Program Immersion Magang Industri 3+1",
    start_date: "2026-02-16",
    end_date: "2026-02-18",
    category: "Kemahasiswaan",
    description: "Pendaftaran program magang industri intensif kemitraan Triputra Group untuk mahasiswa semester 6.",
    all_day: true,
  },
  {
    id: 204,
    name: "Libur Nasional Tahun Baru Imlek 2577",
    start_date: "2026-02-17",
    end_date: "2026-02-17",
    category: "Libur",
    description: "Libur nasional perayaan Tahun Baru Imlek 2577 Kongzili.",
    all_day: true,
  },
  {
    id: 205,
    name: "Workshop Sertifikasi Kompetensi & Karir Mahasiswa",
    start_date: "2026-02-23",
    end_date: "2026-02-27",
    category: "Kemahasiswaan",
    description: "Pelatihan peningkatan soft skills dan sertifikasi keahlian terstandarisasi BNSP.",
    all_day: true,
  },

  // --- MARET 2026 ---
  {
    id: 301,
    name: "Pendaftaran Uji Kemahiran Bahasa Inggris (EPT/TOEFL)",
    start_date: "2026-03-02",
    end_date: "2026-03-06",
    category: "Akademik",
    description: "Pendaftaran tes kemampuan bahasa Inggris resmi sebagai salah satu syarat kelulusan dan yudisium.",
    all_day: true,
  },
  {
    id: 302,
    name: "UTS Semester Genap TA 2025/2026",
    start_date: "2026-03-16",
    end_date: "2026-03-27",
    category: "Ujian",
    description: "Ujian Tengah Semester Genap untuk seluruh mata kuliah teori, praktikum, dan proyek studi kasus.",
    all_day: true,
  },
  {
    id: 303,
    name: "Libur Hari Suci Nyepi Tahun Baru Saka 1948",
    start_date: "2026-03-19",
    end_date: "2026-03-19",
    category: "Libur",
    description: "Libur nasional memperingati Hari Suci Nyepi Tahun Baru Saka 1948.",
    all_day: true,
  },
  {
    id: 304,
    name: "Libur & Cuti Bersama Hari Raya Idul Fitri 1447 H",
    start_date: "2026-03-20",
    end_date: "2026-03-25",
    category: "Libur",
    description: "Libur nasional dan cuti bersama Idul Fitri 1447 H bagi seluruh sivitas akademika universitas.",
    all_day: true,
  },
  {
    id: 305,
    name: "Penginputan Nilai Hasil UTS Genap di SIAKAD",
    start_date: "2026-03-30",
    end_date: "2026-03-30",
    category: "Akademik",
    description: "Batas input nilai UTS Genap untuk evaluasi kemajuan belajar mahasiswa.",
    all_day: true,
  },

  // --- APRIL 2026 ---
  {
    id: 401,
    name: "Pembukaan PMB 2026/2027 Gelombang 1 Jalur Beasiswa",
    start_date: "2026-04-01",
    end_date: "2026-04-30",
    category: "PMB",
    description: "Penerimaan Mahasiswa Baru Gelombang 1 dengan skema Beasiswa Triputra Unggul dan Jalur Prestasi.",
    all_day: true,
  },
  {
    id: 402,
    name: "Libur Nasional Wafat Yesus Kristus (Jumat Agung)",
    start_date: "2026-04-03",
    end_date: "2026-04-03",
    category: "Libur",
    description: "Peringatan Wafat Yesus Kristus (Jumat Agung).",
    all_day: true,
  },
  {
    id: 403,
    name: "Pekan Olahraga & Seni Mahasiswa UPITRA (PORSENI)",
    start_date: "2026-04-06",
    end_date: "2026-04-10",
    category: "Kemahasiswaan",
    description: "Ajang kompetisi olahraga, seni, dan kreativitas antar program studi dan fakultas UPITRA.",
    all_day: true,
  },
  {
    id: 404,
    name: "Wisuda Sarjana & Diploma Periode I Tahun 2026",
    start_date: "2026-04-15",
    end_date: "2026-04-15",
    category: "Wisuda",
    description: "Rapat Senat Terbuka Wisuda Sarjana dan Diploma Periode I Tahun Akademik 2025/2026.",
    all_day: true,
  },
  {
    id: 405,
    name: "Yudisium Kelulusan Gelombang I Semester Genap",
    start_date: "2026-04-20",
    end_date: "2026-04-24",
    category: "Akademik",
    description: "Penetapan kelulusan dan pelepasan calon wisudawan oleh masing-masing Dekanat Fakultas.",
    all_day: true,
  },

  // --- MEI 2026 ---
  {
    id: 501,
    name: "Libur Nasional Hari Buruh Internasional",
    start_date: "2026-05-01",
    end_date: "2026-05-01",
    category: "Libur",
    description: "Libur nasional memperingati Hari Buruh Internasional (May Day).",
    all_day: true,
  },
  {
    id: 502,
    name: "Libur Nasional Kenaikan Yesus Kristus",
    start_date: "2026-05-14",
    end_date: "2026-05-14",
    category: "Libur",
    description: "Libur nasional peringatan Kenaikan Yesus Kristus.",
    all_day: true,
  },
  {
    id: 503,
    name: "UAS Semester Genap TA 2025/2026",
    start_date: "2026-05-18",
    end_date: "2026-05-29",
    category: "Ujian",
    description: "Pelaksanaan Ujian Akhir Semester Genap penentu kelulusan dan ketercapaian kompetensi pembelajaran OBE.",
    all_day: true,
  },
  {
    id: 504,
    name: "Libur Nasional Hari Raya Waisak 2570 BE",
    start_date: "2026-05-27",
    end_date: "2026-05-27",
    category: "Libur",
    description: "Libur nasional memperingati Hari Raya Waisak 2570 BE.",
    all_day: true,
  },
  {
    id: 505,
    name: "Batas Akhir Penyerahan Berkas Tugas Akhir / Skripsi",
    start_date: "2026-05-30",
    end_date: "2026-05-30",
    category: "Akademik",
    description: "Batas akhir pengumpulan naskah skripsi/tugas akhir yang telah diuji dan direvisi.",
    all_day: true,
  },

  // --- JUNI 2026 ---
  {
    id: 601,
    name: "Libur Nasional Hari Lahir Pancasila",
    start_date: "2026-06-01",
    end_date: "2026-06-01",
    category: "Libur",
    description: "Peringatan Hari Lahir Pancasila sebagai dasar falsafah Republik Indonesia.",
    all_day: true,
  },
  {
    id: 602,
    name: "Penerbitan KHS & Pendaftaran Semester Antara",
    start_date: "2026-06-01",
    end_date: "2026-06-12",
    category: "Akademik",
    description: "Pengumuman KHS semester genap dan pembukaan pendaftaran kuliah remedial / semester antara.",
    all_day: true,
  },
  {
    id: 603,
    name: "Pelaksanaan Perkuliahan & Ujian Semester Antara",
    start_date: "2026-06-15",
    end_date: "2026-07-10",
    category: "Akademik",
    description: "Perkuliahan intensif percepatan dan perbaikan nilai bagi mahasiswa yang mengambil semester antara.",
    all_day: true,
  },
  {
    id: 604,
    name: "Libur Nasional Hari Raya Idul Adha 1447 H",
    start_date: "2026-06-17",
    end_date: "2026-06-17",
    category: "Libur",
    description: "Libur nasional memperingati Hari Raya Idul Adha 1447 Hijriah.",
    all_day: true,
  },
  {
    id: 605,
    name: "Pelepasan Mahasiswa Magang Immersion Industri 3+1",
    start_date: "2026-06-22",
    end_date: "2026-06-30",
    category: "Kemahasiswaan",
    description: "Upacara pelepasan resmi mahasiswa menuju perusahaan mitra industri Triputra Group.",
    all_day: true,
  },

  // --- JULI 2026 ---
  {
    id: 701,
    name: "PMB Gelombang 2 Jalur Reguler & Prestasi Rapor",
    start_date: "2026-07-01",
    end_date: "2026-07-31",
    category: "PMB",
    description: "Penerimaan Mahasiswa Baru Gelombang 2 untuk seluruh fakultas dan program studi sarjana/diploma.",
    all_day: true,
  },
  {
    id: 702,
    name: "Libur Nasional Tahun Baru Islam 1448 H",
    start_date: "2026-07-07",
    end_date: "2026-07-07",
    category: "Libur",
    description: "Libur memperingati Tahun Baru Islam 1 Muharram 1448 Hijriah.",
    all_day: true,
  },
  {
    id: 703,
    name: "Pembayaran SPP & Her-Registrasi Semester Gasal TA 2026/2027",
    start_date: "2026-07-13",
    end_date: "2026-07-24",
    category: "Akademik",
    description: "Masa pembayaran biaya kuliah dan her-registrasi semester gasal bagi seluruh mahasiswa aktif.",
    all_day: true,
  },
  {
    id: 704,
    name: "Konsultasi Dosen PA & Pengisian KRS Online Gasal",
    start_date: "2026-07-20",
    end_date: "2026-07-31",
    category: "Akademik",
    description: "Konsultasi perwalian rencana studi dan pengisian KRS online semester gasal melalui portal SIAKAD.",
    all_day: true,
  },
  {
    id: 705,
    name: "Pelatihan Karakter Triputra DNA & Kepemimpinan",
    start_date: "2026-07-27",
    end_date: "2026-07-31",
    category: "Kemahasiswaan",
    description: "Pelatihan kepemimpinan dan nilai-nilai Triputra DNA untuk pengurus ormawa dan mahasiswa lanjutan.",
    all_day: true,
  },

  // --- AGUSTUS 2026 ---
  {
    id: 801,
    name: "Awal Perkuliahan Efektif Semester Gasal TA 2026/2027",
    start_date: "2026-08-03",
    end_date: "2026-08-03",
    category: "Akademik",
    description: "Hari pertama perkuliahan semester gasal tahun akademik baru 2026/2027 bagi seluruh program studi.",
    all_day: true,
  },
  {
    id: 802,
    name: "Masa Perubahan Rencana Studi (KPRS) Semester Gasal",
    start_date: "2026-08-10",
    end_date: "2026-08-14",
    category: "Akademik",
    description: "Batas waktu revisi penambahan atau pembatalan mata kuliah semester gasal di portal akademik.",
    all_day: true,
  },
  {
    id: 803,
    name: "Libur Nasional HUT Proklamasi Kemerdekaan RI Ke-81",
    start_date: "2026-08-17",
    end_date: "2026-08-17",
    category: "Libur",
    description: "Upacara bendera dan peringatan Hari Ulang Tahun Kemerdekaan Republik Indonesia Ke-81.",
    all_day: true,
  },
  {
    id: 804,
    name: "Pengenalan Kehidupan Kampus Mahasiswa Baru (PKKMB)",
    start_date: "2026-08-24",
    end_date: "2026-08-28",
    category: "Kemahasiswaan",
    description: "Orientasi kampus, pengenalan sistem akademik, fakultas, laboratorium, dan ormawa bagi mahasiswa baru.",
    all_day: true,
  },
  {
    id: 805,
    name: "Inagurasi & Welcoming Ceremony Mahasiswa Baru 2026",
    start_date: "2026-08-31",
    end_date: "2026-08-31",
    category: "Kemahasiswaan",
    description: "Malam keakraban penyambutan keluarga besar mahasiswa baru Universitas Pignatelli Triputra.",
    all_day: true,
  },

  // --- SEPTEMBER 2026 ---
  {
    id: 901,
    name: "Sosialisasi Program Beasiswa Prestasi & Bantuan Industri",
    start_date: "2026-09-01",
    end_date: "2026-09-05",
    category: "Kemahasiswaan",
    description: "Pemberian informasi peluang beasiswa dari Yayasan Triputra dan institusi mitra perbankan/industri.",
    all_day: true,
  },
  {
    id: 902,
    name: "Libur Nasional Maulid Nabi Muhammad SAW 1448 H",
    start_date: "2026-09-15",
    end_date: "2026-09-15",
    category: "Libur",
    description: "Libur memperingati Maulid Nabi Muhammad SAW 1448 Hijriah.",
    all_day: true,
  },
  {
    id: 903,
    name: "Kuliah Dosen Tamu Praktisi Industri Triputra Group",
    start_date: "2026-09-21",
    end_date: "2026-09-25",
    category: "Akademik",
    description: "Sharing session dan kuliah tamu dari para profesional industri mengenai trend teknologi dan bisnis terkini.",
    all_day: true,
  },
  {
    id: 904,
    name: "Monitoring & Evaluasi Perkuliahan Tengah Semester",
    start_date: "2026-09-28",
    end_date: "2026-09-30",
    category: "Akademik",
    description: "Audit mutu internal ketercapaian silabus dan rencana pembelajaran semester (RPS) perkuliahan.",
    all_day: true,
  },

  // --- OKTOBER 2026 (Bulan Berjalan) ---
  {
    id: 1001,
    name: "Pembagian Kartu Ujian UTS Gasal di Portal Mahasiswa",
    start_date: "2026-10-05",
    end_date: "2026-10-09",
    category: "Akademik",
    description: "Pencetakan dan unduh kartu ujian UTS semester gasal bagi mahasiswa yang telah menyelesaikan administrasi.",
    all_day: true,
  },
  {
    id: 1002,
    name: "UTS Semester Gasal TA 2026/2027",
    start_date: "2026-10-12",
    end_date: "2026-10-23",
    category: "Ujian",
    description: "Pelaksanaan Ujian Tengah Semester Gasal untuk seluruh mata kuliah dan program studi UPITRA.",
    all_day: true,
  },
  {
    id: 1003,
    name: "Wisuda Sarjana & Diploma Periode II Tahun 2026",
    start_date: "2026-10-24",
    end_date: "2026-10-24",
    category: "Wisuda",
    description: "Rapat Senat Terbuka Wisuda Sarjana dan Diploma Periode II Tahun 2026 di Auditorium UPITRA.",
    all_day: true,
  },
  {
    id: 1004,
    name: "Input Nilai Hasil UTS Gasal & Evaluasi Progres Belajar",
    start_date: "2026-10-26",
    end_date: "2026-10-30",
    category: "Akademik",
    description: "Penginputan nilai UTS ke SIAKAD dan pengumuman hasil evaluasi belajar tengah semester kepada mahasiswa.",
    all_day: true,
  },
  {
    id: 1005,
    name: "Peringatan Hari Sumpah Pemuda & UPITRA Innovation Day",
    start_date: "2026-10-28",
    end_date: "2026-10-28",
    category: "Kemahasiswaan",
    description: "Gelar wicara kepemudaan, pameran produk inovasi mahasiswa, dan temu alumni berprestasi.",
    all_day: true,
  },

  // --- NOVEMBER 2026 ---
  {
    id: 1101,
    name: "Pembukaan PMB Early Bird TA 2027/2028 Jalur Undangan",
    start_date: "2026-11-02",
    end_date: "2026-11-30",
    category: "PMB",
    description: "Penerimaan Mahasiswa Baru jalur undangan khusus SMA/SMK mitra dengan potongan biaya SPP spesial.",
    all_day: true,
  },
  {
    id: 1102,
    name: "Pekan Ilmiah & Riset Inovasi Mahasiswa Triputra",
    start_date: "2026-11-09",
    end_date: "2026-11-13",
    category: "Kemahasiswaan",
    description: "Kompetisi karya tulis ilmiah, presentasi prototipe teknologi, dan pendanaan ide bisnis mahasiswa.",
    all_day: true,
  },
  {
    id: 1103,
    name: "Pameran Karya Teknologi & Bisnis Mahasiswa UPITRA",
    start_date: "2026-11-16",
    end_date: "2026-11-20",
    category: "Kemahasiswaan",
    description: "Ekshibisi karya aplikasi perangkat lunak, sistem cerdas, dan stan kewirausahaan mahasiswa.",
    all_day: true,
  },
  {
    id: 1104,
    name: "Sosialisasi & Pendaftaran Ujian Proposal Skripsi Gasal",
    start_date: "2026-11-23",
    end_date: "2026-11-27",
    category: "Akademik",
    description: "Masa pendaftaran dan verifikasi berkas seminar proposal skripsi/tugas akhir semester gasal.",
    all_day: true,
  },

  // --- DESEMBER 2026 ---
  {
    id: 1201,
    name: "Sosialisasi Jadwal & Syarat Mengikuti UAS Gasal",
    start_date: "2026-12-01",
    end_date: "2026-12-04",
    category: "Akademik",
    description: "Penyampaian tata tertib, jadwal ruang ujian, dan ketentuan presensi minimal perkuliahan 75%.",
    all_day: true,
  },
  {
    id: 1202,
    name: "UAS Semester Gasal TA 2026/2027",
    start_date: "2026-12-14",
    end_date: "2026-12-23",
    category: "Ujian",
    description: "Pelaksanaan Ujian Akhir Semester Gasal untuk seluruh mata kuliah dan program studi UPITRA.",
    all_day: true,
  },
  {
    id: 1203,
    name: "Libur Nasional Hari Raya Natal & Cuti Bersama",
    start_date: "2026-12-24",
    end_date: "2026-12-25",
    category: "Libur",
    description: "Libur nasional dan cuti bersama dalam rangka perayaan Hari Raya Natal 2026.",
    all_day: true,
  },
  {
    id: 1204,
    name: "Cuti Bersama Akhir Tahun 2026 & Evaluasi Akademik",
    start_date: "2026-12-28",
    end_date: "2026-12-31",
    category: "Libur",
    description: "Cuti bersama akhir tahun 2026 dan masa rekapitulasi penilaian akhir tahun universitas.",
    all_day: true,
  },
];

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

interface AcademicCalendarProps {
  events?: CalendarEvent[];
}

export default function AcademicCalendar({ events = initialAcademicEvents }: AcademicCalendarProps) {
  const [calendarData, setCalendarData] = useState<CalendarEvent[]>(events);

  // Set default view to current month or real current date dynamically
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [todayStr, setTodayStr] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [listFilter, setListFilter] = useState<"all" | "upcoming" | "past">("all");

  // Client-side hydration sync to guarantee matching local browser time & dynamic admin events
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now);
    setTodayStr(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`);

    const saved = localStorage.getItem("upitra_academic_events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped: CalendarEvent[] = parsed.map((item: any) => ({
            id: item.id,
            name: item.title || item.name || "Event Kampus",
            start_date: item.start_date || item.event_date || "",
            end_date: item.end_date || item.start_date || item.event_date || "",
            category: (["Akademik", "Ujian", "Libur", "Wisuda", "PMB", "Kemahasiswaan"].includes(item.category)
              ? item.category
              : "Akademik") as CalendarEvent["category"],
            description: item.description || "",
            all_day: item.all_day ?? true,
          }));
          setCalendarData(mapped);
        }
      } catch {}
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date()); // Reset to real current month & year
  };

  // Helper to format date in Indonesian format (e.g., "Senin, 16 Maret 2026")
  const formatDateIndo = (dateStr?: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Build grid calendar days
  const firstDayOfMonth = new Date(year, month, 1);
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Day of week: 0=Sun, 1=Mon, ..., 6=Sat. We want Monday=0, Sunday=6
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Previous month trailing days
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const dateObj = new Date(year, month - 1, dayNum);
    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    calendarDays.push({
      dayNum,
      dateStr,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
    });
  }

  // Next month leading days to complete 35 or 42 cells
  const remainingCells = 35 - calendarDays.length > 0 ? 35 - calendarDays.length : 42 - calendarDays.length;
  for (let d = 1; d <= remainingCells; d++) {
    const dateObj = new Date(year, month + 1, d);
    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: false,
    });
  }

  // Find events for a given date
  const getEventsForDate = (dateStr: string) => {
    return calendarData.filter(e => {
      return dateStr >= e.start_date && dateStr <= e.end_date;
    });
  };

  // Sort events chronologically for agenda list
  const sortedEvents = [...calendarData].sort((a, b) => a.start_date.localeCompare(b.start_date));
  const upcomingEvents = sortedEvents.filter(ev => ev.end_date >= todayStr);
  const pastEvents = sortedEvents.filter(ev => ev.end_date < todayStr);

  const displayedEvents = listFilter === "upcoming"
    ? upcomingEvents
    : listFilter === "past"
    ? pastEvents
    : sortedEvents;

  return (
    <div className="w-full space-y-8">
      {/* 1. LEGEND BAR (Pills matching ModifikasiUpitra) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
        <LegendItem color="bg-[#0284c7]" label="Akademik" />
        <LegendItem color="bg-[#0c4a6e]" label="Ujian" />
        <LegendItem color="bg-slate-500" label="Libur" />
        <LegendItem color="bg-[#0369a1]" label="Wisuda" />
        <LegendItem color="bg-[#38bdf8]" label="PMB" />
        <LegendItem color="bg-[#2563eb]" label="Kemahasiswaan" />
      </div>

      {/* 2. CALENDAR CONTROLS & HEADER */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        <div className="p-5 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          {/* Month & Year Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-xs p-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="cursor-pointer p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="cursor-pointer px-3 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Hari Ini
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="cursor-pointer p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0c4a6e] tracking-tight">
              {monthNames[month]} {year}
            </h3>
          </div>

          {/* View Switcher (Grid vs List) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#0c4a6e] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "list"
                  ? "bg-white text-[#0c4a6e] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Daftar Agenda</span>
            </button>
          </div>
        </div>

        {/* 3. CALENDAR CONTENT: GRID VIEW */}
        {viewMode === "grid" ? (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Day Headers (Sen - Min) */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day, idx) => (
                  <div
                    key={idx}
                    className="text-center py-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 rounded-lg"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day Grid Cells */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((cell, idx) => {
                  const dayEvents = getEventsForDate(cell.dateStr);
                  const isToday = cell.isCurrentMonth && cell.dateStr === todayStr;

                  return (
                    <div
                      key={idx}
                      className={`min-h-[95px] sm:min-h-[110px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                        cell.isCurrentMonth
                          ? isToday
                            ? "bg-blue-50/40 border-blue-400 ring-2 ring-blue-500/80 shadow-xs"
                            : "bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs"
                          : "bg-slate-50/60 border-slate-100 text-slate-400 opacity-60"
                      }`}
                    >
                      {/* Date Number & Today Indicator */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-bold ${
                              isToday
                                ? "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black shadow-xs text-[11px]"
                                : cell.isCurrentMonth
                                ? "text-slate-800"
                                : "text-slate-400"
                            }`}
                          >
                            {cell.dayNum}
                          </span>
                          {isToday && (
                            <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/90 px-1.5 py-0.5 rounded-md">
                              Hari Ini
                            </span>
                          )}
                        </div>
                        {dayEvents.length > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </div>

                      {/* Event Badges inside Day Cell */}
                      <div className="space-y-1 flex-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((ev) => {
                          const catKey = ev.category.toLowerCase();
                          const style = categoryColors[catKey] || categoryColors.akademik;

                          return (
                            <button
                              key={ev.id}
                              type="button"
                              onClick={() => setSelectedEvent(ev)}
                              title={ev.name}
                              className={`w-full text-left truncate block px-1.5 py-0.5 rounded text-[10px] font-semibold transition-transform hover:scale-[1.02] cursor-pointer shadow-2xs ${style.bg} ${style.text}`}
                            >
                              {ev.name}
                            </button>
                          );
                        })}

                        {dayEvents.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setSelectedEvent(dayEvents[0])}
                            className="text-[9px] font-bold text-blue-600 hover:underline block text-left"
                          >
                            +{dayEvents.length - 2} kegiatan lagi
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* 4. CALENDAR CONTENT: LIST VIEW (Daftar Agenda: Event Akan Datang Berwarna, Event Lewat Abu-abu History) */
          <div>
            {/* Filter Tabs Header */}
            <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setListFilter("all")}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    listFilter === "all"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Semua Agenda ({sortedEvents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setListFilter("upcoming")}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    listFilter === "upcoming"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Akan Datang ({upcomingEvents.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setListFilter("past")}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    listFilter === "past"
                      ? "bg-slate-700 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Riwayat Selesai ({pastEvents.length})
                </button>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Tahun Akademik {year}
              </span>
            </div>

            {/* Event List Items */}
            <div className="p-4 sm:p-6 space-y-2.5">
              {displayedEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">
                  Tidak ada agenda kegiatan akademik pada kategori ini.
                </div>
              ) : (
                displayedEvents.map((ev) => {
                  const catKey = ev.category.toLowerCase();
                  const style = categoryColors[catKey] || categoryColors.akademik;
                  const isPast = ev.end_date < todayStr;
                  const isOngoing = ev.start_date <= todayStr && ev.end_date >= todayStr;

                  if (isPast) {
                    // Event Yang Sudah Lewat: Abu-abu (History Style)
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="py-3.5 sm:py-4 px-4 sm:px-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 opacity-65 hover:opacity-95 hover:bg-slate-100/70 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-3 h-3 rounded-full mt-1.5 shrink-0 bg-slate-300" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                                {ev.category}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md">
                                Telah Lewat (Riwayat)
                              </span>
                            </div>
                            <h4 className="text-sm sm:text-base font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                              {ev.name}
                            </h4>
                            {ev.description && (
                              <p className="text-xs text-slate-400 line-clamp-1">
                                {ev.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 sm:text-right">
                          <div className="text-xs text-slate-400 font-medium">
                            <div>{formatDateIndo(ev.start_date)}</div>
                            {ev.end_date && ev.end_date !== ev.start_date && (
                              <div className="text-[11px] text-slate-400">
                                s/d {formatDateIndo(ev.end_date)}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  }

                  // Event Yang Akan Datang / Sedang Berlangsung: Berwarna Jelas & Menonjol
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`py-4 sm:py-5 px-4 sm:px-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                        isOngoing ? "ring-2 ring-emerald-500/80 bg-emerald-50/15 border-emerald-300" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 ${style.bg} shadow-sm`}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${style.badge}`}
                            >
                              {ev.category}
                            </span>
                            {isOngoing ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Sedang Berlangsung
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                                Akan Datang
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-black text-[#0b2545] group-hover:text-blue-600 transition-colors">
                            {ev.name}
                          </h4>
                          {ev.description && (
                            <p className="text-xs text-slate-600 line-clamp-1">
                              {ev.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 sm:text-right">
                        <div className="text-xs text-slate-700 font-bold">
                          <div>{formatDateIndo(ev.start_date)}</div>
                          {ev.end_date && ev.end_date !== ev.start_date && (
                            <div className="text-[11px] text-slate-500 font-semibold">
                              s/d {formatDateIndo(ev.end_date)}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. DOWNLOAD KALENDER AKADEMIK BAR (KOTAK PERSEGI PANJANG SEPANJANG KALENDER) */}
      <button
        type="button"
        onClick={() => generateAcademicCalendarPdf(year, sortedEvents)}
        className="w-full bg-[#06172e] hover:bg-[#0b2545] border border-blue-900/60 rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl transition-all duration-300 group cursor-pointer hover:shadow-2xl hover:border-blue-700/80 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-sky-400 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
              <span>Download Kalender Akademik Disini</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1.5 transition-transform" />
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Dokumen resmi format PDF dari Januari sampai Desember {year} ({sortedEvents.length} agenda kegiatan akademik lengkap).
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all shrink-0">
          <span>Unduh PDF ({year})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>

      {/* 5. EVENT DETAIL MODAL (Matching ModifikasiUpitra) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden z-10">
            {/* Header Colored Accent Bar */}
            <div
              className="h-3 w-full"
              style={{
                backgroundColor:
                  categoryColors[selectedEvent.category.toLowerCase()]?.hex || "#0284c7"
              }}
            />

            <div className="p-6 sm:p-8 space-y-6">
              {/* Header Title & Close Button */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black text-[#0b2545] leading-tight">
                  {selectedEvent.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Time & Category Info */}
              <div className="space-y-4">
                {/* Waktu Pelaksanaan */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Waktu Pelaksanaan
                    </p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {formatDateIndo(selectedEvent.start_date)}
                      {selectedEvent.end_date && selectedEvent.end_date !== selectedEvent.start_date && (
                        <span>
                          {" "}
                          <span className="text-slate-400 font-normal">hingga</span>{" "}
                          {formatDateIndo(selectedEvent.end_date)}
                        </span>
                      )}
                    </p>
                    {selectedEvent.all_day && (
                      <span className="inline-block mt-1 text-[11px] font-medium text-slate-500">
                        Agenda Kegiatan Sehari Penuh
                      </span>
                    )}
                  </div>
                </div>

                {/* Kategori */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 text-slate-600 shrink-0 mt-0.5">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Kategori Agenda
                    </p>
                    <div
                      className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mt-1 shadow-2xs"
                      style={{
                        backgroundColor:
                          categoryColors[selectedEvent.category.toLowerCase()]?.hex || "#0284c7"
                      }}
                    >
                      {selectedEvent.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Deskripsi Kegiatan
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedEvent.description || "Tidak ada rincian deskripsi tambahan untuk agenda ini."}
                </p>
              </div>

              {/* Close Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0c4a6e] hover:bg-[#072f49] text-white text-xs font-bold shadow-md transition-colors"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/60 cursor-default">
      <div className={`w-2.5 h-2.5 rounded-full shadow-2xs ${color}`} />
      <span className="text-xs font-semibold text-slate-700">{label}</span>
    </div>
  );
}

