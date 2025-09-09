import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { serialize } from "cookie";

const COOKIE_NAME = "web_access";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

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

  // Valid credentials – set secure cookie
  const cookie = serialize(COOKIE_NAME, process.env.WEB_ACCESS_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    // Add domain in production if needed
    // domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined'
  });

  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", cookie);
  return res;
}
