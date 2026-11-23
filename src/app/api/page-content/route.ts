import { NextRequest, NextResponse } from "next/server";
import { getPageContent } from "@/server/page-content";

export async function GET(request: NextRequest) {
  const page = new URL(request.url).searchParams.get("page") || "";
  const data = await getPageContent(page);
  return NextResponse.json({ ok: true, data });
}
