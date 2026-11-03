"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string | null | undefined;
  onChange: (url: string) => void;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  helperText?: string;
  recommendedSize?: string;
  required?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  altText,
  onAltTextChange,
  helperText,
  recommendedSize,
  required = false,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setErrorMessage(null);

    // Client-side quick check
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Ukuran file melebihi batas maksimum 5 MB.");
      e.target.value = "";
      return;
    }

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith(".svg")) {
      setErrorMessage("Format SVG tidak diizinkan demi keamanan. Harap gunakan format JPEG, PNG, atau WebP.");
      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      if (altText) {
        formData.append("altText", altText);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Gagal mengunggah gambar.");
      }

      onChange(result.data.url);
      if (onAltTextChange && result.data.altText) {
        onAltTextChange(result.data.altText);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    setErrorMessage(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {recommendedSize && (
          <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded">
            Rekomendasi: {recommendedSize}
          </span>
        )}
      </div>

      {value ? (
        <div className="relative rounded-xl border border-slate-700 bg-slate-900/60 p-3 flex items-center gap-4">
          <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
            <Image
              src={value}
              alt={altText || label}
              fill
              className="object-cover"
              unoptimized={value.startsWith("/uploads/") || value.startsWith("http")}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">{value}</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              ✓ Berkas terpasang
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-600 transition"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
            isUploading
              ? "border-sky-500/50 bg-sky-500/5"
              : "border-slate-700 hover:border-sky-500/60 bg-slate-900/40 hover:bg-slate-900/70"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
              <p className="text-xs text-sky-300 font-medium">Memvalidasi magic bytes & mengunggah gambar...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Upload className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-200">
                  Klik untuk mengunggah gambar
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Format JPEG, PNG, WebP, GIF (Maks. 5 MB). Metadata EXIF otomatis dibersihkan.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-800/40 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && !errorMessage && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={isUploading}
        onChange={handleFileSelect}
      />
    </div>
  );
}
