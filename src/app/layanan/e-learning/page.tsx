import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Laptop, 
  ExternalLink, 
  BookOpen, 
  Video, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  FileText 
} from "lucide-react";

export const metadata: Metadata = {
  title: "E-Learning & Portal LMS - Layanan UPITRA",
  description: "Portal perkuliahan daring Learning Management System (LMS) Universitas Pignatelli Triputra Surakarta: Akses materi kuliah digital, kuis interaktif, dan panduan belajar daring.",
};

const fiturLMS = [
  {
    judul: "Akses Materi Perkuliahan 24/7",
    desc: "Unduh modul perkuliahan, presentasi dosen, e-book pendamping, dan rekaman sesi kuliah kapan saja dan di mana saja melalui laptop atau smartphone.",
  },
  {
    judul: "Pengumpulan Tugas & Ujian Terintegrasi",
    desc: "Sistem unggah tugas terstruktur dengan notifikasi tenggat waktu otomatis, feedback nilai langsung dari dosen, dan ujian CBT terjadwal.",
  },
  {
    judul: "Forum Diskusi & Kolaborasi Interaktif",
    desc: "Ruang tanya jawab asinkron bersama dosen pengampu dan rekan sekelas untuk membedah topik materi maupun proyek kelompok.",
  },
  {
    judul: "Video Conference Kuliah Daring HD",
    desc: "Terhubung langsung dengan sesi tatap maya Google Meet & Zoom Education berkecepatan tinggi tanpa perlu instalasi aplikasi tambahan yang rumit.",
  },
];

const panduanAkun = [
  { langkah: "Username Login", keterangan: "NIM (Nomor Induk Mahasiswa) resmi Anda." },
  { langkah: "Kata Sandi Awal", keterangan: "Kombinasi tanggal lahir baku atau kata sandi yang dikirimkan ke email @upitra.ac.id." },
  { langkah: "Kendala Akses?", keterangan: "Hubungi Unit Pelaksana Teknis (UPT) Teknologi Informasi & Komunikasi di Kampus Solo." },
];

export default function ELearningPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Sistem Pembelajaran Digital"
        title="E-Learning & Portal LMS"
        description="Platform perkuliahan daring modern yang fleksibel, interaktif, dan terintegrasi untuk mendukung proses belajar mengajar berkualitas tinggi di UPITRA."
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "E-Learning" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Banner Login LMS */}
        <section className="bg-gradient-to-r from-[#06172e] to-[#0b2545] rounded-3xl p-8 sm:p-12 text-white border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistem Aktif & Terpantau</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Portal Learning Management System (LMS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Silakan masuk menggunakan akun civitas akademika UPITRA untuk mengakses seluruh kelas daring, jadwal tugas, dan modul semester aktif Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-md"
            >
              <span>Masuk Portal LMS UPITRA</span>
              <ExternalLink className="w-4 h-4 text-blue-900" />
            </a>
          </div>
        </section>

        {/* Fitur Utama E-Learning */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Keunggulan Sistem</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Fitur Pembelajaran Daring Terpadu
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kemudahan belajar tanpa hambatan ruang dan waktu:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fiturLMS.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b2545]">
                  {item.judul}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Panduan Akun & Dukungan Teknis */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg sm:text-xl font-black text-[#0b2545]">
              Panduan Akses Akun & Bantuan Teknis
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Petunjuk cepat untuk mahasiswa baru dalam mengaktifkan akses LMS:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {panduanAkun.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {item.langkah}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.keterangan}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

