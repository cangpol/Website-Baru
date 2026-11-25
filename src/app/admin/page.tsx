"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BarChart3, Briefcase, Building2, ExternalLink, GraduationCap, Microscope, Pencil, RefreshCw, UserCheck, Users, type LucideIcon } from "lucide-react";
import { getHomepageContent } from "@/server/homepage";
import { getAllProdi } from "@/lib/prodiData";
import { Donut, SERIES } from "@/components/admin/charts";

// Dasbor menampilkan data yang sama dengan halaman depan situs (sumbernya getHomepageContent).
type Homepage = Awaited<ReturnType<typeof getHomepageContent>>;

const card = "rounded-xl border border-[var(--adm-border)] bg-[var(--adm-surface)]";
const muted = "text-[var(--adm-muted)]";
const strong = "text-[var(--adm-text)]";
const pill = "shrink-0 rounded-full border border-[var(--adm-border)] px-2.5 py-1 text-[11px] font-semibold";

const METRIC_ICONS: Record<string, LucideIcon> = {
  mahasiswa: Users,
  fakultas: Building2,
  prodi: GraduationCap,
  dosen: UserCheck,
  riset: Microscope,
  lulusan: Briefcase,
};

/** Jumlah program studi per fakultas, dari data program studi yang tampil di situs. */
function prodiPerFaculty() {
  const counts = new Map<string, number>();
  for (const p of getAllProdi()) counts.set(p.faculty.name, (counts.get(p.faculty.name) ?? 0) + 1);
  return [...counts].map(([label, value]) => ({ label, value }));
}

function Panel({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`${card} p-5 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className={`text-base font-bold ${strong}`}>{title}</h2>
          {subtitle && <p className={`mt-0.5 text-xs ${muted}`}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className={`flex min-h-32 items-center justify-center rounded-lg border border-dashed border-[var(--adm-border)] px-4 text-center text-xs ${muted}`}>{text}</p>;
}

function Thumb({ src, className }: { src: string; className: string }) {
  // Gambar berasal dari admin (lokal atau Blob), sehingga dipakai <img> biasa.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" className={`shrink-0 rounded-lg bg-[var(--adm-surface-2)] object-cover ${className}`} />;
}

function Skeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Memuat dasbor">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${card} h-32 animate-pulse`} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <div className={`${card} h-96 animate-pulse xl:col-span-2`} />
        <div className={`${card} h-96 animate-pulse`} />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Homepage | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    getHomepageContent()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => setCanEdit(Boolean(j?.ok && (j.user?.role === "SUPERADMIN" || j.features?.beranda))))
      .catch(() => {});
  }, [load]);

  if (loading && !data) return <Skeleton />;

  if (error || !data) {
    return (
      <div className={`${card} mx-auto mt-12 max-w-md p-8 text-center`}>
        <p className={`text-sm font-semibold ${strong}`}>Data halaman depan gagal dimuat.</p>
        <p className={`mt-1 text-xs ${muted}`}>Periksa koneksi database, lalu coba lagi.</p>
        <button type="button" onClick={load} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700">
          Coba lagi
        </button>
      </div>
    );
  }

  const { hero, waves, immersion, stats, instagram, cta, visibility } = data;
  const faculties = prodiPerFaculty();

  const edit = (section: string) =>
    canEdit ? (
      <Link href={`/admin/halaman-depan?bagian=${section}`} className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[var(--adm-accent)] hover:underline">
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Ubah
      </Link>
    ) : undefined;

  const sections = [
    { id: "hero", name: "Hero Banner", detail: hero.title.replace(/\n/g, " "), shown: visibility.hero },
    { id: "waves", name: "Gelombang PMB", detail: `${waves.waves.length} kartu gelombang`, shown: visibility.waves },
    { id: "immersion", name: "Program Immersion", detail: immersion.badge, shown: visibility.immersion },
    { id: "instagram", name: "Kabar & Cerita Kampus", detail: `${instagram.posts.length} postingan`, shown: visibility.instagram },
    { id: "stats", name: stats.title, detail: `${stats.metrics.length} angka capaian`, shown: visibility.stats },
    { id: "cta", name: "Ajakan Bergabung", detail: cta.title.replace(/\n/g, " "), shown: visibility.cta },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className={`text-2xl font-bold ${strong}`}>Dashboard</h1>
          <p className={`text-xs ${muted}`}>Ringkasan isi halaman depan situs UPITRA</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={load} disabled={loading} className={`${card} inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold ${strong} hover:border-[var(--adm-accent)] disabled:opacity-60`}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Muat ulang
          </button>
          <Link href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700">
            Lihat beranda <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* UPITRA Dalam Angka */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.metrics.map((m, i) => {
          const Icon = METRIC_ICONS[m.id] ?? BarChart3;
          const color = SERIES[i % SERIES.length];
          return (
            <div key={m.id || i} className={`${card} flex items-center justify-between gap-4 p-5`}>
              <div className="min-w-0">
                <p className={`truncate text-xs font-medium ${strong}`}>{m.label}</p>
                <p className={`mt-3 text-3xl font-bold tracking-tight ${strong}`}>{m.value}</p>
                <p className={`mt-1 truncate text-xs ${muted}`}>
                  {stats.title} · {visibility.stats ? "tampil di beranda" : "disembunyikan"}
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl" style={{ color, background: `color-mix(in srgb, ${color} 16%, transparent)` }}>
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Hero Banner Beranda" action={edit("hero")} className="xl:col-span-2">
          <div className="relative min-h-80 overflow-hidden rounded-lg bg-[#06172e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04121f]/90 via-[#04121f]/60 to-transparent" />
            <div className="relative flex min-h-80 max-w-lg flex-col justify-end p-6">
              <p className="whitespace-pre-line text-2xl font-bold leading-tight text-white sm:text-3xl">{hero.title}</p>
              <p className="mt-3 text-xs leading-relaxed text-blue-50">{hero.subtitle}</p>
              <span className="mt-4 inline-flex w-fit rounded-lg bg-[#FFC20E] px-4 py-2 text-xs font-bold text-[#1a1a1a]">{hero.ctaLabel}</span>
            </div>
          </div>
        </Panel>

        <Panel title="Program Studi per Fakultas" subtitle="Dari daftar program studi di situs">
          <Donut segments={faculties} unit="program studi" />
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Gelombang Pendaftaran" subtitle={waves.subtitle} action={edit("waves")}>
          {waves.waves.length === 0 ? (
            <Empty text="Belum ada gelombang pendaftaran." />
          ) : (
            <ul className="divide-y divide-[var(--adm-border)]">
              {waves.waves.map((w, i) => (
                <li key={w.id || i} className="flex items-center gap-3 py-3">
                  <Thumb src={w.image} className="h-12 w-16" />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-[13px] font-semibold ${strong}`}>{w.title}</p>
                    <p className={`truncate text-xs ${muted}`}>{w.benefit}</p>
                  </div>
                  {w.badge && <span className={`${pill} bg-[var(--adm-accent-soft)] text-[var(--adm-accent)]`}>{w.badge}</span>}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={`${immersion.titleLine1} ${immersion.titleLine2}`} subtitle={immersion.badge} action={edit("immersion")}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {immersion.pillars.map((p, i) => (
              <figure key={p.id || i} className="min-w-0">
                <Thumb src={p.image} className="aspect-[4/3] w-full" />
                <figcaption className={`mt-1.5 truncate text-xs font-medium ${strong}`}>{p.label}</figcaption>
              </figure>
            ))}
          </div>
          <h3 className={`mt-4 text-xs font-semibold ${strong}`}>{immersion.conceptTitle}</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {immersion.concepts.map((c, i) => (
              <li key={c.id || i} className="rounded-lg bg-[var(--adm-surface-2)] px-3 py-2">
                <p className={`text-xs font-semibold ${strong}`}>{c.title}</p>
                <p className={`text-xs ${muted}`}>{c.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title={instagram.title} subtitle={instagram.handle} action={edit("instagram")}>
        {instagram.posts.length === 0 ? (
          <Empty text="Belum ada postingan di beranda." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead>
                <tr className={`border-b border-[var(--adm-border)] ${strong}`}>
                  {["Postingan", "Kategori", "Waktu", "Tautan"].map((h) => (
                    <th key={h} scope="col" className="py-3 pr-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--adm-border)]">
                {instagram.posts.map((p, i) => (
                  <tr key={p.id || i}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Thumb src={p.mediaUrl} className="h-11 w-11" />
                        <span className={`line-clamp-2 max-w-md font-medium ${strong}`}>{p.caption}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`${pill} whitespace-nowrap bg-[var(--adm-accent-soft)] text-[var(--adm-accent)]`}>{p.category}</span>
                    </td>
                    <td className={`whitespace-nowrap py-3 pr-4 ${muted}`}>{p.timeAgo}</td>
                    <td className="py-3">
                      <a href={p.permalink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[var(--adm-accent)] hover:underline">
                        Buka <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel title="Section Halaman Depan" subtitle="Urutan sesuai tampilan di beranda" action={edit("visibility")}>
        <ul className="divide-y divide-[var(--adm-border)]">
          {sections.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--adm-accent-soft)] text-xs font-bold text-[var(--adm-accent)]">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[13px] font-semibold ${strong}`}>{s.name}</p>
                <p className={`truncate text-xs ${muted}`}>{s.detail}</p>
              </div>
              <span className={`${pill} ${s.shown ? "text-[var(--adm-up)]" : muted}`}>{s.shown ? "Tampil" : "Disembunyikan"}</span>
              {edit(s.id)}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
