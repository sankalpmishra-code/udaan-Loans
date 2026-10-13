"use client";

import { useEffect } from "react";

/**
 * TabVisibilityManager ensures the official Udaan Edu Loans brand logo and title
 * remain clean, professional, and visible without duplicate icons or placeholder letters
 * when the user switches to another tab or website on their laptop.
 */
export default function TabVisibilityManager() {
  useEffect(() => {
    let originalTitle = document.title;

    const forceFavicon = () => {
      // Force Safari and Chrome to bind the high-resolution logo icon
      const iconSelectors = ["link[rel~='icon']", "link[rel='shortcut icon']", "link[rel='apple-touch-icon']"];
      iconSelectors.forEach((selector) => {
        const el = document.querySelector(selector) as HTMLLinkElement | null;
        if (el) {
          const baseHref = el.href.split("?")[0];
          el.href = `${baseHref}?v=2`;
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched to another site or tab - keep clean brand title WITHOUT any emojis
        originalTitle = document.title;
        document.title = "Udaan Edu Loans | Master's Loan Without Co-Applicant";
        forceFavicon();
      } else {
        // User returned to Udaan Edu Loans
        if (originalTitle) {
          document.title = originalTitle;
        }
        forceFavicon();
      }
    };

    // Run on initial mount to ensure Safari binds the favicon immediately
    forceFavicon();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);
    window.addEventListener("blur", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
      window.removeEventListener("blur", handleVisibilityChange);
    };
  }, []);

  return null;
}
