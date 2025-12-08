import { NextResponse } from "next/server";

const COOKIE_NAME = "web_access";

export async function POST() {
  
  // Create response first
  const response = new NextResponse(JSON.stringify({
    ok: true,
    message: "Logged out successfully",
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Clear the authentication cookie using NextResponse.cookies.set method
  // This ensures proper cookie clearing that matches how we set it during login
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax", // Match verify-otp route setting
    maxAge: 0, // Expire immediately
    expires: new Date(0), // Also set expires for better compatibility
    secure: false // Match verify-otp route setting
  });

  // Also try the delete method for additional safety
  response.cookies.delete({
    name: COOKIE_NAME,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  return response;
}
