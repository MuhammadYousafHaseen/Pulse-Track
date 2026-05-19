import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// -----------------------------
// Public routes
// -----------------------------
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
];

// -----------------------------
// Admin route prefix
// -----------------------------
const ADMIN_ROUTE = "/admin";

// -----------------------------
// Protected route prefixes
// -----------------------------
const PROTECTED_ROUTES = [
  "/dashboard",
  "/workouts",
  "/diet",
  "/water",
  "/weight",
  "/goals",
  "/profile",
  "/admin",
];

export async function proxy(req: NextRequest) {
  

  const { pathname } = req.nextUrl;

  // --------------------------------------------------
  // IMPORTANT: NEVER interfere with NextAuth routes
  // --------------------------------------------------
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Get JWT token from NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // -----------------------------
  // 1. Public routes
  // -----------------------------
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    // If logged in, prevent access to login/register
    if (
      token &&
      (pathname === "/auth/login" || pathname === "/auth/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // -----------------------------
  // 2. Protected routes
  // -----------------------------
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // -----------------------------
  // 3. Admin protection
  // -----------------------------
  if (pathname.startsWith(ADMIN_ROUTE)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // -----------------------------
  // 4. Allow request
  // -----------------------------
  return NextResponse.next();
}

// -----------------------------
// Matcher (IMPORTANT FIX HERE)
// -----------------------------
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workouts/:path*",
    "/diet/:path*",
    "/water/:path*",
    "/weight/:path*",
    "/goals/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/auth/login",
    "/auth/register",
  ],
};