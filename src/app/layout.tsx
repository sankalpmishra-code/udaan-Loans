import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/siteConfig";

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Study Abroad Education Loans Facilitator India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Udaan Overseas Education Loan Experts" }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Fund Your Study Abroad with 30+ Banks & NBFCs`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Overseas Education Loans Facilitator India`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.social.twitterHandle,
    creator: siteConfig.social.twitterHandle,
    title: `${siteConfig.name} | Overseas Education Loans Facilitator India`,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: siteConfig.verification.google,
    other: {
      "msvalidate.01": siteConfig.verification.bing,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import WhatsAppWidget from "@/components/WhatsAppWidget";
import Analytics from "@/components/Analytics";
import TabVisibilityManager from "@/components/TabVisibilityManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Schema.org @graph integrating WebSite, FinancialService, and Organization
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "FinancialService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/opengraph-image`,
        image: `${siteConfig.url}/opengraph-image`,
        description: siteConfig.description,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        contactPoint: siteConfig.phoneNumbers.map((num) => ({
          "@type": "ContactPoint",
          telephone: num,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        })),
        priceRange: "₹₹",
        foundingDate: siteConfig.foundingYear,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        sameAs: [
          siteConfig.social.twitterUrl,
          siteConfig.social.linkedinUrl,
          siteConfig.social.facebookUrl,
          siteConfig.social.instagramUrl,
          siteConfig.social.youtubeUrl,
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Overseas Education Loans Portfolio",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "FinancialProduct",
                name: "Collateral-Free Abroad Education Loan",
                description: "Unsecured study abroad loan up to ₹75 Lakhs for MS, MBA, and undergraduate degrees.",
                feesAndCommissionsSpecification: "100% Free Consultation for Students",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "FinancialProduct",
                name: "Secured Property Backed Education Loan",
                description: "Education loan backed by property or fixed deposits up to ₹1.5 Crore with rates from 7.5%.",
                feesAndCommissionsSpecification: "100% Free Consultation for Students",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Source+Sans+3:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={graphSchema} />
      </head>
      <body>
        <TabVisibilityManager />
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
