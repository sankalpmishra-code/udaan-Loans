import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { destinationsList } from "@/data/destinations";

export function generateDestinationsAmpPage(): string {
  const destinationCards = destinationsList
    .map(
      (dest) => `
    <div class="amp-dest-card">
      <div class="amp-dest-head">
        <span class="amp-dest-flag">${dest.flag}</span>
        <div>
          <div class="amp-dest-name">${dest.country}</div>
          <div style="font-size: 0.76rem; color: var(--muted);">${dest.tagline}</div>
        </div>
      </div>

      <div class="amp-stats-row">
        <div class="amp-stat-item">
          <span class="amp-stat-label">Avg Tuition</span>
          <span class="amp-stat-val">${dest.avgTuition}</span>
        </div>
        <div class="amp-stat-item">
          <span class="amp-stat-label">Avg Living Cost</span>
          <span class="amp-stat-val">${dest.avgLivingCost}</span>
        </div>
        <div class="amp-stat-item">
          <span class="amp-stat-label">Typical Loan</span>
          <span class="amp-stat-val" style="color: var(--brand);">${dest.typicalLoanAmount}</span>
        </div>
      </div>

      <div style="font-size: 0.84rem; line-height: 1.6; color: var(--ink-secondary); margin-top: 8px;">
        🏛️ <strong>Embassy Financial Requirement:</strong> ${dest.visaFundRequirements}
      </div>

      <div style="font-size: 0.82rem; color: var(--muted); margin-top: 8px;">
        🎓 <strong>Top Programs:</strong> ${dest.popularCourses.slice(0, 4).join(", ")}<br>
        🛂 <strong>Post-Study Work Permit:</strong> ${dest.workPermitYears}
      </div>
    </div>
  `
    )
    .join("");

  const destinationFaqs = [
    {
      question: "Do US universities accept Indian bank sanction letters for Form I-20?",
      answer:
        "Yes, 100% of US universities accept verifiable bank sanction letters from RBI-recognized public banks, private banks, and NBFCs to issue Form I-20. Udaan provides official unconditional pre-visa sanction letters that meet USCIS and university financial requirements.",
    },
    {
      question: "Can an education loan fund a German Blocked Account (Sperrkonto)?",
      answer:
        "Yes! Indian lenders like HDFC Credila, Avanse, SBI, and ICICI disburse the mandatory living expenses (currently €11,904/year) directly into recognized German blocked accounts such as Expatrio, Coracle, or Fintiba before your visa appointment.",
    },
    {
      question: "How does an education loan letter satisfy the UKVI Student Route financial requirement?",
      answer:
        "Under UKVI Appendix Finance (FIN 8.1 - FIN 8.3), an official education loan letter from an RBI-regulated bank qualifies as valid financial proof without requiring funds to be maintained in a personal bank account for 28 days prior. The loan letter must be in the student's name (or joint with parent/guardian) and unconditional upon visa grant.",
    },
    {
      question: "Does an education loan cover Canadian living expense requirements and GIC?",
      answer:
        "Yes, Canadian student loan sanctions cover both university tuition fees and the published IRCC living expense requirement (CAD $23,448 outside Quebec), including optional direct wire funding into an authorized Canadian GIC if chosen.",
    },
  ];

  const bodyContent = `
${renderAmpHeader("/amp/destinations")}

<section class="amp-hero">
  <span class="amp-badge">🌐 Global Study Hubs</span>
  <h1>Study Abroad Education Loan Guides (40+ Countries)</h1>
  <p class="amp-hero-lead">
    Navigate country-specific visa fund rules, living expense requirements, and international bank remittance procedures.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">🇺🇸 US Form I-20</span>
    <span class="amp-pill">🇩🇪 German Blocked Account</span>
    <span class="amp-pill">🇬🇧 UK Appendix Finance</span>
    <span class="amp-pill">🇨🇦 Canada Living (C$23,448)</span>
  </div>
</section>

<main class="amp-container">

  <div class="amp-section-header">
    <span class="amp-section-subtitle">Financial Blueprints</span>
    <h2 class="amp-section-title">Country-Wise Loan Guidelines & Visa Rules</h2>
    <p class="amp-section-desc">
      Each country's immigration department enforces specific financial documentation standards. Review the requirements below.
    </p>
  </div>

  ${destinationCards}

  <!-- LEAD FORM -->
  ${renderAmpLeadForm({
    sourceName: "AMP Destinations Page Form",
    defaultLeadType: "AMP Country Specific Loan Check",
    headline: "Get Pre-Visa Sanction for Your Destination",
    subheadline: "Ensure your financial sanction letter meets embassy guidelines with zero delays.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(destinationFaqs)}

</main>

${renderAmpStickyBar("Destinations Guide AMP")}
${renderAmpFooter("/destinations")}
`;

  return renderAmpHtmlDocument({
    title: "Study Abroad Country Loan Guides (2026) | Visa & Cost Limits | Udaan",
    description:
      "Country-wise study abroad loan limits, living expense rules, and visa financial requirements for USA, UK, Canada, Germany, Australia, and Ireland.",
    canonicalPath: "/destinations",
    ampPath: "/amp/destinations",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
