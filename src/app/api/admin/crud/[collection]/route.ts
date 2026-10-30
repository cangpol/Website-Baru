// API Route: Persistensi terpusat untuk seluruh modul CRUD Dashboard Admin.
//
// Strategi penyimpanan:
//  1. Prisma/PostgreSQL (tabel AdminResource) bila DATABASE_URL dikonfigurasi
//     dan koneksi berhasil → persisten, multi-server, multi-browser.
//  2. Fallback file JSON di `.data/admin-crud.json` (kompatibel Docker volume)
//     agar CRUD tetap tersimpan permanen meskipun database belum tersedia.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const COLLECTIONS = [
  "articles",
  "riset",
  "prodis",
  "leads",
  "users",
  "mitra",
  "downloads",
  "banners",
  "akademikBanner",
  "services",
  "profil",
  "kemahasiswaan",
  "mou",
  "calendarEvents",
  "instagramAccount",
] as const;

type Collection = (typeof COLLECTIONS)[number];

function isValidCollection(name: string): name is Collection {
  return (COLLECTIONS as readonly string[]).includes(name);
}

interface StoredRecord {
  key: string;
  value: string;
  updatedAt: string;
}

// ── File fallback store ─────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "admin-crud.json");

async function readFileStore(): Promise<Record<string, StoredRecord>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeFileStore(store: Record<string, StoredRecord>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // Tulis atomik: file sementara lalu rename, agar tidak korup saat crash.
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf-8");
  await fs.rename(tmp, DATA_FILE);
}

// ── Prisma store (opsional) ─────────────────────────────────────────────────
async function tryPrisma(): Promise<{ prisma: any; ok: boolean } | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/prisma");
    // Pastikan model AdminResource ada di schema yang sudah di-generate.
    if (!prisma.adminResource) return { prisma, ok: false };
    return { prisma, ok: true };
  } catch {
    return null;
  }
}

async function serverGet(key: string): Promise<StoredRecord | null> {
  const client = await tryPrisma();
  if (client?.ok) {
    try {
      const row = await client.prisma.adminResource.findUnique({ where: { key } });
      if (row) {
        return { key, value: row.value, updatedAt: row.updatedAt.toISOString() };
      }
      return null;
    } catch {
      /* tabel belum dimigrasi — jatuh ke file store */
    }
  }
  const store = await readFileStore();
  return store[key] ?? null;
}

async function serverUpsert(key: string, value: string): Promise<StoredRecord> {
  const now = new Date().toISOString();
  const record: StoredRecord = { key, value, updatedAt: now };

  const client = await tryPrisma();
  if (client?.ok) {
    try {
      await client.prisma.adminResource.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
      return record;
    } catch {
      /* lanjut ke file store */
    }
  }
  const store = await readFileStore();
  store[key] = record;
  await writeFileStore(store);
  return record;
}

// ── Handlers ────────────────────────────────────────────────────────────────
function notFoundCollection() {
  return NextResponse.json({ error: "Koleksi admin tidak dikenal." }, { status: 404 });
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ collection: string }> }
) {
  const { collection } = await ctx.params;
  if (!isValidCollection(collection)) return notFoundCollection();

  const rec = await serverGet(collection);
  if (!rec) {
    // Resource belum pernah dibuat — klien akan mengirim seed pada POST pertama.
    return NextResponse.json({ persisted: false, data: null });
  }
  try {
    return NextResponse.json({ persisted: true, data: JSON.parse(rec.value), updatedAt: rec.updatedAt });
  } catch {
    return NextResponse.json({ persisted: false, data: null });
  }
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ collection: string }> }
) {
  const { collection } = await ctx.params;
  if (!isValidCollection(collection)) return notFoundCollection();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body permintaan bukan JSON valid." }, { status: 400 });
  }

  const data = (body as { data?: unknown })?.data;
  if (data === undefined || data === null) {
    return NextResponse.json({ error: "Field 'data' wajib dikirim." }, { status: 400 });
  }

  const rec = await serverUpsert(collection, JSON.stringify(data));
  return NextResponse.json({ persisted: true, ok: true, updatedAt: rec.updatedAt });
}
