import { NextResponse } from "next/server";
import { getPartners } from "@/server/partners";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPartners();
  return NextResponse.json({ ok: true, data });
}
