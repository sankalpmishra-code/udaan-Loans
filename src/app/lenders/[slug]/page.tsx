import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { lendersList, getLenderBySlug } from "@/data/lenders";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import LenderLogo from "@/components/LenderLogo";
import EditorialByline from "@/components/EditorialByline";
import { siteConfig } from "@/data/siteConfig";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return lendersList.map((lender) => ({
    slug: lender.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lender = getLenderBySlug(slug);

  if (!lender) {
    return {
      title: "Lender Scheme Guide | Udaan Edu Loans",
    };
  }

  const cleanTitle = `${lender.shortName || lender.name} Education Loan for Study Abroad (2026) | Udaan`;
  const cleanDesc = `Compare ${lender.name} study abroad loan interest rates (${lender.interestRate}), collateral-free limits (${lender.maxUnsecured}), and pre-visa sanction guidelines.`;

  return {
    title: cleanTitle,
    description: cleanDesc,
    keywords: [
      `${lender.name} education loan study abroad`,
      `${lender.shortName || lender.name} abroad education loan interest rate`,
      `${lender.shortName || lender.name} education loan eligibility`,
      `${lender.shortName || lender.name} pre visa sanction letter`,
      `${lender.shortName || lender.name} collateral free education loan`,
      `${lender.name} study abroad loan processing time`,
    ],
    alternates: {
      canonical: `/lenders/${lender.slug}`,
    },
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      url: `${siteConfig.url}/lenders/${lender.slug}`,
      type: "website",
    },
  };
}

export default async function LenderPage({ params }: PageProps) {
  const { slug } = await params;
  const lender = getLenderBySlug(slug);

  if (!lender) {
    notFound();
  }

  const isPublic = lender.category === "Public Sector Bank";
  const isGlobalUSD = lender.slug === "prodigy-finance" || lender.slug === "mpower";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${lender.name} Overseas Education Loan`,
    description: `Higher education financing for overseas studies offered by ${lender.name} with interest rates from ${lender.interestRate} and loan limits up to ${lender.maxSecured}.`,
    feesAndCommissionsSpecification: "100% Free Consultation via Udaan Edu Loans",
    interestRate: lender.interestRate,
    annualPercentageRate: lender.interestRate,
    provider: {
      "@type": "FinancialService",
      name: lender.name,
      url: `${siteConfig.url}/lenders/${lender.slug}`,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lenders",
        item: `${siteConfig.url}/lenders`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: lender.shortName || lender.name,
        item: `${siteConfig.url}/lenders/${lender.slug}`,
      },
    ],
  };

  const lenderFaqs = [
    {
      question: `What is the current interest rate for ${lender.name} education loans abroad?`,
      answer: `${lender.name} currently offers study abroad loans in the indicative corridor of ${lender.interestRate}. Final rates are determined based on your target university ranking, academic credentials, credit score (CIBIL 685+), and whether tangible collateral is provided.`,
    },
    {
      question: `Does ${lender.name} offer collateral-free loans for study abroad?`,
      answer: isPublic
        ? `${lender.name} primarily specializes in secured loans up to ${lender.maxSecured} against property or fixed deposits. For premier global universities, unsecured limits of ${lender.maxUnsecured} may be sanctioned based on parent income.`
        : `${lender.name} offers substantial collateral-free education loans ${lender.maxUnsecured} based on the student's admission tier and co-applicant financial stability.`,
    },
    {
      question: `Does ${lender.name} issue pre-visa sanction letters for embassy financial proof?`,
      answer: `Yes. An official ${lender.name} loan sanction letter is fully recognized for foreign student visa financial verification across the US Embassy (I-20), UKVI (CAS 28-day rule), German Consulates, and IRCC Canada.`,
    },
    {
      question: `How fast can I get a loan sanction from ${lender.name} through Udaan?`,
      answer: `Typical processing time is ${lender.processingTime}. Udaan's dedicated banking relationship officers ensure your documents are pre-underwritten, significantly accelerating the standard branch turnaround.`,
    },
  ];

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Breadcrumbs
        items={[
          { name: "Lenders Directory", url: "/lenders" },
          { name: lender.shortName || lender.name, url: `/lenders/${lender.slug}` },
        ]}
      />

      <section className="hero" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
              <LenderLogo name={lender.name} height={44} variant="tile" />
              <div>
                <span className="badge" style={{ marginBottom: "6px" }}>
                  {lender.category}
                </span>
                <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", margin: 0, color: "var(--ink)" }}>
                  {lender.name}
                </h1>
              </div>
            </div>

            <p className="lead" style={{ fontSize: "1.08rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
              Official guide to financing your overseas university education with {lender.name}.
              Compare indicative interest rates, margin money rules, collateral policies, and pre-visa sanction timelines.
            </p>

            <EditorialByline
              reviewerName="Udaan Institutional Credit Advisory Desk"
              reviewerTitle="Specialized Bank Underwriting & Policy Analysts"
              lastUpdated="October 2026"
            />

            {/* Quick Specs Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                margin: "32px 0",
              }}
            >
              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Interest Rate Corridor
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--success)", marginTop: "4px" }}>
                  {lender.interestRate}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                  {isGlobalUSD ? "Variable USD Benchmark" : "Floating (EBLR/Spread)"}
                </div>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Collateral-Free Limit
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand)", marginTop: "4px" }}>
                  {lender.maxUnsecured}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                  Based on academic profile &amp; co-signer
                </div>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Maximum Secured Limit
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--ink)", marginTop: "4px" }}>
                  {lender.maxSecured}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                  Against Property or Fixed Deposits
                </div>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Processing Turnaround
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-hover)", marginTop: "4px" }}>
                  {lender.processingTime}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                  Fast digital sanction via Udaan
                </div>
              </div>
            </div>

            {/* Highlights Box */}
            <div
              className="card"
              style={{
                background: "var(--soft)",
                border: "1px solid var(--line)",
                padding: "24px 26px",
                marginBottom: "36px",
              }}
            >
              <h3 style={{ fontSize: "1.15rem", marginBottom: "12px", color: "var(--ink)" }}>
                Key Highlights of {lender.shortName || lender.name} Education Loans
              </h3>
              <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px", color: "var(--ink)" }}>
                {lender.highlights.map((h, i) => (
                  <li key={i} style={{ fontSize: "0.92rem" }}>
                    <strong>{h}</strong>
                  </li>
                ))}
                <li style={{ fontSize: "0.92rem" }}>
                  Margin money requirement: <strong>{lender.marginMoney}</strong> (scholarships &amp; assistantships offset margin contribution).
                </li>
                <li style={{ fontSize: "0.92rem" }}>
                  Embassy-compliant pre-visa sanction letter issued prior to fee payment for smooth visa processing.
                </li>
              </ul>
            </div>

            {/* CTA Box */}
            <div
              className="card"
              style={{
                background: "var(--brand)",
                color: "#ffffff",
                padding: "32px 28px",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              <h3 style={{ fontSize: "1.45rem", marginBottom: "8px", color: "#ffffff" }}>
                Check Your Eligibility for {lender.shortName || lender.name}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#e0f2fe", maxWidth: "600px", margin: "0 auto 20px", lineHeight: "1.5" }}>
                Find out your exact interest rate tier, maximum loan limit, and document checklist with zero impact on your CIBIL score.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href={`/match?lender=${encodeURIComponent(lender.slug)}`}
                  className="btn btn-accent"
                  style={{ padding: "12px 24px", fontWeight: 700 }}
                >
                  Match with {lender.shortName || lender.name} →
                </Link>
                <Link
                  href="/apply"
                  className="btn btn-outline"
                  style={{ padding: "12px 24px", color: "#ffffff", borderColor: "#ffffff" }}
                >
                  Free Profile Evaluation
                </Link>
              </div>
            </div>

            {/* Application Roadmap */}
            <div style={{ marginBottom: "48px" }}>
              <h2>How to Secure a Loan from {lender.shortName || lender.name} Through Udaan</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
                <div className="card" style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 700, color: "var(--brand)", marginBottom: "4px" }}>
                    1. Profile &amp; University Pre-Check
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                    We verify whether your university falls under {lender.shortName || lender.name}&apos;s preferred list for prime-tier interest rate discounts and collateral waivers.
                  </p>
                </div>
                <div className="card" style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 700, color: "var(--brand)", marginBottom: "4px" }}>
                    2. Digital Documentation Verification
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                    Upload academic transcripts, standardized test scores (GRE/GMAT/IELTS), admit letters, and co-applicant ITRs for expedited digital review.
                  </p>
                </div>
                <div className="card" style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 700, color: "var(--brand)", marginBottom: "4px" }}>
                    3. Sanction Letter Issuance
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                    Receive your pre-visa loan sanction letter within {lender.processingTime}, ready for submission to foreign university portals or embassy visa interviews.
                  </p>
                </div>
                <div className="card" style={{ padding: "18px" }}>
                  <div style={{ fontWeight: 700, color: "var(--brand)", marginBottom: "4px" }}>
                    4. Campus Disbursement &amp; Living Expense Wire
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                    Tuition fees are remitted directly to the foreign university campus via international SWIFT wire transfer, with living expenses loaded onto student forex cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Lender FAQs */}
            <div style={{ marginTop: "40px" }}>
              <FAQSection
                faqs={lenderFaqs}
                title={`Frequently Asked Questions About ${lender.shortName || lender.name}`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
