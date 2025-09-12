import { NextResponse } from "next/server";
import { generateOTP } from "@/lib/otp";
import nodemailer from "nodemailer";
import { getOTPEmailTemplate } from "@/lib/templates/otp-email";
import { isOTPRequired } from "@/lib/dateUtils";

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "10");

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Validate credentials first
    if (
      !username || !password ||
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
    
    console.log("🔐 OTP Request Debug:", {
      otpRequired,
      otpAuthFrom: process.env.NEXT_PUBLIC_OTP_AUTH_FROM,
      currentDate: new Date().toISOString().split('T')[0]
    });

    if (!otpRequired) {
      // OTP not required - set session cookie directly and authenticate user
      const sessionTimeoutMinutes = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '15');
      const sessionTimeout = sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
      const expiresAt = Date.now() + sessionTimeout;
      const cookieValue = `${process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET!}:${expiresAt}`;
      
      const response = new NextResponse(JSON.stringify({ 
        success: true,
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

      console.log("✅ Direct authentication successful - OTP bypassed");
      return response;
    }

    // OTP is required - proceed with OTP generation and sending
    const email = process.env.EMAIL_RECEIVER;
    if (!email) {
      return NextResponse.json(
        { message: "OTP email not configured" },
        { status: 500 },
      );
    }

    // Generate OTP and get token
    const { otp, token } = await generateOTP(email);

    // Create email transporter (using the same config as contact form)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email with OTP
    await transporter.sendMail({
      from: `"INEXOR" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your INEXOR Login Code (Valid for ${OTP_EXPIRY_MINUTES} minutes)`,
      html: getOTPEmailTemplate({ otp, expiryMinutes: OTP_EXPIRY_MINUTES }),
    });

    // In production, you should not send the OTP back in the response
    // This is just for development/testing
    if (process.env.NODE_ENV === "development") {
      console.log(`OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      token, // This token will be used to verify the OTP
    });
  } catch (error) {
    console.error("Error in OTP request:", error);
    return NextResponse.json(
      { message: "Failed to send OTP. Please try again." },
      { status: 500 },
    );
  }
}
