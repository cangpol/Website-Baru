import { NextRequest, NextResponse } from "next/server";
import { getPageHeaderBanner } from "@/server/hero";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("page") || "akademik";
    const banner = await getPageHeaderBanner(pageKey);
    return NextResponse.json({ ok: true, data: banner });
  } catch (err) {
    console.error("Error in /api/banner:", err);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}

