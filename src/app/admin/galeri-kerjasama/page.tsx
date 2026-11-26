"use client";

import ContentArea from "@/components/admin/ContentArea";

export default function AdminGaleriKerjasamaPage() {
  return (
    <ContentArea
      title="Galeri Kerjasama"
      intro="Kelola dokumentasi kegiatan kerjasama UPITRA bersama mitra."
      sections={[
        { key: "kerjasama", title: "Galeri di Halaman Kerjasama", desc: "Kartu Galeri Kegiatan Kerjasama di /kerjasama", hideBanner: true },
        { key: "kegiatan-kerjasama", title: "Halaman Kegiatan Kerjasama", desc: "Daftar lengkap di /kerjasama/kegiatan-kerjasama" },
      ]}
    />
  );
}
