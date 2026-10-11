"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { captureAndPersistAttribution } from "@/lib/analytics";
import { siteConfig } from "@/data/siteConfig";

export default function Analytics() {
  const gaId = siteConfig.analytics?.gaMeasurementId;

  useEffect(() => {
    // Capture UTM and referral parameters on page load and persist in sessionStorage
    captureAndPersistAttribution();
  }, []);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
