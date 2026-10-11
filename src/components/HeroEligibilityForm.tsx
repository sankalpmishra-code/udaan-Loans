"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getStoredAttribution, trackLeadSubmission } from "@/lib/analytics";

export default function HeroEligibilityForm() {
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

  const validate = () => {
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

    if (!validate()) return;

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
            padding: "16px 20px",
            borderRadius: "8px",
            textAlign: "left",
            fontSize: "0.88rem",
            marginBottom: "24px",
            borderLeft: "4px solid var(--accent)",
          }}
        >
          <strong>What happens next?</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: "18px", lineHeight: "1.6" }}>
            <li>We evaluate bank underwriting rules across public banks, private banks, and NBFCs.</li>
            <li>We assist with document preparation and loan file positioning.</li>
            <li>Our student guidance and comparison service is <strong>100% free</strong>.</li>
          </ul>
        </div>

        <Link
          href={`/match?country=${encodeURIComponent(formData.country)}&amount=${formData.amount}&degree=${encodeURIComponent(formData.degreeLevel)}`}
          className="btn btn-accent full-width"
          style={{ padding: "12px 20px", fontSize: "1rem" }}
        >
          View Instant Preliminary Match Breakdown →
        </Link>
      </div>
    );
  }

  return (
    <div
      className="card hero-form-card"
      style={{
        background: "var(--surface)",
        padding: "32px 28px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 20px 40px -15px rgba(9, 71, 84, 0.18)",
        border: "1px solid rgba(9, 71, 84, 0.12)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span className="badge badge-accent" style={{ fontSize: "0.78rem", margin: 0 }}>
            Quick 60-Second Check
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: "600" }}>
            🛡️ Zero CIBIL Impact
          </span>
        </div>
        <h3 style={{ fontSize: "1.35rem", margin: "6px 0 4px", color: "var(--ink)", fontWeight: 800 }}>
          Check Your Education Loan Options
        </h3>
        <p style={{ fontSize: "0.86rem", color: "var(--muted)", margin: 0 }}>
          Explore potential secured and collateral-free loan options for your study abroad plans.
        </p>
      </div>

      {serverError && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "10px 14px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            marginBottom: "16px",
          }}
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Destination & Degree Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="hero-country" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Study Destination *
            </label>
            <select
              id="hero-country"
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              style={{ padding: "10px 12px", fontSize: "0.9rem" }}
            >
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Ireland">🇮🇪 Ireland</option>
              <option value="France">🇫🇷 France</option>
              <option value="Other">🌍 Other Countries</option>
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
              style={{ padding: "10px 12px", fontSize: "0.9rem" }}
            >
              <option value="Master's">STEM Master&apos;s (MS/Tech)</option>
              <option value="MBA">MBA / Business</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="Health">Healthcare / Medicine</option>
              <option value="Other">PG Diploma / Certificate</option>
            </select>
          </div>
        </div>

        {/* Loan Amount & Admission Status Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="hero-amount" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Estimated Loan Needed *
            </label>
            <select
              id="hero-amount"
              value={formData.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              style={{ padding: "10px 12px", fontSize: "0.9rem" }}
            >
              <option value="2000000">₹20 Lakhs</option>
              <option value="3500000">₹35 Lakhs</option>
              <option value="5000000">₹50 Lakhs</option>
              <option value="7500000">₹75 Lakhs</option>
              <option value="10000000">₹1 Crore</option>
              <option value="15000000">₹1.5 Crore</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="hero-admit" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Admission Status *
            </label>
            <select
              id="hero-admit"
              value={formData.admitStatus}
              onChange={(e) => updateField("admitStatus", e.target.value)}
              style={{ padding: "10px 12px", fontSize: "0.9rem" }}
            >
              <option value="Have Confirmed Admit">Have Confirmed Admit</option>
              <option value="Awaiting Decision">Awaiting University Result</option>
              <option value="Planning / Exploring">Planning / Need Pre-Sanction</option>
            </select>
          </div>
        </div>

        {/* Student Contact Info */}
        <div className="form-group" style={{ marginBottom: "12px" }}>
          <label htmlFor="hero-name" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
            Student Full Name *
          </label>
          <input
            id="hero-name"
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            style={{ padding: "10px 12px", fontSize: "0.92rem" }}
          />
          {errors.name && (
            <span style={{ fontSize: "0.78rem", color: "var(--danger)", marginTop: "3px", display: "block" }}>
              {errors.name}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="hero-phone" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Mobile Number *
            </label>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  background: "var(--soft)",
                  border: "1px solid var(--line)",
                  borderRight: "none",
                  padding: "10px 10px",
                  fontSize: "0.88rem",
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
                  padding: "10px 12px",
                  fontSize: "0.92rem",
                }}
              />
            </div>
            {errors.phone && (
              <span style={{ fontSize: "0.78rem", color: "var(--danger)", marginTop: "3px", display: "block" }}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="hero-email" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Email Address *
            </label>
            <input
              id="hero-email"
              type="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              style={{ padding: "10px 12px", fontSize: "0.92rem" }}
            />
            {errors.email && (
              <span style={{ fontSize: "0.78rem", color: "var(--danger)", marginTop: "3px", display: "block" }}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "18px" }}>
          <input
            type="checkbox"
            id="hero-consent"
            checked={formData.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            style={{ marginTop: "3px" }}
          />
          <label htmlFor="hero-consent" style={{ fontSize: "0.76rem", color: "var(--muted)", lineHeight: "1.4" }}>
            I authorize Udaan Edu Loans to contact me via Call or WhatsApp regarding my study abroad loan options. View our{" "}
            <Link href="/privacy" style={{ textDecoration: "underline", color: "var(--brand)" }}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" style={{ textDecoration: "underline", color: "var(--brand)" }}>
              Terms
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <span style={{ fontSize: "0.78rem", color: "var(--danger)", marginTop: "-12px", marginBottom: "12px", display: "block" }}>
            {errors.consent}
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-accent full-width"
          style={{ padding: "14px", fontSize: "1.05rem", fontWeight: 700 }}
        >
          {submitting ? "Analyzing Loan Options..." : "Check My Loan Options →"}
        </button>

        <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.78rem", color: "var(--muted)" }}>
          🔒 100% Virtual & Paperless • Lenders independently determine eligibility and terms.
        </div>
      </form>
    </div>
  );
}
