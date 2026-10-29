"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Calendar,
  User,
  Share2
} from "lucide-react";
import Image from "next/image";
import { initialAdminArticles, AdminArticleItem } from "@/lib/adminDataStore";

export default function AdminBeritaPage() {
  const [articles, setArticles] = useState<AdminArticleItem[]>(initialAdminArticles);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminArticleItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<AdminArticleItem["category"]>("Berita Kampus");
  const [formSummary, setFormSummary] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("/images/ar-vr.jpg");
  const [formAuthor, setFormAuthor] = useState("Humas UPITRA");
  const [formPublished, setFormPublished] = useState(true);

  // Load from localStorage & sync URL tab
  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_articles");
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch {}
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "pengumuman") {
        setCategoryFilter("Pengumuman");
      }
    }
  }, []);

  const saveToStorage = (updated: AdminArticleItem[]) => {
    setArticles(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("upitra_admin_articles", JSON.stringify(updated));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Berita Kampus");
    setFormSummary("");
    setFormContent("");
    setFormCoverImage("/images/ar-vr.jpg");
    setFormAuthor("Humas UPITRA");
    setFormPublished(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (art: AdminArticleItem) => {
    setEditingArticle(art);
    setFormTitle(art.title);
    setFormSlug(art.slug);
    setFormCategory(art.category);
    setFormSummary(art.summary);
    setFormContent(art.content);
    setFormCoverImage(art.coverImage);
    setFormAuthor(art.author);
    setFormPublished(art.published);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSlug.trim()) return;

    if (editingArticle) {
      const updated = articles.map((a) =>
        a.id === editingArticle.id
          ? {
              ...a,
              title: formTitle,
              slug: formSlug,
              category: formCategory,
              summary: formSummary,
              content: formContent,
              coverImage: formCoverImage,
              author: formAuthor,
              published: formPublished,
            }
          : a
      );
      saveToStorage(updated);
    } else {
      const newArticle: AdminArticleItem = {
        id: `art-${Date.now().toString().slice(-4)}`,
        title: formTitle,
        slug: formSlug,
        category: formCategory,
        summary: formSummary,
        content: formContent,
        coverImage: formCoverImage,
        author: formAuthor,
        published: formPublished,
        publishedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        viewCount: 1,
      };
      saveToStorage([newArticle, ...articles]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  const togglePublish = (id: string) => {
    const updated = articles.map((a) =>
      a.id === id ? { ...a, published: !a.published } : a
    );
    saveToStorage(updated);
  };

  // Filtered
  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || a.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalViews = articles.reduce((acc, curr) => acc + curr.viewCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
              Publikasi & Humas
            </span>
            <span className="text-xs text-slate-400">Total: {articles.length} Artikel</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-sky-400" />
            Manajemen Berita & Pengumuman
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola publikasi berita kampus, inovasi riset, prestasi mahasiswa, dan rilis media resmi UPITRA.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Tulis Artikel Baru
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-slate-400">Total Artikel</p>
          <p className="text-2xl font-bold text-white mt-1">{articles.length}</p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-emerald-400">Terbit (Live)</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">
            {articles.filter((a) => a.published).length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-amber-400">Draf</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">
            {articles.filter((a) => !a.published).length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-sky-400">Total Pembaca (Views)</p>
          <p className="text-2xl font-bold text-sky-300 mt-1">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul berita atau topik..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter kategori berita"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="Berita Kampus">Berita Kampus</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Inovasi & Riset">Inovasi & Riset</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Kegiatan">Kegiatan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#071322] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-blue-900/40">
              <tr>
                <th className="py-4 px-4">Artikel & Ringkasan</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Penulis & Tanggal</th>
                <th className="py-4 px-4">Views</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Tidak ada artikel yang sesuai kriteria.
                  </td>
                </tr>
              ) : (
                filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-blue-950/20 transition group">
                    <td className="py-4 px-4 max-w-md">
                      <div className="flex items-start gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-blue-900/50 bg-slate-900">
                          <Image
                            src={art.coverImage}
                            alt={art.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-sky-300 transition line-clamp-1">
                            {art.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                            {art.summary}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-1">
                            /berita/{art.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{art.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{art.publishedAt}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                        <Eye className="w-3.5 h-3.5 text-sky-400" />
                        <span>{art.viewCount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => togglePublish(art.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                          art.published
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                            : "bg-slate-700/40 text-slate-400 border-slate-600 hover:bg-slate-700/60"
                        }`}
                      >
                        {art.published ? "Live (Terbit)" : "Draf"}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/berita`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition"
                          title="Lihat di Berita UPITRA"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(art.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                          title="Hapus Artikel"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                {editingArticle ? "Edit Artikel Berita" : "Tulis Artikel Baru"}
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (!editingArticle) {
                      setFormSlug(generateSlug(e.target.value));
                    }
                  }}
                  placeholder="Contoh: Mahasiswa UPITRA Sabet Juara 1 Hackathon Nasional 2026"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm font-mono text-sky-300 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminArticleItem["category"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Berita Kampus">Berita Kampus</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Inovasi & Riset">Inovasi & Riset</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Penulis / Unit</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Path Cover Gambar</label>
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Ringkasan Singkat (Lead Paragraph)</label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita di beranda..."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Isi Konten Lengkap</label>
                <textarea
                  rows={6}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Tuliskan berita lengkap di sini..."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-status"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 bg-[#071322] border-blue-900"
                />
                <label htmlFor="pub-status" className="text-xs text-slate-300 font-medium">
                  Terbitkan langsung (Publish Live ke Website)
                </label>
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
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {editingArticle ? "Simpan Perubahan" : "Terbitkan Artikel"}
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
              Hapus Artikel Berita?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Artikel ini akan dihapus dari portal berita UPITRA. Tindakan ini tidak dapat dibatalkan.
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

