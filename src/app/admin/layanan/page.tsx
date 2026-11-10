"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  HelpCircle,
  FileText,
  Download,
  AlertCircle,
  Eye,
  ImageIcon,
  Save,
  BookOpen,
  Laptop,
  Briefcase,
  Sparkles,
  Layers,
  ArrowUpDown
} from "lucide-react";
import { 
  getServiceItems, 
  saveServiceItemAction, 
  deleteServiceItemAction,
  getLayananFaqs,
  saveLayananFaqsAction,
  getPmbBrochureSetting,
  savePmbBrochureSettingAction,
  getDownloadDocs,
  saveDownloadDocAction,
  deleteDownloadDocAction
} from "@/server/services";
import { FaqItem, PmbBrochureSetting } from "@/lib/servicesTypes";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";
import RichEditor from "@/components/admin/RichEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { FileUploadField } from "@/components/admin/FileUploadField";

export interface AdminServiceItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  url?: string | null;
  description: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  attachmentSize?: string | null;
  icon?: string | null;
  order: number;
  isActive: boolean;
  version: number;
}

export interface AdminDownloadDoc {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSize?: string | null;
  downloadCount: number;
  version: number;
}

export default function AdminLayananPage() {
  const [activeTab, setActiveTab] = useState<"services" | "banner" | "faq" | "brochure">("services");

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── TAB 1: SERVICES STATE ──
  const [services, setServices] = useState<AdminServiceItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmittingService, setIsSubmittingService] = useState(false);

  // Service form fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Akademik");
  const [formTag, setFormTag] = useState("Layanan Kampus");
  const [formUrl, setFormUrl] = useState("https://");
  const [formIcon, setFormIcon] = useState("BookOpen");
  const [formDescription, setFormDescription] = useState("");
  const [formAttachmentUrl, setFormAttachmentUrl] = useState("");
  const [formAttachmentName, setFormAttachmentName] = useState("");
  const [formAttachmentSize, setFormAttachmentSize] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [formIsActive, setFormIsActive] = useState(true);

  // ── TAB 2: BANNER STATE ──
  const [bannerTitle, setBannerTitle] = useState("Layanan");
  const [bannerDesc, setBannerDesc] = useState(
    "Pusat Layanan Terpadu, Fasilitas Digital, Download Center & Portal Informasi Sivitas Akademika"
  );
  const [bannerImage, setBannerImage] = useState("/images/perpustakaan.jpg");
  const [isSavingBanner, setIsSavingBanner] = useState(false);

  // ── TAB 3: FAQ STATE ──
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const [faqCategory, setFaqCategory] = useState("Umum");
  const [isSavingFaqs, setIsSavingFaqs] = useState(false);

  // ── TAB 4: BROCHURE & DOWNLOADS STATE ──
  const [brochure, setBrochure] = useState<PmbBrochureSetting | null>(null);
  const [isSavingBrochure, setIsSavingBrochure] = useState(false);
  const [docs, setDocs] = useState<AdminDownloadDoc[]>([]);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<AdminDownloadDoc | null>(null);
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState("Brosur PMB");
  const [docFileUrl, setDocFileUrl] = useState("");
  const [docFileSize, setDocFileSize] = useState("");
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);

  // ── LOAD INITIAL DATA ──
  const loadServices = async () => {
    try {
      const data = await getServiceItems(false);
      setServices(
        data.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category || "Umum",
          tag: s.tag || "Layanan Kampus",
          url: s.url,
          description: s.description,
          attachmentUrl: s.attachmentUrl,
          attachmentName: s.attachmentName,
          attachmentSize: s.attachmentSize,
          icon: s.icon,
          order: s.order,
          isActive: s.isActive,
          version: s.version,
        }))
      );
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  const loadBanner = async () => {
    try {
      const b = await getPageHeaderBanner("layanan");
      if (b) {
        setBannerTitle(b.title || "Layanan");
        setBannerDesc(b.description || "");
        if (b.imageUrl) setBannerImage(b.imageUrl);
      }
    } catch (err) {
      console.error("Error loading banner:", err);
    }
  };

  const loadFaqs = async () => {
    try {
      const data = await getLayananFaqs();
      setFaqs(data);
    } catch (err) {
      console.error("Error loading FAQs:", err);
    }
  };

  const loadBrochureAndDocs = async () => {
    try {
      const b = await getPmbBrochureSetting();
      setBrochure(b);
      const d = await getDownloadDocs();
      setDocs(d);
    } catch (err) {
      console.error("Error loading brochure & docs:", err);
    }
  };

  useEffect(() => {
    loadServices();
    loadBanner();
    loadFaqs();
    loadBrochureAndDocs();
  }, []);

  // ── SERVICE HANDLERS ──
  const handleOpenCreateService = () => {
    setEditingService(null);
    setFormName("");
    setFormCategory("Akademik");
    setFormTag("Layanan Kampus");
    setFormUrl("https://");
    setFormIcon("BookOpen");
    setFormDescription("");
    setFormAttachmentUrl("");
    setFormAttachmentName("");
    setFormAttachmentSize("");
    setFormOrder(services.length + 1);
    setFormIsActive(true);
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (item: AdminServiceItem) => {
    setEditingService(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormTag(item.tag);
    setFormUrl(item.url || "");
    setFormIcon(item.icon || "BookOpen");
    setFormDescription(item.description);
    setFormAttachmentUrl(item.attachmentUrl || "");
    setFormAttachmentName(item.attachmentName || "");
    setFormAttachmentSize(item.attachmentSize || "");
    setFormOrder(item.order);
    setFormIsActive(item.isActive);
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast("Nama layanan wajib diisi.", "error");
      return;
    }

    setIsSubmittingService(true);
    try {
      const res = await saveServiceItemAction(editingService ? editingService.id : null, {
        name: formName.trim(),
        description: formDescription,
        category: formCategory,
        tag: formTag,
        url: formUrl.trim() || null,
        icon: formIcon,
        attachmentUrl: formAttachmentUrl || null,
        attachmentName: formAttachmentName || null,
        attachmentSize: formAttachmentSize || null,
        order: Number(formOrder),
        isActive: formIsActive,
        version: editingService ? editingService.version : 1,
      });

      if (res.ok) {
        showToast(res.message);
        setServiceModalOpen(false);
        await loadServices();
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Terjadi kesalahan saat menyimpan layanan.", "error");
    } finally {
      setIsSubmittingService(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res = await deleteServiceItemAction(id);
      if (res.ok) {
        showToast(res.message);
        setDeleteConfirmId(null);
        await loadServices();
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menghapus layanan.", "error");
    }
  };

  // ── BANNER HANDLER ──
  const handleSaveBanner = async () => {
    setIsSavingBanner(true);
    try {
      const res = await savePageHeaderBannerAction("layanan", {
        title: bannerTitle,
        description: bannerDesc,
        imageUrl: bannerImage,
      });
      if (res.ok) {
        showToast(res.message);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menyimpan banner layanan.", "error");
    } finally {
      setIsSavingBanner(false);
    }
  };

  // ── FAQ HANDLERS ──
  const handleOpenCreateFaq = () => {
    setEditingFaq(null);
    setFaqQ("");
    setFaqA("");
    setFaqCategory("Umum");
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFaqQ(faq.q);
    setFaqA(faq.a);
    setFaqCategory(faq.category || "Umum");
    setFaqModalOpen(true);
  };

  const handleSaveFaqModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ.trim() || !faqA.trim()) {
      showToast("Pertanyaan dan jawaban FAQ wajib diisi.", "error");
      return;
    }

    let updatedList: FaqItem[];
    if (editingFaq) {
      updatedList = faqs.map((f) =>
        f.id === editingFaq.id ? { ...f, q: faqQ.trim(), a: faqA.trim(), category: faqCategory } : f
      );
    } else {
      updatedList = [
        ...faqs,
        {
          id: `faq-${Date.now()}`,
          q: faqQ.trim(),
          a: faqA.trim(),
          category: faqCategory,
          order: faqs.length + 1,
        },
      ];
    }

    setIsSavingFaqs(true);
    try {
      const res = await saveLayananFaqsAction(updatedList);
      if (res.ok) {
        showToast(res.message);
        setFaqs(updatedList);
        setFaqModalOpen(false);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menyimpan FAQ.", "error");
    } finally {
      setIsSavingFaqs(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    const updatedList = faqs.filter((f) => f.id !== id);
    try {
      const res = await saveLayananFaqsAction(updatedList);
      if (res.ok) {
        showToast("FAQ berhasil dihapus.");
        setFaqs(updatedList);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menghapus FAQ.", "error");
    }
  };

  // ── BROCHURE & DOCS HANDLERS ──
  const handleSaveBrochure = async () => {
    if (!brochure) return;
    setIsSavingBrochure(true);
    try {
      const res = await savePmbBrochureSettingAction(brochure);
      if (res.ok) {
        showToast(res.message);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menyimpan brosur PMB.", "error");
    } finally {
      setIsSavingBrochure(false);
    }
  };

  const handleOpenCreateDoc = () => {
    setEditingDoc(null);
    setDocTitle("");
    setDocCategory("Brosur PMB");
    setDocFileUrl("");
    setDocFileSize("");
    setDocModalOpen(true);
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docFileUrl) {
      showToast("Judul dan file dokumen wajib diisi.", "error");
      return;
    }

    setIsSubmittingDoc(true);
    try {
      const res = await saveDownloadDocAction(editingDoc ? editingDoc.id : null, {
        title: docTitle.trim(),
        category: docCategory,
        fileUrl: docFileUrl,
        fileSize: docFileSize || "1.2 MB",
        version: editingDoc ? editingDoc.version : 1,
      });

      if (res.ok) {
        showToast(res.message);
        setDocModalOpen(false);
        const refreshed = await getDownloadDocs();
        setDocs(refreshed);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menyimpan dokumen.", "error");
    } finally {
      setIsSubmittingDoc(false);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      const res = await deleteDownloadDocAction(id);
      if (res.ok) {
        showToast(res.message);
        const refreshed = await getDownloadDocs();
        setDocs(refreshed);
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Gagal menghapus dokumen.", "error");
    }
  };

  // Filtered services
  const filteredServices = services.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "ALL" || s.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Menu Layanan</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola kotak layanan digital, banner header, FAQ interaktif, dan download center brosur resmi kampus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/layanan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Lihat Halaman Publik</span>
          </a>
        </div>
      </div>

      {/* Navigasi Tab */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "services"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Layanan Utama ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("banner")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "banner"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Header Banner Layanan</span>
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "faq"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ Layanan ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("brochure")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "brochure"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Brosur PMB &amp; Unduhan</span>
        </button>
      </div>

      {/* ── TAB 1: LAYANAN UTAMA (SERVICES) ── */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-hidden"
              >
                <option value="ALL">Semua Kategori</option>
                <option value="Akademik">Akademik</option>
                <option value="Karir">Karir &amp; Alumni</option>
                <option value="Perpustakaan">Perpustakaan</option>
                <option value="Umum">Umum</option>
              </select>
            </div>

            <button
              onClick={handleOpenCreateService}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Layanan Baru</span>
            </button>
          </div>

          {/* Tabel Layanan */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Urutan</th>
                    <th className="py-3 px-4">Nama Layanan</th>
                    <th className="py-3 px-4">Tag / Kategori</th>
                    <th className="py-3 px-4">Tautan Portal</th>
                    <th className="py-3 px-4">Formulir Lampiran</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        Belum ada layanan yang sesuai.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-700">{item.order}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                          <div className="truncate">{item.name}</div>
                          <div
                            className="text-[11px] text-slate-500 font-normal truncate mt-0.5"
                            dangerouslySetInnerHTML={{ __html: item.description || "Tidak ada deskripsi" }}
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[10px]">
                            {item.tag}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:underline max-w-[150px] truncate"
                            >
                              <span className="truncate">{item.url}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {item.attachmentUrl ? (
                            <a
                              href={item.attachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[120px]">
                                {item.attachmentName || "Formulir"}
                              </span>
                            </a>
                          ) : (
                            <span className="text-slate-400">Tidak ada</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {item.isActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditService(item)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Layanan"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus Layanan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </div>
      )}

      {/* ── TAB 2: HEADER BANNER LAYANAN ── */}
      {activeTab === "banner" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Header Banner Halaman /layanan</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesuaikan judul, deskripsi sambutan, dan gambar latar belakang banner utama di halaman Layanan.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Banner</label>
              <input
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi / Subjudul</label>
              <textarea
                rows={3}
                value={bannerDesc}
                onChange={(e) => setBannerDesc(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-700 leading-relaxed"
              />
            </div>

            <div>
              <ImageUploadField
                label="Foto Latar Belakang (Edge-to-Edge 1440x480)"
                value={bannerImage}
                onChange={(url: string) => setBannerImage(url)}
                helperText="Format JPEG, PNG, atau WebP. Maksimal 5 MB."
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveBanner}
                disabled={isSavingBanner}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingBanner ? "Menyimpan..." : "Simpan Pengaturan Banner"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: FAQ LAYANAN TERPADU ── */}
      {activeTab === "faq" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">FAQ Layanan &amp; PMB</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pertanyaan yang sering diajukan sivitas dan calon mahasiswa baru pada halaman publik /layanan.
              </p>
            </div>

            <button
              onClick={handleOpenCreateFaq}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pertanyaan FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {faq.category || "Umum"}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{faq.q}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  className="text-xs text-slate-600 pl-9 leading-relaxed prose prose-xs max-w-none"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: BROSUR PMB & UNDUHAN ── */}
      {activeTab === "brochure" && (
        <div className="space-y-8">
          {/* Section Brosur PMB */}
          {brochure && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-4xl shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Brosur PMB Utama
                </span>
                <h2 className="text-base font-black text-slate-900 mt-1">
                  Pengaturan Kartu Brosur PMB Resmi
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kartu unduhan brosur interaktif dengan pratinjau yang tampil di bawah 4 kotak layanan publik.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Judul Brosur</label>
                  <input
                    type="text"
                    value={brochure.title}
                    onChange={(e) => setBrochure({ ...brochure, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul / Metadata</label>
                  <input
                    type="text"
                    value={brochure.subTitle}
                    onChange={(e) => setBrochure({ ...brochure, subTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Brosur</label>
                  <textarea
                    rows={2}
                    value={brochure.description}
                    onChange={(e) => setBrochure({ ...brochure, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <FileUploadField
                    label="Upload Berkas PDF Brosur Resmi"
                    value={brochure.pdfUrl}
                    fileName={brochure.fileName}
                    fileSize={brochure.fileSize}
                    onChange={(url: string, name?: string, size?: string) =>
                      setBrochure({
                        ...brochure,
                        pdfUrl: url,
                        fileName: name || brochure.fileName,
                        fileSize: size || brochure.fileSize,
                      })
                    }
                    helperText="Berkas format PDF. Maksimal 20 MB."
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Foto Sampul Brosur (Cover Preview)"
                    value={brochure.coverImage}
                    onChange={(url: string) => setBrochure({ ...brochure, coverImage: url })}
                    helperText="Foto halaman depan brosur (JPEG/PNG/WebP)."
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveBrochure}
                  disabled={isSavingBrochure}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingBrochure ? "Menyimpan..." : "Simpan Brosur PMB"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Section Dokumen Download Center */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Download Center Layanan</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daftar dokumen akademik, formulir kemahasiswaan, panduan, dan SK Rektor yang dapat diunduh.
                </p>
              </div>

              <button
                onClick={handleOpenCreateDoc}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Dokumen Baru</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Judul Dokumen</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Ukuran</th>
                    <th className="py-3 px-4">Diunduh</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {docs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400">
                        Belum ada dokumen yang diunggah.
                      </td>
                    </tr>
                  ) : (
                    docs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline text-blue-700"
                            >
                              {doc.title}
                            </a>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[10px]">
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-500">
                          {doc.fileSize || "1.2 MB"}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {doc.downloadCount} kali
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: TAMBAH / EDIT LAYANAN UTAMA ── */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingService ? "Ubah Layanan Kampus" : "Tambah Layanan Baru"}
              </h2>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Layanan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Perpustakaan Daring (SIPER)"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Karir">Karir &amp; Alumni</option>
                    <option value="Perpustakaan">Perpustakaan</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tag Badge (Label Kecil)
                  </label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    placeholder="Contoh: Sumber Belajar / Program Unggulan"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tautan URL Portal Layanan
                  </label>
                  <input
                    type="text"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://siper.upitra.ac.id"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Deskripsi Layanan (Rich Text)
                  </label>
                  <RichEditor
                    value={formDescription}
                    onChange={(html) => setFormDescription(html)}
                    placeholder="Tuliskan gambaran fasilitas dan layanan..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadField
                    label="Upload Berkas Formulir / Panduan Layanan (Opsional)"
                    value={formAttachmentUrl}
                    fileName={formAttachmentName}
                    fileSize={formAttachmentSize}
                    onChange={(url: string, name?: string, size?: string) => {
                      setFormAttachmentUrl(url);
                      setFormAttachmentName(name || "");
                      setFormAttachmentSize(size || "");
                    }}
                    helperText="Dokumen formulir pengajuan/panduan (PDF)."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Tampil</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded-sm"
                  />
                  <label htmlFor="isActiveCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Layanan Aktif (Tampil di Publik)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingService}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmittingService ? "Menyimpan..." : "Simpan Layanan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: FAQ CREATE / EDIT ── */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingFaq ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
              </h2>
              <button
                onClick={() => setFaqModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaqModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori FAQ
                </label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium"
                >
                  <option value="Umum">Umum</option>
                  <option value="PMB">PMB &amp; Beasiswa</option>
                  <option value="Akademik">Akademik &amp; LMS</option>
                  <option value="Perpustakaan">Perpustakaan</option>
                  <option value="Karir">Karir &amp; Magang</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pertanyaan (Question) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="Contoh: Bagaimana cara mengakses Perpustakaan Daring?"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jawaban (Answer) <span className="text-rose-500">*</span>
                </label>
                <RichEditor
                  value={faqA}
                  onChange={(html) => setFaqA(html)}
                  placeholder="Tuliskan jawaban yang jelas dan lengkap..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingFaqs}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingFaqs ? "Menyimpan..." : "Simpan FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD DOKUMEN DOWNLOAD CENTER ── */}
      {docModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">Upload Dokumen Baru</h2>
              <button
                onClick={() => setDocModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Dokumen <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="Contoh: Formulir Cuti Akademik 2026"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Dokumen</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium"
                >
                  <option value="Brosur PMB">Brosur PMB</option>
                  <option value="Formulir Akademik">Formulir Akademik</option>
                  <option value="Panduan">Buku Panduan</option>
                  <option value="SK Rektor">SK Rektor &amp; Kebijakan</option>
                </select>
              </div>

              <div>
                <FileUploadField
                  label="Pilih File Dokumen (PDF)"
                  required
                  value={docFileUrl}
                  fileName={docTitle}
                  fileSize={docFileSize}
                  onChange={(url: string, name?: string, size?: string) => {
                    setDocFileUrl(url);
                    if (size) setDocFileSize(size);
                    if (!docTitle && name) setDocTitle(name.replace(/\.[^/.]+$/, ""));
                  }}
                  helperText="Berkas resmi (PDF maks 20 MB)."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDocModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDoc}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmittingDoc ? "Menyimpan..." : "Simpan Dokumen"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DIALOG KONFIRMASI HAPUS ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Hapus Layanan?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini akan menghapus entri layanan dari daftar publik dan membersihkan berkas lampiran terkait.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteService(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
