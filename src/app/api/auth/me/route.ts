import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }
    return NextResponse.json({
      ok: true,
      user: {
        userId: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (err) {
    return NextResponse.json({ ok: false, user: null }, { status: 500 });
  }
}

