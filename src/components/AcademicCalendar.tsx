"use client";

import { useState } from "react";
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
  {
    id: 1,
    name: "Perkuliahan Semester Genap Dimulai",
    start_date: "2026-02-02",
    end_date: "2026-02-02",
    category: "Akademik",
    description: "Awal perkuliahan efektif semester genap TA 2025/2026 bagi seluruh mahasiswa aktif.",
    all_day: true,
  },
  {
    id: 2,
    name: "UTS Semester Genap",
    start_date: "2026-03-16",
    end_date: "2026-03-27",
    category: "Ujian",
    description: "Ujian Tengah Semester Genap untuk seluruh mata kuliah teori, studi kasus, dan praktikum.",
    all_day: true,
  },
  {
    id: 3,
    name: "Libur Hari Raya Idul Fitri",
    start_date: "2026-03-20",
    end_date: "2026-03-25",
    category: "Libur",
    description: "Libur nasional dan cuti bersama Hari Raya Idul Fitri 1447 H bagi seluruh sivitas akademika.",
    all_day: true,
  },
  {
    id: 4,
    name: "PMB Gelombang 1",
    start_date: "2026-04-01",
    end_date: "2026-06-30",
    category: "PMB",
    description: "Penerimaan Mahasiswa Baru Gelombang 1 dengan beasiswa prestasi dan jalur kemitraan industri Triputra.",
    all_day: true,
  },
  {
    id: 5,
    name: "Wisuda Periode April",
    start_date: "2026-04-15",
    end_date: "2026-04-15",
    category: "Wisuda",
    description: "Rapat Terbuka Senat Universitas Pignatelli Triputra dalam rangka Wisuda Sarjana dan Diploma Periode I Tahun 2026.",
    all_day: true,
  },
  {
    id: 6,
    name: "UAS Semester Genap",
    start_date: "2026-05-18",
    end_date: "2026-05-29",
    category: "Ujian",
    description: "Ujian Akhir Semester Genap TA 2025/2026 penentu kelulusan dan evaluasi pencapaian kompetensi OBE.",
    all_day: true,
  },
  {
    id: 7,
    name: "Libur Semester Genap",
    start_date: "2026-06-01",
    end_date: "2026-07-31",
    category: "Libur",
    description: "Libur akhir semester genap, penerbitan KHS online, serta periode persiapan Program Magang Immersion 3+1.",
    all_day: true,
  },
  {
    id: 8,
    name: "Perkuliahan Semester Ganjil Dimulai",
    start_date: "2026-08-03",
    end_date: "2026-08-03",
    category: "Akademik",
    description: "Awal perkuliahan efektif semester ganjil TA 2026/2027 bagi mahasiswa baru dan angkatan lanjutan.",
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
  // Set default view to current month or event month (e.g., April 2026 / current date)
  const [currentDate, setCurrentDate] = useState(() => {
    // Default to the month of the current year or initial sample (e.g. 2026-03)
    return new Date(2026, 2, 1); // Maret 2026 as standard start
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 2, 1)); // Reset to active calendar semester
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
    return events.filter(e => {
      return dateStr >= e.start_date && dateStr <= e.end_date;
    });
  };

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
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="px-3 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Hari Ini
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
                  const isToday = false; // can match with real today if desired

                  return (
                    <div
                      key={idx}
                      className={`min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                        cell.isCurrentMonth
                          ? "bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs"
                          : "bg-slate-50/60 border-slate-100 text-slate-400 opacity-60"
                      } ${isToday ? "ring-2 ring-blue-500 bg-blue-50/20" : ""}`}
                    >
                      {/* Date Number */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-bold ${
                            cell.isCurrentMonth ? "text-slate-800" : "text-slate-400"
                          }`}
                        >
                          {cell.dayNum}
                        </span>
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
          /* 4. CALENDAR CONTENT: LIST VIEW */
          <div className="p-6 divide-y divide-slate-100">
            {events.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                Tidak ada agenda kegiatan akademik pada semester ini.
              </div>
            ) : (
              events.map((ev) => {
                const catKey = ev.category.toLowerCase();
                const style = categoryColors[catKey] || categoryColors.akademik;

                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 px-4 rounded-2xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 ${style.bg} shadow-sm`}
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}
                          >
                            {ev.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors">
                          {ev.name}
                        </h4>
                        {ev.description && (
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {ev.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 sm:text-right">
                      <div className="text-xs text-slate-600 font-medium">
                        <div>{formatDateIndo(ev.start_date)}</div>
                        {ev.end_date && ev.end_date !== ev.start_date && (
                          <div className="text-[11px] text-slate-400">
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
        )}
      </div>

      {/* 4. DOWNLOAD KALENDER AKADEMIK BAR (SEPANJANG KALENDER) */}
      <div className="w-full bg-gradient-to-r from-[#06172e] via-[#0b2545] to-[#0c4a6e] rounded-3xl p-6 sm:p-7 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl border border-blue-900/50">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-400 shrink-0 border border-white/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-sky-300 uppercase tracking-widest block">
              Pedoman Resmi Kalender Akademik Tahun {year}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Download Kalender Akademik Disini
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Unduh kalender akademik format PDF lengkap 12 bulan (Januari – Desember {year}) beserta rincian jadwal kegiatan perkuliahan, evaluasi hasil belajar, dan wisuda.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => generateAcademicCalendarPdf(year, events)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all shrink-0 hover:scale-[1.02] cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Kalender ({year}) PDF</span>
        </button>
      </div>

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

