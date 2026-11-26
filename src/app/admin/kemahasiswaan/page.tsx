"use client";

import ContentArea from "@/components/admin/ContentArea";

// Setiap baris menyunting halaman publik yang sebenarnya, sehingga perubahan langsung tampil di website.
export default function AdminKemahasiswaanPage() {
  return (
    <ContentArea
      title="Halaman Kemahasiswaan"
      intro="Kelola isi halaman Kemahasiswaan beserta subhalamannya. Klik baris untuk membuka, ubah, lalu simpan."
      sections={[
        { key: "kemahasiswaan", title: "Halaman Utama Kemahasiswaan", desc: "Banner, teks, program, organisasi, UKM, dan galeri prestasi" },
        { key: "tugas-dan-fungsi", title: "Tugas dan Fungsi", desc: "Subhalaman Tugas dan Fungsi" },
        { key: "program-pengembangan", title: "Program Pengembangan", desc: "Subhalaman Program Pengembangan" },
        { key: "organisasi-mahasiswa", title: "Organisasi Mahasiswa & UKM", desc: "Subhalaman Organisasi Mahasiswa" },
        { key: "prestasi-mahasiswa", title: "Prestasi Mahasiswa", desc: "Subhalaman Prestasi Mahasiswa" },
        { key: "galeri-kegiatan", title: "Galeri Kegiatan", desc: "Subhalaman Galeri Kegiatan" },
        { key: "kalender-akademik", title: "Jadwal Kalender Akademik", desc: "Tabel jadwal di subhalaman Kalender Akademik" },
      ]}
    />
  );
}
