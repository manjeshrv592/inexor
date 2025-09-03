import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // You can add a secret token for security
    const secret = request.nextUrl.searchParams.get("secret");

    // Optional: Verify the secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the homepage
    revalidatePath("/");

    return NextResponse.json({
      message: "Homepage revalidated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
