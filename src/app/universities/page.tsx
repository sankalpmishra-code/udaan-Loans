"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData } from "@/data/universities";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function UniversitiesDirectoryPage() {
  const [selectedCountry, setSelectedCountry] = useState<"all" | "usa" | "germany">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchesCountry = selectedCountry === "all" || u.country === selectedCountry;
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.shortName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCountry && matchesSearch;
    });
  }, [selectedCountry, searchQuery]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Universities", url: "/universities" }]} />

      <section className="hero" style={{ padding: "40px 0 50px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Curated 20 Premier Universities Pilot</span>
            <h1>Overseas Education Loan Guides by University</h1>
            <p className="lead" style={{ maxWidth: "780px", margin: "0 auto" }}>
              Explore lender-specific eligibility rules, public bank Prime Tier concessions (up to 0.50% interest discount), realistic cost-of-attendance breakdowns, and visa fund requirements for top institutions across the USA and Germany.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="filter-controls-box" style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            marginTop: "30px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "all" ? "chip-active" : ""}`}
                style={{ padding: "8px 18px", fontSize: "0.95rem" }}
                onClick={() => setSelectedCountry("all")}
              >
                All 20 Hubs
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "usa" ? "chip-active" : ""}`}
                style={{ padding: "8px 18px", fontSize: "0.95rem" }}
                onClick={() => setSelectedCountry("usa")}
              >
                🇺🇸 USA Hubs (12)
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "germany" ? "chip-active" : ""}`}
                style={{ padding: "8px 18px", fontSize: "0.95rem" }}
                onClick={() => setSelectedCountry("germany")}
              >
                🇩🇪 Germany Hubs (8)
              </button>
            </div>

            <div style={{ flex: "1", minWidth: "240px", maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="Search university or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Grid */}
      <section className="section-alt" style={{ padding: "40px 0 60px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {filteredUniversities.map((uni: UniversityData) => {
              const bestUnsecured = uni.lenderPolicies.reduce((max, policy) => {
                const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
                return num > max ? num : max;
              }, 0);

              return (
                <div key={uni.slug} className="card university-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <span className="badge" style={{ fontSize: "0.75rem" }}>
                        {uni.country === "usa" ? "🇺🇸 United States" : "🇩🇪 Germany"}
                      </span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#64748b" }}>
                        QS Rank: #{uni.qsRank}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", marginBottom: "6px" }}>
                      <Link href={`/universities/${uni.country}/${uni.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {uni.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "16px" }}>
                      📍 {uni.city}
                    </p>

                    <div style={{ background: "var(--soft)", padding: "12px 14px", borderRadius: "8px", marginBottom: "16px" }}>
                      <div style={{ fontSize: "0.82rem", color: "#094754", fontWeight: 700, marginBottom: "4px" }}>
                        {uni.primeTierCategory}
                      </div>
                      <div style={{ fontSize: "0.86rem", color: "#334155" }}>
                        <strong>Estimated Cost:</strong> {uni.totalAnnualCostINR}
                      </div>
                    </div>

                    <div style={{ fontSize: "0.88rem", marginBottom: "16px", lineHeight: "1.5" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: "#64748b" }}>Max Unsecured Loan:</span>
                        <strong style={{ color: "#094754" }}>Up to ₹{bestUnsecured} Lakhs</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: "#64748b" }}>Max Secured Loan:</span>
                        <strong style={{ color: "#094754" }}>Up to ₹1.5 Crore</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Verified Rates:</span>
                        <strong style={{ color: "#059669" }}>From 7.75% p.a.</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "14px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px" }}>
                    <Link
                      href={`/universities/${uni.country}/${uni.slug}`}
                      className="btn btn-outline"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.88rem", padding: "8px 12px" }}
                    >
                      View Loan Guide →
                    </Link>
                    <Link
                      href={`/match?dest=${uni.country === "usa" ? "USA" : "Germany"}&univ=${encodeURIComponent(uni.name)}`}
                      className="btn btn-accent"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.88rem", padding: "8px 12px" }}
                    >
                      Match Banks
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="card text-center" style={{ padding: "40px" }}>
              <h3>No matching university found</h3>
              <p style={{ color: "#64748b", margin: "10px 0 20px" }}>
                We have over 1,500+ global universities in our lender master catalogue. Check loan eligibility for your specific university admit now:
              </p>
              <Link href="/match" className="btn btn-accent">
                Check Bank Eligibility For Any University →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Global Coverage Banner */}
      <section>
        <div className="wrap">
          <div className="result-highlight-box text-center" style={{ padding: "40px 24px", borderRadius: "var(--radius-lg)" }}>
            <h2>Have an Admit from Another Global University?</h2>
            <p className="lead" style={{ color: "#fff", maxWidth: "680px", margin: "0 auto 20px" }}>
              Our 30+ partnering RBI-recognized banks and NBFCs fund over 1,500+ recognized higher education institutions across 40+ countries including UK, Canada, Australia, Ireland, and Singapore.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/match" className="btn btn-accent">
                Run 60-Second Match Engine →
              </Link>
              <Link href="/destinations" className="btn btn-outline" style={{ color: "#fff", borderColor: "#fff" }}>
                Browse All Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
