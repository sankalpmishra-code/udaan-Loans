import React from "react";
import Link from "next/link";
import JsonLd from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems = [{ name: "Home", url: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://udaanloans.com${item.url}`,
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      <JsonLd data={breadcrumbSchema} />
      <div className="wrap">
        <ol>
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={item.url}>
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.url}>{item.name}</Link>
                    <span className="separator" aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
