export interface Destination {
  id: string;
  country: string;
  flag: string;
  popularCourses: string[];
  avgTuition: string;
  avgLivingCost: string;
  typicalLoanAmount: string;
  visaFundRequirements: string;
  loanHighlights: string[];
}

export const destinationsList: Destination[] = [
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    popularCourses: ["MS Computer Science / AI", "Data Science", "MBA", "Biotechnology", "Fintech"],
    avgTuition: "₹25L - ₹55L / year",
    avgLivingCost: "₹12L - ₹18L / year",
    typicalLoanAmount: "₹40 Lakhs - ₹1.5 Crore",
    visaFundRequirements:
      "Must show liquid funds covering 1 full academic year of tuition and living expenses as stated on Form I-20 for the F-1 visa interview.",
    loanHighlights: [
      "I-20 financial proof support",
      "Collateral-free options up to ₹75 Lakhs",
      "USD-denominated loans with zero co-signer available",
    ],
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    popularCourses: ["MSc Finance / Business", "Management", "Computer Science", "Law (LLM)", "Public Health"],
    avgTuition: "₹18L - ₹38L / year",
    avgLivingCost: "₹10L - ₹15L / year",
    typicalLoanAmount: "₹25 Lakhs - ₹60 Lakhs",
    visaFundRequirements:
      "Must show full 1st-year tuition plus 9 months of living expenses (£1,334/month in London, £1,023/month outside London). Official loan sanction letter waives the 28-day holding rule.",
    loanHighlights: [
      "Exemption from 28-day funds rule via official bank sanction",
      "Accelerated 1-year master's repayment options",
      "Living expense disbursement straight to student forex card",
    ],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    popularCourses: ["MS / Post-Graduate Diplomas in IT", "Supply Chain", "Business Analytics", "Engineering"],
    avgTuition: "₹14L - ₹30L / year",
    avgLivingCost: "₹10L - ₹14L / year",
    typicalLoanAmount: "₹20 Lakhs - ₹50 Lakhs",
    visaFundRequirements:
      "Full first-year tuition payment plus CAD $20,635 mandatory Guaranteed Investment Certificate (GIC) to prove living cost sufficiency.",
    loanHighlights: [
      "Direct loan disbursement for GIC purchase at approved banks (CIBC/Scotiabank)",
      "Pre-visa sanction letter for SDS visa stream",
      "Flexible moratorium covering 2-year post-graduation work permit (PGWP)",
    ],
  },
  {
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    popularCourses: ["Mechanical & Automotive Engineering", "Informatics", "Data Analytics", "Renewable Energy"],
    avgTuition: "Free to nominal administrative fees (€150 - €350/sem) at Public Universities",
    avgLivingCost: "₹10L - ₹12L / year (€11,904/year blocked account)",
    typicalLoanAmount: "₹12 Lakhs - ₹25 Lakhs",
    visaFundRequirements:
      "Mandatory Blocked Account (Sperrkonto) funded with €11,904 (~₹11 Lakhs) deposited into approved German providers before visa application.",
    loanHighlights: [
      "Loans customized specifically for German Blocked Account (Sperrkonto) transfer",
      "Covers health insurance, airfare, and initial arrival deposit",
      "Low principal loans with minimal EMI burden",
    ],
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    popularCourses: ["Master of Information Technology", "Engineering", "Nursing & Healthcare", "Accounting"],
    avgTuition: "₹20L - ₹42L / year",
    avgLivingCost: "₹12L - ₹16L / year (AUD $29,710/year)",
    typicalLoanAmount: "₹35 Lakhs - ₹80 Lakhs",
    visaFundRequirements:
      "Proof of funds covering 12 months tuition, living expenses (AUD $29,710), and return airfare under Genuine Student (GS) assessment.",
    loanHighlights: [
      "Sanction letter recognized by Australian Department of Home Affairs",
      "0% margin money loans available from NBFCs",
      "Tuition fees remitted directly to Group of Eight (Go8) universities",
    ],
  },
  {
    id: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    popularCourses: ["MSc Data Science", "Cloud Computing", "Pharmaceutical Sciences", "International Business"],
    avgTuition: "₹14L - ₹28L / year",
    avgLivingCost: "₹9L - ₹13L / year (€10,000/year living cost proof)",
    typicalLoanAmount: "₹25 Lakhs - ₹45 Lakhs",
    visaFundRequirements:
      "Proof of immediate access to at least €10,000 plus full tuition fees before visa submission.",
    loanHighlights: [
      "Access to European tech hub employment with 2-year stay back visa",
      "Full living expense and tuition financing",
      "Quick sanction in 4 working days",
    ],
  }
];
