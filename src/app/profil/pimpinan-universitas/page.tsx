import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
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
  title: "Pimpinan Universitas - Rektorat & Dekanat UPITRA",
  description: "Profil jajaran eksekutif Universitas Pignatelli Triputra Surakarta: Rektor Neil Semuel Rupidara, Ph.D, para Wakil Rektor, dan Dekanat 4 Fakultas.",
};

interface PimpinanItem {
  nama: string;
  jabatan: string;
  bidang: string;
  foto: string;
  deskripsi: string;
  kredensial: string[];
}

const pimpinanList: PimpinanItem[] = [
  {
    nama: "Neil Semuel Rupidara, S.E., M.Sc., Ph.D",
    jabatan: "Rektor Universitas Pignatelli Triputra",
    bidang: "Pimpinan Eksekutif Tertinggi Universitas",
    foto: "/images/pimpinan/rektor-neil-rupidara.jpg",
    deskripsi: "Memimpin arah strategis, penguatan kelembagaan, serta kolaborasi ekosistem pendidikan UPITRA dengan Triputra Group dan mitra industri nasional.",
    kredensial: ["University of Melbourne, Australia (Ph.D)", "Pakar Manajemen Strategis & Kepemimpinan", "Dosen & Peneliti Manajemen Korporat"],
  },
  {
    nama: "Prof. Johana Endang Prawitasari, Ph.D",
    jabatan: "Wakil Rektor 1 (Akademik & Kemahasiswaan)",
    bidang: "Bidang Akademik, Riset & Kemahasiswaan",
    foto: "/images/pimpinan/wr1-johana-prawitasari.jpg",
    deskripsi: "Bertanggung jawab atas penjaminan mutu kurikulum transformatif, peningkatan prestasi mahasiswa, kegiatan organisasi kemahasiswaan, dan riset inovatif.",
    kredensial: ["Guru Besar / Profesor Perguruan Tinggi", "Pakar Psikologi & Pendidikan Karakter", "Pengembang Kurikulum Transformatif Nasional"],
  },
  {
    nama: "Yohanes Bayu Samudro, S.Pd., M.Pd",
    jabatan: "Wakil Rektor 2 (Operasional, Keuangan & SDM)",
    bidang: "Bidang Sumber Daya, Keuangan & Operasional",
    foto: "/images/pimpinan/wr2-bayu-samudro.jpg",
    deskripsi: "Mengelola efisiensi operasional kampus modern, keberlanjutan keuangan, pengembangan sarana dan prasarana berbasis digital, serta tata kelola SDM prima.",
    kredensial: ["Magister Pendidikan (M.Pd)", "Pakar Manajemen Operasional Pendidikan", "Pengembang Infrastruktur Digital Kampus"],
  },
];

const dekanatList = [
  {
    fakultas: "Fakultas Sains & Teknologi (FST)",
    dekan: "Dekan FST",
    link: "/fst",
    prodi: ["S1 Informatika", "S1 Sistem Informasi", "S1 Rekayasa Perangkat Lunak"],
    fokus: "Transformasi komputasi digital, kecerdasan buatan (AI), rekayasa sistem cloud, dan keamanan siber.",
  },
  {
    fakultas: "Fakultas Ekonomi & Bisnis (FEB)",
    dekan: "Dekan FEB",
    link: "/feb",
    prodi: ["S1 Manajemen", "S1 Akuntansi"],
    fokus: "Manajemen rantai pasok modern, akuntansi digital, technopreneurship, dan keberlanjutan korporasi Triputra.",
  },
  {
    fakultas: "Fakultas Sosial Humaniora (FSH)",
    dekan: "Dekan FSH",
    link: "/fsh",
    prodi: ["S1 Pariwisata", "S1 Bahasa Inggris"],
    fokus: "Hospitality global, pariwisata berkelanjutan, komunikasi bisnis internasional, dan diplomasi budaya.",
  },
  {
    fakultas: "Fakultas Kesehatan (FKes)",
    dekan: "Dekan FKes",
    link: "/fkes",
    prodi: ["S1 Keselamatan & Kesehatan Kerja (K3)", "S1 Fisioterapi", "D3 Keperawatan"],
    fokus: "K3 industri manufaktur & perkebunan, rehabilitasi muskuloskeletal/olahraga, dan keperawatan vokasional profesional.",
  },
];

export default function PimpinanUniversitasPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Struktur Kepemimpinan Institusi"
        title="Pimpinan Universitas"
        description="Jajaran Rektorat dan Dekanat yang mendedikasikan keahlian dan komitmen untuk mengantarkan UPITRA menjadi mercusuar pendidikan tinggi berkarakter unggul."
        breadcrumbs={[
          { label: "Profil", href: "/profil" },
          { label: "Pimpinan Universitas" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* REKTORAT */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Eksekutif Universitas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Rektorat Universitas Pignatelli Triputra
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Kepemimpinan yang menggabungkan keunggulan akademik global dengan pemahaman mendalam atas kebutuhan industri nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pimpinanList.map((p, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col"
              >
                <div className="relative h-64 bg-gradient-to-t from-[#06172e] via-blue-900 to-blue-800 flex items-center justify-center p-4 overflow-hidden">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center shadow-lg overflow-hidden backdrop-blur-xs">
                    <img
                      src={p.foto}
                      alt={p.nama}
                      className="w-full h-full object-cover"
                    />
                    <Users className="w-16 h-16 text-white/50" />
                  </div>
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-blue-950/80 text-[10px] font-bold text-sky-300 uppercase tracking-wider border border-blue-800/60">
                    {p.bidang}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#0b2545] leading-snug">
                      {p.nama}
                    </h3>
                    <div className="text-xs font-semibold text-blue-700">
                      {p.jabatan}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {p.deskripsi}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Kompetensi & Latar Belakang:
                    </div>
                    {p.kredensial.map((kred, kIdx) => (
                      <div key={kIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{kred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEKANAT 4 FAKULTAS */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pimpinan Fakultas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              Dekanat 4 Fakultas Unggulan
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Pimpinan dekanat mengoordinasikan mutu pembelajaran, kurikulum, dan riset pada masing-masing rumpun keilmuan:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dekanatList.map((d, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0b2545] leading-snug">
                    {d.fakultas}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {d.fokus}
                  </p>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Program Studi:</span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {d.prodi.map((item, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={d.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 border-t border-slate-100"
                >
                  <span>Kunjungi Laman Fakultas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
