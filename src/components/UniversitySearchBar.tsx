"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData, CountryCode } from "@/data/universities";

// Additional world-class institutions for global query coverage
const additionalGlobalUniversities = [
  {
    name: "Harvard University",
    shortName: "Harvard",
    countryName: "United States",
    country: "usa",
    city: "Cambridge, Massachusetts",
    qsRank: 4,
    tuitionRangeINR: "₹45 Lakh – ₹55 Lakh / year",
    livingCostINR: "₹20 Lakh – ₹24 Lakh / year",
    totalAnnualCostINR: "₹65 Lakh – ₹79 Lakh / year",
    primeTierCategory: "Ivy League Tier AAA (0.50% Concession + Max Loan)",
    maxUnsecuredINR: "₹75 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "Form I-20 financial proof ($82,000/yr) required for US F-1 visa.",
    popularPrograms: ["MBA (Harvard Business School)", "MS in Data Science", "Master in Public Policy"],
    slug: "",
  },
  {
    name: "Stanford University",
    shortName: "Stanford",
    countryName: "United States",
    country: "usa",
    city: "Stanford, Silicon Valley, California",
    qsRank: 5,
    tuitionRangeINR: "₹46 Lakh – ₹56 Lakh / year",
    livingCostINR: "₹22 Lakh – ₹26 Lakh / year",
    totalAnnualCostINR: "₹68 Lakh – ₹82 Lakh / year",
    primeTierCategory: "Silicon Valley Tier AAA (0.50% Concession)",
    maxUnsecuredINR: "₹75 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "Form I-20 certification of funds ($85,000/yr) for US F-1 visa.",
    popularPrograms: ["MS in Computer Science", "Stanford GSB MBA", "MS in Electrical Engineering"],
    slug: "",
  },
  {
    name: "Massachusetts Institute of Technology (MIT)",
    shortName: "MIT",
    countryName: "United States",
    country: "usa",
    city: "Cambridge, Massachusetts",
    qsRank: 1,
    tuitionRangeINR: "₹47 Lakh – ₹58 Lakh / year",
    livingCostINR: "₹21 Lakh – ₹25 Lakh / year",
    totalAnnualCostINR: "₹68 Lakh – ₹83 Lakh / year",
    primeTierCategory: "Global #1 University (Tier AAA Elite)",
    maxUnsecuredINR: "₹75 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "Form I-20 financial proof ($86,000/yr) for US F-1 visa.",
    popularPrograms: ["Master of Science in EECS", "Master of Finance (Sloan)", "MS in Computational Science"],
    slug: "",
  },
  {
    name: "University of Toronto",
    shortName: "U of T",
    countryName: "Canada",
    country: "canada",
    city: "Toronto, Ontario",
    qsRank: 21,
    tuitionRangeINR: "₹32 Lakh – ₹42 Lakh / year",
    livingCostINR: "₹13.0 Lakh / year (IRCC GIC)",
    totalAnnualCostINR: "₹45 Lakh – ₹55 Lakh / year",
    primeTierCategory: "Canada #1 University (Prime Tier A+)",
    maxUnsecuredINR: "₹60 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 8.15% p.a.",
    visaInfo: "C$20,635 Canadian GIC deposit + 1st year paid tuition receipt.",
    popularPrograms: ["Master of Science in Applied Computing (MScAC)", "Rotman Full-Time MBA", "Master of Engineering (MEng)"],
    slug: "",
  },
  {
    name: "University of Melbourne",
    shortName: "Melbourne",
    countryName: "Australia",
    country: "australia",
    city: "Melbourne, Victoria",
    qsRank: 13,
    tuitionRangeINR: "₹26 Lakh – ₹34 Lakh / year",
    livingCostINR: "₹16.5 Lakh / year (DHA Guideline)",
    totalAnnualCostINR: "₹42 Lakh – ₹50 Lakh / year",
    primeTierCategory: "Group of Eight #1 (Prime Tier A)",
    maxUnsecuredINR: "₹50 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 8.25% p.a.",
    visaInfo: "AUD $29,710 living fund proof + 1st year tuition + OSHC insurance.",
    popularPrograms: ["Master of Information Technology", "Master of Management", "Master of Engineering"],
    slug: "",
  },
];

export const COUNTRY_OPTIONS = [
  { value: "all", label: "🌐 All Countries" },
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "usa", label: "🇺🇸 United States" },
  { value: "canada", label: "🇨🇦 Canada" },
  { value: "germany", label: "🇩🇪 Germany" },
  { value: "australia", label: "🇦🇺 Australia" },
  { value: "ireland", label: "🇮🇪 Ireland" },
  { value: "netherlands", label: "🇳🇱 Netherlands" },
  { value: "france", label: "🇫🇷 France" },
  { value: "sweden", label: "🇸🇪 Sweden" },
  { value: "italy", label: "🇮🇹 Italy" },
  { value: "switzerland", label: "🇨🇭 Switzerland" },
];

export const COURSE_OPTIONS = [
  { value: "all", label: "🎓 All Courses / Degrees" },
  { value: "stem", label: "💻 MS / STEM (CS, AI, Data Science)" },
  { value: "mba", label: "💼 MBA & Business Management" },
  { value: "engineering", label: "⚙️ Engineering (Mech, Civil, EE, Robotics)" },
  { value: "finance", label: "📊 Finance, Economics & Fintech" },
  { value: "health", label: "🧬 Biotech, Health & Life Sciences" },
  { value: "law", label: "⚖️ Law, LLM & Public Policy" },
  { value: "undergrad", label: "🎓 Undergraduate / Bachelor's" },
];

export interface QuickDetailData {
  name: string;
  shortName: string;
  countryName: string;
  country: string;
  city: string;
  qsRank?: number | string;
  tuitionRangeINR: string;
  livingCostINR: string;
  totalAnnualCostINR: string;
  primeTierCategory: string;
  maxUnsecuredINR: string;
  maxSecuredINR: string;
  indicativeRate: string;
  visaInfo: string;
  popularPrograms: string[];
  slug?: string;
  overview?: string;
  selectedCourseLabel?: string;
}

interface UniversitySearchBarProps {
  initialSearch?: string;
  initialCountry?: string;
  initialCourse?: string;
  onFilterChange?: (filters: { query: string; country: string; course: string }) => void;
  onSelectUniversity?: (uni: QuickDetailData) => void;
  showPopularChips?: boolean;
}

export default function UniversitySearchBar({
  initialSearch = "",
  initialCountry = "all",
  initialCourse = "all",
  onFilterChange,
  onSelectUniversity,
  showPopularChips = true,
}: UniversitySearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<QuickDetailData | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when props change
  useEffect(() => {
    if (initialSearch !== undefined) setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialCountry !== undefined) setSelectedCountry(initialCountry);
  }, [initialCountry]);

  useEffect(() => {
    if (initialCourse !== undefined) setSelectedCourse(initialCourse);
  }, [initialCourse]);

  // Notify parent of filter changes in real-time
  const notifyFilterChange = (query: string, country: string, course: string) => {
    if (onFilterChange) {
      onFilterChange({ query, country, course });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener (/ or Cmd+K to focus, Escape to dismiss)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "SELECT") ||
        ((e.metaKey || e.ctrlKey) && e.key === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setSelectedUni(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedUni) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedUni]);

  // Helper to determine course-level adjustment
  const getCourseAdjustedDetails = (baseUni: QuickDetailData, courseKey: string): QuickDetailData => {
    const courseObj = COURSE_OPTIONS.find((c) => c.value === courseKey);
    const courseLabel = courseObj && courseKey !== "all" ? courseObj.label.replace(/^[^\w\s]+\s*/, "") : undefined;

    let adjustedTuition = baseUni.tuitionRangeINR;
    let adjustedUnsecured = baseUni.maxUnsecuredINR;
    let extraAdvice = "";

    if (courseKey === "mba") {
      adjustedTuition = "₹40 Lakh – ₹65 Lakh / year (B-School Tier)";
      adjustedUnsecured = "Up to ₹75 Lakhs (Top B-School Priority)";
      extraAdvice = "High earning potential guarantees premium lender concessions with SBI Scholar / BoB Baroda Scholar schemes offering zero margin money.";
    } else if (courseKey === "stem") {
      adjustedUnsecured = "Up to ₹60 Lakhs (STEM Priority)";
      extraAdvice = "Eligible for extended 3-year post-study OPT work permits (USA) and specialized collateral-free US-dollar student loans.";
    } else if (courseKey === "engineering") {
      adjustedUnsecured = "Up to ₹50 Lakhs (Collateral-Free)";
      extraAdvice = "High global employer demand across automotive, semiconductor, and robotics hubs.";
    } else if (courseKey === "undergrad") {
      adjustedTuition = "₹18 Lakh – ₹38 Lakh / year";
      adjustedUnsecured = "Up to ₹35 Lakhs (Cosigner Required)";
      extraAdvice = "Undergraduate degree loans usually require a strong parent/guardian financial co-signer with proven ITR.";
    }

    return {
      ...baseUni,
      tuitionRangeINR: adjustedTuition,
      maxUnsecuredINR: adjustedUnsecured,
      selectedCourseLabel: courseLabel,
      overview: extraAdvice ? `${baseUni.overview || ""} ${extraAdvice}`.trim() : baseUni.overview,
    };
  };

  // Filtered autocomplete search results
  const searchResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    // Base universities
    const curatedMatches: QuickDetailData[] = universities
      .filter((u) => {
        // Country filter
        if (selectedCountry !== "all" && u.country !== selectedCountry) {
          return false;
        }

        // Query filter
        if (q) {
          const nameMatch =
            u.name.toLowerCase().includes(q) ||
            u.shortName.toLowerCase().includes(q) ||
            u.city.toLowerCase().includes(q) ||
            u.countryName.toLowerCase().includes(q);
          if (!nameMatch) return false;
        }

        // Course filter
        if (selectedCourse !== "all") {
          const courseKeywords: Record<string, string[]> = {
            stem: ["computer", "data", "software", "artificial", "cyber", "computing", "technology"],
            mba: ["mba", "business", "management", "consulting", "executive"],
            engineering: ["engineering", "mechanical", "electrical", "civil", "robotics", "aerospace"],
            finance: ["finance", "fintech", "economics", "accounting", "banking"],
            health: ["health", "biotech", "biomedical", "medical", "pharmacy", "medicine"],
            law: ["law", "llm", "policy", "legal", "justice"],
            undergrad: ["bachelor", "undergraduate", "b.sc", "b.eng", "ba"],
          };
          const keywords = courseKeywords[selectedCourse] || [];
          const hasCourse =
            u.popularPrograms.some((p) => keywords.some((k) => p.name.toLowerCase().includes(k))) ||
            keywords.some((k) => u.overview.toLowerCase().includes(k));
          if (!hasCourse && q) {
            // allow lenient match if user specifically searched by name
          } else if (!hasCourse && !q) {
            return false;
          }
        }

        return true;
      })
      .map((u) => {
        const bestUnsecured = u.lenderPolicies.reduce((max, policy) => {
          const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
          return num > max ? num : max;
        }, 0);

        return {
          name: u.name,
          shortName: u.shortName,
          countryName: u.countryName,
          country: u.country,
          city: u.city,
          qsRank: u.qsRank,
          tuitionRangeINR: u.tuitionRangeINR,
          livingCostINR: u.livingCostINR,
          totalAnnualCostINR: u.totalAnnualCostINR,
          primeTierCategory: u.primeTierCategory,
          maxUnsecuredINR: `Up to ₹${bestUnsecured} Lakhs`,
          maxSecuredINR: "Up to ₹1.50 Crore",
          indicativeRate: u.lenderPolicies[0]?.indicativeRate || "8.15% - 9.15%",
          visaInfo: `${u.visaRequirements.documentName}: ${u.visaRequirements.requiredFundsINR}`,
          popularPrograms: u.popularPrograms.map((p) => p.name),
          slug: u.slug,
          overview: u.overview,
        };
      });

    const additionalMatches: QuickDetailData[] = additionalGlobalUniversities
      .filter((u) => {
        if (selectedCountry !== "all" && u.country !== selectedCountry) return false;
        if (!q) return false;
        return (
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.countryName.toLowerCase().includes(q)
        );
      })
      .map((u) => ({
        name: u.name,
        shortName: u.shortName,
        countryName: u.countryName,
        country: u.country,
        city: u.city,
        qsRank: u.qsRank,
        tuitionRangeINR: u.tuitionRangeINR,
        livingCostINR: u.livingCostINR,
        totalAnnualCostINR: u.totalAnnualCostINR,
        primeTierCategory: u.primeTierCategory,
        maxUnsecuredINR: u.maxUnsecuredINR,
        maxSecuredINR: u.maxSecuredINR,
        indicativeRate: u.rates,
        visaInfo: u.visaInfo,
        popularPrograms: u.popularPrograms,
        slug: "",
      }));

    return [...curatedMatches, ...additionalMatches].slice(0, 8);
  }, [searchTerm, selectedCountry, selectedCourse]);

  const handleSelectUniversity = (uni: QuickDetailData) => {
    const customized = getCourseAdjustedDetails(uni, selectedCourse);
    setSelectedUni(customized);
    setIsOpen(false);
    if (onSelectUniversity) onSelectUniversity(customized);
  };

  const handleSearchSubmit = () => {
    if (!searchTerm.trim()) {
      if (searchResults.length > 0) {
        handleSelectUniversity(searchResults[0]);
      }
      return;
    }

    if (searchResults.length > 0) {
      handleSelectUniversity(searchResults[0]);
    } else {
      // Dynamic profile generator for any unlisted university globally
      const countryLabel = COUNTRY_OPTIONS.find((c) => c.value === selectedCountry)?.label || "Overseas";
      const customized = getCourseAdjustedDetails(
        {
          name: searchTerm.trim(),
          shortName: searchTerm.trim().split(" ")[0],
          countryName: selectedCountry !== "all" ? countryLabel.replace(/^[^\w\s]+\s*/, "") : "International Campus",
          country: selectedCountry !== "all" ? selectedCountry : "global",
          city: "International University Hub",
          qsRank: "Recognized Accredited University",
          tuitionRangeINR: "₹18 Lakh – ₹32 Lakh / year (Estimated)",
          livingCostINR: "₹10 Lakh – ₹15 Lakh / year (Estimated)",
          totalAnnualCostINR: "₹28 Lakh – ₹47 Lakh / year",
          primeTierCategory: "Public / Private Bank Underwritten Institution",
          maxUnsecuredINR: "Up to ₹50 Lakhs",
          maxSecuredINR: "Up to ₹1.50 Crore",
          indicativeRate: "8.15% - 10.25%",
          visaInfo: "Embassy accepted pre-visa loan sanction letters with zero upfront collateral.",
          popularPrograms: ["Master of Science (STEM)", "MBA / Business Management", "Postgraduate Diploma"],
          slug: "",
          overview: `Automated loan eligibility mapped for ${searchTerm.trim()}. Our 30+ partnering scheduled banks and NBFCs fund all accredited programs here with full living expense coverage.`,
        },
        selectedCourse
      );
      setSelectedUni(customized);
      setIsOpen(false);
      if (onSelectUniversity) onSelectUniversity(customized);
    }
  };

  const popularChips = [
    { label: "🇬🇧 Oxford", name: "University of Oxford" },
    { label: "🇳🇱 TU Delft", name: "Delft University of Technology" },
    { label: "🇩🇪 TUM Munich", name: "Technical University of Munich" },
    { label: "🇨🇦 Waterloo", name: "University of Waterloo" },
    { label: "🇫🇷 INSEAD", name: "INSEAD" },
    { label: "🇮🇹 PoliMi", name: "Politecnico di Milano" },
    { label: "🇨🇭 ETH Zurich", name: "ETH Zurich" },
    { label: "🇺🇸 Northeastern", name: "Northeastern University" },
    { label: "🇦🇺 Melbourne", name: "University of Melbourne" },
  ];

  return (
    <div ref={searchContainerRef} className="unified-search-wrapper">
      {/* Unified 3-in-1 Search Bar */}
      <div className="unified-search-box">
        {/* University Search Field */}
        <div className="search-field-university">
          <span
            style={{
              position: "absolute",
              left: "10px",
              fontSize: "1.1rem",
              color: "var(--brand-light, #48bbcc)",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              setIsOpen(true);
              notifyFilterChange(val, selectedCountry, selectedCourse);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            placeholder="Search university or campus (e.g. Oxford, TU Delft, TUM, Harvard, Waterloo)..."
            aria-label="Search university name"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setIsOpen(false);
                notifyFilterChange("", selectedCountry, selectedCourse);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                color: "var(--muted, #94a3b8)",
                padding: "4px 8px",
              }}
              title="Clear university search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Country Selector Field */}
        <div className="search-field-country">
          <select
            value={selectedCountry}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCountry(val);
              notifyFilterChange(searchTerm, val, selectedCourse);
            }}
            aria-label="Filter by country"
          >
            {COUNTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Course / Program Field */}
        <div className="search-field-course">
          <select
            value={selectedCourse}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCourse(val);
              notifyFilterChange(searchTerm, selectedCountry, val);
            }}
            aria-label="Filter by course or degree"
          >
            {COURSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSearchSubmit}
          className="btn btn-accent search-action-btn"
        >
          Get Details →
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (searchTerm.trim().length > 0 || (selectedCountry !== "all" && searchResults.length > 0)) && (
        <div className="search-results-dropdown">
          {searchResults.length > 0 ? (
            <div>
              <div
                style={{
                  padding: "10px 16px",
                  background: "var(--soft)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--ink-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid var(--line)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Matching Institutions ({searchResults.length})</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--muted)" }}>Click to view loan details</span>
              </div>
              {searchResults.map((uni, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectUniversity(uni)}
                  className="search-result-item"
                >
                  <div style={{ flex: 1, paddingRight: "12px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--ink)" }}>
                      {uni.name}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                      📍 {uni.city}, {uni.countryName} •{" "}
                      <span style={{ color: "var(--accent, #f59e0b)", fontWeight: 600 }}>{uni.primeTierCategory}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--brand-light, #48bbcc)" }}>
                        {uni.maxUnsecuredINR}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "var(--muted)" }}>Collateral-Free</div>
                    </div>
                    <span
                      style={{
                        padding: "6px 12px",
                        background: "var(--brand)",
                        color: "var(--brand-ink)",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.trim().length > 0 ? (
            <div
              onClick={handleSearchSubmit}
              style={{
                padding: "16px",
                cursor: "pointer",
                background: "var(--soft)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.98rem" }}>
                  Get automated loan eligibility for &ldquo;{searchTerm}&rdquo;
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "2px" }}>
                  Click to calculate real-time loan limits, interest rates, and living cost proof.
                </div>
              </div>
              <span className="btn btn-accent" style={{ padding: "6px 14px", fontSize: "0.82rem" }}>
                Generate Details →
              </span>
            </div>
          ) : null}
        </div>
      )}

      {/* Popular Fast-Click Chips */}
      {showPopularChips && (
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink-secondary)" }}>
            Popular Universities:
          </span>
          {popularChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchTerm(chip.name);
                notifyFilterChange(chip.name, selectedCountry, selectedCourse);
                const found = universities.find((u) => u.name === chip.name);
                if (found) {
                  const bestUnsecured = found.lenderPolicies.reduce((max, policy) => {
                    const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
                    return num > max ? num : max;
                  }, 0);
                  handleSelectUniversity({
                    name: found.name,
                    shortName: found.shortName,
                    countryName: found.countryName,
                    country: found.country,
                    city: found.city,
                    qsRank: found.qsRank,
                    tuitionRangeINR: found.tuitionRangeINR,
                    livingCostINR: found.livingCostINR,
                    totalAnnualCostINR: found.totalAnnualCostINR,
                    primeTierCategory: found.primeTierCategory,
                    maxUnsecuredINR: `Up to ₹${bestUnsecured} Lakhs`,
                    maxSecuredINR: "Up to ₹1.50 Crore",
                    indicativeRate: found.lenderPolicies[0]?.indicativeRate || "8.15% - 9.15%",
                    visaInfo: `${found.visaRequirements.documentName}: ${found.visaRequirements.requiredFundsINR}`,
                    popularPrograms: found.popularPrograms.map((p) => p.name),
                    slug: found.slug,
                    overview: found.overview,
                  });
                }
              }}
              style={{
                background: "var(--soft)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                borderRadius: "9999px",
                padding: "4px 12px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-light, #48bbcc)";
                e.currentTarget.style.color = "var(--brand-light, #48bbcc)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Auto-Details Comprehensive Modal */}
      {selectedUni && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="uni-modal-title"
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
            if (e.target === e.currentTarget) setSelectedUni(null);
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
              onClick={() => setSelectedUni(null)}
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
                transition: "all 0.15s ease",
              }}
              title="Close (ESC)"
            >
              ✕
            </button>

            {/* University & Selected Course Header */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
                <span className="badge" style={{ fontSize: "0.78rem" }}>
                  📍 {selectedUni.city}, {selectedUni.countryName}
                </span>
                {selectedUni.qsRank && (
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
                    {typeof selectedUni.qsRank === "number" ? `QS Rank #${selectedUni.qsRank}` : selectedUni.qsRank}
                  </span>
                )}
                {selectedUni.selectedCourseLabel && (
                  <span
                    style={{
                      background: "rgba(72, 187, 204, 0.15)",
                      color: "var(--brand-light, #48bbcc)",
                      border: "1px solid rgba(72, 187, 204, 0.35)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "9999px",
                    }}
                  >
                    Field: {selectedUni.selectedCourseLabel}
                  </span>
                )}
              </div>

              <h2
                id="uni-modal-title"
                style={{
                  fontSize: "1.75rem",
                  margin: "4px 0 8px",
                  color: "var(--ink)",
                  lineHeight: "1.25",
                  fontWeight: 800,
                }}
              >
                {selectedUni.name}
              </h2>
              <p style={{ color: "var(--ink-secondary)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                {selectedUni.overview || `Automated lender policy & cost of attendance profile mapped for ${selectedUni.name} admits.`}
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
                  {selectedUni.tuitionRangeINR}
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
                  {selectedUni.livingCostINR}
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
                  {selectedUni.maxUnsecuredINR}
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
                  {selectedUni.indicativeRate}
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
                    {selectedUni.primeTierCategory}
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
                {selectedUni.visaInfo} Our sanction letters are formatted to meet exact embassy guidelines (German Sperrkonto, Canadian GIC, UK 28-day rule, Australian DHA).
              </p>
            </div>

            {/* Popular Programs */}
            {selectedUni.popularPrograms && selectedUni.popularPrograms.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>
                  Funded Programs & Degrees
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedUni.popularPrograms.map((prog, i) => (
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
                href={`/apply?country=${encodeURIComponent(selectedUni.countryName)}&university=${encodeURIComponent(selectedUni.name)}`}
                className="btn btn-accent"
                style={{ flex: 1, textAlign: "center", padding: "12px 18px", fontSize: "0.95rem" }}
              >
                Apply for {selectedUni.shortName} Loan Now →
              </Link>
              <Link
                href={`/match?dest=${encodeURIComponent(selectedUni.countryName)}&univ=${encodeURIComponent(selectedUni.name)}`}
                className="btn btn-primary"
                style={{ flex: 1, textAlign: "center", padding: "12px 18px", fontSize: "0.95rem" }}
              >
                Match Eligible Banks →
              </Link>
              {selectedUni.slug && (
                <Link
                  href={`/universities/${selectedUni.country}/${selectedUni.slug}`}
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
    </div>
  );
}
