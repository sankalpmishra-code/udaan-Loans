"use client";

import React, { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    course: "",
    amount: "3500000",
    loanType: "collateral-free",
    coApplicant: "salaried-parent",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const SHEET_URL = ""; // Optional: Paste your Google Apps Script Webhook URL

  // Helper to format live amount preview
  const formatAmountPreview = (num: number) => {
    if (!num) return "";
    if (num >= 1e7) {
      return `(₹${(num / 1e7).toFixed(2).replace(/\.?0+$/, "")} Crore)`;
    }
    return `(₹${(num / 1e5).toFixed(1).replace(/\.0$/, "")} Lakh)`;
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error immediately as user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.country) {
      errs.country = "Select your target study destination.";
    }
    const amt = Number(formData.amount);
    if (!amt || amt < 100000) {
      errs.amount = "Minimum loan amount is ₹1,00,000.";
    }
    if (!formData.consent) {
      errs.consent = "Please authorize lender matching to request your callback.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      if (SHEET_URL) {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            phone: formData.phone.replace(/\D/g, ""),
            email: formData.email,
            country: formData.country,
            course: formData.course,
            amount: formData.amount,
            loanType: formData.loanType,
            coApplicant: formData.coApplicant,
            source: typeof window !== "undefined" ? window.location.href : "Website",
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setServerError("Unable to transmit application. Please try again or reach our toll-free support.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success-card" role="status" tabIndex={-1}>
        <div className="success-icon">✓</div>
        <h3>Application Received, {formData.name.split(" ")[0]}!</h3>
        <p className="lead">
          Your loan profile has been prioritized. A Senior Education Loan Specialist will call you within
          <strong> 2 to 4 working hours</strong> to verify your documents and shortlist the lowest-interest bank offers.
        </p>
        <div className="next-steps-box">
          <h4>What to prepare next:</h4>
          <ul>
            <li>Keep a digital copy of your <strong>University Admit Letter</strong> or conditional offer ready.</li>
            <li>Have your co-applicant&apos;s last 3 months salary slips or latest 2 years ITR available.</li>
            <li>Our consultation, lender comparison, and loan assistance are <strong>100% free</strong>.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Sankalp Mishra"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            autoComplete="name"
            className={errors.name ? "input-err" : ""}
          />
          {errors.name && <span className="field-err">{errors.name}</span>}
        </div>

        {/* Mobile Number */}
        <div className="form-group">
          <label htmlFor="phone">Mobile Number *</label>
          <input
            id="phone"
            type="tel"
            placeholder="10-digit number (e.g. 9876543210)"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            autoComplete="tel"
            className={errors.phone ? "input-err" : ""}
          />
          {errors.phone && <span className="field-err">{errors.phone}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. sankalp@example.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="email"
            className={errors.email ? "input-err" : ""}
          />
          {errors.email && <span className="field-err">{errors.email}</span>}
        </div>

        {/* Target Country */}
        <div className="form-group">
          <label htmlFor="country">Target Country *</label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => updateField("country", e.target.value)}
            className={errors.country ? "input-err" : ""}
          >
            <option value="">Select study destination</option>
            <option value="United States">🇺🇸 United States (USA)</option>
            <option value="United Kingdom">🇬🇧 United Kingdom (UK)</option>
            <option value="Canada">🇨🇦 Canada</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="Australia">🇦🇺 Australia</option>
            <option value="Ireland">🇮🇪 Ireland</option>
            <option value="France">🇫🇷 France</option>
            <option value="Singapore">🇸🇬 Singapore</option>
            <option value="New Zealand">🇳🇿 New Zealand</option>
            <option value="Other">🌍 Other Global Destination</option>
          </select>
          {errors.country && <span className="field-err">{errors.country}</span>}
        </div>

        {/* University & Course */}
        <div className="form-group">
          <label htmlFor="course">Target University & Degree</label>
          <input
            id="course"
            type="text"
            placeholder="e.g. MS in Computer Science, Northeastern University"
            value={formData.course}
            onChange={(e) => updateField("course", e.target.value)}
          />
        </div>

        {/* Loan Amount */}
        <div className="form-group">
          <label htmlFor="amount">
            Estimated Loan Needed (₹) * <span style={{ color: "var(--brand)", fontWeight: "600" }}>{formatAmountPreview(Number(formData.amount))}</span>
          </label>
          <input
            id="amount"
            type="number"
            min="100000"
            step="50000"
            placeholder="e.g. 3500000"
            value={formData.amount}
            onChange={(e) => updateField("amount", e.target.value)}
            className={errors.amount ? "input-err" : ""}
          />
          {errors.amount && <span className="field-err">{errors.amount}</span>}
        </div>

        {/* Collateral Preference */}
        <div className="form-group">
          <label htmlFor="loanType">Loan Preference</label>
          <select
            id="loanType"
            value={formData.loanType}
            onChange={(e) => updateField("loanType", e.target.value)}
          >
            <option value="collateral-free">Collateral-Free Loan (Up to ₹75 Lakhs)</option>
            <option value="secured-property">Secured with Property / Flat (Lowest 7.5% Rate)</option>
            <option value="secured-fd">Secured with Fixed Deposit / Mutual Funds</option>
            <option value="undecided">Not Sure / Want Advisor Recommendation</option>
          </select>
        </div>

        {/* Co-applicant Profile */}
        <div className="form-group">
          <label htmlFor="coApplicant">Co-Applicant Status</label>
          <select
            id="coApplicant"
            value={formData.coApplicant}
            onChange={(e) => updateField("coApplicant", e.target.value)}
          >
            <option value="salaried-parent">Salaried Parent / Guardian</option>
            <option value="business-parent">Self-Employed / Business Owner</option>
            <option value="sibling-spouse">Sibling or Spouse Working</option>
            <option value="no-cosigner">Looking for No-Cosigner Loan (US/Canada)</option>
          </select>
        </div>

        {/* Consent Checkbox */}
        <div className="form-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
            />
            <span>
              I authorize Udaan Loans to contact me via phone, WhatsApp, and email, and to share my
              profile strictly with authorized RBI-partnered banks & NBFCs to process my loan quotes.
            </span>
          </label>
          {errors.consent && <span className="field-err">{errors.consent}</span>}
        </div>

        {serverError && (
          <div className="form-group full-width">
            <p className="server-err">{serverError}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-group full-width">
          <button
            type="submit"
            className="btn btn-accent full-width submit-btn"
            disabled={submitting}
          >
            {submitting ? "Processing Application..." : "Request Free Loan Assessment & Callback →"}
          </button>
          <p className="form-security-note">
            🔒 256-Bit SSL Encrypted. No upfront fees. Zero negative impact on your CIBIL score.
          </p>
        </div>
      </div>
    </form>
  );
}
