"use client";

import { useEffect, useState, useTransition } from "react";
import { ChevronDown, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";
import { getPageContent, savePageContentAction } from "@/server/page-content";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { swalConfirmDelete, swalToast } from "@/lib/swal";
import {
  BANNER_DEFAULTS as CORE_BANNERS,
  CONTENT_DEFAULTS,
  CONTENT_SPECS,
  PAGE_LABELS,
  type FieldSpec,
  type PageContentKey,
} from "@/lib/pageContent";

type Json = Record<string, any>;
const BANNERS = CORE_BANNERS as Record<string, Json>;

const inputCls =
  "w-full px-3 py-2 text-xs rounded-xl bg-blue-50 border border-blue-200 text-slate-900 focus:outline-none focus:border-sky-500";

const TITLE_KEYS = ["nama", "name", "title", "judul", "label", "kegiatan", "fakultas", "value", "angka", "tag", "no"];

function rowTitle(item: Json): string {
  for (const k of TITLE_KEYS) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const v of Object.values(item)) if (typeof v === "string" && v.trim() && !v.startsWith("/")) return v.trim();
  return "";
}

function rowSubtitle(item: Json, title: string): string {
  for (const k of ["jabatan", "bidang", "kategori", "subtitle", "meta", "raihan", "desc", "deskripsi", "ringkasan"]) {
    const v = item[k];
    if (typeof v === "string" && v.trim() && v.trim() !== title) return v.trim();
  }
  return "";
}

function rowImage(item: Json): string {
  for (const k of ["foto", "image", "gambar", "logo"]) {
    const v = item[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}

/** Satu item daftar berbentuk baris; klik untuk membuka detail dan form ubahnya. */
function ListRow({
  index,
  item,
  spec,
  onChange,
  onRemove,
}: {
  index: number;
  item: Json;
  spec: Extract<FieldSpec, { type: "list" }>;
  onChange: (v: Json) => void;
  onRemove: () => void;
}) {
  const blank = Object.values(item).every((v) => (Array.isArray(v) ? v.length === 0 : !v));
  const [open, setOpen] = useState(blank); // item yang baru ditambahkan langsung terbuka
  const title = rowTitle(item);
  const sub = rowSubtitle(item, title);
  const img = rowImage(item);

  return (
    <div className={`overflow-hidden rounded-xl border bg-white ${open ? "border-blue-300 shadow-sm" : "border-blue-100"}`}>
      <div className="flex items-center gap-3 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[11px] font-bold text-blue-700">{index + 1}</span>
          {img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt="" className="h-9 w-9 shrink-0 rounded-lg border border-blue-100 object-cover" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-slate-900">{title || `${spec.itemLabel} baru (belum diisi)`}</span>
            {sub && <span className="block truncate text-[11px] text-slate-500">{sub}</span>}
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 cursor-pointer rounded-lg border border-blue-200 p-1.5 text-blue-700 hover:bg-blue-50"
          aria-label={`Hapus ${spec.itemLabel} ${index + 1}`}
          title="Hapus"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="space-y-3 border-t border-blue-100 bg-blue-50/40 p-4">
          <Fields specs={spec.fields} value={item} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

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
              <label className="text-xs font-semibold text-slate-700 block mb-1">{f.label}</label>
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
          const blank = Object.fromEntries(f.fields.map((x) => [x.key, x.type === "lines" ? [] : ""]));
          return (
            <div key={f.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {f.label} <span className="text-slate-500 font-medium">({items.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => set(f.key, [...items, blank])}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah {f.itemLabel}
                </button>
              </div>
              {items.map((item, i) => (
                <ListRow
                  key={i}
                  index={i}
                  item={item}
                  spec={f}
                  onChange={(v) => set(f.key, items.map((x, n) => (n === i ? v : x)))}
                  onRemove={async () => {
                    const label = rowTitle(item);
                    if (await swalConfirmDelete(label || undefined)) {
                      set(f.key, items.filter((_, n) => n !== i));
                      swalToast(`${f.itemLabel} dihapus dari daftar. Klik Simpan untuk menerapkan.`, "info");
                    }
                  }}
                />
              ))}
              {items.length === 0 && <p className="text-xs text-slate-500">Belum ada item.</p>}
            </div>
          );
        }
        return (
          <div key={f.key}>
            <label className="text-xs font-semibold text-slate-700 block mb-1">{f.label}</label>
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

/** Editor konten halaman publik: memuat data tersimpan (atau bawaan), lalu menyimpan ke database. */
export default function PageContentEditor({ pageKey }: { pageKey: PageContentKey }) {
  const hasBanner = Boolean(BANNERS[pageKey]);
  const [banner, setBanner] = useState<Json>(BANNERS[pageKey] ?? {});
  const [content, setContent] = useState<Json>(CONTENT_DEFAULTS[pageKey] as Json);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [b, c] = await Promise.all([
          hasBanner ? getPageHeaderBanner(pageKey) : Promise.resolve(null),
          getPageContent(pageKey),
        ]);
        if (cancelled) return;
        setBanner({ ...(BANNERS[pageKey] ?? {}), ...(b ?? {}) });
        setContent({ ...(CONTENT_DEFAULTS[pageKey] as Json), ...(c ?? {}) });
      } catch {
        if (!cancelled) {
          setBanner(BANNERS[pageKey] ?? {});
          setContent(CONTENT_DEFAULTS[pageKey] as Json);
          swalToast("Gagal memuat data dari database. Menampilkan isi bawaan.", "warning");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pageKey, hasBanner]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (hasBanner) {
          const b = await savePageHeaderBannerAction(pageKey, {
            title: banner.title,
            description: banner.description ?? "",
            imageUrl: banner.imageUrl,
          });
          if (!b.ok) {
            swalToast(b.message, "error");
            return;
          }
        }
        const c = await savePageContentAction(pageKey, content);
        swalToast(c.message, c.ok ? "success" : "error");
      } catch {
        swalToast("Gagal menyimpan. Pastikan Anda masih login sebagai admin.", "error");
      }
    });
  };

  if (loading) {
    return (
      <div className="text-slate-500 text-xs flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Memuat…
      </div>
    );
  }

  return (
    <form onSubmit={save} className="bg-white border border-blue-100 rounded-2xl p-6 space-y-8">
      {hasBanner && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Banner (1440 × 480 px)</h2>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Judul (Enter untuk baris baru)</label>
            <textarea
              rows={2}
              required
              value={banner.title ?? ""}
              onChange={(e) => setBanner({ ...banner, title: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Subjudul</label>
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

      <section className={`space-y-4 ${hasBanner ? "border-t border-blue-100 pt-6" : ""}`}>
        <h2 className="text-lg font-bold text-slate-900">Isi Halaman {PAGE_LABELS[pageKey]}</h2>
        <Fields specs={CONTENT_SPECS[pageKey]} value={content} onChange={setContent} />
      </section>

      <div className="sticky bottom-0 z-10 -mx-6 -mb-6 flex items-center justify-between gap-3 rounded-b-2xl border-t border-blue-100 bg-white/95 px-6 py-3 backdrop-blur">
        <span className="text-[11px] text-slate-500">Perubahan baru tampil di situs setelah Anda menekan Simpan.</span>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Simpan Halaman {PAGE_LABELS[pageKey]}</span>
        </button>
      </div>
    </form>
  );
}
