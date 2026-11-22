import { siteConfig } from "@/data/siteConfig";

export interface NavItem {
  title: string;
  href: string;
  canonicalHref: string;
}

export const AMP_NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/amp", canonicalHref: "/" },
  { title: "EMI Calculator", href: "/amp/calculator", canonicalHref: "/calculator" },
  { title: "Loan Options", href: "/amp/loans", canonicalHref: "/loans" },
  { title: "Collateral-Free Loans", href: "/amp/loans/without-collateral", canonicalHref: "/loans/without-collateral" },
  { title: "Compare 30+ Lenders", href: "/amp/lenders", canonicalHref: "/lenders" },
  { title: "Study Destinations", href: "/amp/destinations", canonicalHref: "/destinations" },
  { title: "Eligibility & Documents", href: "/amp/eligibility", canonicalHref: "/eligibility" },
  { title: "5-Step Process", href: "/amp/process", canonicalHref: "/process" },
  { title: "Apply Online", href: "/amp/apply", canonicalHref: "/apply" },
];

export function renderAmpHeader(currentPath: string = "/amp"): string {
  const primaryPhone = siteConfig.phoneNumbers[0].replace(/\s+/g, "");

  return `
<header class="amp-header">
  <a href="/amp" class="amp-logo" aria-label="Udaan Edu Loans AMP Home">
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#06333c" />
      <path d="M16 7L26 12L16 17L6 12Z" fill="#F59E0B" />
      <path d="M9 14V21C9 21 12 24 16 24C20 24 23 21 23 21V14" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
      <path d="M26 12V18" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <span>Udaan Edu Loans</span>
  </a>

  <div class="amp-header-actions">
    <a href="tel:${primaryPhone}" class="amp-call-btn" aria-label="Call Udaan Edu Loans Helpline">
      📞 Call
    </a>
    <button on="tap:sidebar.toggle" class="amp-menu-toggle" aria-label="Open Mobile Menu">
      ☰
    </button>
  </div>
</header>

${renderAmpSidebar(currentPath)}
`;
}

export function renderAmpSidebar(currentPath: string = "/amp"): string {
  const primaryPhone = siteConfig.phoneNumbers[0].replace(/\s+/g, "");
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi Udaan Edu Loans Team, I am looking for study abroad education loan guidance."
  )}`;

  const navLinks = AMP_NAV_ITEMS.map((item) => {
    const isActive = currentPath === item.href;
    return `
      <li class="amp-nav-item">
        <a href="${item.href}" class="amp-nav-link ${isActive ? "active" : ""}">
          ${item.title}
        </a>
      </li>
    `;
  }).join("");

  return `
<amp-sidebar id="sidebar" layout="nodisplay" side="right" class="amp-sidebar-menu">
  <div class="amp-sidebar-head">
    <div class="amp-sidebar-title">Menu</div>
    <button on="tap:sidebar.close" class="amp-close-btn" aria-label="Close menu">&times;</button>
  </div>

  <ul class="amp-nav-list">
    ${navLinks}
  </ul>

  <div class="amp-sidebar-card">
    <h4>Talk to Loan Specialist</h4>
    <p>100% Free Consultation for Indian students aiming for USA, UK, Canada, Germany & 40+ countries.</p>
    <a href="${waUrl}" class="amp-btn-whatsapp-full" target="_blank" rel="noopener noreferrer">
      💬 WhatsApp Advisor
    </a>
    <div style="margin-top: 10px; text-align: center;">
      <a href="tel:${primaryPhone}" style="color: var(--brand); font-weight: 700; font-size: 0.88rem;">
        📞 ${siteConfig.phoneNumbers[0]}
      </a>
    </div>
  </div>
</amp-sidebar>
`;
}

export function renderAmpStickyBar(sourceName: string = "AMP Page"): string {
  const primaryPhone = siteConfig.phoneNumbers[0].replace(/\s+/g, "");
  const waText = encodeURIComponent(`Hi Udaan Edu Loans! I need guidance on study abroad education loans. (Source: ${sourceName})`);
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${waText}`;

  return `
<div class="amp-sticky-bar">
  <a href="tel:${primaryPhone}" class="amp-sticky-action amp-sticky-call" aria-label="Call Loan Officer">
    📞 Call Now
  </a>
  <a href="${waUrl}" class="amp-sticky-action amp-sticky-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    💬 WhatsApp
  </a>
  <a href="/amp/apply" class="amp-sticky-action amp-sticky-apply" aria-label="Apply for Loan Assessment">
    ⚡ Apply Free
  </a>
</div>
`;
}

export function renderAmpFooter(canonicalPath: string = "/"): string {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  return `
<footer class="amp-footer">
  <div class="amp-footer-logo">
    Udaan <span>Edu</span> Loans
  </div>
  <p>
    India's leading study abroad education loan advisory portal. Partnering with 30+ RBI-recognized Public Banks,
    Private Banks, and NBFCs for pre-visa sanctions up to ₹1.5 Crore.
  </p>

  <ul class="amp-footer-links">
    <li><a href="/amp">Home</a></li>
    <li><a href="/amp/calculator">EMI Calc</a></li>
    <li><a href="/amp/loans">Loans</a></li>
    <li><a href="/amp/loans/without-collateral">No-Collateral</a></li>
    <li><a href="/amp/lenders">Lenders</a></li>
    <li><a href="/amp/destinations">Destinations</a></li>
    <li><a href="/amp/eligibility">Eligibility</a></li>
    <li><a href="/amp/process">5-Step Process</a></li>
    <li><a href="/amp/apply">Apply</a></li>
  </ul>

  <div style="margin: 18px 0; padding: 12px; background: rgba(255,255,255,0.06); border-radius: 8px;">
    <p style="color: #cbd5e1; margin-bottom: 6px;">
      📱 <strong>Accelerated Mobile Page (AMP)</strong> active for lightning-fast mobile loading.
    </p>
    <a href="${canonicalUrl}" style="color: #f59e0b; font-weight: 700; text-decoration: underline;">
      Switch to Full Standard Website →
    </a>
  </div>

  <div class="amp-footer-disclaimer">
    <p>
      © ${new Date().getFullYear()} ${siteConfig.legalName}. All rights reserved.
      Udaan Edu Loans is an ethical student financial facilitation platform. We do not directly lend or disburse funds;
      we connect students with RBI-regulated banks and NBFCs. Services are 100% free of charge for students.
    </p>
  </div>
</footer>
`;
}

export interface AmpFormProps {
  sourceName?: string;
  defaultLeadType?: string;
  headline?: string;
  subheadline?: string;
}

export function renderAmpLeadForm({
  sourceName = "AMP Lead Form",
  defaultLeadType = "AMP Fast Mobile Application",
  headline = "Check Your Education Loan Eligibility",
  subheadline = "Get customized quotes from 30+ banks & NBFCs in 2 hours. Zero fee, zero CIBIL impact.",
}: AmpFormProps = {}): string {
  return `
<div class="amp-form-card" id="apply-form-section">
  <div style="margin-bottom: 16px;">
    <span class="amp-section-subtitle">⚡ Quick 60-Second Check</span>
    <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--brand);">${headline}</h3>
    <p style="font-size: 0.86rem; color: var(--muted); margin-top: 4px;">${subheadline}</p>
  </div>

  <form method="post" action-xhr="/api/leads" target="_top">
    <input type="hidden" name="sourceName" value="${sourceName}">
    <input type="hidden" name="leadType" value="${defaultLeadType}">
    <input type="hidden" name="landingPage" value="/amp">

    <div class="amp-form-group">
      <label class="amp-label" for="amp-student-name">Student Full Name *</label>
      <input type="text" id="amp-student-name" name="name" class="amp-input" placeholder="e.g. Rahul Sharma" required>
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-student-phone">Mobile / WhatsApp Number *</label>
      <input type="tel" id="amp-student-phone" name="phone" class="amp-input" placeholder="e.g. 9876543210" pattern="[0-9]{10}" required>
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-student-email">Email Address</label>
      <input type="email" id="amp-student-email" name="email" class="amp-input" placeholder="e.g. rahul@example.com">
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-country">Target Study Destination *</label>
      <select id="amp-country" name="country" class="amp-select" required>
        <option value="" disabled selected>Select Target Country</option>
        <option value="USA">United States (USA)</option>
        <option value="UK">United Kingdom (UK)</option>
        <option value="Canada">Canada</option>
        <option value="Germany">Germany</option>
        <option value="Australia">Australia</option>
        <option value="Ireland">Ireland</option>
        <option value="France">France</option>
        <option value="Other">Other Country</option>
      </select>
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-course">Intended Degree / Course</label>
      <select id="amp-course" name="course" class="amp-select">
        <option value="" disabled selected>Select Degree Level</option>
        <option value="MS / STEM Masters">MS / STEM Masters</option>
        <option value="MBA / Management">MBA / Business Masters</option>
        <option value="Undergraduate">Undergraduate Degree (Bachelors)</option>
        <option value="Healthcare / MBBS">Healthcare / MBBS / Nursing</option>
        <option value="Other">Other Course</option>
      </select>
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-amount">Target Loan Amount</label>
      <select id="amp-amount" name="amount" class="amp-select">
        <option value="₹20 - 40 Lakhs">₹20 - 40 Lakhs</option>
        <option value="₹40 - 60 Lakhs" selected>₹40 - 60 Lakhs</option>
        <option value="₹60 - 80 Lakhs">₹60 - 80 Lakhs</option>
        <option value="₹80 Lakhs - 1.2 Crore">₹80 Lakhs - 1.2 Crore</option>
        <option value="₹1.2 - 1.5 Crore">₹1.2 - 1.5 Crore</option>
      </select>
    </div>

    <div class="amp-form-group">
      <label class="amp-label" for="amp-loanType">Collateral Availability</label>
      <select id="amp-loanType" name="loanType" class="amp-select">
        <option value="Need Collateral-Free Loan">No Property (Need Collateral-Free Loan)</option>
        <option value="Have Property / FD Collateral">Have Property / FD Collateral (Lower Rate)</option>
        <option value="Need Expert Advice">Not Sure, Need Guidance</option>
      </select>
    </div>

    <button type="submit" class="amp-form-submit">
      🚀 Get Free Loan Sanction Assessment
    </button>

    <div submitting>
      <template type="amp-mustache">
        <div class="alert-submitting">
          ⏳ Submitting your application securely...
        </div>
      </template>
    </div>

    <div submit-success>
      <template type="amp-mustache">
        <div class="alert-success">
          ✅ <strong>Application Received!</strong><br>
          Our Senior Overseas Loan Advisor will review your profile and reach out within 15 minutes.
        </div>
      </template>
    </div>

    <div submit-error>
      <template type="amp-mustache">
        <div class="alert-error">
          ⚠️ <strong>Submission Note:</strong> If this took longer than expected, tap the WhatsApp button below to speak directly with an advisor now!
        </div>
      </template>
    </div>
  </form>
</div>
`;
}

export function renderAmpFaqAccordion(
  faqs: Array<{ question: string; answer: string }>
): string {
  if (!faqs || faqs.length === 0) return "";

  const sections = faqs
    .map(
      (faq) => `
    <section>
      <h3>${escapeHtml(faq.question)}</h3>
      <div class="amp-faq-answer">
        <p>${faq.answer}</p>
      </div>
    </section>
  `
    )
    .join("");

  return `
<div class="amp-faq-section">
  <div class="amp-section-header">
    <span class="amp-section-subtitle">Got Questions?</span>
    <h2 class="amp-section-title">Frequently Asked Questions</h2>
  </div>
  <amp-accordion expand-single-section>
    ${sections}
  </amp-accordion>
</div>
`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
