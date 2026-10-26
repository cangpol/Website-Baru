import { Award, Users, Building, TrendingUp } from "lucide-react";

export default function NumbersCounter() {
  const stats = [
    {
      icon: Award,
      value: "BAIK SEKALI",
      title: "AKREDITASI INSTITUSI",
      desc: "Peringkat Akreditasi BAN-PT dengan standar mutu perguruan tinggi nasional.",
    },
    {
      icon: Users,
      value: "4 FAKULTAS",
      title: "FAKULTAS S1 & D3",
      desc: "Sains & Tech, Ekonomic & Bussiness, Social Humaniora, dan Health.",
    },
    {
      icon: Building,
      value: "100+ MITRA",
      title: "JEJARING INDUSTRI",
      desc: "Dukungan ekosistem korporat Triputra Group & mitra industri nasional.",
    },
    {
      icon: TrendingUp,
      value: "95%",
      title: "SERAPAN LULUSAN",
      desc: "Tingkat alumni yang langsung berkarir profesional atau mendirikan usaha.",
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-1">
            STATISTIK UTAMA
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] tracking-tight">
            UPITRA IN NUMBERS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 text-center flex flex-col items-center justify-between group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight group-hover:text-blue-600 transition-colors">
                {item.value}
              </div>
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1 mb-2">
                {item.title}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

