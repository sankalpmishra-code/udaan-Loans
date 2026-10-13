import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

/**
 * Next.js Dynamic robots.txt Generator
 * Optimized for standard search engines (Google, Bing) and AI search crawlers (Perplexity, GPTBot).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  const { disallowedPaths, crawlDelay } = siteConfig.robotsSettings;

  return {
    rules: [
      // Standard search engine crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
        crawlDelay: crawlDelay,
      },
      // Googlebot specific directives
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      // Bingbot specific directives
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
      // Generative AI / Answer Engine crawlers (GEO / AEO optimization)
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "cohere-ai",
        ],
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
