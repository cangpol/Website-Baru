import { NextResponse } from "next/server";
import { getHomepageContent } from "@/server/homepage";

export async function GET() {
  try {
    const data = await getHomepageContent();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error in /api/homepage:", err);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}

