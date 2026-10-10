import React from "react";
import JsonLd from "./JsonLd";
import { FAQItem } from "@/data/faqs";

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  id?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Direct answers to critical questions about overseas education loans, interest rates, and approval processes.",
  faqs,
  id = "faq",
}: FAQSectionProps) {
  // Generate Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq-section" id={id} aria-labelledby={`${id}-heading`}>
      <JsonLd data={faqSchema} />
      <div className="wrap">
        <div className="section-head text-center">
          <span className="badge">Instant Answers & Insights</span>
          <h2 id={`${id}-heading`}>{title}</h2>
          {subtitle && <p className="lead">{subtitle}</p>}
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-card" open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-content">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
