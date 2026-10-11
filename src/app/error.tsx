"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="hero" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <div className="card text-center" style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 32px" }}>
          <span className="badge" style={{ background: "#fee2e2", color: "var(--danger)" }}>
            Application Error
          </span>
          <h1 style={{ fontSize: "2.4rem", margin: "14px 0" }}>
            Something Went Wrong
          </h1>
          <p className="lead" style={{ maxWidth: "520px", margin: "0 auto 28px" }}>
            We encountered an unexpected technical issue. Don&apos;t worry, your loan data and application state are secure.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => reset()}
            >
              Try Reloading Page
            </button>
            <Link href="/" className="btn btn-outline">
              Go to Home Page
            </Link>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Need urgent help? Call our student helpline at <a href={`tel:${siteConfig.phoneNumbers[0].replace(/\s+/g, "")}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.phoneNumbers[0]}</a> / <a href={`tel:${siteConfig.phoneNumbers[1].replace(/\s+/g, "")}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.phoneNumbers[1]}</a> or email <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--brand)", fontWeight: "700" }}>{siteConfig.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
