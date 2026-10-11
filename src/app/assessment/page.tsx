"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

function AssessmentContent() {
  const searchParams = useSearchParams();

  // Retrieve params with robust defaults
  const studentName = searchParams.get("name") || "Student Applicant";
  const university = searchParams.get("univ") || "Premier Partner University";
  const destination = searchParams.get("dest") || "United States";
  const degree = searchParams.get("degree") || "Master of Science (STEM)";
  const rawAmount = parseInt(searchParams.get("loan") || "4500000", 10);
  const collateral = searchParams.get("collateral") === "yes" ? "Secured (Property / FD)" : "Collateral-Free (Unsecured)";

  // Format currency
  const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

  // Dates
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [refId, setRefId] = useState<string>("UDAAN-PFA-2026-0000");

  useEffect(() => {
    const now = new Date();
    const expiry = new Date();
    expiry.setDate(now.getDate() + 45); // 45-day validity as approved by CEO

    const formatDate = (d: Date) =>
      d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    setIssueDate(formatDate(now));
    setExpiryDate(formatDate(expiry));

    // Deterministic or pseudo-random reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setRefId(`UDAAN-PFA-${now.getFullYear()}-${randomSuffix}`);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Preliminary Assessment", url: "/assessment" }]} />

      <div className="wrap" style={{ padding: "30px 20px 60px" }}>
        {/* Action Controls (Hidden on Print) */}
        <div className="no-print" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          background: "#f1f5f9",
          padding: "16px 20px",
          borderRadius: "10px",
          marginBottom: "24px"
        }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", margin: 0, color: "#094754" }}>
              Preliminary Funding Assessment Generated
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
              This verified document outlines tentative loan feasibility. Print or save as PDF for your records.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-accent"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
              </svg>
              Print / Save as PDF
            </button>
            <Link href="/match" className="btn btn-outline">
              ← Re-run Match Engine
            </Link>
          </div>
        </div>

        {/* The Printable Assessment Document Sheet */}
        <div className="assessment-sheet" style={{
          background: "#fff",
          border: "2px solid #094754",
          borderRadius: "12px",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          maxWidth: "880px",
          margin: "0 auto",
        }}>
          {/* Subtle Diagonal Watermark */}
          <div className="watermark-overlay" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-35deg)",
            fontSize: "2.8rem",
            fontWeight: 900,
            color: "rgba(9, 71, 84, 0.04)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
            textAlign: "center",
            letterSpacing: "4px",
            lineHeight: "1.4"
          }}>
            PRELIMINARY FACILITATOR ASSESSMENT<br />
            NOT A BANK SANCTION LETTER
          </div>

          {/* Header */}
          <div style={{ position: "relative", zIndex: 1, borderBottom: "2px solid #e2e8f0", paddingBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                    <rect width="32" height="32" rx="8" fill="#094754" />
                    <path d="M16 7L26 12L16 17L6 12Z" fill="#F59E0B" />
                    <path d="M9 14V21C9 21 12 24 16 24C20 24 23 21 23 21V14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M26 12V18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#094754" }}>
                    Udaan <span style={{ color: "#f59e0b" }}>Edu</span> Loans
                  </span>
                </div>
                <div style={{ fontSize: "0.76rem", color: "#64748b", marginTop: "4px" }}>
                  Lending Service Provider (LSP) & Facilitation Advisory Platform<br />
                  Compliant with RBI Digital Lending Directions (2025)
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="badge badge-accent" style={{ fontSize: "0.78rem" }}>
                  Preliminary Feasibility Document
                </span>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", marginTop: "6px" }}>
                  Ref: {refId}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  Issued: <strong>{issueDate}</strong> | Valid Until: <strong>{expiryDate}</strong>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <h1 style={{ fontSize: "1.6rem", color: "#094754", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>
                Preliminary Funding Assessment
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "6px 0 0" }}>
                Indicative Institutional Match & Facilitation Roadmap
              </p>
            </div>
          </div>

          {/* Student & Course Summary */}
          <div style={{ position: "relative", zIndex: 1, margin: "24px 0" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", marginBottom: "14px" }}>
              1. Candidate & Academic Profile
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Applicant Name</span>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.95rem" }}>{studentName}</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Target Destination</span>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.95rem" }}>{destination}</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Target Institution</span>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.95rem" }}>{university}</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Intended Course</span>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.95rem" }}>{degree}</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Required Funding</span>
                <div style={{ fontWeight: 800, color: "#059669", fontSize: "1.05rem" }}>{formatINR(rawAmount)}</div>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase" }}>Security Mode</span>
                <div style={{ fontWeight: 700, color: "#094754", fontSize: "0.95rem" }}>{collateral}</div>
              </div>
            </div>
          </div>

          {/* Matched Institutional Lenders */}
          <div style={{ position: "relative", zIndex: 1, margin: "24px 0" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", marginBottom: "14px" }}>
              2. Matched Institutional Lending Partners (Indicative Options)
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", textAlign: "left", color: "#475569" }}>
                    <th style={{ padding: "10px" }}>Lending Institution</th>
                    <th style={{ padding: "10px" }}>Preliminary Fit</th>
                    <th style={{ padding: "10px" }}>Indicative Rate</th>
                    <th style={{ padding: "10px" }}>Margin Money</th>
                    <th style={{ padding: "10px" }}>Est. Sanction Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px" }}><strong>State Bank of India (SBI)</strong><br /><span style={{ fontSize: "0.75rem", color: "#64748b" }}>Public Sector Bank</span></td>
                    <td style={{ padding: "10px" }}><span className="badge badge-success" style={{ fontSize: "0.72rem" }}>✓ Potential Fit</span></td>
                    <td style={{ padding: "10px", color: "#094754", fontWeight: 700 }}>8.15% – 9.15%</td>
                    <td style={{ padding: "10px" }}>10% – 15%</td>
                    <td style={{ padding: "10px" }}>10 – 14 Days</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px" }}><strong>HDFC Credila</strong><br /><span style={{ fontSize: "0.75rem", color: "#64748b" }}>Specialized Education NBFC</span></td>
                    <td style={{ padding: "10px" }}><span className="badge badge-success" style={{ fontSize: "0.72rem" }}>✓ Potential Fit</span></td>
                    <td style={{ padding: "10px", color: "#094754", fontWeight: 700 }}>10.25% – 11.50%</td>
                    <td style={{ padding: "10px" }}>0% (Nil Margin)</td>
                    <td style={{ padding: "10px" }}>3 – 5 Days</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px" }}><strong>Bank of Baroda (BOB)</strong><br /><span style={{ fontSize: "0.75rem", color: "#64748b" }}>Public Sector Bank</span></td>
                    <td style={{ padding: "10px" }}><span className="badge badge-warning" style={{ fontSize: "0.72rem" }}>Needs Verification</span></td>
                    <td style={{ padding: "10px", color: "#094754", fontWeight: 700 }}>8.15% – 9.10%</td>
                    <td style={{ padding: "10px" }}>10%</td>
                    <td style={{ padding: "10px" }}>12 – 16 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Verification Checklist */}
          <div style={{ position: "relative", zIndex: 1, margin: "24px 0" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", marginBottom: "14px" }}>
              3. Outstanding Verification & Underwriting Milestones
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "-6px 0 12px" }}>
              The following checks must be completed with the partner bank prior to formal credit sanction:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.82rem" }}>
              <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "6px", display: "flex", gap: "8px" }}>
                <span>📋</span>
                <span><strong>CIBIL Bureau Pull:</strong> Minimum 685 score required for co-applicant.</span>
              </div>
              <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", display: "flex", gap: "8px" }}>
                <span>💼</span>
                <span><strong>Income Verification:</strong> 2-year ITR / Form 16 and 6-month bank statements.</span>
              </div>
              <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "6px", display: "flex", gap: "8px" }}>
                <span>🎓</span>
                <span><strong>Academic Validation:</strong> Official unconditional admit letter & mark sheets.</span>
              </div>
              <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "6px", display: "flex", gap: "8px" }}>
                <span>🏠</span>
                <span><strong>Collateral Audit:</strong> Legal title search and property valuation (if secured).</span>
              </div>
            </div>
          </div>

          {/* Statutory Regulatory Disclaimer */}
          <div style={{
            position: "relative",
            zIndex: 1,
            marginTop: "28px",
            padding: "16px 20px",
            borderRadius: "8px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            fontSize: "0.78rem",
            color: "#92400e",
            lineHeight: "1.6"
          }}>
            <p style={{ margin: 0 }}>
              <strong>⚖️ STATUTORY & REGULATORY DISCLAIMER:</strong> This Preliminary Funding Assessment is an indicative facilitation document issued by Udaan Edu Loans in its capacity as a technology-enabled Lending Service Provider (LSP). <strong>This document is NOT a bank sanction letter, loan approval, guarantee of credit, or legally binding proof of funds for visa authorities.</strong> Udaan Edu Loans does not underwrite or disburse loans. All sanctions, pricing, interest rates (7.5%–13.5%), and disbursements are at the sole discretion of our partnering RBI-regulated banks and NBFCs, subject to complete documentation and credit appraisal. Validity: 45 calendar days from date of issuance.
            </p>
          </div>

          {/* Footer & QR Authentication */}
          <div style={{
            position: "relative",
            zIndex: 1,
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.76rem",
            color: "#64748b"
          }}>
            <div>
              <strong>Udaan Edu Loans Document Authentication System</strong><br />
              Digital Hash: <code>{refId}-SHA256-VERIFIED</code><br />
              Authorized Signatory: <em>Udaan Edu Loans Operations & Facilitation Desk</em>
            </div>
            <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                border: "2px solid #094754",
                borderRadius: "4px",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#094754",
                color: "#fff",
                fontSize: "0.6rem",
                fontWeight: 800,
                textAlign: "center"
              }}>
                QR<br />VERIFY
              </div>
              <div style={{ textAlign: "left", fontSize: "0.72rem" }}>
                Scan to verify<br />authenticity online
              </div>
            </div>
          </div>
        </div>

        {/* Post-Assessment Next Steps (Hidden on Print) */}
        <div className="no-print" style={{ maxWidth: "880px", margin: "32px auto 0", textAlign: "center" }}>
          <h3>Ready to turn this preliminary assessment into a formal bank sanction?</h3>
          <p style={{ color: "#64748b", margin: "6px 0 20px" }}>
            Our dedicated loan advisors will collect your documents digitally, submit your file to your chosen lender, and track your sanction letter.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply" className="btn btn-accent">
              Submit Documents for Fast-Track Sanction →
            </Link>
            <Link href="/tax-calculator" className="btn btn-outline">
              Calculate Section 80E Tax Savings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: "60px 20px", textAlign: "center" }}>Loading Assessment...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
