"use client";

import { useState } from "react";
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Compass, 
  Activity, 
  MapPin, 
  Radio, 
  RefreshCw,
  Sparkles
} from "lucide-react";
import { 
  initialVisitorMetric, 
  initialTrafficByLine, 
  initialGeoTraffic, 
  initialDeviceTraffic, 
  initialReferrerTraffic, 
  initialHourlyTraffic, 
  initialLiveVisitorLogs 
} from "@/lib/adminDataStore";

export default function AdminOverviewAnalyticsPage() {
  const [metrics, setMetrics] = useState(initialVisitorMetric);
  const [selectedRange, setSelectedRange] = useState<"hari_ini" | "7_hari" | "30_hari" | "tahun_ini">("30_hari");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics((prev) => ({
        ...prev,
        activeOnline: Math.floor(Math.random() * 15) + 20,
        totalPageviews: prev.totalPageviews + Math.floor(Math.random() * 50),
      }));
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-8 select-none font-sans">
      
      {/* 1. HEADER OVERVIEW: Intelijen Pengunjung Setiap Lini */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Real-Time Visitor Intelligence</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">Portal UPITRA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            Analitik &amp; Trafik Pengunjung Setiap Lini
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data pemantauan lengkap calon mahasiswa dan publik di seluruh halaman, lini prodi, geografi, dan kanal masuk.
          </p>
        </div>

        {/* Filter Rentang Tanggal & Refresh */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs">
            {(["hari_ini", "7_hari", "30_hari", "tahun_ini"] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setSelectedRange(rng)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedRange === rng ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
              >
                {rng === "hari_ini" ? "Hari Ini" : rng === "7_hari" ? "7 Hari" : rng === "30_hari" ? "30 Hari" : "2026"}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            title="Segarkan Data Analitik"
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. KARTU METRIK KPI UTAMA PENGUNJUNG (Biru & Putih) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
        
        {/* KPI 1: Total Kunjungan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pageviews</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {metrics.totalPageviews.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% dari bulan lalu</span>
          </div>
        </div>

        {/* KPI 2: Pengunjung Unik */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pengunjung Unik</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {metrics.uniqueVisitors.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+11.8% calon mahasiswa</span>
          </div>
        </div>

        {/* KPI 3: Durasi Kunjungan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Durasi</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {metrics.avgDuration}
          </div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-1.5">
            <span>Interaksi membaca aktif</span>
          </div>
        </div>

        {/* KPI 4: Konversi PMB */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Konversi PMB</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            {metrics.conversionRate}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Klik Form &amp; Brosur</span>
          </div>
        </div>

        {/* KPI 5: Pengunjung Online Live */}
        <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-white to-blue-50/50 border border-blue-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-600" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Live Saat Ini</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight">
            {metrics.activeOnline}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1.5">
            Pengguna sedang online
          </div>
        </div>

      </div>

      {/* 3. LINI UTAMA: TRAFIK DARI SETIAP LINI HALAMAN & MODUL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lini Halaman & Modul (8 Kolom di Desktop) */}
        <div className="lg:col-span-8 p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-[#06172e] flex items-center gap-2">
                <span>Lini Trafik per Halaman &amp; Modul Kampus</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sebaran intensitas kunjungan calon mahasiswa di setiap lini konten
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Total 48.720
            </span>
          </div>

          <div className="space-y-4">
            {initialTrafficByLine.map((line, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-[#06172e] truncate">{line.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline font-medium">
                      {line.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-[#06172e]">{line.pageviews.toLocaleString("id-ID")}</span>
                    <span className="text-slate-500 w-10 text-right font-mono text-[11px]">{line.percentage}%</span>
                    <span className="text-blue-700 text-[11px] font-bold w-12 text-right hidden sm:inline">{line.trend}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${line.percentage * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Geografis & Asal Kota (4 Kolom di Desktop) */}
        <div className="lg:col-span-4 p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-black text-[#06172e] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Lini Geografis &amp; Kota</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribusi domisili calon pendaftar
            </p>
          </div>

          <div className="space-y-4">
            {initialGeoTraffic.map((geo, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 truncate pr-2">{geo.city}</span>
                  <span className="font-bold text-[#06172e] shrink-0 font-mono">{geo.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${geo.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
            <span className="font-bold text-blue-800">Dominasi Solo Raya:</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              54% calon mahasiswa berasal dari radius Surakarta, Sukoharjo, Klaten, dan Karanganyar.
            </p>
          </div>
        </div>

      </div>

      {/* 4. LINI PERANGKAT, KANAL RUJUKAN & WAKTU PUNCAK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Lini Perangkat & Platform */}
        <div className="p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-[#06172e] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Lini Perangkat (Device)</span>
            </h3>
            <p className="text-[11px] text-slate-500">Media yang digunakan pengunjung</p>
          </div>

          <div className="space-y-3.5">
            {initialDeviceTraffic.map((dev, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    {dev.device.includes("Mobile") ? (
                      <Smartphone className="w-4 h-4" />
                    ) : dev.device.includes("Desktop") ? (
                      <Laptop className="w-4 h-4" />
                    ) : (
                      <Tablet className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#06172e]">{dev.device}</div>
                    <div className="text-[10px] text-slate-500">{dev.count.toLocaleString("id-ID")} pengguna</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-blue-700 font-mono">{dev.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Sumber Rujukan (Traffic Acquisition) */}
        <div className="p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-[#06172e] flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Lini Saluran Rujukan</span>
            </h3>
            <p className="text-[11px] text-slate-500">Asal kanal kedatangan pengunjung</p>
          </div>

          <div className="space-y-3.5">
            {initialReferrerTraffic.map((ref, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-colors">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-[#06172e] truncate">{ref.source}</div>
                  <div className="text-[10px] text-blue-600 font-medium">{ref.channel}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-[#06172e] font-mono">{ref.percentage}%</div>
                  <div className="text-[10px] text-slate-500">{ref.visitors.toLocaleString("id-ID")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Waktu Puncak (Hourly Heatmap) */}
        <div className="p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#06172e] flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Lini Jam Puncak Trafik</span>
              </h3>
              <p className="text-[11px] text-slate-500">Waktu paling aktif calon mahasiswa</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              Peak: 12:00 &amp; 20:00
            </span>
          </div>

          {/* Bar Chart */}
          <div className="h-44 flex items-end justify-between gap-1.5 pt-4">
            {initialHourlyTraffic.map((hr, idx) => {
              const heightPercent = Math.round((hr.visitors / 1800) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {hr.visitors}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      hr.visitors >= 1500
                        ? "bg-blue-700 shadow-xs shadow-blue-500/30"
                        : hr.visitors >= 1000
                        ? "bg-blue-600"
                        : "bg-blue-300"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[9px] text-slate-500 font-mono">{hr.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. LINI AKTIVITAS LANGSUNG: LIVE STREAM LOG PENGUNJUNG */}
      <div className="p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-[#06172e] flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Lini Aktivitas Langsung (Live Activity Stream)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Log akses kunjungan terbaru calon mahasiswa dan publik secara real-time
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Diperbarui otomatis tiap 15 detik
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">IP Anonim</th>
                <th className="py-2.5 px-3">Kota Asal</th>
                <th className="py-2.5 px-3">Halaman yang Diakses</th>
                <th className="py-2.5 px-3">Perangkat</th>
                <th className="py-2.5 px-3">Sumber Rujukan</th>
                <th className="py-2.5 px-3 text-right">Durasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialLiveVisitorLogs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-blue-700 font-semibold whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                    {log.ipMasked}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#06172e] whitespace-nowrap">
                    {log.city}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-semibold">
                      {log.pageVisited}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {log.device}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {log.referrer}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-blue-700 font-bold whitespace-nowrap">
                    {log.durationSeconds}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
