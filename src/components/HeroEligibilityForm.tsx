"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getStoredAttribution, trackLeadSubmission } from "@/lib/analytics";

export default function HeroEligibilityForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    country: "United States",
    degreeLevel: "Master's",
    amount: "3500000",
    admitStatus: "Have Confirmed Admit",
    coApplicant: "Salaried Parent",
    name: "",
    phone: "",
    email: "",
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.country) errs.country = "Please select a destination country.";
    if (!formData.degreeLevel) errs.degreeLevel = "Please select your degree level.";
    if (!formData.amount) errs.amount = "Please select an estimated loan amount.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.consent) {
      errs.consent = "Please authorize consultation to proceed.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateStep2()) return;

    setSubmitting(true);
    try {
      const attribution = getStoredAttribution();

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "Hero Loan Options Assessment",
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ""),
          email: formData.email.trim(),
          country: formData.country,
          course: formData.degreeLevel,
          amount: formData.amount,
          loanType: "Eligibility Assessment",
          coApplicant: formData.coApplicant,
          partnerRef: attribution.partnerRef || "",
          utmSource: attribution.utm_source || "",
          utmMedium: attribution.utm_medium || "",
          utmCampaign: attribution.utm_campaign || "",
          utmTerm: attribution.utm_term || "",
          utmContent: attribution.utm_content || "",
          gclid: attribution.gclid || "",
          landingPage: typeof window !== "undefined" ? window.location.pathname : "/",
          sourceName: "Homepage Hero Form",
          sourceUrl: typeof window !== "undefined" ? window.location.href : "Homepage Hero",
          additionalNotes: `Admission Status: ${formData.admitStatus}. Co-Applicant: ${formData.coApplicant}.`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit assessment request");
      }

      // Track conversion event for GA4 & Google Ads
      trackLeadSubmission("Hero Loan Options Assessment", {
        country: formData.country,
        amount: formData.amount,
        degree: formData.degreeLevel,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setServerError("Unable to transmit your request. Please try again or connect via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="card"
        style={{
          background: "var(--surface)",
          padding: "36px 28px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          border: "2px solid var(--brand)",
          textAlign: "center",
        }}
        role="status"
        aria-live="polite"
      >
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
        <h3 style={{ fontSize: "1.45rem", marginBottom: "8px", color: "var(--brand)" }}>
          Assessment Initiated, {formData.name.split(" ")[0]}!
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: "1.6", marginBottom: "20px" }}>
          We have recorded your study plans for <strong>{formData.country}</strong>. A Senior Education Loan Advisor will review your profile and reach out via Call or WhatsApp within <strong>2 to 4 business hours</strong>.
        </p>

        <div
          style={{
            background: "var(--soft)",
            padding: "16px",
            borderRadius: "var(--radius-md)",
            textAlign: "left",
            fontSize: "0.85rem",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "8px", color: "var(--ink)" }}>Next Steps for Fast Sanction:</div>
          <ul style={{ paddingLeft: "18px", margin: 0, color: "var(--ink-secondary)", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li>Keep your university admit letter or conditional offer handy.</li>
            <li>Have last 6 months bank statements of your co-applicant ready.</li>
            <li>Zero upfront or consultation fees will ever be requested.</li>
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a
            href={`https://wa.me/917303200803?text=Hi%20Udaan,%20I%20just%20submitted%20my%20loan%20assessment%20for%20${encodeURIComponent(
              formData.country
            )}%20(${formData.degreeLevel},%20₹${Math.round(Number(formData.amount) / 100000)}L).%20Please%20fast-track%20my%20options.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary full-width"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <span>💬</span> Message Senior Advisor on WhatsApp
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
            }}
            className="btn btn-outline full-width"
            style={{ fontSize: "0.88rem" }}
          >
            Evaluate Another Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card hero-form-card"
      style={{
        background: "var(--surface)",
        padding: "24px 22px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--line)",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span
            className="badge"
            style={{
              background: currentStep === 1 ? "var(--brand)" : "var(--success)",
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "3px 8px",
            }}
          >
            {currentStep === 1 ? "Step 1 of 2: Study Plan" : "Step 2 of 2: Contact Delivery"}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
            {currentStep === 1 ? "50% Complete" : "Almost Done!"}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div style={{ height: "4px", background: "var(--soft)", borderRadius: "2px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: currentStep === 1 ? "50%" : "100%",
              background: "var(--brand)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <h3 style={{ fontSize: "1.25rem", marginTop: "12px", marginBottom: "4px", color: "var(--ink)" }}>
          {currentStep === 1 ? "Check Study Abroad Loan Options" : "Where Should We Send Your Options?"}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: 0 }}>
          {currentStep === 1
            ? "Compare 30+ RBI-recognized banks & NBFCs with zero CIBIL impact."
            : "Receive an instant breakdown of public, private & NBFC options."}
        </p>
      </div>

      {serverError && (
        <div
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.82rem",
            marginBottom: "14px",
          }}
        >
          {serverError}
        </div>
      )}

      {/* STEP 1: Study & Funding Plans */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} noValidate>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-country" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                Target Country *
              </label>
              <select
                id="hero-country"
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
                style={{ padding: "9px 10px", fontSize: "0.9rem" }}
              >
                <option value="United States">United States (USA)</option>
                <option value="United Kingdom">United Kingdom (UK)</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
                <option value="Ireland">Ireland</option>
                <option value="France">France</option>
                <option value="Other Country">Other Country</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-degree" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                Degree Level *
              </label>
              <select
                id="hero-degree"
                value={formData.degreeLevel}
                onChange={(e) => updateField("degreeLevel", e.target.value)}
                style={{ padding: "9px 10px", fontSize: "0.9rem" }}
              >
                <option value="Master's">Master&apos;s (MS / MA)</option>
                <option value="MBA / PGDM">MBA / Management</option>
                <option value="STEM MS">STEM Master&apos;s</option>
                <option value="Bachelor's">Undergraduate (UG)</option>
                <option value="Doctorate">PhD / Doctorate</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-amount" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                Desired Loan Amount *
              </label>
              <select
                id="hero-amount"
                value={formData.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                style={{ padding: "9px 10px", fontSize: "0.9rem" }}
              >
                <option value="2000000">₹20 Lakhs</option>
                <option value="3500000">₹35 Lakhs</option>
                <option value="5000000">₹50 Lakhs (Popular)</option>
                <option value="7500000">₹75 Lakhs</option>
                <option value="10000000">₹1.0+ Crore</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-admit" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                Admit Status *
              </label>
              <select
                id="hero-admit"
                value={formData.admitStatus}
                onChange={(e) => updateField("admitStatus", e.target.value)}
                style={{ padding: "9px 10px", fontSize: "0.9rem" }}
              >
                <option value="Have Confirmed Admit">Have Confirmed Admit</option>
                <option value="Applied, Awaiting Admit">Applied, Awaiting</option>
                <option value="Planning for 2026/2027">Planning Early</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-accent full-width"
            style={{ padding: "13px", fontSize: "1rem", fontWeight: 700, marginTop: "6px" }}
          >
            Continue to Matching Lenders →
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              marginTop: "12px",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            <span>🔒 Zero CIBIL Impact</span>
            <span>•</span>
            <span>⚡ 30+ Banks &amp; NBFCs</span>
            <span>•</span>
            <span>🆓 100% Free</span>
          </div>
        </form>
      )}

      {/* STEP 2: Contact Details & Consent */}
      {currentStep === 2 && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: "11px" }}>
            <label htmlFor="hero-name" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Student Full Name *
            </label>
            <input
              id="hero-name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              style={{ padding: "9px 12px", fontSize: "0.9rem" }}
              autoFocus
            />
            {errors.name && (
              <span style={{ fontSize: "0.76rem", color: "var(--danger)", marginTop: "2px", display: "block" }}>
                {errors.name}
              </span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px", marginBottom: "11px" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-phone" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                WhatsApp Number *
              </label>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    background: "var(--soft)",
                    border: "1px solid var(--line)",
                    borderRight: "none",
                    padding: "9px 8px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                    color: "var(--ink)",
                  }}
                >
                  +91
                </span>
                <input
                  id="hero-phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    padding: "9px 10px",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              {errors.phone && (
                <span style={{ fontSize: "0.76rem", color: "var(--danger)", marginTop: "2px", display: "block" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="hero-email" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                Email *
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder="e.g. rahul@mail.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                style={{ padding: "9px 10px", fontSize: "0.9rem" }}
              />
              {errors.email && (
                <span style={{ fontSize: "0.76rem", color: "var(--danger)", marginTop: "2px", display: "block" }}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label htmlFor="hero-coapplicant" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Co-Applicant Financial Profile *
            </label>
            <select
              id="hero-coapplicant"
              value={formData.coApplicant}
              onChange={(e) => updateField("coApplicant", e.target.value)}
              style={{ padding: "9px 10px", fontSize: "0.9rem" }}
            >
              <option value="Salaried Parent">Salaried Parent (ITR filed)</option>
              <option value="Self-Employed / Business Parent">Business / Self-Employed Parent</option>
              <option value="Sibling / Spouse">Sibling / Spouse Co-Borrower</option>
              <option value="No Co-Applicant (Masters)">No Co-Applicant (Checking for MS)</option>
            </select>
          </div>

          {/* Consent Checkbox */}
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "14px" }}>
            <input
              type="checkbox"
              id="hero-consent"
              checked={formData.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
              style={{ marginTop: "3px" }}
            />
            <label htmlFor="hero-consent" style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: "1.35" }}>
              I authorize Udaan Edu Loans to share matching lender options via Call or WhatsApp. Zero brokerage charged. View{" "}
              <Link href="/privacy" style={{ textDecoration: "underline", color: "var(--brand)" }}>
                Privacy
              </Link>
              .
            </label>
          </div>
          {errors.consent && (
            <span style={{ fontSize: "0.76rem", color: "var(--danger)", marginTop: "-10px", marginBottom: "10px", display: "block" }}>
              {errors.consent}
            </span>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px" }}>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="btn btn-outline"
              style={{ padding: "12px 14px", fontSize: "0.9rem" }}
              disabled={submitting}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-accent"
              style={{ padding: "12px", fontSize: "0.98rem", fontWeight: 700 }}
            >
              {submitting ? "Analyzing Match..." : "Unlock 30+ Lender Options →"}
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "0.74rem", color: "var(--muted)" }}>
            🛡️ Your information is strictly protected and never shared with unauthorized parties.
          </div>
        </form>
      )}
    </div>
  );
}
