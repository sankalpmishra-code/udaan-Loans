import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { eligibilityFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Overseas Education Loan Eligibility & Document Checklist (2026)",
  description:
    "Complete checklist of documents and eligibility requirements for study abroad education loans in India. Includes student KYC, co-applicant income papers, collateral rules, and Section 80E tax deduction guide.",
  keywords: [
    "education loan eligibility criteria India",
    "abroad education loan document checklist",
    "co applicant documents for education loan",
    "Section 80E income tax deduction education loan",
    "minimum CIBIL score for study abroad loan",
    "property documents for secured education loan",
  ],
  alternates: {
    canonical: "/eligibility",
  },
};

export default function EligibilityPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Eligibility & Documents", url: "/eligibility" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Clear Requirements</span>
            <h1>Overseas Education Loan Eligibility & Documents Checklist</h1>
            <p className="lead">
              Securing a fast loan approval depends on submitting a clean, verified dossier.
              Review the complete criteria for students, co-applicants, and collateral assets below.
            </p>
          </div>

          {/* Student vs Co-applicant Criteria */}
          <div className="grid-2">
            <div className="card">
              <div className="card-icon">👨‍🎓</div>
              <h2>Student Eligibility Criteria</h2>
              <ul style={{ margin: "16px 0", lineHeight: "1.8", fontSize: "0.95rem" }}>
                <li><strong>Nationality:</strong> Indian citizen holding a valid Indian passport.</li>
                <li><strong>Age:</strong> Minimum 18 years at the time of application (or parents apply as primary borrowers).</li>
                <li><strong>Academic Record:</strong> Consistent academic record (minimum 55%–60% marks in 10th, 12th, and Undergraduate degree).</li>
                <li><strong>Standardized Tests:</strong> Valid scores in required exams (GRE, GMAT, IELTS, TOEFL, PTE, or Duolingo as mandated by the course).</li>
                <li><strong>Admission Status:</strong> Confirmed admit, conditional offer, or university shortlist from an accredited international university.</li>
                <li><strong>Backlogs/Gaps:</strong> Cleared past backlogs and documented career gaps are accepted with an SOP.</li>
              </ul>
            </div>

            <div className="card">
              <div className="card-icon">💼</div>
              <h2>Co-Applicant Eligibility Criteria</h2>
              <ul style={{ margin: "16px 0", lineHeight: "1.8", fontSize: "0.95rem" }}>
                <li><strong>Permissible Relationships:</strong> Father, Mother, Spouse, Brother, Sister. (Select NBFCs also accept Paternal/Maternal Uncles and Aunts).</li>
                <li><strong>Credit Score:</strong> Minimum CIBIL score of 685 (Scores of 750+ unlock preferential interest rates).</li>
                <li><strong>Salaried Profiles:</strong> Minimum 2 years of continuous employment; monthly disposable income matching the requested loan bracket.</li>
                <li><strong>Self-Employed / Business:</strong> Minimum 3 years of audited business operations with steady ITR filings.</li>
                <li><strong>Bank Statements:</strong> 6 months of active bank statements reflecting regular salary or business income credits.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Documents Checklist Table */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Document Verification</span>
            <h2>Complete Master Document Checklist</h2>
            <p className="lead">
              Keep digital PDF scans of the following documents ready for rapid 1-day processing:
            </p>
          </div>

          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Required Documents</th>
                  <th>Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Student KYC</strong></td>
                  <td>
                    • PAN Card<br />
                    • Aadhaar Card<br />
                    • Valid Passport (First & Last pages)<br />
                    • 2 Passport-sized photographs
                  </td>
                  <td>Mandatory identity and citizenship verification per RBI regulations.</td>
                </tr>
                <tr>
                  <td><strong>Student Academics</strong></td>
                  <td>
                    • 10th & 12th Marksheets & Certificates<br />
                    • Bachelor’s Degree Marksheets (All Semesters)<br />
                    • Degree Certificate or Provisional Passing Certificate<br />
                    • Entrance Scorecard (GRE, GMAT, IELTS, TOEFL)
                  </td>
                  <td>Evaluates academic caliber and earning potential post-graduation.</td>
                </tr>
                <tr>
                  <td><strong>Admission Details</strong></td>
                  <td>
                    • Official Admission / Offer Letter<br />
                    • University Cost of Attendance (COA) / I-20 Form<br />
                    • Course curriculum and fee schedule breakdown
                  </td>
                  <td>Determines the sanctioned loan amount and foreign exchange disbursal terms.</td>
                </tr>
                <tr>
                  <td><strong>Co-Applicant KYC & Income (Salaried)</strong></td>
                  <td>
                    • PAN Card & Aadhaar Card<br />
                    • Salary Slips (Last 3 months)<br />
                    • Form 16 (Last 2 years)<br />
                    • Salary Account Bank Statement (Last 6 months)
                  </td>
                  <td>Confirms repayment ability during and after the moratorium period.</td>
                </tr>
                <tr>
                  <td><strong>Co-Applicant (Self-Employed)</strong></td>
                  <td>
                    • Income Tax Returns (ITR with computation, last 2–3 years)<br />
                    • Audited Balance Sheet & Profit/Loss statement<br />
                    • Business registration certificate (GST, Udyam, etc.)<br />
                    • Current Account Bank Statements (Last 6 months)
                  </td>
                  <td>Verifies business legitimacy and stable cash flow generation.</td>
                </tr>
                <tr>
                  <td><strong>Property Documents (Secured Loans Only)</strong></td>
                  <td>
                    • Registered Title Deed / Sale Deed<br />
                    • Prior chain of title deeds (last 13 to 30 years)<br />
                    • Approved building plan / layout map<br />
                    • Latest property tax receipts & NOC
                  </td>
                  <td>Required for bank legal title search and authorized technical valuation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 80E Guide */}
      <section>
        <div className="wrap">
          <div className="card" style={{ padding: "40px", borderLeft: "6px solid var(--accent)" }}>
            <span className="badge">Tax Savings Guide</span>
            <h2>Maximize Tax Deductions Under Section 80E (Income Tax Act)</h2>
            <p className="lead" style={{ fontSize: "1.05rem" }}>
              The Indian government incentivizes higher education by allowing tax deductions on the interest paid towards education loans.
            </p>

            <div className="grid-3" style={{ marginTop: "24px" }}>
              <div style={{ background: "var(--soft)", padding: "20px", borderRadius: "8px" }}>
                <h4>100% Unlimited Interest Deduction</h4>
                <p style={{ fontSize: "0.92rem", margin: "6px 0 0" }}>
                  Unlike Section 80C which is capped at ₹1.5 Lakhs, Section 80E has <strong>NO upper monetary limit</strong>. You can deduct 100% of interest paid.
                </p>
              </div>
              <div style={{ background: "var(--soft)", padding: "20px", borderRadius: "8px" }}>
                <h4>Valid for 8 Consecutive Years</h4>
                <p style={{ fontSize: "0.92rem", margin: "6px 0 0" }}>
                  Deductions can be claimed starting from the year repayment begins and for the next 7 consecutive assessment years (total 8 years).
                </p>
              </div>
              <div style={{ background: "var(--soft)", padding: "20px", borderRadius: "8px" }}>
                <h4>Who Can Claim the Rebate?</h4>
                <p style={{ fontSize: "0.92rem", margin: "6px 0 0" }}>
                  The deduction is claimed by the individual who actively pays the interest (the student or the parent/spouse co-applicant).
                </p>
              </div>
            </div>

            <div style={{ marginTop: "24px", background: "var(--soft-alt)", padding: "18px", borderRadius: "8px" }}>
              <strong>Tax Saving Example:</strong> If your co-applicant parent falls in the 30% tax bracket and pays ₹4,00,000 in education loan interest in a financial year, Section 80E saves up to ₹1,24,800 annually in taxes, effectively reducing the net interest rate by ~3%.
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Eligibility & Documents"
        subtitle="Addressing co-applicant criteria, backlogs, CIBIL scores, and property verification."
        faqs={eligibilityFaqs}
        id="eligibility-faq"
      />

      {/* Bottom CTA */}
      <section className="section-alt">
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Get Your Documents Pre-Screened Free</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Upload your documents securely to know your exact approval odds before submitting formal bank applications.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Start Free Document Pre-Screening →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
