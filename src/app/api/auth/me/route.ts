import { NextResponse } from "next/server";
import { getSession, getFeatureFlags } from "@/lib/auth";
import { ADMIN_FEATURES, isFeatureEnabled } from "@/lib/adminFeatures";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }
    // Fitur yang aktif untuk peran ini (Super Admin selalu memiliki semuanya).
    const flags = await getFeatureFlags();
    const features = Object.fromEntries(
      ADMIN_FEATURES.map((f) => [f.id, session.role === "SUPERADMIN" ? true : isFeatureEnabled(f, session.role, flags)])
    );
    return NextResponse.json({
      ok: true,
      features,
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

