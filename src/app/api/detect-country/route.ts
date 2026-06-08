import { NextRequest, NextResponse } from "next/server";
import geoip from "geoip-country";

// geoip-country reads a local binary database from the filesystem and needs the
// real request IP, so this must run on the Node runtime, per-request.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fallback country code used on any error / when detection fails.
const FALLBACK_COUNTRY = "US";

function getClientIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // The first entry is the original client IP.
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return null;
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (ip) {
      const geo = geoip.lookup(ip);
      if (geo?.country) {
        return NextResponse.json({ countryCode: geo.country });
      }
    }
  } catch (error) {
    console.error("Country detection failed:", error);
  }

  // No IP / no match / error → default to US (the user can change it).
  return NextResponse.json({ countryCode: FALLBACK_COUNTRY });
}
