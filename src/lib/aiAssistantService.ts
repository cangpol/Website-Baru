import datasetRaw from "@/data/upitraAiKnowledge.json";

export interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  score?: number;
}

const dataset: KnowledgeItem[] = datasetRaw as KnowledgeItem[];

const STOPWORDS = new Set([
  "apa", "apakah", "siapa", "dimana", "bagaimana", "berapa", "kapan", "mengapa",
  "yang", "di", "ke", "dari", "dan", "atau", "dengan", "untuk", "pada", "dalam",
  "adalah", "ada", "ini", "itu", "saya", "kami", "kita", "mereka", "nya",
  "juga", "sudah", "belum", "bisa", "dapat", "akan", "telah", "sedang",
  "tentang", "mengenai", "terkait", "seputar", "info", "informasi", "tolong",
  "mohon", "minta", "coba", "ingin", "mau", "perlu", "butuh", "tahu",
  "dong", "ya", "yuk", "nih", "sih", "deh", "lah", "kah",
  "upitra", "universitas", "pignatelli", "triputra"
]);

const SYNONYMS: Record<string, string[]> = {
  daftar: ["mendaftar", "pendaftaran", "registrasi", "pmb", "masuk", "join", "ikutan"],
  biaya: ["spp", "ukt", "bayar", "harga", "tarif", "iuran", "dana", "duit", "bayaran"],
  lokasi: ["alamat", "tempat", "dimana", "letak", "posisi", "maps", "daerah", "gedung"],
  beasiswa: ["bantuan", "subsidi", "gratis", "potongan", "kip", "kip-k", "kipk", "kuliah gratis"],
  prodi: ["jurusan", "program studi", "fakultas", "kuliah", "studi"],
  dosen: ["pengajar", "guru", "tenaga pendidik", "staf pengajar"],
  kaprodi: ["ketua prodi", "kepala prodi", "kepala program studi"],
  magang: ["internship", "pkl", "praktik kerja", "immersion"],
  akreditasi: ["nilai", "peringkat", "status akreditasi", "terakreditasi"],
  lulus: ["wisuda", "kelulusan", "tamat", "selesai kuliah", "ijazah"],
  ukm: ["ekskul", "ekstrakurikuler", "kegiatan", "organisasi", "ormawa", "bem"],
  kos: ["ngekos", "kost", "kosan", "asrama", "penginapan"],
  kontak: ["wa", "whatsapp", "nomor", "no hp", "telepon", "email", "hubungi", "call center", "admisi"]
};

// Indonesian light stemmer for common suffixes/prefixes
function basicStem(word: string): string {
  let w = word.toLowerCase();
  // Remove trailing possessives & particles
  w = w.replace(/(lah|kah|tah|pun)$/, "");
  w = w.replace(/(ku|mu|nya)$/, "");
  // Remove inflection suffixes
  w = w.replace(/(kan|an|i)$/, "");
  // Remove prefixes
  w = w.replace(/^(meng|peng|meny|peny|mem|pem|men|pen|me|pe|ber|ter|di|ke|se)/, "");
  return w;
}

// Levenshtein distance calculation for typo tolerance
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const norm = normalize(text);
  const words = norm.split(" ").filter((w) => w.length > 1 && !STOPWORDS.has(w));
  return words.map(basicStem);
}

function expandQuery(query: string): string[] {
  const tokens = tokenize(query);
  const normQuery = normalize(query);
  const expanded = new Set<string>(tokens);

  for (const [canonical, variants] of Object.entries(SYNONYMS)) {
    for (const v of variants) {
      if (normQuery.includes(v)) {
        expanded.add(basicStem(canonical));
        variants.forEach((item) => expanded.add(basicStem(item)));
      }
    }
    if (tokens.includes(basicStem(canonical))) {
      variants.forEach((item) => expanded.add(basicStem(item)));
    }
  }

  return Array.from(expanded);
}

function wordScore(queryTokens: string[], target: string): number {
  if (queryTokens.length === 0) return 0;
  const targetTokens = tokenize(target);
  if (targetTokens.length === 0) return 0;

  let matches = 0;
  for (const qw of queryTokens) {
    for (const tw of targetTokens) {
      if (qw === tw) {
        matches += 1.0;
        break;
      }
      if (qw.length >= 4 && tw.length >= 4) {
        if (tw.includes(qw) || qw.includes(tw)) {
          matches += 0.5;
          break;
        }
        const dist = levenshteinDistance(qw, tw);
        const maxDist = qw.length <= 5 ? 1 : 2;
        if (dist <= maxDist) {
          matches += 0.8;
          break;
        }
      }
    }
  }

  return matches / Math.max(queryTokens.length, targetTokens.length, 1);
}

function keywordScore(query: string, keywords: string[]): number {
  if (!keywords || keywords.length === 0) return 0;

  const q = normalize(query);
  const queryTokens = tokenize(query);
  let bestMatch = 0;

  for (const kw of keywords) {
    const k = normalize(kw);
    const kwTokens = tokenize(kw);

    if (q === k) return 3.0; // Exact match

    if (k.includes(q) && q.length >= 3) {
      const ratio = q.length / k.length;
      bestMatch = Math.max(bestMatch, 2.5 + ratio * 0.5);
      continue;
    }

    if (q.includes(k) && k.length >= 3) {
      const ratio = k.length / q.length;
      bestMatch = Math.max(bestMatch, 1.8 + ratio * 0.5);
      continue;
    }

    let tokenMatches = 0;
    for (const qt of queryTokens) {
      for (const kt of kwTokens) {
        if (qt === kt) tokenMatches++;
      }
    }

    if (tokenMatches > 0) {
      const matchRatio = tokenMatches / Math.max(queryTokens.length, kwTokens.length, 1);
      bestMatch = Math.max(bestMatch, 1.0 + matchRatio * 1.0);
    }
  }

  return bestMatch;
}

function categoryBoost(query: string, category: string): number {
  const q = normalize(query);
  if (/^(apa saja|ada apa|sebutkan|daftar|list|semua)\b/.test(q) && category === "faq") {
    return 0.8;
  }

  const categoryMap: Record<string, string[]> = {
    faq: ["cara", "bagaimana", "apa", "syarat", "persyaratan", "berapa"],
    program_studi: ["kaprodi", "ketua prodi", "kepala prodi", "jurusan", "s1", "d3"],
    fakultas: ["dekan", "feb", "fst", "fsh", "fkes"],
    rektorat: ["rektor", "pimpinan", "warek", "wr"],
    kemahasiswaan: ["bem", "ukm", "organisasi", "beasiswa", "prestasi"],
    kerjasama: ["mou", "mitra", "triputra", "magang"],
    akademik: ["kurikulum", "skripsi", "immersion", "3+1", "obe"]
  };

  const hints = categoryMap[category] || [];
  for (const hint of hints) {
    if (q.includes(hint)) return 0.4;
  }
  return 0;
}

// Intent detection for immediate, precise answers
function detectIntent(message: string): string | null {
  const q = normalize(message);

  // Kontak & WhatsApp Admisi
  if (/(kontak|wa|whatsapp|nomor|telepon|call center|hubungi|no hp)/.test(q)) {
    return (
      "📞 **Kontak & Layanan Admisi UPITRA:**\n\n" +
      "• **WhatsApp Admisi:** [0811-290-7500](https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA)\n" +
      "• **Email:** admission@upitra.ac.id / info@upitra.ac.id\n" +
      "• **Website PMB:** [pmb.upitra.ac.id](https://pmb.upitra.ac.id)\n" +
      "• **Jam Operasional:** Senin – Jumat, 08.00 – 16.00 WIB\n\n" +
      "Silakan klik nomor WhatsApp di atas untuk langsung berkonsultasi dengan staf admisi kami!"
    );
  }

  // Lokasi & Alamat
  if (/(lokasi|alamat|dimana|maps|letak|daerah kampus)/.test(q)) {
    return (
      "📍 **Lokasi Kampus Universitas Pignatelli Triputra (UPITRA):**\n\n" +
      "Jl. Duwet No. 1, Karangasem, Kec. Laweyan, Kota Surakarta (Solo), Jawa Tengah 57145.\n\n" +
      "Kampus kami berlokasi strategis di pusat kota Solo, mudah dijangkau dengan transportasi umum maupun kendaraan pribadi."
    );
  }

  // Portal PMB / Cara Daftar
  if (/(cara daftar|daftar pmb|link pmb|registrasi maba|link pendaftaran)/.test(q)) {
    return (
      "🎯 **Pendaftaran Mahasiswa Baru (PMB) UPITRA:**\n\n" +
      "Pendaftaran dapat dilakukan secara online melalui portal resmi kami:\n" +
      "👉 **[pmb.upitra.ac.id](https://pmb.upitra.ac.id)**\n\n" +
      "**Langkah Pendaftaran:**\n" +
      "1. Akses portal [pmb.upitra.ac.id](https://pmb.upitra.ac.id)\n" +
      "2. Buat akun pendaftaran baru\n" +
      "3. Pilih Program Studi impian Anda\n" +
      "4. Unggah berkas dokumen (Raport / Ijazah)\n" +
      "5. Lakukan konfirmasi dan verifikasi admisi\n\n" +
      "Butuh bantuan pengisian formulir? Silakan hubungi WhatsApp Admisi di **0811-290-7500**."
    );
  }

  return null;
}

function fallbackAnswer(): string {
  return (
    "Terima kasih atas pertanyaannya! Informasi spesifik yang Anda tanyakan sedang diverifikasi lebih lanjut oleh tim kami. ✨\n\n" +
    "Anda dapat menanyakan hal-hal berikut:\n" +
    "• **Program Studi & 4 Fakultas Unggulan** (FST, FEB, FSH, FKes)\n" +
    "• **Alur Pendaftaran PMB & Beasiswa** (KIP-Kuliah, Beasiswa Triputra, Beasiswa Prestasi)\n" +
    "• **Kurikulum 3+1 (Kuliah + Immersion Magang)**\n" +
    "• **Fasilitas Kampus & Lokasi**\n\n" +
    "Atau Anda dapat langsung berkonsultasi dengan staf admisi resmi UPITRA melalui WhatsApp:\n" +
    "👉 **[Chat WhatsApp Admisi (0811-290-7500)](https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20ingin%20konsultasi%20informasi%20kampus)**"
  );
}

export function searchAiKnowledge(query: string): { reply: string; answered: boolean; confidence: number } {
  const cleanQuery = query.trim();
  if (cleanQuery.length < 2) {
    return {
      reply: "Pertanyaan terlalu singkat. Silakan tuliskan pertanyaan yang ingin Anda tanyakan seputar UPITRA.",
      answered: false,
      confidence: 0
    };
  }

  // 1. Direct Intent Check
  const intent = detectIntent(cleanQuery);
  if (intent) {
    return {
      reply: intent,
      answered: true,
      confidence: 1.0
    };
  }

  // 2. Tokenized & Keyword Match Across Knowledge Base
  const queryTokens = expandQuery(cleanQuery);
  const scoredItems: KnowledgeItem[] = [];

  for (const item of dataset) {
    const qScore = wordScore(queryTokens, item.question) * 2.0;
    const aScore = wordScore(queryTokens, item.answer) * 0.6;
    const kScore = keywordScore(cleanQuery, item.keywords) * 1.8;
    const cBoost = categoryBoost(cleanQuery, item.category);

    const totalScore = qScore + aScore + kScore + cBoost;

    if (totalScore > 0) {
      scoredItems.push({ ...item, score: totalScore });
    }
  }

  scoredItems.sort((a, b) => (b.score || 0) - (a.score || 0));

  const topMatch = scoredItems[0];
  const topScore = topMatch?.score || 0;

  if (!topMatch || topScore < 0.45) {
    return {
      reply: fallbackAnswer(),
      answered: false,
      confidence: Number(topScore.toFixed(2))
    };
  }

  return {
    reply: topMatch.answer,
    answered: true,
    confidence: Number(topScore.toFixed(2))
  };
}
