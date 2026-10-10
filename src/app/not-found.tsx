import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Udaan Loans",
  description: "The page you are looking for does not exist. Explore our overseas education loan calculators, lender comparisons, and destination guides.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="hero" style={{ padding: "80px 0 100px" }}>
      <div className="wrap">
        <div className="card text-center" style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 36px" }}>
          <span className="badge" style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--accent-hover)" }}>
            Error 404 • Resource Not Found
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", margin: "16px 0 12px" }}>
            Off Track for Takeoff?
          </h1>
          <p className="lead" style={{ maxWidth: "560px", margin: "0 auto 32px" }}>
            The page you are trying to visit has moved or no longer exists. Let&apos;s guide you back to the right education loan tools:
          </p>

          <div className="grid-2" style={{ textAlign: "left", gap: "16px", marginBottom: "36px" }}>
            <Link href="/calculator" className="card" style={{ padding: "18px", border: "1px solid var(--line)" }}>
              <strong style={{ display: "block", color: "var(--brand)", fontSize: "1.05rem" }}>
                📊 Education Loan EMI Calculator
              </strong>
              <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                Calculate monthly installments with moratorium interest.
              </span>
            </Link>

            <Link href="/loans" className="card" style={{ padding: "18px", border: "1px solid var(--line)" }}>
              <strong style={{ display: "block", color: "var(--brand)", fontSize: "1.05rem" }}>
                🎓 Secured vs Collateral-Free Loans
              </strong>
              <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                Compare limits up to ₹1.5 Cr and rates from 7.5%.
              </span>
            </Link>

            <Link href="/destinations" className="card" style={{ padding: "18px", border: "1px solid var(--line)" }}>
              <strong style={{ display: "block", color: "var(--brand)", fontSize: "1.05rem" }}>
                ✈️ Study Destinations Guides
              </strong>
              <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                USA, UK, Canada, Germany & 40+ country visa fund rules.
              </span>
            </Link>

            <Link href="/lenders" className="card" style={{ padding: "18px", border: "1px solid var(--line)" }}>
              <strong style={{ display: "block", color: "var(--brand)", fontSize: "1.05rem" }}>
                🏛️ Compare 30+ Banks & NBFCs
              </strong>
              <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                SBI, Bank of Baroda, HDFC Credila, Avanse & more.
              </span>
            </Link>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              Return to Homepage
            </Link>
            <Link href="/apply" className="btn btn-accent">
              Get Free Loan Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
