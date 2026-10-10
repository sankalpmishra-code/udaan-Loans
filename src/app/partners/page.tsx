"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PartnersPage() {
  const [agencyName, setAgencyName] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Consultant Onboarding Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    agency: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    monthlyStudents: "10-25",
  });

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = (partnerCode || agencyName)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    
    if (cleanCode) {
      const link = `https://udaanloans.com/apply?ref=${cleanCode}`;
      setGeneratedLink(link);
      setCopied(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const [submittingPartner, setSubmittingPartner] = useState(false);
  const [partnerError, setPartnerError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerError("");
    setSubmittingPartner(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "Partner Registration",
          agency: formData.agency,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ""),
          city: formData.city,
          monthlyStudents: formData.monthlyStudents,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "/partners",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit partner application");
      }

      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
      setPartnerError("Unable to submit registration. Please try again or message our partnership desk on WhatsApp.");
    } finally {
      setSubmittingPartner(false);
    }
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Partner Program", url: "/partners" }]} />

      {/* Hero Section */}
      <section className="hero" style={{ padding: "40px 0 50px" }}>
        <div className="wrap">
          <div className="section-head text-center">
            <span className="badge">Managed Consultant Referral Pilot</span>
            <h1>Study Abroad Consultant & Counselor Partner Program</h1>
            <p className="lead" style={{ maxWidth: "780px", margin: "0 auto" }}>
              Help your overseas study applicants secure the fastest education loan sanctions from 30+ RBI-recognized banks & NBFCs. Zero cost to students, dedicated relationship managers, and transparent CRM tracking.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="stats-grid" style={{ marginTop: "32px" }}>
            <div className="card text-center" style={{ padding: "20px" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#094754" }}>30+</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Partnering Banks & NBFCs</div>
            </div>
            <div className="card text-center" style={{ padding: "20px" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#059669" }}>100% Free</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Zero Fees for Students or Counselors</div>
            </div>
            <div className="card text-center" style={{ padding: "20px" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#094754" }}>&lt; 15 Mins</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Lead Response Time SLA</div>
            </div>
            <div className="card text-center" style={{ padding: "20px" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#d97706" }}>RBI Compliant</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Formal LSP Agreements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Link Generator & Value Proposition */}
      <section className="section-alt" style={{ padding: "50px 0 60px" }}>
        <div className="wrap">
          <div className="grid-2">
            {/* Value Proposition */}
            <div className="card">
              <span className="badge badge-accent">Why Partner With Udaan</span>
              <h2 style={{ fontSize: "1.45rem", marginTop: "10px" }}>
                Solve Your Students&apos; Financial Clearance Headache
              </h2>
              <p style={{ color: "#64748b", margin: "10px 0 16px" }}>
                Over 35% of study abroad admits delay or forfeit their admissions due to slow bank processing, complex collateral valuation, or lack of liquid funds for I-20 and visa deadlines.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem" }}>⚡</span>
                  <div>
                    <strong>Parallel Multi-Lender Submissions:</strong> We evaluate student files simultaneously across public banks, private banks, and NBFCs to prevent single-lender rejection delays.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem" }}>🎯</span>
                  <div>
                    <strong>Visa Financial Compliance:</strong> We specialize in embassy-compliant pre-visa sanction letters, German blocked account deposits (€11,904), and UK 28-day rule exemptions.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem" }}>📊</span>
                  <div>
                    <strong>Transparent Status Attribution:</strong> Track every referred student from dossier collection to final loan sanction via regular WhatsApp and email updates.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem" }}>⚖️</span>
                  <div>
                    <strong>Strict Regulatory Safety:</strong> Full adherence to the RBI Digital Lending Directions 2025 and DPDP Act 2025.
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Referral Link Generator */}
            <div className="card" style={{ background: "#fff", border: "2px solid #094754" }}>
              <span className="badge">Instant Tool for Registered Partners</span>
              <h2 style={{ fontSize: "1.45rem", marginTop: "10px" }}>
                Generate Your Agency Referral Link
              </h2>
              <p style={{ color: "#64748b", margin: "8px 0 16px", fontSize: "0.9rem" }}>
                Enter your consultancy name or counselor partner ID below to generate a custom tracking URL. When students submit applications through your link, they are automatically tagged in our CRM.
              </p>

              <form onSubmit={handleGenerateLink}>
                <div className="form-group" style={{ marginBottom: "14px" }}>
                  <label htmlFor="agency-code" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>
                    Agency Name or Custom Partner Code:
                  </label>
                  <input
                    id="agency-code"
                    type="text"
                    required
                    placeholder="e.g. EdWorld-Pune or GlobalPrep"
                    value={partnerCode}
                    onChange={(e) => setPartnerCode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      marginTop: "6px",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-accent full-width">
                  Generate Custom Tracking Link
                </button>
              </form>

              {generatedLink && (
                <div style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "8px",
                  background: "#f0fdf4",
                  border: "1px solid #86efac"
                }}>
                  <div style={{ fontSize: "0.82rem", color: "#166534", fontWeight: 700, marginBottom: "6px" }}>
                    ✓ Your Unique Partner Tracking Link:
                  </div>
                  <div style={{
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                    background: "#fff",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.88rem",
                    color: "#094754"
                  }}>
                    {generatedLink}
                  </div>
                  <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="btn btn-accent"
                      style={{ flex: 1, padding: "8px", fontSize: "0.85rem" }}
                    >
                      {copied ? "✓ Copied to Clipboard!" : "Copy Link"}
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Check your abroad education loan eligibility with Udaan Loans: ${generatedLink}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ flex: 1, textAlign: "center", padding: "8px", fontSize: "0.85rem", background: "#25D366", color: "#fff", borderColor: "#25D366" }}
                    >
                      Share via WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Registration Form */}
      <section style={{ padding: "50px 0 60px" }}>
        <div className="wrap">
          <div className="card" style={{ maxWidth: "760px", margin: "0 auto", padding: "36px" }}>
            <div className="section-head text-center" style={{ marginBottom: "24px" }}>
              <span className="badge">Join the Pilot</span>
              <h2>Register as a Consultant Partner</h2>
              <p className="lead" style={{ fontSize: "0.95rem" }}>
                Our partner alliances team will review your details, set up your dedicated CRM dashboard, and assign a dedicated relationship manager within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{
                background: "#f0fdf4",
                padding: "24px",
                borderRadius: "10px",
                border: "1px solid #86efac",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
                <h3 style={{ color: "#166534", marginBottom: "6px" }}>Consultancy Application Received!</h3>
                <p style={{ color: "#15803d", fontSize: "0.92rem", margin: 0 }}>
                  Thank you, <strong>{formData.contactPerson}</strong>. Our Head of Institutional Alliances will reach out at <strong>{formData.phone}</strong> / <strong>{formData.email}</strong> to activate your partner agreement and dedicated advisory queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="grid-2" style={{ gap: "16px" }}>
                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Agency / Firm Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Education Pvt Ltd"
                      value={formData.agency}
                      onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Primary Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra (Director)"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Official Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="advising@apexeducation.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Direct WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Operating City / Headquarters *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Pune, Bangalore, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Expected Monthly Student Inquiries</label>
                    <select
                      value={formData.monthlyStudents}
                      onChange={(e) => setFormData({ ...formData, monthlyStudents: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
                    >
                      <option value="5-10">5 – 10 students / month</option>
                      <option value="10-25">10 – 25 students / month</option>
                      <option value="25-50">25 – 50 students / month</option>
                      <option value="50+">50+ students / month</option>
                    </select>
                  </div>
                </div>

                {partnerError && (
                  <div style={{ marginTop: "14px", color: "var(--danger)", fontSize: "0.88rem" }}>
                    ⚠️ {partnerError}
                  </div>
                )}

                <div style={{ marginTop: "20px" }}>
                  <button
                    type="submit"
                    className="btn btn-accent full-width"
                    style={{ padding: "12px", fontSize: "1rem" }}
                    disabled={submittingPartner}
                  >
                    {submittingPartner ? "Registering Agency..." : "Submit Partner Registration →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
