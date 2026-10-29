"use client";

import { useState } from "react";
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe2, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Compass, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
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
    <div className="space-y-8 select-none">
      
      {/* 1. HEADER OVERVIEW: Intelijen Pengunjung Setiap Lini */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Visitor Intelligence</span>
            </span>
            <span className="text-xs text-slate-400">Portal UPITRA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Analitik &amp; Trafik Pengunjung Setiap Lini
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Data pemantauan lengkap calon mahasiswa dan publik di seluruh halaman, lini prodi, geografi, dan kanal masuk.
          </p>
        </div>

        {/* Filter Rentang Tanggal & Refresh */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-[#071a33] p-1 rounded-xl border border-blue-900/80 text-xs">
            <button
              onClick={() => setSelectedRange("hari_ini")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRange === "hari_ini" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              Hari Ini
            </button>
            <button
              onClick={() => setSelectedRange("7_hari")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRange === "7_hari" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              7 Hari
            </button>
            <button
              onClick={() => setSelectedRange("30_hari")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRange === "30_hari" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              30 Hari
            </button>
            <button
              onClick={() => setSelectedRange("tahun_ini")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRange === "tahun_ini" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              2026
            </button>
          </div>

          <button
            onClick={handleRefresh}
            title="Segarkan Data Analitik"
            className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800 text-slate-300 hover:text-white hover:bg-blue-900 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-sky-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. KARTU METRIK KPI UTAMA PENGUNJUNG */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
        
        {/* KPI 1: Total Kunjungan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#071f3d] to-[#0b2545] border border-blue-900/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pageviews</span>
            <div className="p-2 rounded-xl bg-blue-600/20 text-sky-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {metrics.totalPageviews.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% dari bulan lalu</span>
          </div>
        </div>

        {/* KPI 2: Pengunjung Unik */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#071f3d] to-[#0b2545] border border-blue-900/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pengunjung Unik</span>
            <div className="p-2 rounded-xl bg-sky-600/20 text-sky-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {metrics.uniqueVisitors.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+11.8% calon mahasiswa</span>
          </div>
        </div>

        {/* KPI 3: Durasi Kunjungan */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#071f3d] to-[#0b2545] border border-blue-900/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Durasi</span>
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {metrics.avgDuration}
          </div>
          <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1.5">
            <span>Interaksi membaca aktif</span>
          </div>
        </div>

        {/* KPI 4: Konversi PMB */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#071f3d] to-[#0b2545] border border-blue-900/80 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Konversi PMB</span>
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {metrics.conversionRate}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Klik Form &amp; Brosur</span>
          </div>
        </div>

        {/* KPI 5: Pengunjung Online Live */}
        <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-blue-950/80 border border-emerald-500/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Saat Ini</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
            {metrics.activeOnline}
          </div>
          <div className="text-[11px] text-slate-300 font-medium mt-1.5">
            Pengguna sedang online
          </div>
        </div>

      </div>

      {/* 3. LINI UTAMA: TRAFIK DARI SETIAP LINI HALAMAN & MODUL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lini Halaman & Modul (8 Kolom di Desktop) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Lini Trafik per Halaman &amp; Modul Kampus</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Sebaran intensitas kunjungan calon mahasiswa di setiap lini konten
              </p>
            </div>
            <span className="text-xs font-bold text-sky-400">Total 48.720</span>
          </div>

          <div className="space-y-4">
            {initialTrafficByLine.map((line, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-blue-950 text-sky-400 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200 truncate">{line.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/80 text-slate-400 border border-blue-900 hidden sm:inline">
                      {line.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-white">{line.pageviews.toLocaleString("id-ID")}</span>
                    <span className="text-slate-400 w-10 text-right font-mono text-[11px]">{line.percentage}%</span>
                    <span className="text-emerald-400 text-[11px] font-bold w-12 text-right hidden sm:inline">{line.trend}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#030d1c] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${line.percentage * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Geografis & Asal Kota (4 Kolom di Desktop) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-5">
          <div className="pb-3 border-b border-blue-900/60">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Lini Geografis &amp; Kota</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Distribusi domisili calon pendaftar
            </p>
          </div>

          <div className="space-y-4">
            {initialGeoTraffic.map((geo, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 truncate pr-2">{geo.city}</span>
                  <span className="font-bold text-white shrink-0 font-mono">{geo.percentage}%</span>
                </div>
                <div className="w-full bg-[#030d1c] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                    style={{ width: `${geo.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-900/70 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-sky-300">Dominasi Solo Raya:</span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              54% calon mahasiswa berasal dari radius Surakarta, Sukoharjo, Klaten, dan Karanganyar.
            </p>
          </div>
        </div>

      </div>

      {/* 4. LINI PERANGKAT, KANAL RUJUKAN & WAKTU PUNCAK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Lini Perangkat & Platform */}
        <div className="p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-4">
          <div className="pb-2 border-b border-blue-900/60">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-sky-400" />
              <span>Lini Perangkat (Device)</span>
            </h3>
            <p className="text-[11px] text-slate-400">Media yang digunakan pengunjung</p>
          </div>

          <div className="space-y-3.5">
            {initialDeviceTraffic.map((dev, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-[#040e1e] border border-blue-950 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-900/60 text-sky-400 flex items-center justify-center">
                    {dev.device.includes("Mobile") ? (
                      <Smartphone className="w-4 h-4" />
                    ) : dev.device.includes("Desktop") ? (
                      <Laptop className="w-4 h-4" />
                    ) : (
                      <Tablet className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{dev.device}</div>
                    <div className="text-[10px] text-slate-400">{dev.count.toLocaleString("id-ID")} pengguna</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-sky-300 font-mono">{dev.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Sumber Rujukan (Traffic Acquisition) */}
        <div className="p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-4">
          <div className="pb-2 border-b border-blue-900/60">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Lini Saluran Rujukan</span>
            </h3>
            <p className="text-[11px] text-slate-400">Asal kanal kedatangan pengunjung</p>
          </div>

          <div className="space-y-3.5">
            {initialReferrerTraffic.map((ref, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-[#040e1e] border border-blue-950 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate">{ref.source}</div>
                  <div className="text-[10px] text-sky-300">{ref.channel}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-white font-mono">{ref.percentage}%</div>
                  <div className="text-[10px] text-slate-400">{ref.visitors.toLocaleString("id-ID")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lini Waktu Puncak (Hourly Heatmap) */}
        <div className="p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-4">
          <div className="pb-2 border-b border-blue-900/60 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Lini Jam Puncak Trafik</span>
              </h3>
              <p className="text-[11px] text-slate-400">Waktu paling aktif calon mahasiswa</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              Peak: 12:00 &amp; 20:00
            </span>
          </div>

          {/* Bar Chart Sederhana */}
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
                        ? "bg-gradient-to-t from-sky-500 to-emerald-400 shadow-xs shadow-emerald-500/30"
                        : hr.visitors >= 1000
                        ? "bg-blue-600"
                        : "bg-blue-900/60"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[9px] text-slate-400 font-mono">{hr.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. LINI AKTIVITAS LANGSUNG: LIVE STREAM LOG PENGUNJUNG */}
      <div className="p-6 rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-900/60">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Lini Aktivitas Langsung (Live Activity Stream)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Log akses kunjungan terbaru calon mahasiswa dan publik secara real-time
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Diperbarui otomatis tiap 15 detik
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">IP Anonim</th>
                <th className="py-2.5 px-3">Kota Asal</th>
                <th className="py-2.5 px-3">Halaman yang Diakses</th>
                <th className="py-2.5 px-3">Perangkat</th>
                <th className="py-2.5 px-3">Sumber Rujukan</th>
                <th className="py-2.5 px-3 text-right">Durasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {initialLiveVisitorLogs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-sky-300 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                    {log.ipMasked}
                  </td>
                  <td className="py-3 px-3 font-medium text-white whitespace-nowrap">
                    {log.city}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-900 text-sky-200 font-mono text-[11px]">
                      {log.pageVisited}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    {log.device}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {log.referrer}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold whitespace-nowrap">
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

