"use client";

import Swal from "sweetalert2";

// SweetAlert2 dengan tema gelap yang serasi dengan panel admin.
const base = Swal.mixin({
  background: "#0a192f",
  color: "#e2e8f0",
  confirmButtonColor: "#0284c7",
  cancelButtonColor: "#334155",
  iconColor: "#38bdf8",
  customClass: { popup: "swal-admin-popup" },
});

export type SwalKind = "success" | "error" | "info" | "warning";

const ERROR_HINT = /(gagal|kesalahan|⚠|tidak (valid|boleh|dapat|bisa)|wajib|error|ditolak)/i;

/** Popup notifikasi singkat. Bila `kind` tidak diberikan, ditebak dari isi pesan. */
export function swalToast(message: string, kind?: SwalKind) {
  const icon: SwalKind = kind ?? (ERROR_HINT.test(message) ? "error" : "success");
  const clean = message.replace(/^[✓✔⚠️\s]+/u, "");
  if (icon === "error" || icon === "warning") {
    return base.fire({ icon, title: icon === "error" ? "Gagal" : "Perhatian", text: clean, confirmButtonText: "Mengerti" });
  }
  return base.fire({
    icon,
    title: icon === "success" ? "Berhasil" : "Informasi",
    text: clean,
    timer: 2200,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

/** Konfirmasi hapus. Mengembalikan true bila pengguna menekan "Ya, hapus". */
export async function swalConfirmDelete(name?: string) {
  const res = await base.fire({
    icon: "warning",
    title: "Hapus data ini?",
    text: name ? `"${name}" akan dihapus dan tidak dapat dikembalikan.` : "Data yang dihapus tidak dapat dikembalikan.",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#1d4ed8",
    focusCancel: true,
    reverseButtons: true,
  });
  return res.isConfirmed;
}

/** Konfirmasi umum (reset, ganti status, dll). */
export async function swalConfirm(title: string, text?: string, confirmText = "Ya, lanjutkan") {
  const res = await base.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Batal",
    reverseButtons: true,
  });
  return res.isConfirmed;
}
