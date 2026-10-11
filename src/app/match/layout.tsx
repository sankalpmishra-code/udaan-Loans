import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Two-Stage Bank & Lender Matcher | Check Eligibility Across 30+ Lenders",
  description:
    "Match your study abroad education loan profile against verified underwriting rules from 30+ Indian public banks, private banks, and NBFCs. Instant rule breakdown with zero CIBIL score impact.",
  keywords: [
    "education loan bank matcher",
    "study abroad loan eligibility checker",
    "compare SBI vs HDFC Credila loan",
    "unsecured education loan matcher India",
    "check education loan eligibility online",
    "instant education loan sanction estimate",
  ],
  alternates: {
    canonical: "/match",
  },
  openGraph: {
    title: "Two-Stage Bank & Lender Matcher | Udaan Edu Loans",
    description:
      "Check your overseas education loan eligibility across 30+ public banks, private commercial banks, and NBFCs with zero credit score impact.",
    url: `${siteConfig.url}/match`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Two-Stage Bank & Lender Matcher | Udaan Edu Loans",
    description:
      "Check your overseas education loan eligibility across 30+ lenders with zero credit score impact.",
  },
};

export default function MatcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const matcherSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Udaan Edu Loans Two-Stage Bank Matcher",
    url: `${siteConfig.url}/match`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Digital rules-based engine matching student academic and financial profiles against verified bank underwriting criteria for overseas education loans.",
    provider: {
      "@type": "FinancialService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={matcherSchema} />
      {children}
    </>
  );
}
