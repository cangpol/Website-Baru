"use client";

import ContentArea from "@/components/admin/ContentArea";

export default function AdminPenelitianPage() {
  return (
    <ContentArea
      title="Penelitian Terbaru"
      intro="Tambah, ubah, atau hapus daftar Penelitian Terbaru di halaman Riset."
      sections={[{ key: "riset", title: "Daftar Penelitian Terbaru", desc: "Judul, keterangan, dan foto penelitian", hideBanner: true }]}
    />
  );
}
