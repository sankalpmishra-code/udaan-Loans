import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { aboutFaqs } from "@/data/faqs";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "About Udaan Edu Loans: India's Premier Overseas Education Loan Facilitator",
  description:
    "Learn about Udaan Edu Loans mission to empower Indian students with transparent, low-cost study abroad loans through 30+ RBI-recognized banking partners. Free advisory across India.",
  keywords: [
    "about Udaan Edu Loans",
    "education loan facilitator India",
    "study abroad financing platform",
    "transparent student loan advisory",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      <section className="hero" style={{ padding: "48px 0 64px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Our Purpose & Mission</span>
            <h1>Empowering Indian Talent to Reach Global Heights</h1>
            <p className="lead">
              Udaan Edu Loans was founded on a simple conviction: <em>Financial complexity and lack of transparent information should never prevent an ambitious student from taking flight.</em>
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <h2>Who We Are</h2>
              <p>
                Udaan Edu Loans is India&apos;s leading digital overseas education loan facilitator.
                We bridge the gap between aspiring students admitted to top international universities
                and India&apos;s top institutional lenders.
              </p>
              <p>
                Unlike bank branch agents who can only pitch their own single product, Udaan Edu Loans provides
                <strong> 100% objective, lender-agnostic advisory</strong>. We analyze interest rates, processing fees,
                margin money rules, and repayment terms across 30+ public sector banks, private commercial banks,
                and specialized education NBFCs to secure you the best loan.
              </p>
              <div style={{ marginTop: "24px" }}>
                <Link href="/apply" className="btn btn-accent">
                  Work With Our Advisors Free →
                </Link>
              </div>
            </div>

            <div className="card" style={{ background: "var(--soft)", padding: "36px" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>🏛️</div>
              <h3>The Facilitator Advantage</h3>
              <ul style={{ lineHeight: "1.8", fontSize: "0.95rem", margin: "16px 0" }}>
                <li><strong>30+ Lenders, 1 Single Application:</strong> No need to visit dozens of branches or resubmit paperwork.</li>
                <li><strong>Exclusive Rate Negotiations:</strong> Our institutional partnerships unlock lower spreads and waiver of hidden charges.</li>
                <li><strong>Zero Fee Guarantee:</strong> Our end-to-end guidance is completely free for students.</li>
                <li><strong>Fast-Track Desk:</strong> Direct access to bank asset appraisal managers for priority sanctions in 3 to 7 days.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pan-India Footprint & GEO Presence */}
      <section className="section-alt">
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">National Presence</span>
            <h2>Serving Students Across All Major Indian Educational Hubs</h2>
            <p className="lead">
              Our 100% digital portal backed by localized field coordination supports students throughout India:
            </p>
          </div>

          <div className="grid-4">
            {siteConfig.geoHubsServed.slice(0, 8).map((city) => (
              <div key={city} className="card text-center" style={{ padding: "20px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>📍</div>
                <strong>{city}</strong>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "4px" }}>
                  Digital & Doorstep Support
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p className="lead" style={{ fontSize: "1rem" }}>
              Have questions? Connect with our team at <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.email}</a> or call <a href={`tel:${siteConfig.phoneNumbers[0].replace(/\s+/g, "")}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.phoneNumbers[0]}</a> / <a href={`tel:${siteConfig.phoneNumbers[1].replace(/\s+/g, "")}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.phoneNumbers[1]}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* About Page FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions About Udaan Edu Loans"
        subtitle="Licensing, business model, partner banks, and data security standards."
        faqs={aboutFaqs}
        id="about-faq"
      />
    </>
  );
}
