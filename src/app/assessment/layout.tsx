import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Preliminary Funding Assessment & Loan Sanction Feasibility Certificate",
  description:
    "Generate and verify your Preliminary Overseas Education Loan Funding Assessment. Digital verification compliant with RBI Digital Lending directions.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/assessment",
  },
  openGraph: {
    title: "Preliminary Funding Assessment | Udaan Edu Loans",
    description:
      "Indicative overseas education loan eligibility and sanction feasibility summary.",
    url: `${siteConfig.url}/assessment`,
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
