"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";
import { getPageContent, savePageContentAction } from "@/server/page-content";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  BANNER_DEFAULTS as CORE_BANNERS,
  PAGE_PATHS,
  CONTENT_DEFAULTS,
  CONTENT_SPECS,
  PAGE_CONTENT_KEYS,
  PAGE_LABELS,
  type FieldSpec,
  type PageContentKey,
} from "@/lib/pageContent";

type Json = Record<string, any>;
const BANNERS = CORE_BANNERS as Record<string, Json>;

const inputCls =
  "w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500";

function Fields({ specs, value, onChange }: { specs: FieldSpec[]; value: Json; onChange: (v: Json) => void }) {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });

  return (
    <div className="space-y-4">
      {specs.map((f) => {
        if (f.type === "image") {
          return (
            <ImageUploadField key={f.key} label={f.label} value={value[f.key]} onChange={(url) => set(f.key, url)} />
          );
        }
        if (f.type === "lines") {
          const arr: string[] = Array.isArray(value[f.key]) ? value[f.key] : [];
          return (
            <div key={f.key}>
              <label className="text-xs font-semibold text-slate-300 block mb-1">{f.label}</label>
              <textarea
                rows={Math.min(8, Math.max(3, arr.length + 1))}
                value={arr.join("\n")}
                onChange={(e) => set(f.key, e.target.value.split("\n"))}
                className={inputCls}
              />
            </div>
          );
        }
        if (f.type === "list") {
          const items: Json[] = Array.isArray(value[f.key]) ? value[f.key] : [];
          const blank = Object.fromEntries(f.fields.map((x) => [x.key, ""]));
          return (
            <div key={f.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{f.label}</h3>
                <button
                  type="button"
                  onClick={() => set(f.key, [...items, blank])}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah {f.itemLabel}
                </button>
              </div>
              {items.map((item, i) => (
                <div key={i} className="border border-blue-900/50 rounded-xl p-4 space-y-3 bg-slate-950/40">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      {f.itemLabel} #{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => set(f.key, items.filter((_, n) => n !== i))}
                      className="text-rose-300 hover:text-rose-200 cursor-pointer"
                      aria-label={`Hapus ${f.itemLabel} ${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Fields
                    specs={f.fields}
                    value={item}
                    onChange={(v) => set(f.key, items.map((x, n) => (n === i ? v : x)))}
                  />
                </div>
              ))}
              {items.length === 0 && <p className="text-xs text-slate-500">Belum ada item.</p>}
            </div>
          );
        }
        return (
          <div key={f.key}>
            <label className="text-xs font-semibold text-slate-300 block mb-1">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea rows={4} value={value[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} className={inputCls} />
            ) : (
              <input type="text" value={value[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} className={inputCls} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminKontenHalamanPage() {
  const [page, setPage] = useState<PageContentKey>("layanan");
  const [banner, setBanner] = useState<Json>(BANNERS.layanan);
  const [content, setContent] = useState<Json>(CONTENT_DEFAULTS.layanan);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const hasBanner = Boolean(BANNERS[page]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [b, c] = await Promise.all([BANNERS[page] ? getPageHeaderBanner(page) : Promise.resolve(null), getPageContent(page)]);
        if (cancelled) return;
        setBanner({ ...(BANNERS[page] ?? {}), ...(b ?? {}) });
        setContent({ ...CONTENT_DEFAULTS[page], ...(c ?? {}) });
      } catch {
        if (!cancelled) {
          setBanner(BANNERS[page] ?? {});
          setContent(CONTENT_DEFAULTS[page]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (hasBanner) {
          const b = await savePageHeaderBannerAction(page, {
            title: banner.title,
            description: banner.description ?? "",
            imageUrl: banner.imageUrl,
          });
          if (!b.ok) return showToast(b.message, false);
        }
        const c = await savePageContentAction(page, content);
        showToast(c.message, c.ok);
      } catch {
        showToast("Gagal menyimpan. Pastikan Anda masih login sebagai admin.", false);
      }
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-white">Konten Halaman</h1>
        <p className="text-xs text-slate-400 mt-1">
          Ubah banner, teks, daftar, dan gambar halaman publik (tambah, ubah, hapus item). Katalog layanan dikelola di menu Katalog &amp; Unduhan.
        </p>
      </div>

      {toast && (
        <div
          role="status"
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-xs font-bold shadow-xl ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {PAGE_CONTENT_KEYS.filter((k) => BANNERS[k]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setPage(k)}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
              page === k ? "bg-sky-500 text-white" : "bg-slate-900 text-slate-300 border border-blue-900/50"
            }`}
          >
            {PAGE_LABELS[k]}
          </button>
        ))}
        <select
          aria-label="Halaman lainnya"
          value={BANNERS[page] ? "" : page}
          onChange={(e) => e.target.value && setPage(e.target.value as PageContentKey)}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-slate-200 border border-blue-900/50 cursor-pointer"
        >
          <option value="">Halaman lainnya…</option>
          {PAGE_CONTENT_KEYS.filter((k) => !BANNERS[k]).map((k) => (
            <option key={k} value={k}>
              {PAGE_LABELS[k]}
            </option>
          ))}
        </select>
        <Link href={PAGE_PATHS[page] ?? `/${page}`} target="_blank" className="ml-auto text-xs text-sky-300 flex items-center gap-1 self-center">
          Lihat halaman <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Memuat…
        </div>
      ) : (
        <form onSubmit={save} className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 space-y-8">
          {hasBanner && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">Banner (1440 × 480 px)</h2>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Judul (Enter untuk baris baru)</label>
              <textarea
                rows={2}
                required
                value={banner.title ?? ""}
                onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subjudul</label>
              <textarea
                rows={2}
                value={banner.description ?? ""}
                onChange={(e) => setBanner({ ...banner, description: e.target.value })}
                className={inputCls}
              />
            </div>
            <ImageUploadField
              label="Foto Banner"
              value={banner.imageUrl}
              onChange={(url) => setBanner({ ...banner, imageUrl: url })}
              recommendedSize="1440 × 480 px"
            />
          </section>
          )}

          <section className={`space-y-4 ${hasBanner ? "border-t border-blue-900/40 pt-6" : ""}`}>
            <h2 className="text-lg font-bold text-white">Isi Halaman {PAGE_LABELS[page]}</h2>
            <Fields specs={CONTENT_SPECS[page]} value={content} onChange={setContent} />
          </section>

          <div className="flex justify-end pt-4 border-t border-blue-900/40">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Halaman {PAGE_LABELS[page]}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
