import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

/**
 * Next.js Dynamic XML Sitemap Generator
 * Fully configured with priority weighting, change frequencies, and canonical URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const { priorities, changeFrequencies } = siteConfig.sitemapSettings;

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }> = [
    {
      path: "",
      priority: priorities.home,
      changeFrequency: changeFrequencies.home,
    },
    {
      path: "/calculator",
      priority: priorities.calculator,
      changeFrequency: changeFrequencies.calculator,
    },
    {
      path: "/loans",
      priority: priorities.loans,
      changeFrequency: changeFrequencies.loans,
    },
    {
      path: "/destinations",
      priority: priorities.destinations,
      changeFrequency: changeFrequencies.destinations,
    },
    {
      path: "/lenders",
      priority: priorities.lenders,
      changeFrequency: changeFrequencies.lenders,
    },
    {
      path: "/eligibility",
      priority: priorities.eligibility,
      changeFrequency: changeFrequencies.eligibility,
    },
    {
      path: "/process",
      priority: priorities.process,
      changeFrequency: changeFrequencies.process,
    },
    {
      path: "/apply",
      priority: priorities.apply,
      changeFrequency: changeFrequencies.apply,
    },
    {
      path: "/about",
      priority: priorities.about,
      changeFrequency: changeFrequencies.about,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
