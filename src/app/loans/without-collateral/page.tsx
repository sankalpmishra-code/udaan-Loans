import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import LenderLogo from "@/components/LenderLogo";
import EditorialByline from "@/components/EditorialByline";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Collateral-Free Education Loan for Study Abroad (2026) | Up to ₹75L | Udaan",
  description:
    "Get collateral-free study abroad loans up to ₹75 Lakhs. Compare HDFC Credila, Avanse, Auxilo, InCred, and Prodigy Finance with pre-visa sanction letters.",
  keywords: [
    "abroad education loan without collateral",
    "collateral free education loan for study abroad",
    "unsecured education loan up to 75 lakhs",
    "education loan for MS in USA without collateral",
    "education loan without property India",
    "study abroad loan without cosigner",
    "HDFC Credila collateral free loan",
    "Avanse unsecured education loan",
  ],
  alternates: {
    canonical: "/loans/without-collateral",
  },
  openGraph: {
    title: "Collateral-Free Education Loan for Study Abroad | Up to ₹75 Lakhs | Udaan",
    description:
      "Compare 8+ non-collateral study abroad loan lenders. Zero property or FD required, fast 3 to 5-day approvals.",
    url: `${siteConfig.url}/loans/without-collateral`,
    type: "website",
  },
};

export default function CollateralFreeLoansPage() {
  const unsecuredLenders = [
    {
      name: "HDFC Credila",
      slug: "hdfc-credila",
      maxUnsecured: "Up to ₹60 Lakhs",
      rate: "10.25% - 12.50%",
      margin: "0% (Full Cost)",
      speed: "3 - 5 Days",
      bestFor: "US & UK Master's with salaried parent co-borrower",
    },
    {
      name: "Avanse Financial Services",
      slug: "avanse",
      maxUnsecured: "Up to ₹75 Lakhs",
      rate: "10.50% - 13.00%",
      margin: "0%",
      speed: "3 - 5 Days",
      bestFor: "High-value STEM Master's & living expense coverage",
    },
    {
      name: "Auxilo Finserve",
      slug: "auxilo",
      maxUnsecured: "Up to ₹50 Lakhs",
      rate: "10.75% - 13.25%",
      margin: "0%",
      speed: "3 - 5 Days",
      bestFor: "Flexible non-standard co-applicant profiles",
    },
    {
      name: "InCred Finance",
      slug: "incred",
      maxUnsecured: "Up to ₹60 Lakhs",
      rate: "10.75% - 13.50%",
      margin: "0%",
      speed: "3 - 5 Days",
      bestFor: "100% virtual evaluation & fast pre-visa letter",
    },
    {
      name: "Poonawalla Fincorp",
      slug: "poonawalla-fincorp",
      maxUnsecured: "Up to ₹50 Lakhs",
      rate: "10.50% - 13.00%",
      margin: "0%",
      speed: "3 - 5 Days",
      bestFor: "Digital KYC & competitive interest corridor",
    },
    {
      name: "Tata Capital",
      slug: "tata-capital",
      maxUnsecured: "Up to ₹50 Lakhs",
      rate: "10.75% - 13.25%",
      margin: "0% - 10%",
      speed: "3 - 5 Days",
      bestFor: "Tata Group brand governance & flexible tenures",
    },
    {
      name: "Prodigy Finance",
      slug: "prodigy-finance",
      maxUnsecured: "Up to $100,000 (USD)",
      rate: "From 11.50% (USD)",
      margin: "0%",
      speed: "5 - 10 Days",
      bestFor: "Top 1,000 global programs with NO Indian co-signer",
    },
    {
      name: "MPOWER Financing",
      slug: "mpower",
      maxUnsecured: "Up to $100,000 (USD)",
      rate: "Fixed from 11.99%",
      margin: "0%",
      speed: "5 - 10 Days",
      bestFor: "US & Canada graduate degrees with NO collateral/cosigner",
    },
  ];

  const unsecuredFaqs = [
    {
      question: "How do lenders evaluate an education loan without collateral?",
      answer:
        "Non-collateral underwriting is primarily based on future earning potential and co-applicant financial strength. Lenders examine three factors: (1) Target foreign university ranking and course employability (STEM, MBA, and Healthcare receive prime preference); (2) Co-applicant credit history (CIBIL 685+) and verifiable monthly income; (3) Student academic consistency (GRE/GMAT scores, undergraduate GPA).",
    },
    {
      question: "What is the maximum collateral-free loan amount for studying abroad in India?",
      answer:
        "Specialized education NBFCs (like Avanse, HDFC Credila, and InCred) offer unsecured education loans up to ₹60 to ₹75 Lakhs. International USD lenders (Prodigy Finance and MPOWER) offer up to $100,000 USD (approx. ₹83 Lakhs) completely collateral-free.",
    },
    {
      question: "Who can be a co-applicant for an unsecured education loan?",
      answer:
        "Primary co-applicants include parents, legal guardians, spouses, or siblings with steady, verifiable income (salaried or self-employed with filed ITRs). Certain NBFCs like Auxilo and Avanse also consider extended family members (uncles, aunts) as secondary co-borrowers.",
    },
    {
      question: "Do unsecured loans cover 100% of study expenses including living costs?",
      answer:
        "Yes. Unlike public sector banks that require a 10% to 15% margin money deposit from the borrower, premier education NBFCs offer 0% margin funding, financing 100% of tuition fees, health insurance, university accommodation, books, and international flight tickets.",
    },
    {
      question: "Are interest rates on unsecured education loans tax-deductible under Section 80E?",
      answer:
        "Yes, provided the loan is sanctioned by an RBI-recognized Indian financial institution or bank (such as HDFC Credila, Avanse, Auxilo, or Tata Capital). Loans from foreign-domiciled lenders (like Prodigy Finance or MPOWER) do not qualify for Section 80E Indian income tax deductions.",
    },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Collateral-Free Overseas Education Loans",
    description: "Unsecured study abroad loans up to ₹75 Lakhs without physical property or fixed deposit collateral, designed for Indian students pursuing international Master's, MBA, and STEM degrees.",
    feesAndCommissionsSpecification: "100% Free Consultation via Udaan Edu Loans",
    interestRate: "10.25% - 13.50%",
    annualPercentageRate: "10.25% - 13.50%",
    provider: {
      "@type": "FinancialService",
      name: siteConfig.name,
      url: `${siteConfig.url}/loans/without-collateral`,
    },
  };

  return (
    <>
      <JsonLd data={productSchema} />

      <Breadcrumbs
        items={[
          { name: "Loan Options", url: "/loans" },
          { name: "Collateral-Free Loans", url: "/loans/without-collateral" },
        ]}
      />

      <section className="hero" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <span className="badge" style={{ marginBottom: "8px" }}>
              High-Value Unsecured Funding
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--ink)", margin: "0 0 16px" }}>
              Collateral-Free Education Loans for Study Abroad (2026)
            </h1>
            <p className="lead" style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
              Do not let lack of physical property or fixed deposits stop your global education.
              Udaan Edu Loans connects you with 8+ specialized NBFCs and international fintech lenders offering
              <strong> up to ₹75 Lakhs (or $100,000 USD)</strong> in collateral-free funding with fast pre-visa sanction letters.
            </p>

            <EditorialByline
              reviewerName="Udaan Credit Underwriting Advisory Panel"
              reviewerTitle="Specialized Overseas Education Credit Risk Experts"
              lastUpdated="October 2026"
            />

            {/* Value Props Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                margin: "32px 0",
              }}
            >
              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>🚫🏠</div>
                <strong style={{ display: "block", color: "var(--ink)" }}>Zero Property Collateral</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "var(--muted)" }}>
                  No mortgage, title search, or legal valuation delays.
                </p>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>💰</div>
                <strong style={{ display: "block", color: "var(--ink)" }}>Up to ₹75 Lakhs Sanction</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "var(--muted)" }}>
                  Full tuition + living costs + health insurance covered.
                </p>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>⚡</div>
                <strong style={{ display: "block", color: "var(--ink)" }}>3 to 5-Day Fast Turnaround</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "var(--muted)" }}>
                  Pre-visa sanction letters ready for foreign embassy proof.
                </p>
              </div>

              <div className="card" style={{ padding: "18px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>🎯</div>
                <strong style={{ display: "block", color: "var(--ink)" }}>0% Margin Money Options</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "var(--muted)" }}>
                  100% of attendance cost funded without upfront personal cash.
                </p>
              </div>
            </div>

            {/* Unsecured Lenders Comparison Table */}
            <div style={{ margin: "40px 0" }}>
              <h2>Compare Top Unsecured Education Loan Lenders</h2>
              <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem" }}>
                Side-by-side comparison of indicative rates, limits, and turnaround times across leading non-collateral lenders:
              </p>

              <div className="data-table-wrapper" style={{ marginTop: "18px" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Lender</th>
                      <th>Max Unsecured</th>
                      <th>Indicative Rate (p.a.)</th>
                      <th>Margin</th>
                      <th>Sanction Speed</th>
                      <th>Best Suited For</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unsecuredLenders.map((l) => (
                      <tr key={l.slug}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "150px" }}>
                            <LenderLogo name={l.name} height={24} />
                            <Link href={`/lenders/${l.slug}`} style={{ fontWeight: 700, color: "var(--brand)" }}>
                              {l.name}
                            </Link>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{l.maxUnsecured}</td>
                        <td className="text-green" style={{ fontWeight: 700 }}>{l.rate}</td>
                        <td>{l.margin}</td>
                        <td>{l.speed}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>{l.bestFor}</td>
                        <td>
                          <Link
                            href={`/match?lender=${encodeURIComponent(l.slug)}`}
                            className="btn btn-outline"
                            style={{ padding: "4px 10px", fontSize: "0.78rem", whiteSpace: "nowrap" }}
                          >
                            Check Match →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Eligibility Benchmarks */}
            <div className="card" style={{ background: "var(--soft)", padding: "28px", margin: "40px 0" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--ink)", marginBottom: "12px" }}>
                Key Eligibility Benchmarks for Collateral-Free Sanctions
              </h3>
              <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "10px", color: "var(--ink)" }}>
                <li>
                  <strong>Target Course Tier:</strong> STEM degrees (Computer Science, Data Science, Engineering), MBA, Management, and Healthcare courses receive prime approval rates.
                </li>
                <li>
                  <strong>University Standing:</strong> Institutions in the global top 500 (or national top 100 in the USA, UK, Canada, Australia, and Germany) qualify for highest loan amounts.
                </li>
                <li>
                  <strong>Co-Applicant Financial Profile:</strong> A salaried co-borrower (parent, spouse, sibling) with monthly net salary of ₹35,000+ and consistent 2-year ITR filing.
                </li>
                <li>
                  <strong>Credit Score (CIBIL):</strong> Minimum co-applicant CIBIL score of 685+ (720+ unlocks lowest interest rate tiers).
                </li>
              </ul>
            </div>

            {/* Interactive Matching CTA */}
            <div
              className="card"
              style={{
                background: "var(--brand)",
                color: "#ffffff",
                padding: "36px 30px",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                margin: "44px 0",
              }}
            >
              <h2 style={{ fontSize: "1.6rem", color: "#ffffff", marginBottom: "8px" }}>
                Find Your Best Collateral-Free Loan Option in 60 Seconds
              </h2>
              <p style={{ color: "#e0f2fe", maxWidth: "600px", margin: "0 auto 24px", fontSize: "0.98rem", lineHeight: "1.5" }}>
                Input your destination, degree, and co-applicant details. Our engine cross-matches your profile against verified lender guidelines with zero CIBIL score impact.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/match" className="btn btn-accent" style={{ padding: "13px 26px", fontSize: "1.05rem", fontWeight: 700 }}>
                  Launch 60-Second Matcher →
                </Link>
                <Link
                  href="/calculator"
                  className="btn btn-outline"
                  style={{ padding: "13px 26px", color: "#ffffff", borderColor: "#ffffff" }}
                >
                  Calculate Monthly EMI
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div style={{ marginTop: "40px" }}>
              <FAQSection
                faqs={unsecuredFaqs}
                title="Frequently Asked Questions: Collateral-Free Education Loans"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
