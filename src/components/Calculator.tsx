"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface CalculatorProps {
  initialAmount?: number;
  initialRate?: number;
  initialTenureYears?: number;
  initialMoratoriumMonths?: number;
  showSchedule?: boolean;
}

export default function Calculator({
  initialAmount = 3500000,
  initialRate = 9.5,
  initialTenureYears = 10,
  initialMoratoriumMonths = 30,
  showSchedule = false,
}: CalculatorProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rate, setRate] = useState<number>(initialRate);
  const [tenureYears, setTenureYears] = useState<number>(initialTenureYears);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(initialMoratoriumMonths);
  const [viewSchedule, setViewSchedule] = useState<boolean>(showSchedule);

  // Formatting helpers
  const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
  
  const formatLakhCrore = (n: number) => {
    if (n >= 1e7) {
      return "₹" + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Crore";
    }
    return "₹" + (n / 1e5).toFixed(1).replace(/\.0$/, "") + " Lakh";
  };

  // Quick Amount Presets
  const amountPresets = [
    { label: "₹25L", value: 2500000 },
    { label: "₹35L", value: 3500000 },
    { label: "₹50L", value: 5000000 },
    { label: "₹75L", value: 7500000 },
    { label: "₹1.2 Cr", value: 12000000 },
  ];

  // Quick Tenure Presets
  const tenurePresets = [5, 7, 10, 12, 15];

  // Calculations
  const calculations = useMemo(() => {
    const P = Math.max(100000, amount);
    const r = rate / 1200; // Monthly interest rate
    const m = moratoriumMonths;
    const n = tenureYears * 12; // Total repayment months

    // Simple interest accrued during course & grace period
    const preInterest = P * r * m;
    const adjustedPrincipal = P + preInterest;

    // Post-moratorium monthly EMI
    const emi = r
      ? (adjustedPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : adjustedPrincipal / n;

    const totalRepaidPostMoratorium = emi * n;
    const totalInterest = totalRepaidPostMoratorium - P;
    const totalPayable = totalRepaidPostMoratorium;

    // Percentages for visual bar
    const principalPct = Math.round((P / totalPayable) * 100);
    const preInterestPct = Math.round((preInterest / totalPayable) * 100);
    const postInterestPct = Math.max(0, 100 - principalPct - preInterestPct);

    // Generate year-by-year amortization breakdown
    const schedule: Array<{
      year: number;
      openingBalance: number;
      principalPaid: number;
      interestPaid: number;
      closingBalance: number;
    }> = [];

    let currentBalance = adjustedPrincipal;
    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      const opening = currentBalance;

      for (let mo = 1; mo <= 12; mo++) {
        const interestMo = currentBalance * r;
        const principalMo = emi - interestMo;
        yrInterest += interestMo;
        yrPrincipal += principalMo;
        currentBalance = Math.max(0, currentBalance - principalMo);
      }

      schedule.push({
        year: yr,
        openingBalance: opening,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        closingBalance: currentBalance,
      });
    }

    return {
      emi,
      preInterest,
      totalInterest,
      totalPayable,
      adjustedPrincipal,
      principalPct,
      preInterestPct,
      postInterestPct,
      schedule,
    };
  }, [amount, rate, tenureYears, moratoriumMonths]);

  return (
    <div className="calculator-wrapper">
      <div className="calc-card" role="group" aria-labelledby="calc-heading">
        <div className="calc-header">
          <div className="badge" style={{ marginBottom: "8px" }}>Live Financial Modeling</div>
          <h2 id="calc-heading">Overseas Education Loan EMI Calculator</h2>
          <p className="calc-sub">
            Calculates exact post-graduation EMIs factoring in simple interest accrued during course moratorium.
          </p>
        </div>

        <div className="calc-body">
          {/* Controls column */}
          <div className="calc-controls">
            {/* Amount Slider & Presets */}
            <div className="calc-field">
              <div className="field-label-group">
                <label htmlFor="amt">Required Loan Amount</label>
                <span className="field-value-display">{formatLakhCrore(amount)}</span>
              </div>
              <input
                id="amt"
                type="range"
                min={500000}
                max={15000000}
                step={100000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-valuemin={500000}
                aria-valuemax={15000000}
                aria-valuenow={amount}
              />
              <div className="range-bounds">
                <span>₹5 Lakh</span>
                <span>₹1.5 Crore</span>
              </div>
              <div className="preset-chip-group" style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                {amountPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className={`preset-chip ${amount === p.value ? "chip-active" : ""}`}
                    onClick={() => setAmount(p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="calc-field">
              <div className="field-label-group">
                <label htmlFor="rate">Annual Interest Rate (% p.a.)</label>
                <span className="field-value-display">{rate.toFixed(1)}%</span>
              </div>
              <input
                id="rate"
                type="range"
                min={7.0}
                max={14.0}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                aria-valuemin={7.0}
                aria-valuemax={14.0}
                aria-valuenow={rate}
              />
              <div className="range-bounds">
                <span>7.0% (Public Banks)</span>
                <span>14.0% (NBFC Unsecured)</span>
              </div>
            </div>

            {/* Repayment Tenure Slider & Presets */}
            <div className="calc-field">
              <div className="field-label-group">
                <label htmlFor="ten">Repayment Tenure Post-Course</label>
                <span className="field-value-display">{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
              <input
                id="ten"
                type="range"
                min={3}
                max={15}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                aria-valuemin={3}
                aria-valuemax={15}
                aria-valuenow={tenureYears}
              />
              <div className="range-bounds">
                <span>3 Years</span>
                <span>15 Years</span>
              </div>
              <div className="preset-chip-group" style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                {tenurePresets.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`preset-chip ${tenureYears === t ? "chip-active" : ""}`}
                    onClick={() => setTenureYears(t)}
                  >
                    {t}Y
                  </button>
                ))}
              </div>
            </div>

            {/* Moratorium Slider */}
            <div className="calc-field">
              <div className="field-label-group">
                <label htmlFor="mor">Course Duration + Grace Period</label>
                <span className="field-value-display">{moratoriumMonths} Months ({(moratoriumMonths / 12).toFixed(1)} yrs)</span>
              </div>
              <input
                id="mor"
                type="range"
                min={12}
                max={60}
                step={6}
                value={moratoriumMonths}
                onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
                aria-valuemin={12}
                aria-valuemax={60}
                aria-valuenow={moratoriumMonths}
              />
              <div className="range-bounds">
                <span>12 Months (1 yr)</span>
                <span>60 Months (5 yrs)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="calc-results">
            <div className="result-highlight-box" aria-live="polite">
              <span className="result-caption">Monthly EMI After Graduation</span>
              <div className="result-emi-amount">{formatINR(calculations.emi)}</div>
              <p className="result-note">Payable for {tenureYears} years ({tenureYears * 12} monthly installments)</p>

              {/* Visual Breakdown Bar */}
              <div style={{ margin: "16px 0 20px" }}>
                <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", background: "rgba(255,255,255,0.2)" }}>
                  <div style={{ width: `${calculations.principalPct}%`, background: "#F59E0B" }} title={`Principal: ${calculations.principalPct}%`} />
                  <div style={{ width: `${calculations.preInterestPct}%`, background: "#60A5FA" }} title={`Study Interest: ${calculations.preInterestPct}%`} />
                  <div style={{ width: `${calculations.postInterestPct}%`, background: "#34D399" }} title={`Repayment Interest: ${calculations.postInterestPct}%`} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", opacity: 0.85, marginTop: "6px" }}>
                  <span>🟡 Principal ({calculations.principalPct}%)</span>
                  <span>🔵 Study Int. ({calculations.preInterestPct}%)</span>
                  <span>🟢 Repay Int. ({calculations.postInterestPct}%)</span>
                </div>
              </div>

              <div className="result-stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Principal Sanctioned</span>
                  <span className="stat-val">{formatINR(amount)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Interest During Study</span>
                  <span className="stat-val">{formatINR(calculations.preInterest)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Interest Paid</span>
                  <span className="stat-val">{formatINR(calculations.totalInterest)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Payable Amount</span>
                  <span className="stat-val highlight">{formatINR(calculations.totalPayable)}</span>
                </div>
              </div>

              <div className="calc-cta-group">
                <Link href="/apply" className="btn btn-accent full-width">
                  Lock In This EMI Quote →
                </Link>
                <button
                  type="button"
                  className="btn btn-outline full-width"
                  onClick={() => setViewSchedule(!viewSchedule)}
                  style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" }}
                >
                  {viewSchedule ? "Hide Amortization Table" : "View Year-by-Year Amortization"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule Table */}
        {viewSchedule && (
          <div className="amortization-table-wrapper">
            <h3>Year-by-Year Loan Amortization Schedule</h3>
            <p className="table-sub">
              Detailed breakdown of how your payments reduce principal balance versus interest over time:
            </p>
            <div className="table-scroll">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Opening Balance</th>
                    <th>Principal Repaid</th>
                    <th>Interest Paid</th>
                    <th>Year-End Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map((row) => (
                    <tr key={row.year}>
                      <td><strong>Year {row.year}</strong></td>
                      <td>{formatINR(row.openingBalance)}</td>
                      <td className="text-green">{formatINR(row.principalPaid)}</td>
                      <td className="text-amber">{formatINR(row.interestPaid)}</td>
                      <td>{formatINR(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="disclaimer-note">
          *Disclaimer: The above calculation is illustrative and assumes simple interest accrual during the course moratorium capitalized at repayment start. Actual interest rate, margin money, and amortization terms depend on individual bank/NBFC sanctions.
        </p>
      </div>
    </div>
  );
}
