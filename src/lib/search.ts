import Fuse from "fuse.js";
import { searchDocs } from "@/data";
import type { SearchDoc } from "@/types";

// Single fuzzy index over every build, perk and character, built lazily.
let fuse: Fuse<SearchDoc> | null = null;

function getIndex(): Fuse<SearchDoc> {
  if (!fuse) {
    fuse = new Fuse(searchDocs, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "subtitle", weight: 0.2 },
        { name: "keywords", weight: 0.2 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuse;
}

export function searchAll(query: string, limit = 30): SearchDoc[] {
  const q = query.trim();
  if (!q) return [];
  return getIndex()
    .search(q)
    .slice(0, limit)
    .map((r) => r.item);
}

/** Fuzzy filter an arbitrary list by a set of string keys. */
export function fuzzyFilter<T>(
  items: readonly T[],
  query: string,
  keys: string[],
): T[] {
  const q = query.trim();
  if (!q) return [...items];
  const local = new Fuse(items, {
    keys,
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  return local.search(q).map((r) => r.item);
}
