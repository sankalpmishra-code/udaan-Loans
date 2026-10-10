/**
 * Udaan Loans - Main Application Entrypoint
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the EMI calculator
  if (typeof window.initCalculator === "function") {
    window.initCalculator();
  }

  // Initialize the lead capture form
  if (typeof window.initApplicationForm === "function") {
    window.initApplicationForm();
  }

  console.log("Udaan Loans application initialized successfully.");
});
