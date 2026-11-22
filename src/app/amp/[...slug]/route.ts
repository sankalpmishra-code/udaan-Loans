import { NextResponse } from "next/server";
import { getAmpHtmlForSlug } from "@/lib/amp/ampRouter";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

export async function GET(
  request: Request,
  props: { params: Promise<{ slug?: string[] }> | { slug?: string[] } }
) {
  try {
    const params = await props.params;
    const slugArray = params?.slug || [];
    const slugPath = slugArray.join("/");

    const html = getAmpHtmlForSlug(slugPath);

    if (html) {
      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        },
      });
    }

    // Fallback: If no dedicated AMP page for this specific slug, redirect gracefully to canonical URL
    const canonicalUrl = `${siteConfig.url.replace(/\/$/, "")}/${slugPath}`;
    return NextResponse.redirect(canonicalUrl, 307);
  } catch (error) {
    console.error("Error generating AMP route:", error);
    return new NextResponse("Internal Server Error generating AMP page", { status: 500 });
  }
}
