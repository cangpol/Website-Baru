import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Microscope, 
  BookOpen, 
  FileText, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  Compass, 
  Lightbulb, 
  Download 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pusat Penelitian & Publikasi (LPPM) - Riset UPITRA",
  description: "Pusat Penelitian dan Publikasi Ilmiah LPPM Universitas Pignatelli Triputra Surakarta: Roadmap riset, jurnal SINTA, skema hibah Triputra Research Grant, dan sentra HKI.",
};

const roadmapRiset = [
  {
    bidang: "Kecerdasan Buatan & Transformasi Digital Industri",
    fokus: "Pengembangan machine learning, computer vision untuk otomasi industri manufaktur, analitik rantai pasok cerdas, dan keamanan siber.",
    fakultas: "Fakultas Sains & Teknologi (FST)",
  },
  {
    bidang: "Manajemen Berkelanjutan & Ekonomi Sirkular",
    fokus: "Strategi keberlanjutan agribisnis, tata kelola logistik hijau (*green supply chain*), akuntansi ESG (Environmental, Social, Governance), dan technopreneurship.",
    fakultas: "Fakultas Ekonomi & Bisnis (FEB)",
  },
  {
    bidang: "Keselamatan Kerja (K3) & Ergonomi Industri",
    fokus: "Mitigasi risiko bahaya di perkebunan dan pabrik otomotif, pencegahan musculoskeletal disorders pada pekerja, dan inovasi intervensi fisioterapi.",
    fakultas: "Fakultas Kesehatan (FKes)",
  },
  {
    bidang: "Komunikasi Lintas Budaya & Ekowisata Berkelanjutan",
    fokus: "Kajian diplomasi bahasa dalam negosiasi bisnis internasional, pelestarian warisan budaya lokal Solo, dan pengembangan desa wisata mandiri.",
    fakultas: "Fakultas Sosial Humaniora (FSH)",
  },
];

const jurnalList = [
  {
    nama: "Jurnal Sains Terapan & Komputasi (JSTK UPITRA)",
    issn: "e-ISSN: 2985-7821",
    index: "Terakreditasi SINTA & Google Scholar",
    frekuensi: "2 Terbitan per Tahun (Juni & Desember)",
    lingkup: "Informatika, Data Science, Sistem Informasi, Rekayasa Software.",
  },
  {
    nama: "Jurnal Manajemen & Dinamika Korporasi (JMDK)",
    issn: "e-ISSN: 2986-1142",
    index: "Terakreditasi SINTA & Garuda",
    frekuensi: "2 Terbitan per Tahun (April & Oktober)",
    lingkup: "Manajemen Strategis, Rantai Pasok, Akuntansi Forensik, Perpajakan.",
  },
  {
    nama: "Jurnal Keselamatan, Kesehatan Kerja & Keperawatan (JK4)",
    issn: "e-ISSN: 2987-3450",
    index: "Google Scholar & Copernicus Index",
    frekuensi: "2 Terbitan per Tahun (Mei & November)",
    lingkup: "K3 Industri, Ergonomi, Rehabilitasi Fisioterapi, Asuhan Keperawatan.",
  },
  {
    nama: "Jurnal Humaniora, Bahasa & Pariwisata Nusantara",
    issn: "e-ISSN: 2988-5678",
    index: "Google Scholar & Garuda",
    frekuensi: "2 Terbitan per Tahun (Januari & Juli)",
    lingkup: "Hospitality Management, Kajian Linguistik Terapan, Budaya Pariwisata.",
  },
];

export default function PusatPenelitianPublikasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Lembaga Penelitian & Pengabdian Masyarakat"
        title="Pusat Penelitian & Publikasi"
        description="Mendorong atmosfer akademik yang progresif melalui riset inovatif multidisiplin, publikasi jurnal ilmiah bereputasi, dan hilirisasi teknologi bersama industri."
        breadcrumbs={[
          { label: "Riset", href: "/riset" },
          { label: "Pusat Penelitian & Publikasi" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Profil LPPM Singkat */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Mandat Riset LPPM UPITRA</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] leading-tight">
              Menghubungkan Gagasan Akademik dengan Solusi Nyata Dunia Industri & Masyarakat
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Pusat Penelitian & Publikasi LPPM UPITRA bertugas memfasilitasi, mendanai, dan mengarahkan kegiatan penelitian sivitas akademika agar berdampak langsung bagi peningkatan daya saing bangsa. Bersama kemitraan strategis dengan unit usaha <strong>Triputra Group</strong>, kami mengintegrasikan riset terapan pada pemecahan tantangan operasional industri riil.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Triputra Research Grant</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Jurnal Ilmiah OJS Terakreditasi</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Sentra Kekayaan Intelektual (HKI)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#06172e] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-lg space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Sentra HKI & Paten</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Layanan pendampingan pendaftaran Hak Cipta, Paten Sederhana, Merek, dan Desain Industri bagi hasil karya inovasi dosen dan mahasiswa UPITRA.
            </p>
            <div className="pt-2 border-t border-blue-900 text-xs text-sky-300 font-semibold">
              Kementerian Hukum & HAM RI
            </div>
          </div>
        </section>

        {/* ROADMAP RISET UNGGULAN */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Arah Kebijakan Riset</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              4 Roadmap Riset Unggulan UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Payung penelitian institusi yang menjadi acuan pengajuan proposal hibah internal dan eksternal:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {roadmapRiset.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-black text-xs border border-blue-200">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {item.fakultas}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug">
                    {item.bidang}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.fokus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JURNAL ILMIAH BERKALA */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Publikasi Terbuka</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Jurnal Ilmiah Berkala UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Wadah publikasi artikel ilmiah peer-reviewed bagi akademisi, peneliti, dan praktisi industri:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jurnalList.map((jurnal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700">
                      {jurnal.issn}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {jurnal.index}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0b2545] leading-snug">
                    {jurnal.nama}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-700">Fokus Keilmuan:</strong> {jurnal.lingkup}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1">
                    Periode Terbit: {jurnal.frekuensi}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600">Portal OJS UPITRA</span>
                  <a
                    href="https://upitra.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>Submit Naskah</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panduan Hibah & Pedoman Riset */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Unduh Panduan Hibah Riset & Pengabdian LPPM
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Dapatkan format proposal, jadwal pengusulan skema Triputra Research Grant, dan standar luaran publikasi terkini.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <button
              type="button"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-900" />
              <span>Panduan LPPM 2026/2027</span>
            </button>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

