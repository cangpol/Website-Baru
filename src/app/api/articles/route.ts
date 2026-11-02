import { NextRequest, NextResponse } from "next/server";
import { getPublishedArticles } from "@/server/articles";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const category = searchParams.get("category") || undefined;

    const articles = await getPublishedArticles(limit, category);
    return NextResponse.json({ ok: true, data: articles });
  } catch (err) {
    console.error("Error in /api/articles:", err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}
