import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  ArrowRight, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  Compass, 
  FileText 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang UPITRA - Profil Sejarah & Identitas Institusi",
  description: "Profil lengkap Universitas Pignatelli Triputra (UPITRA) Surakarta: Sejarah, Yayasan Santo Ignatius Pignatelli x Triputra Group, akreditasi Baik Sekali, dan filosofi lambang.",
};

export default function TentangUpitraPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Profil Institusi"
        title="Tentang UPITRA"
        description="Membangun generasi cerdas berintegritas dan siap kerja melalui integrasi nilai Ignasian dan keunggulan profesional ekosistem Triputra Group."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Tentang UPITRA" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Sekilas UPITRA & Landasan Kolaborasi */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Pilar Sinergi Strategis</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight leading-snug">
              Perguruan Tinggi Unggul di Surakarta Kolaborasi Pignatelli & Triputra Group
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>Universitas Pignatelli Triputra (UPITRA)</strong> merupakan transformasi institusional strategis hasil kolaborasi erat antara <strong>Yayasan Santo Ignatius Pignatelli</strong> dan <strong>Triputra Group</strong> (konglomerasi nasional terkemuka yang didirikan oleh Ir. Theodore Permadi Rachmat).
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Hadir di Kota Surakarta, Jawa Tengah, UPITRA mengemban misi menghadirkan pendidikan tinggi berkualitas yang terjangkau bagi generasi muda Indonesia. Dengan memadukan pendidikan karakter berakar nilai-nilai Ignasian (hati yang berbelarasa) serta kompetensi profesional berbasis kebutuhan industri riil (Triputra DNA), UPITRA mencetak lulusan yang tidak hanya menguasai ilmu pengetahuan, tetapi juga memiliki integritas moral tinggi dan kesiapan berkarir global.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-xs font-bold text-[#0b2545] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Akreditasi Institusi BAIK SEKALI BAN-PT</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-xs font-bold text-[#0b2545] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Kampus Siap Kerja Ekosistem Triputra</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#06172e] p-6 sm:p-8 text-white border border-blue-900 shadow-xl overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center mb-6 shadow-md">
                <img src="/images/logo.png" alt="Logo UPITRA" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Makna Lambang UPITRA</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Lambang UPITRA merepresentasikan perpaduan kompas kebijaksanaan, kobaran api semangat melayani, dan lingkaran kebersamaan Triputra. Simbol ini menegaskan tekad institusi menjadi mercusuar pendidikan tinggi berkarakter unggul di Indonesia.
              </p>
              <div className="space-y-2 border-t border-blue-900/60 pt-4 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Badan Penyelenggara:</span>
                  <span className="text-sky-300 font-bold">Yayasan St. Ignatius Pignatelli</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Mitra Pendukung Industri:</span>
                  <span className="text-sky-300 font-bold">Triputra Group</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Wilayah Pembinaan:</span>
                  <span className="text-slate-200">LLDIKTI Wilayah VI Jateng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Nilai Utama Karakter (Triputra DNA & Nilai Ignasian) */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">Falsafah Pendidikan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              4 Nilai Pokok Triputra DNA & Semangat Ignasian
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Setiap mahasiswa UPITRA dibina untuk memiliki fondasi karakter kokoh yang diakui dan dicari oleh dunia industri modern:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Integrity & Ethics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menjunjung kejujuran, komitmen moral, ketulusan, serta integritas etika profesional dalam setiap tindakan dan pengambilan keputusan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senantiasa mengejar standar kualitas tertinggi, berorientasi pada hasil prima, dan pantang menyerah dalam menghadapi tantangan zaman.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Compassion (Belarasa)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memiliki kepedulian tulus terhadap sesama dan lingkungan sosial, menghidupi semangat solider bagi yang rentan dan membutuhkan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                04
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Humility & Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kerendahan hati untuk terus belajar, menghargai keberagaman, dan mendedikasikan keahlian keilmuan untuk melayani kemajuan bangsa.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action PMB & Brosur */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Bergabung Bersama Komunitas Akademik UPITRA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftarkan diri Anda pada program sarjana dan vokasi unggulan. Raih kesempatan Beasiswa Penuh Triputra Peduli 100%.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/ebrochure"
              className="px-5 py-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs font-bold text-white hover:bg-blue-900 transition-all"
            >
              Unduh E-Brosur
            </Link>
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Daftar PMB Online</span>
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
