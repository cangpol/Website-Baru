import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 Gateway Proxy (Menggantikan middleware konvensional)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rute login yang dikecualikan dari pemeriksaan sesi
  if (
    pathname === "/admin/login" ||
    pathname === "/u-gate" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Periksa keberadaan cookie sesi terotentikasi
  const sessionCookie = request.cookies.get("upitra_session")?.value;

  if (!sessionCookie) {
    const loginUrl = new URL("/u-gate", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

