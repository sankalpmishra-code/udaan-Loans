/**
 * Udaan Loans - EMI Calculator Module
 * Handles calculation and real-time updates for study abroad loan EMIs.
 */

const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const formatLakhCrore = (n) => {
  if (n >= 1e7) {
    return "₹" + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " crore";
  }
  return "₹" + (n / 1e5).toFixed(0) + " lakh";
};

function calculateEMI() {
  const amtInput = document.getElementById("amt");
  const rateInput = document.getElementById("rate");
  const tenInput = document.getElementById("ten");
  const morInput = document.getElementById("mor");

  if (!amtInput || !rateInput || !tenInput || !morInput) return;

  const P = +amtInput.value;
  const r = +rateInput.value / 1200; // Monthly interest rate
  const y = +tenInput.value;         // Tenor in years
  const m = +morInput.value;         // Moratorium period in months
  const n = y * 12;                  // Total repayment months

  // Simple interest accrued during study / moratorium period
  const pre = P * r * m;
  const P2 = P + pre; // Total principal before repayment commences

  // Standard amortisation formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = r ? (P2 * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P2 / n;
  const tot = emi * n;

  // Update slider output labels
  const amtO = document.getElementById("amtO");
  const rateO = document.getElementById("rateO");
  const tenO = document.getElementById("tenO");
  const morO = document.getElementById("morO");

  if (amtO) amtO.textContent = formatLakhCrore(P);
  if (rateO) rateO.textContent = (+rateInput.value).toFixed(1) + "%";
  if (tenO) tenO.textContent = y + " years";
  if (morO) morO.textContent = m + " months";

  // Update summary fields
  const emiEl = document.getElementById("emi");
  const preEl = document.getElementById("pre");
  const intEl = document.getElementById("int");
  const totEl = document.getElementById("tot");

  if (emiEl) emiEl.textContent = formatINR(emi);
  if (preEl) preEl.textContent = formatINR(pre);
  if (intEl) intEl.textContent = formatINR(tot - P);
  if (totEl) totEl.textContent = formatINR(tot);
}

function initCalculator() {
  const inputs = ["amt", "rate", "ten", "mor"];
  inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", calculateEMI);
    }
  });

  // Initial calculation on page load
  calculateEMI();
}

// Export for module or global use
window.initCalculator = initCalculator;
window.calculateEMI = calculateEMI;
