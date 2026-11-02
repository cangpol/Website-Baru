import { NextResponse } from "next/server";
import { getEvents, getAcademicCalendarDoc } from "@/server/events";

export async function GET() {
  try {
    const [events, officialPdf] = await Promise.all([
      getEvents(),
      getAcademicCalendarDoc(),
    ]);
    return NextResponse.json({ ok: true, data: events, officialPdf });
  } catch (err) {
    console.error("Error in /api/events:", err);
    return NextResponse.json({ ok: false, data: [], officialPdf: null }, { status: 500 });
  }
}

