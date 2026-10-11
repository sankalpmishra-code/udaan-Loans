"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData, CountryCode, Region, InstitutionType } from "@/data/universities";
import Breadcrumbs from "@/components/Breadcrumbs";
import UniversitySearchBar from "@/components/UniversitySearchBar";

export default function UniversitiesDirectoryPage() {
  const [selectedRegion, setSelectedRegion] = useState<"all" | Region>("all");
  const [selectedCountry, setSelectedCountry] = useState<"all" | CountryCode>("all");
  const [selectedType, setSelectedType] = useState<"all" | InstitutionType>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      // 1. Region filter
      const matchesRegion =
        selectedRegion === "all" ||
        (selectedRegion === "europe" ? u.region === "europe" || u.region === "uk" : u.region === selectedRegion);

      // 2. Country filter
      const matchesCountry = selectedCountry === "all" || u.country === selectedCountry;

      // 3. Institution type filter
      const matchesType = selectedType === "all" || u.institutionType === selectedType;

      // 4. Course filter
      let matchesCourse = true;
      if (selectedCourse !== "all") {
        const courseKeywords: Record<string, string[]> = {
          stem: ["computer", "data", "software", "artificial", "cyber", "computing", "technology", "msc"],
          mba: ["mba", "business", "management", "consulting", "executive"],
          engineering: ["engineering", "mechanical", "electrical", "civil", "robotics", "aerospace"],
          finance: ["finance", "fintech", "economics", "accounting", "banking"],
          health: ["health", "biotech", "biomedical", "medical", "pharmacy", "medicine"],
          law: ["law", "llm", "policy", "legal", "justice"],
          undergrad: ["bachelor", "undergraduate", "b.sc", "b.eng", "ba"],
        };
        const keywords = courseKeywords[selectedCourse] || [];
        matchesCourse =
          u.popularPrograms.some((p) => keywords.some((k) => p.name.toLowerCase().includes(k))) ||
          keywords.some((k) => u.overview.toLowerCase().includes(k));
      }

      // 5. Query filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.shortName.toLowerCase().includes(query) ||
        u.city.toLowerCase().includes(query) ||
        u.countryName.toLowerCase().includes(query) ||
        u.partnerNetwork.toLowerCase().includes(query) ||
        u.primeTierCategory.toLowerCase().includes(query);

      return matchesRegion && matchesCountry && matchesType && matchesCourse && matchesSearch;
    });
  }, [selectedRegion, selectedCountry, selectedType, selectedCourse, searchQuery]);

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

  const getBadgeClass = (type: InstitutionType) => {
    switch (type) {
      case "Russell Group / Global Top 100":
        return "inst-badge inst-badge-russell";
      case "Triple-Accredited Business School":
        return "inst-badge inst-badge-business";
      case "Premier Research University":
        return "inst-badge inst-badge-research";
      case "Applied Sciences & Polytechnic":
        return "inst-badge inst-badge-applied";
      case "University Pathway College":
        return "inst-badge inst-badge-pathway";
      default:
        return "inst-badge inst-badge-default";
    }
  };

  const isAnyFilterActive =
    selectedRegion !== "all" ||
    selectedCountry !== "all" ||
    selectedType !== "all" ||
    selectedCourse !== "all" ||
    Boolean(searchQuery);

  return (
    <>
      <Breadcrumbs items={[{ name: "Universities", url: "/universities" }]} />

      <section className="hero" style={{ padding: "40px 0 28px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Global University Directory</span>
            <h1>International Education Loan Guides by University</h1>
            <p className="lead" style={{ maxWidth: "840px", margin: "0 auto", color: "var(--ink-secondary)" }}>
              Explore lender-specific eligibility rules, public bank Prime Tier concessions (up to 0.50% interest discount), realistic cost-of-attendance budgets, and visa fund requirements across leading universities in the UK, Europe, North America, and Australia.
            </p>
          </div>

          {/* Unified 3-in-1 Search Bar (University, Country, Course) */}
          <div style={{ maxWidth: "960px", margin: "24px auto 16px" }}>
            <UniversitySearchBar
              initialSearch={searchQuery}
              initialCountry={selectedCountry}
              initialCourse={selectedCourse}
              onFilterChange={({ query, country, course }) => {
                setSearchQuery(query);
                setSelectedCountry(country as "all" | CountryCode);
                setSelectedCourse(course);
              }}
              showPopularChips={true}
            />
          </div>

          {/* Secondary Filter Controls Box */}
          <div
            className="filter-controls-box"
            style={{
              background: "var(--surface)",
              color: "var(--ink)",
              padding: "20px 24px",
              borderRadius: "16px",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-sm)",
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Region Toggles */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink-secondary)", marginRight: "4px" }}>
                Region:
              </span>
              <button
                type="button"
                className={`preset-chip ${selectedRegion === "all" ? "chip-active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.85rem" }}
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
                style={{ padding: "6px 14px", fontSize: "0.85rem" }}
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
                style={{ padding: "6px 14px", fontSize: "0.85rem" }}
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
                style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                onClick={() => {
                  setSelectedRegion("australia");
                  setSelectedCountry("all");
                }}
              >
                🇦🇺 Australia ({counts.australiaTotal})
              </button>
            </div>

            {/* Institution Classification Toggles */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px dashed var(--line)" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink-secondary)", marginRight: "4px" }}>
                Category:
              </span>
              <button
                type="button"
                className={`preset-chip ${selectedType === "all" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("all")}
              >
                All Classifications
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedType === "Russell Group / Global Top 100" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("Russell Group / Global Top 100")}
              >
                🏛️ Russell Group / Top 100
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedType === "Triple-Accredited Business School" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("Triple-Accredited Business School")}
              >
                💼 Business Schools
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedType === "Premier Research University" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("Premier Research University")}
              >
                🔬 Premier Research
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedType === "Applied Sciences & Polytechnic" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("Applied Sciences & Polytechnic")}
              >
                ⚙️ Applied Sciences
              </button>
              <button
                type="button"
                className={`preset-chip ${selectedType === "University Pathway College" ? "chip-active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedType("University Pathway College")}
              >
                🎓 Pathway Colleges
              </button>
            </div>
          </div>

          {/* Active Results Summary */}
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "var(--ink-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <span>
              Showing <strong style={{ color: "var(--ink)" }}>{filteredUniversities.length}</strong> of {universities.length} institutions
            </span>
            {isAnyFilterActive && (
              <button
                type="button"
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedCountry("all");
                  setSelectedType("all");
                  setSelectedCourse("all");
                  setSearchQuery("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--brand-light, #48bbcc)",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.88rem",
                }}
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
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px" }}>
                      <span className="badge" style={{ fontSize: "0.76rem" }}>
                        {getCountryFlag(uni.country)} {uni.countryName}
                      </span>
                      <span className={getBadgeClass(uni.institutionType)}>
                        {uni.partnerNetwork}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", marginBottom: "6px", lineHeight: "1.35", color: "var(--ink)" }}>
                      <Link
                        href={`/universities/${uni.country}/${uni.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {uni.name}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "0.84rem", color: "var(--ink-secondary)", marginBottom: "14px" }}>
                      📍 {uni.city}
                    </p>

                    <div
                      style={{
                        background: "var(--soft)",
                        border: "1px solid var(--line)",
                        padding: "12px 14px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", color: "var(--brand-light, #48bbcc)", fontWeight: 700, marginBottom: "4px" }}>
                        {uni.primeTierCategory}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--ink)" }}>
                        <strong>Estimated Cost:</strong> {uni.totalAnnualCostINR}
                      </div>
                    </div>

                    <div style={{ fontSize: "0.86rem", marginBottom: "16px", lineHeight: "1.6" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: "var(--ink-secondary)" }}>Max Unsecured Loan:</span>
                        <strong style={{ color: "var(--ink)" }}>Up to ₹{bestUnsecured} Lakhs</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: "var(--ink-secondary)" }}>Max Secured Loan:</span>
                        <strong style={{ color: "var(--ink)" }}>Up to ₹1.5 Crore</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--ink-secondary)" }}>Verified Rates:</span>
                        <strong style={{ color: "#10b981" }}>From 7.75% p.a.</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "14px", borderTop: "1px solid var(--line)", display: "flex", gap: "10px" }}>
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
            <div
              className="card text-center"
              style={{
                padding: "50px 20px",
                borderRadius: "16px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            >
              <h3 style={{ color: "var(--ink)" }}>No matching institutions found</h3>
              <p style={{ color: "var(--ink-secondary)", maxWidth: "520px", margin: "10px auto 20px" }}>
                We haven&rsquo;t found an exact match with the selected country, course, and classification filters. However, our 30+ partnering lenders fund 1,500+ overseas institutions.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedCountry("all");
                  setSelectedType("all");
                  setSelectedCourse("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
