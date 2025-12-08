import { NextResponse } from "next/server";

/**
 * Health Check API Endpoint
 * 
 * This endpoint is used to monitor the health and availability of the website.
 * It returns a simple JSON response with status, timestamp, and application info.
 * 
 * Use cases:
 * - Uptime monitoring services (UptimeRobot, Pingdom, etc.)
 * - Load balancer health checks
 * - CI/CD deployment verification
 * - Application monitoring dashboards
 */

export async function GET() {
  try {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Get uptime in seconds (process.uptime() returns uptime in seconds)
    const uptime = process.uptime();
    
    // Format uptime to human-readable format
    const uptimeFormatted = formatUptime(uptime);
    
    // Basic system info
    const healthInfo = {
      status: "ok",
      message: "Website is healthy and running",
      timestamp,
      uptime: {
        seconds: Math.floor(uptime),
        formatted: uptimeFormatted,
      },
      application: {
        name: "inexor",
        version: "0.1.0",
        environment: process.env.NODE_ENV || "development",
      },
      server: {
        nodeVersion: process.version,
        platform: process.platform,
      },
    };

    return NextResponse.json(healthInfo, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    // If there's an error, return unhealthy status
    console.error("Health check failed:", error);
    
    return NextResponse.json(
      {
        status: "error",
        message: "Website is experiencing issues",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    );
  }
}

/**
 * Helper function to format uptime in human-readable format
 */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}
