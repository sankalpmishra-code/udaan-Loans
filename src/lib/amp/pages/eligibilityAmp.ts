import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { eligibilityFaqs } from "@/data/faqs";

export function generateEligibilityAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/eligibility")}

<section class="amp-hero">
  <span class="amp-badge">📋 Document Checklist</span>
  <h1>Education Loan Eligibility & Documents Guide</h1>
  <p class="amp-hero-lead">
    A fast 3 to 7-day loan sanction begins with a clean, verified dossier. Review the student, co-applicant, and collateral requirements below.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🆔 Student KYC</span>
    <span class="amp-pill">💼 Co-Applicant Income</span>
    <span class="amp-pill">📑 Collateral Papers</span>
  </div>
</section>

<main class="amp-container">

  <!-- STUDENT CRITERIA -->
  <div class="amp-card">
    <div style="font-size: 1.8rem; margin-bottom: 6px;">👨‍🎓</div>
    <h2 class="amp-card-title">1. Student Eligibility Criteria</h2>
    <ul style="padding-left: 18px; font-size: 0.88rem; line-height: 1.7; color: var(--ink-secondary);">
      <li><strong>Nationality:</strong> Indian citizen with a valid Indian passport.</li>
      <li><strong>Age:</strong> Minimum 18 years at application time (otherwise parent is primary borrower).</li>
      <li><strong>Academic Record:</strong> 55% - 60%+ in 10th, 12th, and Undergraduate degree. Past backlogs acceptable with explanation.</li>
      <li><strong>Standardized Tests:</strong> Valid scores in GRE, GMAT, IELTS, TOEFL, PTE, or Duolingo as required by university.</li>
      <li><strong>Admission Status:</strong> Confirmed admit, conditional offer, or admission application submission.</li>
    </ul>
  </div>

  <!-- CO-APPLICANT CRITERIA -->
  <div class="amp-card">
    <div style="font-size: 1.8rem; margin-bottom: 6px;">💼</div>
    <h2 class="amp-card-title">2. Co-Applicant (Co-Borrower) Criteria</h2>
    <ul style="padding-left: 18px; font-size: 0.88rem; line-height: 1.7; color: var(--ink-secondary);">
      <li><strong>Permissible Relationships:</strong> Father, Mother, Spouse, Brother, Sister. Select NBFCs also accept Paternal/Maternal Uncles.</li>
      <li><strong>Credit Score:</strong> Minimum CIBIL score of 685 (Scores above 750 unlock lowest interest rates).</li>
      <li><strong>Income Requirement:</strong> Salaried (min ₹30,000/mo net) or Self-Employed / Business owner (ITR for 2-3 years).</li>
      <li><strong>Special Facility:</strong> Co-applicant not required for select STEM/MBA Masters at top 100 global universities via international partner programs!</li>
    </ul>
  </div>

  <!-- DOCUMENT CHECKLIST -->
  <div class="amp-card amp-card-highlight">
    <div class="amp-card-title">📂 Complete Document Checklist</div>
    <div style="font-size: 0.86rem; color: #78350f; line-height: 1.7;">
      <p><strong>A. Student Documents:</strong></p>
      <ul style="padding-left: 18px; margin-bottom: 12px;">
        <li>PAN Card, Aadhaar Card, Passport copy</li>
        <li>10th, 12th, and Degree Marksheets + Provisional Degree Certificate</li>
        <li>Admission letter / Offer letter from foreign university</li>
        <li>GRE / GMAT / IELTS / TOEFL / PTE Scorecard</li>
      </ul>

      <p><strong>B. Co-Applicant Documents:</strong></p>
      <ul style="padding-left: 18px; margin-bottom: 12px;">
        <li>PAN Card, Aadhaar Card, Proof of Residence</li>
        <li>Last 3 to 6 months salary slips (if salaried) or Business Registration / GST (if self-employed)</li>
        <li>Last 2 to 3 years Income Tax Returns (ITR) with Form 16 / Computation of Income</li>
        <li>Last 6 months bank statement of salary/primary operating account</li>
      </ul>

      <p><strong>C. Collateral Documents (For Secured Loans Only):</strong></p>
      <ul style="padding-left: 18px;">
        <li>Original Registered Title Deed / Sale Deed</li>
        <li>Approved Building / Layout Plan & OC</li>
        <li>Property Tax Receipts for the latest year</li>
        <li>Chain of title documents for the past 13 to 30 years</li>
      </ul>
    </div>
  </div>

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Eligibility Page Form",
    defaultLeadType: "AMP Document Verification Request",
    headline: "Verify My Eligibility & Documents Free",
    subheadline: "Upload or share documents securely for a free soft pre-qualification without CIBIL impact.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(eligibilityFaqs)}

</main>

${renderAmpStickyBar("Eligibility Guide AMP")}
${renderAmpFooter("/eligibility")}
`;

  return renderAmpHtmlDocument({
    title: "Overseas Education Loan Eligibility & Document Checklist | Udaan Edu Loans",
    description:
      "Complete checklist of documents and eligibility requirements for study abroad education loans in India. Includes student KYC, co-applicant income papers, and collateral rules.",
    canonicalPath: "/eligibility",
    ampPath: "/amp/eligibility",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
