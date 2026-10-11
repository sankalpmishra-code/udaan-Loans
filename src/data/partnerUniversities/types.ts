export type CountryCode =
  | "usa"
  | "canada"
  | "uk"
  | "australia"
  | "germany"
  | "ireland"
  | "netherlands"
  | "france"
  | "sweden"
  | "italy"
  | "switzerland";

export type Region = "uk" | "europe" | "north-america" | "australia";

export type InstitutionType =
  | "Russell Group / Global Top 100"
  | "Premier Research University"
  | "Top Public University"
  | "Applied Sciences & Polytechnic"
  | "Triple-Accredited Business School"
  | "University Pathway College";

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
  country: CountryCode;
  countryName: string;
  region: Region;
  city: string;
  qsRank: number | string;
  currency: "USD" | "EUR" | "CAD" | "GBP" | "AUD" | "CHF" | "SEK";
  currencySymbol: "$" | "€" | "C$" | "£" | "A$" | "CHF" | "SEK";
  tuitionAnnual: number; // in native currency
  tuitionRangeINR: string;
  livingCostAnnual: number; // in native currency
  livingCostINR: string;
  totalAnnualCostINR: string;
  primeTierCategory: string;
  institutionType: InstitutionType;
  partnerNetwork: string; // Clean badge e.g. "Russell Group", "Global Top 50", "TU9 Excellence", "Premier Public DLI"
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
