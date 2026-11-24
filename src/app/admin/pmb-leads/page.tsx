"use client";

import { EmptyState, LoadingState, useModalKeys } from "@/components/admin/crud-ui";
import { swalToast, swalConfirmDelete } from "@/lib/swal";
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
import { 
  getAdmissionLeads, 
  updateLeadStatusAction, 
  softDeleteLeadAction,
  saveLeadAction,
  exportLeadsCsvAction
} from "@/server/leads";
import { AdmissionStatus } from "@prisma/client";

export interface AdminLeadItem {
  id: string;
  fullName: string;
  name?: string;
  phoneWhatsapp: string;
  phone?: string;
  email: string;
  highSchool: string;
  school?: string;
  city?: string | null;
  targetYear: number;
  programChoice?: string;
  programName?: string;
  prodi?: string;
  status: any;
  notes?: string | null;
  source?: string | null;
  createdAt: string;
  date?: string;
}

// Status di tampilan admin <-> enum database.
const UI_TO_DB: Record<string, AdmissionStatus> = {
  BARU_MASUK: "LEAD_SUBMITTED",
  DIHUBUNGI: "CONTACTED",
  WAWANCARA: "SCHEDULED_INTERVIEW",
  DITERIMA_BEASISWA: "ACCEPTED",
  ENROLLED: "ENROLLED",
  BATAL: "REJECTED",
};
const DB_TO_UI: Record<string, string> = Object.fromEntries(Object.entries(UI_TO_DB).map(([ui, db]) => [db, ui]));

export default function AdminPmbLeadsPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [prodiFilter, setProdiFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useModalKeys(modalOpen, () => setModalOpen(false));
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

  // Load from Database
  const loadData = async () => {
    try {
      const data = await getAdmissionLeads();
      const mapped: AdminLeadItem[] = data.map((l) => ({
        ...l,
        status: DB_TO_UI[l.status] ?? l.status,
        name: l.fullName,
        phone: l.phoneWhatsapp,
        school: l.highSchool,
        prodi: l.programName,
        date: l.createdAt.split("T")[0],
      }));
      setLeads(mapped);
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [saving, setSaving] = useState(false);

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
    setFormName(lead.fullName || lead.name || "");
    setFormPhone(lead.phoneWhatsapp || lead.phone || "");
    setFormEmail(lead.email || "");
    setFormSchool(lead.highSchool || lead.school || "");
    setFormCity(lead.city || "");
    setFormProdi(lead.programChoice || lead.programName || lead.prodi || "");
    setFormTargetYear(lead.targetYear || 2026);
    setFormStatus(lead.status || "BARU_MASUK");
    setFormNotes(lead.notes || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      swalToast("Nama dan nomor WhatsApp wajib diisi.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await saveLeadAction(editingLead?.id ?? null, {
        fullName: formName,
        phoneWhatsapp: formPhone,
        email: formEmail,
        highSchool: formSchool,
        city: formCity,
        targetYear: Number(formTargetYear),
        programName: formProdi,
        status: UI_TO_DB[formStatus] ?? "LEAD_SUBMITTED",
        notes: formNotes,
      });
      if (!res.ok) {
        swalToast(res.message || "Gagal menyimpan data.", "error");
        return;
      }
      setModalOpen(false);
      await loadData();
      swalToast(res.message, "success");
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await softDeleteLeadAction(id);
      if (res.ok) {
        await loadData();
        swalToast(res.message, "success");
      } else {
        swalToast(res.message, "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menghapus data.", "error");
    }
  };

  const handleQuickStatusChange = async (id: string, newStatus: AdminLeadItem["status"]) => {
    try {
      const res = await updateLeadStatusAction(id, UI_TO_DB[newStatus] ?? "LEAD_SUBMITTED");
      if (res.ok) {
        await loadData();
        swalToast("Status calon mahasiswa diperbarui.", "success");
      } else {
        swalToast(("message" in res && res.message) || "Gagal memperbarui status.", "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat memperbarui status.", "error");
    }
  };

  const exportToCSV = async () => {
    try {
      const res = await exportLeadsCsvAction();
      if (!res.ok || !res.csv) {
        swalToast(res.message || "Gagal mengekspor data CSV.");
        return;
      }
      const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", res.filename || "Leads-PMB-UPITRA.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      swalToast("Terjadi kesalahan saat mengekspor data CSV.");
    }
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
      (l.fullName || l.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.phoneWhatsapp || l.phone || "").includes(search) ||
      (l.highSchool || l.school || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.city || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || l.status === statusFilter;
    const prodiVal = l.programChoice || l.programName || l.prodi || "";
    const matchProdi = prodiFilter === "ALL" || prodiVal.includes(prodiFilter);
    return matchSearch && matchStatus && matchProdi;
  });

  const getStatusBadge = (status: AdminLeadItem["status"]) => {
    switch (status) {
      case "BARU_MASUK":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><Clock className="w-3 h-3" /> Baru Masuk</span>;
      case "DIHUBUNGI":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><MessageCircle className="w-3 h-3" /> Dihubungi</span>;
      case "WAWANCARA":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><GraduationCap className="w-3 h-3" /> Wawancara</span>;
      case "DITERIMA_BEASISWA":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><Award className="w-3 h-3" /> Beasiswa</span>;
      case "ENROLLED":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><UserCheck className="w-3 h-3" /> Enrolled (NIM)</span>;
      case "BATAL":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200"><UserX className="w-3 h-3" /> Batal</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-blue-100 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 border border-blue-200 uppercase tracking-wider">
              PMB Admisi TA 2026/2027
            </span>
            <span className="text-xs text-slate-500">Total: {leads.length} Calon Mahasiswa</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileCheck2 className="w-7 h-7 text-blue-600" />
            Manajemen Pendaftaran PMB & Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Data calon mahasiswa yang mengisi formulir minat, download brosur, maupun pendaftaran walk-in ke kampus UPITRA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 hover:bg-blue-100 text-slate-700 border border-blue-100 text-sm font-medium rounded-xl transition shadow-sm"
            title="Download CSV untuk Excel"
          >
            <Download className="w-4 h-4 text-blue-600" />
            Export CSV
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-white" />
            Tambah Lead Walk-in
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-slate-500">Total Leads</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{leads.length}</p>
        </div>
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-blue-600 flex items-center gap-1"><Clock className="w-3 h-3" /> Baru Masuk</p>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {leads.filter((l) => l.status === "BARU_MASUK").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-blue-600 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Dihubungi</p>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {leads.filter((l) => l.status === "DIHUBUNGI").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-blue-600 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Wawancara</p>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {leads.filter((l) => l.status === "WAWANCARA").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-blue-600 flex items-center gap-1"><Award className="w-3 h-3" /> Lolos Beasiswa</p>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {leads.filter((l) => l.status === "DITERIMA_BEASISWA").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-3.5 rounded-xl">
          <p className="text-xs text-blue-600 flex items-center gap-1"><UserCheck className="w-3 h-3" /> Enrolled (NIM)</p>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {leads.filter((l) => l.status === "ENROLLED").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, WA, sekolah, atau kota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 pl-9 pr-4 py-2 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-400"
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
            className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-400"
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
      <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-blue-100">
              <tr>
                <th className="py-4 px-4">Calon Mahasiswa</th>
                <th className="py-4 px-4">Pilihan Prodi & TA</th>
                <th className="py-4 px-4">Kontak (WA & Email)</th>
                <th className="py-4 px-4">Status & Progres</th>
                <th className="py-4 px-4">Tanggal Masuk</th>
                <th className="py-4 px-4 text-right">Aksi & Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    Tidak ada data calon mahasiswa yang sesuai kriteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50 transition group">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                        {lead.fullName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {lead.highSchool} • <span className="text-slate-700">{lead.city}</span>
                      </div>
                      {lead.notes && (
                        <div className="text-[11px] text-slate-500 italic mt-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          Catatan: {lead.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-700">{lead.programChoice}</span>
                      <div className="text-xs text-sky-400/90 font-mono mt-0.5">
                        Target TA {lead.targetYear}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-mono">{lead.phoneWhatsapp}</span>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
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
                          className="text-[11px] bg-blue-50 border border-blue-100 text-slate-700 rounded px-2 py-0.5 focus:outline-none focus:border-sky-400"
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
                    <td className="py-4 px-4 text-xs font-mono text-slate-500">
                      {lead.createdAt}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openWhatsApp(lead.phoneWhatsapp || lead.phone || "", lead.fullName || lead.name || "", lead.programChoice || lead.programName || "")}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-sky-500/20 transition"
                          title="Chat via WhatsApp Resmi"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(lead)}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition"
                          title="Edit Lead"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => { if (await swalConfirmDelete()) handleDelete(lead.id); }}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition"
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
      {!loaded && <LoadingState />}
      {loaded && filtered.length === 0 && (
        <EmptyState
          title={leads.length === 0 ? "Belum ada calon mahasiswa" : "Tidak ada hasil yang cocok"}
          hint={leads.length === 0 ? "Klik tombol di bawah untuk menambahkan data pertama." : "Coba ubah kata kunci pencarian atau filter yang dipakai."}
          actionLabel={leads.length === 0 ? "Tambah Calon Mahasiswa" : undefined}
          onAction={handleOpenCreate}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="bg-white border border-blue-200 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-100 bg-blue-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                {editingLead ? "Edit Data Calon Mahasiswa" : "Tambah Calon Mahasiswa Baru (Walk-in)"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-blue-50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Rian Anggoro"
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Kota Domisili</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="Solo / Sukoharjo / dll"
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Asal SMA / SMK</label>
                <input
                  type="text"
                  value={formSchool}
                  onChange={(e) => setFormSchool(e.target.value)}
                  placeholder="Contoh: SMA Regina Pacis Surakarta"
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Pilihan Program Studi</label>
                  <select
                    value={formProdi}
                    onChange={(e) => setFormProdi(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
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
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Status Admisi</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminLeadItem["status"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
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
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Catatan / Minat Khusus</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Contoh: Mengajukan beasiswa penuh prestasi, ayah bekerja di Triputra, dll"
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-3 border-t border-blue-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-blue-50 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-500/20"
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
    </div>
  );
}

