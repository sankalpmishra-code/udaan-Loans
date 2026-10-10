import { LenderProduct, lenderCatalogue } from "@/data/lenderCatalogue";

export interface StudentProfileInput {
  country: string;
  degreeLevel: string; // "Master's" | "MBA" | "STEM" | "UG" | "Other"
  loanAmount: number;
  hasCollateral: boolean;
  collateralType?: "Property" | "Fixed Deposit" | "None";
  coApplicantIncome: number; // Monthly in INR
  coApplicantRelation: string; // "Parents" | "Spouse" | "Siblings" | "Uncles/Aunts" | "None"
  hasAdmit: boolean;
}

export type MatchStatus = "potential_fit" | "needs_verification" | "unlikely_fit";

export interface MatchResultItem {
  product: LenderProduct;
  status: MatchStatus;
  statusLabel: string;
  statusColor: "green" | "amber" | "red";
  score: number; // 0 to 100 for sorting
  passedRules: string[];
  failedRules: string[];
  verificationNeeded: string[];
  verdictSummary: string;
}

/**
 * Two-Stage Transparent Matcher Engine
 * Stage A: Hard Eligibility Filters
 * Stage B: Multi-Factor Comparative Ranking & Explanation Logging
 */
export function evaluateStudentLenderMatches(profile: StudentProfileInput): MatchResultItem[] {
  const results: MatchResultItem[] = [];

  for (const lender of lenderCatalogue) {
    const passedRules: string[] = [];
    const failedRules: string[] = [];
    const verificationNeeded: string[] = [];

    // --- STAGE A: HARD ELIGIBILITY FILTERS ---

    // 1. Country Eligibility Check
    const isCountryAccepted =
      lender.acceptedCountries.includes("All") ||
      lender.acceptedCountries.some(
        (c) => c.toLowerCase() === profile.country.toLowerCase()
      );

    if (isCountryAccepted) {
      passedRules.push(`Destination (${profile.country}): Officially supported`);
    } else {
      failedRules.push(`Destination (${profile.country}): Lender does not finance this country`);
    }

    // 2. Collateral Constraint Check
    let isCollateralEligible = true;
    if (lender.requiresCollateral) {
      if (profile.hasCollateral && profile.collateralType !== "None") {
        passedRules.push(`Collateral: ${profile.collateralType} pledged (Meets secured requirement)`);
      } else {
        isCollateralEligible = false;
        failedRules.push(`Collateral: Mandatory tangible property/FD required for this product`);
      }
    } else {
      // Unsecured product
      if (profile.loanAmount > lender.maxUnsecuredLimitINR) {
        if (!profile.hasCollateral) {
          isCollateralEligible = false;
          failedRules.push(
            `Loan Amount (₹${(profile.loanAmount / 1e5).toFixed(0)}L) exceeds collateral-free cap of ₹${(
              lender.maxUnsecuredLimitINR / 1e5
            ).toFixed(0)}L`
          );
        } else {
          verificationNeeded.push(
            `Requested amount exceeds unsecured cap; property collateral can bridge the difference up to ₹${(
              lender.maxSecuredLimitINR / 1e5
            ).toFixed(0)}L`
          );
        }
      } else {
        passedRules.push(
          `Loan Amount (₹${(profile.loanAmount / 1e5).toFixed(0)}L): Within collateral-free ceiling of ₹${(
            lender.maxUnsecuredLimitINR / 1e5
          ).toFixed(0)}L`
        );
      }
    }

    // 3. Co-Applicant Income Check
    let isIncomeEligible = true;
    if (lender.minCoApplicantMonthlyIncomeINR > 0) {
      if (profile.coApplicantIncome >= lender.minCoApplicantMonthlyIncomeINR) {
        passedRules.push(
          `Co-Applicant Income (₹${profile.coApplicantIncome.toLocaleString("en-IN")}/mo): Meets minimum ₹${lender.minCoApplicantMonthlyIncomeINR.toLocaleString("en-IN")}/mo`
        );
      } else {
        isIncomeEligible = false;
        failedRules.push(
          `Co-Applicant Income (₹${profile.coApplicantIncome.toLocaleString("en-IN")}/mo): Below lender threshold of ₹${lender.minCoApplicantMonthlyIncomeINR.toLocaleString("en-IN")}/mo`
        );
      }
    } else {
      passedRules.push("Co-Applicant: No Indian co-signer or income proof required by this lender");
    }

    // 4. Co-Applicant Relationship Check
    if (lender.acceptedCoApplicantRelations.length > 0) {
      if (
        profile.coApplicantRelation &&
        lender.acceptedCoApplicantRelations.includes(profile.coApplicantRelation)
      ) {
        passedRules.push(`Co-Applicant Relation (${profile.coApplicantRelation}): Permitted co-borrower`);
      } else if (profile.coApplicantRelation === "None" && lender.minCoApplicantMonthlyIncomeINR > 0) {
        isIncomeEligible = false;
        failedRules.push("Co-Applicant: Mandatory co-borrower with regular income required");
      } else {
        verificationNeeded.push(
          `Co-Applicant Relation (${profile.coApplicantRelation}): Requires special underwriter exception`
        );
      }
    }

    // 5. University Admit Status
    if (!profile.hasAdmit) {
      verificationNeeded.push("Admit Letter: Sanction is provisional pending final university admission offer");
    }

    // --- STAGE B: DETERMINATION & SCORING ---

    let status: MatchStatus = "potential_fit";
    let statusLabel = "Potential Fit";
    let statusColor: "green" | "amber" | "red" = "green";
    let verdictSummary = "";
    let baseScore = 50;

    if (failedRules.length > 0) {
      status = "unlikely_fit";
      statusLabel = "Unlikely Fit";
      statusColor = "red";
      baseScore = 20;
      verdictSummary = `Does not meet ${failedRules.length} mandatory published criteria (${failedRules[0]}).`;
    } else if (verificationNeeded.length > 0) {
      status = "needs_verification";
      statusLabel = "Needs Verification";
      statusColor = "amber";
      baseScore = 65;
      verdictSummary = `Appears eligible, but ${verificationNeeded.length} factors require loan advisor verification.`;
    } else {
      status = "potential_fit";
      statusLabel = "Potential Fit";
      statusColor = "green";
      baseScore = 90;
      verdictSummary = "Profile strictly satisfies all published underwriting criteria.";
    }

    // Scoring modifiers based on financial attractiveness (lowest rate, fastest processing)
    if (status !== "unlikely_fit") {
      // Lower rates score higher
      const rateScore = Math.max(0, (14 - lender.indicativeRateMin) * 2);
      // Fast processing scores higher
      const speedScore = Math.max(0, (20 - lender.processingTimeDaysMin) * 0.5);
      // Zero margin money scores higher
      const marginScore = lender.marginMoneyPercent === 0 ? 5 : 0;

      baseScore += rateScore + speedScore + marginScore;
    }

    results.push({
      product: lender,
      status,
      statusLabel,
      statusColor,
      score: Math.min(99, Math.round(baseScore)),
      passedRules,
      failedRules,
      verificationNeeded,
      verdictSummary,
    });
  }

  // Sort: Potential Fit first (by score descending), then Needs Verification, then Unlikely Fit
  return results.sort((a, b) => {
    const statusPriority = { potential_fit: 3, needs_verification: 2, unlikely_fit: 1 };
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[b.status] - statusPriority[a.status];
    }
    return b.score - a.score;
  });
}
