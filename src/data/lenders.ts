export interface Lender {
  name: string;
  category: "Public Sector Bank" | "Private Bank" | "NBFC / Global Lender";
  maxUnsecured: string;
  maxSecured: string;
  interestRate: string;
  processingTime: string;
  marginMoney: string;
  highlights: string[];
}

export const lendersList: Lender[] = [
  {
    name: "State Bank of India (SBI Global Ed-vantage)",
    category: "Public Sector Bank",
    maxUnsecured: "Up to ₹7.5 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "7.75% - 9.15%",
    processingTime: "12 - 18 days",
    marginMoney: "10% - 15%",
    highlights: ["Lowest interest rate", "0.50% concession for girl students", "15 years repayment"],
  },
  {
    name: "Bank of Baroda (Baroda Scholar)",
    category: "Public Sector Bank",
    maxUnsecured: "Up to ₹40 Lakhs (Premier Institutes)",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "7.90% - 9.30%",
    processingTime: "10 - 15 days",
    marginMoney: "10%",
    highlights: ["Covers top 150 global universities", "No processing fee for premier institutions"],
  },
  {
    name: "Punjab National Bank (PNB Udaan)",
    category: "Public Sector Bank",
    maxUnsecured: "Up to ₹7.5 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "8.15% - 9.60%",
    processingTime: "12 - 16 days",
    marginMoney: "15%",
    highlights: ["Affordable interest structure", "Flexible moratorium options"],
  },
  {
    name: "HDFC Bank (Education Loans Abroad)",
    category: "Private Bank",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "9.25% - 11.50%",
    processingTime: "4 - 7 days",
    marginMoney: "0% - 15%",
    highlights: ["Pre-admission sanction", "Covers tuition and living costs", "Fast digital sanction"],
  },
  {
    name: "ICICI Bank (International Education Loan)",
    category: "Private Bank",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "9.50% - 11.75%",
    processingTime: "4 - 6 days",
    marginMoney: "0% - 10%",
    highlights: ["Direct remittance to universities", "Instant sanction for select colleges"],
  },
  {
    name: "Axis Bank (Study Abroad Loan)",
    category: "Private Bank",
    maxUnsecured: "Up to ₹50 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "9.75% - 12.00%",
    processingTime: "5 - 8 days",
    marginMoney: "0% - 15%",
    highlights: ["Multi-currency disbursement", "Zero margin money available on select programs"],
  },
  {
    name: "HDFC Credila",
    category: "NBFC / Global Lender",
    maxUnsecured: "Up to ₹75 Lakhs",
    maxSecured: "Up to ₹1.5 Crore+",
    interestRate: "10.25% - 12.75%",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    highlights: ["India's dedicated education loan NBFC", "100% expense coverage", "Pre-visa disbursal available"],
  },
  {
    name: "Avanse Financial Services",
    category: "NBFC / Global Lender",
    maxUnsecured: "Up to ₹75 Lakhs",
    maxSecured: "Up to ₹1.5 Crore",
    interestRate: "10.50% - 13.00%",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    highlights: ["Tailor-made repayment plans", "Fast approval", "Covers test prep & flights"],
  },
  {
    name: "Auxilo Finserve",
    category: "NBFC / Global Lender",
    maxUnsecured: "Up to ₹60 Lakhs",
    maxSecured: "Up to ₹1.25 Crore",
    interestRate: "10.75% - 13.25%",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    highlights: ["Flexible co-applicant criteria", "Fast-track digital processing"],
  },
  {
    name: "InCred Finance",
    category: "NBFC / Global Lender",
    maxUnsecured: "Up to ₹60 Lakhs",
    maxSecured: "Up to ₹1 Crore",
    interestRate: "10.75% - 13.50%",
    processingTime: "3 - 5 days",
    marginMoney: "0%",
    highlights: ["Considers non-standard co-applicants", "Doorstep assistance"],
  },
  {
    name: "MPOWER Financing",
    category: "NBFC / Global Lender",
    maxUnsecured: "Up to $100,000 (USD)",
    maxSecured: "N/A (100% Collateral-Free)",
    interestRate: "Fixed USD rates (from 11.99%)",
    processingTime: "5 - 10 days",
    marginMoney: "0%",
    highlights: ["No Indian co-signer or collateral required", "Disbursed directly in USD/CAD"],
  }
];
