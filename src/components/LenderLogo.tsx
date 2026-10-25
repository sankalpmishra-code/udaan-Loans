"use client";

import React, { useState } from "react";
import { getLenderLogo } from "@/utils/lenderLogos";

interface LenderLogoProps {
  name: string;
  logo?: string;
  width?: number | string;
  height?: number | string;
  variant?: "badge" | "plain" | "tile";
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export default function LenderLogo({
  name,
  logo,
  width,
  height = 32,
  variant = "badge",
  className = "",
  style = {},
  imgStyle = {},
}: LenderLogoProps) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = logo || getLenderLogo(name);
  const heightVal = typeof height === "number" ? `${height}px` : height;

  if (imgError) {
    return (
      <div
        className={`lender-logo-fallback ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          padding: "4px 10px",
          fontWeight: 700,
          fontSize: "0.82rem",
          color: "var(--ink-primary)",
          letterSpacing: "0.01em",
          height: heightVal,
          minWidth: "90px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          ...style,
        }}
      >
        {name}
      </div>
    );
  }

  if (variant === "plain") {
    return (
      <img
        src={logoUrl}
        alt={`${name} official logo`}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setImgError(true)}
        className={className}
        style={{
          display: "inline-block",
          height: heightVal,
          width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
          maxWidth: "160px",
          objectFit: "contain",
          verticalAlign: "middle",
          ...imgStyle,
        }}
      />
    );
  }

  if (variant === "tile") {
    return (
      <div
        className={`lender-logo-tile ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
          padding: "8px 14px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          minWidth: "140px",
          height: "54px",
          ...style,
        }}
      >
        <img
          src={logoUrl}
          alt={`${name} official logo`}
          width={width}
          height={height}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            height: heightVal,
            width: "auto",
            maxWidth: "150px",
            objectFit: "contain",
            ...imgStyle,
          }}
        />
      </div>
    );
  }

  // Default "badge" variant
  return (
    <div
      className={`lender-logo-badge ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        padding: "4px 8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={logoUrl}
        alt={`${name} official logo`}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setImgError(true)}
        style={{
          height: heightVal,
          width: "auto",
          maxWidth: "140px",
          objectFit: "contain",
          display: "block",
          ...imgStyle,
        }}
      />
    </div>
  );
}
