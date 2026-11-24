import { EXTRA_DEFAULTS } from "@/lib/pageContentExtra";
import { getPageContentMerged } from "@/server/page-content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Camera, 
  Calendar, 
  Users, 
  Sparkles, 
  Tag, 
  HeartHandshake 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Kegiatan Mahasiswa - Kemahasiswaan UPITRA",
  description: "Dokumentasi visual momen inspiratif, festival seni, inisiasi mahasiswa baru, dan bakti sosial mahasiswa Universitas Pignatelli Triputra Surakarta.",
};


export default async function GaleriKegiatanMahasiswaPage() {
  const __c = await getPageContentMerged("galeri-kegiatan");
  const galeriKegiatan = __c.galeriKegiatan as (typeof EXTRA_DEFAULTS)["galeri-kegiatan"]["galeriKegiatan"];
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Dokumentasi & Dinamika Kampus"
        title="Galeri Kegiatan Mahasiswa"
        description="Rekaman visual ragam aktivitas kemahasiswaan: kepemimpinan, kepedulian sosial, pameran inovasi ilmiah, seni, dan olahraga di kampus UPITRA Solo."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Galeri Kegiatan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545]">
              Momen & Dokumentasi Terpilih
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Setiap aktivitas dirancang untuk memperkaya pengalaman hidup dan persaudaraan mahasiswa.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shrink-0">
            {galeriKegiatan.length} Album Dokumentasi
          </span>
        </div>

        {/* Grid Galeri Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galeriKegiatan.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`relative h-56 bg-gradient-to-br ${item.fallbackBg} flex items-center justify-center overflow-hidden`}>
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-950/30 flex items-center justify-center pointer-events-none">
                    <Camera className="w-10 h-10 text-white/40" />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-blue-950/80 text-[10px] font-bold text-sky-300 uppercase tracking-wider border border-blue-800/60 backdrop-blur-xs">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.tanggal}</span>
                    <span>•</span>
                    <span className="truncate">{item.lokasi}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0b2545] leading-snug group-hover:text-blue-700 transition-colors">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>Dokumentasi Resmi Biro Kemahasiswaan</span>
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
