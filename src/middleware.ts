// src/middleware.ts

import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/patient") ||
    req.nextUrl.pathname.startsWith("/resource") ||
    req.nextUrl.pathname.startsWith("/visit-request");

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
