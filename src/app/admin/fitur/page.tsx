"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, ToggleLeft } from "lucide-react";
import { getAdminFeatureFlags, setAdminFeatureAction } from "@/server/features";
import { ADMIN_FEATURES, isFeatureEnabled, type FeatureFlags } from "@/lib/adminFeatures";
import { swalConfirm, swalToast } from "@/lib/swal";
import { LoadingState } from "@/components/admin/crud-ui";


export default function AdminFiturPage() {
  const [flags, setFlags] = useState<FeatureFlags>({});
  const [loaded, setLoaded] = useState(false);
  const [denied, setDenied] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    getAdminFeatureFlags()
      .then((res) => {
        if (res.ok) setFlags(res.flags);
        else setDenied(res.message ?? "Akses ditolak.");
      })
      .catch(() => setDenied("Gagal memuat pengaturan fitur."))
      .finally(() => setLoaded(true));
  }, []);

  const toggle = async (id: string, label: string, next: boolean) => {
    if (!next && !(await swalConfirm(`Matikan "${label}"?`, "Menu ini akan hilang dari panel admin, dan admin tidak dapat lagi memakainya.", "Ya, matikan")) ) return;
    setBusyId(id);
    try {
      const res = await setAdminFeatureAction(id, next);
      if (res.ok && res.flags) {
        setFlags(res.flags);
        swalToast(res.message, "success");
      } else {
        swalToast(res.message || "Gagal menyimpan.", "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan pengaturan fitur.", "error");
    } finally {
      setBusyId(null);
    }
  };

  if (!loaded) return <LoadingState />;

  if (denied) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-blue-100 bg-white p-8 text-center">
        <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-blue-600" />
        <p className="text-sm font-semibold text-slate-700">{denied}</p>
      </div>
    );
  }

  const onCount = ADMIN_FEATURES.filter((f) => isFeatureEnabled(f, flags)).length;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
          <ToggleLeft className="h-4 w-4" /> Super Admin
        </div>
        <h1 className="text-2xl font-black text-slate-900">Fitur Admin (On / Off)</h1>
        <p className="mt-1 text-sm text-slate-500">
          Admin hanya dapat mengelola bagian di bawah ini; semua konten lain hanya dapat diubah Super Admin. Bagian yang
          dimatikan akan hilang dari menu admin dan ditolak oleh server.
        </p>
        <p className="mt-3 text-xs font-semibold text-slate-600">
          {onCount} dari {ADMIN_FEATURES.length} fitur aktif untuk admin
        </p>
      </div>

      <ul className="divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white">
        {ADMIN_FEATURES.map((f) => {
          const on = isFeatureEnabled(f, flags);
          const busy = busyId === f.id;
          const explicit = typeof flags[f.id] === "boolean";
          return (
            <li key={f.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{f.label}</h3>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                      on ? "border-blue-200 bg-blue-100 text-blue-700" : "border-slate-200 bg-slate-100 text-slate-500"
                    }`}
                  >
                    {on ? "AKTIF" : "NONAKTIF"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{f.description}</p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={`${f.label}: ${on ? "aktif" : "nonaktif"}`}
                disabled={busy}
                onClick={() => toggle(f.id, f.label, !on)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:cursor-wait disabled:opacity-60 ${
                  on ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`adm-keep-white inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform ${
                    on ? "translate-x-6" : "translate-x-1"
                  }`}
                >
                  {busy && <Loader2 className="h-3 w-3 animate-spin text-blue-600" />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
