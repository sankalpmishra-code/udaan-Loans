import React from "react";

export default function CibilImpactDisclosure({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <section className={`cibil-disclosure-section ${className}`} style={{ padding: "40px 0", ...style }}>
      <div className="wrap">
        <div
          className="card"
          style={{
            borderLeft: "5px solid var(--accent, #f59e0b)",
            background: "var(--surface)",
            padding: "32px 28px",
            boxShadow: "var(--shadow-md)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.15)",
                color: "var(--accent-hover, #d97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                flexShrink: 0,
              }}
            >
              🛡️
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                <span className="badge" style={{ backgroundColor: "#fef3c7", color: "#92400e", border: "none" }}>
                  Consumer Credit Disclosure
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  Mandatory Fair Lending Transparency
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", margin: "0 0 10px", color: "var(--ink)" }}>
                How Credit Inquiries &amp; CIBIL Scores Work Across the Udaan Journey
              </h2>
              <p style={{ margin: "0 0 20px", color: "var(--ink-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                We believe students and family co-applicants deserve 100% upfront clarity. We never present zero credit impact as an unqualified guarantee for the entire financing cycle. Here is the exact, stage-by-stage breakdown of how credit records are handled:
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "18px",
                }}
              >
                {/* Stage 1 */}
                <div
                  style={{
                    background: "var(--soft)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>🟢</span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
                      Stage 1: Profile Discovery &amp; Bank Matching
                    </strong>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--success)", marginBottom: "6px" }}>
                    ZERO Bureau Impact (No Credit Pull)
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "var(--muted)", margin: 0, lineHeight: "1.6" }}>
                    When you explore loan options on Udaan, test the EMI calculator, or run our 60-second Bank Matcher, we evaluate your <strong>self-declared</strong> academic qualifications, target university ranking, and co-applicant income. <strong>No credit report enquiry (neither soft nor hard) is registered with TransUnion CIBIL, Experian, Equifax, or CRIF High Mark.</strong> Your credit score remains completely untouched.
                  </p>
                </div>

                {/* Stage 2 */}
                <div
                  style={{
                    background: "var(--soft)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>🟡</span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
                      Stage 2: Formal Sanction Application
                    </strong>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-hover)", marginBottom: "6px" }}>
                    Statutory Hard Enquiry (Only by Selected Bank)
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "var(--muted)", margin: 0, lineHeight: "1.6" }}>
                    A formal credit enquiry occurs <strong>only after you select a specific lender</strong> (e.g. SBI, Bank of Baroda, or HDFC Credila) and grant <strong>explicit digital or written consent</strong> (via e-KYC and formal loan application authorization). At this appraisal stage, that individual bank pulls your statutory bureau report to conduct underwriting as mandated by RBI lending directives.
                  </p>
                </div>

                {/* Stage 3 */}
                <div
                  style={{
                    background: "var(--soft)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>🛡️</span>
                    <strong style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
                      Stage 3: Multiple Hard-Pull Safeguard
                    </strong>
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--brand)", marginBottom: "6px" }}>
                    Single File Routing Protection
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "var(--muted)", margin: 0, lineHeight: "1.6" }}>
                    Students walking directly into 4 or 5 different bank branches often trigger multiple consecutive hard inquiries within days, leading to credit score drops. Udaan prevents this: <strong>we pre-underwrite eligibility first and submit your formal loan dossier only to the mutually agreed lender(s)</strong>, shielding your co-applicant&apos;s CIBIL profile from duplicate hits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
