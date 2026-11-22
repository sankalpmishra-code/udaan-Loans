import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { homeFaqs } from "@/data/faqs";
import { lendersList } from "@/data/lenders";
import { siteConfig } from "@/data/siteConfig";

export function generateHomeAmpPage(): string {
  const topLenders = lendersList.slice(0, 6);

  const lenderCards = topLenders
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
          <span class="amp-stat-label">Turnaround</span>
          <span class="amp-stat-val">${lender.processingTime}</span>
        </div>
      </div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 6px;">
        ✨ <strong>Key Benefit:</strong> ${lender.highlights[0] || "Fast pre-visa sanction"}
      </div>
    </div>
  `
    )
    .join("");

  const bodyContent = `
${renderAmpHeader("/amp")}

<!-- HERO SECTION -->
<section class="amp-hero">
  <span class="amp-badge">🎓 100% Free Consultation for Students</span>
  <h1>Find the Right Education Loan for Study Abroad</h1>
  <p class="amp-hero-lead">
    Compare 30+ Public Banks, Private Banks, and NBFCs for secured and collateral-free student loans up to ₹1.5 Crore.
  </p>

  <div class="amp-card-highlight amp-card" style="margin-bottom: 20px;">
    <p style="font-weight: 700; color: #92400e; font-size: 0.95rem; margin-bottom: 4px;">
      ⚡ Special Facility: Loans Without Co-Applicant
    </p>
    <p style="font-size: 0.84rem; color: #78350f; margin: 0;">
      Targeting an MS, MBA, or STEM Master's abroad? Qualify based on your future earning capability with zero parent cosigner or Indian collateral.
    </p>
  </div>

  <div class="amp-hero-pills">
    <span class="amp-pill">🛡️ Zero Upfront Fee</span>
    <span class="amp-pill">⚡ 3-7 Days Sanction</span>
    <span class="amp-pill">🌐 Form I-20 & CAS Ready</span>
    <span class="amp-pill">📊 30+ RBI Lenders</span>
  </div>

  <div class="amp-hero-cta-group">
    <a href="#apply-form-section" class="amp-btn amp-btn-primary">
      🚀 Check My Loan Eligibility Free
    </a>
    <a href="tel:${siteConfig.phoneNumbers[0].replace(/\s+/g, "")}" class="amp-btn amp-btn-outline">
      📞 Call Senior Advisor: ${siteConfig.phoneNumbers[0]}
    </a>
  </div>
</section>

<!-- MAIN CONTAINER -->
<main class="amp-container">

  <!-- TRUST STATS -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 18px 0 24px;">
    <div class="amp-card" style="text-align: center; margin: 0; padding: 14px;">
      <div style="font-size: 1.5rem; font-weight: 800; color: var(--brand);">₹1.5 Cr</div>
      <div style="font-size: 0.76rem; color: var(--muted); font-weight: 600;">Max Loan Limit</div>
    </div>
    <div class="amp-card" style="text-align: center; margin: 0; padding: 14px;">
      <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">₹75 Lakhs</div>
      <div style="font-size: 0.76rem; color: var(--muted); font-weight: 600;">Collateral-Free Limit</div>
    </div>
  </div>

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Home Page Top Form",
    defaultLeadType: "AMP Quick Eligibility Check",
    headline: "Fast-Track Loan Sanction Eligibility",
    subheadline: "Enter your admission & study details to receive pre-screened loan offers within 2 hours.",
  })}

  <!-- TOP LENDERS SECTION -->
  <div class="amp-section-header" style="margin-top: 28px;">
    <span class="amp-section-subtitle">Multi-Lender Marketplace</span>
    <h2 class="amp-section-title">Top Study Abroad Lenders Compared</h2>
    <p class="amp-section-desc">
      We work directly with chief zonal heads across 30+ public sector banks, private banks, and education-specialized NBFCs.
    </p>
  </div>

  ${lenderCards}

  <div style="text-align: center; margin: 18px 0;">
    <a href="/amp/lenders" class="amp-btn amp-btn-brand" style="width: 100%;">
      View All 30+ Lenders & Rates →
    </a>
  </div>

  <!-- LOAN OPTIONS COMPARISON -->
  <div class="amp-section-header" style="margin-top: 36px;">
    <span class="amp-section-subtitle">Financing Types</span>
    <h2 class="amp-section-title">Secured vs Collateral-Free Loans</h2>
  </div>

  <div class="amp-table-wrapper">
    <table class="amp-table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Secured Loan</th>
          <th>Collateral-Free Loan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Interest Rate</strong></td>
          <td style="color: var(--brand); font-weight: 700;">7.75% - 9.50%</td>
          <td style="color: var(--accent-dark); font-weight: 700;">10.25% - 12.50%</td>
        </tr>
        <tr>
          <td><strong>Max Loan Amount</strong></td>
          <td>Up to ₹1.5 Crore</td>
          <td>Up to ₹75 Lakhs</td>
        </tr>
        <tr>
          <td><strong>Acceptable Security</strong></td>
          <td>House, Flat, Land, FD</td>
          <td>Zero Property / FD</td>
        </tr>
        <tr>
          <td><strong>Sanction Speed</strong></td>
          <td>10 - 18 Days</td>
          <td>3 - 5 Working Days</td>
        </tr>
        <tr>
          <td><strong>Margin Money</strong></td>
          <td>10% - 15%</td>
          <td>0% (Full Cost Covered)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 5-STEP DISBURSAL PROCESS -->
  <div class="amp-section-header" style="margin-top: 36px;">
    <span class="amp-section-subtitle">Roadmap to Disbursal</span>
    <h2 class="amp-section-title">How Udaan Works (5 Simple Steps)</h2>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">1</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Free Profile & University Review</div>
      <p class="amp-step-desc">Share target university and course details. We match you with lenders having highest sanction likelihood.</p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">2</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Doorstep / Digital Document Pickup</div>
      <p class="amp-step-desc">Zero branch visits required. Our dedicated operations team verifies student KYC and co-applicant financials digitally.</p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">3</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Multi-Lender Credit Underwriting</div>
      <p class="amp-step-desc">We file your application across 2-3 shortlisted lenders simultaneously to negotiate best rate and lowest processing fees.</p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">4</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Pre-Visa Sanction Letter in 3-7 Days</div>
      <p class="amp-step-desc">Receive official sanction letter recognized for US Form I-20, UK CAS, German Blocked Account, and Canadian GIC.</p>
    </div>
  </div>

  <div class="amp-step-item">
    <div class="amp-step-num">5</div>
    <div class="amp-step-content">
      <div class="amp-step-title">Direct University Wire Disbursal</div>
      <p class="amp-step-desc">Disbursement via international SWIFT/wire directly into your foreign university tuition account and personal living forex card.</p>
    </div>
  </div>

  <!-- TOP STUDY DESTINATIONS -->
  <div class="amp-section-header" style="margin-top: 36px;">
    <span class="amp-section-subtitle">Study Hubs</span>
    <h2 class="amp-section-title">Popular Study Abroad Destinations</h2>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px;">
    <a href="/amp/destinations" class="amp-card" style="margin: 0; padding: 14px;">
      <div style="font-size: 1.4rem;">🇺🇸 United States</div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 4px;">Up to ₹1.5 Cr (I-20 ready)</div>
    </a>
    <a href="/amp/destinations" class="amp-card" style="margin: 0; padding: 14px;">
      <div style="font-size: 1.4rem;">🇬🇧 United Kingdom</div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 4px;">CAS & Maintenance funds</div>
    </a>
    <a href="/amp/destinations" class="amp-card" style="margin: 0; padding: 14px;">
      <div style="font-size: 1.4rem;">🇩🇪 Germany</div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 4px;">Blocked Account loans</div>
    </a>
    <a href="/amp/destinations" class="amp-card" style="margin: 0; padding: 14px;">
      <div style="font-size: 1.4rem;">🇨🇦 Canada</div>
      <div style="font-size: 0.8rem; color: var(--muted); margin-top: 4px;">Tuition & C$23,448 living covered</div>
    </a>
  </div>

  <!-- FAQS SECTION -->
  ${renderAmpFaqAccordion(homeFaqs)}

</main>

${renderAmpStickyBar("Home Page AMP")}
${renderAmpFooter("/")}
`;

  return renderAmpHtmlDocument({
    title: "Study Abroad Education Loans (2026) | Compare 30+ Banks | Udaan Edu Loans",
    description:
      "Compare secured and collateral-free study abroad loans up to ₹1.5 Crore. Fast pre-visa sanctions from SBI, HDFC Credila, Avanse, Auxilo & 30+ RBI-recognized lenders.",
    canonicalPath: "/",
    ampPath: "/amp",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
