"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Loans", href: "/loans" },
    { name: "EMI Calculator", href: "/calculator" },
    { name: "Destinations", href: "/destinations" },
    { name: "Lenders", href: "/lenders" },
    { name: "Eligibility", href: "/eligibility" },
    { name: "Process", href: "/process" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="site-header">
      <div className="wrap header-wrap">
        <Link href="/" className="logo" aria-label="Udaan Loans Home">
          Udaan<span>.</span>Loans
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
          <Link href="/apply" className="btn btn-accent">
            Check Eligibility
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              className="btn btn-accent full-width"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
