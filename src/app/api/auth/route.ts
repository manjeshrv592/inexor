import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  if (process.env.WEB_ACCESS_ENABLED !== "true") {
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

  // Valid credentials – return success without setting session cookie
  // The actual session will be set after OTP verification
  return NextResponse.json({ 
    ok: true,
    message: 'Please verify OTP to continue'
  });
}
