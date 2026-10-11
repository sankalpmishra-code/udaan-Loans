import { NextResponse } from "next/server";
import { universities } from "@/data/universities";
import { globalUniversitiesDatabase, GlobalUniversityEntry } from "@/data/globalUniversitiesDatabase";
import { isIndianInstitution, isIndianInstitutionQuery } from "@/lib/institutionFilters";

interface HipolabsUniversity {
  name: string;
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
  domains: string[];
  web_pages: string[];
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("q") || "").trim();
    const country = (searchParams.get("country") || "all").toLowerCase().trim();
    const course = (searchParams.get("course") || "all").toLowerCase().trim();

    if (!query && country === "all") {
      return NextResponse.json({ results: [] });
    }

    // STRICT FILTER: If user searched an Indian college or "india", return empty immediately
    if (isIndianInstitutionQuery(query)) {
      return NextResponse.json({
        results: [],
        isIndianQuery: true,
        notice: "Udaan Edu Loans facilitates financing exclusively for foreign/overseas education (USA, UK, Canada, Australia, Germany, Ireland, Europe). Domestic Indian institutions are not eligible for overseas education loan programs."
      });
    }

    const qLower = query.toLowerCase();

    // 1. Search in local curated universities (with deep guides) - STRICTLY EXCLUDE INDIA
    const matchCurated = (filterCountry: boolean) => universities
      .filter((u) => {
        if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
        if (filterCountry && country !== "all" && u.country !== country) return false;
        if (!qLower) return true;
        return (
          u.name.toLowerCase().includes(qLower) ||
          u.shortName.toLowerCase().includes(qLower) ||
          u.city.toLowerCase().includes(qLower) ||
          u.countryName.toLowerCase().includes(qLower)
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
          country: u.country,
          countryName: u.countryName,
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

    // 2. Search in global universities database (hundreds of foreign world universities)
    const matchGlobal = (filterCountry: boolean) => globalUniversitiesDatabase.filter((u) => {
      if (isIndianInstitution(u.name, u.countryName, u.country)) return false;
      if (filterCountry && country !== "all" && u.country !== country) return false;
      if (!qLower) return false;
      return (
        u.name.toLowerCase().includes(qLower) ||
        u.shortName.toLowerCase().includes(qLower) ||
        u.city.toLowerCase().includes(qLower) ||
        u.countryName.toLowerCase().includes(qLower)
      );
    });

    let localCuratedMatches = matchCurated(true);
    let globalMatches = matchGlobal(true);

    // If no results found with specific country filter, retry search globally across all foreign countries
    if (localCuratedMatches.length === 0 && globalMatches.length === 0 && country !== "all") {
      localCuratedMatches = matchCurated(false);
      globalMatches = matchGlobal(false);
    }

    // Combine local results and deduplicate by lowercased university name
    const seenNames = new Set<string>();
    const combinedResults: GlobalUniversityEntry[] = [];

    for (const item of [...localCuratedMatches, ...globalMatches]) {
      const key = item.name.toLowerCase().trim();
      if (!seenNames.has(key)) {
        seenNames.add(key);
        combinedResults.push(item);
      }
    }

    // 3. Query external live world universities database for any unlisted foreign college
    if (qLower.length >= 2 && combinedResults.length < 15) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2600);

        let hipoUrl = `http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}`;
        const countryMap: Record<string, string> = {
          uk: "United Kingdom",
          usa: "United States",
          canada: "Canada",
          australia: "Australia",
          germany: "Germany",
          ireland: "Ireland",
          netherlands: "Netherlands",
          france: "France",
          sweden: "Sweden",
          italy: "Italy",
          switzerland: "Switzerland",
          "new-zealand": "New Zealand",
        };

        if (country !== "all" && countryMap[country]) {
          hipoUrl += `&country=${encodeURIComponent(countryMap[country])}`;
        }

        const res = await fetch(hipoUrl, {
          signal: controller.signal,
          next: { revalidate: 86400 },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const remoteList: HipolabsUniversity[] = await res.json();

          for (const r of remoteList.slice(0, 20)) {
            const cName = r.country || "Overseas";
            const cNameLower = cName.toLowerCase();

            // STRICT FILTER: EXCLUDE INDIA
            if (isIndianInstitution(r.name, cName, r.alpha_two_code)) {
              continue;
            }

            const key = r.name.toLowerCase().trim();
            if (!seenNames.has(key)) {
              seenNames.add(key);

              // Derive country code and realistic loan/visa parameters
              let derivedCountryCode = "global";
              let tuition = "₹18 Lakh – ₹32 Lakh / year";
              let living = "₹12 Lakh – ₹16 Lakh / year";
              let total = "₹30 Lakh – ₹48 Lakh / year";
              let maxUnsec = "Up to ₹50 Lakhs";
              let rates = "From 8.15% p.a.";
              let visa = "Pre-visa loan sanction letter acceptable by foreign embassies.";
              let tier = "Accredited Overseas Higher Education Institution";

              if (cNameLower.includes("united states") || r.alpha_two_code === "US") {
                derivedCountryCode = "usa";
                tuition = "₹32 Lakh – ₹48 Lakh / year";
                living = "₹18 Lakh – ₹22 Lakh / year";
                total = "₹50 Lakh – ₹70 Lakh / year";
                maxUnsec = "Up to ₹75 Lakhs";
                rates = "From 7.75% p.a.";
                visa = "Form I-20 financial solvency proof ($55,000–$80,000/yr) required for US F-1 visa.";
                tier = "US Public / Private Accredited Institution (SEVP Certified)";
              } else if (cNameLower.includes("united kingdom") || r.alpha_two_code === "GB") {
                derivedCountryCode = "uk";
                tuition = "₹16 Lakh – ₹28 Lakh / year";
                living = "₹12 Lakh – ₹16 Lakh / year (UKVI)";
                total = "₹28 Lakh – ₹44 Lakh / year";
                maxUnsec = "Up to ₹50 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "UKVI 28-day bank balance maintenance rule (£9,207–£12,006).";
                tier = "UK Tier 4 / Student Visa Sponsor DLI";
              } else if (cNameLower.includes("canada") || r.alpha_two_code === "CA") {
                derivedCountryCode = "canada";
                const isCollege = r.name.toLowerCase().includes("college") || r.name.toLowerCase().includes("polytechnic");
                tuition = isCollege ? "₹11 Lakh – ₹16 Lakh / year" : "₹18 Lakh – ₹32 Lakh / year";
                living = "₹13.0 Lakh / year (IRCC GIC C$20,635)";
                total = isCollege ? "₹24 Lakh – ₹29 Lakh / year" : "₹31 Lakh – ₹45 Lakh / year";
                maxUnsec = isCollege ? "Up to ₹45 Lakhs" : "Up to ₹50 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "IRCC Canadian SDS / Study Permit: C$20,635 GIC deposit + 1st year tuition receipt.";
                tier = isCollege ? "Canadian Public DLI College (Post-Grad Work Permit Approved)" : "Canadian Designated Learning Institution (DLI)";
              } else if (cNameLower.includes("australia") || r.alpha_two_code === "AU") {
                derivedCountryCode = "australia";
                tuition = "₹20 Lakh – ₹34 Lakh / year";
                living = "₹16.5 Lakh / year (DHA AUD $29,710)";
                total = "₹36.5 Lakh – ₹50.5 Lakh / year";
                maxUnsec = "Up to ₹50 Lakhs";
                rates = "From 8.25% p.a.";
                visa = "Australian Subclass 500: AUD $29,710 living fund proof + 1st year tuition + OSHC.";
                tier = "Australian CRICOS Registered Higher Education Provider";
              } else if (cNameLower.includes("germany") || r.alpha_two_code === "DE") {
                derivedCountryCode = "germany";
                tuition = "₹0 – ₹4 Lakh / year (Public Subsidized)";
                living = "₹11.0 Lakh / year (Sperrkonto €11,904)";
                total = "₹11 Lakh – ₹15 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.00% p.a.";
                visa = "German Student Visa §16b: Mandatory Sperrkonto (Blocked Account) of €11,904.";
                tier = "German State Accredited Institution (Anabin H+)";
              } else if (cNameLower.includes("ireland") || r.alpha_two_code === "IE") {
                derivedCountryCode = "ireland";
                tuition = "₹14 Lakh – ₹24 Lakh / year";
                living = "₹10.0 Lakh / year (ISD €10,000)";
                total = "₹24 Lakh – ₹34 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.20% p.a.";
                visa = "Irish ISD Student Visa: €10,000 living expense proof in personal bank account.";
                tier = "Irish National Framework of Qualifications (NFQ) Partner";
              } else if (cNameLower.includes("netherlands") || r.alpha_two_code === "NL") {
                derivedCountryCode = "netherlands";
                tuition = "₹14 Lakh – ₹24 Lakh / year";
                living = "₹13.5 Lakh / year (Dutch IND €14,615)";
                total = "₹27.5 Lakh – ₹37.5 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "Dutch IND MVV Visa: €14,615 living funds guarantee.";
                tier = "Dutch Research University (WO) / UAS (HBO)";
              } else if (cNameLower.includes("france") || r.alpha_two_code === "FR") {
                derivedCountryCode = "france";
                tuition = "₹4 Lakh – ₹22 Lakh / year";
                living = "₹8 Lakh – ₹12 Lakh / year";
                total = "₹12 Lakh – ₹34 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "Campus France VLS-TS Visa: Proof of minimum €615/month living funds.";
                tier = "French State Recognized Institution";
              } else if (cNameLower.includes("new zealand") || r.alpha_two_code === "NZ") {
                derivedCountryCode = "new-zealand";
                tuition = "₹18 Lakh – ₹28 Lakh / year";
                living = "₹12.0 Lakh / year (INZ NZ$20,000)";
                total = "₹30 Lakh – ₹40 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.20% p.a.";
                visa = "Immigration New Zealand (INZ): Proof of NZ$20,000/year living expenses.";
                tier = "New Zealand Accredited Higher Education Institution";
              } else if (cNameLower.includes("sweden") || r.alpha_two_code === "SE") {
                derivedCountryCode = "sweden";
                tuition = "₹12 Lakh – ₹22 Lakh / year";
                living = "₹11.0 Lakh / year (Migrationsverket)";
                total = "₹23 Lakh – ₹33 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "Swedish Migration Agency: Proof of SEK 10,314/month living balance.";
                tier = "Swedish Higher Education Authority (UKÄ) Recognized";
              } else if (cNameLower.includes("italy") || r.alpha_two_code === "IT") {
                derivedCountryCode = "italy";
                tuition = "₹2.5 Lakh – ₹5.0 Lakh / year";
                living = "₹9.5 Lakh / year";
                total = "₹12 Lakh – ₹14.5 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.20% p.a.";
                visa = "Italian National Visa (Type D): Proof of €6,000/year living maintenance.";
                tier = "Italian Ministry of University and Research (MUR) Recognized";
              } else if (cNameLower.includes("switzerland") || r.alpha_two_code === "CH") {
                derivedCountryCode = "switzerland";
                tuition = "₹2 Lakh – ₹8 Lakh / year";
                living = "₹18 Lakh – ₹24 Lakh / year (CHF 21,000)";
                total = "₹20 Lakh – ₹32 Lakh / year";
                maxUnsec = "Up to ₹50 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "Swiss Student Visa: Mandatory proof of CHF 21,000 living expenses.";
                tier = "Swiss Federal / Cantonal Accredited Higher Education Institution";
              }

              combinedResults.push({
                name: r.name,
                shortName: r.name.split(" ")[0],
                country: derivedCountryCode,
                countryName: cName,
                city: r["state-province"] ? `${r["state-province"]}, ${cName}` : cName,
                qsRank: "Global Recognized Higher Education Institution",
                tuitionRangeINR: tuition,
                livingCostINR: living,
                totalAnnualCostINR: total,
                primeTierCategory: tier,
                maxUnsecuredINR: maxUnsec,
                maxSecuredINR: "Up to ₹1.50 Crore",
                indicativeRate: rates,
                visaInfo: visa,
                popularPrograms: ["Master of Science (STEM)", "MBA / Management", "Postgraduate Certificate"],
                slug: "",
                overview: `Verified institutional degree program mapped for ${r.name}. 30+ partnering public and private lenders approve collateral-free overseas education loans for students heading here.`,
              });
            }
          }
        }
      } catch {
        // Fallback gracefully
      }
    }

    // Final safety filter: strictly exclude any Indian institution
    const foreignOnlyResults = combinedResults.filter(
      (u) => !isIndianInstitution(u.name, u.countryName, u.country)
    );

    return NextResponse.json(
      { results: foreignOnlyResults.slice(0, 16) },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("University search API error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
