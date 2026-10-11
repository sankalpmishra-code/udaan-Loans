import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { universities, getUniversityBySlug } from "@/data/universities";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: Promise<{
    country: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return universities.map((u) => ({
    country: u.country,
    slug: u.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    return {
      title: "University Education Loan Guide | Udaan Loans",
    };
  }

  const bestUnsecured = uni.lenderPolicies[0]?.maxUnsecuredINR || "45 Lakhs";

  return {
    title: `Education Loan for ${uni.name} (${uni.shortName}) | Interest Rates & Eligibility`,
    description: `Complete guide to financing your degree at ${uni.name}. Compare SBI Prime List discounts, unsecured loans up to ${bestUnsecured}, visa fund proof, and realistic living expenses.`,
    keywords: [
      `education loan for ${uni.name}`,
      `${uni.shortName} education loan interest rate`,
      `SBI scholar loan ${uni.name}`,
      `HDFC Credila loan for ${uni.name}`,
      `collateral free loan ${uni.name}`,
      `${uni.name} cost of attendance in INR`,
      `${uni.institutionType} loan funding`,
      `${uni.countryName} student visa loan proof ${uni.shortName}`,
    ],
    alternates: {
      canonical: `/universities/${uni.country}/${uni.slug}`,
    },
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    notFound();
  }

  const getCountryFlag = (country: string) => {
    switch (country) {
      case "uk":
        return "🇬🇧";
      case "germany":
        return "🇩🇪";
      case "ireland":
        return "🇮🇪";
      case "netherlands":
        return "🇳🇱";
      case "france":
        return "🇫🇷";
      case "sweden":
        return "🇸🇪";
      case "italy":
        return "🇮🇹";
      case "switzerland":
        return "🇨🇭";
      case "usa":
        return "🇺🇸";
      case "canada":
        return "🇨🇦";
      case "australia":
        return "🇦🇺";
      default:
        return "🌐";
    }
  };

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        name: uni.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: uni.city,
          addressCountry: uni.countryName,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: uni.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://udaanloans.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Universities",
            item: "https://udaanloans.com/universities",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: uni.name,
            item: `https://udaanloans.com/universities/${uni.country}/${uni.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      <Breadcrumbs
        items={[
          { name: "Universities", url: "/universities" },
          { name: `${getCountryFlag(uni.country)} ${uni.countryName}`, url: "/universities" },
          { name: uni.shortName, url: `/universities/${uni.country}/${uni.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="hero" style={{ padding: "40px 0 50px" }}>
        <div className="wrap">
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
            <span className="badge">
              {getCountryFlag(uni.country)} {uni.countryName}
            </span>
            <span className="badge badge-accent">
              {uni.partnerNetwork}
            </span>
            {uni.qsRank && (
              <span className="badge" style={{ background: "var(--soft)", color: "var(--ink)" }}>
                {typeof uni.qsRank === "number" ? `QS Rank #${uni.qsRank}` : uni.qsRank}
              </span>
            )}
            <span style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
              Verified: {uni.verifiedDate}
            </span>
          </div>

          <h1 style={{ color: "var(--ink)" }}>Education Loan for {uni.name}</h1>
          <p className="lead" style={{ maxWidth: "820px", marginTop: "12px", color: "var(--ink-secondary)" }}>
            {uni.overview}
          </p>

          {/* Quick Metrics Bar */}
          <div className="stats-grid" style={{ marginTop: "28px" }}>
            <div className="card text-center" style={{ padding: "20px", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", textTransform: "uppercase", fontWeight: 700 }}>
                Annual Tuition Fee
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)", marginTop: "4px" }}>
                {uni.tuitionRangeINR}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "4px" }}>
                {uni.currencySymbol}{uni.tuitionAnnual.toLocaleString()} {uni.currency}/yr
              </div>
            </div>

            <div className="card text-center" style={{ padding: "20px", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", textTransform: "uppercase", fontWeight: 700 }}>
                Estimated Living Costs
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)", marginTop: "4px" }}>
                {uni.livingCostINR}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "4px" }}>
                {uni.currencySymbol}{uni.livingCostAnnual.toLocaleString()} {uni.currency}/yr
              </div>
            </div>

            <div className="card text-center" style={{ padding: "20px", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", textTransform: "uppercase", fontWeight: 700 }}>
                Total Annual Budget
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>
                {uni.totalAnnualCostINR}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#10b981", marginTop: "4px", fontWeight: 600 }}>
                100% Loan Available
              </div>
            </div>

            <div className="card text-center" style={{ padding: "20px", background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", textTransform: "uppercase", fontWeight: 700 }}>
                Lender Prime Status
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--accent, #f59e0b)", marginTop: "4px" }}>
                {uni.primeTierCategory}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "4px" }}>
                Lowest Interest Slabs
              </div>
            </div>
          </div>

          <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href={`/match?dest=${encodeURIComponent(uni.countryName)}&univ=${encodeURIComponent(uni.name)}`}
              className="btn btn-accent"
            >
              Match Eligible Banks for {uni.shortName} →
            </Link>
            <Link
              href="/calculator"
              className="btn btn-outline"
            >
              Calculate Moratorium EMI
            </Link>
          </div>
        </div>
      </section>

      {/* Lender Comparison Matrix */}
      <section className="section-alt" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Lender Intelligence</span>
            <h2 style={{ color: "var(--ink)" }}>Partner Bank & NBFC Policies for {uni.name}</h2>
            <p className="lead" style={{ color: "var(--ink-secondary)" }}>
              Verified lender rules, interest rate concessions, and maximum sanction thresholds mapped for {uni.shortName} admits.
            </p>
          </div>

          <div className="table-scroll" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "12px", boxShadow: "var(--shadow-sm)", padding: "12px" }}>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Prime Classification</th>
                  <th>Max Unsecured</th>
                  <th>Max Secured</th>
                  <th>Indicative Rates</th>
                  <th>Special Concession / Benefit</th>
                </tr>
              </thead>
              <tbody>
                {uni.lenderPolicies.map((policy) => (
                  <tr key={policy.name}>
                    <td><strong style={{ color: "var(--ink)" }}>{policy.name}</strong></td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: "0.78rem" }}>
                        {policy.primeListStatus}
                      </span>
                    </td>
                    <td><strong style={{ color: "#10b981" }}>{policy.maxUnsecuredINR}</strong></td>
                    <td style={{ color: "var(--ink)" }}>{policy.maxSecuredINR}</td>
                    <td><strong style={{ color: "var(--accent, #f59e0b)" }}>{policy.indicativeRate}</strong></td>
                    <td style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>{policy.specialBenefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "16px", fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
            *Rates and loan caps are subject to co-applicant credit score (CIBIL 685+), student academic GPA, and lender underwriting audit as of {uni.verifiedDate}.
          </div>
        </div>
      </section>

      {/* Visa & Fund Proof Guidelines */}
      <section style={{ padding: "50px 0 60px" }}>
        <div className="wrap">
          <div className="grid-2">
            <div className="card" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
              <span className="badge badge-accent">Mandatory Visa Compliance</span>
              <h3 style={{ marginTop: "10px", color: "var(--ink)" }}>{uni.visaRequirements.documentName}</h3>
              <p style={{ color: "var(--ink-secondary)", margin: "10px 0 16px" }}>
                <strong>Required Liquid Funds:</strong> {uni.visaRequirements.requiredFundsINR}
              </p>
              <ul style={{ fontSize: "0.92rem", lineHeight: "1.7", paddingLeft: "18px", color: "var(--ink)" }}>
                {uni.visaRequirements.guidelines.map((g, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{g}</li>
                ))}
              </ul>
              <div style={{ marginTop: "20px", background: "var(--soft)", border: "1px solid var(--line)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.85rem", color: "var(--ink)" }}>
                💡 <strong>Udaan Assistance:</strong> We coordinate with banks to provide embassy-compliant pre-visa disbursement, Canadian GIC remittance, German Sperrkonto transfers, or unencumbered CAS/DHA/IND sanction letters within 3–5 working days.
              </div>
            </div>

            <div className="card" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
              <span className="badge">High-ROI Programs</span>
              <h3 style={{ marginTop: "10px", color: "var(--ink)" }}>Top Funded Programs at {uni.shortName}</h3>
              <p style={{ color: "var(--ink-secondary)", margin: "10px 0 16px" }}>
                Graduates from these programs command median starting salaries that enable accelerated loan repayment:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {uni.popularPrograms.map((prog, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--soft)",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)" }}>{prog.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>{prog.degree} • {prog.duration}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)" }}>{prog.estimatedCostINR}</div>
                      <div style={{ fontSize: "0.75rem", color: "#10b981" }}>Total Cost</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Specific FAQs */}
      <FAQSection
        title={`Frequently Asked Questions: Education Loans for ${uni.name}`}
        subtitle={`Key queries regarding lender eligibility, visa fund proof, blocked accounts, and collateral for ${uni.shortName}.`}
        faqs={uni.faqs}
        id="uni-faqs"
      />

      {/* Bottom CTA Banner */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Get Pre-Sanctioned for {uni.name}</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "620px", margin: "0 auto 20px" }}>
              Don&apos;t wait for your visa deadline. Start your loan application now to lock in prime interest concessions and secure your financial documents on time.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href={`/apply?country=${encodeURIComponent(uni.countryName)}&university=${encodeURIComponent(uni.name)}`}
                className="btn btn-accent"
              >
                Apply for {uni.shortName} Loan Now →
              </Link>
              <Link href="/universities" className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>
                ← Browse Other Universities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
