"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData, CountryCode, Region, InstitutionType } from "@/data/universities";
import { globalUniversitiesDatabase, GlobalUniversityEntry } from "@/data/globalUniversitiesDatabase";
import Breadcrumbs from "@/components/Breadcrumbs";
import UniversitySearchBar, { QuickDetailData } from "@/components/UniversitySearchBar";
import { isIndianInstitution, isIndianInstitutionQuery } from "@/lib/institutionFilters";

export interface DisplayCardData {
  name: string;
  shortName: string;
  country: string;
  countryName: string;
  city: string;
  badge: string;
  badgeClass?: string;
  primeTierCategory: string;
  totalAnnualCostINR: string;
  tuitionRangeINR: string;
  livingCostINR: string;
  maxUnsecuredINR: string;
  maxSecuredINR: string;
  indicativeRate: string;
  visaInfo: string;
  popularPrograms: string[];
  slug?: string;
  overview?: string;
  isCuratedGuide: boolean;
  qsRank?: number | string;
}

export default function UniversitiesDirectoryPage() {
  const [selectedRegion, setSelectedRegion] = useState<"all" | Region>("all");
  const [selectedCountry, setSelectedCountry] = useState<"all" | CountryCode>("all");
  const [selectedType, setSelectedType] = useState<"all" | InstitutionType>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Live discovered universities from global search
  const [discoveredUniversities, setDiscoveredUniversities] = useState<QuickDetailData[]>([]);
  const [activeModalUni, setActiveModalUni] = useState<DisplayCardData | null>(null);

  // Combine curated + global universities and filter
  // STRICTLY EXCLUDES DOMESTIC INDIAN INSTITUTIONS
  const displayedUniversities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (isIndianInstitutionQuery(query)) {
      return [];
    }

    // 1. Filter curated universities
    const curatedMatches: DisplayCardData[] = universities
      .filter((u) => {
        if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
        // Region filter
        const matchesRegion =
          selectedRegion === "all" ||
          (selectedRegion === "europe" ? u.region === "europe" || u.region === "uk" : u.region === selectedRegion);

        // Country filter
        const matchesCountry = selectedCountry === "all" || u.country === selectedCountry;

        // Institution type filter
        const matchesType = selectedType === "all" || u.institutionType === selectedType;

        // Course filter
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

        // Query filter
        const matchesSearch =
          !query ||
          u.name.toLowerCase().includes(query) ||
          u.shortName.toLowerCase().includes(query) ||
          u.city.toLowerCase().includes(query) ||
          u.countryName.toLowerCase().includes(query) ||
          u.partnerNetwork.toLowerCase().includes(query) ||
          u.primeTierCategory.toLowerCase().includes(query);

        return matchesRegion && matchesCountry && matchesType && matchesCourse && matchesSearch;
      })
      .map((u) => {
        const bestUnsecured = u.lenderPolicies.reduce((max, policy) => {
          const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
          return num > max ? num : max;
        }, 0);

        return {
          name: u.name,
          shortName: u.shortName,
          country: u.country,
          countryName: u.countryName,
          city: u.city,
          badge: u.partnerNetwork,
          badgeClass: getBadgeClass(u.institutionType),
          primeTierCategory: u.primeTierCategory,
          totalAnnualCostINR: u.totalAnnualCostINR,
          tuitionRangeINR: u.tuitionRangeINR,
          livingCostINR: u.livingCostINR,
          maxUnsecuredINR: `Up to ₹${bestUnsecured} Lakhs`,
          maxSecuredINR: "Up to ₹1.50 Crore",
          indicativeRate: u.lenderPolicies[0]?.indicativeRate || "8.15% - 9.15%",
          visaInfo: `${u.visaRequirements.documentName}: ${u.visaRequirements.requiredFundsINR}`,
          popularPrograms: u.popularPrograms.map((p) => p.name),
          slug: u.slug,
          overview: u.overview,
          isCuratedGuide: true,
          qsRank: u.qsRank,
        };
      });

    // 2. If a search query is entered, include any matching universities from the Global Database
    const globalMatches: DisplayCardData[] = [];
    if (query) {
      for (const gu of globalUniversitiesDatabase) {
        if (isIndianInstitution(gu.name, gu.countryName, gu.country)) continue;
        if (selectedCountry !== "all" && gu.country !== selectedCountry) continue;
        const matches =
          gu.name.toLowerCase().includes(query) ||
          gu.shortName.toLowerCase().includes(query) ||
          gu.city.toLowerCase().includes(query) ||
          gu.countryName.toLowerCase().includes(query);

        if (matches) {
          globalMatches.push({
            name: gu.name,
            shortName: gu.shortName,
            country: gu.country,
            countryName: gu.countryName,
            city: gu.city,
            badge: "Global Higher Education Partner",
            badgeClass: "inst-badge inst-badge-research",
            primeTierCategory: gu.primeTierCategory,
            totalAnnualCostINR: gu.totalAnnualCostINR,
            tuitionRangeINR: gu.tuitionRangeINR,
            livingCostINR: gu.livingCostINR,
            maxUnsecuredINR: gu.maxUnsecuredINR,
            maxSecuredINR: gu.maxSecuredINR,
            indicativeRate: gu.indicativeRate,
            visaInfo: gu.visaInfo,
            popularPrograms: gu.popularPrograms,
            slug: gu.slug,
            overview: gu.overview,
            isCuratedGuide: Boolean(gu.slug),
            qsRank: gu.qsRank,
          });
        }
      }

      // If user typed a query but 0 results in selectedCountry, search globally across all foreign countries
      if (globalMatches.length === 0 && selectedCountry !== "all") {
        for (const gu of globalUniversitiesDatabase) {
          if (isIndianInstitution(gu.name, gu.countryName, gu.country)) continue;
          const matches =
            gu.name.toLowerCase().includes(query) ||
            gu.shortName.toLowerCase().includes(query) ||
            gu.city.toLowerCase().includes(query) ||
            gu.countryName.toLowerCase().includes(query);

          if (matches) {
            globalMatches.push({
              name: gu.name,
              shortName: gu.shortName,
              country: gu.country,
              countryName: gu.countryName,
              city: gu.city,
              badge: "Global Higher Education Partner",
              badgeClass: "inst-badge inst-badge-research",
              primeTierCategory: gu.primeTierCategory,
              totalAnnualCostINR: gu.totalAnnualCostINR,
              tuitionRangeINR: gu.tuitionRangeINR,
              livingCostINR: gu.livingCostINR,
              maxUnsecuredINR: gu.maxUnsecuredINR,
              maxSecuredINR: gu.maxSecuredINR,
              indicativeRate: gu.indicativeRate,
              visaInfo: gu.visaInfo,
              popularPrograms: gu.popularPrograms,
              slug: gu.slug,
              overview: gu.overview,
              isCuratedGuide: Boolean(gu.slug),
              qsRank: gu.qsRank,
            });
          }
        }
      }
    }

    // 3. Include any live discovered universities from online search
    const remoteMatches: DisplayCardData[] = [];
    if (query) {
      for (const ru of discoveredUniversities) {
        if (isIndianInstitution(ru.name, ru.countryName, ru.country)) continue;
        const matches =
          ru.name.toLowerCase().includes(query) ||
          ru.shortName.toLowerCase().includes(query) ||
          ru.city.toLowerCase().includes(query) ||
          ru.countryName.toLowerCase().includes(query);

        if (matches) {
          remoteMatches.push({
            name: ru.name,
            shortName: ru.shortName,
            country: ru.country,
            countryName: ru.countryName,
            city: ru.city,
            badge: "International Accredited Institution",
            badgeClass: "inst-badge inst-badge-default",
            primeTierCategory: ru.primeTierCategory,
            totalAnnualCostINR: ru.totalAnnualCostINR,
            tuitionRangeINR: ru.tuitionRangeINR,
            livingCostINR: ru.livingCostINR,
            maxUnsecuredINR: ru.maxUnsecuredINR,
            maxSecuredINR: ru.maxSecuredINR,
            indicativeRate: ru.indicativeRate,
            visaInfo: ru.visaInfo,
            popularPrograms: ru.popularPrograms,
            slug: ru.slug,
            overview: ru.overview,
            isCuratedGuide: Boolean(ru.slug),
            qsRank: ru.qsRank,
          });
        }
      }
    }

    // Deduplicate all by name
    const seen = new Set<string>();
    const combined: DisplayCardData[] = [];

    for (const card of [...curatedMatches, ...globalMatches, ...remoteMatches]) {
      const key = card.name.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(card);
      }
    }

    return combined;
  }, [searchQuery, selectedRegion, selectedCountry, selectedType, selectedCourse, discoveredUniversities]);

  const counts = useMemo(() => {
    return {
      total: universities.length + globalUniversitiesDatabase.length,
      curated: universities.length,
      globalTotal: globalUniversitiesDatabase.length,
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

  const getCountryFlag = (country: string) => {
    switch (country.toLowerCase()) {
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

  function getBadgeClass(type?: string) {
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
  }

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
            <p className="lead" style={{ maxWidth: "860px", margin: "0 auto", color: "var(--ink-secondary)" }}>
              Search <strong>ANY university in the world</strong> to get instant collateral-free loan eligibility, public bank Prime Tier concessions (up to 0.50% interest discount), realistic cost-of-attendance budgets, and official embassy visa fund requirements.
            </p>
          </div>

          {/* Unified 3-in-1 Search Bar (University, Country, Course) */}
          <div style={{ maxWidth: "960px", margin: "24px auto 16px" }}>
            <UniversitySearchBar
              initialSearch={searchQuery}
              initialCountry={selectedCountry}
              initialCourse={selectedCourse}
              onFilterChange={({ query, country, course, globalMatches }) => {
                setSearchQuery(query);
                setSelectedCountry(country as "all" | CountryCode);
                setSelectedCourse(course);
                if (globalMatches && globalMatches.length > 0) {
                  setDiscoveredUniversities(globalMatches);
                }
              }}
              onSelectUniversity={(uni) => {
                setActiveModalUni({
                  name: uni.name,
                  shortName: uni.shortName,
                  country: uni.country,
                  countryName: uni.countryName,
                  city: uni.city,
                  badge: uni.primeTierCategory,
                  badgeClass: "inst-badge inst-badge-research",
                  primeTierCategory: uni.primeTierCategory,
                  totalAnnualCostINR: uni.totalAnnualCostINR,
                  tuitionRangeINR: uni.tuitionRangeINR,
                  livingCostINR: uni.livingCostINR,
                  maxUnsecuredINR: uni.maxUnsecuredINR,
                  maxSecuredINR: uni.maxSecuredINR,
                  indicativeRate: uni.indicativeRate,
                  visaInfo: uni.visaInfo,
                  popularPrograms: uni.popularPrograms,
                  slug: uni.slug,
                  overview: uni.overview,
                  isCuratedGuide: Boolean(uni.slug),
                  qsRank: uni.qsRank,
                });
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
                All Regions
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
                🇬🇧 UK & 🇪🇺 Europe
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
                🇺🇸 North America
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
                🇦🇺 Australia
              </button>
            </div>

            {/* Institution Classification Toggles */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px dashed var(--line)" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink-secondary)", marginRight: "4px" }}>
                Classification:
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
              Showing <strong style={{ color: "var(--ink)" }}>{displayedUniversities.length}</strong> matching institutions
              {searchQuery && (
                <span> for &ldquo;<strong style={{ color: "var(--brand-light, #48bbcc)" }}>{searchQuery}</strong>&rdquo;</span>
              )}
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
            {displayedUniversities.map((uni: DisplayCardData) => (
              <div
                key={uni.name}
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
                    <span className={uni.badgeClass || "inst-badge inst-badge-default"}>
                      {uni.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", marginBottom: "6px", lineHeight: "1.35", color: "var(--ink)" }}>
                    {uni.slug ? (
                      <Link
                        href={`/universities/${uni.country}/${uni.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {uni.name}
                      </Link>
                    ) : (
                      <span
                        onClick={() => setActiveModalUni(uni)}
                        style={{ cursor: "pointer", color: "inherit" }}
                        title="Click to view full loan & visa details"
                      >
                        {uni.name}
                      </span>
                    )}
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
                      <strong style={{ color: "var(--ink)" }}>{uni.maxUnsecuredINR}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "var(--ink-secondary)" }}>Max Secured Loan:</span>
                      <strong style={{ color: "var(--ink)" }}>{uni.maxSecuredINR}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--ink-secondary)" }}>Verified Rates:</span>
                      <strong style={{ color: "#10b981" }}>{uni.indicativeRate}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: "14px", borderTop: "1px solid var(--line)", display: "flex", gap: "10px" }}>
                  {uni.slug ? (
                    <Link
                      href={`/universities/${uni.country}/${uni.slug}`}
                      className="btn btn-outline"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.86rem", padding: "8px 10px" }}
                    >
                      View Loan Guide →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveModalUni(uni)}
                      className="btn btn-outline"
                      style={{ flex: 1, textAlign: "center", fontSize: "0.86rem", padding: "8px 10px", cursor: "pointer" }}
                    >
                      View Loan Details →
                    </button>
                  )}
                  <Link
                    href={`/match?dest=${encodeURIComponent(uni.countryName)}&univ=${encodeURIComponent(uni.name)}`}
                    className="btn btn-accent"
                    style={{ flex: 1, textAlign: "center", fontSize: "0.86rem", padding: "8px 10px" }}
                  >
                    Match Banks
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {displayedUniversities.length === 0 && (
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
              {isIndianInstitutionQuery(searchQuery) ? (
                <>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>ℹ️</div>
                  <h3 style={{ color: "#ef4444", marginBottom: "8px" }}>Domestic Indian Institutions Not Eligible</h3>
                  <p style={{ color: "var(--ink-secondary)", maxWidth: "580px", margin: "10px auto 20px", lineHeight: "1.6" }}>
                    Udaan Loans facilitates collateral-free education loans exclusively for students admitted to recognized overseas / foreign universities (USA, UK, Canada, Australia, Germany, Ireland, Europe). Domestic Indian institutions are not eligible for our overseas study loan schemes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCountry("all");
                    }}
                    className="btn btn-outline"
                    style={{ margin: "0 auto" }}
                  >
                    Explore Overseas Universities Directory →
                  </button>
                </>
              ) : searchQuery ? (
                <>
                  <h3 style={{ color: "var(--ink)" }}>Looking for &ldquo;{searchQuery}&rdquo;?</h3>
                  <p style={{ color: "var(--ink-secondary)", maxWidth: "560px", margin: "10px auto 20px", lineHeight: "1.6" }}>
                    Our 30+ partnering public and private lenders approve collateral-free overseas education loans for students heading to any recognized accredited institution worldwide.
                  </p>
                  <Link
                    href={`/apply?university=${encodeURIComponent(searchQuery)}`}
                    className="btn btn-primary"
                  >
                    Apply for Overseas Loan for {searchQuery} →
                  </Link>
                </>
              ) : (
                <>
                  <h3 style={{ color: "var(--ink)" }}>No universities match your filters</h3>
                  <p style={{ color: "var(--ink-secondary)", maxWidth: "540px", margin: "10px auto 20px" }}>
                    Try resetting your selected region, country, or course filters to view available overseas universities.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegion("all");
                      setSelectedCountry("all");
                      setSelectedType("all");
                      setSelectedCourse("all");
                      setSearchQuery("");
                    }}
                    className="btn btn-outline"
                  >
                    Reset All Filters
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Grid Click Detail Modal */}
      {activeModalUni && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="grid-modal-title"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalUni(null);
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              color: "var(--ink)",
              borderRadius: "20px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              border: "1px solid var(--line)",
              padding: "32px",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalUni(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "var(--soft)",
                border: "1px solid var(--line)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                color: "var(--ink)",
                cursor: "pointer",
              }}
              title="Close (ESC)"
            >
              ✕
            </button>

            {/* University Header */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
                <span className="badge" style={{ fontSize: "0.78rem" }}>
                  📍 {activeModalUni.city}, {activeModalUni.countryName}
                </span>
                {activeModalUni.qsRank && (
                  <span
                    style={{
                      background: "rgba(245, 158, 11, 0.15)",
                      color: "var(--accent, #f59e0b)",
                      border: "1px solid rgba(245, 158, 11, 0.35)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "9999px",
                    }}
                  >
                    {typeof activeModalUni.qsRank === "number" ? `QS Rank #${activeModalUni.qsRank}` : activeModalUni.qsRank}
                  </span>
                )}
              </div>

              <h2
                id="grid-modal-title"
                style={{
                  fontSize: "1.75rem",
                  margin: "4px 0 8px",
                  color: "var(--ink)",
                  lineHeight: "1.25",
                  fontWeight: 800,
                }}
              >
                {activeModalUni.name}
              </h2>
              <p style={{ color: "var(--ink-secondary)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                {activeModalUni.overview || `Automated lender policy & cost of attendance profile mapped for ${activeModalUni.name} admits.`}
              </p>
            </div>

            {/* 4 Financial Metrics Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  background: "var(--soft)",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-secondary)" }}>
                  Annual Tuition
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)", marginTop: "4px" }}>
                  {activeModalUni.tuitionRangeINR}
                </div>
              </div>

              <div
                style={{
                  background: "var(--soft)",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-secondary)" }}>
                  Living Budget (Annual)
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)", marginTop: "4px" }}>
                  {activeModalUni.livingCostINR}
                </div>
              </div>

              <div
                style={{
                  background: "var(--soft)",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-secondary)" }}>
                  Max Collateral-Free
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>
                  {activeModalUni.maxUnsecuredINR}
                </div>
              </div>

              <div
                style={{
                  background: "var(--soft)",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-secondary)" }}>
                  Verified Rate
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent, #f59e0b)", marginTop: "4px" }}>
                  {activeModalUni.indicativeRate}
                </div>
              </div>
            </div>

            {/* Prime Tier Public Bank Benefit */}
            <div
              style={{
                background: "var(--soft-alt)",
                border: "1px solid var(--line)",
                padding: "16px 20px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--brand-light, #48bbcc)" }}>
                    Lender Underwriting Tier
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--ink)", marginTop: "2px" }}>
                    {activeModalUni.primeTierCategory}
                  </div>
                </div>
                <span
                  style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  ✓ 0.50% Rate Concession
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: "1.5" }}>
                SBI (Scholar Scheme), Bank of Baroda (Baroda Scholar), Union Bank, and leading private NBFCs pre-approve collateral-free financing with 100% tuition direct disbursement for this institution.
              </p>
            </div>

            {/* Official Visa Proof Rules */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "1.1rem" }}>🛂</span>
                <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--accent, #f59e0b)" }}>
                  Embassy Visa Fund Proof Rule
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--ink)", lineHeight: "1.5" }}>
                {activeModalUni.visaInfo} Our sanction letters are formatted to meet exact embassy guidelines (German Sperrkonto, Canadian GIC, UK 28-day rule, Australian DHA).
              </p>
            </div>

            {/* Popular Programs */}
            {activeModalUni.popularPrograms && activeModalUni.popularPrograms.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>
                  Funded Programs & Degrees
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeModalUni.popularPrograms.map((prog, i) => (
                    <span
                      key={i}
                      style={{
                        background: "var(--soft)",
                        color: "var(--ink)",
                        border: "1px solid var(--line)",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
              <Link
                href={`/apply?country=${encodeURIComponent(activeModalUni.countryName)}&university=${encodeURIComponent(activeModalUni.name)}`}
                className="btn btn-accent"
                style={{ flex: 1, textAlign: "center", padding: "12px 18px", fontSize: "0.95rem" }}
              >
                Apply for {activeModalUni.shortName} Loan Now →
              </Link>
              <Link
                href={`/match?dest=${encodeURIComponent(activeModalUni.countryName)}&univ=${encodeURIComponent(activeModalUni.name)}`}
                className="btn btn-primary"
                style={{ flex: 1, textAlign: "center", padding: "12px 18px", fontSize: "0.95rem" }}
              >
                Match Eligible Banks →
              </Link>
              {activeModalUni.slug && (
                <Link
                  href={`/universities/${activeModalUni.country}/${activeModalUni.slug}`}
                  className="btn btn-outline"
                  style={{ textAlign: "center", padding: "12px 16px", fontSize: "0.95rem" }}
                >
                  Full In-Depth Guide ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
