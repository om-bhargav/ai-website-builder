import { auth } from "@/lib/AuthConfig";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = nextUrl.pathname.startsWith("/panel");

  const isGuestOnlyRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname.startsWith("/sign-in") ||
    nextUrl.pathname.startsWith("/sign-up");

  // ❌ Not logged in → block panel
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  // ❌ Logged in → block ALL guest pages (including home)
  if (isLoggedIn && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL("/panel", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/panel/:path*", "/sign-in", "/sign-up", "/"],
};