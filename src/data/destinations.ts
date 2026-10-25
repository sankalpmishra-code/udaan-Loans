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
    popularCourses: ["MSc Finance / Business Analytics", "Computer Science & AI", "Management & MBA", "Law (LLM)", "Public Health & Biotechnology", "Data Science"],
    avgTuition: "₹18L - ₹38L / year",
    avgLivingCost: "₹10L - ₹15L / year (£1,483/mo London; £1,136/mo outside London)",
    typicalLoanAmount: "₹25 Lakhs - ₹65 Lakhs",
    visaFundRequirements:
      "Must show full 1st-year tuition balance (as stated on CAS) plus UKVI maintenance funds (£1,483/month in London = £13,347; £1,136/month outside London = £10,224 for up to 9 months). Official bank loan sanction letters completely waive the 28-day holding requirement under UKVI Appendix Finance.",
    embassyFinancialOverview:
      "Under UK Visas and Immigration (UKVI) Student Route regulations, applicants must demonstrate sufficient course fees and maintenance funds. While personal bank accounts require funds to be held continuously for 28 consecutive days, official education loan sanction letters from RBI-regulated scheduled banks or NBFCs are explicitly exempt from this rule under UKVI Appendix Finance (FIN 8.1), allowing immediate visa submission upon sanction.",
    loanHighlights: [
      "100% exemption from the UKVI 28-day funds holding requirement",
      "Direct foreign outward remittance for CAS deposit, IHS (Immigration Health Surcharge), and tuition fees",
      "Living allowance loaded onto multi-currency GBP student forex cards",
      "Up to ₹75 Lakhs collateral-free for premier Russell Group universities",
      "Moratorium covering 1-year master's plus 6-month buffer aligned with the 2-year Graduate Route visa",
    ],
    workPermitYears: "2 Years (Graduate Route Post-Study Work Visa)",
    topLenders: [
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.35%",
        maxUnsecured: "₹50 Lakhs (Russell Group)",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 14 Days",
        keyAdvantage: "Concessional interest rates and simple interest during moratorium for Russell Group admits.",
      },
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹75 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Formats sanction letter precisely to UKVI Appendix Finance standards with fast CAS wire transfer.",
      },
      {
        name: "Axis Bank",
        category: "Private Bank",
        indicativeRate: "9.25% - 10.75%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹1.5 Crore",
        processingDays: "4 - 6 Days",
        keyAdvantage: "Fast digital sanction letter and competitive GBP exchange rates for university remittances.",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹55 Lakhs",
        maxSecured: "₹80 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "100% cost-of-study financing covering CAS deposit, health surcharge (IHS), flights, and maintenance.",
      },
    ],
    faqs: [
      {
        question: "How does an education loan waive the UKVI 28-day funds rule?",
        answer:
          "Under UKVI Appendix Finance (FIN 8.1), an applicant using an educational loan provided by a government-regulated financial institution is completely exempt from the 28-day holding requirement. You can submit your official loan sanction letter immediately upon issuance without waiting for funds to mature in a savings account.",
      },
      {
        question: "Can an education loan fund the UK CAS deposit and Immigration Health Surcharge (IHS)?",
        answer:
          "Yes. Our partner lenders disburse funds in stages, allowing you to pay your mandatory university CAS confirmation deposit (£2,000–£5,000) and the mandatory Immigration Health Surcharge (IHS) directly through the lender before your visa appointment.",
      },
      {
        question: "Are 1-year Master's degrees in the UK eligible for full moratorium?",
        answer:
          "Yes. Partner banks and NBFCs structure loans for 1-year UK Master's programs with a moratorium covering the 12-month course duration plus a 6-month post-study buffer before regular principal EMIs begin.",
      },
      {
        question: "Which lenders offer the highest collateral-free limits for Russell Group universities?",
        answer:
          "Specialized NBFCs like HDFC Credila and Avanse offer up to ₹75 Lakhs without collateral for Russell Group universities (e.g., Oxford, Cambridge, Imperial, UCL, Manchester). Private banks like Axis and ICICI offer up to ₹50 Lakhs collateral-free with competitive rates.",
      },
    ],
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    tagline: "Direct Financing for Tuition Fees and Mandatory CAD $20,635 Canadian GIC",
    popularCourses: ["MS / Post-Graduate Diplomas in IT", "Supply Chain & Logistics", "Business Analytics", "Mechanical & Civil Engineering", "Health Sciences & Biotechnology"],
    avgTuition: "₹14L - ₹30L / year",
    avgLivingCost: "₹10L - ₹14L / year (CAD $20,635/year mandatory GIC)",
    typicalLoanAmount: "₹20 Lakhs - ₹55 Lakhs",
    visaFundRequirements:
      "Full first-year tuition payment receipt from a Designated Learning Institution (DLI) plus CAD $20,635 mandatory Guaranteed Investment Certificate (GIC) from an approved Canadian bank, and a Provincial Attestation Letter (PAL) where applicable.",
    embassyFinancialOverview:
      "Immigration, Refugees and Citizenship Canada (IRCC) mandates that international students demonstrate financial self-sufficiency by presenting proof of first-year tuition payment and purchase of a Guaranteed Investment Certificate (GIC) valued at CAD $20,635 from an approved financial institution (e.g., CIBC, Scotiabank, ICICI Bank Canada, RBC, TD). Under IRCC study permit guidelines, education loans from recognized Indian scheduled banks and NBFCs are fully accepted.",
    loanHighlights: [
      "Direct two-tranche disbursement: Tranche 1 wires CAD $20,635 directly to Canadian bank GIC; Tranche 2 wires tuition to DLI",
      "Unsecured loan limits up to ₹50 Lakhs for DLI universities and public colleges",
      "Official pre-visa sanction letter compliant with IRCC visa criteria",
      "Moratorium covers course duration plus 6-month buffer matching the Post-Graduation Work Permit (PGWP)",
      "0% margin money loans available from specialized education NBFCs",
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
        keyAdvantage: "Market leader for Canadian DLIs; direct wire transfer into CIBC/Scotiabank GIC accounts within 48 hours.",
      },
      {
        name: "ICICI Bank",
        category: "Private Bank",
        indicativeRate: "9.50% - 11.00%",
        maxUnsecured: "₹45 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "4 - 6 Days",
        keyAdvantage: "Seamless integrated setup with ICICI Bank Canada Student GIC Program.",
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
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹50 Lakhs",
        maxSecured: "₹75 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "100% cost-of-study financing covering tuition fees, GIC living costs, and health coverage.",
      },
    ],
    faqs: [
      {
        question: "How does the loan disbursement work for the Canadian GIC (CAD $20,635)?",
        answer:
          "Upon formal loan sanction, your lender executes an outward wire transfer via RBI LRS directly to your Canadian bank GIC account (with CIBC, Scotiabank, or ICICI Bank Canada). Once credited, the Canadian bank issues your official GIC Confirmation Certificate for your IRCC study permit application.",
      },
      {
        question: "Can I get an education loan for Post-Graduate Certificate (PG Diploma) programs in Canada?",
        answer:
          "Yes. Specialized NBFCs (HDFC Credila, Avanse, Auxilo) and private banks actively finance 1-year and 2-year post-graduate certificates and diplomas at accredited Canadian public colleges (such as Seneca, Humber, George Brown, and Sheridan).",
      },
      {
        question: "Does an education loan cover the Provincial Attestation Letter (PAL) deposit?",
        answer:
          "Yes. Most Canadian institutions require an initial tuition deposit (typically CAD $5,000 to $10,000) before issuing the Provincial Attestation Letter (PAL). Our partner lenders can disburse this initial deposit directly against your conditional offer letter.",
      },
      {
        question: "Is collateral required for Canada student loans above ₹40 Lakhs?",
        answer:
          "Not necessarily. If you are admitted to an accredited public university or leading DLI for a Master's degree, NBFCs provide up to ₹50 Lakhs without collateral based on student merit and co-applicant income. For loans above ₹50 Lakhs, property collateral or fixed deposits are required.",
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
      "Mandatory Blocked Account (Sperrkonto) funded with €11,904 (~₹11 Lakhs) deposited into approved German providers (Coracle, Expatrio, Fintiba), plus valid APS certificate and statutory health insurance proof.",
    embassyFinancialOverview:
      "German public universities charge zero tuition fees for domestic and international students. However, the German Embassy and VFS Global consulates across India strictly mandate that every student demonstrate financial means by funding a Blocked Account (Sperrkonto) with €11,904 to cover first-year living expenses. Furthermore, all Indian applicants with degrees from India must obtain an APS (Akademische Prüfstelle) verification certificate before filing their National Visa (Subclass D) appointment.",
    loanHighlights: [
      "Specialized low-principal living expense loans (₹10L - ₹25L) specifically structured for Sperrkonto",
      "Direct foreign outward remittance (RBI LRS) into approved providers (Expatrio, Coracle, Fintiba)",
      "Covers mandatory German health insurance (TK / Barmer / DAK), flight booking, and visa fees",
      "Lowest monthly EMI burden post-graduation due to small borrowing principal",
      "Pre-visa sanction letters accepted by German consulates in New Delhi, Mumbai, Chennai, Bengaluru, and Kolkata",
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
        keyAdvantage: "Direct API integration with Expatrio and Fintiba for 48h outward wire transfer.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹60 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "100% collateral-free living cost loans for TU9 and state public universities.",
      },
      {
        name: "ICICI Bank",
        category: "Private Bank",
        indicativeRate: "9.50% - 10.75%",
        maxUnsecured: "₹40 Lakhs",
        maxSecured: "₹1.0 Crore",
        processingDays: "4 - 7 Days",
        keyAdvantage: "Fast digital sanction letter and competitive forex rates for German remittances.",
      },
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.15%",
        maxUnsecured: "₹20 Lakhs",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Lowest floating interest rate under Global Ed-Vantage if collateral property is provided.",
      },
    ],
    faqs: [
      {
        question: "Can I get an education loan if my German university charges zero tuition fees?",
        answer:
          "Yes. Indian scheduled banks and specialized NBFCs regularly approve education loans of ₹12 Lakhs to ₹20 Lakhs exclusively to finance living costs. These funds are disbursed directly into your mandatory German Blocked Account (Sperrkonto €11,904), alongside allowances for health insurance and flight tickets.",
      },
      {
        question: "Public Bank vs NBFC: Which is better for a Germany education loan?",
        answer:
          "For Germany, specialized NBFCs (HDFC Credila, Avanse, Auxilo) are usually superior because they readily sanction collateral-free loans for living expenses and wire funds directly to Expatrio or Coracle within 48 hours. Public sector banks (like SBI) offer lower rates (8.15%–9.15%) but frequently hesitate to process living-cost-only loans without tangible property collateral.",
      },
      {
        question: "How does loan disbursement work for German Sperrkonto (Expatrio / Coracle / Fintiba)?",
        answer:
          "Upon formal loan sanction, the lender creates an outward forex remittance under the RBI Liberalised Remittance Scheme (LRS). Funds are wired directly to your designated German IBAN with Expatrio, Coracle, or Fintiba, which automatically issues the '06 Blocked Amount Confirmation' required for your German student visa interview.",
      },
      {
        question: "Is an APS Certificate required before applying for a Germany education loan?",
        answer:
          "No. You do not need the APS Certificate to initiate or obtain a conditional in-principle loan sanction letter from Udaan's partner lenders. However, you will need your APS Certificate when filing your formal German visa application at the VFS Global center.",
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
  {
    id: "malta",
    country: "Malta",
    flag: "🇲🇹",
    tagline: "Low-Cost European Education, 100% English Instruction & Fast Schengen Visa Approvals",
    popularCourses: ["MBBS / Medicine (Queen Mary Barts)", "Information Technology & AI", "Global MBA & Leadership", "Hospitality & Tourism Management", "iGaming & Cyber Security"],
    avgTuition: "₹5.5L - ₹11L / year (€6,000 - €12,000/year)",
    avgLivingCost: "₹7L - ₹9L / year (€700 - €900/month)",
    typicalLoanAmount: "₹12 Lakhs - ₹30 Lakhs",
    visaFundRequirements:
      "Proof of financial subsistence of minimum €48/day (approx. €17,500/year or €750-€800/month) for maintenance, plus receipt of first-year tuition fee payment and comprehensive Schengen medical insurance.",
    embassyFinancialOverview:
      "Malta is an English-speaking European Union and Schengen Area member. The Central Visa Unit (Identità Malta) and VFS Global require Indian applicants to demonstrate financial independence through verifiable liquid bank funds or an unconditional bank education loan sanction letter from an RBI-recognized financial institution covering tuition and living expenses.",
    loanHighlights: [
      "100% cost-of-study financing covering tuition fees, living costs, and Schengen health insurance",
      "Collateral-free loans up to ₹35 Lakhs from specialized education NBFCs",
      "Direct remittance to Maltese universities and tuition deposit accounts",
      "Degrees awarded under the European Qualifications Framework (EQF) with 9-month post-study work rights",
      "Pre-visa sanction letters accepted for VFS Malta National (D-type) visa filing",
    ],
    workPermitYears: "9 Months (Post-Study Third-Country National Job Search Visa) + EU Blue Card Pathway",
    topLenders: [
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹60 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Fast-track pre-visa sanction letters formatted to Identità Malta visa standards.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Full living allowance and tuition deposit coverage with zero margin money.",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹30 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 4 Days",
        keyAdvantage: "Flexible doorstep documentation and rapid turnaround for European admits.",
      },
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.15%",
        maxUnsecured: "₹20 Lakhs",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Lowest floating interest rates for premier programs like QMUL Barts Malta MBBS.",
      },
    ],
    faqs: [
      {
        question: "Can I get an education loan to study in Malta?",
        answer:
          "Yes. Leading Indian scheduled banks and education NBFCs actively fund study programs in Malta, providing collateral-free loans up to ₹35 Lakhs and property-backed loans up to ₹1.5 Crore for Master's, MBA, MBBS, and bachelor's degrees.",
      },
      {
        question: "Does the Malta Central Visa Unit accept education loan sanction letters?",
        answer:
          "Yes. The Central Visa Unit (Identità Malta) and VFS Global accept official, unconditional education loan sanction letters issued by RBI-recognized banks and NBFCs as legitimate proof of tuition payment capability and living maintenance.",
      },
      {
        question: "How much loan amount is typically needed for Malta?",
        answer:
          "Because Malta has very affordable European tuition fees (€6,000–€12,000/year), a loan of ₹12 Lakhs to ₹20 Lakhs is typically sufficient to cover 100% of university tuition, living expenses, Schengen health insurance, and flight tickets.",
      },
      {
        question: "Is collateral required for Malta student visa loans?",
        answer:
          "No. For loans up to ₹35 Lakhs, specialized NBFCs (HDFC Credila, Avanse, Auxilo) approve collateral-free loans based on the student's academic background and co-applicant financial profile.",
      },
    ],
  },
  {
    id: "cyprus",
    country: "Cyprus",
    flag: "🇨🇾",
    tagline: "Affordable European Higher Education, Top English Programs & Simple Financial Proof",
    popularCourses: ["Medicine (MBBS/MD)", "Computer Science & Blockchain", "Hotel & Tourism Management", "Business Administration (MBA)", "Civil & Electrical Engineering"],
    avgTuition: "₹3.5L - ₹8.5L / year (€4,000 - €9,500/year)",
    avgLivingCost: "₹5L - ₹7L / year (€500 - €700/month)",
    typicalLoanAmount: "₹10 Lakhs - ₹25 Lakhs",
    visaFundRequirements:
      "Proof of maintenance funds (€7,000 - €10,000), receipt of first-year tuition payment, original bank repatriation guarantee of €850, Police Clearance Certificate (PCC), and certified medical fitness test.",
    embassyFinancialOverview:
      "Cyprus is a prominent European Union member state offering globally accredited English-taught degrees. The Civil Registry and Migration Department of Cyprus mandates that international students submit an official education loan sanction letter or verifiable bank statement demonstrating access to tuition fees and living expenses, alongside statutory police and medical clearances.",
    loanHighlights: [
      "Low borrowing amounts (₹10L - ₹20L) leading to minimal monthly post-graduation EMI burden",
      "Direct remittance to Cypriot universities (University of Nicosia, EUC, CIU) for tuition and initial deposits",
      "Collateral-free financing available up to ₹35 Lakhs through specialized NBFCs",
      "Financing covers tuition, living costs, €850 migration repatriation guarantee, and flights",
      "Quick 3 to 5 day sanction process aligned with Cyprus immigration deadlines",
    ],
    workPermitYears: "Up to 60 Days Post-Study Transition + Employment Permit Pathway",
    topLenders: [
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Specialized underwriting for Cyprus medical, engineering, and MBA programs with 0% margin money.",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹30 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 4 Days",
        keyAdvantage: "Quick digital document verification and high approval rates for Mediterranean universities.",
      },
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹60 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Pre-visa sanction letters compliant with Cyprus Migration Department requirements.",
      },
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.15%",
        maxUnsecured: "₹20 Lakhs",
        maxSecured: "₹1.5 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Subsidized floating interest rate if tangible property collateral is pledged.",
      },
    ],
    faqs: [
      {
        question: "Can I get an education loan for MBBS or Medicine in Cyprus?",
        answer:
          "Yes. Indian lenders actively finance 5-year and 6-year medical degrees (MD/MBBS) at premier institutions like the University of Nicosia (UNIC) and European University Cyprus (EUC). Loans can cover both annual tuition fees and living expenses.",
      },
      {
        question: "What financial proof is required for a Cyprus student visa?",
        answer:
          "The Cyprus Civil Registry and Migration Department requires proof of first-year tuition payment, access to €7,000–€10,000 for living expenses, and an original bank guarantee of €850 for repatriation. An official education loan sanction letter satisfies the financial proof requirement.",
      },
      {
        question: "Are collateral-free loans available for Cyprus universities?",
        answer:
          "Yes. Education NBFCs (Avanse, Auxilo, HDFC Credila) offer collateral-free loans up to ₹25 Lakhs to ₹35 Lakhs based on the student's academic credentials and co-applicant income.",
      },
      {
        question: "How is the loan disbursed for Cyprus tuition fees and living costs?",
        answer:
          "Tuition fees are wired directly by the lender via SWIFT to the university's official bank account in Cyprus. Living allowances and the repatriation guarantee are disbursed into the student's forex card or bank account upon visa grant.",
      },
    ],
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    tagline: "Finance Global Branch Campuses & Executive Degrees in Dubai Knowledge Park & Academic City",
    popularCourses: [
      "MBA & Global Executive Management",
      "MSc Artificial Intelligence & Robotics",
      "MSc Data Science & Cyber Security",
      "B.E. / B.Tech Computer Science",
      "International Hospitality & Tourism",
      "Logistics & Supply Chain Management",
    ],
    avgTuition: "₹11L - ₹18L / year (AED 50,000 - AED 80,000/year)",
    avgLivingCost: "₹8L - ₹13L / year (AED 3,500 - AED 5,500/month)",
    typicalLoanAmount: "₹15 Lakhs - ₹45 Lakhs",
    visaFundRequirements:
      "Official student residence visa sponsored directly by the university (GDRFA Dubai/ICP UAE). Requires first semester or annual tuition fee receipt, entry permit fee, and health insurance proof.",
    embassyFinancialOverview:
      "Higher education institutions situated within specialized free zones such as Dubai International Academic City (DIAC) and Dubai Knowledge Park (DKP)—including Heriot-Watt University Dubai, Middlesex University Dubai, BITS Pilani Dubai, and University of Wollongong in Dubai—act as licensed institutional visa sponsors under General Directorate of Residency and Foreigners Affairs (GDRFA) guidelines. Indian lenders recognize these branch campuses, disbursing funds directly in AED or USD via SWIFT telegraphic transfers to satisfy admission and visa clearances.",
    loanHighlights: [
      "Collateral-free unsecured loans up to ₹45 Lakhs for accredited UAE branch campuses",
      "Pre-visa sanction letters accepted for unconditional university admission and entry permit sponsorship",
      "Direct university tuition remittance in UAE Dirhams (AED) or USD with 0% margin money options",
      "Moratorium period: Full course duration + 6 to 12 months grace period",
      "Comprehensive coverage including tuition, campus accommodation, student visa fees, and medical insurance",
    ],
    workPermitYears: "Part-Time Student Internships Permitted + 1-2 Year Green Visa / 10-Year Golden Visa for Top Graduates",
    topLenders: [
      {
        name: "HDFC Credila",
        category: "NBFC / Fintech",
        indicativeRate: "10.25% - 12.25%",
        maxUnsecured: "₹45 Lakhs",
        maxSecured: "₹75 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "Fast-track unsecured approvals with direct telegraphic AED remittance to UAE universities.",
      },
      {
        name: "State Bank of India (SBI)",
        category: "Public Bank",
        indicativeRate: "8.15% - 9.15%",
        maxUnsecured: "₹20 Lakhs",
        maxSecured: "₹1.50 Crore",
        processingDays: "10 - 15 Days",
        keyAdvantage: "Concessional scholar rates under SBI Global Ed-Vantage against property collateral.",
      },
      {
        name: "Avanse Financial Services",
        category: "NBFC / Fintech",
        indicativeRate: "10.50% - 12.50%",
        maxUnsecured: "₹40 Lakhs",
        maxSecured: "₹65 Lakhs",
        processingDays: "3 - 5 Days",
        keyAdvantage: "100% cost of study financing covering living expenses and campus housing.",
      },
      {
        name: "Auxilo Finserve",
        category: "NBFC / Fintech",
        indicativeRate: "10.75% - 12.75%",
        maxUnsecured: "₹35 Lakhs",
        maxSecured: "₹50 Lakhs",
        processingDays: "3 - 4 Days",
        keyAdvantage: "Flexible underwriting tailored for 1-year UK and European Master's programs delivered in Dubai.",
      },
    ],
    faqs: [
      {
        question: "Can I get an Indian education loan to study in Dubai and the UAE?",
        answer:
          "Yes. Indian public sector banks (such as SBI and Bank of Baroda) and premier NBFCs (including HDFC Credila, Avanse, and Auxilo) actively finance degrees at accredited global branch campuses and universities licensed by KHDA/CAA in Dubai and across the UAE.",
      },
      {
        question: "Does the UAE student visa require financial proof or a bank loan sanction letter?",
        answer:
          "UAE student residence visas are sponsored directly by the admitting university under GDRFA/ICP regulations. The university requires proof of tuition payment or an official education loan sanction letter before issuing the student entry permit and lodging the visa sponsorship application.",
      },
      {
        question: "Can I get a collateral-free education loan for UAE universities?",
        answer:
          "Yes. For recognized branch campuses (such as Heriot-Watt Dubai, Middlesex Dubai, BITS Pilani Dubai, and UOWD), specialized education NBFCs offer unsecured collateral-free loans up to ₹40 Lakhs to ₹45 Lakhs based on academic merit and co-applicant income.",
      },
      {
        question: "How are education loan funds disbursed for UAE universities?",
        answer:
          "Tuition fees are wired directly by the lender in UAE Dirhams (AED) or US Dollars (USD) via SWIFT telegraphic transfer to the university's official bank account. Living and hostel expenses are disbursed into the student's international forex card or local UAE bank account.",
      },
    ],
  },
];

export function getDestinationById(id: string): Destination | undefined {
  const norm = id.toLowerCase().trim();
  return destinationsList.find((d) => d.id === norm);
}
