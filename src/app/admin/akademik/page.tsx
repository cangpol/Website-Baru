"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Clock, 
  MapPin, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  List,
  FileText,
  Download,
  Eye,
  Building2,
  GraduationCap
} from "lucide-react";
import { 
  getEvents, 
  saveEventAction, 
  deleteEventAction, 
  getAcademicCalendarDoc, 
  saveAcademicCalendarDocAction, 
  deleteAcademicCalendarDocAction,
  AcademicCalendarDoc,
  EventInput 
} from "@/server/events";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import RichEditor from "@/components/admin/RichEditor";

export interface AdminCalendarEvent {
  id: string;
  title: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  type?: string;
  location?: string;
  start_date: string;
  end_date: string;
  startDate?: string;
  endDate?: string;
  event_time?: string;
  organizer?: string;
  status?: string;
  registration_link?: string;
  registrationUrl?: string | null;
  bannerImage?: string | null;
  isOnline?: boolean;
  academicYear?: string;
  semester?: string;
  is_featured?: boolean;
  version?: number;
}

const categories = [
  "Semua",
  "Akademik",
  "Ujian",
  "Libur",
  "Wisuda",
  "PMB",
  "Kemahasiswaan",
  "Seminar",
  "Workshop",
  "Kompetisi",
  "Festival",
  "Expo",
  "Umum"
];

const academicYears = ["Semua", "2024/2025", "2025/2026", "2026/2027", "2027/2028"];
const semesters = ["Semua", "Gasal", "Genap", "Antara"];

const emptyForm: AdminCalendarEvent = {
  id: "",
  name: "",
  title: "",
  category: "Akademik",
  type: "Akademik",
  start_date: new Date().toISOString().split("T")[0],
  end_date: new Date().toISOString().split("T")[0],
  event_time: "08:00 - Selesai WIB",
  location: "Kampus UPITRA Surakarta",
  organizer: "Universitas Pignatelli Triputra",
  registration_link: "",
  status: "Mendatang",
  description: "",
  academicYear: "2025/2026",
  semester: "Gasal",
  is_featured: false,
};

const defaultFakultasOverview = [
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains & Teknologi",
    slug: "/fst",
    cover: "/images/ar-vr.jpg",
    prodiTags: ["Informatika", "Sistem Informasi", "Rekayasa Perangkat Lunak"],
    desc: "Membekali mahasiswa dengan keahlian kecerdasan buatan, rekayasa perangkat lunak skala industri, analitika data, dan komputasi modern.",
  },
  {
    id: "feb",
    code: "FEB",
    name: "Fakultas Ekonomi & Bisnis",
    slug: "/feb",
    cover: "/images/feb-full.jpg",
    prodiTags: ["Manajemen", "Akuntansi", "Bisnis Digital"],
    desc: "Mencetak profesional bisnis, akuntan korporasi, dan entrepreneur tangguh berkarakter Triputra DNA yang adaptif di era transformasi ekonomi digital.",
  },
  {
    id: "fsh",
    code: "FSH",
    name: "Fakultas Sosial Humaniora",
    slug: "/fsh",
    cover: "/images/pariwisata/par-1.jpg",
    prodiTags: ["Pariwisata", "Bahasa Inggris"],
    desc: "Mengembangkan kepemimpinan humanis, kompetensi komunikasi internasional, dan keahlian manajemen hospitaliti & pariwisata berkelanjutan.",
  },
  {
    id: "fkes",
    code: "FKes",
    name: "Fakultas Kesehatan",
    slug: "/fkes",
    cover: "/images/kuliah-1.jpeg",
    prodiTags: ["Keselamatan & Kesehatan Kerja", "Fisioterapi", "Keperawatan"],
    desc: "Menghasilkan tenaga kesehatan profesional, ahli keselamatan kerja industri (K3), dan fisioterapis kompeten dengan dedikasi kemanusiaan tinggi.",
  },
];

export default function AdminAkademikCalendarPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "banner" | "fakultas">("calendar");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);
  const [academicPdf, setAcademicPdf] = useState<AcademicCalendarDoc | null>(null);
  
  // Banner state
  const [bannerForm, setBannerForm] = useState({
    title: "Akademik",
    description: "4 Fakultas, 10 Program Studi S1\n& D3 Keperawatan",
    imageUrl: "/images/kuliah-1.jpeg",
  });
  const [isSavingBanner, setIsSavingBanner] = useState(false);

  // PDF state
  const [pdfFormUrl, setPdfFormUrl] = useState<string>("");
  const [pdfFormName, setPdfFormName] = useState<string>("");
  const [pdfFormSize, setPdfFormSize] = useState<string>("");
  const [pdfFormYear, setPdfFormYear] = useState<string>("2025/2026");
  const [isSavingPdf, setIsSavingPdf] = useState(false);
  const [deletePdfConfirm, setDeletePdfConfirm] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("Semua");
  const [filterSemester, setFilterSemester] = useState("Semua");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("all");

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

  // Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<AdminCalendarEvent>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);

  // Calendar Visual View State
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const showToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load from Database
  const loadData = async () => {
    try {
      const [eventsData, pdfDoc, bannerData] = await Promise.all([
        getEvents(),
        getAcademicCalendarDoc(),
        getPageHeaderBanner("akademik"),
      ]);

      const mapped: AdminCalendarEvent[] = eventsData.map((ev) => ({
        id: ev.id,
        title: ev.title,
        name: ev.title,
        slug: ev.slug,
        description: ev.description,
        category: ev.type,
        type: ev.type,
        location: ev.location,
        start_date: ev.startDate.split("T")[0],
        end_date: ev.endDate.split("T")[0],
        startDate: ev.startDate,
        endDate: ev.endDate,
        bannerImage: ev.bannerImage,
        isOnline: ev.isOnline,
        registrationUrl: ev.registrationUrl,
        academicYear: ev.academicYear || "2025/2026",
        semester: ev.semester || "Gasal",
        version: ev.version,
        status: new Date(ev.endDate) < new Date() ? "Selesai" : new Date(ev.startDate) <= new Date() ? "Berlangsung" : "Mendatang",
      }));
      setEvents(mapped);

      if (pdfDoc) {
        setAcademicPdf(pdfDoc);
        setPdfFormUrl(pdfDoc.fileUrl);
        setPdfFormName(pdfDoc.fileName);
        setPdfFormSize(pdfDoc.fileSize || "PDF");
        setPdfFormYear(pdfDoc.academicYear || "2025/2026");
      }

      if (bannerData) {
        setBannerForm({
          title: bannerData.title || "Akademik",
          description: bannerData.description || "4 Fakultas, 10 Program Studi S1\n& D3 Keperawatan",
          imageUrl: bannerData.imageUrl || "/images/kuliah-1.jpeg",
        });
      }
    } catch (err) {
      console.error("Error loading academic data:", err);
      showToast("Gagal memuat data akademik.", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchSearch =
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        (ev.location && ev.location.toLowerCase().includes(search.toLowerCase())) ||
        (ev.description && ev.description.toLowerCase().includes(search.toLowerCase()));

      const matchCategory = filterCategory === "Semua" || ev.category === filterCategory || ev.type === filterCategory;
      const matchYear = filterYear === "Semua" || ev.academicYear === filterYear;
      const matchSemester = filterSemester === "Semua" || ev.semester === filterSemester;
      const matchStatus = filterStatus === "all" || ev.status === filterStatus;

      return matchSearch && matchCategory && matchYear && matchSemester && matchStatus;
    });
  }, [events, search, filterCategory, filterYear, filterSemester, filterStatus]);

  // Open Modal Create
  const handleOpenCreate = () => {
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  // Open Modal Edit
  const handleOpenEdit = (ev: AdminCalendarEvent) => {
    setForm({
      ...ev,
      title: ev.title || ev.name || "",
      start_date: ev.start_date || (ev.startDate ? ev.startDate.split("T")[0] : new Date().toISOString().split("T")[0]),
      end_date: ev.end_date || (ev.endDate ? ev.endDate.split("T")[0] : new Date().toISOString().split("T")[0]),
      registration_link: ev.registrationUrl || ev.registration_link || "",
      category: ev.type || ev.category || "Akademik",
      academicYear: ev.academicYear || "2025/2026",
      semester: ev.semester || "Gasal",
      description: ev.description || "",
      location: ev.location || "Kampus UPITRA Surakarta",
      status: ev.status || "Mendatang",
    });
    setIsFormOpen(true);
  };

  // Save Event
  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Judul event wajib diisi.", "error");
      return;
    }
    if (!form.start_date || !form.end_date) {
      showToast("Tanggal mulai dan selesai wajib diisi.", "error");
      return;
    }
    if (form.end_date < form.start_date) {
      showToast("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.", "error");
      return;
    }

    setIsSubmittingEvent(true);
    try {
      const payload: EventInput = {
        title: form.title,
        description: form.description || "Agenda kegiatan akademik resmi UPITRA.",
        location: form.location || "Kampus UPITRA Surakarta",
        startDate: new Date(form.start_date).toISOString(),
        endDate: new Date(form.end_date).toISOString(),
        type: form.category || form.type || "Akademik",
        registrationUrl: form.registration_link || null,
        bannerImage: form.bannerImage || null,
        isOnline: form.isOnline || false,
        academicYear: form.academicYear || "2025/2026",
        semester: form.semester || "Gasal",
        version: form.version || 1,
      };

      const result = await saveEventAction(form.id ? form.id : null, payload);
      if (result.ok) {
        showToast(result.message || "Agenda berhasil disimpan.", "success");
        setIsFormOpen(false);
        await loadData();
      } else {
        showToast(result.message || "Gagal menyimpan event.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menyimpan event.", "error");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id: string) => {
    try {
      const result = await deleteEventAction(id);
      if (result.ok) {
        showToast(result.message || "Agenda berhasil dihapus.", "success");
        setDeleteConfirmId(null);
        await loadData();
      } else {
        showToast(result.message || "Gagal menghapus event.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menghapus event.", "error");
    }
  };

  // Save Academic PDF
  const handleSaveAcademicPdf = async () => {
    if (!pdfFormUrl) {
      showToast("Pilih atau unggah berkas PDF terlebih dahulu.", "error");
      return;
    }

    setIsSavingPdf(true);
    try {
      const result = await saveAcademicCalendarDocAction({
        fileUrl: pdfFormUrl,
        fileName: pdfFormName || "Kalender-Akademik-Resmi-UPITRA.pdf",
        fileSize: pdfFormSize || "PDF",
        academicYear: pdfFormYear || "2025/2026",
      });

      if (result.ok) {
        showToast(result.message || "Dokumen PDF kalender berhasil disimpan.", "success");
        setAcademicPdf(result.data as AcademicCalendarDoc);
      } else {
        showToast(result.message || "Gagal menyimpan PDF kalender.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menyimpan PDF.", "error");
    } finally {
      setIsSavingPdf(false);
    }
  };

  // Delete Academic PDF
  const handleDeleteAcademicPdf = async () => {
    setIsSavingPdf(true);
    try {
      const result = await deleteAcademicCalendarDocAction();
      if (result.ok) {
        showToast(result.message || "Dokumen PDF kalender berhasil dihapus.", "success");
        setAcademicPdf(null);
        setPdfFormUrl("");
        setPdfFormName("");
        setPdfFormSize("");
        setDeletePdfConfirm(false);
      } else {
        showToast(result.message || "Gagal menghapus PDF kalender.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menghapus PDF.", "error");
    } finally {
      setIsSavingPdf(false);
    }
  };

  // Save Header Banner
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBanner(true);
    try {
      const res = await savePageHeaderBannerAction("akademik", {
        title: bannerForm.title,
        description: bannerForm.description,
        imageUrl: bannerForm.imageUrl,
      });
      if (res.ok) {
        showToast(res.message || "Banner header akademik berhasil diperbarui.", "success");
      } else {
        showToast(res.message || "Gagal menyimpan banner header.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menyimpan banner.", "error");
    } finally {
      setIsSavingBanner(false);
    }
  };

  // Calendar Visual Helpers
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    calendarDays.push(d);
  }

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => {
      const s = e.start_date || (e.startDate ? e.startDate.split("T")[0] : "");
      const end = e.end_date || (e.endDate ? e.endDate.split("T")[0] : s);
      return dateStr >= s && dateStr <= end;
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all animate-in slide-in-from-top-4 ${
            toastType === "success"
              ? "bg-emerald-600 text-white"
              : toastType === "error"
              ? "bg-rose-600 text-white"
              : "bg-[#0b2545] text-white"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-200" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              CMS Akademik UPITRA
            </span>
            <span className="text-xs text-slate-400 font-medium">|</span>
            <span className="text-xs text-slate-500 font-semibold">Tahun Akademik 2025/2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            Manajemen Konten Akademik
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Kelola agenda kalender akademik, berkas PDF resmi rektorat, pengaturan header banner, serta penyesuaian konten fakultas dan program studi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/akademik"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Lihat Halaman Publik</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {activeTab === "calendar" && (
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Agenda Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Tab */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "calendar"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Kalender &amp; Dokumen PDF Resmi</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
            {events.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("banner")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "banner"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Pengaturan Header Banner</span>
        </button>

        <button
          onClick={() => setActiveTab("fakultas")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "fakultas"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Fakultas &amp; Program Studi</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700">
            4
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KALENDER & DOKUMEN PDF RESMI */}
      {/* ========================================================================= */}
      {activeTab === "calendar" && (
        <div className="space-y-8">
          {/* 1. KARTU UPLOAD DOKUMEN PDF KALENDER RESMI */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0b2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Dokumen Resmi SK Rektorat
                  </span>
                  <span className="text-xs text-slate-400">Format PDF Resmi</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                  <FileText className="w-6 h-6 text-sky-400" />
                  <span>Berkas PDF Kalender Akademik Resmi</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Unggah berkas PDF kalender akademik yang telah disahkan. Berkas ini akan langsung menjadi tujuan unduh utama pada tombol <strong>Download Kalender Akademik Disini</strong> di halaman publik <code>/akademik</code>.
                </p>
              </div>

              {academicPdf?.fileUrl && (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={academicPdf.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 text-xs font-bold border border-sky-400/30 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Pratinjau PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setDeletePdfConfirm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-400/30 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus Berkas</span>
                  </button>
                </div>
              )}
            </div>

            {/* Status Berkas Aktif */}
            {academicPdf?.fileUrl ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{academicPdf.fileName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                        TA {academicPdf.academicYear}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 flex flex-wrap items-center gap-3">
                      <span>Ukuran: {academicPdf.fileSize || "PDF Dokumen"}</span>
                      <span>•</span>
                      <span>Diperbarui: {academicPdf.updatedAt || "Baru saja"}</span>
                      <span>•</span>
                      <span className="text-emerald-300 font-medium">Status: Aktif di Halaman Publik</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 sm:text-right">
                  <span className="block text-[11px] text-slate-400">Tautan Berkas:</span>
                  <code className="text-sky-300 font-mono text-[11px] truncate max-w-[240px] inline-block">
                    {academicPdf.fileUrl}
                  </code>
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  Belum ada dokumen PDF resmi yang diunggah. Halaman publik saat ini menggunakan dokumen PDF dinamis bawaan generator sistem.
                </span>
              </div>
            )}

            {/* Form Ganti / Upload PDF */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200">
                {academicPdf?.fileUrl ? "Ganti Dokumen PDF Resmi" : "Unggah Dokumen PDF Resmi Baru"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <FileUploadField
                    label="Pilih Berkas PDF Resmi (Maksimal 20 MB)"
                    value={pdfFormUrl}
                    onChange={(url) => setPdfFormUrl(url)}
                    fileName={pdfFormName}
                    onFileNameChange={(name) => setPdfFormName(name)}
                    fileSize={pdfFormSize}
                    onFileSizeChange={(size) => setPdfFormSize(size)}
                    helperText="Hanya menerima format berkas PDF dengan validasi biner magic-bytes terverifikasi."
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Tahun Akademik
                    </label>
                    <select
                      value={pdfFormYear}
                      onChange={(e) => setPdfFormYear(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 px-3 py-2 rounded-xl text-white text-xs focus:outline-none focus:border-sky-400"
                    >
                      <option value="2024/2025">2024/2025</option>
                      <option value="2025/2026">2025/2026</option>
                      <option value="2026/2027">2026/2027</option>
                      <option value="2027/2028">2027/2028</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isSavingPdf || !pdfFormUrl}
                      onClick={handleSaveAcademicPdf}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isSavingPdf ? "Menyimpan..." : "Simpan Dokumen PDF Resmi"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. DAFTAR AGENDA KEGIATAN & KALENDER INTERAKTIF */}
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari agenda kegiatan, ujian, libur, lokasi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start lg:self-auto shrink-0">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "table"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Daftar Tabel</span>
                  </button>
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "calendar"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Tampilan Kalender</span>
                  </button>
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                {/* Filter Tahun Ajaran */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Tahun Ajaran
                  </label>
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    {academicYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Semester */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Semester
                  </label>
                  <select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    {semesters.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Kategori */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Kategori Event
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Status */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Status Agenda
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">Semua Status</option>
                    <option value="Mendatang">Mendatang</option>
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TABEL VIEW */}
            {viewMode === "table" && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
                      <tr>
                        <th className="py-4 px-5">Agenda / Kegiatan</th>
                        <th className="py-4 px-4">Tahun / Semester</th>
                        <th className="py-4 px-4">Rentang Waktu</th>
                        <th className="py-4 px-4">Kategori</th>
                        <th className="py-4 px-4 text-center">Status</th>
                        <th className="py-4 px-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEvents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            Tidak ada agenda kegiatan yang cocok dengan kriteria pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredEvents.map((ev) => (
                          <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5">
                              <div className="font-bold text-slate-900 text-sm">
                                {ev.title}
                              </div>
                              {ev.description && (
                                <p 
                                  className="text-xs text-slate-500 line-clamp-1 mt-0.5"
                                  dangerouslySetInnerHTML={{ __html: ev.description.replace(/<[^>]+>/g, " ") }}
                                />
                              )}
                              {ev.location && (
                                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3 text-rose-500" />
                                  <span>{ev.location}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-slate-800">{ev.academicYear || "2025/2026"}</div>
                              <div className="text-[11px] text-slate-500 font-medium">Semester {ev.semester || "Gasal"}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                <span>{ev.start_date}</span>
                              </div>
                              {ev.end_date && ev.end_date !== ev.start_date && (
                                <div className="text-[11px] text-slate-400 pl-5">
                                  s/d {ev.end_date}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                {ev.category || ev.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                  ev.status === "Mendatang"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : ev.status === "Berlangsung"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                              >
                                {ev.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(ev)}
                                  title="Edit Event"
                                  className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(ev.id)}
                                  title="Hapus Event"
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* KALENDER BULANAN VIEW */}
            {viewMode === "calendar" && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base sm:text-lg font-black text-[#06172e]">
                      {currentCalendarDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentCalendarDate(new Date(year, month - 1, 1))}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                      title="Bulan Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentCalendarDate(new Date())}
                      className="px-3 py-1 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      Hari Ini
                    </button>
                    <button
                      onClick={() => setCurrentCalendarDate(new Date(year, month + 1, 1))}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                      title="Bulan Berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((dayName) => (
                    <div
                      key={dayName}
                      className="py-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {dayName}
                    </div>
                  ))}

                  {calendarDays.map((day, idx) => {
                    const dayEvents = getEventsForDay(day);
                    const isToday =
                      day !== null &&
                      new Date().getDate() === day &&
                      new Date().getMonth() === month &&
                      new Date().getFullYear() === year;

                    return (
                      <div
                        key={idx}
                        className={`min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2 rounded-xl border text-xs transition-all ${
                          day
                            ? isToday
                              ? "bg-blue-50/50 border-blue-300 shadow-2xs"
                              : dayEvents.length > 0
                              ? "bg-slate-50/90 border-slate-200 hover:bg-slate-100"
                              : "bg-white border-slate-200 hover:bg-slate-50"
                            : "bg-slate-50/40 border-transparent pointer-events-none"
                        }`}
                      >
                        {day && (
                          <>
                            <div className="flex items-center justify-between mb-1.5">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isToday ? "bg-blue-600 text-white" : "text-slate-700"
                                }`}
                              >
                                {day}
                              </span>
                              {dayEvents.length > 0 && (
                                <span className="text-[10px] text-blue-600 font-bold">
                                  {dayEvents.length}
                                </span>
                              )}
                            </div>

                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((ev) => (
                                <div
                                  key={ev.id}
                                  onClick={() => handleOpenEdit(ev)}
                                  title={ev.title}
                                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white truncate cursor-pointer hover:bg-blue-700 transition-colors shadow-2xs"
                                >
                                  {ev.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-[9px] text-slate-500 font-medium pl-1">
                                  +{dayEvents.length - 2} agenda lainnya
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PENGATURAN HEADER BANNER */}
      {/* ========================================================================= */}
      {activeTab === "banner" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-[#06172e]">
              Pengaturan Header Banner Halaman /akademik
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sesuaikan judul utama, subjudul/deskripsi, dan foto cover latar belakang banner halaman Akademik.
            </p>
          </div>

          <form onSubmit={handleSaveBanner} className="space-y-5 max-w-3xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Utama Banner
              </label>
              <input
                type="text"
                required
                value={bannerForm.title}
                onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-800 text-sm font-bold focus:outline-none focus:border-blue-500 focus:bg-white"
                placeholder="Contoh: Akademik"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Deskripsi / Subjudul Banner (Mendukung Baris Baru)
              </label>
              <textarea
                rows={3}
                required
                value={bannerForm.description}
                onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                placeholder="Contoh: 4 Fakultas, 10 Program Studi S1&#10;&amp; D3 Keperawatan"
              />
            </div>

            <div>
              <ImageUploadField
                label="Foto Cover Latar Belakang (Resolusi Disarankan: 1440 x 480 px)"
                value={bannerForm.imageUrl}
                onChange={(url) => setBannerForm({ ...bannerForm, imageUrl: url })}
                recommendedSize="1440 x 480 piksel"
                helperText="Format gambar JPEG, PNG, atau WebP. Maksimal 5 MB."
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSavingBanner}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSavingBanner ? "Menyimpan Banner..." : "Simpan Perubahan Banner"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FAKULTAS & PROGRAM STUDI */}
      {/* ========================================================================= */}
      {activeTab === "fakultas" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-[#06172e]">
                Fakultas &amp; Program Studi yang Tampil di /akademik
              </h2>
              <p className="text-xs text-slate-500">
                Halaman /akademik menampilkan 4 fakultas unggulan UPITRA beserta tag program studi terakreditasi industri.
              </p>
            </div>

            <Link
              href="/admin/prodi"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Buka Modul Kurikulum &amp; Prodi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultFakultasOverview.map((fak) => (
              <div
                key={fak.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {fak.code}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{fak.slug}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#0b2545]">{fak.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{fak.desc}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {fak.prodiTags.map((prodi, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                      >
                        {prodi}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={fak.slug}
                    target="_blank"
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
                  >
                    <span>Kunjungi Rute Publik</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/admin/prodi"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    Kelola Prodi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL TAMBAH / EDIT EVENT */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#06172e]">
                    {form.id ? "Edit Agenda Kegiatan" : "Tambah Agenda Kegiatan Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lengkapi rincian tanggal, kategori, dan deskripsi rich text kegiatan akademik.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvent} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama / Judul Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: UAS Semester Gasal TA 2025/2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Ajaran *</label>
                  <select
                    value={form.academicYear || "2025/2026"}
                    onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="2024/2025">2024/2025</option>
                    <option value="2025/2026">2025/2026</option>
                    <option value="2026/2027">2026/2027</option>
                    <option value="2027/2028">2027/2028</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester *</label>
                  <select
                    value={form.semester || "Gasal"}
                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Gasal">Gasal</option>
                    <option value="Genap">Genap</option>
                    <option value="Antara">Antara</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Event *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {categories.filter((c) => c !== "Semua").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Event *</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Mendatang">Mendatang</option>
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Mulai *</label>
                  <input
                    type="date"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Selesai *</label>
                  <input
                    type="date"
                    required
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu / Jam Pelaksanaan</label>
                  <input
                    type="text"
                    placeholder="Misal: 08:00 - Selesai WIB"
                    value={form.event_time || ""}
                    onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    placeholder="Misal: Kampus UPITRA / Ruang Kelas / SIAKAD"
                    value={form.location || ""}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tautan Tambahan / Link Pendaftaran / SIAKAD (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="https://siakad.upitra.ac.id atau https://..."
                  value={form.registration_link || ""}
                  onChange={(e) => setForm({ ...form, registration_link: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* RICH TEXT EDITOR UNTUK DESKRIPSI EVENT */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rincian Deskripsi Kegiatan (Rich Text Editor)
                </label>
                <RichEditor
                  value={form.description || ""}
                  onChange={(content) => setForm({ ...form, description: content })}
                  height={180}
                  placeholder="Tuliskan keterangan detail agenda, ketentuan perkuliahan, peserta terkait, atau instruksi akademik..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={form.is_featured || false}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="is_featured" className="font-semibold text-slate-700 cursor-pointer">
                  Tandai sebagai Event Unggulan
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEvent}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingEvent ? "Menyimpan..." : "Simpan Agenda"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS EVENT */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#06172e]">Hapus Agenda Kegiatan?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Agenda ini akan dihapus dari kalender akademik universitas dan tidak lagi muncul di halaman publik.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteEvent(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS PDF KALENDER */}
      {deletePdfConfirm && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#06172e]">Hapus Dokumen PDF Resmi?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini akan mencabut dokumen PDF resmi saat ini. Tombol unduh di halaman publik akan otomatis beralih ke generator PDF kalender sistem.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeletePdfConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAcademicPdf}
                disabled={isSavingPdf}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSavingPdf ? "Menghapus..." : "Hapus Berkas PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
