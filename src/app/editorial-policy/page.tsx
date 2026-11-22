import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Editorial Policy & Financial Verification Standards | Udaan Edu Loans",
  description:
    "Our editorial governance, fact-checking methodology, accredited reviewer credentials, and conflict-of-interest standards for study abroad financial guidance.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Editorial Policy and Financial Verification Standards",
    description: "Governance, review boards, and methodology for education loan advisory at Udaan Edu Loans.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Editorial Policy", url: "/editorial-policy" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <span className="badge">E-E-A-T &amp; Trust Standards</span>
            <h1>Editorial Policy &amp; Financial Verification Methodology</h1>
            <p className="lead">
              At Udaan Edu Loans, we recognize that financing an international degree is one of the most critical financial decisions an Indian family will ever make. Our content is held to rigorous standards of accuracy, transparency, and accountability.
            </p>
          </div>

          <div style={{ maxWidth: "900px", margin: "36px auto 0" }}>
            {/* 1. Review Board & Named Reviewers */}
            <div className="card" style={{ padding: "32px", marginBottom: "32px", borderLeft: "4px solid var(--brand)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>👥</span>
                <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
                  1. Credit Advisory &amp; Review Board
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                All interest rates, loan limits, statutory tax interpretations, and margin policies published across Udaan are researched, written, and peer-reviewed by accredited professionals with verifiable track records in commercial lending and underwriting:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" }}>
                <div style={{ background: "var(--soft)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--line)" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)" }}>Rajesh Sharma</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--brand)", marginTop: "2px" }}>
                    Senior Credit Advisor &amp; Fact-Checking Lead
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "8px 0" }}>
                    Former Scale-IV Chief Manager &amp; Credit Underwriter, State Bank of India (SBI) • 18+ Years Experience in Retail Assets
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: 0, lineHeight: "1.5" }}>
                    Specializes in public sector bank underwriting guidelines, RBI Repo-linked External Benchmark Lending Rates (EBLR), property valuation legalities, and statutory interest concessions.
                  </p>
                </div>

                <div style={{ background: "var(--soft)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--line)" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)" }}>Ananya Sen</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--brand)", marginTop: "2px" }}>
                    Head of Lending Partnerships &amp; Student Underwriting
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "8px 0" }}>
                    Former Senior Credit Manager, HDFC Credila &amp; Auxilo Finserve • 11+ Years in Education Finance
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: 0, lineHeight: "1.5" }}>
                    Expert in non-collateral risk matrices, university STEM ROI evaluations, German Blocked Account (Sperrkonto) disbursements, and Canada IRCC living support protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Fact-Checking & Research Methodology */}
            <div className="card" style={{ padding: "32px", marginBottom: "32px", borderLeft: "4px solid var(--accent)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>🔬</span>
                <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
                  2. Fact-Checking &amp; Verification Methodology
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                We do not rely on secondhand aggregation or unverified marketing brochures. Our research methodology follows a disciplined 3-tier audit cycle:
              </p>

              <ul style={{ paddingLeft: "20px", lineHeight: "1.8", fontSize: "0.92rem", color: "var(--ink)" }}>
                <li>
                  <strong>Statutory Benchmark Tracking:</strong> We track the Reserve Bank of India (RBI) Monetary Policy Committee (MPC) bi-monthly repo rate pronouncements and audit subsequent External Benchmark Lending Rate (EBLR) and Marginal Cost of Funds Based Lending Rate (MCLR) filings across partner banks within 24 hours of revision.
                </li>
                <li>
                  <strong>Direct Underwriting Desk Validation:</strong> Our advisory team coordinates bi-weekly audits directly with bank asset managers at specialized retail branches (such as SBI RACPC, BoB Baroda Scholar desks, and HDFC Credila sanction hubs) to verify university lists, margin requirements, and collateral caps.
                </li>
                <li>
                  <strong>Official Foreign Immigration Regulatory Cross-Checks:</strong> Living expense requirements and visa financial rules are audited directly against official foreign governmental portals:
                  <ul style={{ marginTop: "6px", fontSize: "0.88rem", color: "var(--muted)" }}>
                    <li><strong>USA:</strong> USCIS &amp; Department of State guidelines for Form I-20 and 12-month OPT + 24-month STEM extensions.</li>
                    <li><strong>UK:</strong> UK Visas &amp; Immigration (UKVI) Appendix Finance (FIN 8.1–8.3) and London (£1,483/mo) / Non-London (£1,136/mo) maintenance thresholds.</li>
                    <li><strong>Canada:</strong> Immigration, Refugees and Citizenship Canada (IRCC) published living cost benchmark (CAD $23,448 outside Quebec) and DLI Provincial Attestation Letter (PAL) regulations.</li>
                    <li><strong>Germany:</strong> Federal Foreign Office (Auswärtiges Amt) statutory Blocked Account (€11,904/year) requirement.</li>
                    <li><strong>Australia:</strong> Department of Home Affairs Student Visa (Subclass 500) Genuine Student assessment and published living cost (AUD $29,710/year).</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* 3. Timeliness & Correction Protocol */}
            <div className="card" style={{ padding: "32px", marginBottom: "32px", borderLeft: "4px solid var(--success)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>⚡</span>
                <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
                  3. Correction Protocol &amp; Timeliness Guarantee
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                Every page displaying interest rates, maximum loan limits, or immigration guidelines carries an explicit <strong>Last Verified</strong> date and named audit reference. 
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                If an interest rate or visa policy changes, our editorial team commits to updating the affected guide within <strong>24 to 48 hours</strong>. If you detect any outdated figure or discrepancy, our editorial desk can be reached directly at <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--brand)", fontWeight: 700 }}>{siteConfig.email}</a> for prompt investigation and correction.
              </p>
            </div>

            {/* 4. Commercial Independence & Non-Gated Model */}
            <div className="card" style={{ padding: "32px", marginBottom: "32px", borderLeft: "4px solid #6366f1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>⚖️</span>
                <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
                  4. Commercial Independence &amp; Zero Student Bias
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                Udaan Edu Loans is <strong>100% free for students</strong>. We never charge consultation fees, matching fees, or documentation charges.
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                Our bank matching engine evaluates profiles strictly on quantitative merit: borrower eligibility, loan-to-value coverage, interest rate corridor, and speed to sanction. We do not promote higher-interest products over low-cost public sector bank loans; we explicitly present public bank alternatives (SBI from 7.75%) alongside NBFC options so students can make mathematically sound, informed decisions.
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/lenders" className="btn btn-outline" style={{ marginRight: "12px" }}>
                Explore Verified Lender Directory →
              </Link>
              <Link href="/match" className="btn btn-accent">
                Match with Lowest-Rate Lenders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
