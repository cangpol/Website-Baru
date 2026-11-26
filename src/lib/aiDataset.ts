// Aturan data dan operasi CRUD basis pengetahuan chatbot. Tanpa akses database agar mudah diuji.
import { z } from "zod";
import officialKnowledge from "@/data/upitraAiKnowledge.json";

export interface AIDatasetItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  active: boolean;
  updatedAt?: string;
}

/** Aturan untuk entri yang diisi atau diubah lewat form admin. */
export const aiEntryInputSchema = z.object({
  category: z.string().trim().min(2, "Kategori minimal 2 karakter.").max(60, "Kategori maksimal 60 karakter."),
  question: z.string().trim().min(3, "Pertanyaan minimal 3 karakter.").max(300, "Pertanyaan maksimal 300 karakter."),
  answer: z.string().trim().min(5, "Jawaban minimal 5 karakter.").max(5000, "Jawaban maksimal 5.000 karakter."),
  keywords: z.array(z.string().trim().max(120, "Satu kata kunci maksimal 120 karakter.")).max(50, "Maksimal 50 kata kunci."),
  active: z.boolean(),
});

export type AIEntryInput = z.infer<typeof aiEntryInputSchema>;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function readEntry(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const question = text(item.question) || text(item.pertanyaan);
  const answer = text(item.answer) || text(item.jawaban);
  if (!question || !answer) return null;
  return {
    id: text(item.id),
    category: text(item.category).toLowerCase() || "umum",
    question,
    answer,
    keywords: Array.isArray(item.keywords) ? item.keywords.map(text).filter(Boolean) : [],
    active: item.active !== false,
    updatedAt: text(item.updatedAt) || undefined,
  };
}

/**
 * Membaca data tersimpan secara longgar: satu entri janggal tidak boleh menggagalkan seluruh dataset.
 * Salinan yang sama persis dibuang, dan ID ganda diberi akhiran agar tiap entri bisa diubah sendiri.
 */
export function normalizeDataset(raw: unknown): AIDatasetItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const usedIds = new Set<string>();
  const result: AIDatasetItem[] = [];

  raw.forEach((value, index) => {
    const entry = readEntry(value);
    if (!entry) return;
    const fingerprint = JSON.stringify([entry.category, entry.question, entry.answer, entry.keywords, entry.active]);
    if (seen.has(fingerprint)) return;
    seen.add(fingerprint);

    const baseId = entry.id || `qa-${index + 1}`;
    let id = baseId;
    for (let n = 2; usedIds.has(id); n++) id = `${baseId}-${n}`;
    usedIds.add(id);
    result.push({ ...entry, id });
  });

  return result;
}

// Jawaban cepat yang dulu tertanam di kode. Sekarang entri biasa sehingga bisa diubah dari admin.
export const INTENT_ENTRY_IDS = {
  contact: "intent_kontak_admisi",
  location: "intent_lokasi_kampus",
  register: "intent_cara_daftar",
} as const;

const BUILTIN_ENTRIES = [
  {
    id: INTENT_ENTRY_IDS.contact,
    category: "kontak",
    question: "Bagaimana cara menghubungi Admisi UPITRA?",
    keywords: ["kontak admisi", "nomor whatsapp admisi", "wa admisi", "hubungi admisi"],
    answer:
      "📞 **Kontak & Layanan Admisi UPITRA:**\n\n" +
      "• **WhatsApp Admisi:** [0811-290-7500](https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA)\n" +
      "• **Email:** admission@upitra.ac.id / info@upitra.ac.id\n" +
      "• **Website PMB:** [pmb.upitra.ac.id](https://pmb.upitra.ac.id)\n" +
      "• **Jam Operasional:** Senin – Jumat, 08.00 – 16.00 WIB\n\n" +
      "Silakan klik nomor WhatsApp di atas untuk langsung berkonsultasi dengan staf admisi kami!",
  },
  {
    id: INTENT_ENTRY_IDS.location,
    category: "kontak",
    question: "Di mana lokasi kampus UPITRA?",
    keywords: ["lokasi kampus", "alamat kampus", "alamat upitra"],
    answer:
      "📍 **Lokasi Kampus Universitas Pignatelli Triputra (UPITRA):**\n\n" +
      "Jl. Duwet No. 1, Karangasem, Kec. Laweyan, Kota Surakarta (Solo), Jawa Tengah 57145.\n\n" +
      "Kampus kami berlokasi strategis di pusat kota Solo, mudah dijangkau dengan transportasi umum maupun kendaraan pribadi.",
  },
  {
    id: INTENT_ENTRY_IDS.register,
    category: "pmb",
    question: "Bagaimana cara daftar PMB UPITRA?",
    keywords: ["cara daftar", "daftar pmb", "link pmb", "link pendaftaran", "registrasi maba"],
    answer:
      "🎯 **Pendaftaran Mahasiswa Baru (PMB) UPITRA:**\n\n" +
      "Pendaftaran dapat dilakukan secara online melalui portal resmi kami:\n" +
      "👉 **[pmb.upitra.ac.id](https://pmb.upitra.ac.id)**\n\n" +
      "**Langkah Pendaftaran:**\n" +
      "1. Akses portal [pmb.upitra.ac.id](https://pmb.upitra.ac.id)\n" +
      "2. Buat akun pendaftaran baru\n" +
      "3. Pilih Program Studi impian Anda\n" +
      "4. Unggah berkas dokumen (Raport / Ijazah)\n" +
      "5. Lakukan konfirmasi dan verifikasi admisi\n\n" +
      "Butuh bantuan pengisian formulir? Silakan hubungi WhatsApp Admisi di **0811-290-7500**.",
  },
];

/** Dipakai sebelum admin pernah menyimpan dataset ke database. */
export const DEFAULT_AI_DATASET: AIDatasetItem[] = normalizeDataset(
  [...BUILTIN_ENTRIES, ...(officialKnowledge as unknown[] as Record<string, unknown>[])].map((item) => ({
    ...item,
    updatedAt: "Bawaan Sistem",
  }))
);

export type DatasetChange = { ok: true; list: AIDatasetItem[] } | { ok: false; message: string };

const NOT_FOUND: DatasetChange = {
  ok: false,
  message: "Entri tidak ditemukan. Mungkin sudah dihapus admin lain. Muat ulang halaman.",
};

export function addEntry(list: AIDatasetItem[], input: AIEntryInput, id: string, updatedAt: string): DatasetChange {
  return { ok: true, list: [{ ...input, id, updatedAt }, ...list] };
}

export function updateEntry(list: AIDatasetItem[], id: string, input: AIEntryInput, updatedAt: string): DatasetChange {
  if (!list.some((item) => item.id === id)) return NOT_FOUND;
  return { ok: true, list: list.map((item) => (item.id === id ? { ...input, id, updatedAt } : item)) };
}

export function setEntryActive(list: AIDatasetItem[], id: string, active: boolean, updatedAt: string): DatasetChange {
  if (!list.some((item) => item.id === id)) return NOT_FOUND;
  return { ok: true, list: list.map((item) => (item.id === id ? { ...item, active, updatedAt } : item)) };
}

export function removeEntry(list: AIDatasetItem[], id: string): DatasetChange {
  if (!list.some((item) => item.id === id)) return NOT_FOUND;
  return { ok: true, list: list.filter((item) => item.id !== id) };
}

/** Isi file impor. Ditolak bila ada baris tanpa pertanyaan atau jawaban, agar tidak ada data yang hilang diam-diam. */
export function parseImport(raw: unknown): DatasetChange {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { ok: false, message: "Isi file harus berupa daftar tanya jawab dan tidak boleh kosong." };
  }
  if (raw.length > 2000) return { ok: false, message: "Maksimal 2.000 entri dalam satu file." };
  const badRows = raw.flatMap((item, index) => (readEntry(item) ? [] : [index + 1]));
  if (badRows.length) {
    return {
      ok: false,
      message: `Baris ${badRows.slice(0, 5).join(", ")}${badRows.length > 5 ? ", …" : ""} tidak punya pertanyaan atau jawaban. Tidak ada data yang diubah.`,
    };
  }
  return { ok: true, list: normalizeDataset(raw) };
}
