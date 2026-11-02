import { Award, Building2, MapPin, TrendingUp } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      icon: Award,
      value: "BAIK SEKALI",
      title: "Akreditasi Institusi",
      desc: "Standar mutu perguruan tinggi nasional BAN-PT",
    },
    {
      icon: Building2,
      value: "43+ GRUP",
      title: "Jejaring Korporasi",
      desc: "Didukung ekosistem industri besar Triputra Group",
    },
    {
      icon: MapPin,
      value: "SURAKARTA",
      title: "Lokasi Strategis",
      desc: "Kampus modern di pusat kota budaya Solo",
    },
    {
      icon: TrendingUp,
      value: "95%",
      title: "Tingkat Serapan Kerja",
      desc: "Alumni langsung berkarir atau berwirausaha",
    },
  ];

  return (
    <section className="bg-[#06172e] border-y border-blue-950 text-white select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-blue-900/40 text-center">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={`space-y-1.5 ${idx > 0 ? "pt-4 sm:pt-0 sm:px-4" : "sm:pr-4"}`}>
                <div className="inline-flex p-2 rounded-xl bg-blue-600/20 text-[#38bdf8] mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                  {s.title}
                </div>
                <p className="text-[11.5px] text-slate-300 max-w-[220px] mx-auto leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
