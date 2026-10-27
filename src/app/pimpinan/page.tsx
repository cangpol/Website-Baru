import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pimpinan Universitas & Rektorat - Universitas Pignatelli Triputra (UPITRA)",
  description: "Profil jajaran Pimpinan Eksekutif Universitas Pignatelli Triputra Surakarta: Rektor, para Wakil Rektor, dan Dekanat 4 Fakultas Unggulan.",
};

interface PimpinanItem {
  nama: string;
  jabatan: string;
  bidang: string;
  foto: string;
  deskripsi: string;
  kredensial: string[];
}

interface DekanItem {
  fakultas: string;
  fakultasShort: string;
  nama: string;
  jabatan: string;
  foto: string;
  pendidikan: string;
  keahlian: string[];
  prodi: string[];
  fokus: string;
  link: string;
}

const pimpinanList: PimpinanItem[] = [
  {
    nama: "Neil Semuel Rupidara, S.E., M.Sc., Ph.D",
    jabatan: "Rektor Universitas Pignatelli Triputra",
    bidang: "Pimpinan Eksekutif Tertinggi",
    foto: "/images/pimpinan/rektor-neil-rupidara.jpg",
    deskripsi: "Memimpin arah strategis, penguatan kelembagaan, serta kolaborasi ekosistem pendidikan UPITRA dengan Triputra Group dan mitra industri nasional.",
    kredensial: [
      "University of Melbourne, Australia (Ph.D)",
      "Pakar Manajemen Strategis & Kepemimpinan Korporat",
      "Dosen & Peneliti Transformasi Manajemen Sumber Daya Manusia"
    ],
  },
  {
    nama: "Prof. Johana Endang Prawitasari, Ph.D",
    jabatan: "Wakil Rektor 1 (Akademik & Kemahasiswaan)",
    bidang: "Bidang Akademik, Riset & Ormawa",
    foto: "/images/pimpinan/wr1-johana-prawitasari.jpg",
    deskripsi: "Bertanggung jawab atas penjaminan mutu kurikulum transformatif, peningkatan prestasi mahasiswa, kegiatan organisasi kemahasiswaan, dan riset inovatif.",
    kredensial: [
      "Guru Besar / Profesor Perguruan Tinggi Nasional",
      "Pakar Psikologi Pendidikan & Pembinaan Karakter Unggul",
      "Pengembang Kurikulum Transformatif Berorientasi Industri"
    ],
  },
  {
    nama: "Yohanes Bayu Samudro, S.Pd., M.Pd",
    jabatan: "Wakil Rektor 2 (Operasional, Keuangan & SDM)",
    bidang: "Bidang Sumber Daya, Keuangan & IT",
    foto: "/images/pimpinan/wr2-bayu-samudro.jpg",
    deskripsi: "Mengelola efisiensi operasional kampus modern, keberlanjutan keuangan, pengembangan sarana prasarana berbasis digital, serta tata kelola SDM prima.",
    kredensial: [
      "Magister Pendidikan (M.Pd)",
      "Pakar Manajemen Operasional Lembaga Pendidikan Tinggi",
      "Arsitek Pengembangan Infrastruktur Digital Kampus Modern"
    ],
  },
];

const dekanatList: DekanItem[] = [
  {
    fakultas: "Fakultas Sains & Teknologi",
    fakultasShort: "FST",
    nama: "Benedictus Herry Suharto, S.T., M.T.",
    jabatan: "Dekan Fakultas Sains & Teknologi",
    foto: "/images/dosen/1777869540_69f822e4e6193.jpg",
    pendidikan: "S1 & S2 Teknik Elektro (Universitas Gadjah Mada)",
    keahlian: [
      "Internet of Things (IoT) & Embedded Robotics",
      "Artificial Intelligence & Machine Learning Architecture",
      "Software Engineering & Kurikulum Komputasi Industri Triputra"
    ],
    prodi: ["S1 Informatika", "S1 Sistem Informasi", "S1 Rekayasa Perangkat Lunak"],
    fokus: "Transformasi komputasi digital, kecerdasan buatan (AI), rekayasa sistem cloud skala besar, dan keamanan siber.",
    link: "/fst",
  },
  {
    fakultas: "Fakultas Ekonomi & Bisnis",
    fakultasShort: "FEB",
    nama: "Yenni Maria Sridarta, S.E., M.M.",
    jabatan: "Dekan Fakultas Ekonomi & Bisnis",
    foto: "/images/dosen/1779074566_6a0a86064028b.jpg",
    pendidikan: "S1 Manajemen (USD), S2 Manajemen (Universitas Atma Jaya Yogyakarta)",
    keahlian: [
      "Manajemen Keuangan Korporasi & Analisis Investasi",
      "Manajemen Operasional Rantai Pasok Terintegrasi (Supply Chain)",
      "Pengembangan Budaya Organisasi & Tata Kelola SDM Strategis"
    ],
    prodi: ["S1 Manajemen", "S1 Akuntansi"],
    fokus: "Manajemen rantai pasok modern, akuntansi digital, technopreneurship, dan sinergi korporasi Triputra Group.",
    link: "/feb",
  },
  {
    fakultas: "Fakultas Sosial Humaniora",
    fakultasShort: "FSH",
    nama: "Dr. RR. Erna Sadiarti Budiningtyas, S.Sos., M.Sc.",
    jabatan: "Dekan Fakultas Sosial Humaniora",
    foto: "/images/dosen/1779170466_6a0bfca27b852.jpg",
    pendidikan: "S1, S2, dan S3 Doktor Pariwisata (Universitas Gadjah Mada)",
    keahlian: [
      "Cultural Heritage Tourism & Ekowisata Berkelanjutan",
      "Tata Kelola Hospitality & Destinasi Pariwisata Global",
      "Komunikasi Bisnis Internasional & Diplomasi Budaya"
    ],
    prodi: ["S1 Pariwisata", "S1 Bahasa Inggris"],
    fokus: "Hospitality global, pariwisata berkelanjutan, komunikasi bisnis internasional, dan diplomasi kebudayaan dunia.",
    link: "/fsh",
  },
  {
    fakultas: "Fakultas Kesehatan",
    fakultasShort: "FKes",
    nama: "Dr. Budi Santoso, S.K.M., M.Kes.",
    jabatan: "Dekan Fakultas Kesehatan",
    foto: "/images/dosen/1778135697_69fc329171b37.jpg",
    pendidikan: "S1 Kesehatan Masyarakat, S2 Kesehatan Kerja (K3), S3 Ilmu Kesehatan Masyarakat",
    keahlian: [
      "Sistem Manajemen K3 (SMK3) Industri Manufaktur & Perkebunan",
      "Ergonomi Okupasi & Higiene Lingkungan Industri",
      "Penjaminan Mutu Layanan Fisioterapi & Praktik Keperawatan Vokasi"
    ],
    prodi: ["S1 Keselamatan & Kesehatan Kerja (K3)", "S1 Fisioterapi", "D3 Keperawatan"],
    fokus: "K3 industri manufaktur & perkebunan Triputra, rehabilitasi muskuloskeletal/olahraga, dan keperawatan vokasional profesional.",
    link: "/fkes",
  },
];

export default function PimpinanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white pt-12 pb-20 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
              <Users className="w-4 h-4 text-sky-400" />
              Tata Kelola &amp; Kepemimpinan Universitas
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pimpinan Universitas (Rektorat &amp; Dekanat)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Jajaran akademisi dan praktisi terkemuka yang memimpin arah transformasi strategis Universitas Pignatelli Triputra Surakarta menuju keunggulan berkarakter dan berdaya saing industri global.
            </p>
          </div>
        </section>

        {/* 1. SAMBUTAN REKTOR */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-slate-100 bg-slate-200">
                <img 
                  src={pimpinanList[0].foto} 
                  alt={pimpinanList[0].nama}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-center w-full">
                    <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">Rektor UPITRA</div>
                    <div className="text-sm font-black leading-tight mt-0.5">{pimpinanList[0].nama}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                PESAN KEPEMIMPINAN REKTORAT
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Membangun Ekosistem Pendidikan yang Relevan dengan Industri &amp; Berbudi Pekerti Luhur
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                &ldquo;Universitas Pignatelli Triputra hadir sebagai jawaban atas tantangan dunia nyata. Bersama ekosistem Triputra Group, kami berkomitmen menyajikan kurikulum transformatif yang membekali mahasiswa bukan hanya dengan kecakapan teknologi dan bisnis mutakhir, melainkan juga integritas moral, kerendahan hati, dan ketangguhan karakter.&rdquo;
              </p>

              <div className="pt-2 text-xs sm:text-sm font-bold text-slate-500">
                — Neil Semuel Rupidara, S.E., M.Sc., Ph.D (Rektor UPITRA)
              </div>
            </div>

          </div>
        </section>

        {/* 2. REKTORAT */}
        <section className="py-14 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
                EXECUTIVE BOARD
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
                Jajaran Rektorat UPITRA
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Trio pimpinan eksekutif yang mengawal keunggulan tridharma perguruan tinggi dan tata kelola berintegritas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pimpinanList.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col group"
                >
                  <div className="relative h-72 bg-gradient-to-t from-[#06172e] via-[#0b2545] to-[#123e75] flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute w-44 h-44 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white/80 shadow-2xl overflow-hidden bg-slate-900 ring-4 ring-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={p.foto}
                        alt={p.nama}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#06172e]/90 text-[10px] font-bold text-sky-300 uppercase tracking-wider border border-blue-800/60 shadow-xs">
                      {p.bidang}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug group-hover:text-blue-700 transition-colors">
                        {p.nama}
                      </h3>
                      <div className="text-xs font-bold text-blue-700">
                        {p.jabatan}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {p.deskripsi}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Kompetensi &amp; Rekam Jejak:
                      </div>
                      {p.kredensial.map((kred, kIdx) => (
                        <div key={kIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{kred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. DEKANAT 4 FAKULTAS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
            <div className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              FACULTY DEANSHIP
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2545] tracking-tight">
              Dekanat 4 Fakultas Unggulan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mengawal mutu kurikulum, keunggulan riset terapan, dan kemitraan industri di setiap rumpun keilmuan:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {dekanatList.map((d, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Portrait Header */}
                  <div className="relative h-60 bg-gradient-to-t from-[#06172e] via-[#0b2545] to-[#123e75] flex items-center justify-center p-4 overflow-hidden">
                    <div className="absolute w-36 h-36 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />

                    <div className="relative w-32 h-32 rounded-full border-4 border-white/80 shadow-xl overflow-hidden bg-slate-900 ring-2 ring-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={d.foto}
                        alt={d.nama}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] shadow-sm uppercase tracking-wider">
                      {d.fakultasShort}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                        {d.jabatan}
                      </span>
                      <h3 className="text-base font-bold text-[#0b2545] leading-snug mt-1 group-hover:text-blue-700 transition-colors">
                        {d.nama}
                      </h3>
                      <div className="text-[11px] font-medium text-slate-500 mt-1">
                        {d.fakultas}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[11px] text-slate-700 flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{d.pendidikan}</span>
                    </div>

                    {/* Kompetensi Utama */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Bidang Kompetensi &amp; Keahlian:
                      </span>
                      <div className="space-y-1.5">
                        {d.keahlian.map((item, kIdx) => (
                          <div key={kIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-tight text-[11.5px]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prodi List Tags */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Menaungi Program Studi:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {d.prodi.map((pName, pIdx) => (
                          <span 
                            key={pIdx} 
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {pName}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Footer Action */}
                <div className="px-5 sm:px-6 pb-5 pt-2">
                  <Link
                    href={d.link}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 text-[#0b2545] hover:text-white text-xs font-bold tracking-wide transition-all duration-200 group/btn"
                  >
                    <span>Kunjungi Laman {d.fakultasShort}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

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
