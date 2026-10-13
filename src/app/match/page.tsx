"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { evaluateStudentLenderMatches, MatchResultItem, StudentProfileInput } from "@/utils/matchingEngine";
import {
  trackMatcherStart,
  trackMatcherStep,
  trackMatcherComplete,
  trackLeadSubmission,
  getStoredAttribution,
} from "@/lib/analytics";

function MatcherContent() {
  const searchParams = useSearchParams();

  // Initialize profile with URL params if available (e.g. from /destinations/germany)
  const initialCountry = searchParams.get("country") || "United States";
  const initialAmount = Number(searchParams.get("amount")) || 4000000;
  const initialDegree = searchParams.get("degree") || "Master's";

  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<StudentProfileInput>({
    country: initialCountry,
    degreeLevel: initialDegree,
    loanAmount: initialAmount,
    hasCollateral: false,
    collateralType: "None",
    coApplicantIncome: 55000,
    coApplicantRelation: "Parents",
    hasAdmit: true,
  });

  const [matches, setMatches] = useState<MatchResultItem[] | null>(null);

  // Fast-Track Sanction Modal State
  const [modalLender, setModalLender] = useState<string | null>(null);
  const [modalStudentName, setModalStudentName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalConsent, setModalConsent] = useState(true);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    trackMatcherStart(profile.country);
  }, []);

  const handleStepTransition = (nextStep: number, stepName: string) => {
    trackMatcherStep(nextStep, stepName);
    setStep(nextStep);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const results = evaluateStudentLenderMatches(profile);
    setMatches(results);
    trackMatcherComplete(results.length, profile);
    setStep(5); // Results step
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  // Live EMI calculation helper
  const calculateIndicativeEMI = (principal: number, ratePercent: number, tenureYears: number = 10) => {
    if (!principal || !ratePercent) return 0;
    const monthlyRate = ratePercent / 12 / 100;
    const months = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  // Fast-Track Sanction Modal Lead Submission
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    if (!modalStudentName.trim() || modalStudentName.trim().length < 2) {
      setModalError("Please enter your full name.");
      return;
    }
    const cleanPhone = modalPhone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setModalError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!modalConsent) {
      setModalError("Please authorize loan consultation.");
      return;
    }

    setModalSubmitting(true);
    try {
      const attribution = getStoredAttribution();

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: `Fast-Track Sanction Request: ${modalLender}`,
          name: modalStudentName,
          phone: cleanPhone,
          email: modalEmail || "not-provided@inquiry.com",
          country: profile.country,
          course: profile.degreeLevel,
          amount: profile.loanAmount,
          loanType: profile.hasCollateral ? `Secured (${profile.collateralType})` : "Collateral-Free",
          coApplicant: `${profile.coApplicantRelation} (₹${profile.coApplicantIncome}/mo)`,
          partnerRef: attribution.partnerRef || "",
          utmSource: attribution.utm_source || "",
          utmMedium: attribution.utm_medium || "",
          utmCampaign: attribution.utm_campaign || "",
          utmTerm: attribution.utm_term || "",
          utmContent: attribution.utm_content || "",
          gclid: attribution.gclid || "",
          landingPage: window.location.pathname,
          sourceName: "Loan Matcher",
          sourceUrl: window.location.href,
          additionalNotes: `Matched Lender: ${modalLender}. Student has admit: ${profile.hasAdmit ? "Yes" : "No"}.`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      trackLeadSubmission(`Fast-Track Sanction: ${modalLender}`, {
        lender: modalLender,
        amount: profile.loanAmount,
        country: profile.country,
      });

      setModalSubmitted(true);
    } catch (err) {
      console.error(err);
      setModalError("Unable to submit. Please try again or call our helpline.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const potentialCount = matches?.filter((m) => m.status === "potential_fit").length || 0;
  const verificationCount = matches?.filter((m) => m.status === "needs_verification").length || 0;
  const unlikelyCount = matches?.filter((m) => m.status === "unlikely_fit").length || 0;

  return (
    <section className="hero" style={{ padding: "48px 0 80px" }}>
      <div className="wrap">
        <div className="section-head text-center" style={{ maxWidth: "820px", margin: "0 auto 36px" }}>
          <span className="badge">Verified Rules Engine • 100% Free</span>
          <h1>Two-Stage Bank & Lender Matcher</h1>
          <p className="lead">
            No black-box probability guesses. We evaluate your academic admit, destination country, and financial profile
            against <strong>published RBI-regulated underwriting criteria</strong> from 30+ public banks, private commercial banks, and NBFCs.
          </p>
        </div>

        {/* Wizard Form Card */}
        {step < 5 && (
          <div className="card" style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 32px", boxShadow: "var(--shadow-lg)" }}>
            {/* Step Progress Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ fontSize: "0.92rem", fontWeight: "700", color: "var(--brand)" }}>
                Stage {step} of 4:{" "}
                <span style={{ color: "var(--ink)" }}>
                  {step === 1 ? "Study Destination & Degree" : step === 2 ? "Funding & Collateral" : step === 3 ? "Co-Applicant Financials" : "Admit Letter Status"}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: "44px",
                      height: "7px",
                      borderRadius: "4px",
                      background: s <= step ? "var(--brand)" : "var(--line)",
                      transition: "background 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={step === 4 ? handleCalculate : (e) => { e.preventDefault(); handleStepTransition(step + 1, `Step ${step + 1}`); }}>
              {/* Step 1: Study Plan */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Where and what do you plan to study?</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                      Bank interest rates and unsecured limits vary significantly based on your target destination country and degree level.
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Target Study Destination *</label>
                    <select
                      id="country"
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                      style={{ padding: "12px 14px", fontSize: "1rem" }}
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
                    <label htmlFor="degree">Academic Degree Level *</label>
                    <select
                      id="degree"
                      value={profile.degreeLevel}
                      onChange={(e) => setProfile({ ...profile, degreeLevel: e.target.value })}
                      style={{ padding: "12px 14px", fontSize: "1rem" }}
                    >
                      <option value="Master's">STEM Master&apos;s (MS, MTech, Data Science)</option>
                      <option value="MBA">MBA / Management</option>
                      <option value="UG">Undergraduate (Bachelor&apos;s / BTech / BS)</option>
                      <option value="Health">Healthcare / MBBS / Dental / Nursing</option>
                      <option value="Other">Post-Graduate Certificate / Diploma</option>
                    </select>
                  </div>

                  {/* Trust indicator */}
                  <div style={{ background: "var(--soft)", padding: "14px 18px", borderRadius: "8px", fontSize: "0.85rem", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>🛡️</span>
                    <span><strong>Zero CIBIL Impact:</strong> Checking preliminary bank underwriting rules does not create any inquiry on your credit bureau record.</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                    <button type="submit" className="btn btn-accent" style={{ padding: "12px 28px", fontSize: "1rem" }}>
                      Next: Funding Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Amount & Collateral */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>How much funding do you require?</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                      Adjust the slider to your estimated tuition and living cost requirement.
                    </p>
                  </div>

                  <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                      <label htmlFor="amount" style={{ margin: 0 }}>Required Loan Amount:</label>
                      <span style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--brand)" }}>
                        ₹{(profile.loanAmount / 1e5).toFixed(0)} Lakhs
                      </span>
                    </div>
                    <input
                      id="amount"
                      type="range"
                      min={1000000}
                      max={15000000}
                      step={500000}
                      value={profile.loanAmount}
                      onChange={(e) => setProfile({ ...profile, loanAmount: Number(e.target.value) })}
                      style={{ width: "100%", height: "8px", cursor: "pointer" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--muted)", marginTop: "6px" }}>
                      <span>₹10 Lakh</span>
                      <span>₹50 Lakh</span>
                      <span>₹1 Crore</span>
                      <span>₹1.5 Crore</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ marginBottom: "8px", display: "block" }}>
                      Do you have tangible property or fixed deposits to pledge as collateral?
                    </label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className={`preset-chip ${!profile.hasCollateral ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: false, collateralType: "None" })}
                        style={{ padding: "10px 16px", fontSize: "0.9rem" }}
                      >
                        🚫 No (100% Collateral-Free)
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasCollateral && profile.collateralType === "Property" ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: true, collateralType: "Property" })}
                        style={{ padding: "10px 16px", fontSize: "0.9rem" }}
                      >
                        🏡 Residential Property / Plot
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasCollateral && profile.collateralType === "Fixed Deposit" ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasCollateral: true, collateralType: "Fixed Deposit" })}
                        style={{ padding: "10px 16px", fontSize: "0.9rem" }}
                      >
                        🏦 Bank Fixed Deposit (FD)
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => handleStepTransition(1, "Step 1")}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent" style={{ padding: "12px 28px", fontSize: "1rem" }}>
                      Next: Co-Applicant Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Co-Applicant Financials */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>Co-Applicant Financial Profile</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                      Indian scheduled banks evaluate co-applicant taxable income to ensure family servicing capacity during moratorium.
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="relation">Co-Applicant Relationship *</label>
                    <select
                      id="relation"
                      value={profile.coApplicantRelation}
                      onChange={(e) => setProfile({ ...profile, coApplicantRelation: e.target.value })}
                      style={{ padding: "12px 14px", fontSize: "1rem" }}
                    >
                      <option value="Parents">Parents (Father / Mother)</option>
                      <option value="Spouse">Spouse (Husband / Wife)</option>
                      <option value="Siblings">Brother / Sister (Employed)</option>
                      <option value="Uncles/Aunts">Paternal / Maternal Uncle or Aunt</option>
                      <option value="None">No Co-Applicant (Explore No-Cosigner USD Loans)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="income">
                      Co-Applicant Net Monthly Income (₹) *
                    </label>
                    <input
                      id="income"
                      type="number"
                      min={0}
                      step={5000}
                      placeholder="e.g. 60000"
                      value={profile.coApplicantIncome}
                      onChange={(e) => setProfile({ ...profile, coApplicantIncome: Number(e.target.value) })}
                      style={{ padding: "12px 14px", fontSize: "1rem" }}
                    />
                    <span style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "4px", display: "block" }}>
                      Net take-home salary or business income credited into bank account (after taxes).
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => handleStepTransition(2, "Step 2")}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent" style={{ padding: "12px 28px", fontSize: "1rem" }}>
                      Next: Final Check →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Admission Status */}
              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", marginBottom: "6px" }}>University Admission Status</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                      Both confirmed admits and pre-admission provisional loan approvals are supported.
                    </p>
                  </div>

                  <div className="form-group">
                    <label style={{ marginBottom: "10px", display: "block" }}>
                      Do you currently hold an offer or admit letter?
                    </label>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className={`preset-chip ${profile.hasAdmit ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasAdmit: true })}
                        style={{ padding: "12px 18px", fontSize: "0.95rem" }}
                      >
                        🎓 Yes, I have a Confirmed / Conditional Admit
                      </button>
                      <button
                        type="button"
                        className={`preset-chip ${!profile.hasAdmit ? "chip-active" : ""}`}
                        onClick={() => setProfile({ ...profile, hasAdmit: false })}
                        style={{ padding: "12px 18px", fontSize: "0.95rem" }}
                      >
                        ⏳ No, Planning / Need Pre-Visa Approval First
                      </button>
                    </div>
                  </div>

                  <div style={{ background: "var(--soft)", padding: "18px", borderRadius: "10px", fontSize: "0.88rem", lineHeight: "1.6" }}>
                    <strong>⚖️ Transparent Guarantee:</strong> We do not ask for Aadhaar or PAN during preliminary matching. All rules are audited against official bank product circulars.
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <button type="button" className="btn btn-outline" onClick={() => handleStepTransition(3, "Step 3")}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-accent" style={{ padding: "12px 32px", fontSize: "1.05rem" }}>
                      Generate Verified Match Breakdown →
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Step 5: Matches Results View */}
        {step === 5 && matches && (
          <div style={{ maxWidth: "940px", margin: "0 auto" }}>
            {/* Top Scorecard Summary */}
            <div className="card" style={{ padding: "30px", marginBottom: "32px", borderLeft: "6px solid var(--brand)", boxShadow: "var(--shadow-md)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.6rem", marginBottom: "4px" }}>
                    Your Verified Lender Match Report
                  </h2>
                  <p style={{ margin: "0", color: "var(--muted)", fontSize: "0.95rem" }}>
                    Profile: <strong>{profile.country}</strong> • <strong>₹{(profile.loanAmount / 1e5).toFixed(0)} Lakhs</strong> • <strong>{profile.hasCollateral ? profile.collateralType : "Collateral-Free"}</strong> • <strong>₹{profile.coApplicantIncome.toLocaleString("en-IN")}/mo Income</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStep(1)}
                  style={{ padding: "8px 18px", fontSize: "0.88rem" }}
                >
                  Edit Profile Inputs ✎
                </button>
              </div>

              {/* Status Counters */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginTop: "22px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span className="badge" style={{ background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", fontSize: "0.9rem" }}>
                    🟢 {potentialCount} Potential Fit
                  </span>
                  <span className="badge" style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", fontSize: "0.9rem" }}>
                    🟡 {verificationCount} Needs Verification
                  </span>
                  <span className="badge" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca", fontSize: "0.9rem" }}>
                    🔴 {unlikelyCount} Unlikely Fit
                  </span>
                </div>
                <Link
                  href={`/assessment?dest=${encodeURIComponent(profile.country)}&loan=${profile.loanAmount}&collateral=${profile.hasCollateral ? "yes" : "no"}&degree=${encodeURIComponent(profile.degreeLevel)}`}
                  className="btn btn-accent"
                  style={{ padding: "8px 18px", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  📄 Download Preliminary Assessment Certificate →
                </Link>
              </div>
            </div>

            {/* Lender Results List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {matches.map((item) => {
                const indicativeEMI = calculateIndicativeEMI(profile.loanAmount, item.product.indicativeRateMin);

                return (
                  <div
                    key={item.product.productId}
                    className="card"
                    style={{
                      padding: "26px 30px",
                      borderLeft: `5px solid ${item.statusColor === "green" ? "var(--success)" : item.statusColor === "amber" ? "var(--accent)" : "var(--danger)"}`,
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                          <h3 style={{ margin: "0", fontSize: "1.3rem" }}>{item.product.lenderName}</h3>
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
                        <div style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: "3px" }}>
                          Product: <strong>{item.product.productName}</strong> • Verified: {item.product.lastVerifiedDate}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--brand)" }}>
                          {item.product.indicativeRateMin}% - {item.product.indicativeRateMax}%
                        </span>
                        <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                          Indicative {item.product.rateType}
                        </div>
                        {indicativeEMI > 0 && (
                          <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--ink)", marginTop: "4px", background: "var(--soft)", padding: "2px 8px", borderRadius: "4px" }}>
                            Est. EMI: ~₹{indicativeEMI.toLocaleString("en-IN")}/mo*
                          </div>
                        )}
                      </div>
                    </div>

                    <p style={{ margin: "14px 0", fontSize: "0.95rem", color: "var(--ink)", lineHeight: "1.5" }}>
                      <strong>Underwriting Assessment:</strong> {item.verdictSummary}
                    </p>

                    {/* Rules Breakdown Checklist */}
                    <div style={{ background: "var(--soft)", padding: "14px 18px", borderRadius: "8px", fontSize: "0.88rem" }}>
                      <div style={{ fontWeight: "700", marginBottom: "8px" }}>Underwriting Criteria Evaluated:</div>
                      <ul style={{ listStyle: "none", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {item.passedRules.map((rule, i) => (
                          <li key={i} style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>✓</span> <span>{rule}</span>
                          </li>
                        ))}
                        {item.verificationNeeded.map((rule, i) => (
                          <li key={i} style={{ color: "#b45309", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>⚠️</span> <span>{rule}</span>
                          </li>
                        ))}
                        {item.failedRules.map((rule, i) => (
                          <li key={i} style={{ color: "var(--danger)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>✕</span> <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "18px", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                        Processing: ~{item.product.processingTimeDaysMin}-{item.product.processingTimeDaysMax} days • Margin: {item.product.marginMoneyPercent}%
                      </div>

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {item.status !== "unlikely_fit" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setModalLender(item.product.lenderName);
                                setModalSubmitted(false);
                                setModalError("");
                              }}
                              className="btn btn-accent"
                              style={{ padding: "8px 18px", fontSize: "0.9rem" }}
                            >
                              ⚡ Claim Fast-Track Sanction
                            </button>
                            <Link
                              href={`/apply?lender=${encodeURIComponent(item.product.lenderName)}&amount=${profile.loanAmount}&country=${encodeURIComponent(profile.country)}`}
                              className="btn btn-outline"
                              style={{ padding: "8px 16px", fontSize: "0.88rem" }}
                            >
                              Full Application →
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/apply"
                            className="btn btn-outline"
                            style={{ padding: "8px 16px", fontSize: "0.88rem" }}
                          >
                            Explore Alternative Lenders
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Support Banner */}
            <div className="card text-center" style={{ marginTop: "36px", padding: "36px", background: "var(--soft-alt)" }}>
              <h3>Need an Advisor to Audit Your Documentation?</h3>
              <p style={{ maxWidth: "620px", margin: "0 auto 20px", fontSize: "0.95rem" }}>
                Our Senior Education Loan Specialists cross-verify borderline CIBIL scores, assist with property chain-of-title searches,
                and negotiate rate spreads with banks at zero upfront or backend fee to students.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/apply" className="btn btn-primary">
                  Book Free Advisor Review →
                </Link>
                <Link href="/tax-calculator" className="btn btn-outline">
                  Calculate Section 80E Tax Savings
                </Link>
                <Link href="/calculator" className="btn btn-outline">
                  View Full Amortization Schedule
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 1-Click Fast-Track Sanction Modal */}
        {modalLender && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "16px",
            }}
          >
            <div
              className="card"
              style={{
                maxWidth: "500px",
                width: "100%",
                padding: "32px",
                background: "var(--surface)",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setModalLender(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                }}
                aria-label="Close modal"
              >
                ✕
              </button>

              {!modalSubmitted ? (
                <div>
                  <span className="badge badge-accent">Priority Bank Processing</span>
                  <h3 style={{ fontSize: "1.4rem", marginTop: "8px", marginBottom: "4px" }}>
                    Claim Fast-Track Sanction with {modalLender}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "20px" }}>
                    Targeting: <strong>{profile.country}</strong> • Loan Amount: <strong>₹{(profile.loanAmount / 1e5).toFixed(0)} Lakhs</strong>
                  </p>

                  {modalError && (
                    <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", marginBottom: "16px" }}>
                      {modalError}
                    </div>
                  )}

                  <form onSubmit={handleModalSubmit}>
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label htmlFor="modal-name">Student Full Name *</label>
                      <input
                        id="modal-name"
                        type="text"
                        placeholder="e.g. John Doe"
                        value={modalStudentName}
                        onChange={(e) => setModalStudentName(e.target.value)}
                        required
                        style={{ padding: "10px 12px", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label htmlFor="modal-phone">10-Digit Mobile Number *</label>
                      <input
                        id="modal-phone"
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        required
                        style={{ padding: "10px 12px", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "16px" }}>
                      <label htmlFor="modal-email">Email Address (Optional)</label>
                      <input
                        id="modal-email"
                        type="email"
                        placeholder="e.g. john.doe@example.com"
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        style={{ padding: "10px 12px", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "20px" }}>
                      <input
                        type="checkbox"
                        id="modal-consent"
                        checked={modalConsent}
                        onChange={(e) => setModalConsent(e.target.checked)}
                        style={{ marginTop: "4px" }}
                      />
                      <label htmlFor="modal-consent" style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: "1.4" }}>
                        I authorize Udaan Edu Loans to contact me via Call/WhatsApp regarding my {modalLender} study abroad loan eligibility. 100% free service.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={modalSubmitting}
                      className="btn btn-accent full-width"
                      style={{ padding: "12px", fontSize: "1rem" }}
                    >
                      {modalSubmitting ? "Connecting with Advisor..." : `Request ${modalLender} Fast-Track Call →`}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>Fast-Track Request Received!</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: "1.6" }}>
                    A Senior Education Loan Specialist for <strong>{modalLender}</strong> has been assigned to your file. We will call you within <strong>2 to 4 business hours</strong> to guide your application.
                  </p>
                  <div style={{ marginTop: "24px" }}>
                    <button
                      type="button"
                      onClick={() => setModalLender(null)}
                      className="btn btn-outline"
                    >
                      Back to Matches Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function BankMatcherPage() {
  return (
    <Suspense fallback={<div style={{ padding: "100px 0", textAlign: "center" }}>Loading Bank Matcher...</div>}>
      <MatcherContent />
    </Suspense>
  );
}
