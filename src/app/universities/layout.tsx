import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Global Universities Education Loan Directory | UK, US, Europe, Canada & Australia",
  description:
    "Explore 2,500+ accredited international universities and pathway colleges. Check lender prime-list status, collateral-free loan limits up to ₹75 Lakhs, and living cost requirements.",
  keywords: [
    "education loan for foreign universities",
    "SBI prime list universities abroad",
    "HDFC Credila approved university list",
    "unsecured loan for Russell Group universities",
    "study in UK university loan limit",
    "US university education loan interest rates",
  ],
  alternates: {
    canonical: "/universities",
  },
  openGraph: {
    title: "Global Universities Education Loan Directory | Udaan Edu Loans",
    description:
      "Explore 2,500+ overseas universities with verified bank prime-tier discounts and collateral-free loan limits.",
    url: `${siteConfig.url}/universities`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Universities Education Loan Directory | Udaan Edu Loans",
    description:
      "Check education loan policies and prime-list status across global universities.",
  },
};

export default function UniversitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
