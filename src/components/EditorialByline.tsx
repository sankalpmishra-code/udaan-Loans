import React from "react";
import Link from "next/link";

interface EditorialBylineProps {
  lastUpdated?: string;
  reviewerName?: string;
  reviewerTitle?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EditorialByline({
  lastUpdated = "October 2026",
  reviewerName = "Udaan Overseas Financial Advisory Board",
  reviewerTitle = "Certified Education Finance Specialists",
  className = "",
  style = {},
}: EditorialBylineProps) {
  return (
    <aside
      className={`editorial-trust-byline ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderLeft: "4px solid var(--brand)",
        borderRadius: "var(--radius-md)",
        padding: "14px 18px",
        margin: "24px 0 32px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
      aria-label="Editorial Verification and Accuracy Standards"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "var(--soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            flexShrink: 0,
          }}
        >
          🛡️
        </div>
        <div>
          <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--ink)" }}>
            Fact-Checked &amp; Reviewed by {reviewerName}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            {reviewerTitle} • Reflecting current RBI Repo Rate, EBLR spreads &amp; lender circulars
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.78rem", color: "var(--ink-secondary)" }}>
        <span>
          <strong>Last Verified:</strong> {lastUpdated}
        </span>
        <span>•</span>
        <Link href="/about" style={{ textDecoration: "underline", color: "var(--brand)" }}>
          Editorial Standards
        </Link>
      </div>
    </aside>
  );
}
