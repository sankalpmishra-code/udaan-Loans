/**
 * Comprehensive FAQs categorized by page for SEO, GEO & AEO (Answer Engine Optimization)
 * Designed for LLM / Answer Engine citation and Google FAQPage Schema.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFaqs: FAQItem[] = [
  {
    question: "What is an overseas education loan facilitator, and how does Udaan Loans help?",
    answer:
      "Udaan Loans is an education loan facilitation platform that partners with 30+ RBI-licensed public sector banks, private banks, and NBFCs. We do not lend money directly; instead, our loan experts analyze your academic profile and financial background, match you with the best lenders offering the lowest interest rates (starting from 7.5%), assist with document preparation, and accelerate sanction and overseas disbursal without charging students any upfront consultation fee."
  },
  {
    question: "Can I get an education loan for study abroad without collateral?",
    answer:
      "Yes, Indian students can secure collateral-free (unsecured) education loans up to ₹75 Lakhs for premier global universities in the US, UK, Canada, Germany, and Australia. Eligibility depends on your admission offer, undergraduate GPA, test scores (GRE/GMAT/IELTS), and your co-applicant's monthly disposable income and CIBIL score."
  },
  {
    question: "What is the moratorium period in an overseas education loan?",
    answer:
      "A moratorium period is a repayment holiday extending throughout the course duration plus an additional 6 to 12 months after graduation or 6 months after securing employment (whichever is earlier). During this period, students are not required to pay full equated monthly installments (EMIs). Depending on the lender, simple interest or partial interest may accrue or be serviced monthly."
  },
  {
    question: "Can I apply for an abroad education loan before receiving a confirmed university admit?",
    answer:
      "Yes. You can obtain a pre-visa or pre-admission loan sanction letter based on your academic profile, GRE/IELTS test scores, and university shortlists. This provisional sanction letter serves as proof of liquid financial funds when applying to top universities and scheduling visa interviews."
  },
  {
    question: "Are education loan interest payments eligible for tax deductions in India?",
    answer:
      "Yes, under Section 80E of the Indian Income Tax Act, you or your co-applicant can claim a 100% tax deduction on the entire interest amount paid on an education loan for up to 8 consecutive financial years with no upper cap. Loans must be sanctioned by recognized Indian commercial banks or designated financial institutions."
  }
];

export const calculatorFaqs: FAQItem[] = [
  {
    question: "How is education loan EMI calculated for study abroad?",
    answer:
      "Study abroad education loan EMI is calculated using the formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1], where P is the adjusted principal (original sanction plus simple interest accumulated during the course moratorium), r is the monthly interest rate, and n is the repayment period in months. Udaan's calculator factors in course duration and grace periods to reflect your actual post-graduation monthly liability."
  },
  {
    question: "Does interest compound during the study moratorium period?",
    answer:
      "For most Indian public sector banks (like State Bank of India and Bank of Baroda), simple interest is charged during the moratorium period. If unpaid, this simple interest is capitalized (added to the principal) only when regular EMI repayment commences. Private banks and NBFCs may offer optional partial simple interest payments during study to reduce post-study EMI burden."
  },
  {
    question: "Can prepaying my study abroad loan reduce total interest?",
    answer:
      "Yes. Most Indian banks and NBFCs charge zero prepayment penalties on floating-rate education loans under RBI guidelines. Prepaying lump sums during your initial working years significantly lowers your principal balance and reduces cumulative interest outflow."
  },
  {
    question: "What is the typical repayment tenure for overseas student loans?",
    answer:
      "Repayment tenures typically range from 5 to 15 years after the completion of the course moratorium. Choosing a 10 to 15-year tenure minimizes monthly EMI pressure during early career stages while preserving the freedom to prepay without penalties."
  }
];

export const loansFaqs: FAQItem[] = [
  {
    question: "What is the difference between a secured and an unsecured education loan?",
    answer:
      "A secured education loan requires tangible collateral such as residential property, commercial real estate, fixed deposits (FD), or government bonds, offering lower interest rates (7.5% - 9.5%) and loan limits up to ₹1.5 Crore. An unsecured (collateral-free) loan requires no physical asset, is sanctioned based on student merit and co-applicant income, has limits up to ₹75 Lakhs, and carries interest rates between 10.25% and 13.5%."
  },
  {
    question: "What expenses are covered under an overseas education loan?",
    answer:
      "A comprehensive abroad education loan covers 100% of university tuition fees, campus accommodation or off-campus rent, mandatory international student health insurance, airfare, visa application fees, laptop and study equipment allowances, and monthly living expenses."
  },
  {
    question: "What is margin money in an education loan?",
    answer:
      "Margin money is the portion of total educational expenses that the student or family must contribute from their own pocket. For example, if total costs are ₹50 Lakhs and the lender has a 10% margin, the bank funds ₹45 Lakhs and you fund ₹5 Lakhs. Many private lenders and NBFCs offer 0% margin money, financing 100% of all expenses."
  },
  {
    question: "Can I get an education loan for stem master's, MBA, or undergraduate courses?",
    answer:
      "Yes. Indian lenders actively fund STEM master's programs (MS in CS, Data Science, AI), MBA degrees, specialized post-graduate diplomas, healthcare courses (MBBS/MD), and 4-year undergraduate bachelor's degrees across accredited global institutions."
  }
];

export const destinationsFaqs: FAQItem[] = [
  {
    question: "How much education loan can I get for studying in the USA?",
    answer:
      "For US universities, students can receive up to ₹1.5 Crore with collateral (from public banks like SBI) or up to ₹75 Lakhs without collateral (from NBFCs like HDFC Credila, Avanse, and InCred). Sanction letters meet the strict financial proof criteria required for US F-1 visa interviews and Form I-20 issuance."
  },
  {
    question: "Does an education loan cover the German Blocked Account (Sperrkonto)?",
    answer:
      "Yes. Most partner banks and NBFCs allow direct disbursement of the mandatory living expenses amount (approximately €11,904 per year as per German visa rules) straight into a certified German blocked account provider (such as Coracle, Expatrio, or Fintiba)."
  },
  {
    question: "How does an education loan help with the UK 28-day financial fund rule?",
    answer:
      "For a UK Student Visa, applicants must show proof of tuition fees plus 9 months of living costs held for 28 consecutive days. However, an education loan sanction letter from an RBI-regulated bank exempts students from the 28-day cash holding requirement under UK Visas and Immigration (UKVI) guidelines."
  },
  {
    question: "Can an education loan cover Canada's GIC (Guaranteed Investment Certificate)?",
    answer:
      "Yes. Lenders can transfer funds directly to approved Canadian financial institutions (such as CIBC, Scotiabank, or ICICI Bank Canada) to purchase the mandatory GIC certificate required for the Canadian study permit application."
  }
];

export const lendersFaqs: FAQItem[] = [
  {
    question: "Which bank is best for an education loan for study abroad in India?",
    answer:
      "Public banks (State Bank of India, Bank of Baroda, Canara Bank) are best for low interest rates (7.5% - 9.5%) when you have property collateral. Private banks (Axis Bank, ICICI Bank, HDFC Bank) and NBFCs (HDFC Credila, Avanse, Auxilo, InCred) are best for quick 3 to 5-day approvals and collateral-free loans up to ₹75 Lakhs."
  },
  {
    question: "What are the current interest rates offered by top study abroad lenders in 2026?",
    answer:
      "Public sector bank rates typically start at 7.50% to 9.25% (floating). Private banks offer secured loans at 8.75% to 10.5% and unsecured loans at 10.5% to 12.5%. NBFCs offer unsecured loans between 10.75% and 13.5% depending on GRE score, academic pedigree, and co-applicant income profile."
  },
  {
    question: "Do public banks like SBI require in-person branch visits?",
    answer:
      "While public banks traditionally required multiple branch visits, applying through Udaan Loans streamlines the entire process digitally. Our dedicated bank relationship managers assist with doorstep document pickup and fast-track processing through specialized retail asset branches (RACPC/SMECCC)."
  },
  {
    question: "Can I compare multiple bank offers without hurting my CIBIL credit score?",
    answer:
      "Yes. When you check your eligibility with Udaan Loans, we perform a soft profile assessment that has zero impact on your CIBIL score. We only submit formal loan files to lenders you specifically choose to proceed with."
  }
];

export const eligibilityFaqs: FAQItem[] = [
  {
    question: "Who can be a co-applicant for an overseas education loan?",
    answer:
      "Primary co-applicants can be parents (father, mother), spouse, or siblings. If immediate family members have insufficient taxable income, some NBFCs and private lenders also allow secondary co-borrowers such as paternal/maternal uncles, aunts, or first cousins with verified income and clean CIBIL records."
  },
  {
    question: "What minimum CIBIL score is required for an abroad education loan?",
    answer:
      "A CIBIL score of 685 or above for the co-applicant is generally required by most lenders, while scores of 750+ unlock the lowest interest rates and highest loan amounts. Students with no prior credit history (CIBIL -1 or 0) are readily eligible based on co-applicant strength."
  },
  {
    question: "What documents are required to apply for an education loan?",
    answer:
      "Essential documents include: 1) Student: Aadhaar, PAN card, passport, 10th/12th/degree transcripts, GRE/IELTS scorecards, and university admit letter. 2) Co-applicant: PAN, Aadhaar, salary slips (last 3 months) or Form 16/ITR (last 2 years), and 6 months bank statements. 3) Property papers (only for secured loans)."
  },
  {
    question: "Can students with backlogs or career gaps get an education loan?",
    answer:
      "Yes. Private banks and NBFCs evaluate the overall profile. As long as you have cleared your backlogs, obtained a valid university offer letter, and meet the test score requirements, gaps or past backlogs can be successfully justified with a Statement of Purpose (SOP)."
  }
];

export const processFaqs: FAQItem[] = [
  {
    question: "How long does it take to get an abroad education loan sanctioned?",
    answer:
      "Unsecured education loans from NBFCs and private banks can be sanctioned in 3 to 7 working days once all documents are uploaded. Secured public bank loans (SBI, Bank of Baroda) typically take 10 to 18 working days due to legal search and property valuation procedures."
  },
  {
    question: "How is the loan amount disbursed to the overseas university?",
    answer:
      "The lender transfers tuition fees directly via outward SWIFT / wire remittance in foreign currency (USD, EUR, GBP, CAD, AUD) to the university's designated bank account. Living expenses are loaded onto an international forex student card or wired directly into the student's overseas bank account upon arrival."
  },
  {
    question: "What happens if my student visa gets rejected after loan sanction?",
    answer:
      "If a visa is rejected, undisbursed loan amounts are immediately cancelled with no penalty. Any processing fee refund depends on the lender's policy, and our team helps you coordinate with the bank and university to return any advanced deposits."
  }
];

export const applyFaqs: FAQItem[] = [
  {
    question: "Does Udaan Loans charge students any processing or consultation fees?",
    answer:
      "No. Udaan Loans provides 100% free consultation, profile assessment, bank comparison, and document assistance to students. We are compensated directly by institutional lending partners upon successful loan disbursement."
  },
  {
    question: "How soon will an Udaan education loan advisor contact me after I apply?",
    answer:
      "A dedicated overseas education loan specialist will contact you via phone or WhatsApp within 2 to 4 business hours to evaluate your profile, review your admit letter, and share customized loan options."
  },
  {
    question: "Can I apply from anywhere in India?",
    answer:
      "Yes. Udaan Loans operates a completely digital, pan-India platform serving students from all states, tier-1 metros, tier-2 cities, and towns. Document collection and digital verifications are handled remotely."
  }
];

export const aboutFaqs: FAQItem[] = [
  {
    question: "Is Udaan Loans a licensed bank or NBFC?",
    answer:
      "No. Udaan Loans is a technology-driven loan facilitation and advisory platform, not a direct banking institution. We partner with Reserve Bank of India (RBI) registered scheduled commercial banks and non-banking financial companies (NBFCs) who underwrite, sanction, and disburse all loans."
  },
  {
    question: "How does Udaan Loans protect student data privacy?",
    answer:
      "We adhere to strict data security standards with 256-bit SSL encryption. Your personal, academic, and financial documents are shared only with the specific lenders you authorize after evaluating preliminary loan quotes."
  }
];

export const taxFaqs: FAQItem[] = [
  {
    question: "Is Section 80E tax deduction available under the New Tax Regime?",
    answer:
      "No. Under the default New Tax Regime (Section 115BAC of the Income Tax Act), deductions under Chapter VI-A—including Section 80E for education loan interest—are disallowed. To claim Section 80E deductions, the taxpayer must actively opt for the Old Tax Regime when filing their annual Income Tax Return (ITR)."
  },
  {
    question: "Is there a maximum cap on the amount of interest deductible under Section 80E?",
    answer:
      "Unlike Section 80C which has a ₹1.5 Lakh limit, Section 80E has NO upper monetary limit. You can deduct 100% of the entire interest amount paid during the financial year from your gross total income, whether it is ₹1 Lakh, ₹5 Lakhs, or ₹10 Lakhs."
  },
  {
    question: "For how many years can I claim Section 80E deduction?",
    answer:
      "Section 80E deduction is available for a maximum period of 8 consecutive assessment years, starting from the assessment year in which you first start repaying the interest, or until the interest is paid off in full, whichever is earlier. After 8 years, no further interest deduction can be claimed under this section."
  },
  {
    question: "Can parents claim the Section 80E tax benefit if the loan is taken for a child's study abroad?",
    answer:
      "Yes. The individual who takes the loan and pays the interest out of their taxable income can claim the deduction. If a parent (father or mother) is the primary borrower or co-borrower and pays the EMIs/interest, they can claim the full deduction against their salary or business income."
  },
  {
    question: "Do loans from foreign banks or fintechs qualify for Section 80E?",
    answer:
      "To qualify for Section 80E, the education loan must be sanctioned by an Indian banking company governed by the Banking Regulation Act, 1949, or any other financial institution notified by the Central Government of India, or an approved charitable institution. Loans taken from unregulated foreign lenders, employers, friends, or family members do NOT qualify."
  },
  {
    question: "Can principal repayment of an education loan be claimed under Section 80C?",
    answer:
      "No. Section 80C allows deductions for home loan principal repayment, PPF, ELSS, and tuition fees for full-time education in Indian schools/universities, but it does NOT cover education loan principal repayments. Section 80E exclusively covers the interest component."
  }
];

