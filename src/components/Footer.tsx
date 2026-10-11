import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <Link href="/" className="logo">
              Udaan <span style={{ color: "var(--brand-light, #48bbcc)" }}>Edu</span> Loans
            </Link>
            <p className="footer-tagline">
              India&apos;s leading education loan facilitation platform for overseas studies.
              Matching aspiring students with 30+ RBI-recognized banks & NBFCs for collateral-free
              and secured loans up to ₹1.5 Crore.
            </p>
            <div className="contact-details">
              <p>
                <strong>Mobile / Helpline:</strong>{" "}
                <a href={`tel:${siteConfig.phoneNumbers[0].replace(/\s+/g, "")}`}>{siteConfig.phoneNumbers[0]}</a>,{" "}
                <a href={`tel:${siteConfig.phoneNumbers[1].replace(/\s+/g, "")}`}>{siteConfig.phoneNumbers[1]}</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p>
                <strong>Headquarters:</strong> {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion} - {siteConfig.address.postalCode}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Explore Loans</h3>
            <ul>
              <li><Link href="/match">60-Second Bank Matcher</Link></li>
              <li><Link href="/loans">Secured Loans (Property/FD)</Link></li>
              <li><Link href="/loans">Collateral-Free Loans (up to ₹75L)</Link></li>
              <li><Link href="/calculator">Overseas Loan EMI Calculator</Link></li>
              <li><Link href="/tax-calculator">Section 80E Tax Savings Calculator</Link></li>
              <li><Link href="/assessment">Preliminary Funding Assessment</Link></li>
              <li><Link href="/eligibility">Eligibility & Documents Checklist</Link></li>
              <li><Link href="/lenders">Compare 30+ Banks & NBFCs</Link></li>
            </ul>
          </div>

          {/* Popular Study Destinations */}
          <div className="footer-col">
            <h3>Study Destinations</h3>
            <ul>
              <li><Link href="/universities">Global Universities Directory (2,500+)</Link></li>
              <li><Link href="/destinations/usa">Education Loan for USA (I-20 Support)</Link></li>
              <li><Link href="/destinations/uk">Education Loan for UK (CAS & 28-Day Rule)</Link></li>
              <li><Link href="/destinations/canada">Education Loan for Canada (GIC Coverage)</Link></li>
              <li><Link href="/destinations/germany">Education Loan for Germany (Blocked Account)</Link></li>
              <li><Link href="/destinations/australia">Education Loan for Australia (GS Rule)</Link></li>
              <li><Link href="/destinations/ireland">Education Loan for Ireland (Tech Hub)</Link></li>
              <li><Link href="/destinations">All 40+ Supported Countries</Link></li>
            </ul>
          </div>

          {/* Regional Hubs / GEO Targeting */}
          <div className="footer-col">
            <h3>Serving Students Pan-India</h3>
            <p className="geo-text">
              Doorstep document pickup, specialized processing branches, and dedicated loan advisors active across:
            </p>
            <ul className="geo-list">
              {siteConfig.geoHubsServed.map((city) => (
                <li key={city}>📍 {city}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer for Trust, Compliance & AEO */}
        <div className="footer-bottom">
          <div className="disclaimer-box">
            <p>
              <strong>Regulatory & Compliance Notice:</strong> Udaan Edu Loans ({siteConfig.legalName}) is a premier digital loan facilitation and student advisory service. We are not a bank, non-banking financial company (NBFC), or money lender under Indian law. We do not underwrite, sanction, or disburse loans. All loan applications are subject to the independent credit evaluation, underwriting policies, margin money rules, terms, and conditions of our partnering RBI-regulated scheduled commercial banks and NBFCs. Rates (7.5% - 13.5%), processing fees, and sanction amounts shown across the website are indicative and vary according to university ranking, student academic record, co-applicant financial strength, and collateral quality.
            </p>
          </div>
          <div className="copyright-bar">
            <p>© {new Date().getFullYear()} Udaan Edu Loans. All Rights Reserved.</p>
            <div className="legal-links">
              <Link href="/about">About Us</Link>
              <Link href="/partners">Partner Program</Link>
              <Link href="/tax-calculator">Tax Benefits (80E)</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
