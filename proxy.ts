// middleware.ts
import { auth } from "@/lib/AuthConfig"; // your NextAuth export
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = nextUrl.pathname.startsWith("/panel");
  const isAuthRoute =
    nextUrl.pathname.startsWith("/sign-in") ||
    nextUrl.pathname.startsWith("/sign-up") ||
    nextUrl.pathname === "/";

  // ✅ If NOT logged in & trying to access protected route
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  // ✅ If logged in & trying to access auth/public pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/panel", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/panel/:path*", "/sign-in", "/sign-up", "/"],
};