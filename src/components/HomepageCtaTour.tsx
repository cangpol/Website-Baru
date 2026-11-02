"use client";

import { useState, useTransition } from "react";
import { submitAdmissionLead, AdmissionFormState } from "@/app/actions/admission";
import { submitCampusTourBooking, CampusTourFormState } from "@/app/actions/campusTour";
import { 
  GraduationCap, 
  Compass, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Users, 
  Building2, 
  PhoneCall,
  Sparkles
} from "lucide-react";

export default function HomepageCtaTour() {
  const [activeTab, setActiveTab] = useState<"pmb" | "tour">("pmb");
  const [isPending, startTransition] = useTransition();

  // Admission state
  const [leadState, setLeadState] = useState<AdmissionFormState | null>(null);
  
  // Tour state
  const [tourState, setTourState] = useState<CampusTourFormState | null>(null);

  const handleAdmissionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Honeypot anti-spam check
    const honeypot = formData.get("website_hp");
    if (honeypot) return;

    startTransition(async () => {
      const res = await submitAdmissionLead({ success: false, message: "" }, formData);
      setLeadState(res);
    });
  };

  const handleTourSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot anti-spam check
    const honeypot = formData.get("website_hp");
    if (honeypot) return;

    startTransition(async () => {
      const res = await submitCampusTourBooking({ success: false, message: "" }, formData);
      setTourState(res);
    });
  };

  return (
    <section id="daftar" className="py-20 bg-slate-100/70 border-b border-slate-200 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px]">
        
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* SISI KIRI: Branding & Informasi Hotline (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#06172e] via-[#0b2545] to-[#006bbd] p-8 sm:p-12 text-white flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#FFD400]" />
                <span>Penerimaan Mahasiswa Baru 2026</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Mulai Langkah Menuju Masa Depanmu
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Daftarkan diri Anda sekarang atau jadwalkan kunjungan langsung ke kampus modern UPITRA di Surakarta bersama keluarga dan rekan sekolah.
                </p>
              </div>

              {/* Keuntungan Kuliah di UPITRA */}
              <div className="space-y-3 pt-4 border-t border-blue-800/60">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD400] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Jaminan Magang di Triputra Group</h5>
                    <p className="text-xs text-slate-300">Immersion Program 3+1 langsung di anak perusahaan nasional.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD400] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Beasiswa Prestasi &amp; Keringanan Biaya</h5>
                    <p className="text-xs text-slate-300">Skema beasiswa akademik, non-akademik, dan kemitraan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD400] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-white">Fasilitas Laboratorium Berstandar Industri</h5>
                    <p className="text-xs text-slate-300">Studio VR/AR, lab komputer modern, dan perpustakaan digital.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hubungi Admisi Langsung */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFD400] uppercase tracking-wider">
                <PhoneCall className="w-4 h-4" />
                <span>Hotline Konseling PMB</span>
              </div>
              <p className="text-xs text-slate-200">
                Konsultasikan pilihan prodi dan simulasi biaya kuliah langsung via WhatsApp:
              </p>
              <a
                href="https://wa.me/628112658884?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20pendaftaran%20kuliah"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-[#FFD400] transition-colors"
              >
                <span>+62 811-2658-884</span>
              </a>
            </div>
          </div>

          {/* SISI KANAN: Formulir Tabbed (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            
            {/* Tab Navigators */}
            <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("pmb")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === "pmb"
                    ? "bg-white text-[#06172e] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#006bbd]" />
                <span>Formulir Cepat PMB</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("tour")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === "tour"
                    ? "bg-white text-[#06172e] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Compass className="w-4 h-4 text-[#006bbd]" />
                <span>Reservasi Campus Tour</span>
              </button>
            </div>

            {/* TAB 1: FORMULIR PENDAFTARAN CEPAT PMB */}
            {activeTab === "pmb" && (
              <div className="space-y-6">
                {leadState?.success ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Pendaftaran Berhasil Dikirim!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                      {leadState.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setLeadState(null)}
                      className="mt-2 text-xs font-bold text-emerald-800 underline underline-offset-4 hover:text-emerald-900 cursor-pointer"
                    >
                      Kirim formulir lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
                    <input type="text" name="website_hp" className="hidden" tabIndex={-1} autoComplete="off" />

                    {leadState?.message && !leadState.success && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-semibold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{leadState.message}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Nama Lengkap Calon Mahasiswa *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="cth: Michael Chandra"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {leadState?.errors?.fullName && (
                          <p className="text-[11px] text-rose-600 font-medium">{leadState.errors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Nomor WhatsApp Aktif *
                        </label>
                        <input
                          type="tel"
                          name="phoneWhatsapp"
                          required
                          placeholder="cth: 081234567890"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {leadState?.errors?.phoneWhatsapp && (
                          <p className="text-[11px] text-rose-600 font-medium">{leadState.errors.phoneWhatsapp}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Alamat Email Aktif *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="cth: nama@email.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {leadState?.errors?.email && (
                          <p className="text-[11px] text-rose-600 font-medium">{leadState.errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Asal SMA / SMK / Sederajat *
                        </label>
                        <input
                          type="text"
                          name="highSchool"
                          required
                          placeholder="cth: SMA Regina Pacis Surakarta"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {leadState?.errors?.highSchool && (
                          <p className="text-[11px] text-rose-600 font-medium">{leadState.errors.highSchool}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Pilihan Program Studi
                        </label>
                        <select
                          name="programId"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all bg-white"
                        >
                          <option value="">-- Pilih Program Studi --</option>
                          <option value="informatika">S1 - Informatika</option>
                          <option value="sistem-informasi">S1 - Sistem Informasi</option>
                          <option value="rekayasa-perangkat-lunak">S1 - Rekayasa Perangkat Lunak</option>
                          <option value="manajemen">S1 - Manajemen</option>
                          <option value="akuntansi">S1 - Akuntansi</option>
                          <option value="pariwisata">S1 - Pariwisata</option>
                          <option value="bahasa-inggris">S1 - Bahasa Inggris</option>
                          <option value="k3">S1 - Kesehatan &amp; Keselamatan Kerja</option>
                          <option value="fisioterapi">S1 - Fisioterapi</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Kota Asal Tempat Tinggal
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="cth: Surakarta, Boyolali, Semarang"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Pertanyaan / Catatan Tambahan (Opsional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Tuliskan pertanyaan seputar beasiswa, jalur masuk, atau asrama..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#006bbd] hover:bg-[#072b61] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isPending ? "Mengirim Pendaftaran..." : "Kirim Formulir Pendaftaran Cepat"}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: RESERVASI JADWAL CAMPUS TOUR */}
            {activeTab === "tour" && (
              <div className="space-y-6">
                {tourState?.success ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Reservasi Campus Tour Berhasil!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                      {tourState.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setTourState(null)}
                      className="mt-2 text-xs font-bold text-emerald-800 underline underline-offset-4 hover:text-emerald-900 cursor-pointer"
                    >
                      Ajukan jadwal lainnya
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
                    <input type="text" name="website_hp" className="hidden" tabIndex={-1} autoComplete="off" />

                    {tourState?.message && !tourState.success && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-semibold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{tourState.message}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Nama Lengkap / Nama Koordinator *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="cth: Budi Setiawan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {tourState?.errors?.fullName && (
                          <p className="text-[11px] text-rose-600 font-medium">{tourState.errors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Nomor WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phoneWhatsapp"
                          required
                          placeholder="cth: 081234567890"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                        {tourState?.errors?.phoneWhatsapp && (
                          <p className="text-[11px] text-rose-600 font-medium">{tourState.errors.phoneWhatsapp}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Email Aktif *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="nama@email.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Rencana Tanggal Kunjungan *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Perkiraan Jumlah Peserta
                        </label>
                        <input
                          type="number"
                          name="totalVisitor"
                          defaultValue={1}
                          min={1}
                          max={100}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Catatan Khusus Kunjungan (Kunjungan Pribadi / Sekolah / Instansi)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Contoh: Kunjungan bersama orang tua ingin melihat lab FST dan simulasi pendaftaran..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#006bbd] focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#06172e] hover:bg-[#006bbd] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Calendar className="w-4 h-4 text-[#FFD400]" />
                      <span>{isPending ? "Memproses Reservasi..." : "Kirim Pengajuan Campus Tour"}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
