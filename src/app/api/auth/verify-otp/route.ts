import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp";

const COOKIE_NAME = "web_access";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  try {
    const { token, otp } = await request.json();

    console.log("🔐 OTP Verification Debug:", {
      webAccessEnabled: process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED,
      hasSecret: !!process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET,
      nodeEnv: process.env.NODE_ENV,
      httpsEnabled: process.env.HTTPS_ENABLED,
      sessionTimeout: process.env.NEXT_PUBLIC_SESSION_TIMEOUT,
      emailReceiver: !!process.env.EMAIL_RECEIVER
    });

    if (!token || !otp) {
      return NextResponse.json(
        { message: "Token and OTP are required" },
        { status: 400 }
      );
    }

    // Verify the OTP
    const { isValid, email } = await verifyOTP(token, otp);

    // Verify the email matches the configured receiver
    if (!isValid || !email || email !== process.env.EMAIL_RECEIVER) {
      console.log("❌ OTP verification failed:", { isValid, hasEmail: !!email });
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Valid OTP – set secure cookie with session expiration timestamp
    const sessionTimeoutMinutes = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '15');
    const sessionTimeout = sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
    const expiresAt = Date.now() + sessionTimeout;
    const cookieValue = `${process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET!}:${expiresAt}`;
    
    console.log("🍪 Cookie setup:", {
      cookieName: COOKIE_NAME,
      hasValue: !!cookieValue,
      secretLength: process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET?.length,
      expiresAt: new Date(expiresAt).toISOString(),
      nodeEnv: process.env.NODE_ENV,
      httpsEnabled: process.env.HTTPS_ENABLED
    });

    // Use NextResponse.cookies() method instead of manual Set-Cookie header
    const response = new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Set cookie using Next.js built-in method - temporarily disable secure for testing
    response.cookies.set({
      name: COOKIE_NAME,
      value: cookieValue,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: MAX_AGE,
      secure: false // Temporarily disabled for VPS testing
    });

    console.log("📤 Cookie set via response.cookies.set()");
    return response;

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during OTP verification" },
      { status: 500 }
    );
  }
}
