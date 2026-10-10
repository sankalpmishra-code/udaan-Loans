import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { processFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Step-by-Step Study Abroad Education Loan Process: From Apply to Disbursal",
  description:
    "Learn the 5-step abroad education loan journey in India. From document submission to sanction letter in 3-7 days, visa interview proof of funds, and direct university SWIFT wire remittance.",
  keywords: [
    "education loan application process India",
    "how to get abroad education loan fast",
    "education loan sanction letter timeline",
    "SWIFT wire transfer education loan disbursal",
    "pre visa education loan sanction letter",
  ],
  alternates: {
    canonical: "/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Application Process", url: "/process" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Transparent Journey</span>
            <h1>The Complete 5-Step Abroad Education Loan Roadmap</h1>
            <p className="lead">
              Applying for an overseas student loan does not have to be stressful.
              Udaan Loans streamlines the entire lifecycle from early matchmaking to foreign currency remittance.
            </p>
          </div>

          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <ol className="timeline-steps">
              <li className="timeline-step">
                <h3>Step 1: Digital Profile Assessment (Day 1)</h3>
                <p>
                  Share your university admit details, undergraduate academic records, and co-applicant income overview.
                  Our proprietary evaluation engine matches your profile against underwriting criteria from 30+ lenders.
                </p>
                <div style={{ background: "var(--soft)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.88rem" }}>
                  <strong>Deliverable:</strong> Personalized loan feasibility report comparing indicative interest rates and eligibility ceilings.
                </div>
              </li>

              <li className="timeline-step">
                <h3>Step 2: Lender Selection & Strategy (Day 1 - 2)</h3>
                <p>
                  A Senior Education Loan Advisor consults with you and your family. We help you choose whether to pursue
                  a fast-track collateral-free loan or a low-rate secured public bank loan.
                </p>
                <div style={{ background: "var(--soft)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.88rem" }}>
                  <strong>Key Advantage:</strong> We initiate applications across primary and backup lenders simultaneously with zero redundant paperwork.
                </div>
              </li>

              <li className="timeline-step">
                <h3>Step 3: Document Verification & Doorstep Collection (Day 2 - 3)</h3>
                <p>
                  Upload digital PDF copies through our 256-bit encrypted portal. For secured loans, our bank relationship officers
                  schedule doorstep document pickup and coordinate legal search and valuation reports.
                </p>
              </li>

              <li className="timeline-step">
                <h3>Step 4: Formal Loan Sanction Letter (Day 3 - 7)</h3>
                <p>
                  The bank or NBFC credit committee approves your file and issues the formal <strong>Loan Sanction Letter</strong>.
                  This document specifies your approved amount, interest rate, and moratorium terms.
                </p>
                <div style={{ background: "var(--soft-alt)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.88rem", borderLeft: "4px solid var(--brand)" }}>
                  <strong>Embassy Proof of Funds:</strong> Use your official sanction letter for US F-1 visa interviews, UK CAS generation, or Canadian study permit filing.
                </div>
              </li>

              <li className="timeline-step">
                <h3>Step 5: International Disbursal & Forex Remittance (Post-Visa)</h3>
                <p>
                  Upon receiving your student visa, sign the loan agreement. The lender initiates outward SWIFT wire transfers
                  directly to your overseas university for tuition fees and loads your forex card or German Blocked Account for living expenses.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Comparison: Unsecured vs Secured Timelines */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Realistic Planning</span>
            <h2>How Long Does Each Loan Type Take?</h2>
            <p className="lead">Plan your loan timeline ahead of visa interview booking deadlines:</p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3>Unsecured Loan Timeline (NBFC / Private Bank)</h3>
              <p><strong>Total Duration: 3 to 7 Working Days</strong></p>
              <ul style={{ lineHeight: "1.8", fontSize: "0.92rem", margin: "14px 0" }}>
                <li>Day 1: Online submission & credit check</li>
                <li>Day 2: Soft offer & advisor call</li>
                <li>Day 3 - 4: Credit underwriting & verification</li>
                <li>Day 5 - 7: Formal sanction letter issued</li>
              </ul>
              <div className="badge-pill" style={{ background: "var(--soft-alt)" }}>
                Fastest option for tight visa deadlines
              </div>
            </div>

            <div className="card">
              <h3>Secured Loan Timeline (Public Sector Bank)</h3>
              <p><strong>Total Duration: 10 to 18 Working Days</strong></p>
              <ul style={{ lineHeight: "1.8", fontSize: "0.92rem", margin: "14px 0" }}>
                <li>Day 1 - 3: Document collection & file login</li>
                <li>Day 4 - 8: Legal title search (Advocate scrutiny)</li>
                <li>Day 9 - 12: Technical property valuation (Engineer visit)</li>
                <li>Day 13 - 18: Sanction letter & mortgage creation</li>
              </ul>
              <div className="badge-pill" style={{ background: "var(--soft-alt)" }}>
                Delivers lowest 7.5% - 9% interest rates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Application Process"
        subtitle="Addressing visa rejections, university wire transfers, and timeline expediting."
        faqs={processFaqs}
        id="process-faq"
      />

      {/* Bottom CTA */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Need an Urgent Sanction Letter for Your Visa?</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Our dedicated fast-track desk prioritizes students with upcoming visa appointment slots.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Fast-Track My Application Now →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
