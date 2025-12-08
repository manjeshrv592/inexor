import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  if (process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow public assets and auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/revalidate") || // Allow revalidation webhook
    pathname.startsWith("/studio") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/i) // Allow image files
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("web_access")?.value;

  if (token) {
    // Parse cookie value: secret:timestamp
    const [cookieSecret, expiresAtStr] = token.split(':');
    
    // Validate the secret
    if (cookieSecret === process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET) {
      // Check if session has expired
      if (expiresAtStr) {
        const expiresAt = parseInt(expiresAtStr);
        if (Date.now() > expiresAt) {
          const loginUrl = request.nextUrl.clone();
          loginUrl.pathname = "/auth";
          loginUrl.searchParams.set("redirect", pathname);
          return NextResponse.redirect(loginUrl);
        }
      }
      return NextResponse.next();
    }
  }
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/auth";
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/:path*",
};
