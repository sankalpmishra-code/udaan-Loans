import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import LenderLogo from "@/components/LenderLogo";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/EditorialByline";
import { lendersList } from "@/data/lenders";
import { lendersFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Compare 30+ Study Abroad Education Loan Lenders: SBI, HDFC Credila, Avanse",
  description:
    "Compare education loan interest rates, collateral requirements, and processing times across 30+ Indian public banks, private banks, and NBFCs.",
  keywords: [
    "compare study abroad education loans India",
    "SBI vs HDFC Credila education loan",
    "Bank of Baroda education loan interest rate",
    "best NBFC for abroad education loan",
    "unsecured education loan lenders list",
    "Avanse vs Auxilo education loan",
  ],
  alternates: {
    canonical: "/lenders",
  },
  openGraph: {
    title: "Compare 30+ Study Abroad Education Loan Lenders | Udaan Edu Loans",
    description:
      "Compare interest rates, collateral terms, and turnaround times across 30+ verified Indian banks and NBFCs.",
    url: `${siteConfig.url}/lenders`,
    type: "website",
  },
};

export default function LendersPage() {
  const publicBanks = [
    "State Bank of India (SBI)", "Bank of Baroda", "Punjab National Bank (PNB)",
    "Canara Bank", "Union Bank of India", "Bank of India", "Indian Bank",
    "Central Bank of India", "Indian Overseas Bank", "Bank of Maharashtra",
    "UCO Bank", "Punjab & Sind Bank"
  ];

  const privateBanks = [
    "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
    "IDFC FIRST Bank", "Federal Bank", "South Indian Bank", "Karnataka Bank",
    "Yes Bank", "IndusInd Bank", "RBL Bank", "Bandhan Bank"
  ];

  const nbfcs = [
    "HDFC Credila", "Avanse Financial Services", "Auxilo Finserve",
    "InCred Finance", "Poonawalla Fincorp", "Prodigy Finance",
    "MPOWER Financing", "Propelld", "Tata Capital", "Bajaj Finserv"
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Overseas Study Abroad Education Loan Lenders in India",
    description: "Verified directory of 30+ public sector banks, private commercial banks, and education NBFCs in India.",
    itemListElement: lendersList.map((lender, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: lender.name,
      url: `${siteConfig.url}/lenders/${lender.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={[{ name: "Compare Lenders", url: "/lenders" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Transparent Lending Network</span>
            <h1>Compare Education Loan Offers from 30+ Major Lenders</h1>
            <p className="lead">
              Udaan Edu Loans partners with leading Indian scheduled commercial banks and specialized education NBFCs.
              Compare interest rates, loan ceilings, margin money rules, and speed to secure the ideal financial partner.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              <Link href="/compare-lenders" className="btn btn-primary" style={{ fontSize: "0.95rem" }}>
                Public vs Private vs NBFC Side-by-Side Analysis →
              </Link>
              <Link href="/match" className="btn btn-outline" style={{ fontSize: "0.95rem" }}>
                60-Second Lender Matcher
              </Link>
            </div>
          </div>

          <EditorialByline
            reviewerName="Udaan Banking & Credit Advisory Committee"
            reviewerTitle="Accredited Education Loan Underwriting Specialists"
            lastUpdated="October 2026"
          />

          {/* Master Comparison Table */}
          <div className="data-table-wrapper" style={{ marginTop: "20px" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lending Institution</th>
                  <th>Category</th>
                  <th>Interest Rate (p.a.)</th>
                  <th>Collateral-Free Limit</th>
                  <th>Secured Limit</th>
                  <th>Processing Time</th>
                  <th>Margin Money</th>
                  <th>Scheme Details</th>
                </tr>
              </thead>
              <tbody>
                {lendersList.map((lender) => (
                  <tr key={lender.name}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "220px" }}>
                        <LenderLogo name={lender.name} logo={lender.logo} height={32} />
                        <div>
                          <Link
                            href={`/lenders/${lender.slug}`}
                            style={{ display: "block", color: "var(--brand)", fontWeight: 700, textDecoration: "underline" }}
                          >
                            {lender.name}
                          </Link>
                          <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "4px" }}>
                            {lender.highlights.join(" • ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge" style={{ marginBottom: "0", fontSize: "0.78rem" }}>{lender.category}</span></td>
                    <td className="text-green" style={{ fontWeight: "700" }}>{lender.interestRate}</td>
                    <td>{lender.maxUnsecured}</td>
                    <td>{lender.maxSecured}</td>
                    <td>{lender.processingTime}</td>
                    <td>{lender.marginMoney}</td>
                    <td>
                      <Link
                        href={`/lenders/${lender.slug}`}
                        className="btn btn-outline"
                        style={{ padding: "4px 10px", fontSize: "0.78rem", whiteSpace: "nowrap" }}
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Categorized Directory */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Institutions by Type</span>
            <h2>Our Comprehensive Banking & NBFC Network</h2>
            <p className="lead">
              Whether you need public sector subsidies or private fintech agility, we have direct integrations.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="card-icon">🏛️</div>
              <h3>12 Public Sector Banks</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Government-backed safety, lowest floating rates, and Central Scheme for Interest Subsidy (CSIS) eligibility:
              </p>
              <ul className="badge-pill-list" style={{ marginTop: "16px" }}>
                {publicBanks.map((b) => (
                  <li key={b} className="badge-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <LenderLogo name={b} height={18} variant="plain" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="card-icon">💼</div>
              <h3>11 Private Commercial Banks</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Fast turnaround times, digital KYC, pre-visa sanction letters, and competitive unsecured limits:
              </p>
              <ul className="badge-pill-list" style={{ marginTop: "16px" }}>
                {privateBanks.map((b) => (
                  <li key={b} className="badge-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <LenderLogo name={b} height={18} variant="plain" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="card-icon">🚀</div>
              <h3>10 Leading NBFCs &amp; Fintechs</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                Specialized overseas underwriting, up to ₹75L collateral-free loans, 0% margin money, and USD disbursement:
              </p>
              <ul className="badge-pill-list" style={{ marginTop: "16px" }}>
                {nbfcs.map((b) => (
                  <li key={b} className="badge-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <LenderLogo name={b} height={18} variant="plain" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lenders FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Banks & Lenders"
        subtitle="Evaluating credit scores, CIBIL inquiries, branch interactions, and rate negotiations."
        faqs={lendersFaqs}
        id="lenders-faq"
      />

      {/* Bottom CTA */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Get Multi-Bank Sanction Letters in One Go</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "600px", margin: "0 auto 20px" }}>
              Submit one application with Udaan Edu Loans. We negotiate with multiple lenders simultaneously to get you the lowest interest rate.
            </p>
            <Link href="/apply" className="btn btn-accent">
              Compare Your Real Bank Quotes Free →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
