"use client";

import { useEffect } from "react";

/**
 * TabVisibilityManager ensures the Udaan Edu Loans brand logo and messaging
 * remain completely visible and top-of-mind even when the user switches to
 * another site or background tab on their laptop or mobile browser.
 */
export default function TabVisibilityManager() {
  useEffect(() => {
    let originalTitle = document.title;

    const updateFavicon = (iconUrl: string) => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = iconUrl;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched to another site or tab
        originalTitle = document.title;
        document.title = "🎓 Udaan Edu Loans | Master's Loan Without Co-Applicant";
        updateFavicon("/favicon.ico?v=1");
      } else {
        // User returned to the tab
        if (originalTitle) {
          document.title = originalTitle;
        }
        updateFavicon("/favicon.ico");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
