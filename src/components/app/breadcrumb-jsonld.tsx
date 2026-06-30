import { SITE_URL } from "@/lib/site";

export interface Crumb {
  name: string;
  /** Site-relative path, e.g. "/builds" or "/builds/anti-tunnel-meta". */
  path: string;
}

/**
 * Emits BreadcrumbList structured data so search engines can show a breadcrumb
 * trail (Home › Builds › …) in results. Render once near the top of a detail page.
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
