import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import { applyFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Apply for Study Abroad Education Loan: Free Profile Assessment",
  description:
    "Submit your overseas education loan application with Udaan Loans. 100% free consultation, multi-lender comparison, and fast-track sanction letter in 3-7 days. Zero credit score impact.",
  keywords: [
    "apply abroad education loan online",
    "education loan application form India",
    "study abroad loan free consultation",
    "pre approved education loan India",
    "fast track student loan sanction",
  ],
  alternates: {
    canonical: "/apply",
  },
};

export default function ApplyPage() {
  return (
    <>

      <section className="hero" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ marginBottom: "36px" }}>
            <span className="badge">100% Free Consultation</span>
            <h1>Start Your Overseas Education Loan Application</h1>
            <p className="lead">
              Fill out this quick assessment. A dedicated Senior Loan Advisor will analyze your admit letter,
              compare 30+ lenders, and prepare your customized approval plan within <strong>2 to 4 working hours</strong>.
            </p>
          </div>

          {/* Lead Capture Form */}
          <LeadForm />

          {/* Trust Guarantees */}
          <div className="grid-3" style={{ marginTop: "48px" }}>
            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🛡️</div>
              <h3>100% Free for Students</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: "0" }}>
                We never charge students any fee. We are compensated by our institutional banking partners.
              </p>
            </div>

            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⚡</div>
              <h3>Zero CIBIL Score Impact</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: "0" }}>
                Our initial assessment is a soft evaluation. No formal inquiries hit your bureau without your explicit consent.
              </p>
            </div>

            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📞</div>
              <h3>Instant Telephone & WhatsApp Support</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: "0" }}>
                Need immediate help? Call our student helpline at <strong>{siteConfig.phoneNumbers[0]}</strong> or <strong>{siteConfig.phoneNumbers[1]}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Page FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Applying with Udaan Loans"
        subtitle="Turnaround times, student charges, pan-India services, and digital security."
        faqs={applyFaqs}
        id="apply-faq"
      />
    </>
  );
}
