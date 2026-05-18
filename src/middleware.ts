import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes
const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
];

// Admin route prefix
const ADMIN_ROUTE = "/admin";

// Protected route prefixes
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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get JWT token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // -----------------------------
  // 1. Allow public routes
  // -----------------------------
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    // Prevent logged-in users from visiting login/register again
    if (
      token &&
      (pathname === "/auth/login" ||
        pathname === "/auth/register")
    ) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
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
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  // -----------------------------
  // 3. Admin protection
  // -----------------------------
  if (pathname.startsWith(ADMIN_ROUTE)) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    // Role check
    if (token.role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }
  }

  // -----------------------------
  // 4. Allow request
  // -----------------------------
  return NextResponse.next();
}

// Middleware matcher
export const config = {
  matcher: [
    /*
     * Match all protected routes
     */
    "/dashboard/:path*",
    "/workouts/:path*",
    "/diet/:path*",
    "/water/:path*",
    "/weight/:path*",
    "/goals/:path*",
    "/profile/:path*",
    "/admin/:path*",

    /*
     * Match auth pages
     */
    "/auth/login",
    "/auth/register",
  ],
};