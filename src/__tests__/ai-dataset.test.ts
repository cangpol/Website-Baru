import { describe, expect, it } from "vitest";
import {
  DEFAULT_AI_DATASET,
  INTENT_ENTRY_IDS,
  addEntry,
  aiEntryInputSchema,
  normalizeDataset,
  parseImport,
  removeEntry,
  setEntryActive,
  updateEntry,
  type AIDatasetItem,
} from "@/lib/aiDataset";
import { searchAiKnowledge } from "@/lib/aiAssistantService";

const entry = (over: Partial<AIDatasetItem> = {}): AIDatasetItem => ({
  id: "a",
  category: "umum",
  question: "Apa itu UPITRA?",
  answer: "Universitas di Surakarta.",
  keywords: [],
  active: true,
  ...over,
});

const input = { category: "pmb", question: "Kapan pendaftaran?", answer: "Sepanjang tahun.", keywords: [], active: true };

describe("data bawaan chatbot", () => {
  it("punya ID unik sehingga ubah dan hapus hanya mengenai satu entri", () => {
    expect(new Set(DEFAULT_AI_DATASET.map((i) => i.id)).size).toBe(DEFAULT_AI_DATASET.length);
  });

  it("memuat jawaban kontak, lokasi, dan cara daftar sebagai entri yang bisa diubah", () => {
    for (const id of Object.values(INTENT_ENTRY_IDS)) {
      expect(DEFAULT_AI_DATASET.some((i) => i.id === id)).toBe(true);
    }
  });
});

describe("normalizeDataset", () => {
  it("tetap membaca entri janggal, membuang salinan persis, dan membedakan ID ganda", () => {
    const result = normalizeDataset([
      entry({ question: "hi" }),
      entry({ question: "hi" }),
      entry({ answer: "Jawaban lain." }),
      { id: "x", question: "", answer: "tanpa pertanyaan" },
    ]);
    expect(result.map((i) => i.id)).toEqual(["a", "a-2"]);
  });
});

describe("operasi CRUD", () => {
  const list = [entry(), entry({ id: "b", question: "Di mana?" })];

  it("menambah, mengubah, menonaktifkan, dan menghapus hanya satu entri", () => {
    const added = addEntry(list, input, "c", "hari ini");
    const updated = updateEntry(list, "b", input, "hari ini");
    const inactive = setEntryActive(list, "a", false, "hari ini");
    const removed = removeEntry(list, "a");
    if (!added.ok || !updated.ok || !inactive.ok || !removed.ok) throw new Error("operasi gagal");
    expect(added.list.map((i) => i.id)).toEqual(["c", "a", "b"]);
    expect(updated.list.map((i) => i.question)).toEqual(["Apa itu UPITRA?", "Kapan pendaftaran?"]);
    expect(inactive.list.map((i) => i.active)).toEqual([false, true]);
    expect(removed.list.map((i) => i.id)).toEqual(["b"]);
  });

  it("menolak mengubah atau menghapus entri yang sudah tidak ada", () => {
    expect(updateEntry(list, "z", input, "x").ok).toBe(false);
    expect(removeEntry(list, "z").ok).toBe(false);
  });

  it("memvalidasi isian form", () => {
    expect(aiEntryInputSchema.safeParse(input).success).toBe(true);
    expect(aiEntryInputSchema.safeParse({ ...input, question: "  " }).success).toBe(false);
  });

  it("menolak file impor yang punya baris tidak lengkap", () => {
    const bad = parseImport([entry(), { question: "tanpa jawaban" }]);
    expect(bad.ok).toBe(false);
    expect(parseImport([]).ok).toBe(false);
    expect(parseImport([{ pertanyaan: "Apa?", jawaban: "Ini." }]).ok).toBe(true);
  });
});

describe("pencarian jawaban", () => {
  const idOf = (id: string) => DEFAULT_AI_DATASET.find((i) => i.id === id)!.answer;
  const ask = (q: string, data = DEFAULT_AI_DATASET) => searchAiKnowledge(q, data).reply;

  it("tidak menjawab dengan kontak hanya karena kata memuat huruf 'wa'", () => {
    for (const q of ["Ada beasiswa apa saja?", "Berapa jumlah mahasiswa UPITRA?"]) {
      expect(ask(q)).not.toBe(idOf(INTENT_ENTRY_IDS.contact));
    }
  });

  it("mengarahkan pertanyaan kontak ke entri kontak yang bisa diubah admin", () => {
    const edited = DEFAULT_AI_DATASET.map((i) => (i.id === INTENT_ENTRY_IDS.contact ? { ...i, answer: "Nomor baru." } : i));
    expect(ask("minta nomor wa dong", edited)).toBe("Nomor baru.");
  });

  it("mendahulukan isian admin yang pertanyaannya sama persis", () => {
    const mine = entry({ id: "mine", question: "Di mana alamat kampus?", answer: "Jawaban admin." });
    expect(ask("di mana alamat kampus", [mine, ...DEFAULT_AI_DATASET])).toBe("Jawaban admin.");
  });

  it("tidak memakai data bawaan bila dataset admin kosong", () => {
    expect(searchAiKnowledge("Siapa rektor?", []).answered).toBe(false);
  });
});
