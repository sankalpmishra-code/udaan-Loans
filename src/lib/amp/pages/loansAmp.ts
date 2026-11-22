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

export function generateLoansAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/loans")}

<section class="amp-hero">
  <span class="amp-badge">📚 Financing Spectrum</span>
  <h1>Study Abroad Education Loan Options</h1>
  <p class="amp-hero-lead">
    Whether you own property in India or need an unsecured loan based purely on your academic potential, we match you with the right lender.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🏛️ Secured: Rates from 7.75%</span>
    <span class="amp-pill">⚡ Unsecured: Up to ₹75 Lakhs</span>
    <span class="amp-pill">✈️ 100% Cost Covered</span>
  </div>
</section>

<main class="amp-container">

  <!-- SECURED LOAN CARD -->
  <div class="amp-card" style="border-top: 4px solid var(--brand);">
    <div style="font-size: 1.8rem; margin-bottom: 6px;">🏛️</div>
    <h2 class="amp-card-title" style="font-size: 1.25rem;">Secured Education Loans (Property / FD Backed)</h2>
    <p style="font-size: 0.88rem; color: var(--muted); margin-bottom: 12px;">
      Backed by tangible collateral: residential flat/house, commercial property, non-agricultural plot, fixed deposit, or government securities.
    </p>

    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Interest Rate</span>
        <span class="amp-stat-val" style="color: var(--brand);">7.75% - 9.50%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Maximum Limit</span>
        <span class="amp-stat-val">Up to ₹1.5 Crore</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Repayment</span>
        <span class="amp-stat-val">Up to 15 Years</span>
      </div>
    </div>

    <div style="font-size: 0.86rem; line-height: 1.7; color: var(--ink-secondary); margin-top: 10px;">
      ✅ <strong>Lowest Interest Rates:</strong> Saves up to ₹15 Lakhs in interest compared to unsecured loans.<br>
      ✅ <strong>Primary Lenders:</strong> SBI (Global Ed-vantage), Bank of Baroda, Union Bank, PNB, Canara Bank.<br>
      ✅ <strong>Pre-Visa Sanction:</strong> Accepted globally for US F-1 (I-20), UK Tier 4/Student Route, and German blocked account.
    </div>
  </div>

  <!-- COLLATERAL-FREE LOAN CARD -->
  <div class="amp-card" style="border-top: 4px solid var(--accent);">
    <div style="font-size: 1.8rem; margin-bottom: 6px;">⚡</div>
    <h2 class="amp-card-title" style="font-size: 1.25rem;">Collateral-Free Loans (No Property / FD Required)</h2>
    <p style="font-size: 0.88rem; color: var(--muted); margin-bottom: 12px;">
      Approved based on academic track record, entrance test scores (GRE/GMAT/IELTS), university ranking, and co-applicant income.
    </p>

    <div class="amp-stats-row">
      <div class="amp-stat-item">
        <span class="amp-stat-label">Interest Rate</span>
        <span class="amp-stat-val" style="color: var(--accent-dark);">10.25% - 12.50%</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Maximum Limit</span>
        <span class="amp-stat-val">Up to ₹75 Lakhs</span>
      </div>
      <div class="amp-stat-item">
        <span class="amp-stat-label">Sanction Speed</span>
        <span class="amp-stat-val">3 - 5 Days</span>
      </div>
    </div>

    <div style="font-size: 0.86rem; line-height: 1.7; color: var(--ink-secondary); margin-top: 10px;">
      ✅ <strong>Zero Asset Risk:</strong> Zero hypothecation of family home, plot, or savings.<br>
      ✅ <strong>Primary Lenders:</strong> HDFC Credila, Avanse, Auxilo, InCred, ICICI Bank, Axis Bank, Prodigy Finance.<br>
      ✅ <strong>0% Margin Money:</strong> 100% coverage of university fees and living costs.<br>
      <div style="margin-top: 8px;">
        <a href="/amp/loans/without-collateral" style="color: var(--accent-dark); font-weight: 700; text-decoration: underline;">
          Explore Complete Collateral-Free Loans Guide →
        </a>
      </div>
    </div>
  </div>

  <!-- EXPENSES COVERED CHECKLIST -->
  <div class="amp-card">
    <div class="amp-card-title">🎒 What Expenses Are Covered by Abroad Education Loans?</div>
    <p style="font-size: 0.86rem; color: var(--muted); margin-bottom: 12px;">
      Study abroad loans cover 100% of your total estimated cost of attendance:
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.84rem; font-weight: 600;">
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">🎓 100% Tuition Fees</div>
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">🏠 Living & Hostel Rent</div>
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">✈️ Economy Airfare Tickets</div>
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">🩺 Mandatory Health Cover</div>
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">💻 Laptop & Study Kit</div>
      <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 6px;">🛂 Visa & SEVIS Fees</div>
    </div>
  </div>

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Loans Page Form",
    defaultLeadType: "AMP Loan Comparison Request",
    headline: "Compare Loan Options for Your Target Course",
    subheadline: "Let our senior loan advisor match you with the lowest rate lender matching your collateral profile.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(loansFaqs)}

</main>

${renderAmpStickyBar("Loan Options AMP")}
${renderAmpFooter("/loans")}
`;

  return renderAmpHtmlDocument({
    title: "Study Abroad Education Loan Options (2026) | Secured vs Unsecured | Udaan",
    description:
      "Compare secured and collateral-free education loans for study abroad. Interest rates from 7.75%, loan amounts up to ₹1.5 Cr, and 100% cost coverage.",
    canonicalPath: "/loans",
    ampPath: "/amp/loans",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
