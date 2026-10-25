/**
 * Udaan Edu Loans - Verified Lender Rules & Product Catalogue
 * Single source of truth for the Two-Stage Matcher Engine.
 * Every lender rule maintains audit metadata, hard eligibility constraints, and last-verified dates.
 */

export interface LenderProduct {
  productId: string;
  lenderName: string;
  logo?: string;
  category: "Public Sector Bank" | "Private Bank" | "NBFC / Global Lender";
  productName: string;
  lastVerifiedDate: string; // YYYY-MM-DD
  verifiedBy: string;
  sourceDocRef: string;
  
  // Hard Eligibility Constraints (Stage A Filters)
  acceptedCountries: string[]; // ["United States", "United Kingdom", "Canada", "Germany", "Australia", "All"]
  eligibleDegrees: string[];   // ["Master's", "MBA", "UG", "STEM", "Health"]
  minCoApplicantMonthlyIncomeINR: number; // e.g., 35000
  acceptedCoApplicantRelations: string[]; // ["Parents", "Spouse", "Siblings", "Uncles/Aunts"]
  minCibilScore: number;       // e.g., 685
  requiresCollateral: boolean; // true = hard secured requirement
  maxUnsecuredLimitINR: number; // 0 if secured only
  maxSecuredLimitINR: number;

  // Comparative Ranking Attributes (Stage B)
  indicativeRateMin: number;   // e.g., 7.75
  indicativeRateMax: number;   // e.g., 9.15
  rateType: "Floating (Repo/EBLR Linked)" | "Floating (MCLR/Spread)" | "Fixed";
  marginMoneyPercent: number;  // 0% - 15%
  processingTimeDaysMin: number;
  processingTimeDaysMax: number;
  processingFeeDesc: string;
  moratoriumPolicy: string;

  // Key Value Propositions & Caveats
  highlights: string[];
  verificationCaveats: string[];
}

export const lenderCatalogue: LenderProduct[] = [
  {
    productId: "sbi-global-edvantage",
    lenderName: "State Bank of India",
    logo: "/logos/lenders/sbi.svg",
    category: "Public Sector Bank",
    productName: "SBI Global Ed-vantage",
    lastVerifiedDate: "2026-09-15",
    verifiedBy: "Operations Credit Desk",
    sourceDocRef: "SBI/P&SP/EDU/2026/V4",
    acceptedCountries: ["All"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 30000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings"],
    minCibilScore: 685,
    requiresCollateral: true, // Hard rule: SBI Global Ed-vantage requires 100% tangible collateral
    maxUnsecuredLimitINR: 750000,
    maxSecuredLimitINR: 15000000,
    indicativeRateMin: 7.75,
    indicativeRateMax: 9.15,
    rateType: "Floating (Repo/EBLR Linked)",
    marginMoneyPercent: 10,
    processingTimeDaysMin: 12,
    processingTimeDaysMax: 18,
    processingFeeDesc: "₹10,000 + GST (Non-refundable)",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "Lowest floating interest rates in India",
      "0.50% interest concession for female students",
      "Up to 15 years repayment tenure post-moratorium",
    ],
    verificationCaveats: [
      "Requires registered mortgage of residential property or fixed deposit",
      "Requires physical property inspection by bank-approved valuer",
    ],
  },
  {
    productId: "bob-baroda-scholar",
    lenderName: "Bank of Baroda",
    logo: "/logos/lenders/bank-of-baroda.svg",
    category: "Public Sector Bank",
    productName: "Baroda Scholar (Premier Institutes)",
    lastVerifiedDate: "2026-09-20",
    verifiedBy: "Operations Credit Desk",
    sourceDocRef: "BOB/RET/EDU-SCH/2026",
    acceptedCountries: ["All"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 35000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings"],
    minCibilScore: 700,
    requiresCollateral: false, // Collateral-free up to 40L for premier institutes
    maxUnsecuredLimitINR: 4000000,
    maxSecuredLimitINR: 15000000,
    indicativeRateMin: 7.90,
    indicativeRateMax: 9.30,
    rateType: "Floating (Repo/EBLR Linked)",
    marginMoneyPercent: 10,
    processingTimeDaysMin: 10,
    processingTimeDaysMax: 15,
    processingFeeDesc: "Nil for List-A premier global universities; 1% (max ₹10k) for others",
    moratoriumPolicy: "Course duration + 12 months",
    highlights: [
      "Collateral-free up to ₹40 Lakhs for top 150 global universities",
      "Zero processing fees for premier institutions",
      "Special rates for USA STEM and German TU9 universities",
    ],
    verificationCaveats: [
      "University must appear on BoB Premier Global University List A/B",
      "Requires co-applicant with verified regular ITR / salary credits",
    ],
  },
  {
    productId: "hdfc-credila-custom",
    lenderName: "HDFC Credila",
    logo: "/logos/lenders/hdfc-credila.svg",
    category: "NBFC / Global Lender",
    productName: "Customized Overseas Student Loan",
    lastVerifiedDate: "2026-10-01",
    verifiedBy: "Fintech Partnerships Team",
    sourceDocRef: "CREDILA/POL/2026/OCT",
    acceptedCountries: ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Ireland", "France"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "UG"],
    minCoApplicantMonthlyIncomeINR: 45000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings", "Uncles/Aunts"],
    minCibilScore: 685,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 7500000,
    maxSecuredLimitINR: 20000000,
    indicativeRateMin: 10.25,
    indicativeRateMax: 12.75,
    rateType: "Floating (MCLR/Spread)",
    marginMoneyPercent: 0, // 100% funding available
    processingTimeDaysMin: 3,
    processingTimeDaysMax: 5,
    processingFeeDesc: "1.0% - 1.25% of sanctioned loan amount",
    moratoriumPolicy: "Course duration + 6 months (Partial simple interest encouraged)",
    highlights: [
      "Up to ₹75 Lakhs without collateral for STEM & MBA degrees",
      "0% margin money — 100% of tuition and living expenses financed",
      "Fast-track sanction in 3 to 5 business days",
    ],
    verificationCaveats: [
      "Co-applicant must have clean banking and minimum ₹45,000 monthly take-home salary",
      "Higher interest rates compared to public banks",
    ],
  },
  {
    productId: "avanse-abroad-prime",
    lenderName: "Avanse Financial Services",
    logo: "/logos/lenders/avanse.svg",
    category: "NBFC / Global Lender",
    productName: "Avanse Global Student Prime",
    lastVerifiedDate: "2026-09-28",
    verifiedBy: "Fintech Partnerships Team",
    sourceDocRef: "AVANSE/LSP/PROD-2026",
    acceptedCountries: ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Ireland"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 40000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings", "Uncles/Aunts"],
    minCibilScore: 675,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 7500000,
    maxSecuredLimitINR: 15000000,
    indicativeRateMin: 10.50,
    indicativeRateMax: 13.00,
    rateType: "Floating (MCLR/Spread)",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 3,
    processingTimeDaysMax: 6,
    processingFeeDesc: "1.0% - 1.5% of loan amount",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "Covers German Blocked Account (€11,904) and Canada GIC directly",
      "Considers broader co-borrower family relationships",
      "Pre-visa sanction letter recognized across embassies",
    ],
    verificationCaveats: [
      "Floating interest spread subject to profile risk tier",
      "Requires co-applicant KYC and bank statement verification",
    ],
  },
  {
    productId: "axis-bank-overseas",
    lenderName: "Axis Bank",
    logo: "/logos/lenders/axis-bank.svg",
    category: "Private Bank",
    productName: "Axis Education Loan (Abroad)",
    lastVerifiedDate: "2026-09-18",
    verifiedBy: "Operations Credit Desk",
    sourceDocRef: "AXIS/RET/EDU-OUT/2026",
    acceptedCountries: ["All"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 40000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings"],
    minCibilScore: 700,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 5000000,
    maxSecuredLimitINR: 12500000,
    indicativeRateMin: 9.75,
    indicativeRateMax: 11.75,
    rateType: "Floating (Repo/EBLR Linked)",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 5,
    processingTimeDaysMax: 8,
    processingFeeDesc: "0.75% - 1.0% of loan amount + GST",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "Multi-currency disbursement (USD, EUR, GBP, CAD, AUD)",
      "Zero margin money options for premier partner programs",
      "Competitive rate corridor for private commercial banking",
    ],
    verificationCaveats: [
      "Unsecured loans above ₹40L require verified university admit tier",
      "Co-applicant CIBIL score must be 700+",
    ],
  },
  {
    productId: "icici-bank-abroad",
    lenderName: "ICICI Bank",
    logo: "/logos/lenders/icici-bank.svg",
    category: "Private Bank",
    productName: "International Education Loan",
    lastVerifiedDate: "2026-09-22",
    verifiedBy: "Operations Credit Desk",
    sourceDocRef: "ICICI/RET/EDU-INT/2026",
    acceptedCountries: ["All"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 40000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings"],
    minCibilScore: 700,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 5000000,
    maxSecuredLimitINR: 15000000,
    indicativeRateMin: 9.50,
    indicativeRateMax: 11.50,
    rateType: "Floating (Repo/EBLR Linked)",
    marginMoneyPercent: 5,
    processingTimeDaysMin: 4,
    processingTimeDaysMax: 7,
    processingFeeDesc: "1.0% of sanctioned amount + GST",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "Direct university wire remittance via ICICI Outward Remittance",
      "Instant sanction letter for select pre-approved universities",
      "Forex card integrated with zero issuance fees",
    ],
    verificationCaveats: [
      "Margin money of 5-10% required for select universities",
      "Co-applicant salary account with ICICI speeds approval",
    ],
  },
  {
    productId: "mpower-usd-ncosigner",
    lenderName: "MPOWER Financing",
    logo: "/logos/lenders/mpower.svg",
    category: "NBFC / Global Lender",
    productName: "No-Cosigner International Student Loan",
    lastVerifiedDate: "2026-10-05",
    verifiedBy: "Global Alliances Desk",
    sourceDocRef: "MPOWER/GLOBAL/2026-V2",
    acceptedCountries: ["United States", "Canada"],
    eligibleDegrees: ["Master's", "MBA", "STEM"],
    minCoApplicantMonthlyIncomeINR: 0, // No Indian co-signer or collateral needed!
    acceptedCoApplicantRelations: [],
    minCibilScore: 0, // No Indian credit history required
    requiresCollateral: false,
    maxUnsecuredLimitINR: 8300000, // Up to $100,000 USD
    maxSecuredLimitINR: 0,
    indicativeRateMin: 11.99,
    indicativeRateMax: 13.99,
    rateType: "Fixed",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 5,
    processingTimeDaysMax: 10,
    processingFeeDesc: "5.0% origination fee added to loan balance",
    moratoriumPolicy: "Interest-only during study + 6 months grace",
    highlights: [
      "100% collateral-free and requires NO Indian co-signer or parent income",
      "Fixed USD interest rate with zero currency fluctuation risk",
      "Builds US credit history while studying",
    ],
    verificationCaveats: [
      "Strictly limited to ~400 MPOWER-approved universities in the US and Canada",
      "Requires interest-only payment (~$50-$150/mo) during the study period",
    ],
  },
  {
    productId: "prodigy-finance-borderless",
    lenderName: "Prodigy Finance",
    logo: "/logos/lenders/prodigy-finance.svg",
    category: "NBFC / Global Lender",
    productName: "Borderless Student Loan",
    lastVerifiedDate: "2026-10-12",
    verifiedBy: "Global Alliances Desk",
    sourceDocRef: "PRODIGY/GLOBAL/2026-V1",
    acceptedCountries: ["United States", "United Kingdom", "Canada", "Germany", "France", "Singapore"],
    eligibleDegrees: ["Master's", "MBA", "STEM"],
    minCoApplicantMonthlyIncomeINR: 0, // No Indian co-signer or collateral needed!
    acceptedCoApplicantRelations: [],
    minCibilScore: 0,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 8300000, // Up to $100,000 USD
    maxSecuredLimitINR: 0,
    indicativeRateMin: 11.50,
    indicativeRateMax: 13.75,
    rateType: "Floating (Repo/EBLR Linked)",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 5,
    processingTimeDaysMax: 10,
    processingFeeDesc: "5.0% administration fee capitalized into loan",
    moratoriumPolicy: "Full grace period during study + 6 months post-grad",
    highlights: [
      "No Indian co-signer or collateral required",
      "Disburses in USD, GBP, or EUR directly to university campus",
      "Over 1,000 supported top-ranked global graduate programs",
    ],
    verificationCaveats: [
      "University and specific graduate course must appear on Prodigy's supported master list",
      "Does not qualify for Section 80E Indian income tax deduction",
    ],
  },
  {
    productId: "poonawalla-fincorp-global",
    lenderName: "Poonawalla Fincorp",
    logo: "/logos/lenders/poonawalla-fincorp.svg",
    category: "NBFC / Global Lender",
    productName: "Global Education Loan",
    lastVerifiedDate: "2026-10-15",
    verifiedBy: "Fintech Partnerships Team",
    sourceDocRef: "POONAWALLA/EDU/2026/V1",
    acceptedCountries: ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Ireland"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 35000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings", "Uncles/Aunts"],
    minCibilScore: 685,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 5000000,
    maxSecuredLimitINR: 15000000,
    indicativeRateMin: 10.50,
    indicativeRateMax: 13.00,
    rateType: "Floating (MCLR/Spread)",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 3,
    processingTimeDaysMax: 5,
    processingFeeDesc: "1.0% - 1.25% + GST",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "100% digital unsecured processing up to ₹50 Lakhs",
      "Flexible debt servicing with competitive interest corridor",
      "Pre-visa sanction recognized across foreign embassies",
    ],
    verificationCaveats: [
      "Requires verified co-borrower monthly income credits",
      "CIBIL score requirement of 685+ for prime rate tier",
    ],
  },
  {
    productId: "tata-capital-global",
    lenderName: "Tata Capital",
    logo: "/logos/lenders/tata-capital.svg",
    category: "NBFC / Global Lender",
    productName: "Overseas Education Loan",
    lastVerifiedDate: "2026-10-15",
    verifiedBy: "Fintech Partnerships Team",
    sourceDocRef: "TATA/EDU/2026/V1",
    acceptedCountries: ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Ireland"],
    eligibleDegrees: ["Master's", "MBA", "STEM", "Health", "UG"],
    minCoApplicantMonthlyIncomeINR: 35000,
    acceptedCoApplicantRelations: ["Parents", "Spouse", "Siblings", "Legal Guardians"],
    minCibilScore: 685,
    requiresCollateral: false,
    maxUnsecuredLimitINR: 5000000,
    maxSecuredLimitINR: 10000000,
    indicativeRateMin: 10.75,
    indicativeRateMax: 13.25,
    rateType: "Floating (MCLR/Spread)",
    marginMoneyPercent: 0,
    processingTimeDaysMin: 3,
    processingTimeDaysMax: 5,
    processingFeeDesc: "1.0% - 1.5% + GST",
    moratoriumPolicy: "Course duration + 6 months",
    highlights: [
      "Backed by the brand trust and governance of the Tata Group",
      "Collateral-free sanctions up to ₹50 Lakhs with fast digital turnaround",
      "Direct disbursement towards university tuition and international living costs",
    ],
    verificationCaveats: [
      "Co-applicant income must demonstrate continuous debt-service ability",
      "Sanction subject to accredited institution verification",
    ],
  },
];
