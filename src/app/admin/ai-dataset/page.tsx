"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  Bot, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Tag, 
  HelpCircle, 
  MessageSquare, 
  Send, 
  ArrowRight, 
  Layers,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import initialDatasetRaw from "@/data/upitraAiKnowledge.json";
import { searchAiKnowledge, KnowledgeItem } from "@/lib/aiAssistantService";

export interface AIDatasetItem {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  updatedAt?: string;
}

const defaultPopularCategories = [
  "pmb",
  "beasiswa",
  "akademik",
  "fakultas",
  "fasilitas",
  "magang",
  "rektorat",
  "kontak",
  "biaya",
  "umum"
];

const emptyForm: AIDatasetItem = {
  id: "",
  category: "pmb",
  question: "",
  keywords: [],
  answer: "",
};

export default function AdminAiDatasetPage() {
  const [dataset, setDataset] = useState<AIDatasetItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AIDatasetItem | null>(null);
  const [formData, setFormData] = useState<AIDatasetItem>(emptyForm);
  const [keywordInput, setKeywordInput] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Live Tester Modal State
  const [isTesterOpen, setIsTesterOpen] = useState(false);
  const [testQuery, setTestQuery] = useState("");
  const [testResult, setTestResult] = useState<{
    reply: string;
    answered: boolean;
    confidence: number;
    matchedQuestion?: string;
  } | null>(null);
  const [testHistory, setTestHistory] = useState<Array<{ query: string; reply: string; answered: boolean; confidence: number }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load dataset from localStorage or initial fallback
  useEffect(() => {
    const saved = localStorage.getItem("upitra_ai_dataset");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDataset(parsed);
          return;
        }
      } catch {}
    }
    // Initial fallback from JSON
    const initialFormatted: AIDatasetItem[] = (initialDatasetRaw as KnowledgeItem[]).map((item) => ({
      id: item.id || `qa-${Math.random().toString(36).substring(2, 8)}`,
      category: item.category || "umum",
      question: item.question || "Pertanyaan",
      keywords: Array.isArray(item.keywords) ? item.keywords : [],
      answer: item.answer || "",
      updatedAt: "Bawaan Sistem"
    }));
    setDataset(initialFormatted);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveDatasetToStorage = (updated: AIDatasetItem[]) => {
    setDataset(updated);
    localStorage.setItem("upitra_ai_dataset", JSON.stringify(updated));
  };

  // Categories extraction
  const categories = useMemo(() => {
    const set = new Set<string>();
    dataset.forEach((item) => {
      if (item.category) set.add(item.category.toLowerCase());
    });
    return Array.from(set).sort();
  }, [dataset]);

  // Filtered dataset
  const filteredDataset = useMemo(() => {
    return dataset.filter((item) => {
      const matchCategory = selectedCategory === "all" || (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());
      const queryLower = search.toLowerCase().trim();
      const matchSearch =
        queryLower === "" ||
        item.question.toLowerCase().includes(queryLower) ||
        item.answer.toLowerCase().includes(queryLower) ||
        (Array.isArray(item.keywords) && item.keywords.some((k) => k.toLowerCase().includes(queryLower))) ||
        (item.category && item.category.toLowerCase().includes(queryLower));

      return matchCategory && matchSearch;
    });
  }, [dataset, selectedCategory, search]);

  // Pagination
  const totalPages = Math.ceil(filteredDataset.length / pageSize) || 1;
  const paginatedDataset = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDataset.slice(start, start + pageSize);
  }, [filteredDataset, currentPage, pageSize]);

  // Form Handlers
  const handleOpenCreate = () => {
    setEditingItem(null);
    setKeywordInput("");
    setFormData({
      ...emptyForm,
      id: `qa-${Date.now().toString().slice(-6)}`,
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: AIDatasetItem) => {
    setEditingItem(item);
    setKeywordInput("");
    setFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim().toLowerCase();
    if (trimmed && !formData.keywords.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, trimmed]
      }));
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((kw) => kw !== kwToRemove)
    }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert("Pertanyaan dan Jawaban wajib diisi.");
      return;
    }

    const payload: AIDatasetItem = {
      ...formData,
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      category: formData.category.trim().toLowerCase() || "umum",
      keywords: formData.keywords.length > 0 ? formData.keywords : [formData.question.trim().toLowerCase()],
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    };

    if (editingItem) {
      const updated = dataset.map((item) => (item.id === editingItem.id ? payload : item));
      saveDatasetToStorage(updated);
      showToast("Entri Q&A berhasil diperbarui!");
    } else {
      saveDatasetToStorage([payload, ...dataset]);
      showToast("Entri Q&A baru berhasil ditambahkan!");
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = dataset.filter((item) => item.id !== id);
    saveDatasetToStorage(updated);
    setDeleteConfirmId(null);
    showToast("Entri Q&A berhasil dihapus.");
  };

  const handleResetToDefault = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset seluruh dataset ke basis pengetahuan resmi UPITRA (100+ entri default)? Data kustom yang tidak di-export akan tertimpa.")) {
      const initialFormatted: AIDatasetItem[] = (initialDatasetRaw as KnowledgeItem[]).map((item) => ({
        id: item.id || `qa-${Math.random().toString(36).substring(2, 8)}`,
        category: item.category || "umum",
        question: item.question || "Pertanyaan",
        keywords: Array.isArray(item.keywords) ? item.keywords : [],
        answer: item.answer || "",
        updatedAt: "Bawaan Sistem"
      }));
      saveDatasetToStorage(initialFormatted);
      showToast("Dataset berhasil di-reset ke basis data resmi UPITRA.");
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `upitra-ai-dataset-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Dataset berhasil di-export ke file JSON!");
  };

  // Import JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: AIDatasetItem[] = parsed.map((item, idx) => ({
            id: item.id || `qa-imp-${idx}-${Date.now().toString().slice(-4)}`,
            category: item.category || "umum",
            question: item.question || item.pertanyaan || "Pertanyaan",
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            answer: item.answer || item.jawaban || "",
            updatedAt: "Diimpor"
          }));
          saveDatasetToStorage(formatted);
          showToast(`Berhasil mengimpor ${formatted.length} entri dataset!`);
        } else {
          alert("Format file JSON tidak sesuai. Harus berupa array data Q&A.");
        }
      } catch {
        alert("Gagal membaca file JSON. Pastikan format file valid.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Tester Simulator
  const handleRunTest = (queryToTest?: string) => {
    const q = queryToTest || testQuery;
    if (!q.trim()) return;

    const result = searchAiKnowledge(q, dataset as KnowledgeItem[]);
    setTestResult(result);
    setTestHistory((prev) => [
      { query: q, reply: result.reply, answered: result.answered, confidence: result.confidence },
      ...prev.slice(0, 4)
    ]);
  };

  const handleOpenTesterWithItem = (item: AIDatasetItem) => {
    setTestQuery(item.question);
    setIsTesterOpen(true);
    setTimeout(() => {
      handleRunTest(item.question);
    }, 100);
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "pmb":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "beasiswa":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "akademik":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "fakultas":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "magang":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rektorat":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "fasilitas":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 select-none font-sans text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#06172e] text-white shadow-xl border border-blue-500/30 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER HALAMAN: AI Dataset Assistant UPITRA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Chat Assistant UPITRA</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">Knowledge Base Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            Manajemen AI Dataset (Q&amp;A Assistant)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola basis pengetahuan, variasi kata kunci, dan jawaban otomatis untuk melayani calon mahasiswa &amp; civitas akademika 24/7.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          
          <button
            onClick={() => setIsTesterOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="Buka Simulator Uji Coba AI"
          >
            <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
            <span>Uji Respon AI</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="Download Dataset JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="Unggah / Timpa Dataset JSON"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Import JSON</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 shadow-2xs transition-all cursor-pointer"
            title="Reset ke Dataset Bawaan UPITRA"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Q&amp;A Baru</span>
          </button>

        </div>
      </div>

      {/* 2. KARTU STATISTIK KPI DATASET (Biru & Putih) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Entri Q&amp;A</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {dataset.length}
          </div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            Pertanyaan aktif terverifikasi
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kategori Topik</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {categories.length}
          </div>
          <div className="text-[11px] text-sky-600 font-semibold mt-1">
            PMB, Beasiswa, 3+1, Fasilitas
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Kata Kunci</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {dataset.reduce((acc, curr) => acc + (Array.isArray(curr.keywords) ? curr.keywords.length : 0), 0)}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            Sinonim &amp; variasi pencarian
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Status Chatbot</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#06172e] tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online 24/7</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Live di portal publik website
          </div>
        </div>

      </div>

      {/* 3. FILTER, PENCARIAN & KATEGORI BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari pertanyaan, kata kunci, kategori, atau jawaban..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Page Size Selector */}
          <div className="flex items-center gap-2 shrink-0 text-xs text-slate-600">
            <span>Tampilkan:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white font-bold text-xs focus:outline-hidden cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Semua ({dataset.length})
          </button>

          {categories.map((cat) => {
            const count = dataset.filter((d) => d.category && d.category.toLowerCase() === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* 4. TABEL UTAMA Q&A DATASET */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                <th className="py-3.5 px-4 w-12 text-center">No</th>
                <th className="py-3.5 px-4 min-w-[200px]">Pertanyaan / Topik</th>
                <th className="py-3.5 px-4 w-32">Kategori</th>
                <th className="py-3.5 px-4 min-w-[220px]">Kata Kunci (Keywords)</th>
                <th className="py-3.5 px-4 min-w-[280px]">Cuplikan Jawaban AI</th>
                <th className="py-3.5 px-4 w-28 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedDataset.length > 0 ? (
                paginatedDataset.map((item, index) => {
                  const itemIndex = (currentPage - 1) * pageSize + index + 1;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        {itemIndex}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#06172e] group-hover:text-blue-600 transition-colors">
                          {item.question}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: {item.id}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getCategoryBadgeColor(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {Array.isArray(item.keywords) && item.keywords.length > 0 ? (
                            item.keywords.slice(0, 4).map((kw, kwIdx) => (
                              <span
                                key={kwIdx}
                                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                              >
                                {kw}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Tanpa kata kunci</span>
                          )}
                          {Array.isArray(item.keywords) && item.keywords.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-600 bg-blue-50">
                              +{item.keywords.length - 4}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11.5px]">
                          {item.answer}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenTesterWithItem(item)}
                            title="Uji coba pertanyaan ini pada simulator AI"
                            className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Q&A"
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            title="Hapus Q&A"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-600">Tidak ada pertanyaan yang sesuai</p>
                    <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau ganti filter kategori.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-bold text-[#06172e]">{filteredDataset.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> sampai{" "}
            <span className="font-bold text-[#06172e]">{Math.min(currentPage * pageSize, filteredDataset.length)}</span> dari{" "}
            <span className="font-bold text-[#06172e]">{filteredDataset.length}</span> pertanyaan
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-bold text-[#06172e]">
              Hal {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 font-bold cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. MODAL FORM: TAMBAH / EDIT Q&A */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-sky-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-[#06172e] text-base">
                    {editingItem ? "Edit Pertanyaan & Jawaban AI" : "Tambah Pertanyaan AI Baru"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Konfigurasikan respon cerdas untuk AI Chat Assistant UPITRA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveForm} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Row: ID & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    ID Unik (Key) *
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    required
                    placeholder="misal: pmb_alur_pendaftaran"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-hidden focus:border-blue-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Kategori Topik *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value.toLowerCase() })}
                      required
                      placeholder="misal: pmb, beasiswa, akademik"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500 uppercase tracking-wider font-bold"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {defaultPopularCategories.slice(0, 6).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-semibold"
                      >
                        +{cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pertanyaan Utama */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pertanyaan / Topik Utama *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  placeholder="misal: Bagaimana cara mendaftar kuliah di UPITRA?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Kata Kunci / Keywords Tags Input */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kata Kunci Tambahan (Keywords / Sinonim)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="Ketik kata kunci lalu tekan Enter atau tombol Tambah (misal: 'biaya kuliah', 'spp')"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer"
                  >
                    Tambah
                  </button>
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60">
                  {formData.keywords.length > 0 ? (
                    formData.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold"
                      >
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(kw)}
                          className="hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Belum ada kata kunci ditambahkan.</span>
                  )}
                </div>
              </div>

              {/* Jawaban AI */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">
                    Isi Jawaban Resmi AI *
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Mendukung markdown: **teks tebal**, bullet •, dan [teks](url)
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  placeholder="Tuliskan jawaban yang akurat, ramah, dan solutif. Contoh: Pendaftaran mahasiswa baru UPITRA dapat dilakukan secara online melalui website resmi pmb.upitra.ac.id..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Live Preview Box */}
              {formData.answer && (
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Pratinjau Respon Chatbot</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {formData.answer}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Simpan Pertanyaan
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 6. MODAL SIMULATOR UJI COBA AI (LIVE TESTER) */}
      {isTesterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#06172e] via-[#0b2545] to-[#0284c7] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-white backdrop-blur-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base flex items-center gap-1.5">
                    <span>Simulator Uji Respon AI Chatbot</span>
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  </h3>
                  <p className="text-[11px] text-sky-100 font-medium">
                    Uji coba langsung bagaimana AI mengenali pertanyaan menggunakan dataset saat ini
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTesterOpen(false)}
                className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Test Input */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  Ketikkan Pertanyaan Simulasi:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleRunTest();
                      }
                    }}
                    placeholder="Contoh: 'Berapa biaya kuliah informatika?' atau 'Siapa rektor UPITRA?'"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleRunTest()}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Uji AI</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Sample Questions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400">Contoh Cepat:</span>
                {[
                  "Bagaimana cara daftar PMB?",
                  "Siapa rektor UPITRA?",
                  "Ada beasiswa apa saja?",
                  "Apa itu kurikulum 3+1?"
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTestQuery(sample);
                      handleRunTest(sample);
                    }}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-semibold transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              {/* Simulation Result */}
              {testResult && (
                <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        testResult.answered 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {testResult.answered ? "✓ Pertanyaan Cocok" : "⚠ Fallback (Tidak Ada Jawaban Spesifik)"}
                      </span>
                      {testResult.confidence > 0 && (
                        <span className="text-[10px] font-bold text-blue-600">
                          Skor: {Math.round(testResult.confidence * 100)}%
                        </span>
                      )}
                    </div>

                    {testResult.matchedQuestion && (
                      <span className="text-[10px] text-slate-500 font-medium truncate max-w-[200px]" title={testResult.matchedQuestion}>
                        Cocok: {testResult.matchedQuestion}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap bg-white p-3.5 rounded-xl border border-slate-200">
                    {testResult.reply}
                  </div>
                </div>
              )}

              {/* Recent Test History */}
              {testHistory.length > 1 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Riwayat Uji Terakhir:
                  </div>
                  <div className="space-y-1.5">
                    {testHistory.slice(1).map((hist, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setTestQuery(hist.query);
                          handleRunTest(hist.query);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div className="text-xs font-semibold text-slate-700 truncate">
                          &ldquo;{hist.query}&rdquo;
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 shrink-0">
                          {Math.round(hist.confidence * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* 7. MODAL KONFIRMASI HAPUS */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#06172e]">Hapus Pertanyaan AI?</h4>
              <p className="text-xs text-slate-500">
                Pertanyaan ini tidak akan dapat dikenali lagi oleh AI Assistant. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors cursor-pointer"
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
