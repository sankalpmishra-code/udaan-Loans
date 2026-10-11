import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { destinationsList } from "@/data/destinations";
import { destinationsFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Study Abroad Education Loans: USA, UK, Canada, Germany & 40+ Countries",
  description:
    "Explore education loan requirements, visa proof of funds rules, tuition and living cost estimates for studying in the USA, UK, Canada, Australia, Germany, and 40+ countries.",
  keywords: [
    "education loan for USA MS",
    "education loan for UK student visa",
    "education loan for Canada GIC",
    "education loan for Germany blocked account",
    "study abroad loan requirements by country",
    "visa proof of funds education loan",
  ],
  alternates: {
    canonical: "/destinations",
  },
};

export default function DestinationsPage() {
  const regions = [
    {
      name: "North America",
      countries: ["United States", "Canada"],
    },
    {
      name: "Europe",
      countries: [
        "United Kingdom", "Germany", "Ireland", "France", "Netherlands", "Sweden",
        "Switzerland", "Italy", "Spain", "Denmark", "Finland", "Norway", "Austria",
        "Belgium", "Poland", "Portugal", "Czech Republic", "Hungary", "Lithuania",
        "Latvia", "Estonia", "Malta", "Cyprus", "Georgia"
      ],
    },
    {
      name: "Asia Pacific",
      countries: [
        "Australia", "New Zealand", "Singapore", "Japan", "South Korea",
        "Hong Kong", "Malaysia", "Philippines", "Uzbekistan", "Kazakhstan", "Kyrgyzstan"
      ],
    },
    {
      name: "Middle East & Africa",
      countries: ["United Arab Emirates", "Mauritius"],
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Study Destinations", url: "/destinations" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Global University Coverage</span>
            <h1>Study Abroad Education Loans by Destination</h1>
            <p className="lead">
              Every country imposes distinct financial proof and visa guidelines.
              We ensure your education loan sanction letter strictly aligns with embassy criteria,
              from <strong>US I-20 proof of funds</strong> to <strong>German Blocked Accounts</strong> and <strong>Canadian GIC deposits</strong>.
            </p>
          </div>

          {/* Top Country Detailed Cards */}
          <div className="destinations-grid" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {destinationsList.map((dest) => (
              <div key={dest.id} id={dest.id} className="card" style={{ padding: "32px", borderLeft: "5px solid var(--brand)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "2.8rem" }}>{dest.flag}</span>
                    <div>
                      <h2 style={{ fontSize: "1.7rem", marginBottom: "2px" }}>Education Loan for {dest.country}</h2>
                      <span className="badge" style={{ marginBottom: "0" }}>Recognized for Student Visa</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Link href={`/destinations/${dest.id}`} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
                      View Full {dest.country} Guide →
                    </Link>
                    <Link href={`/match?country=${encodeURIComponent(dest.country)}`} className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
                      Run Matcher
                    </Link>
                    <Link href={`/apply?destination=${encodeURIComponent(dest.country)}`} className="btn btn-accent" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
                      Apply
                    </Link>
                  </div>
                </div>

                <div className="grid-3" style={{ marginTop: "20px" }}>
                  <div style={{ background: "var(--soft)", padding: "16px", borderRadius: "8px" }}>
                    <strong>Average Annual Tuition</strong>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--brand)", marginTop: "4px" }}>
                      {dest.avgTuition}
                    </div>
                  </div>
                  <div style={{ background: "var(--soft)", padding: "16px", borderRadius: "8px" }}>
                    <strong>Average Annual Living Cost</strong>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--brand)", marginTop: "4px" }}>
                      {dest.avgLivingCost}
                    </div>
                  </div>
                  <div style={{ background: "var(--soft)", padding: "16px", borderRadius: "8px" }}>
                    <strong>Typical Loan Requirement</strong>
                    <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--brand)", marginTop: "4px" }}>
                      {dest.typicalLoanAmount}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <h4>Embassy Financial & Visa Proof Requirements:</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", marginTop: "6px" }}>
                    {dest.visaFundRequirements}
                  </p>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <h4>Key Loan Features for {dest.country}:</h4>
                  <ul style={{ display: "flex", flexWrap: "wrap", gap: "16px", listStyle: "none", padding: "0", marginTop: "8px" }}>
                    {dest.loanHighlights.map((hl, i) => (
                      <li key={i} className="badge-pill">✓ {hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory of 40+ Supported Countries */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Worldwide Network</span>
            <h2>All 40+ Supported Study Abroad Destinations</h2>
            <p className="lead">
              Our partner lenders fund accredited higher education programs across every safe and recognized global study destination.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {regions.map((reg) => (
              <div key={reg.name} className="card">
                <h3>{reg.name}</h3>
                <ul className="badge-pill-list" style={{ marginTop: "14px" }}>
                  {reg.countries.map((c) => (
                    <li key={c} className="badge-pill">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Study Abroad Destinations"
        subtitle="Embassy fund rules, blocked accounts, GIC transfers, and country-specific loan details."
        faqs={destinationsFaqs}
        id="destinations-faq"
      />

      {/* Bottom CTA */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Received an Admit from an Overseas University?</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Get your official pre-visa loan sanction letter in as little as 3 business days.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Start Free Visa-Proof Loan Application →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
