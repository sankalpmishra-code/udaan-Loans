"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blogPosts";

interface BlogIndexClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogIndexClient({ posts, categories }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];

  return (
    <div className="blog-hub-container">
      {/* Featured Highlight Card */}
      {selectedCategory === "All" && searchQuery.trim() === "" && featuredPost && (
        <section className="featured-blog-section" aria-label="Featured Study Abroad Guide">
          <div className="featured-blog-card">
            <div className="featured-blog-badge-row">
              <span className="blog-category-badge featured">{featuredPost.category}</span>
              <span className="blog-read-time">⭐ Editor&apos;s Pick • {featuredPost.readTime}</span>
            </div>
            <h2 className="featured-blog-title">
              <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
            </h2>
            <p className="featured-blog-excerpt">{featuredPost.excerpt}</p>
            <div className="featured-blog-meta">
              <div className="author-info">
                <span className="author-icon">✍️</span>
                <div>
                  <strong>{featuredPost.author.name}</strong>
                  <span className="meta-sub">Fact-checked by {featuredPost.reviewer.name}</span>
                </div>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className="btn-read-article">
                Read Full Guide &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Search and Category Filter Bar */}
      <section className="blog-controls-section" aria-label="Filter guides by category">
        <div className="blog-search-wrap">
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles (e.g. collateral-free, USA MS, 80E tax, disbursement)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search education loan articles"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="blog-search-clear"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <div className="blog-category-pills" role="tablist">
          <button
            role="tab"
            aria-selected={selectedCategory === "All"}
            className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All Guides ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="blog-grid-section" aria-label="Articles list">
        {filteredPosts.length === 0 ? (
          <div className="no-blog-results">
            <h3>No guides match your search</h3>
            <p>Try searching for different terms such as &ldquo;collateral&rdquo;, &ldquo;visa&rdquo;, or &ldquo;taxes&rdquo;.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="blog-post-card">
                <div className="blog-card-header">
                  <span className="blog-category-badge">{post.category}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-card-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <div className="author-small">
                    <span className="author-dot"></span>
                    <span className="author-text">{post.author.name}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Read Guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Advisory Matcher CTA Box */}
      <section className="blog-cta-box" aria-label="Consultation CTA">
        <div className="blog-cta-content">
          <span className="cta-badge">🎯 100% Free Service</span>
          <h3>Planning Your Study Abroad Loan?</h3>
          <p>
            Compare collateral-free and secured loan sanctions from 30+ leading public commercial banks and NBFCs with Udaan. Zero service fees, doorstep verification, and fast 3 to 7 working day approvals.
          </p>
          <div className="blog-cta-actions">
            <Link href="/match" className="btn btn-primary">
              60-Second Loan Matcher
            </Link>
            <Link href="/apply" className="btn btn-outline" style={{ borderColor: "#ffffff", color: "#ffffff" }}>
              Fast Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
