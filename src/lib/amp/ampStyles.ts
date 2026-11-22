/**
 * Unified AMP Custom CSS
 * Strictly compliant with Google AMP specifications:
 * - Single stylesheet under 75KB
 * - Zero '!important' flags
 * - Zero disallowed pseudo-selectors
 * - Mobile-first responsive layout with fast touch targets (>= 48px)
 */

export const AMP_CUSTOM_CSS = `
:root {
  --brand: #094754;
  --brand-dark: #052a32;
  --brand-light: #0d6e82;
  --accent: #d97706;
  --accent-light: #fef3c7;
  --accent-dark: #b45309;
  --ink: #0f172a;
  --ink-secondary: #334155;
  --muted: #64748b;
  --border: #e2e8f0;
  --bg: #f8fafc;
  --card: #ffffff;
  --success: #15803d;
  --success-bg: #dcfce7;
  --danger: #b91c1c;
  --danger-bg: #fee2e2;
  --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--bg);
  color: var(--ink);
  line-height: 1.55;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 70px;
}

a {
  color: var(--brand);
  text-decoration: none;
}

/* ================= HEADER ================= */
.amp-header {
  position: sticky;
  top: 0;
  z-index: 900;
  background-color: #094754;
  color: #ffffff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.amp-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.amp-logo span {
  color: #f59e0b;
}

.amp-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amp-call-btn {
  background-color: #f59e0b;
  color: #0f172a;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.amp-menu-toggle {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ================= SIDEBAR ================= */
.amp-sidebar-menu {
  width: 290px;
  background: #ffffff;
  padding: 24px 20px;
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
}

.amp-sidebar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.amp-sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--brand);
}

.amp-close-btn {
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
}

.amp-nav-list {
  list-style: none;
  margin-bottom: 24px;
}

.amp-nav-item {
  margin-bottom: 6px;
}

.amp-nav-link {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink-secondary);
}

.amp-nav-link.active,
.amp-nav-link:hover {
  background-color: #f0fdfa;
  color: var(--brand);
}

.amp-sidebar-card {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

.amp-sidebar-card h4 {
  font-size: 0.88rem;
  margin-bottom: 6px;
  color: var(--brand);
}

.amp-sidebar-card p {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 12px;
}

.amp-btn-whatsapp-full {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #25D366;
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.88rem;
}

/* ================= HERO ================= */
.amp-hero {
  background: linear-gradient(145deg, #094754 0%, #06333c 60%, #042228 100%);
  color: #ffffff;
  padding: 32px 18px 40px;
  text-align: left;
}

.amp-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.45);
  color: #fbbf24;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.amp-hero h1 {
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.amp-hero-lead {
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 20px;
}

.amp-hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.amp-pill {
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
}

.amp-hero-cta-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ================= BUTTONS ================= */
.amp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  cursor: pointer;
  border: none;
  min-height: 48px;
}

.amp-btn-primary {
  background: #f59e0b;
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
}

.amp-btn-brand {
  background: #094754;
  color: #ffffff;
}

.amp-btn-outline {
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.amp-btn-whatsapp {
  background-color: #25D366;
  color: #ffffff;
}

/* ================= CONTAINERS & SECTIONS ================= */
.amp-container {
  padding: 24px 16px;
  max-width: 720px;
  margin: 0 auto;
}

.amp-section-header {
  margin-bottom: 20px;
}

.amp-section-subtitle {
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 4px;
}

.amp-section-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.amp-section-desc {
  font-size: 0.9rem;
  color: var(--muted);
  margin-top: 6px;
}

/* ================= CARDS ================= */
.amp-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.amp-card-highlight {
  border-left: 4px solid var(--accent);
  background: #fffbeb;
}

.amp-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 8px;
}

/* ================= LENDER GRID ================= */
.amp-lender-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.amp-lender-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.amp-lender-name {
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--brand);
}

.amp-category-badge {
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  background: #f1f5f9;
  color: var(--ink-secondary);
}

.amp-stats-row {
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.amp-stat-item {
  text-align: center;
}

.amp-stat-label {
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  display: block;
}

.amp-stat-val {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--ink);
}

/* ================= COMPARISON TABLE ================= */
.amp-table-wrapper {
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #ffffff;
}

.amp-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
  min-width: 480px;
}

.amp-table th {
  background: #f1f5f9;
  color: var(--brand);
  padding: 10px 12px;
  font-weight: 700;
  border-bottom: 2px solid var(--border);
}

.amp-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  color: var(--ink);
}

.amp-table tr:last-child td {
  border-bottom: none;
}

/* ================= STEPS / TIMELINE ================= */
.amp-step-item {
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
  position: relative;
}

.amp-step-num {
  width: 36px;
  height: 36px;
  background: var(--brand);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.amp-step-content {
  flex: 1;
}

.amp-step-title {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 4px;
}

.amp-step-desc {
  font-size: 0.86rem;
  color: var(--muted);
}

/* ================= DESTINATIONS ================= */
.amp-dest-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 14px;
}

.amp-dest-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.amp-dest-flag {
  font-size: 1.7rem;
}

.amp-dest-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--brand);
}

/* ================= ACCORDION (FAQ) ================= */
.amp-faq-section {
  margin: 24px 0;
}

amp-accordion section {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

amp-accordion h3 {
  background: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 14px 16px;
  color: var(--ink);
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

amp-accordion h3:after {
  content: "+";
  font-size: 1.25rem;
  color: var(--brand);
  font-weight: 800;
}

amp-accordion section[expanded] h3:after {
  content: "−";
}

.amp-faq-answer {
  padding: 0 16px 16px;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* ================= AMP LEAD FORM ================= */
.amp-form-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  margin: 24px 0;
}

.amp-form-group {
  margin-bottom: 14px;
}

.amp-label {
  display: block;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}

.amp-input,
.amp-select {
  width: 100%;
  height: 48px;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.92rem;
  color: var(--ink);
  background-color: #f8fafc;
}

.amp-input:focus,
.amp-select:focus {
  outline: none;
  border-color: var(--brand);
  background-color: #ffffff;
}

.amp-form-submit {
  width: 100%;
  height: 50px;
  background: var(--brand);
  color: #ffffff;
  font-weight: 800;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.alert-success {
  background: var(--success-bg);
  border: 1px solid #86efac;
  color: var(--success);
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  margin-top: 14px;
}

.alert-error {
  background: var(--danger-bg);
  border: 1px solid #fca5a5;
  color: var(--danger);
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  margin-top: 14px;
}

.alert-submitting {
  background: #f1f5f9;
  border: 1px solid var(--border);
  color: var(--ink);
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 14px;
  text-align: center;
}

/* ================= STICKY BOTTOM FLOATING BAR ================= */
.amp-sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 6px 12px;
  z-index: 999;
  box-shadow: 0 -3px 12px rgba(0, 0, 0, 0.08);
}

.amp-sticky-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  margin: 0 4px;
  border-radius: 8px;
  font-size: 0.86rem;
  font-weight: 700;
  text-align: center;
}

.amp-sticky-call {
  background: #094754;
  color: #ffffff;
}

.amp-sticky-wa {
  background: #25D366;
  color: #ffffff;
}

.amp-sticky-apply {
  background: #f59e0b;
  color: #0f172a;
}

/* ================= FOOTER ================= */
.amp-footer {
  background: #052a32;
  color: #94a3b8;
  padding: 32px 16px 80px;
  font-size: 0.82rem;
  line-height: 1.6;
}

.amp-footer-logo {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.amp-footer-logo span {
  color: #f59e0b;
}

.amp-footer-links {
  list-style: none;
  margin: 18px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
}

.amp-footer-links a {
  color: #cbd5e1;
  font-weight: 600;
  font-size: 0.85rem;
}

.amp-footer-disclaimer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  margin-top: 16px;
  color: #64748b;
  font-size: 0.74rem;
}

/* ================= DESKTOP RESPONSIVE ENHANCEMENTS ================= */
@media (min-width: 768px) {
  .amp-container {
    max-width: 1040px;
    padding: 36px 24px;
  }
  .amp-hero {
    padding: 48px 32px 56px;
  }
  .amp-hero h1 {
    font-size: 2.2rem;
  }
  .amp-sticky-bar {
    display: none;
  }
}
`;
