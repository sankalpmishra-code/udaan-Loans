import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { universities } from "@/data/universities";
import { destinationsList } from "@/data/destinations";
import { lendersList } from "@/data/lenders";

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
      path: "/tax-calculator",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/loans",
      priority: priorities.loans,
      changeFrequency: changeFrequencies.loans,
    },
    {
      path: "/loans/without-collateral",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/destinations",
      priority: priorities.destinations,
      changeFrequency: changeFrequencies.destinations,
    },
    {
      path: "/universities",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/lenders",
      priority: priorities.lenders,
      changeFrequency: changeFrequencies.lenders,
    },
    {
      path: "/compare-lenders",
      priority: 0.9,
      changeFrequency: "weekly" as const,
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
      path: "/match",
      priority: 0.95,
      changeFrequency: "daily" as const,
    },
    {
      path: "/about",
      priority: priorities.about,
      changeFrequency: changeFrequencies.about,
    },
    {
      path: "/privacy",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/terms",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
  ];

  // Add all country-specific study abroad loan landing pages
  destinationsList.forEach((d) => {
    routes.push({
      path: `/destinations/${d.id}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    });
  });

  // Add all dedicated lender scheme landing pages
  lendersList.forEach((l) => {
    routes.push({
      path: `/lenders/${l.slug}`,
      priority: 0.9,
      changeFrequency: "weekly" as const,
    });
  });

  // Add all partner university and pathway college dynamic landing pages
  universities.forEach((u) => {
    routes.push({
      path: `/universities/${u.country}/${u.slug}`,
      priority: 0.85,
      changeFrequency: "weekly" as const,
    });
  });

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

