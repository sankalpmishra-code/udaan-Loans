export interface Lender {
  name: string;
  shortName?: string;
  slug: string;
  logo: string;
  category: "Public Sector Bank" | "Private Bank" | "NBFC / Global Lender";
  schemeName: string;
  schemeUrl: string;
  maxUnsecured: string;
  maxSecured: string;
  interestRate: string;
  rateType: "Floating (Repo/EBLR-linked)" | "Floating (Spread/MCLR-linked)" | "Fixed";
  processingTime: string;
  marginMoney: string;
  applicableConditions: string;
  effectiveDate: string;
  verifiedBy: string;
  sourceAuditRef: string;
  highlights: string[];
}

export const lendersList: Lender[] = [
  {
    name: "State Bank of India",
    shortName: "SBI",
    slug: "sbi",
    logo: "/logos/lenders/sbi.svg",
    category: "Public Sector Bank",
    schemeName: "SBI Global Ed-vantage",
    schemeUrl: "https://sbi.co.in/web/personal-banking/loans/education-loans/global-ed-vantage-scheme",
    maxUnsecured: "Up to ₹7.5 Lakhs (Standard)",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "7.75% - 9.15%",
    rateType: "Floating (Repo/EBLR-linked)",
    processingTime: "10 - 15 days",
    marginMoney: "10% - 15%",
    applicableConditions:
      "Rate linked to SBI EBLR (Repo 6.50% + spread). 7.75% effective rate applies to top-tier global institutions and includes a statutory 0.50% concession for female students. Full simple interest serviced during moratorium qualifies for an additional 0.50% rebate. Tangible collateral required for amounts >₹7.5L.",
    effectiveDate: "November 2026",
    verifiedBy: "Rajesh Sharma, Former Scale-IV Credit Underwriter (SBI), Udaan Credit Desk",
    sourceAuditRef: "SBI/P&SP/EDU/2026-NOV/V4",
    highlights: [
      "Lowest floating interest rate in India starting from 7.75%",
      "0.50% statutory interest concession for girl students",
      "Repayment tenure up to 15 years post-moratorium",
      "Full Section 80E income tax deduction on 100% interest paid",
    ],
  },
  {
    name: "Bank of Baroda",
    shortName: "Bank of Baroda",
    slug: "bank-of-baroda",
    logo: "/logos/lenders/bank-of-baroda.svg",
    category: "Public Sector Bank",
    schemeName: "Baroda Scholar Scheme (Overseas)",
    schemeUrl: "https://www.bankofbaroda.in/personal-banking/loans/education-loan/baroda-scholar",
    maxUnsecured: "Up to ₹40 Lakhs (Premier Institutes)",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "7.90% - 9.30%",
    rateType: "Floating (Repo/EBLR-linked)",
    processingTime: "10 - 15 days",
    marginMoney: "10%",
    applicableConditions:
      "Rate linked to Baroda Repo Linked Lending Rate (BRLLR). 7.90% offered for specified List-A premier global universities with 0.50% concession for girl students. Collateral-free sanction up to ₹40 Lakhs available exclusively for top 150 globally ranked institutions.",
    effectiveDate: "November 2026",
    verifiedBy: "Rajesh Sharma, Former Scale-IV Credit Officer, Udaan Credit Desk",
    sourceAuditRef: "BOB/RET/EDU-SCH/2026-NOV",
    highlights: [
      "Collateral-free up to ₹40 Lakhs for top 150 global universities",
      "0.50% interest concession for female scholars",
      "Zero processing fees for notified premier institutions",
      "Flexible moratorium covering course duration + 1 year",
    ],
  },
  {
    name: "Punjab National Bank",
    shortName: "PNB",
    slug: "punjab-national-bank",
    logo: "/logos/lenders/punjab-national-bank.svg",
    category: "Public Sector Bank",
    schemeName: "PNB Udaan (Overseas Higher Studies)",
    schemeUrl: "https://www.pnbindia.in/education.html",
    maxUnsecured: "Up to ₹7.5 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "8.15% - 9.60%",
    rateType: "Floating (Repo/EBLR-linked)",
    processingTime: "12 - 16 days",
    marginMoney: "15%",
    applicableConditions:
      "Linked to PNB Repo Linked Lending Rate (RLLR). 0.50% concession for girl students. Secured by freehold residential or commercial property with 100% loan-to-value margin clearance.",
    effectiveDate: "November 2026",
    verifiedBy: "Rajesh Sharma, Former Scale-IV Credit Officer, Udaan Credit Desk",
    sourceAuditRef: "PNB/ADV/EDU-UDAAN/2026-NOV",
    highlights: [
      "Competitive public sector interest structure",
      "0.50% interest rebate for female applicants",
      "Flexible moratorium covering full course duration + 6 months",
      "Eligible for 100% tax deduction under Section 80E",
    ],
  },
  {
    name: "ICICI Bank",
    shortName: "ICICI Bank",
    slug: "icici-bank",
    logo: "/logos/lenders/icici-bank.svg",
    category: "Private Bank",
    schemeName: "ICICI Bank International Education Loan",
    schemeUrl: "https://www.icicibank.com/personal-banking/loans/education-loan",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "9.50% - 11.75%",
    rateType: "Floating (Repo/EBLR-linked)",
    processingTime: "4 - 6 days",
    marginMoney: "0% - 10%",
    applicableConditions:
      "Linked to ICICI Bank I-EBLR. Rates depend on student academic tier, entrance scores (GRE/GMAT), and co-applicant CIBIL score (685+). 0% margin money available on select prime international programs.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Senior Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "ICICI/RET/EDU-INTL/2026-NOV",
    highlights: [
      "Fast digital sanction in 4 to 6 business days",
      "Seamless integration with ICICI Bank Canada Student GIC program",
      "Direct international telegraphic transfer (SWIFT) to overseas universities",
      "Sanction letter issued before visa file submission",
    ],
  },
  {
    name: "Axis Bank",
    shortName: "Axis Bank",
    slug: "axis-bank",
    logo: "/logos/lenders/axis-bank.svg",
    category: "Private Bank",
    schemeName: "Axis Bank Education Loan for Studies Abroad",
    schemeUrl: "https://www.axisbank.com/retail/loans/education-loan",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "9.75% - 12.00%",
    rateType: "Floating (Repo/EBLR-linked)",
    processingTime: "5 - 8 days",
    marginMoney: "0% - 15%",
    applicableConditions:
      "Rate linked to Axis Bank Repo Benchmark. Unsecured loans up to ₹50 Lakhs require co-applicant minimum disposable monthly income of ₹40,000 and clean CIBIL track record (700+ preferred).",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Senior Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "AXIS/EDU/RET/2026-NOV",
    highlights: [
      "Pre-admission sanction letters for visa counseling",
      "Multi-currency disbursement in USD, EUR, GBP, CAD, and AUD",
      "Zero margin money options for premier STEM and MBA universities",
      "Full Section 80E tax benefits available",
    ],
  },
  {
    name: "HDFC Credila",
    shortName: "HDFC Credila",
    slug: "hdfc-credila",
    logo: "/logos/lenders/hdfc-credila.svg",
    category: "NBFC / Global Lender",
    schemeName: "HDFC Credila Customized Overseas Student Loan",
    schemeUrl: "https://www.hdfccredila.com/",
    maxUnsecured: "Up to ₹75 Lakhs",
    maxSecured: "Up to ₹1.5 Crore+",
    interestRate: "10.25% - 12.75%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    applicableConditions:
      "Linked to HDFC Credila Benchmark Lending Rate (CBLR). Custom underwriting evaluates GRE/GMAT score, university STEM ranking, and future earning potential. 0% margin money means 100% of study and living expenses are funded.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter (HDFC Credila), Udaan Advisory Desk",
    sourceAuditRef: "CREDILA/UNDERWRITING/2026-NOV/C4",
    highlights: [
      "India's dedicated pioneer education loan NBFC",
      "100% cost of education covered (0% margin money required)",
      "Pre-visa disbursement directly into German Blocked Accounts (€11,904) and Canada GIC (CAD $23,448)",
      "Full tax deduction under Section 80E as an approved financial institution",
    ],
  },
  {
    name: "Avanse Financial Services",
    shortName: "Avanse",
    slug: "avanse",
    logo: "/logos/lenders/avanse.svg",
    category: "NBFC / Global Lender",
    schemeName: "Avanse Study Abroad Education Loan",
    schemeUrl: "https://www.avanse.com/education-loan/study-abroad",
    maxUnsecured: "Up to ₹75 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "10.50% - 13.00%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    applicableConditions:
      "Floating rate linked to Avanse Base Rate. Underwriting accommodates non-standard co-borrowers and covers living expenses, airfare, exam fees, and laptop costs.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "AVANSE/OPS/ABROAD/2026-NOV",
    highlights: [
      "Zero margin money funding 100% of attendance costs",
      "Rapid turnaround time of 3 to 5 business days",
      "Direct remittance into overseas university accounts and blocked deposits",
      "Covers entrance test fees, health insurance, and economy return airfare",
    ],
  },
  {
    name: "Auxilo Finserve",
    shortName: "Auxilo",
    slug: "auxilo",
    logo: "/logos/lenders/auxilo.svg",
    category: "NBFC / Global Lender",
    schemeName: "Auxilo Overseas Student Loan",
    schemeUrl: "https://www.auxilo.com/education-loan",
    maxUnsecured: "Up to ₹60 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "10.75% - 13.25%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    applicableConditions:
      "Flexible co-applicant criteria including extended family (paternal/maternal uncles, aunts). Pro-student underwriting prioritizing course ROI and graduate employability.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "AUXILO/CREDIT/2026-NOV",
    highlights: [
      "Considers extended family members as secondary co-applicants",
      "100% digital paperless verification process",
      "0% margin money with complete living and tuition coverage",
      "Pre-visa embassy-compliant sanction letters",
    ],
  },
  {
    name: "InCred Finance",
    shortName: "InCred",
    slug: "incred",
    logo: "/logos/lenders/incred.svg",
    category: "NBFC / Global Lender",
    schemeName: "InCred Student Loan for Abroad Studies",
    schemeUrl: "https://www.incred.com/education-loan.html",
    maxUnsecured: "Up to ₹60 Lakhs",
    maxSecured: "Up to ₹1 Crore",
    interestRate: "10.75% - 13.50%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    applicableConditions:
      "Custom risk-based pricing. Students with high GRE (315+) and STEM admits receive prime interest rate slabs.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "INCRED/STUDENT/2026-NOV",
    highlights: [
      "Merit-driven evaluation for STEM master's and MBA programs",
      "Fast 72-hour conditional in-principle sanction",
      "100% financing with zero margin requirement",
      "Section 80E tax deduction certificate provided annually",
    ],
  },
  {
    name: "Poonawalla Fincorp",
    shortName: "Poonawalla Fincorp",
    slug: "poonawalla-fincorp",
    logo: "/logos/lenders/poonawalla-fincorp.svg",
    category: "NBFC / Global Lender",
    schemeName: "Poonawalla Overseas Education Loan",
    schemeUrl: "https://poonawallafincorp.com/education-loan",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "10.50% - 13.00%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    applicableConditions:
      "Requires minimum co-applicant monthly income of ₹35,000 and CIBIL score of 685+. 100% digital end-to-end processing.",
    effectiveDate: "November 2026",
    verifiedBy: "Rajesh Sharma, Former Scale-IV Credit Officer, Udaan Credit Desk",
    sourceAuditRef: "POONAWALLA/EDU/2026-NOV",
    highlights: [
      "Completely digital paperless application flow",
      "Flexible repayment options up to 10 years post-course",
      "Covers tuition fees, living costs, and travel allowances",
    ],
  },
  {
    name: "Tata Capital",
    shortName: "Tata Capital",
    slug: "tata-capital",
    logo: "/logos/lenders/tata-capital.svg",
    category: "NBFC / Global Lender",
    schemeName: "Tata Capital Abroad Education Loan",
    schemeUrl: "https://www.tatacapital.com/education-loan.html",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1 Crore",
    interestRate: "10.75% - 13.25%",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "3 - 5 days",
    marginMoney: "0% - 10%",
    applicableConditions:
      "Backed by Tata Group governance. Floating interest rate depends on co-applicant ITR history and university placement records.",
    effectiveDate: "November 2026",
    verifiedBy: "Rajesh Sharma, Former Scale-IV Credit Officer, Udaan Credit Desk",
    sourceAuditRef: "TATACAP/EDU/2026-NOV",
    highlights: [
      "Institutional credibility of the Tata brand",
      "Fast 3 to 5 business day sanction turnaround",
      "Flexible repayment terms with student-friendly grace periods",
    ],
  },
  {
    name: "Prodigy Finance",
    shortName: "Prodigy Finance",
    slug: "prodigy-finance",
    logo: "/logos/lenders/prodigy-finance.svg",
    category: "NBFC / Global Lender",
    schemeName: "Prodigy Finance International Student Loan",
    schemeUrl: "https://prodigyfinance.com/",
    maxUnsecured: "Up to $100,000 (USD)",
    maxSecured: "N/A (100% Collateral-Free)",
    interestRate: "From 11.50% (USD / Variable)",
    rateType: "Floating (Spread/MCLR-linked)",
    processingTime: "5 - 10 days",
    marginMoney: "0%",
    applicableConditions:
      "Disbursed in USD, GBP, or EUR directly to university campus. 100% collateral-free and requires NO Indian co-signer or property mortgage. Variable rate pegged to 3-month SOFR + margin. Note: As a foreign international lender, interest is NOT eligible for Indian Section 80E tax deductions.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "PRODIGY/GLOBAL/2026-NOV",
    highlights: [
      "Zero collateral and zero Indian co-signer required",
      "Direct foreign currency disbursement to 1,000+ top global universities",
      "Sanction letter recognized for US Form I-20 and UK CAS issuance",
      "Repayment starts 6 months post-graduation in USD/GBP/EUR",
    ],
  },
  {
    name: "MPOWER Financing",
    shortName: "MPOWER Financing",
    slug: "mpower",
    logo: "/logos/lenders/mpower.svg",
    category: "NBFC / Global Lender",
    schemeName: "MPOWER Fixed-Rate International Student Loan",
    schemeUrl: "https://www.mpowerfinancing.com/",
    maxUnsecured: "Up to $100,000 (USD)",
    maxSecured: "N/A (100% Collateral-Free)",
    interestRate: "From 11.99% Fixed (USD)",
    rateType: "Fixed",
    processingTime: "5 - 10 days",
    marginMoney: "0%",
    applicableConditions:
      "100% Fixed interest rate in USD eliminating all future interest hike risks and currency volatility. Zero collateral, zero co-signer. Supports degree programs in the USA and Canada. Note: Not eligible for Indian Section 80E tax deductions.",
    effectiveDate: "November 2026",
    verifiedBy: "Ananya Sen, Former Credit Underwriter, Udaan Advisory Committee",
    sourceAuditRef: "MPOWER/FIXED/2026-NOV",
    highlights: [
      "100% Fixed interest rate protects against benchmark hikes",
      "No Indian co-signer, family income proof, or property needed",
      "Sanctions accepted by US and Canadian immigration authorities",
      "Includes complimentary career counseling and immigration support",
    ],
  },
];

export function getLenderBySlug(slug: string): Lender | undefined {
  return lendersList.find((l) => l.slug === slug);
}

/**
 * Category-Level Market Benchmarks (November 2026)
 * Explains market-wide ranges across all borrower risk tiers vs prime flagship schemes.
 */
export interface CategoryBenchmark {
  category: "Public Sector Banks" | "Private Commercial Banks" | "Education NBFCs" | "USD / Global Lenders";
  marketRange: string;
  flagshipStartingRate: string;
  rateType: string;
  unsecuredLimit: string;
  securedLimit: string;
  marginMoney: string;
  sanctionSpeed: string;
  sec80eStatus: string;
  primaryPartners: string[];
  explanation: string;
}

export const categoryBenchmarks: CategoryBenchmark[] = [
  {
    category: "Public Sector Banks",
    marketRange: "7.75% – 9.60%",
    flagshipStartingRate: "From 7.75% (SBI Global Ed-vantage for premier institutes + female concession)",
    rateType: "Floating (RBI Repo / EBLR Linked)",
    unsecuredLimit: "Up to ₹50 Lakhs (Premier Tiers) / ₹7.5L Standard",
    securedLimit: "Up to ₹1.5 Crore",
    marginMoney: "10% – 15%",
    sanctionSpeed: "10 – 15 Days",
    sec80eStatus: "Yes (100% Interest Deduction)",
    primaryPartners: ["SBI", "Bank of Baroda", "PNB", "Union Bank"],
    explanation:
      "Public sector loans offer the lowest cumulative interest outgo in India. Flagship schemes like SBI Global Ed-vantage start from 7.75% for top global universities when factoring in the statutory 0.50% concession for girl students and simple interest during moratorium. Broader market rates for unlisted colleges or higher-risk courses range up to 9.60%.",
  },
  {
    category: "Private Commercial Banks",
    marketRange: "9.25% – 11.75%",
    flagshipStartingRate: "From 9.25% (Prime Tier admits with salaried co-applicants CIBIL 750+)",
    rateType: "Floating (Bank Repo / EBLR Linked)",
    unsecuredLimit: "Up to ₹50 Lakhs – ₹60 Lakhs",
    securedLimit: "Up to ₹1.5 Crore",
    marginMoney: "0% – 10%",
    sanctionSpeed: "4 – 7 Days",
    sec80eStatus: "Yes (100% Interest Deduction)",
    primaryPartners: ["ICICI Bank", "Axis Bank", "IDFC FIRST Bank", "Kotak Mahindra Bank"],
    explanation:
      "Private banks bridge the gap between low public bank rates and NBFC processing speed. They provide accelerated 4 to 7-day sanctions with minimal branch visits, offering competitive rates starting at 9.25%–9.50% for high-scoring applicants.",
  },
  {
    category: "Education NBFCs",
    marketRange: "10.25% – 13.50%",
    flagshipStartingRate: "From 10.25% (HDFC Credila for premier STEM/MBA admits)",
    rateType: "Floating (Internal Benchmark CBLR / Base Linked)",
    unsecuredLimit: "Up to ₹75 Lakhs",
    securedLimit: "Up to ₹1.5 Crore+",
    marginMoney: "0% (100% Cost Funded)",
    sanctionSpeed: "3 – 5 Days",
    sec80eStatus: "Yes (Approved Financial Institutions)",
    primaryPartners: ["HDFC Credila", "Avanse", "Auxilo", "InCred", "Poonawalla Fincorp", "Tata Capital"],
    explanation:
      "Specialized Non-Banking Financial Companies evaluate student future earnings and academic credentials rather than demanding immovable property. They are the market leaders for collateral-free loans up to ₹75 Lakhs, mandate 0% margin money, and disburse directly into German Blocked Accounts (€11,904) and Canada GIC (CAD $23,448).",
  },
  {
    category: "USD / Global Lenders",
    marketRange: "11.50% – 14.50% (USD)",
    flagshipStartingRate: "From 11.50% Variable (Prodigy) / 11.99% Fixed (MPOWER)",
    rateType: "Variable (SOFR-linked) or 100% Fixed USD",
    unsecuredLimit: "Up to $100,000 USD (Approx. ₹83 Lakhs)",
    securedLimit: "N/A (100% Collateral-Free)",
    marginMoney: "0%",
    sanctionSpeed: "5 – 10 Days",
    sec80eStatus: "No (Foreign Entities)",
    primaryPartners: ["Prodigy Finance", "MPOWER Financing"],
    explanation:
      "Designed for students admitted to premier international institutions who have no property in India and whose parents cannot act as financial co-signers. Loans are denominated and repaid in USD/GBP/EUR. Foreign loans do NOT qualify for Section 80E tax deductions in India.",
  },
];
