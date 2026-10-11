import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | Udaan Loans",
  description:
    "Learn how Udaan Loans safeguards your personal, academic, and financial information under the Digital Personal Data Protection (DPDP) Act and RBI digital lending standards.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const privacyFaqs = [
    {
      question: "Does Udaan Loans sell or trade student contact information?",
      answer:
        "No. Udaan Loans maintains a strict zero-tolerance policy against selling, leasing, or trading student personal data. Your contact and financial records are shared solely with the specific RBI-regulated banks or NBFCs you authorize for loan quotes."
    },
    {
      question: "How is my academic and co-applicant financial data secured?",
      answer:
        "All file uploads and transmission occur over bank-grade 256-bit TLS/SSL encryption. Documents are stored in encrypted cloud silos with role-based access control, accessible only to authorized loan processing officers."
    },
    {
      question: "Can I request deletion of my uploaded documents?",
      answer:
        "Yes. Under India's Digital Personal Data Protection Act (DPDP), you can request complete erasure of your data at any time by emailing our Grievance Redressal Officer at info@udaaneduloans.com."
    }
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="card" style={{ padding: "48px 40px", maxWidth: "900px", margin: "0 auto" }}>
            <span className="badge">Trust & Compliance</span>
            <h1>Privacy Policy & Data Protection</h1>
            <p className="lead" style={{ fontSize: "1rem", color: "var(--muted)" }}>
              Last Updated: October 2026 • Compliant with Digital Personal Data Protection (DPDP) Act 2023 & RBI Digital Lending Guidelines.
            </p>

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "24px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.7", fontSize: "0.98rem" }}>
              <div>
                <h2>1. Introduction & Scope</h2>
                <p>
                  Udaan Loans (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operated by {siteConfig.legalName}, is committed to maintaining the confidentiality, integrity, and security of all personal, academic, and financial records entrusted to us by students, parents, and co-applicants. This Privacy Policy details how we collect, process, store, and protect your information when you use our website ({siteConfig.url}) and loan facilitation services.
                </p>
              </div>

              <div>
                <h2>2. Categories of Information We Collect</h2>
                <p>To evaluate loan eligibility and prepare institutional bank dossiers, we collect:</p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                  <li><strong>Identity & KYC Records:</strong> Full name, date of birth, permanent address, Aadhaar number, PAN card, and passport copies.</li>
                  <li><strong>Contact Details:</strong> Verified Indian mobile telephone number, email address, and residential city.</li>
                  <li><strong>Academic Records:</strong> University admit letters, transcripts, GRE, GMAT, IELTS, or TOEFL scorecards.</li>
                  <li><strong>Financial & Co-Applicant Data:</strong> Co-applicant employment status, salary slips, Form 16, Income Tax Returns (ITR), and bank account statements.</li>
                  <li><strong>Collateral Information:</strong> Title deeds, municipal tax receipts, and property valuation estimates (applicable solely for secured loan applications).</li>
                </ul>
              </div>

              <div>
                <h2>3. Purpose of Processing & Legal Basis</h2>
                <p>We process your data strictly on the basis of your explicit, informed consent for the following legitimate purposes:</p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                  <li>Evaluating borrowing feasibility and shortlisting compatible lending partners.</li>
                  <li>Submitting formal loan dossiers to RBI-scheduled commercial banks and NBFCs authorized by you.</li>
                  <li>Verifying academic authenticity and calculating foreign exchange tuition remittance amounts.</li>
                  <li>Communicating sanction updates, rate concessions, and visa interview fund proof documentation.</li>
                </ul>
              </div>

              <div>
                <h2>4. Data Sharing & Third-Party Disclosure</h2>
                <p>
                  <strong>We do not sell personal data.</strong> Your information is disclosed only to:
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                  <li><strong>Partner Lenders:</strong> RBI-registered banks and NBFCs (such as SBI, Bank of Baroda, HDFC Credila, Avanse, Auxilo) whom you explicitly select to receive your loan file.</li>
                  <li><strong>Verification Partners:</strong> Authorized legal search advocates and technical property valuers appointed by the bank for property inspection.</li>
                  <li><strong>Statutory Authorities:</strong> When required by Indian law, judicial summons, or regulatory authorities.</li>
                </ul>
              </div>

              <div>
                <h2>5. Security Standards & Retention</h2>
                <p>
                  We deploy industry-standard 256-bit TLS/SSL encryption for data in transit and AES-256 encryption at rest. Personal records are retained only for the duration required to achieve loan sanction and disbursal, or as mandated under Indian financial record-keeping statutory guidelines.
                </p>
              </div>

              <div>
                <h2>6. Grievance Redressal Officer</h2>
                <p>
                  In accordance with the Information Technology Act 2000 and the DPDP Act 2023, the details of our Grievance Officer are:
                </p>
                <div style={{ background: "var(--soft)", padding: "16px 20px", borderRadius: "8px", marginTop: "10px" }}>
                  <strong>Grievance Redressal Officer:</strong> Data Privacy Desk<br />
                  <strong>Entity:</strong> {siteConfig.legalName}<br />
                  <strong>Address:</strong> {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} - {siteConfig.address.postalCode}<br />
                  <strong>Email:</strong> info@udaaneduloans.com<br />
                  <strong>Response SLA:</strong> Within 48 working hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title="Privacy & Data Protection FAQs"
        subtitle="Addressing your rights regarding data encryption, consent withdrawal, and third-party sharing."
        faqs={privacyFaqs}
        id="privacy-faq"
      />
    </>
  );
}
