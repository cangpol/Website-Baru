import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Video, 
  Building2, 
  Coffee, 
  Globe, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap,
  Music,
  Compass
} from "lucide-react";

export const metadata: Metadata = {
  title: "Life at UPITRA - Dinamika Kehidupan Kampus & Mahasiswa di Surakarta",
  description: "Jelajahi kehidupan mahasiswa di Universitas Pignatelli Triputra Surakarta. Kota Solo yang asri, organisasi kemahasiswaan aktif, smart campus, dan jejaring komunitas.",
};

const studentLifePillars = [
  {
    icon: MapPin,
    title: "Kota Surakarta: Asri, Aman & Ramah Mahasiswa",
    desc: "Solo terkenal sebagai kota budaya dengan biaya hidup paling terjangkau di Indonesia, transportasi publik modern (Batik Solo Trans), dan lingkungan yang tenang untuk fokus menuntut ilmu.",
  },
  {
    icon: Users,
    title: "Organisasi Mahasiswa & Komunitas Kreatif",
    desc: "Wadah kepemimpinan aktif melalui Badan Eksekutif Mahasiswa (BEM), Himpunan Mahasiswa Jurusan (FST, FEB, FSH, FH), Komunitas Coding & AI, English Debate Society, dan UKM Olahraga.",
  },
  {
    icon: Building2,
    title: "Smart Classroom & Lab Komputasi Terpadu",
    desc: "Seluruh ruang perkuliahan ber-AC dilengkapi proyektor interaktif, jaringan WiFi berkecepatan tinggi, ruang simulasi perhotelan, dan laboratorium komputer spesialis.",
  },
  {
    icon: HeartHandshake,
    title: "Pendampingan Dosen & Mentor Karir Triputra",
    desc: "Rasio bimbingan dosen yang personal memungkinkan pendampingan intensif tidak hanya pada aspek akademik, namun juga pengembangan karir dan karakter moral.",
  },
];

const ukmList = [
  {
    kategori: "Penalaran & Riset",
    nama: "UPITRA Tech & AI Innovators",
    desc: "Komunitas riset komputasi, hackathon, kompetisi data science, dan workshop pengembangan perangkat lunak.",
    icon: Sparkles,
  },
  {
    kategori: "Seni & Budaya",
    nama: "Paduan Suara & Musik UPITRA",
    desc: "Wadah ekspresi musikal, paduan suara universitas, band akustik, dan pelestarian gamelan seni tradisional Jawa.",
    icon: Music,
  },
  {
    kategori: "Olahraga & Kebugaran",
    nama: "UKM Futsal, Basket & Badminton",
    desc: "Turnamen olahraga antar-fakultas, latihan rutin kebugaran, dan bimbingan atlet mahasiswa berprestasi.",
    icon: Award,
  },
  {
    kategori: "Kepemimpinan & Sosial",
    nama: "BEM & Korps Sukarela (KSR)",
    desc: "Aksi pengabdian sosial kemasyarakatan di Surakarta, tanggap darurat bencana, dan pengembangan kepemimpinan publik.",
    icon: HeartHandshake,
  },
];

export default function LifeAtUpitraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white pt-12 pb-20 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
              <Sparkles className="w-4 h-4 text-sky-400" />
              CAMPUS EXPERIENCE & STUDENT LIFE
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Life at UPITRA: Kehidupan Kampus & Mahasiswa
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Temukan pengalaman berkuliah yang menginspirasi di kota Surakarta yang asri dan berbudaya luhur, didukung fasilitas kampus digital, komunitas mahasiswa dinamis, dan budaya integritas Triputra DNA.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
              <Link 
                href="/visi-misi"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
              >
                Lihat Visi & Misi Universitas &rarr;
              </Link>
              <Link 
                href="/pimpinan"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
              >
                Jajaran Pimpinan Rektorat &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 1. 4 PILAR KEHIDUPAN KAMPUS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              STUDENT ECOSYSTEM
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Lingkungan Belajar yang Nyaman & Mendukung Prestasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Keseimbangan antara keunggulan akademik, pengembangan bakat organisasi, dan kenyamanan hidup di kota Solo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentLifePillars.map((p, idx) => {
              const IconComponent = p.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-[#0b2545]">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. VIDEO PROFIL & TUR KAMPUS */}
        <section id="video-profil" className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
              <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                CAMPUS VIDEO TOUR
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
                Video Profil Resmi Kampus UPITRA
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Saksikan suasana kegiatan akademik, keakraban mahasiswa, dan fasilitas ruang kelas modern di Universitas Pignatelli Triputra Surakarta.
              </p>
            </div>

            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-black aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/rVDHh02bbA4"
                title="Video Profil Resmi UPITRA Surakarta"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <span>Daftar PMB UPITRA Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* 3. ORGANISASI & UNIT KEGIATAN MAHASISWA (UKM) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              ORGANISASI & KOMUNITAS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Unit Kegiatan Mahasiswa (UKM) & Komunitas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kembangkan kepemimpinan, bakat olahraga, riset teknologi, dan kepedulian sosial bersama ribuan rekan mahasiswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ukmList.map((ukm, idx) => {
              const IconComp = ukm.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {ukm.kategori}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center my-3 shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-black text-[#0b2545] mb-1.5">
                      {ukm.nama}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ukm.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. CTA DAFTAR MAHASISWA BARU */}
        <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-5">
            <span className="inline-block text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white uppercase tracking-wider">
              PENERIMAAN MAHASISWA BARU 2026/2027
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Siap Bergabung Menjadi Bagian dari Civitas Akademika UPITRA?
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Daftarkan diri Anda sekarang melalui jalur rapor bebas tes atau raih Beasiswa Penuh 100% Triputra Peduli.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a 
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-black text-xs uppercase shadow-xl transition-all hover:scale-105"
              >
                Daftar Mahasiswa Baru
              </a>
              <Link 
                href="/programs"
                className="px-6 py-3.5 rounded-full bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-bold text-xs backdrop-blur-sm transition-all"
              >
                Lihat 10 Program Studi
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
