export interface DestinationLender {
  name: string;
  category: "Public Bank" | "Private Bank" | "NBFC / Fintech";
  indicativeRate: string;
  maxUnsecured: string;
  maxSecured: string;
  processingDays: string;
  keyAdvantage: string;
}

export interface DestinationFAQ {
  question: string;
  answer: string;
}

export interface Destination {
  id: string;
  country: string;
  flag: string;
  tagline: string;
  popularCourses: string[];
  avgTuition: string;
  avgLivingCost: string;
  typicalLoanAmount: string;
  visaFundRequirements: string;
  embassyFinancialOverview: string;
  loanHighlights: string[];
  workPermitYears: string;
  topLenders: DestinationLender[];
  faqs: DestinationFAQ[];
}

export const destinationsList: Destination[] = [
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    tagline: "Finance MS, MBA & STEM Programs with Pre-Visa Sanction Letters for Form I-20",
    popularCourses: ["MS Computer Science / AI", "Data Science", "MBA", "Biotechnology", "Fintech", "Electrical Engineering"],
    avgTuition: "₹25L - ₹55L / year",
    avgLivingCost: "₹12L - ₹18L / year",
    typicalLoanAmount: "₹40 Lakhs - ₹1.5 Crore",
    visaFundRequirements:
      "Must show liquid funds covering 1 full academic year of tuition and living expenses as stated on Form I-20 for the F-1 visa interview.",
    embassyFinancialOverview:
      "For US F-1 student visas, US universities require verifiable liquid proof of funds matching the estimated 9-to-12-month cost before issuing Form I-20. At the consular visa interview, applicants must present a formal, unconditional bank sanction letter from an RBI-recognized bank or NBFC confirming sanction of tuition and living expenses.",
    loanHighlights: [
      "Official pre-visa sanction letters accepted for Form I-20 issuance",
      "Collateral-free loans up to ₹75 Lakhs for premier US universities",
      "USD-denominated co-signer-free loans available via global partners",
      "Moratorium period: Full course duration + 6 to 12 months grace period",
    ],
    workPermitYears: "Up to 3 Years (OPT + 24-Month STEM Extension)",
    topLenders: [
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.50%",
        maxUnsecured: "₹50 Lakhs (Top Tier)",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Lowest floating interest rate, 0.50% concession for female scholars.",
      },
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.50%",
        maxUnsecured: "₹65 Lakhs",
        maxSecured: "₹1.2 Crore",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Fast-track pre-visa sanction letter, 100% total cost of attendance coverage.",
      },
      {
        name: "ICICI Bank",
        category: "Private Bank",
        indicativeRate: "9.85% - 11.75%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "4 - 7 Days",
        keyAdvantage: "Streamlined digital approval with integrated international student forex account.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.90%",
        maxUnsecured: "₹75 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "3 - 6 Days",
        keyAdvantage: "High collateral-free ceiling for GRE 310+ or premier CS/STEM programs.",
      },
    ],
    faqs: [
      {
        question: "Does the US Embassy accept an education loan sanction letter for Form I-20 and F-1 visa?",
        answer:
          "Yes. An official, unconditional loan sanction letter from an RBI-registered Indian public bank, private bank, or NBFC (such as SBI, HDFC Credila, or ICICI) is widely accepted by US universities for issuing SEVIS Form I-20 and by US consular officers during the F-1 visa interview.",
      },
      {
        question: "Can I get an education loan for an MS in the USA without property collateral?",
        answer:
          "Yes. Indian students can secure collateral-free education loans up to ₹75 Lakhs for MS and MBA degrees in the US based on undergraduate academic record, GRE/TOEFL scores, and co-applicant income (parents or close relatives).",
      },
      {
        question: "How are tuition and living expenses disbursed for US universities?",
        answer:
          "The tuition component is transferred directly to the US university's designated wire transfer account (Flywire, Convera, or direct SWIFT) before each semester. Living expenses are loaded onto an international student forex card or wired to the student's US bank account once opened.",
      },
    ],
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Exemption from the UKVI 28-Day Financial Rule with Official Bank Sanctions",
    popularCourses: ["MSc Finance / Business", "Management", "Computer Science", "Law (LLM)", "Public Health", "Data Science"],
    avgTuition: "₹18L - ₹38L / year",
    avgLivingCost: "₹10L - ₹15L / year",
    typicalLoanAmount: "₹25 Lakhs - ₹60 Lakhs",
    visaFundRequirements:
      "Must show full 1st-year tuition plus 9 months of living expenses (£1,334/month in London, £1,023/month outside London). Official loan sanction letter waives the 28-day holding rule.",
    embassyFinancialOverview:
      "Under UKVI Student Visa regulations, applicants must demonstrate sufficient maintenance funds held consecutively for 28 calendar days before application. However, under UKVI Immigration Rules Appendix Student (ST 12.3), official education loans from regulated financial institutions are exempt from this 28-day holding requirement, allowing expedited visa filing.",
    loanHighlights: [
      "Exemption from the UKVI 28-day funds holding requirement",
      "Direct remittance for CAS deposit and university tuition fees",
      "Living allowance loaded on student multicurrency GBP forex cards",
      "Tenure up to 15 years with flexible 1-year master's moratorium",
    ],
    workPermitYears: "2 Years (Graduate Route Post-Study Work Visa)",
    topLenders: [
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.35%",
        maxUnsecured: "₹40 Lakhs (Russell Group)",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 14 Days",
        keyAdvantage: "Recognized Russell Group tier pricing with concessional rates.",
      },
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹55 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Formats sanction letter precisely to UKVI Appendix Student standards.",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹80 Lakhs",
        processingDays: "4 - 6 Days",
        keyAdvantage: "Covers 100% tuition, CAS deposit, health surcharge (IHS), and maintenance.",
      },
    ],
    faqs: [
      {
        question: "How does an education loan waive the UKVI 28-day funds rule?",
        answer:
          "According to UKVI student visa guidance (Appendix Student ST 12.3), financial requirements can be satisfied by a student loan provided by a government-regulated financial institution. Unlike personal bank savings which must mature for 28 consecutive days, a formal loan letter can be used immediately upon issuance.",
      },
      {
        question: "Are 1-year master's degrees in the UK eligible for full moratorium?",
        answer:
          "Yes. Most partner banks provide a moratorium covering the 12-month course duration plus a 6-month post-study buffer before regular principal EMIs begin.",
      },
    ],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    tagline: "Direct Financing for Tuition Fees and Mandatory CAD $20,635 Canadian GIC",
    popularCourses: ["MS / Post-Graduate Diplomas in IT", "Supply Chain", "Business Analytics", "Mechanical Engineering", "Health Sciences"],
    avgTuition: "₹14L - ₹30L / year",
    avgLivingCost: "₹10L - ₹14L / year",
    typicalLoanAmount: "₹20 Lakhs - ₹50 Lakhs",
    visaFundRequirements:
      "Full first-year tuition payment plus CAD $20,635 mandatory Guaranteed Investment Certificate (GIC) to prove living cost sufficiency.",
    embassyFinancialOverview:
      "Immigration, Refugees and Citizenship Canada (IRCC) mandates that international students demonstrate financial self-sufficiency by presenting proof of 1st-year tuition fee receipt and purchase of a Guaranteed Investment Certificate (GIC) valued at CAD $20,635 from an approved financial institution (e.g., CIBC, Scotiabank, ICICI Canada).",
    loanHighlights: [
      "Direct loan disbursement for Canadian GIC purchase (CAD $20,635)",
      "Unsecured loan limits up to ₹50 Lakhs for DLI universities and polytechnics",
      "Pre-visa sanction letter compliant with IRCC visa criteria",
      "Moratorium covers course duration plus Post-Graduation Work Permit (PGWP)",
    ],
    workPermitYears: "Up to 3 Years (Post-Graduation Work Permit - PGWP)",
    topLenders: [
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Seamless wire transfer into Canadian bank GIC accounts within 48 hours.",
      },
      {
        name: "ICICI Bank",
        category: "Private Bank",
        indicativeRate: "9.85% - 11.50%",
        maxUnsecured: "₹45 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "4 - 7 Days",
        keyAdvantage: "Integrated ICICI Bank Canada Student GIC Program setup.",
      },
      {
        name: "Bank of Baroda",
        category: "Public Bank",
        indicativeRate: "8.25% - 9.40%",
        maxUnsecured: "₹40 Lakhs (Select DLIs)",
        maxSecured: "₹1.25 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Concessional Baroda Scholar interest rates for Canadian public universities.",
      },
    ],
    faqs: [
      {
        question: "Can an education loan disburse funds directly to my Canadian GIC account?",
        answer:
          "Yes. Our partner lenders disburse the required living expenses (CAD $20,635) directly into your designated Canadian GIC account with partner banks like CIBC, Scotiabank, or ICICI Bank Canada, providing the official GIC confirmation certificate needed for your study permit.",
      },
      {
        question: "Can I get an education loan for Post-Graduate Certificate (PG Diploma) programs in Canada?",
        answer:
          "Yes. Leading NBFCs and private banks finance 1-year and 2-year post-graduate certificates and diplomas at accredited Canadian public colleges (such as Fanshawe, Seneca, Humber, and George Brown).",
      },
    ],
  },
  {
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    tagline: "Zero Tuition Financing & Immediate Blocked Account (Sperrkonto €11,904) Loans",
    popularCourses: ["Mechanical & Automotive Engineering", "Informatics / Computer Science", "Data Analytics", "Renewable Energy", "Mechatronics"],
    avgTuition: "Free to nominal administrative fees (€150 - €350/sem) at Public Universities",
    avgLivingCost: "₹10L - ₹12L / year (€11,904/year blocked account)",
    typicalLoanAmount: "₹12 Lakhs - ₹25 Lakhs",
    visaFundRequirements:
      "Mandatory Blocked Account (Sperrkonto) funded with €11,904 (~₹11 Lakhs) deposited into approved German providers before visa application.",
    embassyFinancialOverview:
      "German public universities charge virtually zero tuition fees. However, the German Embassy and Consulates in India strictly require every international student to open and fund a Blocked Account (Sperrkonto) with €11,904 to cover first-year living expenses, alongside statutory health insurance and semester contributions.",
    loanHighlights: [
      "Custom low-principal loans (₹10L - ₹20L) specifically designed for Sperrkonto",
      "Direct remittance to approved providers (Expatrio, Fintiba, Coracle, Deutsche Bank)",
      "Covers health insurance, airfare, visa fees, and initial relocation buffer",
      "Lowest monthly EMI burden due to low borrowing amounts",
    ],
    workPermitYears: "18 Months (Post-Study Job Seeker Visa / Residence Permit)",
    topLenders: [
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.00%",
        maxUnsecured: "₹30 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Direct API remittance to Expatrio and Fintiba blocked accounts.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹60 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Collateral-free living cost loans for TU9 and public technical universities.",
      },
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.15%",
        maxUnsecured: "₹20 Lakhs",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Subsidized public bank interest rate with minimal monthly interest service.",
      },
    ],
    faqs: [
      {
        question: "Can I get an education loan if my German university charges zero tuition fees?",
        answer:
          "Yes. Many students assume education loans only fund tuition fees. In reality, Indian lenders readily sanction loans of ₹12L to ₹20L strictly for living expenses, allowing students to fund the mandatory €11,904 German Sperrkonto (Blocked Account), travel tickets, and initial setup costs.",
      },
      {
        question: "How long does it take to wire loan money to Expatrio or Fintiba?",
        answer:
          "Once the loan is sanctioned, the bank executes the outward foreign exchange remittance via RBI LRS within 24 to 48 working hours. Expatrio or Fintiba then issues the 'Blocked Amount Confirmation 06' document for your visa appointment.",
      },
    ],
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    tagline: "Genuine Student (GS) Financial Proof & Group of Eight (Go8) Preferred Rates",
    popularCourses: ["Master of Information Technology", "Civil & Mining Engineering", "Nursing & Healthcare", "Accounting & Finance", "Data Science"],
    avgTuition: "₹20L - ₹42L / year",
    avgLivingCost: "₹12L - ₹16L / year (AUD $29,710/year)",
    typicalLoanAmount: "₹35 Lakhs - ₹80 Lakhs",
    visaFundRequirements:
      "Proof of funds covering 12 months tuition, living expenses (AUD $29,710), and return airfare under Genuine Student (GS) assessment.",
    embassyFinancialOverview:
      "Australia's Department of Home Affairs (Subclass 500) requires student applicants to meet the Genuine Student (GS) criterion, verifying access to genuine liquid financial support covering 1st-year tuition fees, living costs (mandated at AUD $29,710 per year), and travel costs.",
    loanHighlights: [
      "Official sanction letters recognized by Australian Department of Home Affairs",
      "0% margin money loans available from specialized NBFCs",
      "Fast-track processing for Group of Eight (Go8) university admits",
      "Covers Overseas Student Health Cover (OSHC) and travel allowance",
    ],
    workPermitYears: "2 to 4 Years (Temporary Graduate Subclass 485 Visa)",
    topLenders: [
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.40%",
        maxUnsecured: "₹40 Lakhs (Go8)",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 14 Days",
        keyAdvantage: "Concession rates for Go8 universities (Melbourne, Sydney, ANU, UNSW, Monash).",
      },
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Recognized pre-visa sanction letters for prompt Confirmation of Enrolment (CoE).",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹55 Lakhs",
        maxSecured: "₹85 Lakhs",
        processingDays: "4 - 6 Days",
        keyAdvantage: "Flexible co-applicant options and 100% cost of attendance funding.",
      },
    ],
    faqs: [
      {
        question: "Does an education loan satisfy the Australian Genuine Student (GS) requirement?",
        answer:
          "Yes. Australian immigration and university admissions offices explicitly accept loan sanction letters from scheduled commercial banks and RBI-registered NBFCs as credible evidence of genuine financial capability.",
      },
      {
        question: "Can I get a loan to pay the initial university deposit for Confirmation of Enrolment (CoE)?",
        answer:
          "Yes. Partner lenders can disburse an initial advance tranche directly to the Australian institution to secure your CoE before formal visa filing.",
      },
    ],
  },
  {
    id: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    tagline: "European Tech & Pharma Capital: Full Tuition & €10,000 Living Expense Loans",
    popularCourses: ["MSc Data Science", "Cloud Computing", "Pharmaceutical Sciences", "International Business", "Biotechnology"],
    avgTuition: "₹14L - ₹28L / year",
    avgLivingCost: "₹9L - ₹13L / year (€10,000/year living cost proof)",
    typicalLoanAmount: "₹25 Lakhs - ₹45 Lakhs",
    visaFundRequirements:
      "Proof of immediate access to at least €10,000 plus full tuition fees before visa submission.",
    embassyFinancialOverview:
      "The Irish Naturalisation and Immigration Service (INIS) requires non-EEA students to demonstrate access to at least €10,000 for living costs during each year of study, alongside proof of full tuition payment or sanctioned educational loan support.",
    loanHighlights: [
      "Access to European Silicon Docks tech hub with 2-year Third Level Graduate Scheme",
      "Full living expense and tuition fee financing up to ₹45 Lakhs without collateral",
      "Swift sanction within 3 to 5 business days",
      "Tuition transferred directly to Irish universities (Trinity College, UCD, Galway, UCC)",
    ],
    workPermitYears: "2 Years (Third Level Graduate Scheme - Stamp 1G)",
    topLenders: [
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.00%",
        maxUnsecured: "₹45 Lakhs",
        maxSecured: "₹80 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Quick sanction letters compliant with INIS Irish visa requirements.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹45 Lakhs",
        maxSecured: "₹75 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Strong approval rates for STEM, Data Science, and Pharma master's in Ireland.",
      },
    ],
    faqs: [
      {
        question: "Is Ireland a good destination for collateral-free education loans?",
        answer:
          "Yes. Due to Ireland's high post-graduation employment rates in tech and pharmaceutical sectors (Google, Meta, Pfizer European HQs), Indian lenders actively offer collateral-free loans up to ₹45 Lakhs for Irish master's degrees.",
      },
      {
        question: "How do I prove the mandatory €10,000 living expenses for Irish visa?",
        answer:
          "You can submit your official loan sanction letter indicating that €10,000 is earmarked for living expenses, or use the education bond mechanism recognized by Irish immigration.",
      },
    ],
  },
];

export function getDestinationById(id: string): Destination | undefined {
  const norm = id.toLowerCase().trim();
  return destinationsList.find((d) => d.id === norm);
}
