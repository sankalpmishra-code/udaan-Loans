import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { applyFaqs } from "@/data/faqs";

export function generateApplyAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/apply")}

<section class="amp-hero">
  <span class="amp-badge">🚀 Instant Application</span>
  <h1>Apply for Abroad Education Loan Assessment</h1>
  <p class="amp-hero-lead">
    100% free student advisory. Complete this 60-second assessment to discover your eligible loan limit across 30+ RBI-recognized lenders.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🛡️ Zero Upfront Fee</span>
    <span class="amp-pill">⚡ Soft Pre-Approval</span>
    <span class="amp-pill">📞 15-Minute Callback</span>
  </div>
</section>

<main class="amp-container">

  <!-- TRUST GUARANTEES -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 16px 0 24px;">
    <div class="amp-card" style="text-align: center; margin: 0; padding: 12px 8px;">
      <div style="font-size: 1.4rem;">🛡️</div>
      <div style="font-size: 0.76rem; font-weight: 700; color: var(--brand); margin-top: 4px;">100% Free</div>
      <div style="font-size: 0.68rem; color: var(--muted);">Zero student fees</div>
    </div>
    <div class="amp-card" style="text-align: center; margin: 0; padding: 12px 8px;">
      <div style="font-size: 1.4rem;">⚡</div>
      <div style="font-size: 0.76rem; font-weight: 700; color: var(--accent); margin-top: 4px;">No CIBIL Hit</div>
      <div style="font-size: 0.68rem; color: var(--muted);">Soft evaluation</div>
    </div>
    <div class="amp-card" style="text-align: center; margin: 0; padding: 12px 8px;">
      <div style="font-size: 1.4rem;">⏱️</div>
      <div style="font-size: 0.76rem; font-weight: 700; color: var(--brand); margin-top: 4px;">3-7 Days</div>
      <div style="font-size: 0.68rem; color: var(--muted);">Fast sanction</div>
    </div>
  </div>

  <!-- APPLICATION FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Apply Page Dedicated Form",
    defaultLeadType: "AMP Priority Student Loan Application",
    headline: "Submit Your Profile for Priority Sanction",
    subheadline: "Your assigned Senior Study Abroad Financing Specialist will call you within 15 minutes.",
  })}

  <!-- WHY CHOOSE UDAAN -->
  <div class="amp-card">
    <div class="amp-card-title">🌟 Why Over 5,000+ Indian Students Choose Udaan</div>
    <div style="font-size: 0.86rem; line-height: 1.7; color: var(--ink-secondary);">
      <p style="margin-bottom: 6px;">
        🏛️ <strong>Exclusive Partner Rates:</strong> Because of our pan-India student volume, partner banks waive application processing fees and offer preferential interest rate slabs.
      </p>
      <p style="margin-bottom: 6px;">
        ⚡ <strong>Simultaneous Multi-Filing:</strong> We file your application with 2 to 3 lenders in parallel so you never lose critical admission or visa deadlines.
      </p>
      <p style="margin-bottom: 6px;">
        👨‍💼 <strong>Dedicated Loan Manager:</strong> One single point of contact handles your file from initial document collection until final tuition remittance abroad.
      </p>
    </div>
  </div>

  <!-- FAQS -->
  ${renderAmpFaqAccordion(applyFaqs)}

</main>

${renderAmpStickyBar("Apply Online AMP")}
${renderAmpFooter("/apply")}
`;

  return renderAmpHtmlDocument({
    title: "Apply for Study Abroad Education Loan: Free Profile Assessment | Udaan",
    description:
      "Submit your overseas education loan application with Udaan Edu Loans. 100% free consultation, multi-lender comparison, and fast-track sanction letter in 3-7 days.",
    canonicalPath: "/apply",
    ampPath: "/amp/apply",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
