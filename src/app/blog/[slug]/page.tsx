import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/data/siteConfig";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Udaan Edu Loans",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug);

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <main className="blog-post-page">
        {/* Header Hero */}
        <header className="blog-post-header">
          <div className="wrap">
            <Breadcrumbs
              items={[
                { name: "Blog", url: "/blog" },
                { name: post.title, url: `/blog/${post.slug}` },
              ]}
            />

            <div className="post-header-badge-row">
              <span className="blog-category-badge">{post.category}</span>
              <span className="post-read-time">⏱️ {post.readTime}</span>
              <span className="post-fact-badge">🛡️ Fact-Checked</span>
            </div>

            <h1 className="post-hero-title">{post.title}</h1>
            <p className="post-hero-lead">{post.excerpt}</p>

            {/* Author & Reviewer Byline Card */}
            <div className="post-byline-card">
              <div className="byline-item">
                <span className="byline-avatar">✍️</span>
                <div>
                  <span className="byline-role">Written by</span>
                  <strong className="byline-name">{post.author.name}</strong>
                  <span className="byline-creds">{post.author.role}</span>
                </div>
              </div>
              <div className="byline-divider"></div>
              <div className="byline-item">
                <span className="byline-avatar">🔍</span>
                <div>
                  <span className="byline-role">Reviewed & Verified by</span>
                  <strong className="byline-name">{post.reviewer.name}</strong>
                  <span className="byline-creds">{post.reviewer.role}</span>
                </div>
              </div>
              <div className="byline-divider"></div>
              <div className="byline-item date-item">
                <span className="byline-role">Last Updated</span>
                <time dateTime={post.updatedAt} className="byline-date">
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body Section */}
        <div className="wrap post-content-wrap">
          <div className="post-layout-grid">
            {/* Main Content Column */}
            <article className="post-main-article">
              {/* Key Takeaways Box */}
              <div className="post-key-takeaways" aria-label="Key Takeaways">
                <div className="takeaways-header">
                  <span className="takeaways-icon">💡</span>
                  <h3>Key Takeaways & Summary</h3>
                </div>
                <ul className="takeaways-list">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              {/* Table of Contents */}
              <nav className="post-toc-box" aria-label="Table of Contents">
                <h4>Table of Contents</h4>
                <ol>
                  {post.sections.map((section, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx + 1}`}>{section.heading}</a>
                    </li>
                  ))}
                  {post.faqs.length > 0 && (
                    <li>
                      <a href="#frequently-asked-questions">Frequently Asked Questions</a>
                    </li>
                  )}
                </ol>
              </nav>

              {/* Sections */}
              {post.sections.map((section, idx) => (
                <section
                  key={idx}
                  id={`section-${idx + 1}`}
                  className="post-content-section"
                >
                  <h2>{section.heading}</h2>
                  {section.subheading && <h3>{section.subheading}</h3>}

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {/* Optional Table */}
                  {section.table && (
                    <div className="post-table-container">
                      <table className="post-data-table">
                        <thead>
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Optional Callout */}
                  {section.callout && (
                    <div className={`post-callout-box callout-${section.callout.type}`}>
                      <div className="callout-title">
                        {section.callout.type === "tip" && "💡 Expert Tip: "}
                        {section.callout.type === "warning" && "⚠️ Important Caution: "}
                        {section.callout.type === "important" && "📌 Mandatory Rule: "}
                        {section.callout.type === "fact" && "🔍 Regulatory Fact: "}
                        <strong>{section.callout.title}</strong>
                      </div>
                      <p>{section.callout.content}</p>
                    </div>
                  )}

                  {/* Optional Bullet Points */}
                  {section.bulletPoints && (
                    <ul className="post-bullet-list">
                      {section.bulletPoints.map((point, ptIdx) => (
                        <li key={ptIdx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Embedded In-Article Lead CTA */}
              <div className="post-embedded-cta">
                <div className="cta-icon-wrap">🎓</div>
                <div className="cta-text">
                  <h3>Get Your Loan Sanctioned in 3 to 7 Days</h3>
                  <p>
                    Check your eligibility across 30+ partner banks & NBFCs. 100% free consultation, doorstep service, and maximum collateral-free limits with Udaan Edu Loans.
                  </p>
                  <div className="cta-buttons">
                    <Link href="/match" className="btn btn-primary">
                      Match Your Profile (60s)
                    </Link>
                    <Link href="/calculator" className="btn btn-secondary">
                      Calculate Loan EMI
                    </Link>
                  </div>
                </div>
              </div>

              {/* FAQs Section */}
              {post.faqs.length > 0 && (
                <section id="frequently-asked-questions" className="post-faq-section">
                  <h2>Frequently Asked Questions</h2>
                  <FAQSection faqs={post.faqs} />
                </section>
              )}

              {/* Editorial Disclosure & Author Bio */}
              <footer className="post-editorial-disclosure">
                <h4>About Our Editorial Standards</h4>
                <p>
                  This guide is developed by the Udaan Overseas Education Loan Advisory Team and vetted by former banking underwriters. All interest rates, loan limits, and immigration financial rules reflect verified 2026 lending criteria and official guidance from the Reserve Bank of India (RBI), US Embassy, UK Visas and Immigration (UKVI), Immigration, Refugees and Citizenship Canada (IRCC), and Australia Department of Home Affairs.
                </p>
              </footer>
            </article>

            {/* Sidebar Column */}
            <aside className="post-sidebar">
              {/* Quick Assessment Widget */}
              <div className="sidebar-widget loan-matcher-widget">
                <span className="widget-badge">Free Advisory</span>
                <h4>Need an Education Loan?</h4>
                <p>
                  Match your profile with SBI, HDFC Credila, Avanse, Auxilo & 30+ lenders.
                </p>
                <ul className="widget-checklist">
                  <li>✓ Collateral-free up to ₹75L</li>
                  <li>✓ Pre-visa sanction in 3–5 days</li>
                  <li>✓ Zero service charges</li>
                </ul>
                <Link href="/match" className="btn btn-primary full-width">
                  Check Bank Match
                </Link>
                <Link href="/apply" className="btn btn-secondary full-width" style={{ marginTop: "8px" }}>
                  Fast Loan Application
                </Link>
              </div>

              {/* Related Articles Widget */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-widget related-guides-widget">
                  <h4>Related Guides</h4>
                  <div className="related-links-list">
                    {relatedPosts.map((rel) => (
                      <Link key={rel.slug} href={`/blog/${rel.slug}`} className="related-link-card">
                        <span className="related-cat">{rel.category}</span>
                        <h5>{rel.title}</h5>
                        <span className="related-read">{rel.readTime}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct WhatsApp Assistance */}
              <div className="sidebar-widget whatsapp-help-widget">
                <h4>Speak to a Specialist</h4>
                <p>Have specific questions about co-applicant criteria or property valuation?</p>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Udaan Team, I was reading your guide "${post.title}" and need help with my education loan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp full-width"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
