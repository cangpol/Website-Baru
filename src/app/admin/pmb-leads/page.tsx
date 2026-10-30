"use client";

import { useState, useEffect } from "react";
import { 
  FileCheck2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  UserCheck, 
  UserX, 
  X,
  Phone,
  Mail,
  GraduationCap
} from "lucide-react";
import { initialAdminLeads, AdminLeadItem } from "@/lib/adminDataStore";
import { loadCrudCollection, saveCrudCollection, newCrudId } from "@/lib/adminCrudStore";

export default function AdminPmbLeadsPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>(initialAdminLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [prodiFilter, setProdiFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<AdminLeadItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSchool, setFormSchool] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formProdi, setFormProdi] = useState("S1 Informatika");
  const [formTargetYear, setFormTargetYear] = useState(2026);
  const [formStatus, setFormStatus] = useState<AdminLeadItem["status"]>("BARU_MASUK");
  const [formNotes, setFormNotes] = useState("");

  // Load from localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await loadCrudCollection<AdminLeadItem[]>("leads", initialAdminLeads);
        if (!cancelled) setLeads(Array.isArray(res.data) ? res.data : initialAdminLeads);
      } catch {
        if (!cancelled) setLeads(initialAdminLeads);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const saveToStorage = (updated: AdminLeadItem[]) => {
    saveCrudCollection<AdminLeadItem[]>("leads", updated, setLeads);
  };

  const handleOpenCreate = () => {
    setEditingLead(null);
    setFormName("");
    setFormPhone("08");
    setFormEmail("");
    setFormSchool("");
    setFormCity("Solo");
    setFormProdi("S1 Informatika");
    setFormTargetYear(2026);
    setFormStatus("BARU_MASUK");
    setFormNotes("");
    setModalOpen(true);
  };

  const handleOpenEdit = (lead: AdminLeadItem) => {
    setEditingLead(lead);
    setFormName(lead.fullName);
    setFormPhone(lead.phoneWhatsapp);
    setFormEmail(lead.email);
    setFormSchool(lead.highSchool);
    setFormCity(lead.city);
    setFormProdi(lead.programChoice);
    setFormTargetYear(lead.targetYear);
    setFormStatus(lead.status);
    setFormNotes(lead.notes);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    if (editingLead) {
      const updated = leads.map((l) =>
        l.id === editingLead.id
          ? {
              ...l,
              fullName: formName,
              phoneWhatsapp: formPhone,
              email: formEmail,
              highSchool: formSchool,
              city: formCity,
              programChoice: formProdi,
              targetYear: Number(formTargetYear),
              status: formStatus,
              notes: formNotes,
            }
          : l
      );
      saveToStorage(updated);
    } else {
      const newLead: AdminLeadItem = {
        id: newCrudId("lead"),
        fullName: formName,
        phoneWhatsapp: formPhone,
        email: formEmail,
        highSchool: formSchool,
        city: formCity,
        programChoice: formProdi,
        targetYear: Number(formTargetYear),
        status: formStatus,
        notes: formNotes,
        createdAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      };
      saveToStorage([newLead, ...leads]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  const handleQuickStatusChange = (id: string, newStatus: AdminLeadItem["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    saveToStorage(updated);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nama Lengkap", "Nomor WA", "Email", "Asal Sekolah", "Kota", "Pilihan Prodi", "Tahun Masuk", "Status", "Catatan", "Tanggal Masuk"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phoneWhatsapp}"`,
      `"${l.email}"`,
      `"${l.highSchool}"`,
      `"${l.city}"`,
      `"${l.programChoice}"`,
      l.targetYear,
      l.status,
      `"${l.notes.replace(/"/g, '""')}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data-PMB-Leads-UPITRA-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openWhatsApp = (phone: string, name: string, prodi: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "").replace(/^0/, "62");
    const message = encodeURIComponent(
      `Halo Kak ${name}, terima kasih telah berminat mendaftar di program studi ${prodi} Universitas Pignatelli Triputra (UPITRA) Surakarta TA 2026/2027. Apakah ada pertanyaan mengenai beasiswa atau jadwal tes yang bisa tim Admisi UPITRA bantu?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  // Filtered Leads
  const filtered = leads.filter((l) => {
    const matchSearch =
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.phoneWhatsapp.includes(search) ||
      l.highSchool.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || l.status === statusFilter;
    const matchProdi = prodiFilter === "ALL" || l.programChoice.includes(prodiFilter);
    return matchSearch && matchStatus && matchProdi;
  });

  const getStatusBadge = (status: AdminLeadItem["status"]) => {
    switch (status) {
      case "BARU_MASUK":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30"><Clock className="w-3 h-3" /> Baru Masuk</span>;
      case "DIHUBUNGI":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30"><MessageCircle className="w-3 h-3" /> Dihubungi</span>;
      case "WAWANCARA":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30"><GraduationCap className="w-3 h-3" /> Wawancara</span>;
      case "DITERIMA_BEASISWA":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"><Award className="w-3 h-3" /> Beasiswa</span>;
      case "ENROLLED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 border border-teal-500/30"><UserCheck className="w-3 h-3" /> Enrolled (NIM)</span>;
      case "BATAL":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30"><UserX className="w-3 h-3" /> Batal</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              PMB Admisi TA 2026/2027
            </span>
            <span className="text-xs text-slate-400">Total: {leads.length} Calon Mahasiswa</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileCheck2 className="w-7 h-7 text-amber-400" />
            Manajemen Pendaftaran PMB & Leads
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Data calon mahasiswa yang mengisi formulir minat, download brosur, maupun pendaftaran walk-in ke kampus UPITRA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium rounded-xl transition shadow-sm"
            title="Download CSV untuk Excel"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            Export CSV
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            Tambah Lead Walk-in
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-slate-400">Total Leads</p>
          <p className="text-xl font-bold text-white mt-1">{leads.length}</p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-blue-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Baru Masuk</p>
          <p className="text-xl font-bold text-blue-300 mt-1">
            {leads.filter((l) => l.status === "BARU_MASUK").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-amber-400 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Dihubungi</p>
          <p className="text-xl font-bold text-amber-300 mt-1">
            {leads.filter((l) => l.status === "DIHUBUNGI").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-purple-400 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Wawancara</p>
          <p className="text-xl font-bold text-purple-300 mt-1">
            {leads.filter((l) => l.status === "WAWANCARA").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-emerald-400 flex items-center gap-1"><Award className="w-3 h-3" /> Lolos Beasiswa</p>
          <p className="text-xl font-bold text-emerald-300 mt-1">
            {leads.filter((l) => l.status === "DITERIMA_BEASISWA").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-3.5 rounded-xl">
          <p className="text-xs text-teal-400 flex items-center gap-1"><UserCheck className="w-3 h-3" /> Enrolled (NIM)</p>
          <p className="text-xl font-bold text-teal-300 mt-1">
            {leads.filter((l) => l.status === "ENROLLED").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, WA, sekolah, atau kota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Semua Status</option>
            <option value="BARU_MASUK">Baru Masuk</option>
            <option value="DIHUBUNGI">Dihubungi</option>
            <option value="WAWANCARA">Wawancara</option>
            <option value="DITERIMA_BEASISWA">Diterima Beasiswa</option>
            <option value="ENROLLED">Enrolled (NIM)</option>
            <option value="BATAL">Batal</option>
          </select>

          {/* Prodi Filter */}
          <select
            value={prodiFilter}
            onChange={(e) => setProdiFilter(e.target.value)}
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Semua Program Studi</option>
            <option value="Informatika">Informatika</option>
            <option value="Sains Data">Sains Data</option>
            <option value="Rekayasa Perangkat Lunak">RPL</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Bisnis Digital">Bisnis Digital</option>
            <option value="Keselamatan & Kesehatan Kerja">K3</option>
            <option value="Pariwisata">Pariwisata</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#071322] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-blue-900/40">
              <tr>
                <th className="py-4 px-4">Calon Mahasiswa</th>
                <th className="py-4 px-4">Pilihan Prodi & TA</th>
                <th className="py-4 px-4">Kontak (WA & Email)</th>
                <th className="py-4 px-4">Status & Progres</th>
                <th className="py-4 px-4">Tanggal Masuk</th>
                <th className="py-4 px-4 text-right">Aksi & Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada data calon mahasiswa yang sesuai kriteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-950/20 transition group">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white group-hover:text-amber-300 transition">
                        {lead.fullName}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {lead.highSchool} • <span className="text-slate-300">{lead.city}</span>
                      </div>
                      {lead.notes && (
                        <div className="text-[11px] text-slate-400 italic mt-1 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                          Catatan: {lead.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-200">{lead.programChoice}</span>
                      <div className="text-xs text-amber-400/90 font-mono mt-0.5">
                        Target TA {lead.targetYear}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono">{lead.phoneWhatsapp}</span>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        <div>{getStatusBadge(lead.status)}</div>
                        {/* Quick Status Dropdown */}
                        <select
                          value={lead.status}
                          onChange={(e) => handleQuickStatusChange(lead.id, e.target.value as AdminLeadItem["status"])}
                          aria-label={`Ubah status untuk ${lead.fullName}`}
                          className="text-[11px] bg-[#071322] border border-blue-900/40 text-slate-300 rounded px-2 py-0.5 focus:outline-none focus:border-amber-400"
                        >
                          <option value="BARU_MASUK">Baru Masuk</option>
                          <option value="DIHUBUNGI">Dihubungi</option>
                          <option value="WAWANCARA">Wawancara</option>
                          <option value="DITERIMA_BEASISWA">Diterima Beasiswa</option>
                          <option value="ENROLLED">Enrolled (NIM)</option>
                          <option value="BATAL">Batal</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-slate-400">
                      {lead.createdAt}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openWhatsApp(lead.phoneWhatsapp, lead.fullName, lead.programChoice)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition"
                          title="Chat via WhatsApp Resmi"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(lead)}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition"
                          title="Edit Lead"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(lead.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                          title="Hapus Lead"
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

      {/* Modal Create / Edit Lead */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-amber-400" />
                {editingLead ? "Edit Data Calon Mahasiswa" : "Tambah Calon Mahasiswa Baru (Walk-in)"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Rian Anggoro"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Kota Domisili</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="Solo / Sukoharjo / dll"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Asal SMA / SMK</label>
                <input
                  type="text"
                  value={formSchool}
                  onChange={(e) => setFormSchool(e.target.value)}
                  placeholder="Contoh: SMA Regina Pacis Surakarta"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Pilihan Program Studi</label>
                  <select
                    value={formProdi}
                    onChange={(e) => setFormProdi(e.target.value)}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="S1 Informatika">S1 Informatika</option>
                    <option value="S1 Sains Data">S1 Sains Data</option>
                    <option value="S1 Rekayasa Perangkat Lunak">S1 Rekayasa Perangkat Lunak</option>
                    <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                    <option value="S1 Manajemen">S1 Manajemen</option>
                    <option value="S1 Akuntansi">S1 Akuntansi</option>
                    <option value="S1 Bisnis Digital">S1 Bisnis Digital</option>
                    <option value="S1 Keselamatan & Kesehatan Kerja (K3)">S1 K3</option>
                    <option value="S1 Pariwisata">S1 Pariwisata</option>
                    <option value="S1 Bahasa Inggris">S1 Bahasa Inggris</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Status Admisi</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminLeadItem["status"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="BARU_MASUK">Baru Masuk</option>
                    <option value="DIHUBUNGI">Dihubungi</option>
                    <option value="WAWANCARA">Wawancara</option>
                    <option value="DITERIMA_BEASISWA">Diterima Beasiswa</option>
                    <option value="ENROLLED">Enrolled (NIM)</option>
                    <option value="BATAL">Batal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Catatan / Minat Khusus</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Contoh: Mengajukan beasiswa penuh prestasi, ayah bekerja di Triputra, dll"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {editingLead ? "Simpan Perubahan" : "Tambahkan Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-rose-900/50 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              Hapus Data Calon Mahasiswa?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Data lead ini akan dihapus dari sistem. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition"
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

