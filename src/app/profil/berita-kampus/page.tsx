import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";
import { staticArticles } from "@/lib/newsData";
import BeritaKampusClient from "@/components/BeritaKampusClient";

export const metadata: Metadata = {
  title: "Berita Kampus - Profil & Warta UPITRA",
  description: "Warta terkini kegiatan akademik, riset inovatif dosen, prestasi mahasiswa, dan kerjasama industri Universitas Pignatelli Triputra Surakarta.",
};

export default function BeritaKampusPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Warta & Publikasi"
        title="Berita Kampus"
        description="Informasi terpercaya seputar dinamika akademik, riset, inovasi mahasiswa, dan kemitraan industri di lingkungan UPITRA Surakarta."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Berita Kampus" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <BeritaKampusClient initialArticles={staticArticles} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
