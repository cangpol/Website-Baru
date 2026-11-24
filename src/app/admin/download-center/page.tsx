"use client";

import { swalConfirmDelete, swalToast } from "@/lib/swal";
import { useState, useEffect } from "react";
import { 
  Download, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Eye,
  FileCheck,
  Calendar
} from "lucide-react";
import { getDownloadDocs, saveDownloadDocAction, deleteDownloadDocAction } from "@/server/services";
import { FileUploadField } from "@/components/admin/FileUploadField";

export interface AdminDownloadItem {
  id: string;
  title: string;
  category: string;
  fileName?: string;
  fileSize?: string | null;
  fileUrl: string;
  previewUrl?: string;
  downloadCount?: number;
  uploadedAt?: string;
  updatedAt?: string;
  version?: number;
}

export default function AdminDownloadCenterPage() {
  const [downloads, setDownloads] = useState<AdminDownloadItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminDownloadItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<AdminDownloadItem["category"]>("Brosur PMB");
  const [formFileName, setFormFileName] = useState("");
  const [formFileSize, setFormFileSize] = useState("3.5 MB");
  const [formFileUrl, setFormFileUrl] = useState("/images/hero-1.jpg");
  const [formPreviewUrl, setFormPreviewUrl] = useState("/images/hero-1.jpg");

  const loadData = async () => {
    try {
      const data = await getDownloadDocs();
      const mapped: AdminDownloadItem[] = data.map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        fileUrl: d.fileUrl,
        fileName: d.title,
        fileSize: d.fileSize,
        downloadCount: d.downloadCount,
        version: d.version,
      }));
      setDownloads(mapped);
    } catch (err) {
      console.error("Error loading downloads:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [saving, setSaving] = useState(false);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormCategory("Brosur PMB");
    setFormFileName("Brosur-Resmi-UPITRA.pdf");
    setFormFileSize("3.5 MB");
    setFormFileUrl("/images/hero-1.jpg");
    setFormPreviewUrl("/images/hero-1.jpg");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminDownloadItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormFileName(item.fileName || item.title);
    setFormFileSize(item.fileSize || "3.5 MB");
    setFormFileUrl(item.fileUrl);
    setFormPreviewUrl(item.previewUrl || "/images/hero-1.jpg");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formFileUrl.trim()) {
      swalToast("Judul dan berkas dokumen wajib diisi.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await saveDownloadDocAction(editingItem?.id ?? null, {
        title: formTitle.trim(),
        category: formCategory,
        fileUrl: formFileUrl,
        fileSize: formFileSize || null,
        version: editingItem?.version ?? 1,
      });
      if (!res.ok) {
        swalToast(res.message || "Gagal menyimpan dokumen.", "error");
        return;
      }
      setModalOpen(false);
      await loadData();
      swalToast(res.message || "Dokumen berhasil disimpan.", "success");
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan dokumen.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDownloadDocAction(id);
      if (res.ok) {
        await loadData();
        swalToast(res.message, "success");
      } else {
        swalToast(res.message, "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menghapus dokumen.", "error");
    }
  };

  const totalDownloads = downloads.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);

  // Filtered
  const filtered = downloads.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.fileName || "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || d.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
              Download Center & E-Brosur
            </span>
            <span className="text-xs text-slate-400">Total: {downloads.length} Dokumen</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Download className="w-7 h-7 text-sky-400" />
            Manajemen Download Center & Brosur
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola file PDF e-brosur, panduan beasiswa, kurikulum program studi, dan berkas akademik yang dapat diunduh publik.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-slate-950 font-semibold text-sm rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          Tambah Dokumen Brosur
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-slate-400">Total Dokumen PDF</p>
          <p className="text-2xl font-bold text-white mt-1">{downloads.length}</p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-sky-400">Total Unduhan Pengunjung</p>
          <p className="text-2xl font-bold text-sky-300 mt-1">{totalDownloads.toLocaleString()}</p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-sky-400">Brosur PMB Utama</p>
          <p className="text-2xl font-bold text-sky-300 mt-1">
            {downloads.filter((d) => d.category === "Brosur PMB").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-sky-400">E-Brosur Fakultas</p>
          <p className="text-2xl font-bold text-sky-300 mt-1">
            {downloads.filter((d) => d.category.includes("Fakultas")).length}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul brosur atau nama file..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter kategori brosur dan dokumen"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Brosur PMB">Brosur PMB</option>
            <option value="Fakultas Sains & Teknologi">Fakultas Sains & Teknologi</option>
            <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi & Bisnis</option>
            <option value="Fakultas Sosial Humaniora">Fakultas Sosial Humaniora</option>
            <option value="Fakultas Kesehatan">Fakultas Kesehatan</option>
            <option value="Panduan Akademik">Panduan Akademik</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#071322] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-blue-900/40">
              <tr>
                <th className="py-4 px-4">Judul Dokumen & File</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Ukuran File</th>
                <th className="py-4 px-4">Total Diunduh</th>
                <th className="py-4 px-4">Pembaruan</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada dokumen yang sesuai kriteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-950/20 transition group">
                    <td className="py-4 px-4 max-w-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-sky-300 transition">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {item.fileName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-300">
                      {item.fileSize}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400">
                        <Download className="w-3.5 h-3.5" />
                        <span>{(item.downloadCount || 0).toLocaleString()}x</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-slate-400">
                      {item.updatedAt || "-"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition"
                          title="Buka / Download File"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition"
                          title="Edit Dokumen"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => { if (await swalConfirmDelete()) handleDelete(item.id); }}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition"
                          title="Hapus Dokumen"
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

      {/* Modal Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-sky-400" />
                {editingItem ? "Edit Dokumen Brosur" : "Tambah Dokumen Brosur Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Judul Dokumen Brosur *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: E-Brosur Resmi PMB UPITRA TA 2026/2027"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori Dokumen</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminDownloadItem["category"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Brosur PMB">Brosur PMB</option>
                    <option value="Fakultas Sains & Teknologi">Fakultas Sains & Teknologi</option>
                    <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi & Bisnis</option>
                    <option value="Fakultas Sosial Humaniora">Fakultas Sosial Humaniora</option>
                    <option value="Fakultas Kesehatan">Fakultas Kesehatan</option>
                    <option value="Panduan Akademik">Panduan Akademik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama File Fisik</label>
                  <input
                    type="text"
                    required
                    value={formFileName}
                    onChange={(e) => setFormFileName(e.target.value)}
                    placeholder="Brosur-Resmi-UPITRA.pdf"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm font-mono text-sky-300 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Ukuran File</label>
                  <input
                    type="text"
                    value={formFileSize}
                    onChange={(e) => setFormFileSize(e.target.value)}
                    placeholder="3.5 MB"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Path / URL File</label>
                  <input
                    type="text"
                    required
                    value={formFileUrl}
                    onChange={(e) => setFormFileUrl(e.target.value)}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">URL Thumbnail / Cover Preview</label>
                <input
                  type="text"
                  value={formPreviewUrl}
                  onChange={(e) => setFormPreviewUrl(e.target.value)}
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-slate-950 font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Dokumen"}
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

