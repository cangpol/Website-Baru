"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  value: string | null | undefined;
  onChange: (url: string) => void;
  fileName?: string;
  onFileNameChange?: (name: string) => void;
  fileSize?: string;
  onFileSizeChange?: (size: string) => void;
  helperText?: string;
  required?: boolean;
}

export function FileUploadField({
  label,
  value,
  onChange,
  fileName,
  onFileNameChange,
  fileSize,
  onFileSizeChange,
  helperText,
  required = false,
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);

    // Client-side quick check
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("Ukuran dokumen melebihi batas maksimum 20 MB.");
      e.target.value = "";
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Hanya berkas format dokumen PDF yang diizinkan.");
      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Gagal mengunggah dokumen PDF.");
      }

      onChange(result.data.url);
      if (onFileNameChange) {
        onFileNameChange(file.name);
      }
      if (onFileSizeChange) {
        const mb = (file.size / (1024 * 1024)).toFixed(1);
        onFileSizeChange(`${mb} MB`);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah dokumen.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    if (onFileNameChange) onFileNameChange("");
    if (onFileSizeChange) onFileSizeChange("");
    setErrorMessage(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
          Format: PDF (Maks. 20 MB)
        </span>
      </div>

      {value ? (
        <div className="relative rounded-xl border border-slate-700 bg-slate-900/60 p-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">{fileName || value}</p>
            <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Berkas dokumen tersimpan {fileSize ? `(${fileSize})` : ""}
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
              title="Hapus berkas"
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
              : "border-slate-700 hover:border-emerald-500/60 bg-slate-900/40 hover:bg-slate-900/70"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              <p className="text-xs text-emerald-300 font-medium">Memvalidasi magic bytes %PDF & mengunggah...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Upload className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-200">
                  Klik untuk mengunggah dokumen PDF
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Batas maksimum 20 MB. Diverifikasi dengan magic bytes %PDF.
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
        accept="application/pdf"
        className="hidden"
        disabled={isUploading}
        onChange={handleFileSelect}
      />
    </div>
  );
}
