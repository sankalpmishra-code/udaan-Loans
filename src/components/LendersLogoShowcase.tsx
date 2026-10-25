"use client";

import React, { useState } from "react";
import Link from "next/link";
import LenderLogo from "./LenderLogo";
import { FEATURED_LENDERS } from "@/utils/lenderLogos";

export default function LendersLogoShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Public Sector Bank",
    "Private Bank",
    "NBFC / Global Lender",
  ];

  const filteredLenders = selectedCategory === "All"
    ? FEATURED_LENDERS
    : FEATURED_LENDERS.filter((l) => l.category === selectedCategory);

  return (
    <section className="lenders-showcase-section" style={{ padding: "60px 0", background: "var(--surface)" }}>
      <div className="wrap">
        <div className="section-head text-center" style={{ maxWidth: "880px", margin: "0 auto 36px" }}>
          <span className="badge">Accredited Lending Network</span>
          <h2>Our Partner Banks &amp; Specialized NBFCs</h2>
          <p className="lead" style={{ fontSize: "1.05rem" }}>
            We work directly with India&apos;s leading scheduled commercial banks and premier education loan NBFCs to ensure you get the lowest interest rate, maximum collateral-free sanction, and fastest pre-visa approval.
          </p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "0.88rem",
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  border: selectedCategory === cat ? "1.5px solid var(--brand)" : "1px solid var(--line)",
                  background: selectedCategory === cat ? "var(--brand)" : "transparent",
                  color: selectedCategory === cat ? "var(--brand-ink)" : "var(--ink-secondary)",
                  cursor: "pointer",
                  transition: "var(--transition)",
                }}
              >
                {cat === "All" ? "All 30+ Partners" : cat === "Public Sector Bank" ? "Public Banks" : cat === "Private Bank" ? "Private Banks" : "NBFCs & Global"}
              </button>
            ))}
          </div>
        </div>

        {/* Logo Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {filteredLenders.map((lender) => (
            <div
              key={lender.slug}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 16px",
                background: "var(--surface-raised)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                transition: "var(--transition)",
                boxShadow: "var(--shadow-sm)",
                textAlign: "center",
              }}
            >
              {/* Logo Tile */}
              <div
                style={{
                  width: "100%",
                  height: "54px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  padding: "6px 12px",
                  marginBottom: "14px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                }}
              >
                <img
                  src={lender.logo}
                  alt={`${lender.name} logo`}
                  style={{
                    maxHeight: "36px",
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div style={{ width: "100%", marginBottom: "12px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--muted)",
                    marginBottom: "4px",
                  }}
                >
                  {lender.category}
                </span>
                <h3 style={{ fontSize: "1rem", margin: "2px 0 6px", color: "var(--ink)" }}>
                  {lender.shortName}
                </h3>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--brand)",
                    background: "var(--soft)",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    display: "inline-block",
                  }}
                >
                  {lender.highlight}
                </div>
              </div>

              {/* Action Links */}
              <div style={{ width: "100%", display: "flex", gap: "8px" }}>
                <Link
                  href={`/match?lender=${encodeURIComponent(lender.name)}`}
                  className="btn btn-outline"
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  Check Match
                </Link>
                <Link
                  href="/lenders"
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  View Terms
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "36px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/lenders" className="btn btn-primary" style={{ padding: "12px 24px" }}>
            Compare All 30+ Banking &amp; NBFC Partners →
          </Link>
          <Link href="/compare-lenders" className="btn btn-outline" style={{ padding: "12px 20px" }}>
            Public vs Private vs NBFC Breakdown
          </Link>
        </div>
      </div>
    </section>
  );
}
