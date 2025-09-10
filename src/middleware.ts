import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🔐 Middleware running:", {
    enabled: process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED,
    pathname: request.nextUrl.pathname,
  });

  if (process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED !== "true") {
    console.log("🚫 Auth disabled, allowing request");
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow public assets and auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/revalidate") || // Allow revalidation webhook
    pathname.startsWith("/studio") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/i) // Allow image files
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("web_access")?.value;
  console.log("🍪 Cookie check:", {
    hasCookie: !!token,
    secretSet: !!process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET,
    pathname,
  });

  if (token) {
    // Parse cookie value: secret:timestamp
    const [cookieSecret, expiresAtStr] = token.split(':');
    
    // Validate the secret
    if (cookieSecret === process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET) {
      // Check if session has expired
      if (expiresAtStr) {
        const expiresAt = parseInt(expiresAtStr);
        if (Date.now() > expiresAt) {
          console.log("⏰ Session expired, redirecting to auth");
          const loginUrl = request.nextUrl.clone();
          loginUrl.pathname = "/auth";
          loginUrl.searchParams.set("redirect", pathname);
          return NextResponse.redirect(loginUrl);
        }
      }
      
      console.log("✅ Auth successful, allowing request");
      return NextResponse.next();
    }
  }

  console.log("🔒 Redirecting to auth page");
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/auth";
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/:path*",
};
