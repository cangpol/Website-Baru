import Link from "next/link";
import { Rocket, Target, Users, TrendingUp, Award, ArrowRight, Lightbulb, Briefcase } from "lucide-react";

export default function EntrepreneurshipSection() {
  const features = [
    {
      icon: Briefcase,
      title: "Jalur Karir Industri Terpadu",
      desc: "Kurikulum diselaraskan langsung dengan kebutuhan dunia industri, didukung jaringan luas Triputra Group untuk program magang dan penempatan kerja.",
    },
    {
      icon: Lightbulb,
      title: "Pusat Inovasi & Technopreneur",
      desc: "Fasilitas riset terapan bagi mahasiswa Fakultas Sains & Technology, Social Humaniora, dan FEB untuk melahirkan inovasi tepat guna.",
    },
    {
      icon: Users,
      title: "Mentorship Praktisi Berpengalaman",
      desc: "Didampingi langsung oleh para profesional, manajer korporat, dan akademisi berdedikasi tinggi dalam mengasah kompetensi teknis dan karakter.",
    },
    {
      icon: TrendingUp,
      title: "Pembinaan Karakter & Kepemimpinan",
      desc: "Menanamkan nilai-nilai integritas, etika kerja, kepedulian sosial, dan keunggulan eksekusi sebagai bekal kepemimpinan masa depan.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-blue-600" />
            Ekosistem Karir & Inovasi UPITRA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight">
            Mempersiapkan Lulusan Kompeten, Berkarakter & Unggul
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Di Universitas Pignatelli Triputra (UPITRA), mahasiswa dididik untuk menguasai keahlian akademik terkini sekaligus memiliki ketahanan mental dan etika profesional yang kokoh.
          </p>
        </div>

        {/* Feature Cards Grid - Blue & White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-300 space-y-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-blue-500/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Banner Showcase - Blue & White */}
        <div className="rounded-3xl bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-widest">
                <Award className="w-4 h-4" />
                Dukungan Penuh Ekosistem Triputra
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Raih Peluang Karir Nyata Bersama UPITRA
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                Dapatkan akses langsung ke jejaring industri manufaktur, agribisnis, teknologi, perhotelan, dan jasa keuangan terkemuka di Indonesia.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/pmb"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wide shadow-md transition-all hover:scale-105"
              >
                Daftar Mahasiswa Baru
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all text-center"
              >
                Pilihan Program Studi
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
