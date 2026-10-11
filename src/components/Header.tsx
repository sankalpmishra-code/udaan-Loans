"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Bank Matcher", href: "/match" },
    { name: "Universities", href: "/universities" },
    { name: "Loans", href: "/loans" },
    { name: "EMI Calc", href: "/calculator" },
    { name: "80E Tax", href: "/tax-calculator" },
    { name: "Lenders", href: "/lenders" },
    { name: "Partners", href: "/partners" },
    { name: "About", href: "/about" },
  ];

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-wrap">
        <Link href="/" className="logo brand-logo-flex" aria-label="Udaan Edu Loans Home">
          <svg
            className="brand-icon-svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#094754" />
            <path d="M16 7L26 12L16 17L6 12Z" fill="#F59E0B" />
            <path d="M9 14V21C9 21 12 24 16 24C20 24 23 21 23 21V14" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M26 12V18" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>
            Udaan <span style={{ color: "var(--brand-light, #48bbcc)" }}>Edu</span> Loans
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : ""}
              >
                {link.name}
              </Link>
            );
          })}
          <Link href="/apply" className="btn btn-accent nav-cta">
            Check Eligibility
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? "open-1" : ""}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? "open-2" : ""}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? "open-3" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Drawer & Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-drawer" id="mobile-nav-drawer">
            <nav aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={isActive ? "active-mobile" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/apply"
                className="btn btn-accent full-width"
                style={{ marginTop: "12px" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Check Loan Eligibility
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
