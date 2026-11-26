import { beforeEach, describe, expect, it, vi } from "vitest";
import { ADMIN_FEATURES, ADMIN_PAGE_RULES, denialReason } from "@/lib/adminFeatures";
import { youtubeId } from "@/lib/youtube";

const ADMIN_MODULES = ["gelombang", "instagram", "videoProfil", "programs", "kalender", "penelitian", "kemahasiswaan", "galeriKerjasama"];
const SUPER_MODULES = ["beranda", "settings", "profil", "articles", "kerjasama", "layanan", "pmb", "tours", "aiDataset", "media", "users", "akademik", "superadmin"];

describe("hak akses admin", () => {
  it("memberi admin tepat delapan bagian", () => {
    expect(ADMIN_FEATURES).toHaveLength(8);
    for (const role of ["STAFF_PMB", "CONTENT_WRITER"]) {
      for (const m of ADMIN_MODULES) expect(denialReason(role, m, {}), `${role} ${m}`).toBeNull();
      for (const m of SUPER_MODULES) expect(denialReason(role, m, {}), `${role} ${m}`).not.toBeNull();
    }
  });

  it("memberi Super Admin semua akses, juga saat saklar dimatikan", () => {
    for (const m of [...ADMIN_MODULES, ...SUPER_MODULES]) expect(denialReason("SUPERADMIN", m, { gelombang: false })).toBeNull();
  });

  it("saklar hanya bisa mematikan, tidak bisa memberi akses tambahan", () => {
    expect(denialReason("STAFF_PMB", "gelombang", { gelombang: false })).toMatch(/dinonaktifkan/);
    expect(denialReason("STAFF_PMB", "users", { users: true })).not.toBeNull();
    expect(denialReason("STAFF_PMB", "beranda", { beranda: true })).not.toBeNull();
  });

  it("izin unggah berkas mengikuti ada tidaknya bagian yang menyala", () => {
    expect(denialReason("STAFF_PMB", "upload", {})).toBeNull();
    const allOff = Object.fromEntries(ADMIN_FEATURES.map((f) => [f.id, false]));
    expect(denialReason("STAFF_PMB", "upload", allOff)).not.toBeNull();
  });

  it("menolak peran yang tidak dikenal", () => {
    expect(denialReason("TAMU", "gelombang", {})).not.toBeNull();
  });
});

describe("youtubeId", () => {
  it("mengenali bentuk tautan YouTube dan menolak yang lain", () => {
    for (const v of ["https://youtu.be/rVDHh02bbA4", "https://www.youtube.com/watch?v=rVDHh02bbA4&t=3", "https://youtube.com/shorts/rVDHh02bbA4", "https://www.youtube.com/embed/rVDHh02bbA4", "rVDHh02bbA4"]) {
      expect(youtubeId(v), v).toBe("rVDHh02bbA4");
    }
    for (const v of ["", "https://vimeo.com/123", "https://evil.example/watch?v=rVDHh02bbA4", "javascript:alert(1)"]) {
      expect(youtubeId(v), v).toBeNull();
    }
  });
});

// ── Penyimpanan konten halaman: admin dengan izin sebagian ─────────────────
const state = vi.hoisted(() => ({ program: null as Record<string, unknown> | null, role: "STAFF_PMB", stored: null as Record<string, unknown> | null, saved: null as Record<string, unknown> | null }));

vi.mock("@/lib/auth", async () => {
  const rules = await import("@/lib/adminFeatures");
  return {
    requirePermission: vi.fn(async (moduleKey: string) => {
      const reason = rules.denialReason(state.role, moduleKey, {});
      if (reason) throw new Error(reason);
      return { userId: "u1", email: "uji@upitra.ac.id", role: state.role };
    }),
  };
});
vi.mock("@/lib/prisma", () => ({
  prisma: {
    program: { findFirst: vi.fn(async () => state.program) },
    siteSetting: {
      findUnique: vi.fn(async () => (state.stored ? { value: state.stored } : null)),
      upsert: vi.fn(async ({ update }: { update: { value: Record<string, unknown> } }) => {
        state.saved = update.value;
      }),
    },
  },
}));
vi.mock("@/server/cache-tags", () => ({ invalidateEntity: vi.fn(), CACHE_TAGS: {} }));
vi.mock("@/server/audit", () => ({ recordAuditLog: vi.fn() }));

describe("savePageContentAction", () => {
  beforeEach(() => {
    state.role = "STAFF_PMB";
    state.stored = null;
    state.saved = null;
  });
  const save = async (key: string, value: unknown) => (await import("@/server/page-content")).savePageContentAction(key, value);

  it("hanya menerapkan isian yang diizinkan dan mempertahankan sisanya", async () => {
    state.stored = { about: "Teks LPPM asli", research: [] };
    const res = await save("riset", { about: "DIUBAH ADMIN", research: [{ title: "Baru", meta: "2026", image: "" }] });
    expect(res.ok).toBe(true);
    expect(state.saved).toEqual({ about: "Teks LPPM asli", research: [{ title: "Baru", meta: "2026", image: "" }] });
  });

  it("tidak menyimpan isian terlarang walau halaman belum pernah disimpan", async () => {
    await save("profil-tentang", { videoJudul: "Judul baru", videoUrl: "" , videoDeskripsi: "d" });
    expect(Object.keys(state.saved ?? {}).sort()).toEqual(["videoDeskripsi", "videoJudul", "videoUrl"]);
  });

  it("menolak admin pada halaman khusus Super Admin", async () => {
    for (const key of ["pimpinan", "layanan", "pengaturan-situs", "kunci-tidak-ada", "constructor"]) {
      await expect(save(key, {})).rejects.toThrow(/Super Admin/);
    }
    expect(state.saved).toBeNull();
  });

  it("mengizinkan Super Admin mengubah seluruh isian", async () => {
    state.role = "SUPERADMIN";
    state.stored = { about: "lama" };
    await save("riset", { about: "baru" });
    expect(state.saved).toEqual({ about: "baru" });
  });

  it("menolak tautan video yang bukan YouTube", async () => {
    const res = await save("profil-tentang", { videoUrl: "https://contoh.com/video.mp4" });
    expect(res.ok).toBe(false);
    expect(state.saved).toBeNull();
  });

  it("semua halaman yang diizinkan untuk admin memakai modul yang memang milik admin", () => {
    for (const [key, rule] of Object.entries(ADMIN_PAGE_RULES)) expect(denialReason("STAFF_PMB", rule.module, {}), key).toBeNull();
  });
});

describe("data prodi di halaman publik", () => {
  const record = (slug: string, version: number) => ({ slug, version, name: "Nama dari database" });
  const read = async () => (await import("@/server/programs")).getPublicProgramOverride(["manajemen", "manajemen-bisnis"]);

  it("tidak menimpa halaman dengan data awal beralamat alias", async () => {
    state.program = record("manajemen-bisnis", 1);
    expect(await read()).toBeNull();
  });

  it("memakai data alias setelah admin menyimpannya", async () => {
    state.program = record("manajemen-bisnis", 2);
    expect((await read())?.name).toBe("Nama dari database");
  });

  it("tetap memakai data yang alamatnya sama dengan halaman", async () => {
    state.program = record("manajemen", 1);
    expect((await read())?.name).toBe("Nama dari database");
  });
});
