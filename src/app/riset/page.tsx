import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Microscope, 
  BookOpen, 
  Award, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Riset & Pengabdian Masyarakat - Universitas Pignatelli Triputra",
  description: "Portal riset dan inovasi LPPM Universitas Pignatelli Triputra: Pusat Penelitian, Publikasi Ilmiah, Hibah Industri Triputra, dan Sentra Kekayaan Intelektual.",
};

export default function RisetPortalPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Inovasi & Penemuan"
        title="Riset & Pengabdian Masyarakat"
        description="Mendedikasikan keilmuan dan riset terapan multidisiplin untuk menjawab kebutuhan nyata industri modern dan memajukan kesejahteraan masyarakat luas."
        breadcrumbs={[
          { label: "Riset" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Banner Riset LPPM */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Lembaga Penelitian & Pengabdian (LPPM)</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Riset Berdampak Transformatif untuk Bangsa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              LPPM UPITRA memfasilitasi penelitian berorientasi hilirisasi industri bersama ekosistem Triputra Group serta pengabdian masyarakat berbasis teknologi tepat guna di wilayah Surakarta dan sekitarnya.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Skema Triputra Research Grant</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>4 Jurnal Ilmiah OJS Terakreditasi</span>
            </div>
          </div>
        </div>

        {/* Feature Cards Riset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/riset/pusat-penelitian-dan-publikasi"
            className="group bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <Microscope className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Menu Utama Riset</span>
                <h3 className="text-xl font-black text-[#0b2545] group-hover:text-blue-700 transition-colors mt-1">
                  Pusat Penelitian & Publikasi
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pelajari roadmap riset unggulan UPITRA, direktori jurnal ilmiah OJS, skema pendanaan hibah penelitian internal & eksternal, serta tata cara pendaftaran Hak Kekayaan Intelektual (HKI) dan Paten.
              </p>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Roadmap Riset</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Jurnal Ilmiah SINTA</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Sentra HKI & Paten</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-800">
              <span>Buka Halaman Pusat Penelitian & Publikasi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="bg-[#06172e] text-white rounded-3xl p-8 border border-blue-900 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Lightbulb className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Kolaborasi Industri</span>
                <h3 className="text-xl font-black text-white mt-1">
                  Kemitraan Riset Bersama Triputra Group
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dosen dan mahasiswa UPITRA diberikan akses langsung untuk meneliti studi kasus dan menguji prototipe inovasi di unit-unit bisnis Triputra Group seperti PT Adi Sarana Armada Tbk (ASSA), PT Triputra Agro Persada Tbk, PT Dharma Polimetal Tbk, dan PT Kirana Megatara Tbk.
              </p>

              <div className="pt-2 border-t border-blue-900/60 text-xs text-sky-300 font-semibold">
                Hilirisasi Inovasi Berkelanjutan
              </div>
            </div>

            <Link
              href="/riset/pusat-penelitian-dan-publikasi"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition-colors"
            >
              <span>Pelajari Mekanisme Riset Industri</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

