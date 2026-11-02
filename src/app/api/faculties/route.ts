import { NextResponse } from "next/server";
import { getFacultiesWithPrograms } from "@/server/programs";

export async function GET() {
  try {
    const faculties = await getFacultiesWithPrograms();
    return NextResponse.json({ ok: true, data: faculties });
  } catch (err) {
    console.error("Error in /api/faculties:", err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}
