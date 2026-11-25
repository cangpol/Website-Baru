"use client";

// Grafik SVG ringan untuk dasbor admin. Warna diambil dari token --adm-s1..s6 (lihat admin-theme.css).

export const SERIES = ["var(--adm-s1)", "var(--adm-s2)", "var(--adm-s3)", "var(--adm-s4)", "var(--adm-s5)", "var(--adm-s6)"];

/** Donat dengan celah antar-segmen; legenda memuat label, jumlah, dan persentase. */
export function Donut({ segments, unit }: { segments: { label: string; value: number }[]; unit: string }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = 78;
  const C = 2 * Math.PI * r;
  const visible = segments.filter((s) => s.value > 0).length;
  let offset = 0;

  return (
    <div>
      <div className="relative mx-auto h-52 w-52">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label={segments.map((s) => `${s.label} ${s.value}`).join(", ")}>
          <circle cx="100" cy="100" r={r} fill="none" stroke="var(--adm-surface-2)" strokeWidth="20" />
          {total > 0 &&
            segments.map((s, i) => {
              if (s.value <= 0) return null;
              const len = (s.value / total) * C;
              const gap = visible > 1 ? 3 : 0;
              const el = (
                <circle key={s.label} cx="100" cy="100" r={r} fill="none" stroke={SERIES[i % SERIES.length]} strokeWidth="20" strokeDasharray={`${Math.max(0.5, len - gap)} ${C}`} strokeDashoffset={-offset}>
                  <title>{`${s.label}: ${s.value}`}</title>
                </circle>
              );
              offset += len;
              return el;
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[var(--adm-text)]">{total.toLocaleString("id-ID")}</span>
          <span className="text-xs text-[var(--adm-muted)]">{unit}</span>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {segments.map((s, i) => {
          const pct = total ? Math.round((s.value / total) * 100) : 0;
          return (
            <li key={s.label} className="flex items-center gap-2.5 text-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SERIES[i % SERIES.length] }} />
              <span className="flex-1 text-[var(--adm-text)]">{s.label}</span>
              <span className="tabular-nums text-[var(--adm-muted)]">{s.value.toLocaleString("id-ID")}</span>
              <span className="w-10 text-right font-semibold tabular-nums text-[var(--adm-text)]">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
