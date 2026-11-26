"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ImageIcon, List, Loader2, Plus, Save, Trash2, Type } from "lucide-react";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";
import { getPageContent, savePageContentAction } from "@/server/page-content";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { AccordionRow } from "@/components/admin/AccordionRow";
import { swalConfirmDelete, swalToast } from "@/lib/swal";
import {
  BANNER_DEFAULTS as CORE_BANNERS,
  CONTENT_DEFAULTS,
  CONTENT_SPECS,
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

/** Salinan item untuk judul baris: kode pilihan diganti namanya, kode internal dibuang. */
function readable(item: Json, fields: FieldSpec[]): Json {
  const out: Json = { ...item };
  for (const f of fields) {
    if (f.type === "hidden") delete out[f.key];
    else if (f.type === "select") out[f.key] = f.options.find((o) => o.value === item[f.key])?.label ?? "";
  }
  return out;
}

function newItem(fields: FieldSpec[]): Json {
  return Object.fromEntries(
    fields.map((x) => [x.key, x.type === "lines" ? [] : x.type === "hidden" ? `item-${Date.now().toString(36)}` : ""])
  );
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
  const shown = readable(item, spec.fields);
  const blank = Object.values(shown).every((v) => (Array.isArray(v) ? v.length === 0 : !v));
  const [open, setOpen] = useState(blank); // item yang baru ditambahkan langsung terbuka
  const title = rowTitle(shown);
  const sub = rowSubtitle(shown, title);
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
        if (f.type === "hidden") return null;
        if (f.type === "select") {
          const current: string = value[f.key] ?? "";
          const known = f.options.some((o) => o.value === current);
          return (
            <div key={f.key}>
              <label className="text-xs font-semibold text-slate-700 block mb-1">{f.label}</label>
              <select value={current} onChange={(e) => set(f.key, e.target.value)} className={inputCls}>
                {!current && <option value="">Pilih…</option>}
                {current && !known && <option value={current}>Pilihan lama (belum terdaftar)</option>}
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }
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

          return (
            <div key={f.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {f.label} <span className="text-slate-500 font-medium">({items.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => set(f.key, [...items, newItem(f.fields)])}
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
                    const label = rowTitle(readable(item, f.fields));
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

const BANNER_ROW = "banner";

type EditorRow = { id: string; title: string; specs: FieldSpec[] };

/** Setiap daftar menjadi satu baris; isian tunggal yang berurutan digabung dalam satu baris. */
function buildRows(specs: FieldSpec[]): EditorRow[] {
  const rows: EditorRow[] = [];
  let group: FieldSpec[] = [];
  const flush = () => {
    if (group.length === 0) return;
    const title = group.length === 1 ? group[0].label : group.some((f) => f.type === "image") ? "Teks & Gambar" : "Teks Halaman";
    rows.push({ id: `isian-${group[0].key}`, title, specs: group });
    group = [];
  };
  for (const spec of specs) {
    if (spec.type === "list") {
      flush();
      rows.push({ id: spec.key, title: spec.label, specs: [spec] });
    } else {
      group.push(spec);
    }
  }
  flush();
  return rows;
}

function rowSummary(row: EditorRow, content: Json): string {
  const first = row.specs[0];
  if (first.type === "list") {
    const items: Json[] = Array.isArray(content[first.key]) ? content[first.key] : [];
    const names = items.map((item) => rowTitle(readable(item, first.fields))).filter(Boolean).slice(0, 3).join(", ");
    return names ? `${items.length} item · ${names}` : `${items.length} item`;
  }
  if (row.specs.length > 1) return row.specs.map((f) => f.label).join(", ");
  const value = content[first.key];
  if (first.type === "image") return value ? "Foto sudah terpasang" : "Belum ada foto";
  const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value ?? "");
  return text.split("\n")[0] || "Belum diisi";
}

const pick = (source: Json, specs: FieldSpec[]): Json => Object.fromEntries(specs.map((f) => [f.key, source[f.key]]));

const unsavedBadge = (current: unknown, saved: unknown) =>
  JSON.stringify(current) !== JSON.stringify(saved) ? "BELUM DISIMPAN" : undefined;

function SaveBar({ label, saving, disabled }: { label: string; saving: boolean; disabled: boolean }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex flex-wrap items-center justify-between gap-3 rounded-b-2xl border-t border-blue-100 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-5 sm:-mb-5 sm:px-5">
      <span className="text-[11px] text-slate-500">Perubahan baru tampil di situs setelah Anda menekan Simpan.</span>
      <button
        type="submit"
        disabled={disabled}
        className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        <span>Simpan {label}</span>
      </button>
    </div>
  );
}

/** Editor konten halaman publik: tiap bagian berupa baris yang dibuka dan disimpan sendiri-sendiri. */
export default function PageContentEditor({
  pageKey,
  onlyFields,
  hideBanner = false,
}: {
  pageKey: PageContentKey;
  /** Hanya tampilkan isian ini (halaman yang hanya sebagian boleh disunting). */
  onlyFields?: string[];
  hideBanner?: boolean;
}) {
  const hasBanner = Boolean(BANNERS[pageKey]) && !hideBanner && !onlyFields;
  const rows = buildRows(onlyFields ? CONTENT_SPECS[pageKey].filter((f) => onlyFields.includes(f.key)) : CONTENT_SPECS[pageKey]);
  const [banner, setBanner] = useState<Json>(BANNERS[pageKey] ?? {});
  const [content, setContent] = useState<Json>(CONTENT_DEFAULTS[pageKey] as Json);
  // Salinan yang terakhir tersimpan, agar menyimpan satu baris tidak ikut menyimpan baris lain.
  const [savedBanner, setSavedBanner] = useState<Json>(BANNERS[pageKey] ?? {});
  const [savedContent, setSavedContent] = useState<Json>(CONTENT_DEFAULTS[pageKey] as Json);
  const [openRow, setOpenRow] = useState<string | null>(hasBanner ? BANNER_ROW : (rows[0]?.id ?? null));
  const [savingRow, setSavingRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      let nextBanner: Json = BANNERS[pageKey] ?? {};
      let nextContent = CONTENT_DEFAULTS[pageKey] as Json;
      try {
        const [b, c] = await Promise.all([
          hasBanner ? getPageHeaderBanner(pageKey) : Promise.resolve(null),
          getPageContent(pageKey),
        ]);
        nextBanner = { ...nextBanner, ...(b ?? {}) };
        nextContent = { ...nextContent, ...(c ?? {}) };
      } catch {
        if (!cancelled) swalToast("Gagal memuat data tersimpan. Menampilkan isi bawaan.", "warning");
      }
      if (cancelled) return;
      setBanner(nextBanner);
      setSavedBanner(nextBanner);
      setContent(nextContent);
      setSavedContent(nextContent);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [pageKey, hasBanner]);

  const runSave = async (rowId: string, save: () => Promise<{ ok: boolean; message: string }>, onSaved: () => void) => {
    setSavingRow(rowId);
    try {
      const res = await save();
      if (res.ok) onSaved();
      swalToast(res.message, res.ok ? "success" : "error");
    } catch {
      swalToast("Gagal menyimpan. Pastikan Anda masih login sebagai admin.", "error");
    } finally {
      setSavingRow(null);
    }
  };

  const saveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const snapshot = banner;
    runSave(
      BANNER_ROW,
      () =>
        savePageHeaderBannerAction(pageKey, {
          title: snapshot.title,
          description: snapshot.description ?? "",
          imageUrl: snapshot.imageUrl,
        }),
      () => setSavedBanner(snapshot)
    );
  };

  const saveRow = (row: EditorRow) => (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...savedContent, ...pick(content, row.specs) };
    runSave(
      row.id,
      () => savePageContentAction(pageKey, payload),
      () => setSavedContent(payload)
    );
  };

  if (loading) {
    return (
      <div className="text-slate-500 text-xs flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Memuat…
      </div>
    );
  }

  const toggle = (id: string) => setOpenRow(openRow === id ? null : id);
  const offset = hasBanner ? 1 : 0;

  return (
    <div className="space-y-3">
      {hasBanner && (
        <AccordionRow
          number={1}
          title="Banner Halaman"
          summary={String(banner.title ?? "").split("\n")[0] || "Judul, subjudul, dan foto banner"}
          icon={ImageIcon}
          badge={unsavedBadge(banner, savedBanner)}
          open={openRow === BANNER_ROW}
          onToggle={() => toggle(BANNER_ROW)}
        >
          <form onSubmit={saveBanner} className="space-y-4">
            <p className="text-xs text-slate-500">Ukuran banner yang disarankan: 1440 × 480 px.</p>
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
              onChange={(url) => setBanner((prev) => ({ ...prev, imageUrl: url }))}
              recommendedSize="1440 × 480 px"
            />
            <SaveBar label="Banner Halaman" saving={savingRow === BANNER_ROW} disabled={savingRow !== null} />
          </form>
        </AccordionRow>
      )}

      {rows.map((row, i) => (
        <AccordionRow
          key={row.id}
          number={i + 1 + offset}
          title={row.title}
          summary={rowSummary(row, content)}
          icon={row.specs[0].type === "list" ? List : row.specs[0].type === "image" && row.specs.length === 1 ? ImageIcon : Type}
          badge={unsavedBadge(pick(content, row.specs), pick(savedContent, row.specs))}
          open={openRow === row.id}
          onToggle={() => toggle(row.id)}
        >
          <form onSubmit={saveRow(row)} className="space-y-4">
            <Fields specs={row.specs} value={content} onChange={setContent} />
            <SaveBar label={row.title} saving={savingRow === row.id} disabled={savingRow !== null} />
          </form>
        </AccordionRow>
      ))}
    </div>
  );
}
