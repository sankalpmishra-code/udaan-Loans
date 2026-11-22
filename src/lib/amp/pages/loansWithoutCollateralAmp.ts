import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { loansFaqs } from "@/data/faqs";

export function generateLoansWithoutCollateralAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/loans/without-collateral")}

<section class="amp-hero">
  <span class="amp-badge">⚡ Unsecured Student Loans</span>
  <h1>Collateral-Free Study Abroad Loans up to ₹75 Lakhs</h1>
  <p class="amp-hero-lead">
    Zero property pledge, zero FD hypothecation. Sanctioned based on your GRE/IELTS scores, academic merit, and future employability.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🛡️ No Asset Risk</span>
    <span class="amp-pill">⚡ 3-5 Working Days Sanction</span>
    <span class="amp-pill">💼 0% Margin Money</span>
  </div>
</section>

<main class="amp-container">

  <!-- UNSECURED LENDERS MATRIX -->
  <div class="amp-section-header">
    <span class="amp-section-subtitle">Lender Comparison</span>
    <h2 class="amp-section-title">Top Collateral-Free Lenders in India</h2>
    <p class="amp-section-desc">
      We negotiate directly with credit managers at major NBFCs and fintech lenders to get you the lowest margin and processing fees.
    </p>
  </div>

  <div class="amp-lender-card">
    <div class="amp-lender-head">
      <div>
        <div class="amp-lender-name">HDFC Credila</div>
        <span class="amp-category-badge">Dedicated Education NBFC</span>
      </div>
    </div>
    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Max Limit</span>
        <span class="amp-stat-val">Up to ₹60 Lakhs</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Indicative Rate</span>
        <span class="amp-stat-val" style="color: var(--brand);">10.25% - 12.50%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Approval</span>
        <span class="amp-stat-val">3 - 5 Days</span>
      </div>
    </div>
    <div style="font-size: 0.82rem; color: var(--muted);">
      ✨ Best for USA & UK STEM Masters with salaried parent co-borrower. Offers 100% tuition and living cover.
    </div>
  </div>

  <div class="amp-lender-card">
    <div class="amp-lender-head">
      <div>
        <div class="amp-lender-name">Avanse Financial Services</div>
        <span class="amp-category-badge">Warburg Pincus Backed NBFC</span>
      </div>
    </div>
    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Max Limit</span>
        <span class="amp-stat-val">Up to ₹75 Lakhs</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Indicative Rate</span>
        <span class="amp-stat-val" style="color: var(--brand);">10.50% - 12.75%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Approval</span>
        <span class="amp-stat-val">3 - 4 Days</span>
      </div>
    </div>
    <div style="font-size: 0.82rem; color: var(--muted);">
      ✨ Highest collateral-free limit in India. Flexible on co-applicant relationships (accepts maternal/paternal uncles).
    </div>
  </div>

  <div class="amp-lender-card">
    <div class="amp-lender-head">
      <div>
        <div class="amp-lender-name">Auxilo Finserve</div>
        <span class="amp-category-badge">Pro-Student NBFC</span>
      </div>
    </div>
    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Max Limit</span>
        <span class="amp-stat-val">Up to ₹65 Lakhs</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Indicative Rate</span>
        <span class="amp-stat-val" style="color: var(--brand);">10.75% - 13.00%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Approval</span>
        <span class="amp-stat-val">4 - 6 Days</span>
      </div>
    </div>
    <div style="font-size: 0.82rem; color: var(--muted);">
      ✨ Pro-student underwriting considering academic merit over parent net worth. Ideal for Germany & Ireland.
    </div>
  </div>

  <div class="amp-lender-card">
    <div class="amp-lender-head">
      <div>
        <div class="amp-lender-name">InCred Finance</div>
        <span class="amp-category-badge">Tech-Driven Lender</span>
      </div>
    </div>
    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Max Limit</span>
        <span class="amp-stat-val">Up to ₹60 Lakhs</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Indicative Rate</span>
        <span class="amp-stat-val" style="color: var(--brand);">10.90% - 13.25%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Approval</span>
        <span class="amp-stat-val">3 - 5 Days</span>
      </div>
    </div>
    <div style="font-size: 0.82rem; color: var(--muted);">
      ✨ Extremely fast digital documentation and transparent loan terms with no hidden insurance bundling.
    </div>
  </div>

  <!-- CRITERIA CARD -->
  <div class="amp-card amp-card-highlight">
    <div class="amp-card-title">📋 Unsecured Loan Eligibility Checklist</div>
    <ul style="padding-left: 18px; font-size: 0.86rem; line-height: 1.7; color: #78350f;">
      <li><strong>Student Academics:</strong> 60%+ in 10th, 12th & Degree. Minimum GRE 300+ or IELTS 6.5+ (if mandated).</li>
      <li><strong>Target Course:</strong> STEM Master's, MBA, Data Science, AI, Biotechnology, or Healthcare.</li>
      <li><strong>Co-Applicant:</strong> Parent, sibling, spouse, or close relative earning min ₹30,000/month with CIBIL score 685+.</li>
      <li><strong>No Asset Papers Needed:</strong> No title deeds, non-encumbrance certificates, or property valuation required!</li>
    </ul>
  </div>

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Without Collateral Page Form",
    defaultLeadType: "AMP Non-Collateral Loan Request",
    headline: "Check My Non-Collateral Loan Eligibility",
    subheadline: "Get approved for up to ₹75 Lakhs without submitting property papers.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(loansFaqs)}

</main>

${renderAmpStickyBar("Collateral-Free Loan AMP")}
${renderAmpFooter("/loans/without-collateral")}
`;

  return renderAmpHtmlDocument({
    title: "Collateral-Free Education Loan for Study Abroad (2026) | Up to ₹75L | Udaan",
    description:
      "Get collateral-free study abroad loans up to ₹75 Lakhs without property or FD. Fast pre-visa sanctions from HDFC Credila, Avanse, Auxilo & InCred.",
    canonicalPath: "/loans/without-collateral",
    ampPath: "/amp/loans/without-collateral",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
