import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import BlogIndexClient from "@/components/BlogIndexClient";
import { BLOG_POSTS, getAllBlogCategories } from "@/data/blogPosts";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Study Abroad Education Loan Guides & Insights (2026) | Udaan Edu Loans",
  description:
    "Comprehensive expert guides on overseas education loans, collateral-free financing up to ₹75L, Section 80E tax optimization, embassy visa fund rules, and public bank vs NBFC comparisons.",
  keywords: [
    "study abroad education loan guides",
    "education loan blogs India",
    "how to get abroad education loan without collateral",
    "SBI vs HDFC Credila education loan",
    "section 80E tax deduction education loan",
    "pre visa loan sanction letter",
    "education loan for MS in USA",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Study Abroad Education Loan Guides & Expert Advice | Udaan Edu Loans",
    description:
      "Authoritative, fact-checked guides on securing overseas study loans, embassy pre-visa letters, collateral-free limits, and saving on interest.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Education Loan Guides & Insights | Udaan Edu Loans",
    description:
      "Expert guides on abroad education loans, visa financial verification, and tax savings.",
  },
};

export default function BlogIndexPage() {
  const categories = getAllBlogCategories();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Study Abroad Education Loan Guides & Insights",
    description:
      "Comprehensive expert guides and educational resources for Indian students seeking overseas education loans.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main className="blog-main-page">
        {/* Hero Header */}
        <header className="blog-header-hero">
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Blog & Guides", url: "/blog" }]} />
            <span className="blog-hero-badge">📚 Knowledge Base & Advisory</span>
            <h1>Study Abroad Education Loan Guides (2026)</h1>
            <p className="blog-hero-lead">
              Practical, fact-checked guides written by banking analysts and former underwriters to help Indian students navigate collateral-free sanctions, embassy visa proof rules, and tax optimization.
            </p>
          </div>
        </header>

        {/* Interactive Hub */}
        <div className="wrap">
          <BlogIndexClient posts={BLOG_POSTS} categories={categories} />
        </div>
      </main>
    </>
  );
}
