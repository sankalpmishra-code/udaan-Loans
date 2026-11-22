import { NextResponse } from "next/server";
import { generateHomeAmpPage } from "@/lib/amp/pages/homeAmp";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const html = generateHomeAmpPage();

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating /amp homepage:", error);
    return new NextResponse("Internal Server Error generating AMP page", { status: 500 });
  }
}
