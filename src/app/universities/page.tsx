"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData, CountryCode, Region, InstitutionType } from "@/data/universities";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function UniversitiesDirectoryPage() {
  const [selectedRegion, setSelectedRegion] = useState<"all" | Region>("all");
  const [selectedCountry, setSelectedCountry] = useState<"all" | CountryCode>("all");
  const [selectedType, setSelectedType] = useState<"all" | InstitutionType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchesRegion =
        selectedRegion === "all" ||
        (selectedRegion === "europe" ? u.region === "europe" || u.region === "uk" : u.region === selectedRegion);

      const matchesCountry = selectedCountry === "all" || u.country === selectedCountry;
      const matchesType = selectedType === "all" || u.institutionType === selectedType;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.shortName.toLowerCase().includes(query) ||
        u.city.toLowerCase().includes(query) ||
        u.countryName.toLowerCase().includes(query) ||
        u.partnerNetwork.toLowerCase().includes(query) ||
        u.primeTierCategory.toLowerCase().includes(query);

      return matchesRegion && matchesCountry && matchesType && matchesSearch;
    });
  }, [selectedRegion, selectedCountry, selectedType, searchQuery]);

  const counts = useMemo(() => {
    return {
      total: universities.length,
      europeTotal: universities.filter((u) => u.region === "europe" || u.region === "uk").length,
      northAmericaTotal: universities.filter((u) => u.region === "north-america").length,
      australiaTotal: universities.filter((u) => u.region === "australia").length,
      uk: universities.filter((u) => u.country === "uk").length,
      germany: universities.filter((u) => u.country === "germany").length,
      ireland: universities.filter((u) => u.country === "ireland").length,
      netherlands: universities.filter((u) => u.country === "netherlands").length,
      france: universities.filter((u) => u.country === "france").length,
      sweden: universities.filter((u) => u.country === "sweden").length,
      italy: universities.filter((u) => u.country === "italy").length,
      switzerland: universities.filter((u) => u.country === "switzerland").length,
      canada: universities.filter((u) => u.country === "canada").length,
      australia: universities.filter((u) => u.country === "australia").length,
      usa: universities.filter((u) => u.country === "usa").length,
    };
  }, []);

  const getCountryFlag = (country: CountryCode) => {
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

  const getBadgeStyle = (type: InstitutionType) => {
    switch (type) {
      case "Russell Group / Global Top 100":
        return { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" };
      case "Triple-Accredited Business School":
        return { background: "#faf5ff", color: "#7e22ce", border: "1px solid #e9d5ff" };
      case "Premier Research University":
        return { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" };
      case "Applied Sciences & Polytechnic":
        return { background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" };
      case "University Pathway College":
        return { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" };
      default:
        return { background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1" };
    }
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Universities", url: "/universities" }]} />

      <section className="hero" style={{ padding: "40px 0 28px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Global University Directory</span>
            <h1>International Education Loan Guides by University</h1>
            <p className="lead" style={{ maxWidth: "840px", margin: "0 auto" }}>
              Explore lender-specific eligibility rules, public bank Prime Tier concessions (up to 0.50% interest discount), realistic cost-of-attendance budgets, and visa fund requirements across leading universities in the UK, Europe, North America, and Australia.
            </p>
          </div>

          {/* Filter Bar */}
          <div
            className="filter-controls-box"
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                placeholder="Search by university name, city, program, or tier (e.g. Oxford, Imperial, TU Delft, INSEAD, TUM, KTH, Waterloo, PoliMi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "1rem",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    color: "#64748b",
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b", marginRight: "4px" }}>
                Region:
              </span>
              <button
                type="button"
                className={`preset-chip ${selectedRegion === "all" ? "chip-active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.88rem" }}
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedCountry("all");
                }}
              >
                All Regions ({counts.total})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedRegion === "europe" ? "chip-active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.88rem" }}
                onClick={() => {
                  setSelectedRegion("europe");
                  setSelectedCountry("all");
                }}
              >
                🇬🇧 UK & 🇪🇺 Europe ({counts.europeTotal})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedRegion === "north-america" ? "chip-active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.88rem" }}
                onClick={() => {
                  setSelectedRegion("north-america");
                  setSelectedCountry("all");
                }}
              >
                🇺🇸 North America ({counts.northAmericaTotal})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedRegion === "australia" ? "chip-active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.88rem" }}
                onClick={() => {
                  setSelectedRegion("australia");
                  setSelectedCountry("all");
                }}
              >
                🇦🇺 Australia ({counts.australiaTotal})
              </button>
            </div>

            {/* Destination Country Chips */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px dashed #e2e8f0" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b", marginRight: "4px" }}>
                Country:
              </span>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "all" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("all")}
              >
                All Countries
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "uk" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("uk")}
              >
                🇬🇧 UK ({counts.uk})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "germany" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("germany")}
              >
                🇩🇪 Germany ({counts.germany})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "netherlands" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("netherlands")}
              >
                🇳🇱 Netherlands ({counts.netherlands})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "france" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("france")}
              >
                🇫🇷 France ({counts.france})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "ireland" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("ireland")}
              >
                🇮🇪 Ireland ({counts.ireland})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "sweden" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("sweden")}
              >
                🇸🇪 Sweden ({counts.sweden})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "italy" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("italy")}
              >
                🇮🇹 Italy ({counts.italy})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "switzerland" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("switzerland")}
              >
                🇨🇭 Switzerland ({counts.switzerland})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "usa" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("usa")}
              >
                🇺🇸 USA ({counts.usa})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "canada" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("canada")}
              >
                🇨🇦 Canada ({counts.canada})
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedCountry === "australia" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.84rem" }}
                onClick={() => setSelectedCountry("australia")}
              >
                🇦🇺 Australia ({counts.australia})
              </button>
            </div>
          </div>

          <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b", fontSize: "0.9rem" }}>
            <span>Showing <strong>{filteredUniversities.length}</strong> institutions</span>
            {(selectedRegion !== "all" || selectedCountry !== "all" || selectedType !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedCountry("all");
                  setSelectedType("all");
                  setSearchQuery("");
                }}
                style={{ background: "none", border: "none", color: "#094754", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* University Grid */}
      <section className="section-alt" style={{ padding: "30px 0 60px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {filteredUniversities.map((uni: UniversityData) => {
              const bestUnsecured = uni.lenderPolicies.reduce((max, policy) => {
                const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
                return num > max ? num : max;
              }, 0);

              return (
                <div
                  key={uni.slug}
                  className="card university-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "14px",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px" }}>
                      <span className="badge" style={{ fontSize: "0.76rem" }}>
                        {getCountryFlag(uni.country)} {uni.countryName}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "6px",
                          ...getBadgeStyle(uni.institutionType),
                        }}
                      >
                        {uni.partnerNetwork}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", marginBottom: "6px", lineHeight: "1.35" }}>
                      <Link
                        href={`/universities/${uni.country}/${uni.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {uni.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "#64748b", marginBottom: "14px" }}>
                      📍 {uni.city}
                    </p>

                    <div style={{ background: "var(--soft)", padding: "12px 14px", borderRadius: "8px", marginBottom: "16px" }}>
                      <div style={{ fontSize: "0.8rem", color: "#094754", fontWeight: 700, marginBottom: "4px" }}>
                        {uni.primeTierCategory}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#334155" }}>
                        <strong>Estimated Cost:</strong> {uni.totalAnnualCostINR}
                      </div>
                    </div>

                    <div style={{ fontSize: "0.86rem", marginBottom: "16px", lineHeight: "1.6" }}>
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
                      style={{ flex: 1, textAlign: "center", fontSize: "0.86rem", padding: "8px 10px" }}
                    >
                      View Loan Guide →
                    </Link>
                    <Link
                      href={`/match?dest=${encodeURIComponent(uni.countryName)}&univ=${encodeURIComponent(uni.name)}`}
                      className="btn btn-accent"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.86rem", padding: "8px 10px" }}
                    >
                      Match Banks
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="card text-center" style={{ padding: "50px 20px", borderRadius: "16px" }}>
              <h3>No matching institution found</h3>
              <p style={{ color: "#64748b", margin: "10px auto 24px", maxWidth: "560px" }}>
                We have over 1,500+ global universities in our lender master catalogue. Even if your institution isn&apos;t listed above, our 30+ partnering banks and NBFCs fund all recognized overseas degrees.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedRegion("all");
                    setSelectedCountry("all");
                    setSelectedType("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
                <Link href="/match" className="btn btn-accent">
                  Check Bank Eligibility For Any University →
                </Link>
              </div>
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
              Our 30+ partnering RBI-recognized banks and NBFCs fund higher education institutions across 40+ countries. We help you secure sanctions with zero collateral, GIC/Sperrkonto funding, and CAS/DHA compliance.
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
