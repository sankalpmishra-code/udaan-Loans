"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface TaxCalculatorProps {
  initialLoanAmount?: number;
  initialInterestRate?: number;
  initialTenureYears?: number;
}

export default function TaxCalculator({
  initialLoanAmount = 4000000,
  initialInterestRate = 10.5,
  initialTenureYears = 10,
}: TaxCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(initialLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate);
  const [tenureYears, setTenureYears] = useState<number>(initialTenureYears);
  const [taxSlab, setTaxSlab] = useState<number>(0.30); // 30% slab by default
  const [taxRegime, setTaxRegime] = useState<"old" | "new">("old");
  const [whoServicesLoan, setWhoServicesLoan] = useState<"parent" | "student">("parent");
  const [showSchedule, setShowSchedule] = useState<boolean>(true);

  // Health and Education Cess is 4% on income tax in India
  const effectiveMarginalTaxRate = taxSlab > 0 ? taxSlab * 1.04 : 0;

  // Format currency in Indian numbering system
  const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
  const formatLakhCrore = (n: number) => {
    if (n >= 1e7) {
      return "₹" + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Crore";
    }
    return "₹" + (n / 1e5).toFixed(1).replace(/\.0$/, "") + " Lakh";
  };

  const taxCalculations = useMemo(() => {
    const P = Math.max(100000, loanAmount);
    const r = interestRate / 1200; // Monthly interest rate
    const n = tenureYears * 12; // Total months

    // Standard monthly EMI
    const emi = r
      ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : P / n;

    // Build year-by-year amortization for 80E evaluation
    const yearlyData: Array<{
      year: number;
      openingBalance: number;
      interestPaid: number;
      principalPaid: number;
      closingBalance: number;
      is80EEligible: boolean;
      taxSavedOldRegime: number;
      taxSavedNewRegime: number;
    }> = [];

    let currentBalance = P;
    let totalInterest8Years = 0;
    let totalTaxSaved8YearsOldRegime = 0;
    let totalLifetimeInterest = 0;

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrInterest = 0;
      let yrPrincipal = 0;
      const opening = currentBalance;

      for (let mo = 1; mo <= 12; mo++) {
        if (currentBalance <= 0) break;
        const interestMo = currentBalance * r;
        const principalMo = Math.min(currentBalance, emi - interestMo);
        yrInterest += interestMo;
        yrPrincipal += principalMo;
        currentBalance = Math.max(0, currentBalance - principalMo);
      }

      totalLifetimeInterest += yrInterest;

      // Section 80E allows deduction only for first 8 consecutive years
      const is80EEligible = yr <= 8;
      const taxSavedOld = is80EEligible ? yrInterest * effectiveMarginalTaxRate : 0;
      const taxSavedNew = 0; // 80E is unavailable under New Tax Regime (Section 115BAC)

      if (is80EEligible) {
        totalInterest8Years += yrInterest;
        totalTaxSaved8YearsOldRegime += taxSavedOld;
      }

      yearlyData.push({
        year: yr,
        openingBalance: opening,
        interestPaid: yrInterest,
        principalPaid: yrPrincipal,
        closingBalance: currentBalance,
        is80EEligible,
        taxSavedOldRegime: taxSavedOld,
        taxSavedNewRegime: taxSavedNew,
      });
    }

    // Effective post-tax interest rate under Old Regime
    // Post-tax rate = Contractual Rate * (1 - effectiveMarginalTaxRate)
    const effectiveRateOld = interestRate * (1 - effectiveMarginalTaxRate);
    const effectiveRateNew = interestRate; // No reduction

    const totalActiveSavings =
      taxRegime === "old" ? totalTaxSaved8YearsOldRegime : 0;
    const netInterestCost =
      taxRegime === "old"
        ? Math.max(0, totalLifetimeInterest - totalTaxSaved8YearsOldRegime)
        : totalLifetimeInterest;

    return {
      emi,
      totalLifetimeInterest,
      totalInterest8Years,
      totalTaxSaved8YearsOldRegime,
      totalActiveSavings,
      netInterestCost,
      effectiveRateOld,
      effectiveRateNew,
      yearlyData,
    };
  }, [loanAmount, interestRate, tenureYears, effectiveMarginalTaxRate, taxRegime]);

  return (
    <div className="tax-calculator-card" role="region" aria-labelledby="tax-calc-title">
      <div className="calc-header">
        <div className="badge badge-accent">Statutory Section 80E Model</div>
        <h2 id="tax-calc-title" style={{ marginTop: "8px", fontSize: "1.75rem" }}>
          Section 80E Education Loan Tax Deduction Calculator
        </h2>
        <p className="calc-sub">
          Analyze how much income tax you or your co-applicant can legally save on interest payments under Section 80E of the Indian Income Tax Act, 1961. Compare Old vs. New Tax Regime outcomes.
        </p>
      </div>

      {/* Regime Toggle Banner */}
      <div className="regime-toggle-banner">
        <div className="regime-selector-group">
          <span className="regime-label">Select Tax Regime for Tax Filing:</span>
          <div className="regime-tabs">
            <button
              type="button"
              className={`regime-btn ${taxRegime === "old" ? "active" : ""}`}
              onClick={() => setTaxRegime("old")}
              aria-pressed={taxRegime === "old"}
            >
              Old Tax Regime (Section 80E Eligible)
            </button>
            <button
              type="button"
              className={`regime-btn ${taxRegime === "new" ? "active" : ""}`}
              onClick={() => setTaxRegime("new")}
              aria-pressed={taxRegime === "new"}
            >
              New Tax Regime u/s 115BAC (No 80E Deduction)
            </button>
          </div>
        </div>

        {taxRegime === "new" ? (
          <div className="regime-warning-box">
            <strong>⚠️ Statutory Notice under Section 115BAC:</strong> Under India&apos;s default New Tax Regime, deductions under Chapter VI-A (including Section 80E for education loan interest) are <strong>not allowed</strong>. To claim Section 80E tax deductions, the taxpayer must actively exercise the option to file under the <strong>Old Tax Regime</strong> during ITR filing.
          </div>
        ) : (
          <div className="regime-success-box">
            <strong>✓ Old Tax Regime Selected:</strong> 100% of the interest paid during the financial year is deductible from Gross Total Income with <strong>NO upper monetary ceiling</strong> for up to 8 consecutive financial years.
          </div>
        )}
      </div>

      <div className="calc-body" style={{ marginTop: "24px" }}>
        {/* Controls Column */}
        <div className="calc-controls">
          {/* Loan Amount */}
          <div className="calc-field">
            <div className="field-label-group">
              <label htmlFor="tax-amt">Education Loan Sanction Amount</label>
              <span className="field-value-display">{formatLakhCrore(loanAmount)}</span>
            </div>
            <input
              id="tax-amt"
              type="range"
              min={1000000}
              max={15000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <div className="range-bounds">
              <span>₹10 Lakh</span>
              <span>₹1.5 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="calc-field">
            <div className="field-label-group">
              <label htmlFor="tax-rate">Contractual Bank Interest Rate (% p.a.)</label>
              <span className="field-value-display">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              id="tax-rate"
              type="range"
              min={7.5}
              max={14.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <div className="range-bounds">
              <span>7.5% (Public Bank Secured)</span>
              <span>14.0% (NBFC Unsecured)</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="calc-field">
            <div className="field-label-group">
              <label htmlFor="tax-tenure">Repayment Tenure</label>
              <span className="field-value-display">{tenureYears} Years</span>
            </div>
            <input
              id="tax-tenure"
              type="range"
              min={5}
              max={15}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
            />
            <div className="range-bounds">
              <span>5 Years</span>
              <span>15 Years (80E cap: 8 Years)</span>
            </div>
          </div>

          {/* Tax Slab Selector */}
          <div className="calc-field">
            <label htmlFor="tax-slab">Co-Applicant / Student Highest Tax Slab (Old Regime)</label>
            <p className="field-hint" style={{ fontSize: "0.82rem", color: "#64748b", margin: "4px 0 8px" }}>
              Select the marginal tax bracket of the person who pays the loan EMI from taxable income:
            </p>
            <select
              id="tax-slab"
              className="styled-select"
              value={taxSlab}
              onChange={(e) => setTaxSlab(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                background: "#f8fafc",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              <option value={0.30}>30% Slab (Income &gt; ₹10 Lakh in Old Regime) — Effective 31.2% with Cess</option>
              <option value={0.20}>20% Slab (Income ₹5 Lakh – ₹10 Lakh) — Effective 20.8% with Cess</option>
              <option value={0.05}>5% Slab (Income ₹2.5 Lakh – ₹5 Lakh) — Effective 5.2% with Cess</option>
              <option value={0.0}>0% Slab (Income exempt from income tax)</option>
            </select>
          </div>

          {/* Who Pays EMI */}
          <div className="calc-field">
            <label>Who will service the loan interest?</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              <button
                type="button"
                className={`preset-chip ${whoServicesLoan === "parent" ? "chip-active" : ""}`}
                style={{ padding: "10px", textAlign: "center" }}
                onClick={() => setWhoServicesLoan("parent")}
              >
                👨‍💼 Parent / Co-Applicant (Immediate Benefit)
              </button>
              <button
                type="button"
                className={`preset-chip ${whoServicesLoan === "student" ? "chip-active" : ""}`}
                style={{ padding: "10px", textAlign: "center" }}
                onClick={() => setWhoServicesLoan("student")}
              >
                🎓 Student (Post-Employment Benefit)
              </button>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "6px" }}>
              {whoServicesLoan === "parent"
                ? "Parents can start claiming 80E deduction from Year 1 while the student is studying, if simple interest is serviced during the moratorium."
                : "Students can claim 80E once they start earning in India. If the student works overseas and becomes an NRI, 80E applies only against Indian taxable income."}
            </p>
          </div>
        </div>

        {/* Results Highlight Box */}
        <div className="calc-results">
          <div className="result-highlight-box" style={{ background: "linear-gradient(135deg, #094754 0%, #0d5c6d 100%)" }}>
            <span className="result-caption">Estimated 8-Year Tax Savings</span>
            <div className="result-emi-amount" style={{ color: "#34d399", fontSize: "2.4rem" }}>
              {formatINR(taxCalculations.totalActiveSavings)}
            </div>
            <p className="result-note">
              {taxRegime === "old"
                ? `Saved across the 8-year statutory window under Section 80E (${(effectiveMarginalTaxRate * 100).toFixed(1)}% marginal bracket).`
                : "₹0 tax saved because Section 80E is disallowed under the New Tax Regime."}
            </p>

            {/* Effective Rate Comparison Badge */}
            <div className="effective-rate-card" style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "14px",
              marginTop: "16px",
              border: "1px solid rgba(255,255,255,0.18)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>Contractual Bank Rate:</span>
                <strong style={{ fontSize: "1.1rem", color: "#fbbf24" }}>{interestRate.toFixed(2)}% p.a.</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                  Effective Post-Tax Rate ({taxRegime === "old" ? "Old Regime" : "New Regime"}):
                </span>
                <strong style={{ fontSize: "1.25rem", color: taxRegime === "old" ? "#34d399" : "#fbbf24" }}>
                  {(taxRegime === "old" ? taxCalculations.effectiveRateOld : taxCalculations.effectiveRateNew).toFixed(2)}% p.a.
                </strong>
              </div>
              {taxRegime === "old" && (
                <div style={{ fontSize: "0.75rem", color: "#a7f3d0", marginTop: "6px" }}>
                  💡 Net cost reduction of {(interestRate - taxCalculations.effectiveRateOld).toFixed(2)}% per year due to tax relief.
                </div>
              )}
            </div>

            <div className="result-stats-grid" style={{ marginTop: "16px" }}>
              <div className="stat-item">
                <span className="stat-label">Monthly EMI</span>
                <span className="stat-val">{formatINR(taxCalculations.emi)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total 8-Year Interest</span>
                <span className="stat-val">{formatINR(taxCalculations.totalInterest8Years)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Lifetime Interest</span>
                <span className="stat-val">{formatINR(taxCalculations.totalLifetimeInterest)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Net Post-Tax Interest Cost</span>
                <span className="stat-val highlight">{formatINR(taxCalculations.netInterestCost)}</span>
              </div>
            </div>

            <div className="calc-cta-group" style={{ marginTop: "20px" }}>
              <Link href="/match" className="btn btn-accent full-width">
                Find Eligible Lenders for 80E →
              </Link>
              <button
                type="button"
                className="btn btn-outline full-width"
                onClick={() => setShowSchedule(!showSchedule)}
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}
              >
                {showSchedule ? "Hide Yearly 80E Schedule" : "View 8-Year 80E Tax Deduction Schedule"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-Year Schedule */}
      {showSchedule && (
        <div className="amortization-table-wrapper" style={{ marginTop: "32px" }}>
          <h3>Year-by-Year Section 80E Deduction Breakdown</h3>
          <p className="table-sub">
            The Income Tax Department allows deductions for a maximum of 8 consecutive assessment years starting from the year repayment commences:
          </p>
          <div className="table-scroll">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Financial Year</th>
                  <th>Opening Principal</th>
                  <th>Interest Paid (80E Deduction)</th>
                  <th>Old Regime Tax Saved</th>
                  <th>New Regime Tax Saved</th>
                  <th>80E Status</th>
                </tr>
              </thead>
              <tbody>
                {taxCalculations.yearlyData.map((row) => (
                  <tr
                    key={row.year}
                    style={{
                      background: row.is80EEligible ? "transparent" : "#fef2f2",
                      opacity: row.is80EEligible ? 1 : 0.8,
                    }}
                  >
                    <td>
                      <strong>Year {row.year}</strong>
                    </td>
                    <td>{formatINR(row.openingBalance)}</td>
                    <td className="text-amber">
                      <strong>{formatINR(row.interestPaid)}</strong>
                    </td>
                    <td className="text-green">
                      {row.is80EEligible ? (
                        <strong>{formatINR(row.taxSavedOldRegime)}</strong>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>Exceeded 8-Yr Limit</span>
                      )}
                    </td>
                    <td style={{ color: "#64748b" }}>₹0 (Disallowed)</td>
                    <td>
                      {row.is80EEligible ? (
                        <span className="badge badge-success" style={{ fontSize: "0.72rem" }}>
                          ✓ 80E Eligible
                        </span>
                      ) : (
                        <span className="badge badge-warning" style={{ fontSize: "0.72rem" }}>
                          Expired (8-Yr Cap)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legal & CA Disclaimer */}
      <div className="tax-disclaimer-box" style={{
        marginTop: "24px",
        padding: "16px 20px",
        borderRadius: "8px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        fontSize: "0.82rem",
        color: "#475569",
        lineHeight: "1.6"
      }}>
        <p style={{ margin: 0 }}>
          <strong>⚖️ Statutory Disclaimer under Income Tax Act, 1961:</strong> Section 80E allows an individual assessee to deduct the entire interest paid on an education loan taken for higher education from gross total income, subject to the conditions of Section 80E. It does <strong>not</strong> reduce the lender&apos;s contractual interest rate. Deduction is available only if the loan is taken from an approved financial institution or recognized charitable institution, and only under the <strong>Old Tax Regime</strong> (inapplicable under the default New Tax Regime u/s 115BAC). This calculator provides educational estimates. Please consult a qualified Chartered Accountant (CA) or certified tax advisor before filing income tax returns.
        </p>
      </div>
    </div>
  );
}
