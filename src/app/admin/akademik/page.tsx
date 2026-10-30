"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Tag,
  List,
  Layers
} from "lucide-react";
import { initialAdminCalendarEvents, AdminCalendarEvent } from "@/lib/adminDataStore";

const categories = [
  "Semua",
  "Akademik",
  "Seminar",
  "Workshop",
  "Ujian",
  "Libur",
  "Wisuda",
  "Kompetisi",
  "Festival",
  "Expo",
  "Kemahasiswaan",
  "Umum"
];

const colorOptions = [
  { value: "blue", label: "Biru UPITRA", cls: "bg-blue-600 text-white" },
  { value: "sky", label: "Langit Cerah", cls: "bg-sky-500 text-white" },
  { value: "emerald", label: "Hijau Emerald", cls: "bg-emerald-600 text-white" },
  { value: "amber", label: "Amber / Kuning", cls: "bg-amber-500 text-white" },
  { value: "rose", label: "Merah / Rose", cls: "bg-rose-500 text-white" },
  { value: "purple", label: "Ungu Elegan", cls: "bg-purple-600 text-white" },
];

const emptyForm: AdminCalendarEvent = {
  id: "",
  name: "",
  title: "",
  category: "Seminar",
  start_date: new Date().toISOString().split("T")[0],
  end_date: new Date().toISOString().split("T")[0],
  event_time: "09:00 - 12:00 WIB",
  location: "Auditorium Lantai 3 UPITRA",
  organizer: "Universitas Pignatelli Triputra",
  registration_link: "",
  status: "Mendatang",
  description: "",
  color: "blue",
  all_day: false,
  is_featured: false,
  sort_order: 1,
};

export default function AdminAkademikCalendarPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "kurikulum">("calendar");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminCalendarEvent | null>(null);
  const [form, setForm] = useState<AdminCalendarEvent>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  // Calendar Visual View State
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  // Load from LocalStorage or seed initial data
  useEffect(() => {
    const saved = localStorage.getItem("upitra_academic_events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
          return;
        }
      } catch {}
    }
    setEvents(initialAdminCalendarEvents);
    localStorage.setItem("upitra_academic_events", JSON.stringify(initialAdminCalendarEvents));
  }, []);

  const saveToStorage = (updated: AdminCalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem("upitra_academic_events", JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const titleMatch = (ev.title || ev.name || "").toLowerCase().includes(search.toLowerCase());
      const locMatch = (ev.location || "").toLowerCase().includes(search.toLowerCase());
      const orgMatch = (ev.organizer || "").toLowerCase().includes(search.toLowerCase());
      const matchesSearch = titleMatch || locMatch || orgMatch;

      const matchesCat = filterCategory === "Semua" || ev.category === filterCategory;
      const matchesStatus = filterStatus === "all" || ev.status === filterStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [events, search, filterCategory, filterStatus]);

  // KPIs
  const kpis = useMemo(() => {
    return {
      total: events.length,
      upcoming: events.filter((e) => e.status === "Mendatang").length,
      ongoing: events.filter((e) => e.status === "Berlangsung").length,
      completed: events.filter((e) => e.status === "Selesai").length,
    };
  }, [events]);

  // Form Handlers
  const handleOpenCreate = () => {
    setEditingEvent(null);
    setForm({
      ...emptyForm,
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (ev: AdminCalendarEvent) => {
    setEditingEvent(ev);
    setForm({
      ...ev,
      title: ev.title || ev.name,
      name: ev.name || ev.title || "",
      start_date: ev.start_date || new Date().toISOString().split("T")[0],
      end_date: ev.end_date || ev.start_date || new Date().toISOString().split("T")[0],
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const eventName = form.title?.trim() || form.name?.trim();
    if (!eventName || !form.start_date) {
      alert("Judul event dan tanggal mulai wajib diisi.");
      return;
    }

    const payload: AdminCalendarEvent = {
      ...form,
      name: eventName,
      title: eventName,
      end_date: form.end_date || form.start_date,
    };

    if (editingEvent) {
      const updated = events.map((ev) => (ev.id === editingEvent.id ? { ...payload, id: editingEvent.id } : ev));
      saveToStorage(updated);
      showToast("Event kampus berhasil diperbarui!");
    } else {
      const newId = `ev-${Date.now().toString().slice(-6)}`;
      const newEvent: AdminCalendarEvent = {
        ...payload,
        id: newId,
      };
      saveToStorage([newEvent, ...events]);
      showToast("Event kampus baru berhasil ditambahkan!");
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string | number) => {
    const updated = events.filter((e) => e.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
    showToast("Event kampus berhasil dihapus.");
  };

  // Calendar Days Calculation
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Convert so Monday is 0: (day + 6) % 7
  const startDayOffset = (firstDayOfWeek + 6) % 7;

  const calendarDays = useMemo(() => {
    const list: (number | null)[] = [];
    for (let i = 0; i < startDayOffset; i++) {
      list.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      list.push(d);
    }
    return list;
  }, [startDayOffset, daysInMonth]);

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const targetDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((ev) => {
      const start = ev.start_date;
      const end = ev.end_date || ev.start_date;
      return targetDateStr >= start && targetDateStr <= end;
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/30 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header: Executive Blue & White */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 uppercase tracking-wider">
              Manajemen Akademik
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Total {events.length} Agenda Kegiatan
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-blue-600" />
            Calender Academic &amp; Event Kampus
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Pusat kendali agenda akademik, jadwal seminar, workshop keahlian, evaluasi ujian, hari libur nasional, dan acara kampus UPITRA.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Event Kampus</span>
          </button>
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "calendar"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-[#06172e] hover:bg-slate-100"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Calender Academic</span>
        </button>
      </div>

      {/* KPI Counters Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Event</div>
          <div className="text-2xl font-black text-[#06172e] mt-1">{kpis.total}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Seluruh agenda tercatat</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Mendatang</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{kpis.upcoming}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Segera terlaksana</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Berlangsung</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{kpis.ongoing}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Aktif saat ini</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Selesai</div>
          <div className="text-2xl font-black text-slate-700 mt-1">{kpis.completed}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Arsip kegiatan lampau</div>
        </div>
      </div>

      {/* Controls & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Search & Filter */}
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-2.5 w-full">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul event, lokasi, atau penyelenggara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-44 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "Semua" ? "Semua Kategori" : c}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-40 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="Mendatang">Mendatang</option>
            <option value="Berlangsung">Berlangsung</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto shrink-0 border border-slate-200">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "table" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Tabel</span>
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === "calendar" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Kalender</span>
          </button>
        </div>
      </div>

      {/* Main Content: TABLE VIEW */}
      {viewMode === "table" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4">Event &amp; Penyelenggara</th>
                  <th className="py-3.5 px-4">Waktu &amp; Lokasi</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Tidak ada agenda event yang sesuai dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((ev, idx) => (
                    <tr key={ev.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#06172e] flex items-center gap-1.5">
                          <span>{ev.title || ev.name}</span>
                          {ev.is_featured && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-blue-600" />
                          <span>{ev.organizer || "Universitas Pignatelli Triputra"}</span>
                        </div>
                        {ev.registration_link && (
                          <a
                            href={ev.registration_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mt-1 font-medium"
                          >
                            <span>Link Pendaftaran</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {new Date(ev.start_date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {ev.end_date && ev.end_date !== ev.start_date && (
                              <>
                                {" "}s/d{" "}
                                {new Date(ev.end_date).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </>
                            )}
                          </span>
                        </div>
                        {ev.event_time && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{ev.event_time}</span>
                          </div>
                        )}
                        {ev.location && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span className="line-clamp-1">{ev.location}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {ev.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
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
                      <td className="py-3.5 px-4 text-right">
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

      {/* Main Content: CALENDAR VISUAL VIEW */}
      {viewMode === "calendar" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          {/* Calendar Header Switcher */}
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

          {/* Grid Table */}
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
                            {dayEvents.length} event
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            onClick={() => handleOpenEdit(ev)}
                            title={ev.title || ev.name}
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white truncate cursor-pointer hover:bg-blue-700 transition-colors shadow-2xs"
                          >
                            {ev.title || ev.name}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[9.5px] text-slate-500 font-medium pl-1">
                            +{dayEvents.length - 2} lagi...
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

      {/* Modal Form Tambah / Edit Event */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#06172e] flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  <span>{editingEvent ? "Edit Event Kampus" : "Tambah Event Kampus Baru"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lengkapi data agenda kegiatan untuk ditampilkan di kalender akademik dan beranda.
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Event / Nama Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Seminar Nasional Transformasi Digital AI 2026"
                  value={form.title || form.name}
                  onChange={(e) => setForm({ ...form, title: e.target.value, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Event *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
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
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
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
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
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
                    placeholder="Misal: 09:00 - 12:30 WIB"
                    value={form.event_time || ""}
                    onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penyelenggara</label>
                  <input
                    type="text"
                    placeholder="Misal: BEM UPITRA / Fakultas Sains"
                    value={form.organizer || ""}
                    onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lokasi Event</label>
                <input
                  type="text"
                  placeholder="Misal: Auditorium UPITRA Lt. 3 / Zoom Online"
                  value={form.location || ""}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Pendaftaran / RSVP (URL)</label>
                <input
                  type="text"
                  placeholder="https://bit.ly/... atau https://forms.gle/..."
                  value={form.registration_link || ""}
                  onChange={(e) => setForm({ ...form, registration_link: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Kegiatan</label>
                <textarea
                  rows={3}
                  placeholder="Rincian informasi agenda, pembicara, dan tujuan kegiatan..."
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
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
                  Tandai sebagai Event Unggulan (Tampil di Beranda Utama)
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#06172e]">Hapus Event Kampus?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan. Agenda kegiatan ini akan dihapus permanen dari kalender sistem.
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
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
