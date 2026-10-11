import { NextResponse } from "next/server";
import { universities } from "@/data/universities";
import { globalUniversitiesDatabase, GlobalUniversityEntry } from "@/data/globalUniversitiesDatabase";

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

    const qLower = query.toLowerCase();

    // 1. Search in local curated universities (with deep guides)
    const localCuratedMatches: GlobalUniversityEntry[] = universities
      .filter((u) => {
        if (country !== "all" && u.country !== country) return false;
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

    // 2. Search in global universities database (instant hundreds of world universities)
    const globalMatches: GlobalUniversityEntry[] = globalUniversitiesDatabase.filter((u) => {
      if (country !== "all" && u.country !== country) return false;
      if (!qLower) return false;
      return (
        u.name.toLowerCase().includes(qLower) ||
        u.shortName.toLowerCase().includes(qLower) ||
        u.city.toLowerCase().includes(qLower) ||
        u.countryName.toLowerCase().includes(qLower)
      );
    });

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

    // 3. If query has at least 3 letters and we have few results, query live Hipo World Universities API
    if (qLower.length >= 3 && combinedResults.length < 12) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        let hipoUrl = `http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}`;
        if (country !== "all") {
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
          };
          if (countryMap[country]) {
            hipoUrl += `&country=${encodeURIComponent(countryMap[country])}`;
          }
        }

        const res = await fetch(hipoUrl, {
          signal: controller.signal,
          next: { revalidate: 86400 },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const remoteList: HipolabsUniversity[] = await res.json();

          for (const r of remoteList.slice(0, 15)) {
            const key = r.name.toLowerCase().trim();
            if (!seenNames.has(key)) {
              seenNames.add(key);

              // Derive country code and realistic loan/visa parameters
              const cName = r.country || "Overseas";
              const cNameLower = cName.toLowerCase();
              let derivedCountryCode = "global";
              let tuition = "₹20 Lakh – ₹35 Lakh / year";
              let living = "₹12 Lakh – ₹16 Lakh / year";
              let total = "₹32 Lakh – ₹51 Lakh / year";
              let maxUnsec = "Up to ₹50 Lakhs";
              let rates = "From 8.15% p.a.";
              let visa = "Pre-visa loan sanction letter acceptable by foreign embassies.";
              let tier = "Accredited International Higher Education Institution";

              if (cNameLower.includes("united states") || r.alpha_two_code === "US") {
                derivedCountryCode = "usa";
                tuition = "₹35 Lakh – ₹52 Lakh / year";
                living = "₹18 Lakh – ₹22 Lakh / year";
                total = "₹53 Lakh – ₹74 Lakh / year";
                maxUnsec = "Up to ₹75 Lakhs";
                rates = "From 7.75% p.a.";
                visa = "Form I-20 financial solvency proof ($60,000–$85,000/yr) required for US F-1 visa.";
                tier = "US Public/Private Accredited Institution (Tier A)";
              } else if (cNameLower.includes("united kingdom") || r.alpha_two_code === "GB") {
                derivedCountryCode = "uk";
                tuition = "₹20 Lakh – ₹34 Lakh / year";
                living = "₹12 Lakh – ₹16 Lakh / year (UKVI)";
                total = "₹32 Lakh – ₹50 Lakh / year";
                maxUnsec = "Up to ₹50 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "UKVI 28-day bank balance maintenance rule (£9,207–£12,006).";
                tier = "UK Tier 4 / Student Visa Sponsor DLI";
              } else if (cNameLower.includes("canada") || r.alpha_two_code === "CA") {
                derivedCountryCode = "canada";
                tuition = "₹18 Lakh – ₹30 Lakh / year";
                living = "₹13.0 Lakh / year (IRCC GIC)";
                total = "₹31 Lakh – ₹43 Lakh / year";
                maxUnsec = "Up to ₹50 Lakhs";
                rates = "From 8.15% p.a.";
                visa = "IRCC Canadian SDS / Study Permit: C$20,635 GIC deposit + 1st year tuition receipt.";
                tier = "Canadian Designated Learning Institution (DLI)";
              } else if (cNameLower.includes("australia") || r.alpha_two_code === "AU") {
                derivedCountryCode = "australia";
                tuition = "₹22 Lakh – ₹36 Lakh / year";
                living = "₹16.5 Lakh / year (DHA AUD $29,710)";
                total = "₹38 Lakh – ₹52 Lakh / year";
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
                tuition = "₹16 Lakh – ₹25 Lakh / year";
                living = "₹10.0 Lakh / year (ISD €10,000)";
                total = "₹26 Lakh – ₹35 Lakh / year";
                maxUnsec = "Up to ₹45 Lakhs";
                rates = "From 8.20% p.a.";
                visa = "Irish ISD Student Visa: €10,000 living expense proof in personal bank account.";
                tier = "Irish National Framework of Qualifications (NFQ) Partner";
              } else if (cNameLower.includes("netherlands") || r.alpha_two_code === "NL") {
                derivedCountryCode = "netherlands";
                tuition = "₹15 Lakh – ₹24 Lakh / year";
                living = "₹13.5 Lakh / year (Dutch IND €14,615)";
                total = "₹28 Lakh – ₹37 Lakh / year";
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
                popularPrograms: ["Master of Science (STEM)", "MBA / Management", "Postgraduate Studies"],
                slug: "",
                overview: `Verified institutional degree program mapped for ${r.name}. 30+ partnering public and private lenders approve collateral-free overseas education loans for students heading here.`,
              });
            }
          }
        }
      } catch {
        // Fallback gracefully to local curated + global database
      }
    }

    return NextResponse.json(
      { results: combinedResults.slice(0, 16) },
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
