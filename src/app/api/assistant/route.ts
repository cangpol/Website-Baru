import { NextResponse } from "next/server";
import { searchAiKnowledge } from "@/lib/aiAssistantService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { reply: "Pesan tidak boleh kosong.", answered: false, confidence: 0 },
        { status: 400 }
      );
    }

    const result = searchAiKnowledge(message);
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

