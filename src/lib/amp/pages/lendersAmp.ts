import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { lendersList } from "@/data/lenders";
import { lendersFaqs } from "@/data/faqs";

export function generateLendersAmpPage(): string {
  const publicBanks = lendersList.filter((l) => l.category === "Public Sector Bank");
  const privateBanks = lendersList.filter((l) => l.category === "Private Bank");
  const nbfcs = lendersList.filter((l) => l.category === "NBFC / Global Lender");

  const renderLenderCards = (lenders: typeof lendersList) =>
    lenders
      .map(
        (lender) => `
    <div class="amp-lender-card">
      <div class="amp-lender-head">
        <div>
          <div class="amp-lender-name">${lender.name}</div>
          <span class="amp-category-badge">${lender.category}</span>
        </div>
      </div>
      <div class="amp-stats-row">
        <div class="amp-stat-item">
          <span class="amp-stat-label">Rate</span>
          <span class="amp-stat-val" style="color: var(--brand);">${lender.interestRate}</span>
        </div>
        <div class="amp-stat-item">
          <span class="amp-stat-label">Non-Collateral</span>
          <span class="amp-stat-val">${lender.maxUnsecured}</span>
        </div>
        <div class="amp-stat-item">
          <span class="amp-stat-label">Secured Max</span>
          <span class="amp-stat-val">${lender.maxSecured}</span>
        </div>
      </div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 4px;">
        ⏱️ Turnaround: <strong>${lender.processingTime}</strong> | Margin Money: <strong>${lender.marginMoney}</strong>
      </div>
      <div style="font-size: 0.8rem; color: var(--ink-secondary); margin-top: 6px;">
        ✨ <strong>Advantage:</strong> ${lender.highlights.join(" • ")}
      </div>
    </div>
  `
      )
      .join("");

  const bodyContent = `
${renderAmpHeader("/amp/lenders")}

<section class="amp-hero">
  <span class="amp-badge">🏛️ Complete Banking Directory</span>
  <h1>Compare 30+ Study Abroad Loan Lenders</h1>
  <p class="amp-hero-lead">
    Side-by-side comparison of interest rates, collateral limits, and approval speeds across India's top lending institutions.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🏛️ 12 Public Sector Banks</span>
    <span class="amp-pill">🏢 10 Private Banks</span>
    <span class="amp-pill">⚡ 10 NBFCs & Fintechs</span>
  </div>
</section>

<main class="amp-container">

  <!-- PUBLIC SECTOR BANKS -->
  <div class="amp-section-header">
    <span class="amp-section-subtitle">Category 1</span>
    <h2 class="amp-section-title">Public Sector Banks (Lowest Rates from 7.75%)</h2>
    <p class="amp-section-desc">
      Best for students possessing property or fixed deposit collateral seeking the lowest interest rates and government subsidies.
    </p>
  </div>
  ${renderLenderCards(publicBanks)}

  <!-- NBFCs & FINTECHS -->
  <div class="amp-section-header" style="margin-top: 36px;">
    <span class="amp-section-subtitle">Category 2</span>
    <h2 class="amp-section-title">Specialized NBFCs (High Collateral-Free Limits)</h2>
    <p class="amp-section-desc">
      Fast 3 to 5-day approvals, 0% margin money, and unsecured loans up to ₹75 Lakhs.
    </p>
  </div>
  ${renderLenderCards(nbfcs)}

  <!-- PRIVATE BANKS -->
  <div class="amp-section-header" style="margin-top: 36px;">
    <span class="amp-section-subtitle">Category 3</span>
    <h2 class="amp-section-title">Private Commercial Banks (Balanced Speed & Terms)</h2>
    <p class="amp-section-desc">
      Competitive rates, modern digital onboarding, and pre-visa sanction letters for high-ranking universities.
    </p>
  </div>
  ${renderLenderCards(privateBanks)}

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Lenders Directory Form",
    defaultLeadType: "AMP Multi-Lender Quote Request",
    headline: "Receive Multi-Lender Loan Comparison",
    subheadline: "We negotiate across 30+ lenders to get you the lowest rate and fastest sanction.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(lendersFaqs)}

</main>

${renderAmpStickyBar("Lenders Directory AMP")}
${renderAmpFooter("/lenders")}
`;

  return renderAmpHtmlDocument({
    title: "Compare 30+ Study Abroad Education Loan Lenders | Udaan Edu Loans",
    description:
      "Compare interest rates, collateral requirements, and processing times across 30+ Indian public banks, private banks, and education NBFCs.",
    canonicalPath: "/lenders",
    ampPath: "/amp/lenders",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
