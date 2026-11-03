import { NextResponse } from "next/server";
import { getRisetPortals } from "@/server/articles";

export async function GET() {
  try {
    const portals = await getRisetPortals();
    return NextResponse.json({ ok: true, data: portals });
  } catch (err) {
    console.error("Error in /api/riset/portals:", err);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}

