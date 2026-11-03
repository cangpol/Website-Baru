import { NextResponse } from "next/server";
import { getLayananFaqs } from "@/server/services";

export async function GET() {
  try {
    const faqs = await getLayananFaqs();
    return NextResponse.json({ ok: true, data: faqs });
  } catch (err) {
    console.error("Error in /api/layanan/faqs:", err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}

