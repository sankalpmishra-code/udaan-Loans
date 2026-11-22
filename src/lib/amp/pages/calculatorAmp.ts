import { renderAmpHtmlDocument } from "../ampBoilerplate";
import { AMP_CUSTOM_CSS } from "../ampStyles";
import {
  renderAmpHeader,
  renderAmpStickyBar,
  renderAmpFooter,
  renderAmpLeadForm,
  renderAmpFaqAccordion,
} from "../ampComponents";
import { calculatorFaqs } from "@/data/faqs";

export function generateCalculatorAmpPage(): string {
  const bodyContent = `
${renderAmpHeader("/amp/calculator")}

<section class="amp-hero">
  <span class="amp-badge">🧮 Financial Planning Tool</span>
  <h1>Abroad Education Loan EMI & Moratorium Calculator</h1>
  <p class="amp-hero-lead">
    Unlike personal or home loans, foreign education loans include a <strong>study moratorium period</strong> where principal repayment is deferred.
  </p>
  <div class="amp-hero-pills">
    <span class="amp-pill">📈 Moratorium Simple Interest</span>
    <span class="amp-pill">💰 Section 80E Tax Savings</span>
    <span class="amp-pill">⏱️ 10 to 15 Years Tenures</span>
  </div>
</section>

<main class="amp-container">

  <!-- INSTANT EMI LOOKUP TABLE -->
  <div class="amp-section-header">
    <span class="amp-section-subtitle">Quick Reference Guide</span>
    <h2 class="amp-section-title">Monthly EMI Estimates (10-Year Repayment)</h2>
    <p class="amp-section-desc">
      Projected post-graduation monthly installments factoring in 24-month moratorium simple interest capitalization.
    </p>
  </div>

  <div class="amp-table-wrapper">
    <table class="amp-table">
      <thead>
        <tr>
          <th>Loan Amount</th>
          <th>8.5% (Public Bank)</th>
          <th>9.75% (Private Bank)</th>
          <th>11.25% (Top NBFC)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>₹25 Lakhs</strong></td>
          <td>₹31,010 / mo</td>
          <td>₹32,710 / mo</td>
          <td>₹34,800 / mo</td>
        </tr>
        <tr>
          <td><strong>₹40 Lakhs</strong></td>
          <td>₹49,615 / mo</td>
          <td>₹52,335 / mo</td>
          <td>₹55,680 / mo</td>
        </tr>
        <tr>
          <td><strong>₹50 Lakhs</strong></td>
          <td>₹62,020 / mo</td>
          <td>₹65,420 / mo</td>
          <td>₹69,600 / mo</td>
        </tr>
        <tr>
          <td><strong>₹75 Lakhs</strong></td>
          <td>₹93,030 / mo</td>
          <td>₹98,130 / mo</td>
          <td>₹1,04,400 / mo</td>
        </tr>
        <tr>
          <td><strong>₹1.0 Crore</strong></td>
          <td>₹1,24,040 / mo</td>
          <td>₹1,30,840 / mo</td>
          <td>₹1,39,200 / mo</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- MORATORIUM BREAKDOWN CARD -->
  <div class="amp-card amp-card-highlight">
    <div class="amp-card-title">💡 How the Moratorium Period Works</div>
    <p style="font-size: 0.88rem; color: #78350f; margin-bottom: 8px;">
      <strong>Course Duration (1-2 Years) + Grace Period (6-12 Months):</strong><br>
      You do not pay full EMIs while studying. Lenders charge simple interest on disbursed disbursements.
    </p>
    <p style="font-size: 0.88rem; color: #78350f; margin: 0;">
      <strong>Pro Tip:</strong> Servicing partial simple interest (e.g. ₹3,000 - ₹8,000/month) while studying prevents interest compounding onto principal, saving up to ₹4 Lakhs - ₹7 Lakhs over your total loan tenure!
    </p>
  </div>

  <!-- SECTION 80E BENEFIT -->
  <div class="amp-card">
    <div class="amp-card-title">🏛️ Section 80E Tax Deduction (Zero Limit)</div>
    <p style="font-size: 0.88rem; color: var(--muted); margin-bottom: 8px;">
      Under Section 80E of the Indian Income Tax Act, the <strong>entire interest amount paid</strong> on an education loan for higher education is 100% tax-deductible for up to 8 consecutive assessment years.
    </p>
    <ul style="padding-left: 20px; font-size: 0.86rem; color: var(--ink-secondary); line-height: 1.7;">
      <li>Applicable to both student and parent co-borrowers paying interest.</li>
      <li>No upper monetary ceiling (unlike standard Section 80C ₹1.5L limit).</li>
      <li>Effectively reduces your effective interest rate by 2% to 3.5% depending on your tax bracket!</li>
    </ul>
  </div>

  <!-- LEAD FORM FOR DETAILED AMORTIZATION -->
  ${renderAmpLeadForm({
    sourceName: "AMP EMI Calculator Page Form",
    defaultLeadType: "AMP EMI Schedule Request",
    headline: "Get Exact Bank-Wise Repayment Schedule",
    subheadline: "We calculate precise simple interest accruals for your destination university and repayment horizon.",
  })}

  <!-- FAQS -->
  ${renderAmpFaqAccordion(calculatorFaqs)}

</main>

${renderAmpStickyBar("EMI Calculator AMP")}
${renderAmpFooter("/calculator")}
`;

  return renderAmpHtmlDocument({
    title: "Education Loan EMI Calculator with Moratorium | Udaan Edu Loans",
    description:
      "Calculate study abroad education loan EMI, simple interest during moratorium, and complete repayment schedules for SBI, HDFC Credila, and NBFCs.",
    canonicalPath: "/calculator",
    ampPath: "/amp/calculator",
    customStyles: AMP_CUSTOM_CSS,
    bodyContent,
  });
}
