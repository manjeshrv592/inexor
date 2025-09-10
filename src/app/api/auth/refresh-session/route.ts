import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "web_access";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST() {
  try {
    // Check if web access is enabled
    if (process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED !== 'true') {
      return NextResponse.json({ success: false, message: 'Web access not enabled' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const currentCookie = cookieStore.get(COOKIE_NAME);

    if (!currentCookie?.value) {
      return NextResponse.json({ success: false, message: 'No session found' }, { status: 401 });
    }

    // Parse current cookie
    const [cookieSecret, expiresAtStr] = currentCookie.value.split(':');

    // Validate the secret
    if (cookieSecret !== process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET) {
      return NextResponse.json({ success: false, message: 'Invalid session' }, { status: 401 });
    }

    // Check if current session has expired
    if (expiresAtStr) {
      const expiresAt = parseInt(expiresAtStr);
      if (Date.now() > expiresAt) {
        return NextResponse.json({ success: false, message: 'Session expired' }, { status: 401 });
      }
    }

    // Extend session with new timestamp using environment variable
    const sessionTimeoutMinutes = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '15');
    const sessionTimeout = sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
    const newExpiresAt = Date.now() + sessionTimeout;
    const newCookieValue = `${process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET!}:${newExpiresAt}`;
    
    // Set new cookie with extended expiration
    const cookie = `${COOKIE_NAME}=${newCookieValue}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${process.env.NODE_ENV === 'production' ? '; Secure' : ''};`;

    return new NextResponse(JSON.stringify({ success: true, expiresAt: newExpiresAt }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie
      }
    });

  } catch (error) {
    console.error("Session refresh error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during session refresh" },
      { status: 500 }
    );
  }
}
