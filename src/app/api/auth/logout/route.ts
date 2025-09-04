import { NextResponse } from "next/server";
import { serialize } from "cookie";

const COOKIE_NAME = "web_access";

export async function POST() {
  // Clear the authentication cookie
  const cookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  const res = NextResponse.json({
    ok: true,
    message: "Logged out successfully",
  });
  res.headers.append("Set-Cookie", cookie);
  return res;
}
