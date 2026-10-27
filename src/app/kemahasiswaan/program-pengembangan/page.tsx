import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Sparkles, 
  Target, 
  Award, 
  Compass, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Lightbulb, 
  GraduationCap 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Program Pengembangan Mahasiswa - Kemahasiswaan UPITRA",
  description: "Program unggulan pengembangan karakter, kepemimpinan Triputra DNA, Latihan Keterampilan Manajemen Mahasiswa (LKMM), dan pembinaan prestasi di UPITRA.",
};

const programList = [
  {
    title: "Triputra Leadership Camp (TLC)",
    kategori: "Kepemimpinan & Karakter",
    desc: "Program pelatihan kepemimpinan intensif selama 3 hari di alam terbuka yang dirancang khusus bersama tim Talent Management Triputra Group untuk mengasah ketangguhan mental, integritas, dan kerjasama tim.",
    manfaat: ["Internalisasi Triputra DNA", "Sertifikat Eksekutif Leadership", "Prioritas Seleksi Magang Triputra"],
  },
  {
    title: "Latihan Keterampilan Manajemen Mahasiswa (LKMM)",
    kategori: "Manajemen Organisasi",
    desc: "Pelatihan berjenjang (Tingkat Pra-Dasar hingga Tingkat Menengah) yang membekali pengurus ormawa kemampuan merumuskan visi kerja, tata kelola keuangan organisasi, manajemen konflik, dan evaluasi program.",
    manfaat: ["Keahlian Manajemen Proyek", "Sertifikasi Kepengurusan Ormawa", "Portofolio SKPI Resmi"],
  },
  {
    title: "Inkubasi Program Kreativitas Mahasiswa (PKM)",
    kategori: "Penalaran & Riset",
    desc: "Bootcamp bimbingan penulisan proposal PKM 8 bidang (Riset, Karsa Cipta, Kewirausahaan, Pengabdian Masyarakat, dll.) bersama dosen pendamping bereputasi nasional hingga lolos PIMNAS.",
    manfaat: ["Hibah Pendanaan Kemendikbud", "Rekognisi Konversi SKS Kuliah", "Pendampingan Paten HKI"],
  },
  {
    title: "Sertifikasi Kompetensi Profesi Industri",
    kategori: "Kesiapan Karir",
    desc: "Fasilitasi ujian sertifikasi kompetensi berstandar BNSP, Microsoft Certified Educator/Developer, Cisco CCNA, SAP ERP Financials, dan Brevet Pajak A & B bagi mahasiswa tingkat akhir.",
    manfaat: ["Sertifikat Lisensi Resmi BNSP", "Daya Saing Tinggi di Pasar Kerja", "Tertera dalam Surat Keterangan Pendamping Ijazah (SKPI)"],
  },
  {
    title: "Aksi Belarasa Peduli Sesama (Community Empowerment)",
    kategori: "Spiritualitas & Sosial",
    desc: "Kegiatan nyata terjun ke masyarakat untuk mendampingi pelaku UMKM, pelatihan melek digital bagi anak panti asuhan, dan bakti lingkungan hidup di wilayah Surakarta dan sekitarnya.",
    manfaat: ["Peningkatan Empati Sosial", "Pengalaman Lapangan Nyata", "Penanaman Nilai Kasih Ignasian"],
  },
];

export default function ProgramPengembanganMahasiswaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <PageHeader 
        badge="Pengembangan Karakter & Talenta"
        title="Program Pengembangan Mahasiswa"
        description="Membina insan akademika yang adaptif, berintegritas tinggi, berdaya saing global, dan siap menjadi motor transformasi di dunia industri."
        breadcrumbs={[
          { label: "Kemahasiswaan", href: "/kemahasiswaan" },
          { label: "Program Pengembangan" }
        ]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Intro */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Holistic Student Development</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545]">
              Pengembangan Diri Menyeluruh di Luar Ruang Kuliah
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Di UPITRA, pendidikan tidak terbatas pada ruang kelas formal. Melalui rangkaian program pengembangan holistik, setiap mahasiswa dipersiapkan memiliki *hard skills* yang tajam dan *soft skills* kepemimpinan yang matang.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Leadership DNA
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Sertifikasi BNSP
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              Inkubasi PKM
            </span>
          </div>
        </section>

        {/* Daftar 5 Program Unggulan */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Inisiatif Terencana</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              5 Program Unggulan Pengembangan Mahasiswa
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Rangkaian program yang dapat diikuti mahasiswa selama masa studi di UPITRA:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programList.map((prog, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {prog.kategori}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0b2545] leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Manfaat & Luaran Utama:</span>
                  <div className="space-y-1">
                    {prog.manfaat.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
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

