/**
 * Curated 20 Premier Universities Pilot for USA and Germany
 * Single source of truth for university-specific loan acquisition pages.
 * Verified according to lender prime lists (SBI Scholar/Prime List, HDFC Credila Prime, ICICI Prime).
 */

export interface UniversityProgram {
  name: string;
  degree: string;
  duration: string;
  estimatedCostINR: string;
}

export interface UniversityLenderPolicy {
  name: string;
  maxUnsecuredINR: string;
  maxSecuredINR: string;
  indicativeRate: string;
  primeListStatus: string;
  specialBenefit: string;
}

export interface UniversityData {
  slug: string;
  name: string;
  shortName: string;
  country: "usa" | "germany";
  countryName: string;
  city: string;
  qsRank: number | string;
  currency: "USD" | "EUR";
  currencySymbol: "$" | "€";
  tuitionAnnual: number; // in native currency
  tuitionRangeINR: string;
  livingCostAnnual: number; // in native currency
  livingCostINR: string;
  totalAnnualCostINR: string;
  primeTierCategory: string;
  verifiedDate: string;
  overview: string;
  lenderPolicies: UniversityLenderPolicy[];
  visaRequirements: {
    documentName: string;
    requiredFundsINR: string;
    guidelines: string[];
  };
  popularPrograms: UniversityProgram[];
  faqs: { question: string; answer: string }[];
}

export const universities: UniversityData[] = [
  // ==========================================
  // USA UNIVERSITIES (12 HUBS)
  // ==========================================
  {
    slug: "northeastern-university",
    name: "Northeastern University",
    shortName: "NEU",
    country: "usa",
    countryName: "United States",
    city: "Boston, Massachusetts (Campuses: Seattle, Silicon Valley)",
    qsRank: 396,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 34500,
    tuitionRangeINR: "₹28 Lakh – ₹35 Lakh / year",
    livingCostAnnual: 22000,
    livingCostINR: "₹18 Lakh – ₹22 Lakh / year",
    totalAnnualCostINR: "₹46 Lakh – ₹57 Lakh / year",
    primeTierCategory: "Prime Tier A (0.35% - 0.50% Concession)",
    verifiedDate: "2026-03-01",
    overview:
      "Northeastern University is renowned for its industry-leading Co-op program and highly ranked Khoury College of Computer Sciences. Top Indian destination for MS CS, Data Analytics, and Information Systems.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Global Ed-Vantage Approved List B",
        specialBenefit: "0.50% interest concession for female students; 15-year repayment tenure.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹60 Lakhs",
        maxSecuredINR: "₹1.25 Crore",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "Credila Preferred Tier-1 STEM",
        specialBenefit: "Fast 4-day sanction with zero physical visit; covers 100% Co-op gap living costs.",
      },
      {
        name: "ICICI Bank",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.10% - 11.25%",
        primeListStatus: "Prime Institutional List",
        specialBenefit: "Instant pre-visa sanction letter acceptable for US Embassy F-1 interview.",
      },
    ],
    visaRequirements: {
      documentName: "US Form I-20 Financial Affidavit & F-1 Visa",
      requiredFundsINR: "₹55 Lakh – ₹65 Lakh liquid proof",
      guidelines: [
        "Northeastern requires financial documentation matching the exact 1-year total expense stated on the I-20 estimate before issuing the SEVIS document.",
        "Udaan partner banks issue sanctioned loan letters that explicitly satisfy US Embassy financial adequacy criteria.",
        "Co-op earnings cannot be counted toward initial I-20 financial clearance.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (Khoury)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹62 Lakhs" },
      { name: "MS in Information Systems", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹56 Lakhs" },
      { name: "MS in Data Analytics Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹58 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an unsecured education loan for Northeastern University?",
        answer: "Yes. NBFCs like HDFC Credila and Avanse offer up to ₹60 Lakhs collateral-free for NEU STEM courses based on your admit letter and co-applicant income."
      },
      {
        question: "Does Northeastern accept Indian bank sanction letters for I-20 issuance?",
        answer: "Yes, Northeastern's Office of Global Services (OGS) officially accepts education loan sanction letters from RBI-regulated Indian banks that clearly mention the student name, sanction amount, and conditional-free terms."
      }
    ]
  },
  {
    slug: "new-york-university",
    name: "New York University",
    shortName: "NYU",
    country: "usa",
    countryName: "United States",
    city: "New York City, New York",
    qsRank: 38,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 42000,
    tuitionRangeINR: "₹34 Lakh – ₹45 Lakh / year",
    livingCostAnnual: 26000,
    livingCostINR: "₹21 Lakh – ₹26 Lakh / year (NYC Rent)",
    totalAnnualCostINR: "₹55 Lakh – ₹71 Lakh / year",
    primeTierCategory: "Prime Tier AA / Top 50 Global (0.50% Concession)",
    verifiedDate: "2026-03-01",
    overview:
      "New York University (NYU Tandon School of Engineering and Stern School of Business) is globally acclaimed. Placed on the highest Tier AA prime list by public sector banks.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.50%",
        primeListStatus: "SBI Scholar & Ed-Vantage Tier AA List",
        specialBenefit: "Lowest public sector rate; margin money reduced to 5% with full fee coverage.",
      },
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 8.90%",
        primeListStatus: "Baroda Scholar Premier Institute List",
        specialBenefit: "Zero processing fee for premier institutions; full outward remittance support.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹75 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "9.95% - 11.00%",
        primeListStatus: "Credila Elite Global List",
        specialBenefit: "Higher unsecured threshold up to ₹75 Lakhs for Tandon MS and Stern MBA.",
      },
    ],
    visaRequirements: {
      documentName: "US Form I-20 Financial Affidavit & F-1 Visa",
      requiredFundsINR: "₹70 Lakh – ₹80 Lakh liquid proof",
      guidelines: [
        "NYU requires 1-year total financial evidence of approx $85,000 before releasing the I-20.",
        "Living expenses in Manhattan / Brooklyn require elevated lender sanction limits.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (NYU Tandon)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹70 Lakhs" },
      { name: "MS in Management of Technology", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹66 Lakhs" },
      { name: "Full-Time MBA (Stern)", degree: "Master of Business Admin", duration: "2 Years", estimatedCostINR: "₹1.20 Crore" },
    ],
    faqs: [
      {
        question: "Is NYU on the SBI Tier AA list for interest discounts?",
        answer: "Yes, NYU is classified under the top tier in SBI's prime institution roster, unlocking the lowest interest rate bracket starting at 7.75% for secured loans."
      }
    ]
  },
  {
    slug: "arizona-state-university",
    name: "Arizona State University",
    shortName: "ASU",
    country: "usa",
    countryName: "United States",
    city: "Tempe & Phoenix, Arizona",
    qsRank: 179,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 29000,
    tuitionRangeINR: "₹24 Lakh – ₹31 Lakh / year",
    livingCostAnnual: 17000,
    livingCostINR: "₹14 Lakh – ₹17 Lakh / year",
    totalAnnualCostINR: "₹38 Lakh – ₹48 Lakh / year",
    primeTierCategory: "Prime Tier A (High Approval Velocity)",
    verifiedDate: "2026-03-01",
    overview:
      "ASU's Ira A. Fulton Schools of Engineering is one of the largest and most sought-after engineering faculties in the US, known for research funding and top corporate recruitment.",
    lenderPolicies: [
      {
        name: "Avanse Financial Services",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.40% - 11.90%",
        primeListStatus: "High-Volume Preferred Partner",
        specialBenefit: "Fast 3-day turnaround; 100% cost coverage including on-campus meal plans.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹55 Lakhs",
        maxSecuredINR: "₹1.20 Crore",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "Tier-1 Tech Program",
        specialBenefit: "Prefilled I-20 proof letter format recognized directly by ASU ISSC.",
      },
    ],
    visaRequirements: {
      documentName: "US Form I-20 Financial Guarantee",
      requiredFundsINR: "₹45 Lakh – ₹52 Lakh liquid proof",
      guidelines: [
        "ASU International Students and Scholars Center (ISSC) requires financial verification for both tuition and estimated living expenses of $58,000 for 1 year.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (Fulton)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹52 Lakhs" },
      { name: "MS in Software Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹50 Lakhs" },
      { name: "MS in Business Analytics (W.P. Carey)", degree: "Master of Science", duration: "1 Year", estimatedCostINR: "₹48 Lakhs" },
    ],
    faqs: [
      {
        question: "How much loan can I get for ASU MS in CS without collateral?",
        answer: "You can secure up to ₹55 Lakhs collateral-free through HDFC Credila or Avanse, covering both tuition fees and living expenses in Tempe."
      }
    ]
  },
  {
    slug: "university-of-texas-dallas",
    name: "University of Texas at Dallas",
    shortName: "UT Dallas",
    country: "usa",
    countryName: "United States",
    city: "Richardson & Dallas, Texas",
    qsRank: 520,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 28000,
    tuitionRangeINR: "₹23 Lakh – ₹29 Lakh / year",
    livingCostAnnual: 16000,
    livingCostINR: "₹13 Lakh – ₹16 Lakh / year",
    totalAnnualCostINR: "₹36 Lakh – ₹45 Lakh / year",
    primeTierCategory: "Prime Tier A (STEM Tech Corridor)",
    verifiedDate: "2026-03-01",
    overview:
      "UT Dallas Erik Jonsson School of Engineering and Naveen Jindal School of Management are situated in the Dallas Telecom Corridor, making it an engineering powerhouse for Indian graduates.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.25% - 9.15%",
        primeListStatus: "SBI Ed-Vantage List",
        specialBenefit: "Low floating rate with zero prepayment penalties.",
      },
      {
        name: "InCred Finance",
        maxUnsecuredINR: "₹45 Lakhs",
        maxSecuredINR: "₹75 Lakhs",
        indicativeRate: "10.75% - 12.25%",
        primeListStatus: "InCred Tech Fast-Track",
        specialBenefit: "Evaluates GRE score (315+) to discount interest rate up to 0.50%.",
      },
    ],
    visaRequirements: {
      documentName: "UTD I-20 Financial Affidavit",
      requiredFundsINR: "₹42 Lakh – ₹48 Lakh liquid proof",
      guidelines: [
        "UT Dallas requires estimated 9-month expenses ($48,000) for graduate I-20 issuance.",
        "Sanction letter must explicitly mention non-conditional disbursement approval.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹48 Lakhs" },
      { name: "MS in Business Analytics (JSOM)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹50 Lakhs" },
      { name: "MS in Information Technology & Management", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹46 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an education loan for UTD with in-state tuition waiver?",
        answer: "Yes. If UTD awards you a competitive scholarship granting in-state tuition rates, your loan requirement reduces, and lenders recalculate your sanction accordingly."
      }
    ]
  },
  {
    slug: "columbia-university",
    name: "Columbia University",
    shortName: "Columbia",
    country: "usa",
    countryName: "United States",
    city: "New York City, New York",
    qsRank: 34,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 48000,
    tuitionRangeINR: "₹39 Lakh – ₹52 Lakh / year",
    livingCostAnnual: 27000,
    livingCostINR: "₹22 Lakh – ₹27 Lakh / year",
    totalAnnualCostINR: "₹61 Lakh – ₹79 Lakh / year",
    primeTierCategory: "Ivy League Tier AAA (0.50% Concession + Max Loan)",
    verifiedDate: "2026-03-01",
    overview:
      "Columbia University in the City of New York is an Ivy League world leader. Columbia Fu Foundation School of Engineering and Columbia Business School command the highest lender approval rates.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.40%",
        primeListStatus: "SBI Scholar Premier (Tier AA)",
        specialBenefit: "Lowest rate tier; priority processing within 7 working days.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹75 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "9.75% - 10.75%",
        primeListStatus: "Elite Ivy League Tier",
        specialBenefit: "Max unsecured limit up to ₹75 Lakhs without collateral.",
      },
    ],
    visaRequirements: {
      documentName: "Columbia ISSO I-20 Certification of Finances",
      requiredFundsINR: "₹75 Lakh – ₹85 Lakh liquid proof",
      guidelines: [
        "Columbia ISSO requires 1 full academic year of documented funding (tuition + NYC living costs) before issuing Form I-20.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (SEAS)", degree: "Master of Science", duration: "1.5 - 2 Years", estimatedCostINR: "₹78 Lakhs" },
      { name: "MS in Financial Engineering", degree: "Master of Science", duration: "1.5 Years", estimatedCostINR: "₹82 Lakhs" },
      { name: "Columbia Full-Time MBA", degree: "Master of Business Admin", duration: "2 Years", estimatedCostINR: "₹1.40 Crore" },
    ],
    faqs: [
      {
        question: "Does Columbia qualify for SBI unsecured loans?",
        answer: "Yes, SBI offers up to ₹50 Lakhs collateral-free for premier Tier AA institutions like Columbia University under the SBI Scholar scheme."
      }
    ]
  },
  {
    slug: "university-of-southern-california",
    name: "University of Southern California",
    shortName: "USC",
    country: "usa",
    countryName: "United States",
    city: "Los Angeles, California",
    qsRank: 116,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 39000,
    tuitionRangeINR: "₹32 Lakh – ₹42 Lakh / year",
    livingCostAnnual: 23000,
    livingCostINR: "₹18 Lakh – ₹23 Lakh / year",
    totalAnnualCostINR: "₹50 Lakh – ₹65 Lakh / year",
    primeTierCategory: "Prime Tier A+ (0.35% - 0.50% Concession)",
    verifiedDate: "2026-03-01",
    overview:
      "USC Viterbi School of Engineering is among the top 10 engineering schools in the US, located in the booming Silicon Beach tech ecosystem of Los Angeles.",
    lenderPolicies: [
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹65 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "10.05% - 11.25%",
        primeListStatus: "Credila Viterbi Preferred",
        specialBenefit: "Dedicated relationship manager for USC Indian student admits.",
      },
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.10%",
        primeListStatus: "Baroda Scholar Top 150 List",
        specialBenefit: "Zero pre-payment penalty and full 15-year repayment window.",
      },
    ],
    visaRequirements: {
      documentName: "USC Graduate I-20 Financial Statement",
      requiredFundsINR: "₹60 Lakh – ₹70 Lakh liquid proof",
      guidelines: [
        "USC Office of Graduate Admission requires proof of funds for 1 academic year ($72,000) prior to I-20 dispatch.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (Viterbi)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹68 Lakhs" },
      { name: "MS in Electrical Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹62 Lakhs" },
      { name: "MS in Analytics", degree: "Master of Science", duration: "1.5 Years", estimatedCostINR: "₹58 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get 100% funding for USC Viterbi tuition and living expenses?",
        answer: "Yes, secured loans from SBI/BOB cover 100% of all expenses up to ₹1.5 Crore, and unsecured loans up to ₹65 Lakhs cover full tuition."
      }
    ]
  },
  {
    slug: "uiuc",
    name: "University of Illinois Urbana-Champaign",
    shortName: "UIUC",
    country: "usa",
    countryName: "United States",
    city: "Urbana-Champaign, Illinois",
    qsRank: 64,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 36000,
    tuitionRangeINR: "₹29 Lakh – ₹38 Lakh / year",
    livingCostAnnual: 17000,
    livingCostINR: "₹14 Lakh – ₹17 Lakh / year (Affordable Midwest)",
    totalAnnualCostINR: "₹43 Lakh – ₹55 Lakh / year",
    primeTierCategory: "Prime Tier AA (Top 5 CS in USA)",
    verifiedDate: "2026-03-01",
    overview:
      "UIUC Grainger College of Engineering is consistently ranked in the global top 5 for Computer Science and Computer Engineering. Highly favored by Indian and international lenders.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.50%",
        primeListStatus: "SBI Scholar Tier AA List",
        specialBenefit: "Top tier concession; high approval rate for Grainger MS CS admits.",
      },
      {
        name: "ICICI Bank",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "9.95% - 11.00%",
        primeListStatus: "Premier US Tech Institute",
        specialBenefit: "Instant sanction letter within 48 hours for fast I-20 turnaround.",
      },
    ],
    visaRequirements: {
      documentName: "UIUC Declaration and Certification of Finances",
      requiredFundsINR: "₹50 Lakh – ₹60 Lakh liquid proof",
      guidelines: [
        "UIUC requires financial affidavit matching tuition and living costs for one academic year ($60,000).",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (Grainger)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹58 Lakhs" },
      { name: "Master of Computer Science (MCS)", degree: "Professional Master", duration: "1.5 Years", estimatedCostINR: "₹48 Lakhs" },
      { name: "MS in Electrical & Computer Eng", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹56 Lakhs" },
    ],
    faqs: [
      {
        question: "Does UIUC Grainger admit qualify for SBI Tier AA rate?",
        answer: "Yes, UIUC is an official SBI Tier AA institute, qualifying for rates starting at 7.75% with property collateral or up to ₹50 Lakhs unsecured."
      }
    ]
  },
  {
    slug: "carnegie-mellon-university",
    name: "Carnegie Mellon University",
    shortName: "CMU",
    country: "usa",
    countryName: "United States",
    city: "Pittsburgh, Pennsylvania",
    qsRank: 52,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 50000,
    tuitionRangeINR: "₹41 Lakh – ₹55 Lakh / year",
    livingCostAnnual: 20000,
    livingCostINR: "₹16 Lakh – ₹20 Lakh / year",
    totalAnnualCostINR: "₹57 Lakh – ₹75 Lakh / year",
    primeTierCategory: "Prime Tier AAA (#1 Global CS Institution)",
    verifiedDate: "2026-03-01",
    overview:
      "Carnegie Mellon University School of Computer Science (SCS) and Heinz College represent the gold standard in AI, robotics, and software engineering. Lenders offer maximum sanction limits.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.40%",
        primeListStatus: "SBI Tier AA Elite",
        specialBenefit: "Maximum interest rebate and simplified sanction workflow.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹75 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "9.75% - 10.50%",
        primeListStatus: "Elite Tech Tier",
        specialBenefit: "₹75 Lakhs unsecured sanction available due to stellar CMU median placement salaries.",
      },
    ],
    visaRequirements: {
      documentName: "CMU Form I-20 Certificate of Eligibility",
      requiredFundsINR: "₹70 Lakh – ₹80 Lakh liquid proof",
      guidelines: [
        "CMU OIE mandates financial documentation verifying full coverage for year 1 ($76,000+).",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (SCS)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹78 Lakhs" },
      { name: "Master of Information Systems Mgmt (MISM)", degree: "Master's Degree", duration: "16 Months", estimatedCostINR: "₹72 Lakhs" },
      { name: "MS in Computational Finance", degree: "Master of Science", duration: "1.5 Years", estimatedCostINR: "₹85 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an unsecured loan for CMU MISM program?",
        answer: "Yes, CMU graduates command median starting salaries exceeding $130,000, enabling lenders to approve up to ₹75 Lakhs unsecured."
      }
    ]
  },
  {
    slug: "texas-a-and-m-university",
    name: "Texas A&M University",
    shortName: "TAMU",
    country: "usa",
    countryName: "United States",
    city: "College Station, Texas",
    qsRank: 134,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 25000,
    tuitionRangeINR: "₹20 Lakh – ₹27 Lakh / year",
    livingCostAnnual: 15000,
    livingCostINR: "₹12 Lakh – ₹15 Lakh / year",
    totalAnnualCostINR: "₹32 Lakh – ₹42 Lakh / year",
    primeTierCategory: "Prime Tier A (High ROI & Low Living Costs)",
    verifiedDate: "2026-03-01",
    overview:
      "Texas A&M University College Station offers one of the lowest net cost-of-attendance profiles among tier-1 US engineering colleges, backed by the largest alumni network in Texas.",
    lenderPolicies: [
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.10%",
        primeListStatus: "Baroda Scholar Tier A",
        specialBenefit: "Lowest secured rates; ideal for TAMU's cost-effective 2-year structure.",
      },
      {
        name: "Avanse Financial Services",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.50% - 11.75%",
        primeListStatus: "Avanse Prime STEM",
        specialBenefit: "Full tuition + College Station living expenses sanction in 3 days.",
      },
    ],
    visaRequirements: {
      documentName: "TAMU ISS Form I-20 Proof of Funds",
      requiredFundsINR: "₹38 Lakh – ₹44 Lakh liquid proof",
      guidelines: [
        "TAMU requires approximately $42,000 in liquid proof for 1 year.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹42 Lakhs" },
      { name: "MS in Mechanical Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹40 Lakhs" },
      { name: "MS in Industrial Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹39 Lakhs" },
    ],
    faqs: [
      {
        question: "Why is Texas A&M considered high ROI for education loans?",
        answer: "With total annual costs under ₹42 Lakhs and average tech starting salaries above $105,000, students can repay their loan within 2.5 to 3 years."
      }
    ]
  },
  {
    slug: "san-jose-state-university",
    name: "San Jose State University",
    shortName: "SJSU",
    country: "usa",
    countryName: "United States",
    city: "San Jose, Silicon Valley, California",
    qsRank: "Top Regional",
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 21000,
    tuitionRangeINR: "₹17 Lakh – ₹23 Lakh / year",
    livingCostAnnual: 22000,
    livingCostINR: "₹18 Lakh – ₹22 Lakh / year (Silicon Valley)",
    totalAnnualCostINR: "₹35 Lakh – ₹45 Lakh / year",
    primeTierCategory: "Silicon Valley Tech Corridor Leader",
    verifiedDate: "2026-03-01",
    overview:
      "SJSU is situated directly at the center of Silicon Valley. It supplies more engineering talent to Apple, Cisco, Google, and Meta than almost any other university in the world.",
    lenderPolicies: [
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "Silicon Valley High-Placement Tier",
        specialBenefit: "Recognizes SJSU's exceptional placement track record in Silicon Valley tech firms.",
      },
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.25% - 9.15%",
        primeListStatus: "SBI Ed-Vantage Approved",
        specialBenefit: "Secured loans cover low tuition and higher Silicon Valley rent.",
      },
    ],
    visaRequirements: {
      documentName: "SJSU ISSS Declaration of Finance",
      requiredFundsINR: "₹42 Lakh – ₹48 Lakh liquid proof",
      guidelines: [
        "SJSU requires financial evidence covering tuition ($19,500) and living costs ($22,000) for 1 academic year.",
      ],
    },
    popularPrograms: [
      { name: "MS in Software Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹42 Lakhs" },
      { name: "MS in Computer Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹43 Lakhs" },
      { name: "MS in Data Analytics", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹40 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an education loan covering SJSU high living costs in San Jose?",
        answer: "Yes, both SBI and private NBFCs include off-campus Silicon Valley living expenses in the sanctioned loan amount."
      }
    ]
  },
  {
    slug: "purdue-university",
    name: "Purdue University",
    shortName: "Purdue",
    country: "usa",
    countryName: "United States",
    city: "West Lafayette, Indiana",
    qsRank: 89,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 29500,
    tuitionRangeINR: "₹24 Lakh – ₹31 Lakh / year (Frozen Tuition)",
    livingCostAnnual: 14500,
    livingCostINR: "₹12 Lakh – ₹15 Lakh / year",
    totalAnnualCostINR: "₹36 Lakh – ₹46 Lakh / year",
    primeTierCategory: "Prime Tier AA (Top 10 Engineering)",
    verifiedDate: "2026-03-01",
    overview:
      "Purdue University College of Engineering has frozen base tuition for over a decade, making it one of the premier value propositions in global engineering education.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.50%",
        primeListStatus: "SBI Scholar Tier AA List",
        specialBenefit: "Lowest interest rate concession and quick sanction.",
      },
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 8.90%",
        primeListStatus: "Baroda Scholar Tier-1",
        specialBenefit: "Zero processing fee and 100% expense coverage.",
      },
    ],
    visaRequirements: {
      documentName: "Purdue ISS Form I-20 Proof of Funds",
      requiredFundsINR: "₹44 Lakh – ₹50 Lakh liquid proof",
      guidelines: [
        "Purdue requires financial proof of $45,000 for 1 year.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹45 Lakhs" },
      { name: "MS in Aeronautics & Astronautics", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹48 Lakhs" },
      { name: "MS in Industrial Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹44 Lakhs" },
    ],
    faqs: [
      {
        question: "Is Purdue on SBI's Scholar loan Tier AA list?",
        answer: "Yes, Purdue University is recognized as a Tier AA institution by SBI, entitling admits to prime interest rates starting at 7.75%."
      }
    ]
  },
  {
    slug: "georgia-tech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    country: "usa",
    countryName: "United States",
    city: "Atlanta, Georgia",
    qsRank: 114,
    currency: "USD",
    currencySymbol: "$",
    tuitionAnnual: 32000,
    tuitionRangeINR: "₹26 Lakh – ₹34 Lakh / year",
    livingCostAnnual: 18000,
    livingCostINR: "₹15 Lakh – ₹18 Lakh / year",
    totalAnnualCostINR: "₹41 Lakh – ₹52 Lakh / year",
    primeTierCategory: "Prime Tier AA (Top 5 Public Tech)",
    verifiedDate: "2026-03-01",
    overview:
      "Georgia Tech is a global powerhouse for engineering and computing education. Located in Atlanta, it produces high-earning graduates in AI, cybersecurity, and robotics.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹50 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "7.75% - 8.50%",
        primeListStatus: "SBI Scholar Tier AA List",
        specialBenefit: "Tier AA concessional rate of 7.75% for secured loans.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹70 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "9.85% - 10.95%",
        primeListStatus: "Credila Elite Tech Tier",
        specialBenefit: "Fast-track unsecured loan up to ₹70 Lakhs.",
      },
    ],
    visaRequirements: {
      documentName: "Georgia Tech OIE I-20 Financial Affidavit",
      requiredFundsINR: "₹50 Lakh – ₹58 Lakh liquid proof",
      guidelines: [
        "Georgia Tech Office of International Education requires verification of $52,000 for 1 academic year.",
      ],
    },
    popularPrograms: [
      { name: "MS in Computer Science (CoC)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹52 Lakhs" },
      { name: "MS in Analytics", degree: "Master of Science", duration: "1 Year", estimatedCostINR: "₹42 Lakhs" },
      { name: "MS in Cybersecurity", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹50 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an education loan for Georgia Tech MS CS?",
        answer: "Yes. Georgia Tech admits are considered tier-1 profiles, eligible for up to ₹70 Lakhs unsecured from NBFCs and ₹1.5 Crore secured from SBI/BOB."
      }
    ]
  },

  // ==========================================
  // GERMANY UNIVERSITIES (8 HUBS)
  // ==========================================
  {
    slug: "technical-university-of-munich",
    name: "Technical University of Munich",
    shortName: "TUM",
    country: "germany",
    countryName: "Germany",
    city: "Munich, Bavaria",
    qsRank: 28,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 6000, // TUM introduced tuition fees for non-EU students (~€4,000 to €6,000/yr)
    tuitionRangeINR: "₹3.5 Lakh – ₹5.5 Lakh / year (TUM Non-EU Fee)",
    livingCostAnnual: 12000,
    livingCostINR: "₹10.8 Lakh – ₹12.5 Lakh / year (Munich Living)",
    totalAnnualCostINR: "₹14 Lakh – ₹18 Lakh / year",
    primeTierCategory: "Germany #1 University (TUM TU9 Excellence)",
    verifiedDate: "2026-03-01",
    overview:
      "TUM is Germany's top-ranked university and an undisputed global research leader in engineering, informatics, and management. Situated in Bavaria's high-tech innovation cluster.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Global Ed-Vantage List A",
        specialBenefit: "Direct wire transfer into German Blocked Account (Sperrkonto).",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹45 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "Credila Preferred Germany Hub",
        specialBenefit: "Covers non-EU tuition fees, blocked account €11,904, and flight tickets.",
      },
      {
        name: "Avanse Financial Services",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹80 Lakhs",
        indicativeRate: "10.50% - 11.75%",
        primeListStatus: "Germany Fast-Track Program",
        specialBenefit: "Direct integration with Coracle and Expatrio for blocked account setup.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa (Sperrkonto & APS Certificate)",
      requiredFundsINR: "€11,904/year (₹10.8 Lakh) in Blocked Account",
      guidelines: [
        "Indian applicants must hold an APS Certificate issued by the German Academic Evaluation Centre in New Delhi before applying for the student visa.",
        "German visa regulations mandate €11,904 deposited into a registered Sperrkonto (Blocked Account) such as Coracle, Expatrio, or Fintiba.",
        "Indian lenders remit loan funds directly to the blocked account provider via SWIFT telegraphic transfer.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Informatics (Computer Science)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
      { name: "M.Sc. in Data Engineering & Analytics", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹30 Lakhs" },
      { name: "M.Sc. in Robotics, Cognition, Intelligence", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
    ],
    faqs: [
      {
        question: "Can an education loan disburse funds directly into a German Blocked Account for TUM?",
        answer: "Yes. Our partner banks transfer the required €11,904 directly into your blocked account provider (Coracle, Expatrio, or Fintiba) using outward SWIFT remittance to fulfill German visa requirements."
      },
      {
        question: "Does TUM charge tuition fees for non-EU international students?",
        answer: "Yes, starting from 2024, TUM introduced tuition fees for non-EU students ranging between €2,000 and €3,000 per semester (€4,000–€6,000/year). Education loans cover both this fee and the blocked account living costs."
      }
    ]
  },
  {
    slug: "rwth-aachen-university",
    name: "RWTH Aachen University",
    shortName: "RWTH Aachen",
    country: "germany",
    countryName: "Germany",
    city: "Aachen, North Rhine-Westphalia",
    qsRank: 99,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 0,
    tuitionRangeINR: "Zero Tuition (€320/semester social contribution)",
    livingCostAnnual: 11904,
    livingCostINR: "₹10.8 Lakh / year (German Statutory Blocked Account)",
    totalAnnualCostINR: "₹11.5 Lakh – ₹13.5 Lakh / year",
    primeTierCategory: "TU9 Premier Public Engineering Institute",
    verifiedDate: "2026-03-01",
    overview:
      "RWTH Aachen is Germany's largest technical university and a founding member of the TU9 alliance. Zero tuition fees for all international students, with world-class mechanical, automotive, and electrical engineering labs.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹30 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Ed-Vantage Germany List",
        specialBenefit: "Sanctions the 2-year living expense requirement without tuition overhead.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹80 Lakhs",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "TU9 Fast Sanction",
        specialBenefit: "Quick 3-day approval for blocked account transfer and health insurance.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa (Sperrkonto & APS Certificate)",
      requiredFundsINR: "€11,904/year (₹10.8 Lakh) in Blocked Account",
      guidelines: [
        "Zero tuition means your education loan focuses primarily on funding the €11,904 blocked account, travel, and statutory semester contributions.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Mechanical Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
      { name: "M.Sc. in Automotive Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
      { name: "M.Sc. in Electrical Engineering & IT", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an education loan if RWTH Aachen charges zero tuition fees?",
        answer: "Yes! Indian banks and NBFCs regularly sanction loans to cover living expenses, German blocked account deposits (€11,904/year), health insurance, laptop allowances, and airfare for tuition-free public German universities."
      }
    ]
  },
  {
    slug: "technical-university-of-berlin",
    name: "Technical University of Berlin",
    shortName: "TU Berlin",
    country: "germany",
    countryName: "Germany",
    city: "Berlin",
    qsRank: 147,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 0,
    tuitionRangeINR: "Zero Tuition (€310/semester semesterticket included)",
    livingCostAnnual: 11904,
    livingCostINR: "₹10.8 Lakh – ₹12 Lakh / year",
    totalAnnualCostINR: "₹11.5 Lakh – ₹13 Lakh / year",
    primeTierCategory: "TU9 Capital Tech University",
    verifiedDate: "2026-03-01",
    overview:
      "Located in the vibrant capital of Germany, TU Berlin is renowned for Computer Science, Architecture, and Industrial Engineering. Students benefit from Berlin's thriving startup ecosystem.",
    lenderPolicies: [
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹30 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.10%",
        primeListStatus: "Baroda Scholar TU9 List",
        specialBenefit: "Low interest rates for secured loans with zero prepayment penalty.",
      },
      {
        name: "Avanse Financial Services",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹75 Lakhs",
        indicativeRate: "10.50% - 11.75%",
        primeListStatus: "Avanse Germany Track",
        specialBenefit: "Express sanction for blocked account remittance.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa Sperrkonto",
      requiredFundsINR: "€11,904 in Blocked Account",
      guidelines: [
        "Blocked account release schedule is €992/month during your stay in Berlin.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Computer Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
      { name: "M.Sc. in Information Systems Management", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
      { name: "M.Sc. in Innovation Management & Entrepreneurship", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹25 Lakhs" },
    ],
    faqs: [
      {
        question: "How much loan should I take for TU Berlin?",
        answer: "Since TU Berlin has zero tuition, a loan of ₹20 to ₹25 Lakhs comfortably funds the 2-year German blocked account requirement, travel, initial deposit, and emergency buffer."
      }
    ]
  },
  {
    slug: "university-of-stuttgart",
    name: "University of Stuttgart",
    shortName: "Uni Stuttgart",
    country: "germany",
    countryName: "Germany",
    city: "Stuttgart, Baden-Württemberg",
    qsRank: 312,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 3000, // Baden-Württemberg tuition fee for non-EU students (€1,500/semester)
    tuitionRangeINR: "₹2.7 Lakh / year (€3,000/yr state tuition)",
    livingCostAnnual: 11904,
    livingCostINR: "₹10.8 Lakh / year",
    totalAnnualCostINR: "₹13.5 Lakh – ₹15 Lakh / year",
    primeTierCategory: "Baden-Württemberg Automotive & Engineering Hub",
    verifiedDate: "2026-03-01",
    overview:
      "Situated in the industrial heartland of Mercedes-Benz, Porsche, and Bosch, University of Stuttgart offers unmatched industrial collaborations for mechanical, automotive, and aerospace engineering.",
    lenderPolicies: [
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.25% - 11.50%",
        primeListStatus: "Credila Germany Tech Hub",
        specialBenefit: "Covers the €3,000 non-EU state tuition + blocked account living funds.",
      },
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹30 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Ed-Vantage List",
        specialBenefit: "Low-interest collateralized funding.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa (Sperrkonto & APS)",
      requiredFundsINR: "€11,904 in Blocked Account + €3,000 1st year tuition",
      guidelines: [
        "State of Baden-Württemberg charges non-EU students €1,500 per semester. The loan sanction covers both tuition and blocked account.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Computational Mechanics of Materials", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
      { name: "M.Sc. in Automotive & Engine Technology", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
      { name: "M.Sc. in Electrical Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹27 Lakhs" },
    ],
    faqs: [
      {
        question: "Does the education loan cover Stuttgart's non-EU tuition fee?",
        answer: "Yes, lenders pay the €1,500/semester fee directly to the university and wire the living funds to your blocked account."
      }
    ]
  },
  {
    slug: "karlsruhe-institute-of-technology",
    name: "Karlsruhe Institute of Technology",
    shortName: "KIT",
    country: "germany",
    countryName: "Germany",
    city: "Karlsruhe, Baden-Württemberg",
    qsRank: 102,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 3000,
    tuitionRangeINR: "₹2.7 Lakh / year (€3,000/yr state tuition)",
    livingCostAnnual: 11904,
    livingCostINR: "₹10.8 Lakh / year",
    totalAnnualCostINR: "₹13.5 Lakh – ₹15 Lakh / year",
    primeTierCategory: "TU9 National Research Center",
    verifiedDate: "2026-03-01",
    overview:
      "KIT is both a university with prestigious research tradition and a national research center in the Helmholtz Association. World leader in optics, photonics, and computer engineering.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Prime Germany",
        specialBenefit: "Secured and unsecured loan options for top-ranked German research institute.",
      },
      {
        name: "Avanse Financial Services",
        maxUnsecuredINR: "₹40 Lakhs",
        maxSecuredINR: "₹80 Lakhs",
        indicativeRate: "10.40% - 11.65%",
        primeListStatus: "KIT Fast Track",
        specialBenefit: "Direct blocked account deposit within 5 working days.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa Sperrkonto & APS",
      requiredFundsINR: "€11,904 Blocked Account",
      guidelines: [
        "KIT admits require standard German blocked account certification plus APS certificate.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Computer Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
      { name: "M.Sc. in Mechanical Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
      { name: "M.Sc. in Energy Technologies", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹28 Lakhs" },
    ],
    faqs: [
      {
        question: "Is KIT eligible for unsecured education loans in India?",
        answer: "Yes, KIT's high global ranking (QS 102) makes admits eligible for up to ₹40 Lakhs collateral-free from NBFCs."
      }
    ]
  },
  {
    slug: "tu-dresden",
    name: "TU Dresden (Technical University of Dresden)",
    shortName: "TUD",
    country: "germany",
    countryName: "Germany",
    city: "Dresden, Saxony",
    qsRank: 234,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 0,
    tuitionRangeINR: "Zero Tuition (€290/semester fee)",
    livingCostAnnual: 11904,
    livingCostINR: "₹10.8 Lakh / year (Extremely Affordable City)",
    totalAnnualCostINR: "₹11 Lakh – ₹12.5 Lakh / year",
    primeTierCategory: "TU9 German University of Excellence (Silicon Saxony)",
    verifiedDate: "2026-03-01",
    overview:
      "TU Dresden is located in 'Silicon Saxony', Europe's largest microelectronics cluster with TSMC, Infineon, and Bosch chip fabrication plants. Zero tuition fees and low cost of living.",
    lenderPolicies: [
      {
        name: "Bank of Baroda",
        maxUnsecuredINR: "₹30 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.10%",
        primeListStatus: "Baroda Scholar TU9",
        specialBenefit: "Full financing for blocked account and travel expenses.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹75 Lakhs",
        indicativeRate: "10.45% - 11.60%",
        primeListStatus: "Preferred European Tech",
        specialBenefit: "Speedy paperless processing.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa Sperrkonto",
      requiredFundsINR: "€11,904 Blocked Account",
      guidelines: [
        "Dresden living expenses are modest; €992/month blocked payout provides a very comfortable student lifestyle.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Nanoelectronic Systems", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹23 Lakhs" },
      { name: "M.Sc. in Computational Modeling and Simulation", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹23 Lakhs" },
      { name: "M.Sc. in Distributed Systems Engineering", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹23 Lakhs" },
    ],
    faqs: [
      {
        question: "Why study at TU Dresden for electronics & semiconductor engineering?",
        answer: "Dresden hosts Europe's biggest microchip hub. Lenders look very favorably at semiconductor and hardware engineering admits at TUD."
      }
    ]
  },
  {
    slug: "lmu-munich",
    name: "Ludwig Maximilian University of Munich",
    shortName: "LMU Munich",
    country: "germany",
    countryName: "Germany",
    city: "Munich, Bavaria",
    qsRank: 59,
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 0,
    tuitionRangeINR: "Zero Tuition (€152/semester semester fee)",
    livingCostAnnual: 12500,
    livingCostINR: "₹11 Lakh – ₹13 Lakh / year",
    totalAnnualCostINR: "₹12 Lakh – ₹14 Lakh / year",
    primeTierCategory: "Global Top 60 Excellence University",
    verifiedDate: "2026-03-01",
    overview:
      "LMU Munich is one of Europe's premier academic and research institutions, producing 43 Nobel laureates. Globally respected for Data Science, Physics, Economics, and Life Sciences.",
    lenderPolicies: [
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Ed-Vantage List A",
        specialBenefit: "Tier A rates for premier top 60 global university.",
      },
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹45 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.25% - 11.40%",
        primeListStatus: "Elite European Academy",
        specialBenefit: "Unsecured funding covers 2-year Munich living costs.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa Sperrkonto & APS",
      requiredFundsINR: "€11,904 Blocked Account",
      guidelines: [
        "LMU admits require statutory €11,904 blocked account and valid health insurance for visa.",
      ],
    },
    popularPrograms: [
      { name: "M.Sc. in Data Science (Elite Master)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹25 Lakhs" },
      { name: "M.Sc. in Economics", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
      { name: "M.Sc. in Physics", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹24 Lakhs" },
    ],
    faqs: [
      {
        question: "Does LMU Munich charge tuition fees?",
        answer: "No, LMU Munich charges zero tuition fees for both EU and non-EU students for most programs, requiring only a nominal semester fee of ~€152."
      }
    ]
  },
  {
    slug: "frankfurt-school-of-finance",
    name: "Frankfurt School of Finance & Management",
    shortName: "Frankfurt School",
    country: "germany",
    countryName: "Germany",
    city: "Frankfurt am Main, Hesse",
    qsRank: "Top European Business School",
    currency: "EUR",
    currencySymbol: "€",
    tuitionAnnual: 18000,
    tuitionRangeINR: "₹16 Lakh – ₹21 Lakh / year (Private B-School)",
    livingCostAnnual: 13000,
    livingCostINR: "₹11 Lakh – ₹13.5 Lakh / year (Frankfurt Financial Center)",
    totalAnnualCostINR: "₹27 Lakh – ₹34 Lakh / year",
    primeTierCategory: "Triple-Accredited Business School (AACSB, AMBA, EQUIS)",
    verifiedDate: "2026-03-01",
    overview:
      "Frankfurt School of Finance & Management is Germany's top-tier private business school, positioned at the headquarters of the European Central Bank and Deutsche Bank. High finance placement record.",
    lenderPolicies: [
      {
        name: "HDFC Credila",
        maxUnsecuredINR: "₹55 Lakhs",
        maxSecuredINR: "₹1.25 Crore",
        indicativeRate: "10.15% - 11.25%",
        primeListStatus: "Credila Elite Business School List",
        specialBenefit: "High unsecured limit up to ₹55 Lakhs for Master in Finance & MBA.",
      },
      {
        name: "ICICI Bank",
        maxUnsecuredINR: "₹45 Lakhs",
        maxSecuredINR: "₹1.00 Crore",
        indicativeRate: "10.10% - 11.15%",
        primeListStatus: "Premier Global Management List",
        specialBenefit: "Direct wire transfer in Euros for tuition tranches and blocked account.",
      },
      {
        name: "State Bank of India (SBI)",
        maxUnsecuredINR: "₹35 Lakhs",
        maxSecuredINR: "₹1.50 Crore",
        indicativeRate: "8.15% - 9.15%",
        primeListStatus: "SBI Global Ed-Vantage Approved",
        specialBenefit: "Low interest rate with property collateral.",
      },
    ],
    visaRequirements: {
      documentName: "German Student Visa (Tuition Deposit + Sperrkonto)",
      requiredFundsINR: "€11,904 in Blocked Account + 1st Semester Tuition Receipt",
      guidelines: [
        "Applicants must demonstrate both the paid tuition deposit and €11,904 deposited into a registered German Sperrkonto.",
      ],
    },
    popularPrograms: [
      { name: "Master in Finance (M.Sc.)", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹45 Lakhs" },
      { name: "Full-Time MBA", degree: "Master of Business Admin", duration: "1 Year", estimatedCostINR: "₹42 Lakhs" },
      { name: "Master in Applied Data Science", degree: "Master of Science", duration: "2 Years", estimatedCostINR: "₹40 Lakhs" },
    ],
    faqs: [
      {
        question: "Can I get an education loan for Frankfurt School of Finance?",
        answer: "Yes. Due to Frankfurt School's triple-crown accreditation and stellar corporate finance placements, Indian lenders provide up to ₹55 Lakhs collateral-free."
      }
    ]
  },
];

// Helper functions for easy lookup
export function getUniversityBySlug(slug: string): UniversityData | undefined {
  return universities.find((u) => u.slug === slug);
}

export function getUniversitiesByCountry(country: "usa" | "germany"): UniversityData[] {
  return universities.filter((u) => u.country === country);
}
