/**
 * Lender Logo Resolution & Metadata Utilities
 * Provides mappings and fallbacks for official vector logos across 30+ Indian and global lenders.
 */

export interface LenderBrand {
  name: string;
  shortName: string;
  slug: string;
  logo: string;
  category: "Public Sector Bank" | "Private Bank" | "NBFC / Global Lender";
  highlight: string;
}

export const LENDER_SLUG_MAP: Record<string, string> = {
  // Public Sector Banks
  "sbi": "sbi",
  "state bank of india": "sbi",
  "state bank of india (sbi)": "sbi",
  "state bank of india (sbi global ed-vantage)": "sbi",
  "sbi global ed-vantage": "sbi",

  "bank of baroda": "bank-of-baroda",
  "bob": "bank-of-baroda",
  "bank of baroda (baroda scholar)": "bank-of-baroda",
  "baroda scholar": "bank-of-baroda",

  "punjab national bank": "punjab-national-bank",
  "pnb": "punjab-national-bank",
  "punjab national bank (pnb)": "punjab-national-bank",
  "punjab national bank (pnb udaan)": "punjab-national-bank",
  "pnb udaan": "punjab-national-bank",

  "canara bank": "canara-bank",
  "canara": "canara-bank",

  "union bank of india": "union-bank",
  "union bank": "union-bank",

  "bank of india": "bank-of-india",
  "indian bank": "indian-bank",
  "central bank of india": "central-bank-of-india",
  "indian overseas bank": "indian-overseas-bank",
  "bank of maharashtra": "bank-of-maharashtra",
  "uco bank": "uco-bank",
  "punjab & sind bank": "punjab-and-sind-bank",
  "punjab and sind bank": "punjab-and-sind-bank",

  // Private Commercial Banks
  "hdfc bank": "hdfc-bank",
  "hdfc bank (education loans abroad)": "hdfc-bank",
  "hdfc": "hdfc-bank",

  "icici bank": "icici-bank",
  "icici bank (international education loan)": "icici-bank",
  "icici": "icici-bank",

  "axis bank": "axis-bank",
  "axis bank (study abroad loan)": "axis-bank",
  "axis": "axis-bank",

  "kotak mahindra bank": "kotak-mahindra-bank",
  "kotak bank": "kotak-mahindra-bank",
  "kotak": "kotak-mahindra-bank",

  "idfc first bank": "idfc-first-bank",
  "idfc first": "idfc-first-bank",
  "idfc": "idfc-first-bank",

  "federal bank": "federal-bank",
  "south indian bank": "south-indian-bank",
  "karnataka bank": "karnataka-bank",
  "yes bank": "yes-bank",
  "indusind bank": "indusind-bank",
  "rbl bank": "rbl-bank",
  "bandhan bank": "bandhan-bank",

  // NBFCs & Global Lenders
  "hdfc credila": "hdfc-credila",
  "credila": "hdfc-credila",

  "avanse financial services": "avanse",
  "avanse": "avanse",

  "auxilo finserve": "auxilo",
  "auxilo": "auxilo",

  "incred finance": "incred",
  "incred": "incred",

  "mpower financing": "mpower",
  "mpower": "mpower",

  "prodigy finance": "prodigy-finance",
  "prodigy": "prodigy-finance",

  "propelld": "propelld",
  "tata capital": "tata-capital",
  "bajaj finserv": "bajaj-finserv",
  "poonawalla fincorp": "poonawalla-fincorp",
};

/**
 * Returns the public URL of the official lender SVG logo based on bank name or slug.
 */
export function getLenderLogo(nameOrSlug: string): string {
  if (!nameOrSlug) return "/logos/lenders/sbi.svg";
  
  const normalized = nameOrSlug.toLowerCase().trim();
  
  if (LENDER_SLUG_MAP[normalized]) {
    return `/logos/lenders/${LENDER_SLUG_MAP[normalized]}.svg`;
  }
  
  // Substring matching
  const matchingKey = Object.keys(LENDER_SLUG_MAP).find((key) =>
    normalized.includes(key) || key.includes(normalized)
  );
  
  if (matchingKey) {
    return `/logos/lenders/${LENDER_SLUG_MAP[matchingKey]}.svg`;
  }
  
  return `/logos/lenders/sbi.svg`;
}

/**
 * Curated list of prominent partner lenders for showcases, marquees, and hero badges.
 */
export const FEATURED_LENDERS: LenderBrand[] = [
  {
    name: "State Bank of India",
    shortName: "SBI",
    slug: "sbi",
    logo: "/logos/lenders/sbi.svg",
    category: "Public Sector Bank",
    highlight: "Lowest Rates from 7.75%",
  },
  {
    name: "Bank of Baroda",
    shortName: "Bank of Baroda",
    slug: "bank-of-baroda",
    logo: "/logos/lenders/bank-of-baroda.svg",
    category: "Public Sector Bank",
    highlight: "Up to ₹40L Collateral-Free (Premier)",
  },
  {
    name: "HDFC Credila",
    shortName: "HDFC Credila",
    slug: "hdfc-credila",
    logo: "/logos/lenders/hdfc-credila.svg",
    category: "NBFC / Global Lender",
    highlight: "Up to ₹75L Collateral-Free",
  },
  {
    name: "ICICI Bank",
    shortName: "ICICI Bank",
    slug: "icici-bank",
    logo: "/logos/lenders/icici-bank.svg",
    category: "Private Bank",
    highlight: "Direct University Wire Remittance",
  },
  {
    name: "Avanse Financial Services",
    shortName: "Avanse",
    slug: "avanse",
    logo: "/logos/lenders/avanse.svg",
    category: "NBFC / Global Lender",
    highlight: "100% Cost & Blocked Account Funding",
  },
  {
    name: "Axis Bank",
    shortName: "Axis Bank",
    slug: "axis-bank",
    logo: "/logos/lenders/axis-bank.svg",
    category: "Private Bank",
    highlight: "Multi-Currency Sanctions",
  },
  {
    name: "Punjab National Bank",
    shortName: "PNB",
    slug: "punjab-national-bank",
    logo: "/logos/lenders/punjab-national-bank.svg",
    category: "Public Sector Bank",
    highlight: "Affordable Interest Structure",
  },
  {
    name: "Poonawalla Fincorp",
    shortName: "Poonawalla Fincorp",
    slug: "poonawalla-fincorp",
    logo: "/logos/lenders/poonawalla-fincorp.svg",
    category: "NBFC / Global Lender",
    highlight: "Digital Approval & Flexible Repayment",
  },
  {
    name: "Auxilo Finserve",
    shortName: "Auxilo",
    slug: "auxilo",
    logo: "/logos/lenders/auxilo.svg",
    category: "NBFC / Global Lender",
    highlight: "Flexible Co-Applicant Criteria",
  },
  {
    name: "InCred Finance",
    shortName: "InCred",
    slug: "incred",
    logo: "/logos/lenders/incred.svg",
    category: "NBFC / Global Lender",
    highlight: "100% Virtual Approval Process",
  },
  {
    name: "MPOWER Financing",
    shortName: "MPOWER",
    slug: "mpower",
    logo: "/logos/lenders/mpower.svg",
    category: "NBFC / Global Lender",
    highlight: "No Co-Signer or Collateral in USD",
  },
  {
    name: "Prodigy Finance",
    shortName: "Prodigy Finance",
    slug: "prodigy-finance",
    logo: "/logos/lenders/prodigy-finance.svg",
    category: "NBFC / Global Lender",
    highlight: "Collateral-Free for Top Global B-Schools",
  },
];
