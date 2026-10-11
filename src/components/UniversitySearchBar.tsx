"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { universities, UniversityData } from "@/data/universities";

// Additional global top universities for universal search coverage
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
    name: "McGill University",
    shortName: "McGill",
    countryName: "Canada",
    country: "canada",
    city: "Montreal, Quebec",
    qsRank: 30,
    tuitionRangeINR: "₹26 Lakh – ₹35 Lakh / year",
    livingCostINR: "₹13.0 Lakh / year",
    totalAnnualCostINR: "₹39 Lakh – ₹48 Lakh / year",
    primeTierCategory: "Canada Top 3 Medical-Doctoral (Prime Tier A)",
    maxUnsecuredINR: "₹55 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 8.15% p.a.",
    visaInfo: "Quebec CAQ + Canada Study Permit with living expense deposit.",
    popularPrograms: ["Master of Management in Analytics", "M.Sc. in Computer Science", "Full-Time MBA"],
    slug: "",
  },
  {
    name: "University of British Columbia",
    shortName: "UBC",
    countryName: "Canada",
    country: "canada",
    city: "Vancouver, British Columbia",
    qsRank: 34,
    tuitionRangeINR: "₹28 Lakh – ₹38 Lakh / year",
    livingCostINR: "₹13.0 Lakh / year (IRCC GIC)",
    totalAnnualCostINR: "₹41 Lakh – ₹51 Lakh / year",
    primeTierCategory: "Canada Top 3 Research University",
    maxUnsecuredINR: "₹55 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 8.15% p.a.",
    visaInfo: "C$20,635 Canadian GIC deposit + paid tuition receipt.",
    popularPrograms: ["Master of Data Science (MDS)", "Master of Business Analytics", "M.Eng. in Electrical Engineering"],
    slug: "",
  },
  {
    name: "University of Melbourne",
    shortName: "UniMelb",
    countryName: "Australia",
    country: "australia",
    city: "Melbourne, Victoria",
    qsRank: 13,
    tuitionRangeINR: "₹26 Lakh – ₹34 Lakh / year",
    livingCostINR: "₹16.8 Lakh / year (DHA Subclass 500)",
    totalAnnualCostINR: "₹42.8 Lakh – ₹50.8 Lakh / year",
    primeTierCategory: "Australia #1 University (Group of Eight - Go8 Tier AAA)",
    maxUnsecuredINR: "₹60 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "AUD $29,710 statutory living funds + electronic Confirmation of Enrolment (eCoE).",
    popularPrograms: ["Master of Information Technology", "Melbourne Business School MBA", "Master of Engineering"],
    slug: "",
  },
  {
    name: "University of Sydney",
    shortName: "USyd",
    countryName: "Australia",
    country: "australia",
    city: "Sydney, New South Wales",
    qsRank: 18,
    tuitionRangeINR: "₹27 Lakh – ₹35 Lakh / year",
    livingCostINR: "₹16.8 Lakh / year (DHA Subclass 500)",
    totalAnnualCostINR: "₹43.8 Lakh – ₹51.8 Lakh / year",
    primeTierCategory: "Group of Eight Global Top 20 (Tier AAA)",
    maxUnsecuredINR: "₹60 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "AUD $29,710 living allowance + 1st year tuition receipt for eCoE.",
    popularPrograms: ["Master of Data Science", "Master of Professional Engineering", "Master of Commerce"],
    slug: "",
  },
  {
    name: "University of New South Wales (UNSW Sydney)",
    shortName: "UNSW",
    countryName: "Australia",
    country: "australia",
    city: "Sydney, New South Wales",
    qsRank: 19,
    tuitionRangeINR: "₹27 Lakh – ₹35 Lakh / year",
    livingCostINR: "₹16.8 Lakh / year (DHA Subclass 500)",
    totalAnnualCostINR: "₹43.8 Lakh – ₹51.8 Lakh / year",
    primeTierCategory: "Australia #1 Engineering & Tech (Go8 Tier AAA)",
    maxUnsecuredINR: "₹60 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "AUD $29,710 living funds + 1st year tuition for Subclass 500 visa.",
    popularPrograms: ["Master of Information Technology", "Master of Engineering Science", "AGSM MBA"],
    slug: "",
  },
  {
    name: "Monash University",
    shortName: "Monash",
    countryName: "Australia",
    country: "australia",
    city: "Melbourne, Victoria",
    qsRank: 37,
    tuitionRangeINR: "₹25 Lakh – ₹33 Lakh / year",
    livingCostINR: "₹16.8 Lakh / year (DHA Subclass 500)",
    totalAnnualCostINR: "₹41.8 Lakh – ₹49.8 Lakh / year",
    primeTierCategory: "Group of Eight Global Top 40 (Tier AA)",
    maxUnsecuredINR: "₹55 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 8.15% p.a.",
    visaInfo: "AUD $29,710 living funds + eCoE deposit.",
    popularPrograms: ["Master of Artificial Intelligence", "Master of Banking and Finance", "Master of Cybersecurity"],
    slug: "",
  },
  {
    name: "National University of Singapore (NUS)",
    shortName: "NUS",
    countryName: "Singapore",
    country: "singapore",
    city: "Singapore",
    qsRank: 8,
    tuitionRangeINR: "₹24 Lakh – ₹35 Lakh / year",
    livingCostINR: "₹12 Lakh – ₹16 Lakh / year",
    totalAnnualCostINR: "₹36 Lakh – ₹51 Lakh / year",
    primeTierCategory: "Asia #1 University (Tier AAA Elite)",
    maxUnsecuredINR: "₹65 Lakhs",
    maxSecuredINR: "₹1.50 Crore",
    rates: "From 7.75% p.a.",
    visaInfo: "Singapore Student Pass financial guarantee letter.",
    popularPrograms: ["Master of Computing (CS / AI / Infosec)", "NUS MBA", "M.Sc. in Business Analytics"],
    slug: "",
  },
];

interface QuickDetailData {
  name: string;
  shortName: string;
  countryName: string;
  country: string;
  city: string;
  qsRank: number | string;
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
}

export default function UniversitySearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<QuickDetailData | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Keyboard shortcut '/' or 'Cmd+K' to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT") || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
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

  // Combined searchable catalogue
  const searchResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return [];

    const curatedMatches: QuickDetailData[] = universities
      .filter((u) => {
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
        };
      });

    const additionalMatches: QuickDetailData[] = additionalGlobalUniversities
      .filter((u) => {
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
  }, [searchTerm]);

  const handleSelectUniversity = (uni: QuickDetailData) => {
    setSelectedUni(uni);
    setIsOpen(false);
  };

  const handleCustomSearchEnter = () => {
    if (!searchTerm.trim()) return;
    if (searchResults.length > 0) {
      handleSelectUniversity(searchResults[0]);
    } else {
      // Dynamic profile generator for any unlisted university in the world
      setSelectedUni({
        name: searchTerm.trim(),
        shortName: searchTerm.trim().split(" ")[0],
        countryName: "Overseas Higher Education Institution",
        country: "global",
        city: "International Campus",
        qsRank: "Recognized Higher Education Institution",
        tuitionRangeINR: "₹18 Lakh – ₹32 Lakh / year (Estimated)",
        livingCostINR: "₹10 Lakh – ₹15 Lakh / year (Estimated)",
        totalAnnualCostINR: "₹28 Lakh – ₹47 Lakh / year",
        primeTierCategory: "Partner Lender Master Catalogue (1,500+ Institutions)",
        maxUnsecuredINR: "Up to ₹50 Lakhs",
        maxSecuredINR: "Up to ₹1.50 Crore",
        indicativeRate: "8.15% - 10.50%",
        visaInfo: "Financial solvency / loan sanction letter acceptable by foreign embassies.",
        popularPrograms: ["Master of Science (STEM)", "Master of Business Administration", "Postgraduate Certificate"],
        slug: "",
        overview: `We have automated loan underwriting arrangements for ${searchTerm.trim()}. Our 30+ partnering scheduled banks and NBFCs fund all accredited degree programs with pre-visa sanction letters.`,
      });
      setIsOpen(false);
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
    <div ref={searchContainerRef} style={{ width: "100%", maxWidth: "860px", margin: "0 auto" }}>
      {/* Search Bar Input Container */}
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(9, 71, 84, 0.12)",
          border: "2px solid #094754",
          display: "flex",
          alignItems: "center",
          padding: "6px 14px",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <span style={{ fontSize: "1.25rem", marginRight: "10px", color: "#094754" }}>🔍</span>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCustomSearchEnter();
            }
          }}
          placeholder="Search any university worldwide to get instant loan & visa details (e.g. Oxford, TU Delft, Harvard, TUM, Seneca)..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "1.05rem",
            padding: "12px 6px",
            color: "#0f172a",
            background: "transparent",
          }}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setIsOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              color: "#64748b",
              padding: "4px 8px",
            }}
            title="Clear"
          >
            ✕
          </button>
        )}

        <button
          type="button"
          onClick={handleCustomSearchEnter}
          className="btn btn-accent"
          style={{
            padding: "10px 18px",
            fontSize: "0.95rem",
            fontWeight: 700,
            borderRadius: "8px",
            marginLeft: "6px",
            whiteSpace: "nowrap",
          }}
        >
          Get Details
        </button>
      </div>

      {/* Instant Dropdown Results */}
      {isOpen && searchTerm.trim().length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            left: 0,
            right: 0,
            maxWidth: "860px",
            margin: "8px auto 0",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            maxHeight: "420px",
            overflowY: "auto",
          }}
        >
          {searchResults.length > 0 ? (
            <div>
              <div
                style={{
                  padding: "10px 16px",
                  background: "#f8fafc",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Instant Matching Universities ({searchResults.length})
              </div>
              {searchResults.map((uni, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectUniversity(uni)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "#094754" }}>
                      {uni.name}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>
                      📍 {uni.city}, {uni.countryName} • <span style={{ color: "#d97706", fontWeight: 600 }}>{uni.primeTierCategory}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#059669" }}>
                        {uni.maxUnsecuredINR}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#64748b" }}>Collateral-Free</div>
                    </div>
                    <span
                      style={{
                        padding: "5px 10px",
                        background: "#094754",
                        color: "#fff",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                      }}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              onClick={handleCustomSearchEnter}
              style={{
                padding: "16px",
                cursor: "pointer",
                background: "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.98rem" }}>
                  Get automated loan eligibility for &ldquo;{searchTerm}&rdquo;
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>
                  Click to generate instant loan breakdown across our 30+ partnering banks & NBFCs
                </div>
              </div>
              <span className="btn btn-accent" style={{ padding: "6px 14px", fontSize: "0.82rem" }}>
                Generate Details →
              </span>
            </div>
          )}
        </div>
      )}

      {/* Popular Fast-Click Chips */}
      <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>Popular Lookups:</span>
        {popularChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSearchTerm(chip.name);
              const found = universities.find((u) => u.name === chip.name);
              if (found) {
                const bestUnsecured = found.lenderPolicies.reduce((max, policy) => {
                  const num = parseInt(policy.maxUnsecuredINR.replace(/[^0-9]/g, ""), 10) || 0;
                  return num > max ? num : max;
                }, 0);
                setSelectedUni({
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
              } else {
                handleCustomSearchEnter();
              }
            }}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#334155",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#094754";
              e.currentTarget.style.color = "#094754";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#334155";
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* INSTANT UNIVERSITY DETAIL MODAL OVERLAY */}
      {selectedUni && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.65)",
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
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
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
                background: "#f1f5f9",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                color: "#475569",
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
                  📍 {selectedUni.city}, {selectedUni.countryName}
                </span>
                {selectedUni.qsRank && (
                  <span className="badge badge-accent" style={{ fontSize: "0.78rem" }}>
                    {typeof selectedUni.qsRank === "number" ? `QS Rank #${selectedUni.qsRank}` : selectedUni.qsRank}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: "1.75rem", margin: "4px 0 8px", color: "#094754", lineHeight: "1.25" }}>
                {selectedUni.name}
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: "1.5" }}>
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
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#64748b" }}>
                  Annual Tuition
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#094754", marginTop: "4px" }}>
                  {selectedUni.tuitionRangeINR}
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#64748b" }}>
                  Living Expenses
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#094754", marginTop: "4px" }}>
                  {selectedUni.livingCostINR}
                </div>
              </div>

              <div style={{ background: "#f0fdf4", padding: "14px", borderRadius: "10px", border: "1px solid #bbf7d0", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#166534" }}>
                  Max Collateral-Free
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#15803d", marginTop: "4px" }}>
                  {selectedUni.maxUnsecuredINR}
                </div>
              </div>

              <div style={{ background: "#eff6ff", padding: "14px", borderRadius: "10px", border: "1px solid #bfdbfe", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "#1e40af" }}>
                  Indicative Rates
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1d4ed8", marginTop: "4px" }}>
                  {selectedUni.indicativeRate}
                </div>
              </div>
            </div>

            {/* Lender Policy & Visa Details Box */}
            <div style={{ background: "var(--soft)", padding: "16px 20px", borderRadius: "12px", marginBottom: "22px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#094754", marginBottom: "8px" }}>
                🏛️ Lender Prime Classification: {selectedUni.primeTierCategory}
              </div>
              <div style={{ fontSize: "0.88rem", color: "#334155", lineHeight: "1.6" }}>
                *Admit holders are eligible for public sector prime interest rate concessions (up to 0.50% reduction for female scholars) and secured loans up to {selectedUni.maxSecuredINR}.
              </div>
              <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed #cbd5e1", fontSize: "0.85rem", color: "#475569" }}>
                <strong>🛂 Mandatory Visa Proof:</strong> {selectedUni.visaInfo}
              </div>
            </div>

            {/* Popular Programs */}
            {selectedUni.popularPrograms && selectedUni.popularPrograms.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase" }}>
                  Top Funded Degree Programs:
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedUni.popularPrograms.map((prog, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#f1f5f9",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        color: "#1e293b",
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
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "14px", borderTop: "1px solid #e2e8f0" }}>
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
