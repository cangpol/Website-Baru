import { NextResponse } from "next/server";
import { getEvents } from "@/server/events";

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json({ ok: true, data: events });
  } catch (err) {
    console.error("Error in /api/events:", err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}
