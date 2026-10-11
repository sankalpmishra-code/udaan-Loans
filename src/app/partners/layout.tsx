import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Partner With Us: Overseas Education Consultants & Study Abroad Advisors",
  description:
    "Partner with Udaan Edu Loans to provide your study abroad students with 100% free multi-lender education loan facilitation, fast-track sanctions in 3-7 days, and dedicated relationship managers.",
  keywords: [
    "study abroad consultant partnership",
    "education loan partner program India",
    "study abroad advisor loan tie up",
    "student visa financial clearance partner",
  ],
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Partner With Us | Study Abroad Consultant Program | Udaan Edu Loans",
    description:
      "Accelerate visa clearance for your students through 30+ partner banks and specialized education NBFCs.",
    url: `${siteConfig.url}/partners`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Udaan Edu Loans | Study Abroad Consultant Program",
    description:
      "Fast-track education loan sanctions for your overseas study applicants.",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
