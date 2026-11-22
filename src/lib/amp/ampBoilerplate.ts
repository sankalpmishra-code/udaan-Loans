import { siteConfig } from "@/data/siteConfig";

export const AMP_BOILERPLATE = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`;

export interface AmpDocumentProps {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/" or "/calculator"
  ampPath: string; // e.g. "/amp" or "/amp/calculator"
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  customStyles?: string;
  bodyContent: string;
}

export function renderAmpHtmlDocument({
  title,
  description,
  canonicalPath,
  ampPath,
  jsonLd,
  customStyles = "",
  bodyContent,
}: AmpDocumentProps): string {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const ampUrl = `${baseUrl}${ampPath.startsWith("/") ? ampPath : `/${ampPath}`}`;

  // Global default structured data
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "FinancialService",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: baseUrl,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        priceRange: "₹₹",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
      },
      ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    ],
  };

  return `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta name="theme-color" content="${siteConfig.themeColor}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">

  <!-- OpenGraph Metadata -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${ampUrl}">
  <meta property="og:site_name" content="${siteConfig.name}">
  <meta property="og:image" content="${baseUrl}/opengraph-image">

  <!-- Twitter Metadata -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${baseUrl}/twitter-image">

  <!-- AMP JavaScript Runtime -->
  <script async src="https://cdn.ampproject.org/v0.js"></script>

  <!-- AMP Components Extensions -->
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
  <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>

  <!-- Google Fonts: Inter & Outfit preconnect and stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- AMP Boilerplate Code -->
  ${AMP_BOILERPLATE}

  <!-- AMP Custom CSS -->
  <style amp-custom>
${customStyles}
  </style>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(defaultSchema, null, 2)}
  </script>
</head>
<body>
${bodyContent}
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
