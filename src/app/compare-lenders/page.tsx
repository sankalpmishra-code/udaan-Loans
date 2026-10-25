import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import LenderLogo from "@/components/LenderLogo";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Compare Education Loans in India (2026): Public Banks vs Private Banks vs NBFCs vs Global Lenders",
  description:
    "Comprehensive side-by-side comparison of 30+ education loan lenders for study abroad. Compare SBI, BoB, Axis, ICICI, HDFC Credila, Avanse, and Prodigy on interest rates, processing fees, margin money, and CIBIL benchmarks.",
  keywords: [
    "compare education loan lenders India",
    "SBI vs HDFC Credila education loan",
    "public bank vs private bank study abroad loan",
    "NBFC education loan interest rates",
    "Axis Bank vs ICICI education loan",
    "Prodigy Finance vs Indian banks",
    "best education loan for MS in USA",
    "education loan with moratorium comparison",
  ],
  alternates: {
    canonical: "/compare-lenders",
  },
};

export default function CompareLendersPage() {
  const compareFaqs = [
    {
      question: "Which lender type is best for an overseas education loan?",
      answer:
        "Public Sector Banks (like SBI and Bank of Baroda) offer the lowest floating interest rates (8.15%–9.60%) and simple interest during moratorium, making them best if you have property collateral or high-income co-applicants. Education NBFCs (like HDFC Credila and Avanse) are best if you need fast 3-day approval, up to ₹75 Lakhs without collateral, or 0% margin money.",
    },
    {
      question: "Do USD loans from Prodigy Finance or MPOWER qualify for Section 80E tax deductions in India?",
      answer:
        "No. Under Section 80E of the Indian Income Tax Act, tax deductions on interest are permitted ONLY if the loan is sanctioned by a scheduled commercial bank or approved financial institution operating under the Reserve Bank of India. Foreign lenders like Prodigy and MPOWER do not qualify.",
    },
    {
      question: "What is the minimum CIBIL score needed for collateral-free education loans?",
      answer:
        "For collateral-free loans, Indian private banks and NBFCs require a minimum co-applicant CIBIL score of 685. A score of 750+ is considered prime and unlocks rate discounts of 0.25% to 0.50% p.a., along with faster sanction times.",
    },
    {
      question: "What is margin money in an education loan, and which lenders offer 0% margin?",
      answer:
        "Margin money is the percentage of total educational expenses that the student/family must fund from their own pocket. Public banks typically require 10%–15% margin money for overseas courses. In contrast, specialized NBFCs (HDFC Credila, Avanse, Auxilo) and international lenders offer 0% margin money, financing 100% of tuition, living expenses, travel, and health insurance.",
    },
    {
      question: "How does moratorium interest differ between Public Banks and NBFCs?",
      answer:
        "Public banks charge Simple Interest during the study moratorium period, and students can choose whether to service it monthly or capitalize it at repayment commencement. Most NBFCs require partial simple interest or nominal monthly interest (₹2,000–₹5,000) during the course to establish repayment discipline.",
    },
  ];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Compare Lenders",
            "item": `${siteConfig.url}/compare-lenders`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": compareFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <Breadcrumbs items={[{ name: "Compare Lenders", url: "/compare-lenders" }]} />

      {/* Hero Header */}
      <section className="hero" style={{ padding: "48px 0 60px" }}>
        <div className="wrap">
          <div className="section-head text-center" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <span className="badge">Institutional Analysis 2026</span>
            <h1>Compare Education Loan Lenders: Public vs Private vs NBFCs vs Global</h1>
            <p className="lead">
              Indian students financing overseas studies have four distinct lender categories: Public Sector Banks, Private Commercial Banks, Education NBFCs, and International USD Lenders. Compare real interest rates, processing fees, margin money, and underwriting benchmarks below.
            </p>
          </div>

          {/* Master 4-Way Comparison Table */}
          <div className="data-table-wrapper" style={{ marginTop: "32px" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lender Category</th>
                  <th>Key Institutional Partners</th>
                  <th>Interest Rates (p.a.)</th>
                  <th>Unsecured Limit</th>
                  <th>Secured Limit</th>
                  <th>Processing Fee</th>
                  <th>Margin Money</th>
                  <th>Sanction Speed</th>
                  <th>Sec. 80E Eligible</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Public Sector Banks</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Lowest floating rates</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <LenderLogo name="SBI" height={20} />
                      <LenderLogo name="Bank of Baroda" height={20} />
                      <LenderLogo name="PNB" height={20} />
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "var(--ink-secondary)" }}>
                      SBI, Bank of Baroda, PNB, Canara Bank, Union Bank
                    </div>
                  </td>
                  <td className="text-green" style={{ fontWeight: "700" }}>8.15% – 9.60%</td>
                  <td>Up to ₹50 Lakhs (Top Tier)</td>
                  <td>Up to ₹1.5 Crore</td>
                  <td>₹10,000 flat (refundable)</td>
                  <td>10% – 15%</td>
                  <td>10 – 18 Days</td>
                  <td><span className="badge" style={{ backgroundColor: "#e6f4ea", color: "#137333", border: "none" }}>Yes (100%)</span></td>
                </tr>
                <tr>
                  <td>
                    <strong>Private Commercial Banks</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Speed + Competitive rates</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <LenderLogo name="Axis Bank" height={20} />
                      <LenderLogo name="ICICI Bank" height={20} />
                      <LenderLogo name="Kotak Mahindra Bank" height={20} />
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "var(--ink-secondary)" }}>
                      Axis Bank, ICICI Bank, Kotak Mahindra Bank, IDFC FIRST
                    </div>
                  </td>
                  <td className="text-green" style={{ fontWeight: "700" }}>9.25% – 11.25%</td>
                  <td>Up to ₹60 Lakhs</td>
                  <td>Up to ₹1.5 Crore</td>
                  <td>0.75% – 1.25% + GST</td>
                  <td>0% – 10%</td>
                  <td>5 – 7 Days</td>
                  <td><span className="badge" style={{ backgroundColor: "#e6f4ea", color: "#137333", border: "none" }}>Yes (100%)</span></td>
                </tr>
                <tr>
                  <td>
                    <strong>Education NBFCs</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Highest unsecured &amp; 100% cost</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <LenderLogo name="HDFC Credila" height={20} />
                      <LenderLogo name="Avanse" height={20} />
                      <LenderLogo name="Poonawalla Fincorp" height={20} />
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "var(--ink-secondary)" }}>
                      HDFC Credila, Avanse, Auxilo, InCred, Poonawalla Fincorp
                    </div>
                  </td>
                  <td className="text-green" style={{ fontWeight: "700" }}>10.25% – 12.75%</td>
                  <td>Up to ₹75 Lakhs</td>
                  <td>Up to ₹1.0 Crore</td>
                  <td>1.00% – 1.50% + GST</td>
                  <td><strong>0% (Full Cost)</strong></td>
                  <td><strong>3 – 5 Days</strong></td>
                  <td><span className="badge" style={{ backgroundColor: "#e6f4ea", color: "#137333", border: "none" }}>Yes (100%)</span></td>
                </tr>
                <tr>
                  <td>
                    <strong>USD / Global Lenders</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>No co-signer required</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <LenderLogo name="MPOWER" height={20} />
                      <LenderLogo name="Prodigy Finance" height={20} />
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "var(--ink-secondary)" }}>
                      Prodigy Finance, MPOWER Financing
                    </div>
                  </td>
                  <td style={{ color: "#d93025", fontWeight: "700" }}>11.99% – 14.50% USD</td>
                  <td>Up to $100,000 USD</td>
                  <td>N/A</td>
                  <td>4.0% – 5.0% admin</td>
                  <td>0%</td>
                  <td>5 – 10 Days</td>
                  <td><span className="badge" style={{ backgroundColor: "#fce8e6", color: "#c5221f", border: "none" }}>No (Foreign)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* High-Intent Non-Gated CTA Trigger */}
          <div
            style={{
              margin: "36px 0 10px",
              padding: "24px 28px",
              borderRadius: "12px",
              backgroundColor: "var(--brand-dark, #094754)",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <h3 style={{ color: "#ffffff", margin: "0 0 6px" }}>Not sure which lender will approve your profile?</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#d0e4e7" }}>
                Our 60-Second Bank Matcher checks your academic profile, target destination, and co-applicant income against 30+ lender rules without affecting CIBIL.
              </p>
            </div>
            <Link
              href="/match"
              className="btn btn-primary"
              style={{
                backgroundColor: "#f59e0b",
                color: "#061a20",
                fontWeight: "700",
                whiteSpace: "nowrap",
                padding: "12px 24px",
              }}
            >
              Check Multi-Lender Eligibility (2 Mins) →
            </Link>
          </div>
        </div>
      </section>

      {/* In-Depth Category Deep Dive 1: Public Sector Banks */}
      <section className="section-alt" style={{ padding: "50px 0" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Category 1</span>
            <h2>Public Sector Banks: Lowest Rates & Government Subsidies</h2>
            <p className="lead">
              Public sector banks provide the lowest borrowing costs in India because their loans are linked directly to the RBI Repo Rate (EBLR). Borrowers benefit from simple interest during moratorium, zero prepayment penalties, and full eligibility for Central Government interest subsidy schemes like CSIS.
            </p>
          </div>

          <div className="data-table-wrapper" style={{ margin: "24px 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Interest Rate (Floating)</th>
                  <th>Maximum Loan Amount</th>
                  <th>Margin Money</th>
                  <th>Moratorium Terms</th>
                  <th>Key Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="SBI" height={22} />
                      <strong>SBI Global Ed-Vantage</strong>
                    </div>
                  </td>
                  <td>8.15% – 9.15%</td>
                  <td>₹1.50 Crore (Secured) / ₹50L (Premier)</td>
                  <td>10% – 15%</td>
                  <td>Course + 6 Months</td>
                  <td>Tangible collateral required for &gt;₹50L; 0.50% concession for female students.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="Bank of Baroda" height={22} />
                      <strong>Bank of Baroda (Baroda Scholar)</strong>
                    </div>
                  </td>
                  <td>8.25% – 9.40%</td>
                  <td>₹1.25 Crore (Secured) / ₹40L (Top DLIs)</td>
                  <td>10%</td>
                  <td>Course + 12 Months</td>
                  <td>Preferential rates for premier US/UK universities on BoB approved list.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="Union Bank" height={22} />
                      <strong>Union Bank (Union Education Abroad)</strong>
                    </div>
                  </td>
                  <td>8.50% – 9.60%</td>
                  <td>₹1.25 Crore (Secured) / ₹40L (Unsecured)</td>
                  <td>15%</td>
                  <td>Course + 12 Months</td>
                  <td>Requires verified ITRs from parents; full Section 80E certificate annually.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* In-Depth Category Deep Dive 2: Private Commercial Banks */}
      <section style={{ padding: "50px 0" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Category 2</span>
            <h2>Private Commercial Banks: Fast Turnaround & High Unsecured Limits</h2>
            <p className="lead">
              Private commercial banks combine institutional stability with modern digital underwriting to approve files in 5 to 7 days. They provide official pre-visa sanction letters for US Form I-20 and German visa appointments, offering up to ₹60 Lakhs unsecured for STEM programs.
            </p>
          </div>

          <div className="data-table-wrapper" style={{ margin: "24px 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lender Name</th>
                  <th>Interest Rate (p.a.)</th>
                  <th>Collateral-Free Limit</th>
                  <th>Sanction Turnaround</th>
                  <th>Pre-Visa Sanction Letter</th>
                  <th>Core Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="Axis Bank" height={22} />
                      <strong>Axis Bank</strong>
                    </div>
                  </td>
                  <td>9.25% – 10.75%</td>
                  <td>Up to ₹50 Lakhs</td>
                  <td>5 – 7 Working Days</td>
                  <td>Issued within 48h of documentation</td>
                  <td>Covers living expenses, travel, and laptop allowances with no physical branch visit.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="ICICI Bank" height={22} />
                      <strong>ICICI Bank</strong>
                    </div>
                  </td>
                  <td>9.50% – 11.00%</td>
                  <td>Up to ₹50 Lakhs</td>
                  <td>4 – 6 Working Days</td>
                  <td>Directly accepted by US &amp; Canadian consulates</td>
                  <td>Seamless integration with ICICI Bank Canada Student GIC program.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="IDFC FIRST Bank" height={22} />
                      <strong>IDFC FIRST Bank</strong>
                    </div>
                  </td>
                  <td>9.75% – 11.25%</td>
                  <td>Up to ₹60 Lakhs</td>
                  <td>5 – 7 Working Days</td>
                  <td>Digital pre-sanction letter</td>
                  <td>Evaluates student future earnings for top 200 QS-ranked global universities.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* In-Depth Category Deep Dive 3: Specialized Education NBFCs */}
      <section className="section-alt" style={{ padding: "50px 0" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Category 3</span>
            <h2>Education NBFCs: 100% Cost of Study & 3-Day Approvals</h2>
            <p className="lead">
              Specialized Non-Banking Financial Companies (NBFCs) evaluate loan eligibility primarily based on the student&apos;s academic caliber, GRE scores, and course employability. They offer up to ₹75 Lakhs without collateral, mandate 0% margin money, and disburse directly into German Blocked Accounts or Canadian GIC accounts within 48 hours.
            </p>
          </div>

          <div className="data-table-wrapper" style={{ margin: "24px 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>NBFC Name</th>
                  <th>Interest Rates (p.a.)</th>
                  <th>Max Unsecured Limit</th>
                  <th>Margin Money</th>
                  <th>Speed to Sanction</th>
                  <th>Specialized Advantage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="HDFC Credila" height={22} />
                      <strong>HDFC Credila</strong>
                    </div>
                  </td>
                  <td>10.25% – 12.25%</td>
                  <td>₹50 Lakhs – ₹75 Lakhs</td>
                  <td>0% (100% Cost)</td>
                  <td>3 – 5 Days</td>
                  <td>Market leader; accepts broader co-applicants (uncles/aunts); fast German Sperrkonto transfers.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="Avanse" height={22} />
                      <strong>Avanse Financial Services</strong>
                    </div>
                  </td>
                  <td>10.50% – 12.50%</td>
                  <td>Up to ₹75 Lakhs</td>
                  <td>0% (100% Cost)</td>
                  <td>3 – 5 Days</td>
                  <td>Funds 100% of overseas living expenses, airfare, visa fees, and tuition deposits.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="Auxilo" height={22} />
                      <strong>Auxilo Finserve</strong>
                    </div>
                  </td>
                  <td>10.75% – 12.75%</td>
                  <td>Up to ₹60 Lakhs</td>
                  <td>0% (100% Cost)</td>
                  <td>3 – 4 Days</td>
                  <td>Flexible debt servicing options during study period with rapid document doorstep pick-up.</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <LenderLogo name="InCred" height={22} />
                      <strong>InCred Finance</strong>
                    </div>
                  </td>
                  <td>10.50% – 12.50%</td>
                  <td>Up to ₹60 Lakhs</td>
                  <td>0% (100% Cost)</td>
                  <td>4 – 5 Days</td>
                  <td>AI-powered credit scoring providing conditional sanction letter before university admission.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Underwriting Benchmarks: CIBIL, FOIR, Co-Applicant */}
      <section style={{ padding: "50px 0" }}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge">Credit Assessment</span>
            <h2>Underwriting Benchmarks: CIBIL, FOIR, and Eligibility Metrics</h2>
            <p className="lead">
              Lenders calculate creditworthiness by evaluating the co-applicant&apos;s Fixed Obligation to Income Ratio (FOIR) alongside the student&apos;s academic pedigree. A minimum CIBIL score of 685 is standard, while keeping FOIR below 55% ensures approval for loans above ₹40 Lakhs.
            </p>
          </div>

          <div className="data-table-wrapper" style={{ margin: "24px 0" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Credit Metric</th>
                  <th>Public Sector Banks</th>
                  <th>Private Commercial Banks</th>
                  <th>Specialized NBFCs</th>
                  <th>USD Global Lenders</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Minimum CIBIL Score</strong></td>
                  <td>685 (750+ for lowest rate)</td>
                  <td>685 (730+ preferred)</td>
                  <td>685 (650+ considered with strong academic profile)</td>
                  <td>Not CIBIL-dependent (US Credit/Soft Pull)</td>
                </tr>
                <tr>
                  <td><strong>Max FOIR Threshold</strong></td>
                  <td>50% – 55% of net salary</td>
                  <td>55% – 60% of net salary</td>
                  <td>60% – 65% of net salary</td>
                  <td>N/A (No co-applicant)</td>
                </tr>
                <tr>
                  <td><strong>Accepted Co-Applicants</strong></td>
                  <td>Parents, Spouse, Siblings only</td>
                  <td>Parents, Spouse, Siblings</td>
                  <td>Parents, Siblings, Uncles, Aunts, First Cousins</td>
                  <td>None (Self-funded student contract)</td>
                </tr>
                <tr>
                  <td><strong>Moratorium Repayment</strong></td>
                  <td>Optional Simple Interest</td>
                  <td>Simple Interest or EMI</td>
                  <td>Partial simple interest (₹2,000–₹5,000/mo)</td>
                  <td>Full deferral during study + 6 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 80E Impact Analysis Box */}
          <div className="card" style={{ marginTop: "32px", borderLeft: "4px solid var(--brand, #094754)" }}>
            <div className="card-icon">💡</div>
            <h3>Understanding Section 80E Tax Savings Across Lenders</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--muted)", margin: "8px 0 16px" }}>
              Under Section 80E of the Indian Income Tax Act, 100% of the interest amount paid on an education loan is deductible from gross total income for up to 8 consecutive financial years with no upper cap. Because public banks, private banks, and NBFCs are recognized under RBI guidelines, all three qualify for this benefit. However, international lenders like Prodigy and MPOWER are foreign entities and <strong>do not qualify for Section 80E tax deductions</strong>.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/tax-calculator" className="btn btn-outline" style={{ fontSize: "0.9rem" }}>
                Calculate Section 80E Tax Savings →
              </Link>
              <Link href="/calculator" className="btn btn-outline" style={{ fontSize: "0.9rem" }}>
                Explore EMI Calculator with Moratorium →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions: Comparing Education Loans"
        subtitle="Clear answers on loan terms, interest calculations, and bank selection for study abroad."
        faqs={compareFaqs}
      />
    </>
  );
}
