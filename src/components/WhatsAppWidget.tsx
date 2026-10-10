"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("United States");
  const [degree, setDegree] = useState("Master's");
  const [amount, setAmount] = useState("₹40 Lakhs");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const pathname = usePathname();

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    // Build prefilled query with page attribution
    const message = encodeURIComponent(
      `Hi Udaan Loans, I need guidance on study abroad education loans.\n\n` +
      `• Destination: ${country}\n` +
      `• Program: ${degree}\n` +
      `• Estimated Loan: ${amount}\n` +
      `• Referral Source: ${pathname}\n\n` +
      `Please connect me with a loan advisor.`
    );

    const whatsappNumber = "9118005728326"; // Replace with verified WhatsApp Business number
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(url, "_blank", "noopener,noreferrer");
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
            <p style={{ fontSize: "0.86rem", color: "var(--ink-secondary)", margin: "0 0 12px" }}>
              Connect directly with a Senior Education Loan Specialist for instant lender eligibility advice:
            </p>

            <div className="wa-field">
              <label htmlFor="wa-country">Target Destination</label>
              <select
                id="wa-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="United States">🇺🇸 United States</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="Other">🌍 Other Destination</option>
              </select>
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

            <div className="wa-field">
              <label htmlFor="wa-amount">Estimated Loan Needed</label>
              <select
                id="wa-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value="₹25 Lakhs">Up to ₹25 Lakhs</option>
                <option value="₹40 Lakhs">₹25L - ₹50 Lakhs</option>
                <option value="₹75 Lakhs">₹50L - ₹75 Lakhs</option>
                <option value="₹1 Crore+">₹75L - ₹1.5 Crore+</option>
              </select>
            </div>

            <div className="wa-consent-box">
              <label className="checkbox-label" style={{ fontSize: "0.78rem" }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (e.target.checked) setConsentError(false);
                  }}
                />
                <span>
                  I consent to connect on WhatsApp for education loan advisory. No PII is shared.
                </span>
              </label>
              {consentError && (
                <div style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: "4px" }}>
                  Please check the box to proceed to WhatsApp.
                </div>
              )}
            </div>

            <button type="submit" className="wa-start-btn">
              <span>Start WhatsApp Chat</span> →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
