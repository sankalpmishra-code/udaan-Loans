import type { Metadata } from "next";
import Link from "next/link";
import TaxCalculator from "@/components/TaxCalculator";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { taxFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Section 80E Tax Deduction Calculator (Old vs New) | Udaan",
  description:
    "Calculate income tax savings under Section 80E on study abroad loan interest. Compare Old vs New Tax Regime and effective post-tax borrowing costs.",
  keywords: [
    "section 80E calculator",
    "education loan tax deduction calculator",
    "section 80E old vs new regime",
    "study abroad loan tax savings",
    "income tax benefit on education loan India",
    "Section 80E interest limit 8 years",
    "SBI education loan tax rebate",
  ],
  alternates: {
    canonical: "/tax-calculator",
  },
  openGraph: {
    title: "Section 80E Education Loan Tax Savings Calculator | Udaan",
    description:
      "Calculate 100% tax deductions on education loan interest under Section 80E for up to 8 years.",
    url: `${siteConfig.url}/tax-calculator`,
    type: "website",
  },
};

export default function TaxCalculatorPage() {
  const taxCalcSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Section 80E Education Loan Tax Deduction Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    url: `${siteConfig.url}/tax-calculator`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Calculates Indian Income Tax deductions on education loan interest paid under Section 80E across tax slabs and regimes.",
    provider: {
      "@type": "FinancialService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={taxCalcSchema} />
      <Breadcrumbs items={[{ name: "Section 80E Tax Calculator", url: "/tax-calculator" }]} />

      <section className="hero" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ marginBottom: "36px" }}>
            <span className="badge">Statutory Tax Planning</span>
            <h1>Section 80E Education Loan Tax Savings Calculator</h1>
            <p className="lead" style={{ maxWidth: "760px", margin: "0 auto" }}>
              Under Section 80E of the Indian Income Tax Act, 1961, 100% of the interest paid on an education loan for higher studies is deductible from your gross total income for up to 8 years. Discover your exact tax savings and compare Old vs. New Tax Regime outcomes.
            </p>
          </div>

          <TaxCalculator
            initialLoanAmount={4500000}
            initialInterestRate={10.25}
            initialTenureYears={10}
          />
        </div>
      </section>

      {/* Deep Educational Guide for SEO, GEO & AEO */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Regulatory Insights</span>
            <h2>How Section 80E Reduces the Real Cost of Study Abroad Loans</h2>
            <p className="lead">
              A comprehensive breakdown of the statutory provisions, eligibility rules, and regime trade-offs governing education loan interest deductions in India.
            </p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3>1. The Core Provisions of Section 80E</h3>
              <p>
                Section 80E allows an individual assessee to deduct the entire amount of interest paid during the previous financial year on a loan borrowed for pursuing higher education.
              </p>
              <ul style={{ fontSize: "0.92rem", lineHeight: "1.7", marginTop: "10px" }}>
                <li><strong>No Monetary Upper Limit:</strong> Unlike Section 80C which caps total deductions at ₹1.5 Lakhs, Section 80E has no ceiling. If you pay ₹4.5 Lakhs in interest in a financial year, the entire ₹4.5 Lakhs is deductible.</li>
                <li><strong>Only Interest, Not Principal:</strong> Principal repayments cannot be claimed under Section 80E or 80C for foreign higher education.</li>
                <li><strong>8 Consecutive Years Maximum:</strong> The deduction is available for up to 8 consecutive financial years starting from the year in which interest repayment begins, or until interest is fully cleared.</li>
              </ul>
            </div>

            <div className="card">
              <h3>2. Old Tax Regime vs. New Tax Regime (Section 115BAC)</h3>
              <p>
                The Finance Act introduced a simplified New Tax Regime with lower slab rates but eliminated most exemptions and deductions under Chapter VI-A.
              </p>
              <div style={{ background: "var(--soft)", padding: "14px", borderRadius: "8px", margin: "12px 0", fontSize: "0.9rem" }}>
                <strong>Crucial Difference:</strong>
                <ul style={{ marginTop: "6px", paddingLeft: "18px" }}>
                  <li><strong>Old Regime:</strong> Section 80E deduction is fully allowed. For high-bracket earners paying ₹2L–₹5L annual interest, the Old Regime often saves significantly more overall tax.</li>
                  <li><strong>New Regime:</strong> Section 80E is explicitly disallowed. Tax is paid at the new standard slab rates.</li>
                </ul>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                Taxpayers can evaluate both regimes every year at the time of filing ITR-1 / ITR-2 (for non-business salaried income) and select the regime yielding the lowest net tax liability.
              </p>
            </div>
          </div>

          <div className="card" style={{ marginTop: "32px" }}>
            <h3>Who Can Claim Section 80E & Qualifying Lender Criteria</h3>
            <div className="grid-3" style={{ marginTop: "16px" }}>
              <div>
                <h4>Eligible Assessees</h4>
                <p style={{ fontSize: "0.9rem" }}>
                  The deduction can be claimed by an individual for an education loan taken for:
                </p>
                <ul style={{ fontSize: "0.86rem", lineHeight: "1.6" }}>
                  <li>The individual themselves (student)</li>
                  <li>Spouse of the individual</li>
                  <li>Children of the individual</li>
                  <li>Student for whom the individual is a legal guardian</li>
                </ul>
              </div>

              <div>
                <h4>Qualifying Lenders</h4>
                <p style={{ fontSize: "0.9rem" }}>
                  To be eligible, the loan must be sanctioned by:
                </p>
                <ul style={{ fontSize: "0.86rem", lineHeight: "1.6" }}>
                  <li>An Indian banking company governed by the Banking Regulation Act (e.g., SBI, BOB, HDFC, ICICI, Axis)</li>
                  <li>A financial institution notified by the Central Government</li>
                  <li>An approved charitable institution</li>
                  <li><em>Loans from relatives, friends, or unapproved foreign lenders do NOT qualify.</em></li>
                </ul>
              </div>

              <div>
                <h4>Eligible Courses</h4>
                <p style={{ fontSize: "0.9rem" }}>
                  Higher education is broadly defined under Section 80E:
                </p>
                <ul style={{ fontSize: "0.86rem", lineHeight: "1.6" }}>
                  <li>Any course of study pursued after Senior Secondary Examination (Class 12) or equivalent</li>
                  <li>Includes undergraduate bachelor&apos;s, post-graduate master&apos;s, MBA, doctoral, and professional diploma degrees</li>
                  <li>Both Indian and overseas recognized universities qualify</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Section 80E Education Loan Deductions"
        subtitle="Authoritative answers on tax rules, regimes, certification, and claiming procedures."
        faqs={taxFaqs}
        id="tax-faq"
      />

      {/* Call to Action */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Find 80E-Eligible Institutional Lenders</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "620px", margin: "0 auto 20px" }}>
              All 30+ banks and RBI-recognized NBFCs partnered with Udaan Edu Loans issue formal Section 80E interest certificates to ensure seamless income tax deduction claims.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/match" className="btn btn-accent">
                Match with Eligible Banks →
              </Link>
              <Link href="/calculator" className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>
                Calculate Regular EMI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
