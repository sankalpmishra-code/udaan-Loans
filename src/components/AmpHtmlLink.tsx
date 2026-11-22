import React from "react";
import { siteConfig } from "@/data/siteConfig";

interface AmpHtmlLinkProps {
  /**
   * Relative path for the AMP counterpart (e.g. "/amp" or "/amp/calculator")
   */
  ampPath?: string;
}

/**
 * AmpHtmlLink
 * Injects <link rel="amphtml" href="..."> for Google & mobile search bots.
 * In React 19 / Next.js 16, this link tag is automatically hoisted into document <head>.
 */
export default function AmpHtmlLink({ ampPath = "/amp" }: AmpHtmlLinkProps) {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = ampPath.startsWith("/") ? ampPath : `/${ampPath}`;
  const fullAmpUrl = `${baseUrl}${normalizedPath}`;

  return <link rel="amphtml" href={fullAmpUrl} />;
}
