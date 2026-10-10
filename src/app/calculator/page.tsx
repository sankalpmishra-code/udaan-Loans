import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import FAQSection from "@/components/FAQSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { calculatorFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Education Loan EMI Calculator with Moratorium Period (Study Abroad)",
  description:
    "Calculate your monthly EMI for overseas education loans with study moratorium period, simple interest accrual, total interest payable, and full year-by-year amortization schedule.",
  keywords: [
    "education loan EMI calculator study abroad",
    "study abroad loan calculator with moratorium",
    "SBI education loan EMI calculator",
    "HDFC Credila EMI calculator",
    "education loan amortization schedule India",
    "moratorium simple interest calculation",
  ],
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "EMI Calculator", url: "/calculator" }]} />

      <section className="hero" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ marginBottom: "36px" }}>
            <span className="badge">Financial Planning Tool</span>
            <h1>Study Abroad Education Loan EMI Calculator</h1>
            <p className="lead">
              Accurately project your post-graduation monthly repayments. Unlike standard personal loan calculators,
              Udaan&apos;s calculator factors in the <strong>course moratorium period</strong> and simple interest capitalization.
            </p>
          </div>

          <Calculator
            initialAmount={4000000}
            initialRate={9.5}
            initialTenureYears={10}
            initialMoratoriumMonths={24}
            showSchedule={true}
          />
        </div>
      </section>

      {/* Educational Guide for AEO & GEO */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Understanding The Math</span>
            <h2>How Is Abroad Education Loan EMI Calculated?</h2>
            <p className="lead">
              Overseas student loans differ fundamentally from home or car loans because repayments do not begin
              immediately while you are studying.
            </p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3>The 2-Phase Repayment Mechanism</h3>
              <p>
                <strong>Phase 1: Moratorium Period (Study + Grace)</strong><br />
                Spans your full course duration (e.g., 24 months for an MS or MBA) plus an additional 6 to 12 months grace period.
                During this phase, banks charge <em>simple interest</em> on the disbursed amount. You are generally not required to pay full EMIs.
              </p>
              <p>
                <strong>Phase 2: Amortization & Repayment Period</strong><br />
                Once employment commences or the grace period concludes, the accumulated simple interest is added to your original principal to form the adjusted principal.
                Full monthly EMIs begin for a chosen tenure of 5 to 15 years.
              </p>
            </div>

            <div className="card">
              <h3>The Standard Amortization Formula</h3>
              <div style={{ background: "var(--soft)", padding: "16px", borderRadius: "8px", fontFamily: "monospace", margin: "14px 0", fontSize: "0.95rem" }}>
                EMI = [P × r × (1 + r)ⁿ] ÷ [(1 + r)ⁿ - 1]
              </div>
              <ul style={{ fontSize: "0.92rem", lineHeight: "1.7" }}>
                <li><strong>P</strong> = Adjusted Principal (Original Loan + Simple Interest during study)</li>
                <li><strong>r</strong> = Monthly interest rate (Annual rate ÷ 1200)</li>
                <li><strong>n</strong> = Number of monthly installments (Tenure in years × 12)</li>
              </ul>
              <p style={{ marginTop: "12px", fontSize: "0.88rem", color: "var(--muted)" }}>
                Tip: Paying partial simple interest during your course prevents interest capitalization and saves lakhs in overall interest.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "40px" }} className="card">
            <h3>4 Smart Strategies to Lower Your Education Loan EMI</h3>
            <div className="grid-2" style={{ marginTop: "16px" }}>
              <div>
                <h4>1. Opt for Collateralized Loans</h4>
                <p style={{ fontSize: "0.92rem" }}>
                  Securing your loan against residential property, commercial land, or fixed deposits with public banks
                  (SBI, Bank of Baroda) drops your interest rate from 11.5% to as low as 7.75%.
                </p>
              </div>
              <div>
                <h4>2. Service Simple Interest Monthly</h4>
                <p style={{ fontSize: "0.92rem" }}>
                  Paying the simple interest monthly during the moratorium prevents it from compounding onto your principal upon graduation.
                </p>
              </div>
              <div>
                <h4>3. Maximize Section 80E Tax Rebates</h4>
                <p style={{ fontSize: "0.92rem" }}>
                  Claim an unlimited deduction on all education loan interest under Section 80E of the Indian Income Tax Act for up to 8 financial years.
                </p>
              </div>
              <div>
                <h4>4. Choose Longer Tenures with Zero-Penalty Prepayment</h4>
                <p style={{ fontSize: "0.92rem" }}>
                  Lock in a 10 to 15-year tenure to keep mandatory monthly EMIs comfortable, then make lump-sum prepayments penalty-free once your overseas salary starts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Specific FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Education Loan EMI & Moratorium"
        subtitle="Detailed explanations regarding interest capitalization, repayment schedules, and pre-closures."
        faqs={calculatorFaqs}
        id="calc-faq"
      />

      {/* Bottom CTA */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Ready to Lock in the Lowest Interest Rate?</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Don&apos;t settle for high default rates. Our advisors negotiate with 30+ lenders to secure the lowest possible EMI for your profile.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Get Personalized Bank Quotes →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
