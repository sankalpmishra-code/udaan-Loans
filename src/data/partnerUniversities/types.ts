export type CountryCode = "usa" | "canada" | "uk" | "australia" | "germany" | "ireland";

export type PartnerNetwork = "ApplyBoard Partner" | "Navitas Pathway Partner" | "Premier Direct Partner";

export type PortalType = "applyboard" | "navitas" | "direct";

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
  city: string;
  qsRank: number | string;
  currency: "USD" | "EUR" | "CAD" | "GBP" | "AUD";
  currencySymbol: "$" | "€" | "C$" | "£" | "A$";
  tuitionAnnual: number; // in native currency
  tuitionRangeINR: string;
  livingCostAnnual: number; // in native currency
  livingCostINR: string;
  totalAnnualCostINR: string;
  primeTierCategory: string;
  partnerNetwork: PartnerNetwork;
  portalType: PortalType;
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
