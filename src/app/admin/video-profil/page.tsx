"use client";

import ContentArea from "@/components/admin/ContentArea";

export default function AdminVideoProfilPage() {
  return (
    <ContentArea
      title="Video Profil UPITRA"
      intro="Ganti tautan YouTube, judul, dan deskripsi video di halaman Profil. Kosongkan tautan untuk menyembunyikan video."
      sections={[{ key: "profil-tentang", title: "Video Profil", desc: "Tautan video, judul, dan deskripsi", href: "/profil" }]}
    />
  );
}
