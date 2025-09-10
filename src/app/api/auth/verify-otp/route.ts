import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp";

const COOKIE_NAME = "web_access";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  try {
    const { token, otp } = await request.json();

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
    const cookie = `${COOKIE_NAME}=${cookieValue}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${process.env.NODE_ENV === 'production' ? '; Secure' : ''};`;

    // Return success response with Set-Cookie header
    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie
      }
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during OTP verification" },
      { status: 500 }
    );
  }
}
