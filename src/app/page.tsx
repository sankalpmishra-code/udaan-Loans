import type { Metadata } from "next";
import Link from "next/link";
import HeroEligibilityForm from "@/components/HeroEligibilityForm";
import Calculator from "@/components/Calculator";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import LendersLogoShowcase from "@/components/LendersLogoShowcase";
import LenderLogo from "@/components/LenderLogo";
import { homeFaqs } from "@/data/faqs";
import { destinationsList } from "@/data/destinations";
import { lendersList } from "@/data/lenders";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Education Loan for Study Abroad | Compare Secured & Unsecured Options | Udaan Edu Loans",
  description:
    "Explore education loans without co-applicant for Masters courses for Indian students. Compare 30+ lenders for USA, UK, Canada, Germany & Australia with 100% virtual guidance and zero service fees.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Education Loan Without Co-Applicant for Masters Courses | Udaan Edu Loans",
    description:
      "Explore education loans without co-applicant for Masters courses for Indian students. 100% virtual guidance, collateral-free options up to ₹75L, and zero advisory fees.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function HomePage() {
  // Structured Data Schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "Organization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    sameAs: [
      siteConfig.social.linkedinUrl,
      siteConfig.social.twitterUrl,
      siteConfig.social.instagramUrl,
      siteConfig.social.facebookUrl,
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[organizationSchema, webSiteSchema, faqSchema]} />

      {/* =================================================================
          SECTION A: HERO & CONVERSION FORM
          Inspired by Nomad Credit conversion framework:
          Headline + Value Props on left, Eligibility Check Form on right
          ================================================================= */}
      <section className="hero" id="hero-section">
        <div className="wrap hero-grid">
          <div className="hero-content">
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "12px" }}>
              <span className="badge">100% Free Guidance for Indian Students</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(135deg, rgba(217, 119, 6, 0.16), rgba(9, 71, 84, 0.1))",
                  border: "1.5px solid rgba(217, 119, 6, 0.45)",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "#92400e",
                }}
              >
                🎓 Special Facility
              </span>
            </div>

            <h1>Find the Right Education Loan for Your Study Abroad Journey</h1>

            {/* Major Line Highlight Box */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(9, 71, 84, 0.06))",
                borderLeft: "4px solid var(--accent, #D97706)",
                padding: "14px 18px",
                borderRadius: "0 10px 10px 0",
                margin: "18px 0 22px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.06rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5 }}>
                ⚡ Education Loan Without Co-Applicant for Masters Courses for Indian Students
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.4 }}>
                Pursuing an MS, MBA, or STEM Masters abroad? Discover specialized lender options that evaluate your future earning potential with zero parent cosigner or Indian collateral required.
              </p>
            </div>

            <p className="lead">
              Explore potential education-loan options based on your destination, course, funding needs, and financial profile. Understand lender requirements and get guidance on your next steps.
            </p>

            <ul className="hero-checklist">
              <li style={{ background: "rgba(217, 119, 6, 0.06)", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(217, 119, 6, 0.2)" }}>
                <span className="check-icon" aria-hidden="true" style={{ color: "#D97706" }}>✓</span>
                <span>
                  <strong>Loan Without Co-Applicant for Masters Courses:</strong> Special funding schemes for Indian students pursuing international Masters (MS/MBA/STEM) without requiring financial co-signers, parent income ITRs, or collateral.
                </span>
              </li>
              <li>
                <span className="check-icon" aria-hidden="true">✓</span>
                <span>
                  <strong>Compare relevant secured and unsecured loan options</strong> across premier public banks, private commercial banks, and NBFCs.
                </span>
              </li>
              <li>
                <span className="check-icon" aria-hidden="true">✓</span>
                <span>
                  <strong>Understand eligibility requirements and documentation</strong>, including co-applicant rules and university-specific lending criteria.
                </span>
              </li>
              <li>
                <span className="check-icon" aria-hidden="true">✓</span>
                <span>
                  <strong>Get end-to-end guidance through the process</strong> from preliminary assessment and pre-visa sanction letters to overseas fund disbursal.
                </span>
              </li>
            </ul>

            <div className="hero-actions" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "28px" }}>
              <a href="#hero-form" className="btn btn-accent" style={{ padding: "13px 26px", fontSize: "1rem" }}>
                Check My Loan Options
              </a>
              <Link href="/match" className="btn btn-outline" style={{ padding: "13px 24px", fontSize: "1rem" }}>
                ⚡ Explore Loan Matcher
              </Link>
              <Link href="/calculator" className="btn btn-outline" style={{ padding: "13px 20px", fontSize: "1rem" }}>
                EMI Calculator
              </Link>
            </div>

            <ul className="trust-pills">
              <li style={{ background: "rgba(217, 119, 6, 0.16)", color: "#b45309", borderColor: "rgba(217, 119, 6, 0.4)", fontWeight: 700 }}>
                ⭐ Loans Without Co-Applicant for Masters
              </li>
              <li>Rates from 7.5% - 12.5% p.a.</li>
              <li>Up to ₹1.5 Crore</li>
              <li>Collateral-Free up to ₹75L</li>
              <li>Zero CIBIL Impact Check</li>
              <li>100% Virtual Process</li>
            </ul>
          </div>

          {/* Right Column: Hero Eligibility Form */}
          <div id="hero-form" style={{ scrollMarginTop: "90px" }}>
            <HeroEligibilityForm />
          </div>
        </div>
      </section>

      {/* =================================================================
          LENDERS LOGO SHOWCASE
          Prominent partner network displaying official bank & NBFC logos
          ================================================================= */}
      <LendersLogoShowcase />

      {/* =================================================================
          SECTION B: TRUST & VALUE PROPOSITIONS (Nomad Credit Style Benefits)
          ================================================================= */}
      <section className="section-alt" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Built for Indian Students</span>
            <h2>Why Indian Students Plan Overseas Financing with Udaan</h2>
            <p className="lead">
              Navigating international student financing shouldn’t mean visiting a dozen bank branches or guessing interest rates.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <span className="value-card-icon" aria-hidden="true">🏛️</span>
              <h3>Multi-Lender Comparison</h3>
              <p>
                Compare offers across public sector banks (SBI, BoB), private commercial banks (ICICI, Axis), and specialized NBFCs (HDFC Credila, Avanse) simultaneously.
              </p>
            </div>

            <div className="value-card">
              <span className="value-card-icon" aria-hidden="true">💻</span>
              <h3>100% Virtual Process</h3>
              <p>
                Zero doorstep document pickups or repeated branch visits. Complete your profile assessment, KYC submission, and file tracking online from home.
              </p>
            </div>

            <div className="value-card">
              <span className="value-card-icon" aria-hidden="true">🛡️</span>
              <h3>Zero CIBIL Score Impact</h3>
              <p>
                Exploring your potential financing options and checking university eligibility involves no hard credit inquiries on your or your co-applicant’s credit report.
              </p>
            </div>

            <div className="value-card">
              <span className="value-card-icon" aria-hidden="true">📄</span>
              <h3>Pre-Visa Sanction Letters</h3>
              <p>
                Fast-track official, embassy-accepted sanction letters to satisfy liquid financial fund requirements for Form I-20, CAS, or German blocked account deposits.
              </p>
            </div>

            <div className="value-card" style={{ border: "1.5px solid rgba(217, 119, 6, 0.4)", background: "linear-gradient(180deg, rgba(217, 119, 6, 0.06), var(--surface))" }}>
              <span className="value-card-icon" aria-hidden="true">🎓</span>
              <h3>No Co-Applicant Loans for Masters</h3>
              <p>
                Qualified Indian students pursuing STEM, MS, or MBA degrees abroad can access education loans without a co-applicant or financial cosigner, evaluated on academic merit and future earnings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION C: HOW UDAAN EDU LOANS WORKS (4-Step Student Journey)
          ================================================================= */}
      <section id="how-it-works">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Simple & Transparent</span>
            <h2>How Udaan Edu Loans Works</h2>
            <p className="lead">
              A transparent 4-step journey designed to help you secure overseas education funding with minimal stress.
            </p>
          </div>

          <div className="process-steps-grid">
            <div className="step-box">
              <div className="step-num">01</div>
              <h3>Share Your Study Plans</h3>
              <p>
                Tell us your target country, course, admit status, and expected funding needs in under 60 seconds using our quick assessment form.
              </p>
            </div>

            <div className="step-box">
              <div className="step-num">02</div>
              <h3>Explore Suitable Loan Options</h3>
              <p>
                Receive transparent preliminary shortlists comparing secured and unsecured lenders, indicative floating interest rates, and margin money.
              </p>
            </div>

            <div className="step-box">
              <div className="step-num">03</div>
              <h3>Guided Digital Documentation</h3>
              <p>
                Follow our customized checklist to securely upload student KYC, academic transcripts, and co-applicant income records through our virtual portal.
              </p>
            </div>

            <div className="step-box">
              <div className="step-num">04</div>
              <h3>Sanction & Overseas Disbursal</h3>
              <p>
                Receive your official sanction letter for embassy visa processing, followed by university tuition transfer and living expense disbursement.
              </p>
            </div>
          </div>

          {/* Transparent Independent Underwriting Notice */}
          <div className="underwriting-disclaimer">
            <strong>Independent Underwriting Notice:</strong> Final loan approval, interest rate, sanctioned amount, and disbursement conditions are determined independently by participating lenders based on their underwriting criteria. Udaan Edu Loans acts as an unbiased facilitator and does not charge students any advisory or application fees.
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION D: WHY CHOOSE UDAAN? (Direct Bank vs Udaan Comparison)
          ================================================================= */}
      <section className="section-alt" id="why-udaan">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Clear Advantages</span>
            <h2>Applying Directly to Banks vs. Facilitation with Udaan</h2>
            <p className="lead">
              See how an unbiased education loan advisory platform saves you time, money, and administrative hurdles.
            </p>
          </div>

          <div className="comparison-container">
            {/* Direct Bank Column */}
            <div className="comparison-card bank-card">
              <h3 style={{ fontSize: "1.3rem", color: "var(--ink)", marginBottom: "4px" }}>
                Applying Directly to a Bank Branch
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "16px" }}>
                Single-lender perspective with manual paperwork and branch queues
              </p>
              <ul className="comparison-list">
                <li>
                  <span className="comparison-icon-cross">✕</span>
                  <span><strong>Single lender perspective:</strong> Zero fallback if the branch underwriter rejects your course or profile.</span>
                </li>
                <li>
                  <span className="comparison-icon-cross">✕</span>
                  <span><strong>Repeated branch visits:</strong> Manual paper submissions, branch follow-ups, and long queuing delays.</span>
                </li>
                <li>
                  <span className="comparison-icon-cross">✕</span>
                  <span><strong>Limited embassy expertise:</strong> Branch staff may not know specific visa financial guidelines (I-20, CAS, SDS).</span>
                </li>
                <li>
                  <span className="comparison-icon-cross">✕</span>
                  <span><strong>Opaque tracking:</strong> Hard to obtain status updates without physically visiting the sanctioning desk.</span>
                </li>
                <li>
                  <span className="comparison-icon-cross">✕</span>
                  <span><strong>No comparative advice:</strong> No guidance on whether another bank offers lower margin money or faster processing.</span>
                </li>
              </ul>
            </div>

            {/* Udaan Edu Loans Column */}
            <div className="comparison-card udaan-card">
              <span className="comparison-badge">Recommended for Study Abroad</span>
              <h3 style={{ fontSize: "1.3rem", color: "var(--brand)", marginBottom: "4px" }}>
                With Udaan Edu Loans Facilitation
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "16px" }}>
                Multi-lender guidance tailored specifically for international students
              </p>
              <ul className="comparison-list">
                <li>
                  <span className="comparison-icon-check">✓</span>
                  <span><strong>Multi-lender comparison:</strong> Compare 30+ public banks, private commercial banks, and NBFCs at once.</span>
                </li>
                <li>
                  <span className="comparison-icon-check">✓</span>
                  <span><strong>100% virtual process:</strong> Submit documents digitally with zero doorstep visits or branch queues.</span>
                </li>
                <li>
                  <span className="comparison-icon-check">✓</span>
                  <span><strong>Visa-ready sanction letters:</strong> Structuring customized to satisfy US F-1, UK CAS, Canada SDS, or German blocked accounts.</span>
                </li>
                <li>
                  <span className="comparison-icon-check">✓</span>
                  <span><strong>Priority escalation:</strong> Dedicated partner channels help fast-track borderline or time-sensitive files.</span>
                </li>
                <li>
                  <span className="comparison-icon-check">✓</span>
                  <span><strong>100% free for students:</strong> Transparent advice with zero consultation fees or hidden charges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION E: LOAN OPTIONS & EXPENSE COVERAGE
          ================================================================= */}
      <section id="loan-options">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Tailored Financing</span>
            <h2>Education Loan Options We Help You Secure</h2>
            <p className="lead">
              Whether you possess physical collateral or seek a collateral-free loan backed by student potential, we match you with the right institutional partner.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon" aria-hidden="true">🏛️</div>
              <h3>Secured Education Loans</h3>
              <p>
                Backed by residential property, commercial plots, or fixed deposits. Delivers the lowest indicative interest rates (7.5% - 9.5%) and maximum limits up to ₹1.5 Crore with flexible 15-year tenures.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0 16px" }}>
                <LenderLogo name="SBI" height={24} />
                <LenderLogo name="Bank of Baroda" height={24} />
                <LenderLogo name="PNB" height={24} />
              </div>
              <ul style={{ margin: "14px 0", fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                <li>Public banks: SBI, Bank of Baroda, PNB</li>
                <li>Up to ₹1.5 Crore sanction limit</li>
                <li>0.50% interest concession for female students</li>
              </ul>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                Learn About Secured Loans →
              </Link>
            </div>

            <div className="card">
              <div className="card-icon" aria-hidden="true">🎓</div>
              <h3>Collateral-Free (Unsecured) Loans</h3>
              <p>
                Zero physical security required. Get sanctions up to ₹75 Lakhs based on university pedigree, STEM degree focus, test scores (GRE/GMAT/IELTS), and co-applicant income.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0 16px" }}>
                <LenderLogo name="HDFC Credila" height={24} />
                <LenderLogo name="Avanse" height={24} />
                <LenderLogo name="Auxilo" height={24} />
              </div>
              <ul style={{ margin: "14px 0", fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                <li>Leading NBFCs: HDFC Credila, Avanse, Auxilo</li>
                <li>Fast digital sanctions in 3 - 5 business days</li>
                <li>Zero physical property pledging</li>
              </ul>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                Explore Collateral-Free Loans →
              </Link>
            </div>

            <div className="card">
              <div className="card-icon" aria-hidden="true">🌐</div>
              <h3>Comprehensive Expense Coverage</h3>
              <p>
                Full financing covering 100% of university tuition fees, living expenses, German Blocked Accounts (Sperrkonto ~€11,904), Canada GIC, health insurance, and return airfare.
              </p>
              <ul style={{ margin: "14px 0", fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
                <li>Direct university tuition wire transfers</li>
                <li>Blocked account & GIC account funding</li>
                <li>Pre-visa disbursement options available</li>
              </ul>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                View Expense Coverage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION F: TOP STUDY DESTINATIONS
          Deep links to verified destination pages
          ================================================================= */}
      <section className="section-alt" id="destinations">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Global Footprint</span>
            <h2>Financing Studies in Top Global Higher-Education Hubs</h2>
            <p className="lead">
              Our partner banks issue official sanction letters recognized by visa officers across all major foreign embassies.
            </p>
          </div>

          <div className="grid-3">
            {destinationsList.slice(0, 6).map((dest) => (
              <div key={dest.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>{dest.flag}</div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "6px" }}>{dest.country}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "12px", minHeight: "42px" }}>
                  {dest.tagline}
                </p>

                <div style={{ fontSize: "0.88rem", lineHeight: "1.6", borderTop: "1px solid var(--line)", paddingTop: "12px", marginBottom: "16px", flex: 1 }}>
                  <div><strong>Avg. Living Cost:</strong> {dest.avgLivingCost}</div>
                  <div><strong>Typical Loan:</strong> {dest.typicalLoanAmount}</div>
                  <div><strong>Work Permit:</strong> {dest.workPermitYears}</div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem", textAlign: "center" }}
                  >
                    {dest.country} Guide →
                  </Link>
                  <Link
                    href={`/match?country=${encodeURIComponent(dest.country)}`}
                    className="btn btn-outline"
                    style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                  >
                    Match
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/destinations" className="btn btn-primary">
              Explore All 40+ Supported Study Abroad Countries
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION G: INTERACTIVE TOOLS & REPAYMENT CALCULATOR
          ================================================================= */}
      <section id="tools">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Interactive Tools</span>
            <h2>Plan Your Repayment & Understand Moratorium Costs</h2>
            <p className="lead">
              Factor in course moratoriums, post-graduation grace periods, and Section 80E tax deductions to calculate your actual monthly liability.
            </p>
          </div>

          {/* Embedded Calculator */}
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Calculator
              initialAmount={3500000}
              initialRate={9.5}
              initialTenureYears={10}
              initialMoratoriumMonths={30}
            />
          </div>

          {/* Two-Stage Matcher Callout Banner */}
          <div
            style={{
              background: "var(--soft)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-lg)",
              padding: "28px 32px",
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "6px" }}>
                ⚡ Want an Instant, Detailed Multi-Bank Shortlist?
              </h3>
              <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", margin: 0 }}>
                Run our Two-Stage Bank Matcher to compare secured vs. unsecured options tailored to your specific university, test scores, and target intake.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/match" className="btn btn-accent" style={{ padding: "12px 24px" }}>
                Run 60s Bank Matcher →
              </Link>
              <Link href="/eligibility" className="btn btn-outline" style={{ padding: "12px 20px" }}>
                Document Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION H: COMPREHENSIVE FAQS (AEO & SEO Optimized)
          ================================================================= */}
      <FAQSection
        title="Frequently Asked Questions on Study Abroad Loans"
        subtitle="Authoritative, transparent answers to the most common questions Indian students and parents ask about overseas education loans."
        faqs={homeFaqs}
      />

      {/* =================================================================
          SECTION I: FINAL CONVERSION CTA SECTION
          ================================================================= */}
      <section style={{ padding: "64px 0 80px" }}>
        <div className="wrap">
          <div
            className="result-highlight-box"
            style={{
              textAlign: "center",
              padding: "54px 32px",
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, #094754 0%, #0d5f70 100%)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(245, 158, 11, 0.2)",
                color: "#f59e0b",
                fontWeight: 700,
                fontSize: "0.85rem",
                padding: "6px 16px",
                borderRadius: "9999px",
                marginBottom: "16px",
                border: "1px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              Get Started Today
            </span>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "16px" }}>
              Planning to Study Abroad? Start Understanding Your Funding Options.
            </h2>
            <p
              className="lead"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                maxWidth: "680px",
                margin: "0 auto 28px",
                fontSize: "1.05rem",
              }}
            >
              Join thousands of Indian students who navigate study abroad financing with clarity, confidence, and zero service fees. Explore public banks, private commercial banks, and NBFCs with 100% virtual guidance.
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="#hero-form"
                className="btn btn-accent"
                style={{ fontSize: "1.05rem", padding: "14px 32px" }}
              >
                Check My Loan Options
              </a>
              <Link
                href="/match"
                className="btn btn-outline"
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                  fontSize: "1.05rem",
                  padding: "14px 28px",
                }}
              >
                Run 60s Matcher
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi, I am planning to study abroad and would like to explore my education loan options with Udaan Edu Loans.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  background: "#25D366",
                  color: "#ffffff",
                  borderColor: "#25D366",
                  fontSize: "1.05rem",
                  padding: "14px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>💬 WhatsApp Advisor</span>
              </a>
            </div>

            <div
              style={{
                fontSize: "0.82rem",
                color: "rgba(255, 255, 255, 0.75)",
                marginTop: "24px",
              }}
            >
              Zero consultation fees • Zero impact on CIBIL score • 100% virtual assistance
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
