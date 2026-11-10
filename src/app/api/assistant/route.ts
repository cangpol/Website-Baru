import { NextResponse } from "next/server";
import { searchAiKnowledge } from "@/lib/aiAssistantService";
import { getAIDataset } from "@/server/ai-dataset";
import { getRequestIp, rateLimit } from "@/lib/rateLimit";

const MAX_MESSAGE_LENGTH = 500;

export async function POST(request: Request) {
  const limit = rateLimit(`assistant:${getRequestIp(request)}`, 30, 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { reply: "Terlalu banyak permintaan. Silakan coba lagi sebentar lagi.", answered: false, confidence: 0 },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { reply: "Pesan tidak boleh kosong.", answered: false, confidence: 0 },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { reply: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`, answered: false, confidence: 0 },
        { status: 400 }
      );
    }

    // Field customDataset dari klien diabaikan demi keamanan (baca langsung dari DB)
    // Hanya entri aktif yang boleh dijawab chatbot.
    const dbDataset = (await getAIDataset()).filter((item) => item.active !== false);
    const result = searchAiKnowledge(message, dbDataset);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      {
        reply: "Maaf, terjadi gangguan sesaat pada sistem Veronica. Silakan coba beberapa saat lagi atau hubungi tim Admisi UPITRA via WhatsApp di 0811-290-7500.",
        answered: false,
        confidence: 0
      },
      { status: 500 }
    );
  }
}

