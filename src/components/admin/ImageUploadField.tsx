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
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
        {recommendedSize && (
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            Rekomendasi: {recommendedSize}
          </span>
        )}
      </div>

      {value ? (
        <div className="relative rounded-xl border border-blue-100 bg-blue-50 p-3 flex items-center gap-4">
          <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-blue-100 border border-blue-100 flex-shrink-0">
            <Image
              src={value}
              alt={altText || label}
              fill
              className="object-cover"
              unoptimized={value.startsWith("/uploads/") || value.startsWith("http")}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate" title={value}>Foto terpilih</p>
            <p className="text-[11px] text-blue-600 mt-1 flex items-center gap-1">
              ✓ Berkas terpasang
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2.5 py-1.5 text-xs font-medium bg-blue-100 hover:bg-blue-100 text-slate-700 rounded-lg border border-slate-600 transition"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
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
              : "border-blue-100 hover:border-sky-500/60 bg-blue-50 hover:bg-blue-50"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <p className="text-xs text-blue-600 font-medium">Memeriksa dan mengunggah gambar...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-100 flex items-center justify-center text-slate-700">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700">
                  Klik untuk mengunggah gambar
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Format JPEG, PNG, WebP, GIF (Maks. 5 MB). Metadata EXIF otomatis dibersihkan.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-800/40 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && !errorMessage && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
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
