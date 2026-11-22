"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { trackWhatsAppClick, trackLeadSubmission, getStoredAttribution } from "@/lib/analytics";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States");
  const [degree, setDegree] = useState("Master's");
  const [amount, setAmount] = useState("₹40 Lakhs");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathname = usePathname();

  // Listen for clicks on elements with data-whatsapp-trigger or custom open events
  useEffect(() => {
    const handleGlobalTrigger = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-whatsapp-trigger]");
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    document.addEventListener("click", handleGlobalTrigger);
    window.addEventListener("open-whatsapp-widget", handleOpenEvent);

    return () => {
      document.removeEventListener("click", handleGlobalTrigger);
      window.removeEventListener("open-whatsapp-widget", handleOpenEvent);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string; consent?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your name.";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!consent) {
      newErrors.consent = "Please authorize contact on WhatsApp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const cleanPhone = phone.replace(/\D/g, "");
    const attribution = getStoredAttribution();

    // 1. Ingest lead to Google Sheet & internal alert API
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "WhatsApp Chat Lead",
          name: name.trim(),
          phone: cleanPhone,
          email: "",
          country,
          course: degree,
          amount,
          loanType: "WhatsApp Consultation",
          partnerRef: attribution.partnerRef || "",
          utmSource: attribution.utm_source || "",
          utmMedium: attribution.utm_medium || "",
          utmCampaign: attribution.utm_campaign || "",
          utmTerm: attribution.utm_term || "",
          utmContent: attribution.utm_content || "",
          gclid: attribution.gclid || "",
          landingPage: pathname,
          sourceName: `WhatsApp Widget (${pathname})`,
          sourceUrl: typeof window !== "undefined" ? window.location.href : pathname,
          additionalNotes: `Direct WhatsApp Chat initiated. Target: ${country} | Program: ${degree} | Amount: ${amount}`,
        }),
      });
    } catch (err) {
      console.warn("Unable to sync lead to API:", err);
    }

    // 2. Track conversion events for GA4 and Google Ads
    trackWhatsAppClick(pathname, country);
    trackLeadSubmission("WhatsApp Chat Lead", {
      country,
      amount,
      degree,
    });

    // 3. Build personalized prefilled query with student details
    const message = encodeURIComponent(
      `Hi Udaan Edu Loans, my name is ${name.trim()}.\n\n` +
      `I need guidance on study abroad education loans:\n` +
      `• Destination: ${country}\n` +
      `• Program: ${degree}\n` +
      `• Estimated Loan: ${amount}\n` +
      `• Mobile / WhatsApp: +91 ${cleanPhone}\n` +
      `• Referral Source: ${pathname}\n\n` +
      `Please connect me with an education loan specialist.`
    );

    const whatsappNumber = siteConfig.whatsappNumber || "917303200803";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;

    // 4. Open WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-floating-container">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          type="button"
          className="whatsapp-fab"
          aria-label="Chat with Loan Advisor on WhatsApp"
          onClick={() => setIsOpen(true)}
        >
          <span className="online-indicator"></span>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.42-.101.825z" />
          </svg>
          <span className="fab-label">Chat with Advisor</span>
        </button>
      )}

      {/* WhatsApp Modal Dialog */}
      {isOpen && (
        <div className="whatsapp-card" role="dialog" aria-modal="true" aria-labelledby="wa-heading">
          <div className="wa-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="wa-avatar">
                👨‍💼
                <span className="online-dot" />
              </div>
              <div>
                <h3 id="wa-heading" style={{ fontSize: "1.05rem", color: "#fff", margin: "0" }}>
                  Overseas Loan Advisor
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#d1fae5" }}>
                  Typically replies in &lt;15 mins
                </span>
              </div>
            </div>
            <button
              type="button"
              className="wa-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat dialog"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleOpenWhatsApp} className="wa-body">
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: "0 0 12px", lineHeight: "1.4" }}>
              Enter your details to initiate instant WhatsApp advisory with a senior specialist:
            </p>

            <div className="wa-field">
              <label htmlFor="wa-name">Student Full Name *</label>
              <input
                id="wa-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                autoFocus
              />
              {errors.name && <span className="wa-field-error">{errors.name}</span>}
            </div>

            <div className="wa-field">
              <label htmlFor="wa-phone">WhatsApp Number *</label>
              <div className="wa-phone-group">
                <span className="wa-phone-prefix">+91</span>
                <input
                  id="wa-phone"
                  type="tel"
                  className="wa-phone-input"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                />
              </div>
              {errors.phone && <span className="wa-field-error">{errors.phone}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div className="wa-field">
                <label htmlFor="wa-country">Target Destination</label>
                <select
                  id="wa-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="United States">🇺🇸 USA</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="United Kingdom">🇬🇧 UK</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="Ireland">🇮🇪 Ireland</option>
                  <option value="Other">🌍 Other</option>
                </select>
              </div>

              <div className="wa-field">
                <label htmlFor="wa-amount">Estimated Loan</label>
                <select
                  id="wa-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                >
                  <option value="₹25 Lakhs">Up to ₹25L</option>
                  <option value="₹40 Lakhs">₹25L - ₹50L</option>
                  <option value="₹75 Lakhs">₹50L - ₹75L</option>
                  <option value="₹1 Crore+">₹75L - ₹1.5Cr+</option>
                </select>
              </div>
            </div>

            <div className="wa-field">
              <label htmlFor="wa-degree">Degree Level</label>
              <select
                id="wa-degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
                <option value="Master's (MS/MTech)">STEM Master&apos;s</option>
                <option value="MBA / Management">MBA / Business</option>
                <option value="Bachelor's (UG)">Undergraduate (UG)</option>
                <option value="Healthcare / MBBS">Healthcare / MBBS</option>
              </select>
            </div>

            <div className="wa-consent-box">
              <label className="checkbox-label" style={{ fontSize: "0.78rem" }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked && errors.consent) {
                      setErrors((prev) => ({ ...prev, consent: undefined }));
                    }
                  }}
                />
                <span>
                  I authorize Udaan Edu Loans to connect with me on WhatsApp. Zero spam.
                </span>
              </label>
              {errors.consent && <span className="wa-field-error">{errors.consent}</span>}
            </div>

            <button type="submit" className="wa-start-btn" disabled={isSubmitting}>
              <span>💬</span>
              <span>{isSubmitting ? "Connecting to WhatsApp..." : "Start WhatsApp Chat"}</span> →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
