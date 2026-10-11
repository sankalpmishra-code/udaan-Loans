"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData } from "@/data/universities";
import { globalUniversitiesDatabase } from "@/data/globalUniversitiesDatabase";
import { isIndianInstitution, isIndianInstitutionQuery } from "@/lib/institutionFilters";

export const COUNTRY_OPTIONS = [
  { value: "all", label: "🌐 All Foreign Countries" },
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
  { value: "new-zealand", label: "🇳🇿 New Zealand" },
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
  isCuratedGuide?: boolean;
}

interface UniversitySearchBarProps {
  initialSearch?: string;
  initialCountry?: string;
  initialCourse?: string;
  onFilterChange?: (filters: {
    query: string;
    country: string;
    course: string;
    globalMatches?: QuickDetailData[];
  }) => void;
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

  // Status notices
  const [indianQueryNotice, setIndianQueryNotice] = useState(false);
  const [noMatchNotice, setNoMatchNotice] = useState(false);

  // Live remote search state
  const [remoteResults, setRemoteResults] = useState<QuickDetailData[]>([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);

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
      extraAdvice = "Eligible for extended 3-year post-study OPT work permits (USA) and specialized collateral-free foreign currency student loans.";
    } else if (courseKey === "engineering") {
      adjustedUnsecured = "Up to ₹50 Lakhs (Collateral-Free)";
      extraAdvice = "High global employer demand across automotive, semiconductor, and robotics hubs.";
    } else if (courseKey === "undergrad") {
      adjustedTuition = "₹18 Lakh – ₹38 Lakh / year";
      adjustedUnsecured = "Up to ₹35 Lakhs (Cosigner Required)";
      extraAdvice = "Undergraduate degree loans usually require a parent/guardian financial co-signer with proven ITR.";
    }

    return {
      ...baseUni,
      tuitionRangeINR: adjustedTuition,
      maxUnsecuredINR: adjustedUnsecured,
      selectedCourseLabel: courseLabel,
      overview: extraAdvice ? `${baseUni.overview || ""} ${extraAdvice}`.trim() : baseUni.overview,
    };
  };

  // Live remote search debounced query to `/api/universities/search`
  useEffect(() => {
    const q = searchTerm.trim();

    if (isIndianInstitutionQuery(q)) {
      setIndianQueryNotice(true);
      setNoMatchNotice(false);
      setRemoteResults([]);
      setIsSearchingOnline(false);
      return;
    } else {
      setIndianQueryNotice(false);
    }

    if (q.length < 2) {
      setRemoteResults([]);
      setIsSearchingOnline(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingOnline(true);
      try {
        const res = await fetch(
          `/api/universities/search?q=${encodeURIComponent(q)}&country=${encodeURIComponent(selectedCountry)}&course=${encodeURIComponent(selectedCourse)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.isIndianQuery) {
            setIndianQueryNotice(true);
            setRemoteResults([]);
          } else if (Array.isArray(data.results)) {
            setRemoteResults(data.results);
            if (data.results.length > 0) {
              setNoMatchNotice(false);
            }
          }
        }
      } catch {
        // Fallback gracefully
      } finally {
        setIsSearchingOnline(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCountry, selectedCourse]);

  // Combined searchable catalogue (Curated + Global Database + Live Remote)
  // Strictly foreign institutions only - zero domestic Indian colleges
  const searchResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    if (!q && selectedCountry === "all") return [];
    if (isIndianInstitutionQuery(q)) return [];

    // 1. Curated list
    const curatedMatches: QuickDetailData[] = universities
      .filter((u) => {
        if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
        if (selectedCountry !== "all" && u.country !== selectedCountry) return false;
        if (!q) return true;
        return (
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.countryName.toLowerCase().includes(q)
        );
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
          isCuratedGuide: true,
        };
      });

    // 2. Global Database list
    const globalMatches: QuickDetailData[] = globalUniversitiesDatabase
      .filter((u) => {
        if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
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
        ...u,
        isCuratedGuide: Boolean(u.slug),
      }));

    // Deduplicate and combine with remoteResults
    const seen = new Set<string>();
    const combined: QuickDetailData[] = [];

    for (const item of [...curatedMatches, ...globalMatches, ...remoteResults]) {
      if (isIndianInstitution(item.name, item.countryName, item.country)) continue;
      const key = item.name.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(item);
      }
    }

    return combined.slice(0, 16);
  }, [searchTerm, selectedCountry, remoteResults]);

  // Notify parent of filter changes in real-time, including discovered matches
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        query: searchTerm,
        country: selectedCountry,
        course: selectedCourse,
        globalMatches: searchResults,
      });
    }
  }, [searchTerm, selectedCountry, selectedCourse, searchResults, onFilterChange]);

  const handleSelectUniversity = (uni: QuickDetailData) => {
    const customized = getCourseAdjustedDetails(uni, selectedCourse);
    setIsOpen(false);
    setIndianQueryNotice(false);
    setNoMatchNotice(false);
    if (onSelectUniversity) {
      onSelectUniversity(customized);
    } else {
      setSelectedUni(customized);
    }
  };

  const handleSearchSubmit = async () => {
    const q = searchTerm.trim();
    if (!q) {
      if (searchResults.length > 0) {
        handleSelectUniversity(searchResults[0]);
      }
      return;
    }

    // 1. Strict check: Indian domestic institution
    if (isIndianInstitutionQuery(q)) {
      setIndianQueryNotice(true);
      setNoMatchNotice(false);
      setIsOpen(false);
      return;
    }
    setIndianQueryNotice(false);

    // 2. If we already have matching search results, select the top real institution
    if (searchResults.length > 0) {
      handleSelectUniversity(searchResults[0]);
      return;
    }

    // 3. Check local database ignoring selected country filter (e.g. if user selected "UK" but searched "Purdue" or "Deakin")
    const ql = q.toLowerCase();
    const foundCurated = universities.find((u) => {
      if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
      return (
        u.name.toLowerCase().includes(ql) ||
        u.shortName.toLowerCase().includes(ql) ||
        u.city.toLowerCase().includes(ql)
      );
    });

    if (foundCurated) {
      const bestUnsecured = foundCurated.lenderPolicies.reduce((max, policy) => {
        const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
        return num > max ? num : max;
      }, 0);
      handleSelectUniversity({
        name: foundCurated.name,
        shortName: foundCurated.shortName,
        countryName: foundCurated.countryName,
        country: foundCurated.country,
        city: foundCurated.city,
        qsRank: foundCurated.qsRank,
        tuitionRangeINR: foundCurated.tuitionRangeINR,
        livingCostINR: foundCurated.livingCostINR,
        totalAnnualCostINR: foundCurated.totalAnnualCostINR,
        primeTierCategory: foundCurated.primeTierCategory,
        maxUnsecuredINR: `Up to ₹${bestUnsecured} Lakhs`,
        maxSecuredINR: "Up to ₹1.50 Crore",
        indicativeRate: foundCurated.lenderPolicies[0]?.indicativeRate || "8.15% - 9.15%",
        visaInfo: `${foundCurated.visaRequirements.documentName}: ${foundCurated.visaRequirements.requiredFundsINR}`,
        popularPrograms: foundCurated.popularPrograms.map((p) => p.name),
        slug: foundCurated.slug,
        overview: foundCurated.overview,
        isCuratedGuide: true,
      });
      return;
    }

    const foundGlobal = globalUniversitiesDatabase.find((u) => {
      if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
      return (
        u.name.toLowerCase().includes(ql) ||
        u.shortName.toLowerCase().includes(ql) ||
        u.city.toLowerCase().includes(ql)
      );
    });

    if (foundGlobal) {
      handleSelectUniversity({
        ...foundGlobal,
        isCuratedGuide: Boolean(foundGlobal.slug),
      });
      return;
    }

    // 4. Perform immediate live lookup from server endpoint
    setIsSearchingOnline(true);
    try {
      const res = await fetch(
        `/api/universities/search?q=${encodeURIComponent(q)}&country=${encodeURIComponent(selectedCountry)}&course=${encodeURIComponent(selectedCourse)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.isIndianQuery) {
          setIndianQueryNotice(true);
          setIsOpen(false);
          return;
        }
        if (Array.isArray(data.results) && data.results.length > 0) {
          handleSelectUniversity(data.results[0]);
          return;
        }
      }
    } catch {
      // ignore
    } finally {
      setIsSearchingOnline(false);
    }

    // 5. If no foreign university found:
    // DO NOT OPEN A DUMMY MODAL WITH "International Campus"!
    setNoMatchNotice(true);
    setIsOpen(false);
  };

  const popularChips = [
    { label: "🇺🇸 Purdue", name: "Purdue University" },
    { label: "🇦🇺 Deakin", name: "Deakin University" },
    { label: "🇨🇦 Fanshawe", name: "Fanshawe College of Applied Arts and Technology" },
    { label: "🇨🇦 Seneca", name: "Seneca Polytechnic (Seneca College)" },
    { label: "🇨🇦 Humber", name: "Humber College Institute of Technology" },
    { label: "🇬🇧 Oxford", name: "University of Oxford" },
    { label: "🇩🇪 TUM Munich", name: "Technical University of Munich" },
    { label: "🇳🇱 TU Delft", name: "Delft University of Technology" },
    { label: "🇨🇦 Waterloo", name: "University of Waterloo" },
    { label: "🇦🇺 Melbourne", name: "University of Melbourne" },
    { label: "🇺🇸 Cornell", name: "Cornell University" },
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
              left: "14px",
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
              setNoMatchNotice(false);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            placeholder="Search ANY overseas university or college (e.g. Purdue, Fanshawe, Seneca, Deakin, Oxford)..."
            aria-label="Search overseas university name"
            style={{
              color: "var(--ink, #0f172a)",
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setIsOpen(false);
                setNoMatchNotice(false);
                setIndianQueryNotice(false);
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
              setNoMatchNotice(false);
            }}
            aria-label="Filter by country"
            style={{
              color: "var(--ink, #0f172a)",
            }}
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
            }}
            aria-label="Filter by course or degree"
            style={{
              color: "var(--ink, #0f172a)",
            }}
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
          {isSearchingOnline ? "Searching..." : "Get Details →"}
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
                  alignItems: "center",
                }}
              >
                <span>Matching Institutions ({searchResults.length})</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--muted)" }}>
                  Click to view verified loan & visa details
                </span>
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
          ) : indianQueryNotice ? (
            <div style={{ padding: "16px", background: "var(--soft)", color: "var(--ink)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#ef4444", marginBottom: "4px" }}>
                ℹ️ Domestic Indian Institution Detected
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: "1.4" }}>
                Udaan Edu Loans provides financing exclusively for foreign/overseas education (USA, UK, Canada, Australia, Germany, Ireland, Europe). Domestic Indian institutions are not eligible for overseas education loan programs.
              </div>
            </div>
          ) : searchTerm.trim().length >= 2 ? (
            <div style={{ padding: "16px", background: "var(--soft)", color: "var(--ink)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--ink)", marginBottom: "4px" }}>
                {isSearchingOnline ? "Searching institutions..." : `No foreign institution matching "${searchTerm}"`}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: "1.4" }}>
                Please check the spelling or search by country (e.g. Purdue, Fanshawe, Seneca, Deakin, Oxford).
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Indian Institution Alert Banner */}
      {indianQueryNotice && (
        <div
          style={{
            marginTop: "12px",
            padding: "14px 18px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>ℹ️</span>
          <div style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>
            <strong>Overseas Studies Scope:</strong> Udaan Edu Loans exclusively arranges collateral-free education loans for students admitted to recognized overseas / foreign institutions (USA, UK, Canada, Australia, Germany, Ireland, Europe). Domestic Indian institutions are not eligible for overseas education loan programs.
          </div>
        </div>
      )}

      {/* No Match Alert Banner */}
      {noMatchNotice && (
        <div
          style={{
            marginTop: "12px",
            padding: "14px 18px",
            borderRadius: "12px",
            background: "var(--soft)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>🔍</span>
          <div style={{ fontSize: "0.88rem", lineHeight: "1.5" }}>
            No foreign institution found matching &ldquo;{searchTerm}&rdquo;. Please verify the spelling or select from our verified overseas universities directory below.
          </div>
        </div>
      )}

      {/* Popular Fast-Click Chips */}
      {showPopularChips && (
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink-secondary)" }}>
            Popular Global Lookups:
          </span>
          {popularChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchTerm(chip.name);
                setIndianQueryNotice(false);
                setNoMatchNotice(false);
                // Search in curated or global
                const foundCurated = universities.find((u) => u.name === chip.name);
                if (foundCurated) {
                  const bestUnsecured = foundCurated.lenderPolicies.reduce((max, policy) => {
                    const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
                    return num > max ? num : max;
                  }, 0);
                  handleSelectUniversity({
                    name: foundCurated.name,
                    shortName: foundCurated.shortName,
                    countryName: foundCurated.countryName,
                    country: foundCurated.country,
                    city: foundCurated.city,
                    qsRank: foundCurated.qsRank,
                    tuitionRangeINR: foundCurated.tuitionRangeINR,
                    livingCostINR: foundCurated.livingCostINR,
                    totalAnnualCostINR: foundCurated.totalAnnualCostINR,
                    primeTierCategory: foundCurated.primeTierCategory,
                    maxUnsecuredINR: `Up to ₹${bestUnsecured} Lakhs`,
                    maxSecuredINR: "Up to ₹1.50 Crore",
                    indicativeRate: foundCurated.lenderPolicies[0]?.indicativeRate || "8.15% - 9.15%",
                    visaInfo: `${foundCurated.visaRequirements.documentName}: ${foundCurated.visaRequirements.requiredFundsINR}`,
                    popularPrograms: foundCurated.popularPrograms.map((p) => p.name),
                    slug: foundCurated.slug,
                    overview: foundCurated.overview,
                    isCuratedGuide: true,
                  });
                  return;
                }

                const foundGlobal = globalUniversitiesDatabase.find((u) => u.name === chip.name);
                if (foundGlobal) {
                  handleSelectUniversity({
                    ...foundGlobal,
                    isCuratedGuide: Boolean(foundGlobal.slug),
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

      {/* Auto-Details Comprehensive Modal (Used when onSelectUniversity is not passed) */}
      {!onSelectUniversity && selectedUni && (
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
                  Indicative Rates
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent, #f59e0b)", marginTop: "4px" }}>
                  {selectedUni.indicativeRate}
                </div>
              </div>
            </div>

            {/* Institutional Tier & Loan Policy */}
            <div
              style={{
                background: "var(--soft)",
                borderRadius: "12px",
                padding: "18px 20px",
                border: "1px solid var(--line)",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "0.76rem", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-secondary)" }}>
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
