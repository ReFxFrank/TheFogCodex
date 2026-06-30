import type { MetadataRoute } from "next";
import { builds, perks, characters, maps } from "@/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/builds"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/perks"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/characters"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/maps"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/builds/new"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/items"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/community"), changeFrequency: "daily", priority: 0.6 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.4 },
    { url: url("/guidelines"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const content: MetadataRoute.Sitemap = [
    ...builds.map((b) => ({ url: url(`/builds/${b.slug}`), priority: 0.7 })),
    ...perks.map((p) => ({ url: url(`/perks/${p.slug}`), priority: 0.6 })),
    ...characters.map((c) => ({ url: url(`/characters/${c.slug}`), priority: 0.6 })),
    ...maps.map((m) => ({ url: url(`/maps/${m.slug}`), priority: 0.6 })),
  ];

  return [...staticPages, ...content];
}
