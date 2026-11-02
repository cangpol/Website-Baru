"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const aiDatasetItemSchema = z.object({
  id: z.string(),
  category: z.string().min(2, "Kategori wajib diisi"),
  question: z.string().min(3, "Pertanyaan minimal 3 karakter"),
  answer: z.string().min(5, "Jawaban minimal 5 karakter"),
  keywords: z.array(z.string()).default([]),
  active: z.boolean().default(true),
  updatedAt: z.string().optional(),
});

const aiDatasetListSchema = z.array(aiDatasetItemSchema);

export type AIDatasetItem = z.infer<typeof aiDatasetItemSchema>;

const DEFAULT_AI_DATASET: AIDatasetItem[] = [
  {
    id: "ds-pmb-01",
    category: "PMB & Beasiswa",
    question: "Bagaimana cara mendaftar PMB UPITRA 2026?",
    answer: "Pendaftaran dapat dilakukan secara online melalui website resmi upitra.ac.id pada formulir pendaftaran cepat atau menghubungi WhatsApp Hotline PMB di 0811-2658-884.",
    keywords: ["daftar", "pmb", "cara daftar", "biaya pendaftaran", "gelombang"],
    active: true,
  },
  {
    id: "ds-pmb-02",
    category: "PMB & Beasiswa",
    question: "Apa saja jalur beasiswa yang tersedia di UPITRA?",
    answer: "UPITRA menyediakan Jalur Ready Early (Beasiswa hingga 100% DPP & SKS), Ready Achievement (Prestasi Akademik/Non-Akademik), dan Ready Admission (Keringanan DPP).",
    keywords: ["beasiswa", "potongan", "keringanan", "ready early", "gratis"],
    active: true,
  },
  {
    id: "ds-akd-01",
    category: "Akademik & Fakultas",
    question: "Apa saja program studi yang ada di UPITRA?",
    answer: "UPITRA memiliki 4 Fakultas dan 10 Program Studi, antara lain S1 Informatika, S1 Sistem Informasi, S1 Rekayasa Perangkat Lunak, S1 Pariwisata, S1 Bahasa Inggris, S1 Manajemen, S1 Akuntansi, S1 Hukum, D3 Keperawatan, dan D3 Kebidanan.",
    keywords: ["prodi", "jurusan", "fakultas", "studi", "s1", "d3"],
    active: true,
  },
  {
    id: "ds-ind-01",
    category: "Kerjasama Industri",
    question: "Apa keunggulan program magang Triputra Group?",
    answer: "UPITRA memiliki program immersion 3+1 (3 tahun kuliah kampus, 1 tahun magang industri terarah di anak perusahaan Triputra Group) dengan peluang direkrut langsung sebelum wisuda.",
    keywords: ["triputra", "magang", "kerja", "lulusan", "penyerapan"],
    active: true,
  },
];

export async function getAIDataset(): Promise<AIDatasetItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "ai_dataset" },
    });
    if (!setting || !setting.value) {
      return DEFAULT_AI_DATASET;
    }
    const parsed = aiDatasetListSchema.safeParse(setting.value);
    if (!parsed.success) {
      return DEFAULT_AI_DATASET;
    }
    return parsed.data;
  } catch (err) {
    console.error("Error fetching AI dataset:", err);
    return DEFAULT_AI_DATASET;
  }
}

export async function saveAIDatasetAction(dataset: AIDatasetItem[]) {
  const session = await requirePermission("aiDataset", "update");

  const validated = aiDatasetListSchema.safeParse(dataset);
  if (!validated.success) {
    return {
      ok: false,
      message: "Format dataset tidak valid. Harap periksa skema Q&A.",
      fieldErrors: validated.error.flatten(),
    };
  }

  try {
    await prisma.siteSetting.upsert({
      where: { key: "ai_dataset" },
      create: {
        key: "ai_dataset",
        value: validated.data,
        description: "Basis pengetahuan Q&A untuk chatbot AI Assistant UPITRA",
      },
      update: {
        value: validated.data,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "ai_dataset",
      details: JSON.stringify({ totalEntries: validated.data.length }),
    });

    await invalidateEntity(CACHE_TAGS.AI_DATASET);
    return { ok: true, message: "Dataset AI berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving AI dataset:", err);
    return { ok: false, message: "Gagal menyimpan dataset ke database." };
  }
}
