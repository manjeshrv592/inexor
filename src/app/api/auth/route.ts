import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { isOTPRequired } from "@/lib/dateUtils";

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED !== "true") {
    return NextResponse.json(
      { message: "Web access protection disabled" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { errors: parse.error.flatten() },
      { status: 400 },
    );
  }

  const { username, password } = parse.data;

  if (
    username !== process.env.WEB_ACCESS_USERNAME ||
    password !== process.env.WEB_ACCESS_PASSWORD
  ) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  // Check if OTP is required based on the configured date
  const otpRequired = isOTPRequired();

  if (!otpRequired) {
    // OTP not required - set session cookie directly and authenticate user
    const sessionTimeoutMinutes = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '15');
    const sessionTimeout = sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
    const expiresAt = Date.now() + sessionTimeout;
    const cookieValue = `${process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET!}:${expiresAt}`;
    
    const response = new NextResponse(JSON.stringify({ 
      ok: true,
      authenticated: true,
      message: 'Authentication successful'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Set authentication cookie
    response.cookies.set({
      name: 'web_access',
      value: cookieValue,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: false // Temporarily disabled for VPS testing
    });
    return response;
  }

  // OTP is required - return success without setting session cookie
  // The actual session will be set after OTP verification
  return NextResponse.json({ 
    ok: true,
    otpRequired: true,
    message: 'Please verify OTP to continue'
  });
}
