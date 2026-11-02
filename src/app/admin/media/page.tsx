"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  FileText,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Edit2,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { getMediaAssets, updateMediaAltAction, deleteMediaAssetAction } from "@/server/media";

interface MediaItem {
  id: string;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  altText: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState<"ALL" | "IMAGE" | "DOCUMENT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Copied URL feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Editing alt text
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [altInput, setAltInput] = useState("");

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await getMediaAssets({
        page,
        limit: 20,
        search: searchQuery,
        type: typeFilter,
      });
      setItems(res.assets);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [page, typeFilter, searchQuery]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", file.name);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Gagal mengunggah berkas.");
      }

      await loadMedia();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Gagal mengunggah berkas.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.path);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAlt = () => {
    if (!editingItem) return;
    startTransition(async () => {
      const res = await updateMediaAltAction(editingItem.id, altInput);
      if (res.ok) {
        setItems((prev) =>
          prev.map((it) => (it.id === editingItem.id ? { ...it, altText: altInput } : it))
        );
        setEditingItem(null);
      } else {
        alert(res.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteError(null);
    startTransition(async () => {
      const res = await deleteMediaAssetAction(id);
      if (res.ok) {
        setDeleteId(null);
        await loadMedia();
      } else {
        setDeleteError(res.message);
      }
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-sky-400" />
            Pustaka Media
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola seluruh aset gambar dan dokumen UPITRA. Diverifikasi dengan magic bytes dan tersimpan aman.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm cursor-pointer shadow-lg shadow-sky-500/20 transition">
            <Upload className="w-4 h-4" />
            <span>Unggah Berkas Baru</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-800/40 p-4 rounded-xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => { setTypeFilter("ALL"); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              typeFilter === "ALL"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Semua ({total})
          </button>
          <button
            type="button"
            onClick={() => { setTypeFilter("IMAGE"); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              typeFilter === "IMAGE"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Gambar
          </button>
          <button
            type="button"
            onClick={() => { setTypeFilter("DOCUMENT"); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              typeFilter === "DOCUMENT"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Dokumen PDF
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Cari nama atau alt text..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading || uploading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <p className="text-sm text-slate-400">
            {uploading ? "Memvalidasi biner & mengunggah berkas..." : "Memuat berkas media..."}
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-300">Belum ada berkas media</p>
          <p className="text-xs text-slate-500 mt-1">Unggah foto atau dokumen PDF baru melalui tombol di atas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => {
            const isImage = item.mimeType.startsWith("image/");
            return (
              <div
                key={item.id}
                className="group relative rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <Image
                      src={item.path}
                      alt={item.altText || item.filename}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={item.path.startsWith("/uploads/") || item.path.startsWith("http")}
                    />
                  ) : (
                    <FileText className="w-10 h-10 text-red-400" />
                  )}
                </div>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-200 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate" title={item.altText}>
                      {item.altText ? `Alt: "${item.altText}"` : "Tanpa alt text"}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatBytes(item.size)}</span>
                    {item.width && item.height && (
                      <span className="font-mono text-[10px] text-slate-500">
                        {item.width}×{item.height}
                      </span>
                    )}
                  </div>
                </div>

                {/* Overlay Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    title="Salin URL"
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingItem(item); setAltInput(item.altText); }}
                    title="Edit Alt Text"
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    title="Hapus"
                    className="p-1.5 text-slate-300 hover:text-red-400 rounded hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-slate-300"
          >
            Sebelumnya
          </button>
          <span className="text-xs text-slate-400">
            Halaman {page} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-slate-300"
          >
            Berikutnya
          </button>
        </div>
      )}

      {/* Modal Edit Alt Text */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Edit Deskripsi Alternatif (Alt Text)</h3>
            <p className="text-xs text-slate-400">
              Alt text penting bagi pembaca tunanetra (screen reader) dan optimasi SEO Google.
            </p>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
              placeholder="Deskripsi singkat gambar..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleSaveAlt}
                className="px-4 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white rounded-lg flex items-center gap-1.5"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-900/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Hapus Berkas Media
            </h3>
            <p className="text-xs text-slate-300">
              Apakah Anda yakin ingin menghapus berkas ini secara permanen dari server penyimpanan?
            </p>

            {deleteError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-xs text-red-300">
                {deleteError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setDeleteId(null); setDeleteError(null); }}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center gap-1.5"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

