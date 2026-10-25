import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import LenderLogo from "@/components/LenderLogo";
import EditorialByline from "@/components/EditorialByline";
import { loansFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Secured vs Collateral-Free Study Abroad Loans (2026) | Udaan",
  description:
    "Compare secured and unsecured study abroad education loans in India. Rates from 7.5%, limits up to ₹1.5 Cr, and 100% tuition plus living cost coverage.",
  keywords: [
    "secured education loan study abroad",
    "collateral free education loan India",
    "unsecured study abroad loan up to 75 lakhs",
    "education loan margin money",
    "education loan expenses covered",
    "property collateral education loan",
  ],
  alternates: {
    canonical: "/loans",
  },
};

export default function LoansPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Loan Options", url: "/loans" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Complete Financing Spectrum</span>
            <h1>Study Abroad Education Loan Options</h1>
            <p className="lead">
              Every student&apos;s academic journey and family financial background is unique.
              We help you evaluate whether a <strong>Secured Loan</strong> or a <strong>Collateral-Free Loan</strong>
              delivers the optimal balance of interest cost, speed, and flexibility.
            </p>
          </div>

          <EditorialByline
            reviewerName="Udaan Overseas Education Loan Research Team"
            reviewerTitle="Accredited Student Lending Advisors"
            lastUpdated="October 2026"
          />

          <div className="grid-2">
            {/* Secured Loans Card */}
            <div className="card" style={{ borderTop: "4px solid var(--brand)", padding: "36px" }}>
              <div className="card-icon">🏛️</div>
              <h2>Secured Education Loans</h2>
              <p className="lead" style={{ fontSize: "1.05rem" }}>
                Backed by tangible assets such as residential property, commercial buildings, fixed deposits, or LIC policies.
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "16px 0 12px" }}>
                <LenderLogo name="SBI" height={26} />
                <LenderLogo name="Bank of Baroda" height={26} />
                <LenderLogo name="PNB" height={26} />
                <LenderLogo name="Union Bank" height={26} />
              </div>
              
              <ul style={{ margin: "20px 0", lineHeight: "1.8", fontSize: "0.95rem" }}>
                <li><strong>Lowest Interest Rates:</strong> 7.50% to 9.50% floating per annum.</li>
                <li><strong>Maximum Limit:</strong> Up to ₹1.5 Crore (or 100% of collateral valuation).</li>
                <li><strong>Tenure:</strong> Up to 15 years after course completion + grace period.</li>
                <li><strong>Accepted Collateral:</strong> Freehold residential apartments, independent houses, non-agricultural land plots, bank Fixed Deposits (FDs), Government bonds, and insurance surrender values.</li>
                <li><strong>Best For:</strong> Students aiming to minimize cumulative interest outgo with family property available.</li>
              </ul>

              <div style={{ marginTop: "24px" }}>
                <Link href="/apply" className="btn btn-primary full-width">
                  Check Secured Loan Eligibility
                </Link>
              </div>
            </div>

            {/* Collateral-Free Loans Card */}
            <div className="card" style={{ borderTop: "4px solid var(--accent)", padding: "36px" }}>
              <div className="card-icon">🚀</div>
              <h2>Collateral-Free (Unsecured) Loans</h2>
              <p className="lead" style={{ fontSize: "1.05rem" }}>
                Sanctioned without pledging any physical asset, based purely on student academic credentials and co-applicant financial income.
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "16px 0 12px" }}>
                <LenderLogo name="HDFC Credila" height={26} />
                <LenderLogo name="Avanse" height={26} />
                <LenderLogo name="Auxilo" height={26} />
                <LenderLogo name="InCred" height={26} />
                <LenderLogo name="MPOWER" height={26} />
              </div>

              <ul style={{ margin: "20px 0", lineHeight: "1.8", fontSize: "0.95rem" }}>
                <li><strong>Interest Rates:</strong> 10.25% to 13.50% floating per annum.</li>
                <li><strong>Maximum Limit:</strong> Up to ₹75 Lakhs for premier STEM, MBA, and healthcare programs.</li>
                <li><strong>Processing Speed:</strong> Fast-track sanction in just 3 to 5 business days.</li>
                <li><strong>Zero Legal Delays:</strong> No property valuation, title search, or lawyer verification required.</li>
                <li><strong>Best For:</strong> Students admitted to top-tier universities who either do not own property or prefer not to mortgage ancestral assets.</li>
              </ul>

              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link href="/loans/without-collateral" className="btn btn-accent full-width">
                  View All Collateral-Free Lenders &amp; Limits →
                </Link>
                <Link href="/apply" className="btn btn-outline full-width">
                  Check Collateral-Free Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Side-by-Side Comparison</span>
            <h2>Secured vs Collateral-Free Loans: Key Differences</h2>
            <p className="lead">
              A comprehensive breakdown across interest rates, processing timelines, and eligibility criteria.
            </p>
          </div>

          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Parameters</th>
                  <th>Secured (Public Banks)</th>
                  <th>Secured (Private / NBFC)</th>
                  <th>Unsecured (Private Banks)</th>
                  <th>Unsecured (NBFCs & Fintechs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Indicative Interest Rates</strong></td>
                  <td className="text-green">7.50% - 9.15%</td>
                  <td>8.75% - 10.50%</td>
                  <td>10.25% - 12.00%</td>
                  <td>10.75% - 13.50%</td>
                </tr>
                <tr>
                  <td><strong>Maximum Loan Amount</strong></td>
                  <td>Up to ₹1.5 Crore</td>
                  <td>Up to ₹1.5 Crore+</td>
                  <td>Up to ₹50 Lakhs</td>
                  <td>Up to ₹75 Lakhs</td>
                </tr>
                <tr>
                  <td><strong>Collateral Required</strong></td>
                  <td>Yes (Property / FD)</td>
                  <td>Yes (Property / FD)</td>
                  <td>No Collateral</td>
                  <td>No Collateral</td>
                </tr>
                <tr>
                  <td><strong>Processing Time</strong></td>
                  <td>12 - 18 Working Days</td>
                  <td>7 - 10 Working Days</td>
                  <td>4 - 6 Working Days</td>
                  <td className="text-green">3 - 5 Working Days</td>
                </tr>
                <tr>
                  <td><strong>Margin Money</strong></td>
                  <td>10% - 15%</td>
                  <td>0% - 10%</td>
                  <td>0% - 10%</td>
                  <td className="text-green">0% (100% Funding)</td>
                </tr>
                <tr>
                  <td><strong>Girl Student Discount</strong></td>
                  <td className="text-green">0.50% Concession</td>
                  <td>Varies</td>
                  <td>Varies</td>
                  <td>Select partners</td>
                </tr>
                <tr>
                  <td><strong>Tax Benefit (Sec 80E)</strong></td>
                  <td>Yes (100% Interest)</td>
                  <td>Yes (100% Interest)</td>
                  <td>Yes (100% Interest)</td>
                  <td>Yes (100% Interest)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What the Loan Covers */}
      <section>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">100% Comprehensive Coverage</span>
            <h2>What Expenses Does an Abroad Education Loan Cover?</h2>
            <p className="lead">
              Our partner banks provide holistic disbursals that cover virtually all direct and indirect expenses
              associated with pursuing an international degree.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>100% University Tuition Fees</h3>
              <p>Direct outward wire remittance in USD, EUR, GBP, CAD, or AUD to your overseas university bursar.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏠</div>
              <h3>Living Expenses & Rent</h3>
              <p>Campus housing, off-campus apartment leases, utility bills, groceries, and local transportation stipends.</p>
            </div>
            <div className="card">
              <div className="card-icon">✈️</div>
              <h3>Airfare & Travel Costs</h3>
              <p>Economy class international return tickets, visa interview travel, and airport transport.</p>
            </div>
            <div className="card">
              <div className="card-icon">🛡️</div>
              <h3>Mandatory Health Insurance</h3>
              <p>Overseas student health cover (OSHC in Australia, NHS surcharge in UK, US health insurance plans).</p>
            </div>
            <div className="card">
              <div className="card-icon">💻</div>
              <h3>Laptop, Books & Equipment</h3>
              <p>Allowances for standard high-performance laptops, engineering software licenses, lab instruments, and course books.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏦</div>
              <h3>Mandatory Deposits & GIC / Blocked Accounts</h3>
              <p>Special direct transfers for German Blocked Accounts (€11,904) and Canadian GIC ($20,635 CAD).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loans FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Education Loan Options"
        subtitle="Clear guidance on secured vs unsecured loans, margin money requirements, and covered costs."
        faqs={loansFaqs}
        id="loans-faq"
      />

      {/* Bottom CTA */}
      <section className="section-alt">
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Confused Between Secured & Unsecured Loans?</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Our loan advisors analyze your admit letter and evaluate the exact financial trade-offs at zero cost.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Schedule Free 1-on-1 Consultation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
