import { NextResponse } from "next/server";
import { getServiceItems } from "@/server/services";

export async function GET() {
  try {
    const services = await getServiceItems(true);
    return NextResponse.json({ ok: true, data: services });
  } catch (err) {
    console.error("Error in /api/services:", err);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}

