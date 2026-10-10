import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Service & Facilitator Agreement | Udaan Loans",
  description:
    "Read the terms and conditions governing the use of Udaan Loans facilitation services, student advisory, and partnership disclaimers.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const termsFaqs = [
    {
      question: "Does Udaan Loans decide whether my education loan is approved?",
      answer:
        "No. Final credit sanction, interest rates, margin money requirements, and disbursal terms are determined solely by the underwriting credit committees of our partnering RBI-regulated banks and NBFCs."
    },
    {
      question: "Are there any hidden charges or penalties for applying through Udaan?",
      answer:
        "No. Udaan Loans provides 100% free consultation and document assistance for students. Standard bank processing fees, legal search fees, or valuation fees (if applicable) are paid directly to the chosen bank upon sanction."
    },
    {
      question: "Can I cancel my application after submitting my details?",
      answer:
        "Yes. You are under no contractual obligation to proceed with any loan offer. If you choose not to proceed, simply notify your dedicated loan advisor and your file will be archived immediately."
    }
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="card" style={{ padding: "48px 40px", maxWidth: "900px", margin: "0 auto" }}>
            <span className="badge">Legal Terms</span>
            <h1>Terms of Service & Advisory Agreement</h1>
            <p className="lead" style={{ fontSize: "1rem", color: "var(--muted)" }}>
              Last Updated: October 2026 • Please read these terms carefully before utilizing our services.
            </p>

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "24px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.7", fontSize: "0.98rem" }}>
              <div>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing {siteConfig.url} or submitting an inquiry via our forms, calculators, or helpline, you agree to be bound by these Terms of Service. If you do not agree with any provision, please refrain from using our platform.
                </p>
              </div>

              <div>
                <h2>2. Nature of Service: Loan Facilitator Status</h2>
                <p>
                  <strong>Udaan Loans is an education loan facilitator and student advisory service, NOT a lender.</strong> We are not a banking institution, scheduled commercial bank, or non-banking financial company (NBFC) under the Reserve Bank of India Act. We do not issue loans, collect principal or interest payments, or make lending commitments. All credit products are originated, sanctioned, and disbursed by independent third-party financial institutions.
                </p>
              </div>

              <div>
                <h2>3. Accuracy of User Information</h2>
                <p>
                  You agree to provide true, accurate, and complete information regarding your academic qualifications, university admission status, and co-applicant financial income. Submitting forged marksheets, fabricated ITRs, or inaccurate identity documentation constitutes fraud and will result in immediate termination of services and reporting to financial bureau databases.
                </p>
              </div>

              <div>
                <h2>4. Zero Upfront Student Fees</h2>
                <p>
                  Our advisory, lender matching, profile evaluation, and document management services are provided to students at zero monetary cost. Any statutory stamp duty, government mortgage registration fees, or third-party bank processing fees are levied directly by the respective lender or governmental body.
                </p>
              </div>

              <div>
                <h2>5. Limitation of Liability</h2>
                <p>
                  While we work diligently to negotiate favorable interest rates and accelerate file approvals, Udaan Loans does not guarantee loan sanction, visa issuance, or university admission. We shall not be liable for direct, indirect, or consequential damages resulting from loan rejections, delays in bank processing, university enrollment cancellations, or changes in overseas visa regulations.
                </p>
              </div>

              <div>
                <h2>6. Governing Law & Jurisdiction</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in Gurugram / New Delhi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title="Terms of Service FAQs"
        subtitle="Clarifying our facilitator role, bank fees, and cancellation policies."
        faqs={termsFaqs}
        id="terms-faq"
      />
    </>
  );
}
