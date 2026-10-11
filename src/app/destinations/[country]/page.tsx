import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { destinationsList, getDestinationById } from "@/data/destinations";
import { getUniversitiesByCountry, CountryCode } from "@/data/universities";
import { siteConfig } from "@/data/siteConfig";

interface PageProps {
  params: Promise<{
    country: string;
  }>;
}

export async function generateStaticParams() {
  return destinationsList.map((d) => ({
    country: d.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const dest = getDestinationById(country);

  if (!dest) {
    return {
      title: "Study Abroad Destination Guide | Udaan Edu Loans",
    };
  }

  const title = `Education Loan for Study in ${dest.country} | Interest Rates, Visa Funds & Lenders`;
  const description = `Compare education loan options for studying in ${dest.country}. Collateral-free loans up to ₹75 Lakhs, interest rates from 8.15%, visa financial proof rules, and fast 3-day sanction letters from 30+ RBI-recognized lenders.`;

  return {
    title,
    description,
    keywords: [
      `education loan for ${dest.country}`,
      `study abroad loan ${dest.country}`,
      `collateral free education loan ${dest.country}`,
      `${dest.country} student visa proof of funds`,
      `${dest.country} education loan interest rates 2026`,
      `SBI education loan for ${dest.country}`,
      `HDFC Credila loan ${dest.country}`,
    ],
    alternates: {
      canonical: `/destinations/${dest.id}`,
    },
    openGraph: {
      title: `${title} | Udaan Edu Loans`,
      description,
      url: `${siteConfig.url}/destinations/${dest.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Udaan Edu Loans`,
      description,
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { country } = await params;
  const dest = getDestinationById(country);

  if (!dest) {
    notFound();
  }

  // Get curated universities for this destination
  const uniCountryCode = dest.id as CountryCode;
  const countryUniversities = getUniversitiesByCountry(uniCountryCode);

  // Structured Data (BreadcrumbList + FAQPage)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study Destinations",
        item: `${siteConfig.url}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dest.country,
        item: `${siteConfig.url}/destinations/${dest.id}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dest.faqs.map((faq) => ({
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
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Breadcrumbs
        items={[
          { name: "Destinations", url: "/destinations" },
          { name: dest.country, url: `/destinations/${dest.id}` },
        ]}
      />

      {/* Hero Section */}
      <section className="hero" style={{ padding: "48px 0 60px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ maxWidth: "880px", margin: "0 auto 36px" }}>
            <span className="badge" style={{ fontSize: "0.95rem" }}>
              {dest.flag} Comprehensive Study Abroad Financing Guide
            </span>
            <h1 style={{ fontSize: "2.35rem", marginTop: "12px", lineHeight: "1.25" }}>
              Education Loan for Study in {dest.country}
            </h1>
            <p className="lead" style={{ fontSize: "1.1rem", marginTop: "12px" }}>
              {dest.tagline}
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
              <Link
                href={`/match?country=${encodeURIComponent(dest.country)}`}
                className="btn btn-accent"
                style={{ padding: "12px 28px", fontSize: "1rem" }}
              >
                Match Lenders for {dest.country} →
              </Link>
              <Link
                href={`/apply?destination=${encodeURIComponent(dest.country)}`}
                className="btn btn-outline"
                style={{ padding: "12px 24px", fontSize: "1rem" }}
              >
                Apply for Free Advisory
              </Link>
              <Link
                href="/calculator"
                className="btn btn-outline"
                style={{ padding: "12px 24px", fontSize: "1rem" }}
              >
                Calculate Monthly EMI
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid-4" style={{ marginTop: "20px" }}>
            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🎓</div>
              <strong style={{ fontSize: "0.88rem", color: "var(--muted)", textTransform: "uppercase" }}>Average Annual Tuition</strong>
              <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--brand)", marginTop: "4px" }}>
                {dest.avgTuition}
              </div>
            </div>

            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🏡</div>
              <strong style={{ fontSize: "0.88rem", color: "var(--muted)", textTransform: "uppercase" }}>Annual Living Expenses</strong>
              <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--brand)", marginTop: "4px" }}>
                {dest.avgLivingCost}
              </div>
            </div>

            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>💳</div>
              <strong style={{ fontSize: "0.88rem", color: "var(--muted)", textTransform: "uppercase" }}>Typical Loan Amount</strong>
              <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--brand)", marginTop: "4px" }}>
                {dest.typicalLoanAmount}
              </div>
            </div>

            <div className="card text-center" style={{ padding: "24px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>💼</div>
              <strong style={{ fontSize: "0.88rem", color: "var(--muted)", textTransform: "uppercase" }}>Post-Study Work Permit</strong>
              <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--brand)", marginTop: "4px" }}>
                {dest.workPermitYears}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embassy Visa & Proof of Funds Breakdown */}
      <section className="section-alt">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="badge badge-accent">Visa & Financial Compliance</span>
              <h2 style={{ fontSize: "1.85rem", marginTop: "8px" }}>
                Embassy Financial Requirements for {dest.country} Student Visa
              </h2>
              <p style={{ lineHeight: "1.7", fontSize: "1rem", color: "var(--ink-secondary)", marginTop: "12px" }}>
                {dest.embassyFinancialOverview}
              </p>

              <div style={{ background: "var(--soft)", padding: "20px 24px", borderRadius: "10px", marginTop: "20px", borderLeft: "4px solid var(--accent)" }}>
                <strong style={{ color: "var(--ink)", fontSize: "0.95rem" }}>Mandatory Proof of Funds Rule:</strong>
                <p style={{ margin: "6px 0 0", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: "1.5" }}>
                  {dest.visaFundRequirements}
                </p>
              </div>

              <div style={{ marginTop: "24px" }}>
                <Link
                  href={`/match?country=${encodeURIComponent(dest.country)}`}
                  className="btn btn-primary"
                >
                  Verify Your Visa Fund Eligibility →
                </Link>
              </div>
            </div>

            <div className="card" style={{ padding: "32px", background: "var(--surface)" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>Key Loan Advantages for {dest.country}</h3>
              <ul style={{ listStyle: "none", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                {dest.loanHighlights.map((highlight, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--success)", fontWeight: "bold" }}>✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "20px 0" }} />

              <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: "1.6" }}>
                <strong>Audited Lending Spread:</strong> All partner banks provide formal sanction letters that explicitly satisfy embassy financial inspection standards.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Lenders Comparison Table */}
      <section style={{ padding: "64px 0" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ maxWidth: "800px", margin: "0 auto 36px" }}>
            <span className="badge">Lender Network</span>
            <h2>Top Lenders Offering Education Loans for {dest.country}</h2>
            <p className="lead">
              Verified borrowing rules, maximum loan limits, and interest rates published as of Q4 2025 - Q1 2026.
            </p>
          </div>

          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lending Institution</th>
                  <th>Institution Type</th>
                  <th>Indicative Rates</th>
                  <th>Max Unsecured Limit</th>
                  <th>Max Secured Limit</th>
                  <th>Sanction Time</th>
                  <th>Key Strength</th>
                </tr>
              </thead>
              <tbody>
                {dest.topLenders.map((lender, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{lender.name}</strong>
                    </td>
                    <td>
                      <span className="badge" style={{ fontSize: "0.78rem" }}>{lender.category}</span>
                    </td>
                    <td style={{ color: "var(--brand)", fontWeight: "700" }}>
                      {lender.indicativeRate}
                    </td>
                    <td>{lender.maxUnsecured}</td>
                    <td>{lender.maxSecured}</td>
                    <td>{lender.processingDays}</td>
                    <td style={{ fontSize: "0.88rem" }}>{lender.keyAdvantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <Link href="/lenders" className="btn btn-outline" style={{ marginRight: "12px" }}>
              Compare All 30+ Lenders
            </Link>
            <Link href={`/match?country=${encodeURIComponent(dest.country)}`} className="btn btn-accent">
              Run 60-Second Match for {dest.country} →
            </Link>
          </div>
        </div>
      </section>

      {/* Top Universities in Country */}
      {countryUniversities.length > 0 && (
        <section className="section-alt">
          <div className="wrap">
            <div className="section-head text-center">
              <span className="badge">University Network</span>
              <h2>Premier {dest.country} Universities We Fund</h2>
              <p className="lead">
                Explore dedicated loan guidelines, prime-tier rate discounts, and living expense benchmarks for top institutions.
              </p>
            </div>

            <div className="grid-3">
              {countryUniversities.slice(0, 6).map((u) => (
                <div key={u.slug} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <span className="badge badge-accent" style={{ fontSize: "0.78rem" }}>{u.partnerNetwork}</span>
                      <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>📍 {u.city}</span>
                    </div>
                    <h3 style={{ fontSize: "1.15rem", margin: "4px 0 8px" }}>{u.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: "1.5" }}>
                      Max Unsecured: <strong>{u.lenderPolicies[0]?.maxUnsecuredINR || "₹50 Lakhs"}</strong> • Prime Status: <strong>{u.lenderPolicies[0]?.primeListStatus || "Concessional"}</strong>
                    </p>
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <Link
                      href={`/universities/${u.country}/${u.slug}`}
                      className="btn btn-outline full-width"
                      style={{ fontSize: "0.85rem", padding: "8px 12px" }}
                    >
                      View {u.shortName} Loan Guide →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link href="/universities" className="btn btn-primary">
                View All Global Universities Directory →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Popular Programs */}
      <section style={{ padding: "56px 0" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ maxWidth: "760px", margin: "0 auto 32px" }}>
            <span className="badge">In-Demand Courses</span>
            <h2>Top Academic Disciplines for Indian Scholars in {dest.country}</h2>
            <p className="lead">
              Lenders prioritize loans for programs with demonstrated return on investment and high graduate starting compensation.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {dest.popularCourses.map((course, idx) => (
              <span
                key={idx}
                style={{
                  background: "var(--soft)",
                  padding: "10px 18px",
                  borderRadius: "20px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "var(--ink)",
                  border: "1px solid var(--line)",
                }}
              >
                🎯 {course}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Country FAQs */}
      <FAQSection
        title={`Frequently Asked Questions on ${dest.country} Education Loans`}
        subtitle={`Everything Indian students and parents must know about visas, collateral, blocked accounts, and disbursal for ${dest.country}.`}
        faqs={dest.faqs}
        id="country-faqs"
      />

      {/* Final Action Highlight */}
      <section>
        <div className="wrap">
          <div
            className="result-highlight-box text-center"
            style={{ padding: "48px 32px", borderRadius: "var(--radius-lg)" }}
          >
            <h2>Plan Your Study in {dest.country} with Confidence</h2>
            <p
              className="lead"
              style={{ color: "rgba(255,255,255,0.9)", maxWidth: "650px", margin: "0 auto 24px" }}
            >
              Get pre-visa sanction letters, transparent interest rate comparisons, and 100% virtual, paperless advisory across India.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href={`/apply?destination=${encodeURIComponent(dest.country)}`}
                className="btn btn-accent"
                style={{ fontSize: "1.05rem", padding: "12px 28px" }}
              >
                Apply for {dest.country} Loan Consultation →
              </Link>
              <Link
                href={`/match?country=${encodeURIComponent(dest.country)}`}
                className="btn btn-outline"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
              >
                Run Bank Matcher
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
