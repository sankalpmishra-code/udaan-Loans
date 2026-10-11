import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import FAQSection from "@/components/FAQSection";
import { homeFaqs } from "@/data/faqs";
import { lendersList } from "@/data/lenders";
import { destinationsList } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Education Loan for Study Abroad | Compare 30+ Banks & NBFCs",
  description:
    "Apply for study abroad education loans with or without collateral up to ₹1.5 Crore. Compare SBI, Bank of Baroda, HDFC Credila, Avanse, and ICICI at lowest interest rates from 7.5%. Fast 3-day sanction.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-content">
            <span className="badge">100% Free Advisory for Indian Students</span>
            <h1>Your Admission Letter is In. Let’s Fund the Rest.</h1>
            <p className="lead">
              Udaan Edu Loans facilitates overseas education loans for students heading to the
              <strong> USA, UK, Canada, Australia, Germany</strong>, and 40+ other countries.
              We match your profile with 30+ top banks and NBFCs, negotiate competitive interest rates
              starting from <strong>7.5% to 12.5%</strong>, and manage paperwork end-to-end.
            </p>

            <div className="hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
              <Link href="/match" className="btn btn-accent" style={{ padding: "12px 24px", fontSize: "1rem" }}>
                ⚡ Run 60s Bank Matcher
              </Link>
              <Link href="/apply" className="btn btn-outline" style={{ padding: "12px 22px", fontSize: "1rem" }}>
                Check Eligibility & Apply
              </Link>
              <Link href="/calculator" className="btn btn-outline" style={{ padding: "12px 20px", fontSize: "1rem" }}>
                EMI Calculator
              </Link>
            </div>

            <ul className="trust-pills">
              <li>Rates from 7.5% p.a.</li>
              <li>Up to ₹1.5 Crore</li>
              <li>Collateral-Free up to ₹75L</li>
              <li>30+ Lenders Compared</li>
              <li>Zero Platform Fees</li>
            </ul>
          </div>

          {/* Embedded Calculator */}
          <div className="hero-calculator">
            <Calculator initialAmount={3500000} initialRate={9.5} initialTenureYears={10} initialMoratoriumMonths={30} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-banner">
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat-block">
              <strong>7.5% - 12.5%</strong>
              <span>Indicative Floating Interest Rates</span>
            </div>
            <div className="stat-block">
              <strong>₹1.5 Crore</strong>
              <span>Maximum Loan Amount Available</span>
            </div>
            <div className="stat-block">
              <strong>40+ Destinations</strong>
              <span>USA, UK, Canada, Germany & More</span>
            </div>
            <div className="stat-block">
              <strong>30+ Lenders</strong>
              <span>Public, Private Banks & Global NBFCs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Options Overview */}
      <section className="section-alt" id="loans">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Tailored Financing</span>
            <h2>Education Loan Options We Help You Secure</h2>
            <p className="lead">
              Whether you possess ancestral property, fixed deposits, or seek a 100% collateral-free loan
              backed solely by student potential, we match you with the right institutional partner.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🏛️</div>
              <h3>Secured Education Loans</h3>
              <p>
                Backed by residential property, commercial plots, or fixed deposits. Delivers the lowest
                interest rates (7.5% - 9.5%) and maximum limits up to ₹1.5 Crore with flexible 15-year tenures.
              </p>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                Learn About Secured Loans →
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>Collateral-Free Loans</h3>
              <p>
                Zero physical security required. Get sanctions up to ₹75 Lakhs based on university pedigree,
                GRE/IELTS test scores, and co-applicant income. Approved in as fast as 3 to 5 business days.
              </p>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                Explore Collateral-Free →
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">⚡</div>
              <h3>Specialized Top-Ups & Forex</h3>
              <p>
                Short-term financing for German Blocked Accounts (Sperrkonto), Canada GIC, air tickets,
                SEVIS fees, and initial campus deposits. Integrated with discounted forex cards.
              </p>
              <Link href="/loans" className="btn btn-outline" style={{ marginTop: "16px" }}>
                View Expense Coverage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Study Destinations Preview */}
      <section id="destinations">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Global Footprint</span>
            <h2>Funding Studies in Top Global Higher-Education Hubs</h2>
            <p className="lead">
              Our partner banks issue official sanction letters recognized by visa officers across all major embassies.
            </p>
          </div>

          <div className="grid-3">
            {destinationsList.slice(0, 6).map((dest) => (
              <div key={dest.id} className="card">
                <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>{dest.flag}</div>
                <h3>{dest.country}</h3>
                <p><strong>Avg. Living Cost:</strong> {dest.avgLivingCost}</p>
                <p><strong>Typical Loan:</strong> {dest.typicalLoanAmount}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                  <Link href={`/destinations/${dest.id}`} className="btn btn-primary" style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem", textAlign: "center" }}>
                    {dest.country} Guide →
                  </Link>
                  <Link href={`/match?country=${encodeURIComponent(dest.country)}`} className="btn btn-outline" style={{ padding: "8px 12px", fontSize: "0.85rem" }}>
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

      {/* Compare Partner Lenders Teaser */}
      <section className="section-alt" id="lenders">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Lender Network</span>
            <h2>Compare Offers from 30+ Public, Private & NBFC Lenders</h2>
            <p className="lead">
              We work with India’s most trusted banking partners to ensure you get transparent quotes and fair terms.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <h3>Public Sector Banks</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Lowest interest rates, 0.5% girl student concessions, and 15-year tenures:
              </p>
              <ul style={{ margin: "14px 0", fontSize: "0.92rem" }}>
                <li>State Bank of India (SBI Global Ed-vantage)</li>
                <li>Bank of Baroda (Baroda Scholar)</li>
                <li>Punjab National Bank (PNB Udaan)</li>
                <li>Canara Bank & Union Bank of India</li>
              </ul>
              <Link href="/lenders" className="btn btn-outline full-width">
                Compare Public Banks →
              </Link>
            </div>

            <div className="card">
              <h3>Private Commercial Banks</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Rapid pre-visa approvals, high loan limits, and minimal branch visits:
              </p>
              <ul style={{ margin: "14px 0", fontSize: "0.92rem" }}>
                <li>HDFC Bank (Overseas Student Loan)</li>
                <li>ICICI Bank (Education Loan Abroad)</li>
                <li>Axis Bank & Kotak Mahindra Bank</li>
                <li>IDFC FIRST Bank & Federal Bank</li>
              </ul>
              <Link href="/lenders" className="btn btn-outline full-width">
                Compare Private Banks →
              </Link>
            </div>

            <div className="card">
              <h3>Leading NBFCs & Fintechs</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Up to ₹75 Lakhs without collateral, 100% expense funding, and quick sanctions:
              </p>
              <ul style={{ margin: "14px 0", fontSize: "0.92rem" }}>
                <li>HDFC Credila (Specialist Education NBFC)</li>
                <li>Avanse Financial Services</li>
                <li>Auxilo Finserve & InCred Finance</li>
                <li>MPOWER Financing (No Cosigner USD Loans)</li>
              </ul>
              <Link href="/lenders" className="btn btn-outline full-width">
                Compare NBFCs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section id="process">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Simple & Fast</span>
            <h2>From Application to Overseas Disbursal in 5 Steps</h2>
            <p className="lead">
              Our specialized advisors manage all documentation, legal verifications, and embassy proof of funds.
            </p>
          </div>

          <ol className="timeline-steps" style={{ margin: "0 auto" }}>
            <li className="timeline-step">
              <h3>1. Share Your Profile & Admit Details</h3>
              <p>Tell us your target country, course, and loan requirement in under 3 minutes.</p>
            </li>
            <li className="timeline-step">
              <h3>2. Receive Tailored Bank Shortlists</h3>
              <p>Your dedicated loan advisor compares 30+ lenders to match you with the lowest rate options.</p>
            </li>
            <li className="timeline-step">
              <h3>3. Digital Document Submission</h3>
              <p>Upload KYC, academic scorecards, and co-applicant income papers via our secure portal.</p>
            </li>
            <li className="timeline-step">
              <h3>4. Official Loan Sanction Letter</h3>
              <p>Receive your formal sanction letter within 3 to 7 working days to use for your visa interview.</p>
            </li>
            <li className="timeline-step">
              <h3>5. International Disbursal</h3>
              <p>Tuition fees are wired directly to your overseas university, and living expenses are loaded onto your forex card.</p>
            </li>
          </ol>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/process" className="btn btn-primary">
              View Detailed Timeline & Document Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="section-alt" id="stories">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Student Success</span>
            <h2>Over 4,500+ Students Funded Worldwide</h2>
            <p className="lead">Hear from students who successfully secured education loans through Udaan Edu Loans.</p>
          </div>

          <div className="grid-4">
            <div className="card">
              <div style={{ color: "var(--accent)", fontSize: "1.2rem", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                &ldquo;I had my SBI sanction letter well before my US F-1 visa appointment. Udaan Edu Loans handled all the branch coordination.&rdquo;
              </p>
              <strong>Rahul Sharma</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>MS in CS, Northeastern University (USA)</div>
            </div>

            <div className="card">
              <div style={{ color: "var(--accent)", fontSize: "1.2rem", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                &ldquo;Saved me weeks of running around banks. Got a collateral-free loan of ₹45 Lakhs approved in 4 days with HDFC Credila.&rdquo;
              </p>
              <strong>Ananya Mukherjee</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>MSc Finance, King’s College London (UK)</div>
            </div>

            <div className="card">
              <div style={{ color: "var(--accent)", fontSize: "1.2rem", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                &ldquo;They helped disburse my living expenses directly into the German Blocked Account (Sperrkonto). Flawless experience.&rdquo;
              </p>
              <strong>Karan Patel</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Automotive Engineering, TU Munich (Germany)</div>
            </div>

            <div className="card">
              <div style={{ color: "var(--accent)", fontSize: "1.2rem", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                &ldquo;The advisor explained Section 80E tax benefits and moratorium interest so transparently. Highly recommended!&rdquo;
              </p>
              <strong>Sneha Reddy</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Data Analytics, University of Toronto (Canada)</div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO & SEO FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions on Study Abroad Loans"
        subtitle="Authoritative answers to the most common questions Indian students ask about overseas education loans."
        faqs={homeFaqs}
      />

      {/* Call to Action Banner */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box" style={{ textAlign: "center", padding: "48px 32px", borderRadius: "var(--radius-lg)" }}>
            <h2>Ready to Fund Your Global Education?</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "650px", margin: "0 auto 24px" }}>
              Get a customized loan comparison, check your eligibility without hurting your CIBIL score, and fast-track your sanction letter today.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn btn-accent" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
                Apply Now - 100% Free
              </Link>
              <Link href="/eligibility" className="btn btn-outline" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
                View Document Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
