"use client";

import { useActionState } from "react";
import { submitAdmissionLead, type AdmissionFormState } from "@/app/actions/admission";
import { Send, CheckCircle, AlertCircle, Sparkles, Phone, ShieldCheck } from "lucide-react";

interface ProgramOption {
  id: string;
  name: string;
  degreeLevel: string;
}

const initialState: AdmissionFormState = {
  success: false,
  message: "",
};

export default function AdmissionFunnel({ programs = [] }: { programs?: ProgramOption[] }) {
  const [state, formAction, isPending] = useActionState(submitAdmissionLead, initialState);

  return (
    <div id="daftar-pmb" className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          PMB Online UPITRA 2026 / 2027
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b2545]">
          Pendaftaran Mahasiswa Baru
        </h3>
        <p className="text-xs text-slate-500">
          Konsultasi bebas biaya, informasi beasiswa prestasi Triputra, dan jalur tanpa tes.
        </p>
      </div>

      {state.success ? (
        <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#0b2545]">Pendaftaran Berhasil Dikirim!</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {state.message}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/628112907500"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Chat WhatsApp Admisi UPITRA
            </a>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {state.message && !state.success && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Calon Mahasiswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Contoh: Michael Santoso"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            {state.errors?.fullName && (
              <p className="text-[11px] text-rose-600 mt-1">{state.errors.fullName}</p>
            )}
          </div>

          {/* Phone / WhatsApp & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneWhatsapp"
                required
                placeholder="081234567890"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              {state.errors?.phoneWhatsapp && (
                <p className="text-[11px] text-rose-600 mt-1">{state.errors.phoneWhatsapp}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="michael@email.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              {state.errors?.email && (
                <p className="text-[11px] text-rose-600 mt-1">{state.errors.email}</p>
              )}
            </div>
          </div>

          {/* Asal Sekolah & Kota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asal Sekolah (SMA / SMK) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="highSchool"
                required
                placeholder="SMA Negeri 1 Surakarta"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kota Domisili
              </label>
              <input
                type="text"
                name="city"
                placeholder="Surakarta / Boyolali / Karanganyar"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Program Pilihan - 3 Fakultas UPITRA */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Program Studi Minat (S1)
            </label>
            <select
              name="programId"
              defaultValue=""
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white text-slate-700"
            >
              <option value="">-- Pilih Program Studi (S1 / D3) --</option>
              {programs.length > 0 ? (
                programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))
              ) : (
                <>
                  <optgroup label="Faculty Sains & Technology">
                    <option value="informatika">Informatika (S1)</option>
                    <option value="sistem-informasi">Sistem Informasi (S1)</option>
                    <option value="rekayasa-perangkat-lunak">Rekayasa Perangkat Lunak (S1)</option>
                  </optgroup>
                  <optgroup label="Faculty Ekonomic & Bussiness">
                    <option value="manajemen-bisnis">Manajemen (S1)</option>
                    <option value="akuntansi">Akuntansi (S1)</option>
                  </optgroup>
                  <optgroup label="Faculty Social Humaniora">
                    <option value="pariwisata">Pariwisata (S1)</option>
                    <option value="bahasa-inggris">Bahasa Inggris (S1)</option>
                  </optgroup>
                  <optgroup label="Faculty Health">
                    <option value="kesehatan-dan-keselamatan-kerja">Kesehatan & Keselamatan Kerja (S1)</option>
                    <option value="fisioterapi">Fisioterapi (S1)</option>
                    <option value="keperawatan">Keperawatan (D3)</option>
                  </optgroup>
                </>
              )}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pertanyaan / Rencana Beasiswa (Opsional)
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Contoh: Ingin informasi beasiswa Triputra Peduli & asrama mahasiswa"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <span>Memproses Data...</span>
              ) : (
                <>
                  <span>KIRIM PENDAFTARAN SEKARANG</span>
                  <Send className="w-4 h-4 text-sky-200" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Data Anda terjamin aman dan hanya digunakan untuk keperluan admisi resmi UPITRA.</span>
          </div>
        </form>
      )}
    </div>
  );
}
