import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { processFaqs } from "@/data/faqs";

export function generateProcessAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/process")}

<section class="amp-hero">
  <span class="amp-badge">🗺️ Step-by-Step Guide</span>
  <h1>5-Step Abroad Education Loan Roadmap</h1>
  <p class="amp-hero-lead">
    From your first consultation to direct foreign campus wire disbursal. How Udaan secures your pre-visa loan in record time.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">⚡ Step 1: Free Profile Match</span>
    <span class="amp-pill">📑 Step 2: Digital Verification</span>
    <span class="amp-pill">🏛️ Step 3: Sanction Letter</span>
    <span class="amp-pill">✈️ Step 4: Visa Filing</span>
    <span class="amp-pill">🌐 Step 5: Tuition Disbursal</span>
  </div>
</section>

<main class="amp-container">

  <div class="amp-section-header">
    <span class="amp-section-subtitle">Application to Disbursal</span>
    <h2 class="amp-section-title">The Complete 5-Step Financing Journey</h2>
    <p class="amp-section-desc">
      We eliminate multiple bank branch visits, lengthy legal verification bottlenecks, and hidden insurance charges.
    </p>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">1</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Profile Assessment & Lender Matchmaking (Day 1)</div>
      <p class="amp-step-desc">
        We analyze your admit offer, target country, GRE/IELTS scores, and family financial profile. We select 2-3 optimum lenders offering the highest sanction probability and lowest interest rate.
      </p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">2</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Digital Document Collection & Soft Review (Day 1-2)</div>
      <p class="amp-step-desc">
        Upload your academic transcripts, student KYC, and co-applicant financial papers. Our operations desk completes a pre-underwriting audit to ensure zero document rejections at the bank level.
      </p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">3</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Multi-Bank Credit Underwriting (Day 2-5)</div>
      <p class="amp-step-desc">
        Your file is directly processed by authorized chief managers at our partner banks/NBFCs. For collateralized loans, legal search report (LSR) and technical valuation are expedited via empanelled advocates.
      </p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">4</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Pre-Visa Sanction Letter Issuance (Day 3-7)</div>
      <p class="amp-step-desc">
        Receive an official unconditional sanction letter stating sanctioned amounts for tuition and living costs. Use this for US Form I-20, UK CAS issuance, German Blocked Account funding, and consular visa interviews.
      </p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">5</div>
    <div class="amp-step-content">
      <div class="amp-step-title">University Wire Remittance & Forex Disbursal (Pre-Departure)</div>
      <p class="amp-step-desc">
        Once your visa is stamped, loan funds are disbursed directly via international SWIFT/wire transfer into your university's tuition account, and living expenses loaded onto a zero-forex-markup card.
      </p>
    </div>
  </div>

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Process Page Form",
    defaultLeadType: "AMP Process Fast-Track Request",
    headline: "Fast-Track Your Study Abroad Loan Sanction",
    subheadline: "Get started today. A dedicated loan officer will assist you from start to finish.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(processFaqs)}

</main>

${renderAmpStickyBar("Loan Process AMP")}
${renderAmpFooter("/process")}
`;

  return renderAmpHtmlDocument({
    title: "5-Step Study Abroad Education Loan Roadmap | Apply to Disbursal | Udaan",
    description:
      "Step-by-step roadmap from profile assessment to sanction letter in 3-7 days and foreign university wire remittance.",
    canonicalPath: "/process",
    ampPath: "/amp/process",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
