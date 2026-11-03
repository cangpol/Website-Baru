import { NextResponse } from "next/server";
import { getPmbBrochureSetting } from "@/server/services";

export async function GET() {
  try {
    const brochure = await getPmbBrochureSetting();
    return NextResponse.json({ ok: true, data: brochure });
  } catch (err) {
    console.error("Error in /api/layanan/brochure:", err);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}

