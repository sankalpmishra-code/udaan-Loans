"use client";

import React, { useState } from "react";
import Link from "next/link";
import { evaluateStudentLenderMatches, MatchResultItem, StudentProfileInput } from "@/utils/matchingEngine";

export default function BankMatcherPage() {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<StudentProfileInput>({
    country: "United States",
    degreeLevel: "Master's",
    loanAmount: 4000000,
    hasCollateral: false,
    collateralType: "None",
    coApplicantIncome: 55000,
    coApplicantRelation: "Parents",
    hasAdmit: true,
  });

  const [matches, setMatches] = useState<MatchResultItem[] | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const results = evaluateStudentLenderMatches(profile);
    setMatches(results);
    setStep(5); // Results step
  };

  const potentialCount = matches?.filter((m) => m.status === "potential_fit").length || 0;
  const verificationCount = matches?.filter((m) => m.status === "needs_verification").length || 0;
  const unlikelyCount = matches?.filter((m) => m.status === "unlikely_fit").length || 0;

  return (
    <section className="hero" style={{ padding: "48px 0 80px" }}>
      <div className="wrap">
        <div className="section-head text-center" style={{ maxWidth: "800px", margin: "0 auto 36px" }}>
          <span className="badge">Transparent Rules Engine</span>
          <h1>Two-Stage Bank & Lender Matcher</h1>
          <p className="lead">
            No made-up probability scores. Our engine checks your academic and financial profile against
            <strong> verified, published underwriting rules</strong> from 10+ public banks, private banks, and NBFCs.
          </p>
        </div>

        {/* Wizard Form Card */}
        {step < 5 && (
          <div className="card" style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 32px" }}>
            {/* Step Progress Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--brand)" }}>
                Step {step} of 4: {step === 1 ? "Study Plan" : step === 2 ? "Funding & Security" : step === 3 ? "Co-Applicant" : "Admit Status"}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: "36px",
                      height: "6px",
                      borderRadius: "3px",
                      background: s <= step ? "var(--brand)" : "var(--line)",
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={step === 4 ? handleCalculate : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* Step 1: Study Plan */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3>Where and what do you plan to study?</h3>

                  <div className="form-group">
                    <label htmlFor="country">Destination Country</label>
                    <select
                      id="country"
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    >
                      <option value="United States">🇺🇸 United States (USA)</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom (UK)</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="Ireland">🇮🇪 Ireland</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Other">🌍 Other Global Destination</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="degree">Degree Level</label>
                    <select
                      id="degree"
                      value={profile.degreeLevel}
                      onChange={(e) => setProfile({ ...profile, degreeLevel: e.target.value })}
                    >
                      <option value="Master's">STEM Master&apos;s (MS, MTech)</option>
                      <option value="MBA">MBA / Management</option>
                      <option value="UG">Undergraduate (Bachelor&apos;s)</option>
                      <option value="Health">Healthcare / MBBS / MD</option>
                      <option value="Other">Other Post-Graduate Diploma</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                    <button type="submit" className="btn btn-accent">
                      Next: Funding Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Amount & Collateral */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3>How much funding do you require?</h3>

                  <div className="form-group">
                    <label htmlFor="amount">
                      Loan Amount Needed: <strong>₹{(profile.loanAmount / 1e5).toFixed(0)} Lakhs</strong>
                    </label>
                    <input
                      id="amount"
                      type="range"
                      min={1000000}
                      max={15000000}
                      step={500000}
                      value={profile.loanAmount}
                      onChange={(e) => setProfile({ ...profile, loanAmount: Number(e.target.value) })}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--muted)" }}>
                      <span>₹10 Lakh</span>
                      <span>₹50 Lakh</span>
                      <span>₹1 Crore</span>
                      <span>₹1.5 Crore</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Do you have tangible property or fixed deposits to pledge as collateral?</label>
                    <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                      <button
                        type="button"
                        className={`preset-chip ${!profile.hasCollateral ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: false, collateralType: "None" })}
                      >
                        No (100% Collateral-Free)
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasCollateral && profile.collateralType === "Property" ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: true, collateralType: "Property" })}
                      >
                        Yes, Residential Property / Land
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasCollateral && profile.collateralType === "Fixed Deposit" ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: true, collateralType: "Fixed Deposit" })}
                      >
                        Yes, Bank Fixed Deposit
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent">
                      Next: Co-Applicant Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Co-Applicant Financials */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3>Co-Applicant Financial Profile</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: "0" }}>
                    Indian banks evaluate co-applicant income to determine debt-service capability during the course moratorium.
                  </p>

                  <div className="form-group">
                    <label htmlFor="relation">Co-Applicant Relationship</label>
                    <select
                      id="relation"
                      value={profile.coApplicantRelation}
                      onChange={(e) => setProfile({ ...profile, coApplicantRelation: e.target.value })}
                    >
                      <option value="Parents">Parents (Father / Mother)</option>
                      <option value="Spouse">Spouse (Husband / Wife)</option>
                      <option value="Siblings">Brother / Sister (Working)</option>
                      <option value="Uncles/Aunts">Paternal / Maternal Uncle or Aunt</option>
                      <option value="None">No Co-Applicant (Explore No-Cosigner USD Loans)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="income">
                      Co-Applicant Net Monthly Salary / Income (₹)
                    </label>
                    <input
                      id="income"
                      type="number"
                      min={0}
                      step={5000}
                      placeholder="e.g. 60000"
                      value={profile.coApplicantIncome}
                      onChange={(e) => setProfile({ ...profile, coApplicantIncome: Number(e.target.value) })}
                    />
                    <span style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "4px" }}>
                      Take-home salary credited into bank account (after taxes & deductions).
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent">
                      Next: Final Step →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Admission Status */}
              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3>University Admission Status</h3>

                  <div className="form-group">
                    <label>Do you already hold an admission letter from an international university?</label>
                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasAdmit ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasAdmit: true })}
                      >
                        ✓ Yes, Confirmed or Conditional Admit
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${!profile.hasAdmit ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasAdmit: false })}
                      >
                        ⏳ No, Planning / Waiting for Results
                      </button>
                    </div>
                  </div>

                  <div style={{ background: "var(--soft)", padding: "16px", borderRadius: "8px", fontSize: "0.88rem" }}>
                    <strong>Privacy & Integrity Guarantee:</strong> We do not ask for Aadhaar or PAN during preliminary matching. Results are calculated against verified lender guidelines with zero credit bureau hits.
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(3)}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent">
                      Generate Match Breakdown →
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Step 5: Matches Results View */}
        {step === 5 && matches && (
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            {/* Top Scorecard Summary */}
            <div className="card" style={{ padding: "28px", marginBottom: "32px", borderLeft: "6px solid var(--brand)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>
                    Your Verified Lender Match Report
                  </h2>
                  <p style={{ margin: "0", color: "var(--muted)", fontSize: "0.92rem" }}>
                    Profile: {profile.country} • ₹{(profile.loanAmount / 1e5).toFixed(0)} Lakhs • {profile.hasCollateral ? profile.collateralType : "Collateral-Free"} • ₹{profile.coApplicantIncome.toLocaleString("en-IN")}/mo Income
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                  style={{ padding: "8px 16px", fontSize: "0.88rem" }}
                >
                  Edit Profile Inputs ✎
                </button>
              </div>

              {/* Status Counters */}
              <div style={{ display: "flex", gap: "14px", marginTop: "20px", flexWrap: "wrap" }}>
                <span className="badge" style={{ background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", fontSize: "0.88rem" }}>
                  🟢 {potentialCount} Potential Fit
                </span>
                <span className="badge" style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", fontSize: "0.88rem" }}>
                  🟡 {verificationCount} Needs Verification
                </span>
                <span className="badge" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca", fontSize: "0.88rem" }}>
                  🔴 {unlikelyCount} Unlikely Fit
                </span>
              </div>
            </div>

            {/* Lender Results List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {matches.map((item) => (
                <div
                  key={item.product.productId}
                  className="card"
                  style={{
                    padding: "24px 28px",
                    borderLeft: `5px solid ${item.statusColor === "green" ? "var(--success)" : item.statusColor === "amber" ? "var(--accent)" : "var(--danger)"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <h3 style={{ margin: "0", fontSize: "1.25rem" }}>{item.product.lenderName}</h3>
                        <span
                          className="badge"
                          style={{
                            marginBottom: "0",
                            background: item.statusColor === "green" ? "#dcfce7" : item.statusColor === "amber" ? "#fef3c7" : "#fee2e2",
                            color: item.statusColor === "green" ? "#166534" : item.statusColor === "amber" ? "#92400e" : "#991b1b",
                            borderColor: "transparent",
                          }}
                        >
                          {item.statusLabel}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: "2px" }}>
                        Product: {item.product.productName} • Rules verified: {item.product.lastVerifiedDate}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--brand)" }}>
                        {item.product.indicativeRateMin}% - {item.product.indicativeRateMax}%
                      </span>
                      <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                        Indicative {item.product.rateType}
                      </div>
                    </div>
                  </div>

                  <p style={{ margin: "14px 0", fontSize: "0.95rem", color: "var(--ink)" }}>
                    <strong>Match Assessment:</strong> {item.verdictSummary}
                  </p>

                  {/* Rules Breakdown Checklist */}
                  <div style={{ background: "var(--soft)", padding: "14px 18px", borderRadius: "8px", fontSize: "0.88rem" }}>
                    <div style={{ fontWeight: "700", marginBottom: "6px" }}>Underwriting Criteria Checked:</div>
                    <ul style={{ listStyle: "none", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {item.passedRules.map((rule, i) => (
                        <li key={i} style={{ color: "var(--success)" }}>
                          ✓ {rule}
                        </li>
                      ))}
                      {item.verificationNeeded.map((rule, i) => (
                        <li key={i} style={{ color: "#b45309" }}>
                          ⚠️ {rule}
                        </li>
                      ))}
                      {item.failedRules.map((rule, i) => (
                        <li key={i} style={{ color: "var(--danger)" }}>
                          ✕ {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Bar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "18px", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                      Processing Time: ~{item.product.processingTimeDaysMin}-{item.product.processingTimeDaysMax} days • Margin: {item.product.marginMoneyPercent}%
                    </div>

                    {item.status !== "unlikely_fit" ? (
                      <Link
                        href={`/apply?lender=${encodeURIComponent(item.product.lenderName)}&amount=${profile.loanAmount}`}
                        className="btn btn-accent"
                        style={{ padding: "8px 20px", fontSize: "0.92rem" }}
                      >
                        Apply for {item.product.lenderName} →
                      </Link>
                    ) : (
                      <Link
                        href="/apply"
                        className="btn btn-outline"
                        style={{ padding: "8px 16px", fontSize: "0.88rem" }}
                      >
                        Explore Alternative Options
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Support Banner */}
            <div className="card text-center" style={{ marginTop: "36px", padding: "32px", background: "var(--soft-alt)" }}>
              <h3>Need an Advisor to Verify Your File?</h3>
              <p style={{ maxWidth: "600px", margin: "0 auto 20px", fontSize: "0.95rem" }}>
                Our Senior Education Loan Specialists cross-verify borderline CIBIL scores, property chain of titles,
                and negotiate rate spreads with banks at zero fee.
              </p>
              <Link href="/apply" className="btn btn-primary">
                Book Free Advisor Review →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
