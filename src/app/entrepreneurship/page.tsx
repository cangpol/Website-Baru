import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Rocket, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase
} from "lucide-react";

export default function EntrepreneurshipPage() {
  const alumniStartups = [
    {
      name: "Soloraya AgriLogistics",
      category: "Supply Chain & Agribusiness",
      founded: "2023",
      valuation: "Mitra 50+ Petani & Industri",
      desc: "Platform rantai pasok komoditas pertanian dan distribusi pangan modern yang menghubungkan petani Jawa Tengah dengan pasar retail.",
      founders: "Kolaborasi Alumni Manajemen Bisnis (FEB) & Informatika (FST)",
    },
    {
      name: "JavaHeritage Tour & MICE",
      category: "Hospitality & Cultural Tourism",
      founded: "2022",
      valuation: "Omset Rp 3 M / tahun",
      desc: "Agensi perjalanan wisata budaya, paket heritage Solo Raya, dan event organizer MICE internasional berbasis komunitas.",
      founders: "Alumni S1 Pariwisata (Fakultas Social Humaniora)",
    },
    {
      name: "TransLingua Global Media",
      category: "Corporate Translation & Localization",
      founded: "2024",
      valuation: "Klien 20+ Perusahaan Multinasional",
      desc: "Layanan lokalisasi konten digital, penerjemahan dokumen hukum bisnis, dan konsultasi komunikasi korporat dwibahasa.",
      founders: "Alumni S1 Bahasa Inggris (Fakultas Social Humaniora)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Banner - Blue & White */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white py-20 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Rocket className="w-4 h-4 text-sky-400" />
              Center for Innovation & Career Development
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Pusat Inovasi & Kewirausahaan UPITRA
            </h1>
            <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Di <strong>Universitas Pignatelli Triputra (UPITRA)</strong>, mahasiswa dipersiapkan tidak hanya menguasai teori, melainkan mampu menciptakan nilai tambah ekonomi dan sosial yang nyata.
            </p>
          </div>
        </section>

        {/* 5 Tahap Pembinaan Karir & Usaha */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545]">
                Tahapan Pembinaan Mahasiswa UPITRA
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Dari semester awal hingga kelulusan, Anda dibimbing oleh dosen praktisi dan mentor korporat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "01", title: "Character & Ethics", desc: "Penanaman nilai integritas, etika kerja luhur, dan disiplin profesional." },
                { step: "02", title: "Skill & Applied Project", desc: "Praktik langsung di laboratorium modern FST, FSH, dan FEB." },
                { step: "03", title: "Industry Immersion", desc: "Program magang kerja bersertifikat di unit bisnis Triputra Group & mitra." },
                { step: "04", title: "Innovation Pitch", desc: "Kompetisi ide bisnis dan inovasi teknologi dengan bimbingan praktisi." },
                { step: "05", title: "Career Placement", desc: "Penyaluran kerja dan pendampingan pembentukan rintisan usaha mandiri." },
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <span className="text-2xl font-black text-blue-600">{item.step}</span>
                  <h4 className="text-sm font-bold text-[#0b2545]">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Startup & Karya Alumni Showcase */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545]">
                Inovasi & Kiprah Lulusan UPITRA
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Solusi nyata di bidang teknologi, pariwisata, komunikasi, dan manajemen bisnis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumniStartups.map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-400 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                      {s.category}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700">
                      {s.valuation}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0b2545]">{s.name}</h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">Berdiri sejak {s.founded}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                    👤 {s.founders}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wide shadow-md shadow-blue-500/25 transition-all hover:scale-105"
              >
                Bergabung Bersama UPITRA
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
