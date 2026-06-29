import Fuse, { type IFuseOptions } from "fuse.js";
import { searchDocs } from "@/data";
import type { SearchDoc } from "@/types";

// ============================================================
// Search tuning.
//
// The earlier config (threshold 0.4 over long free-text fields) let a short
// query fuzzily match scattered fragments inside long text — e.g. typing
// "jason" matched a window inside every character's blurb, so the whole list
// came back. We keep two tiers:
//
//   - SEARCH_OPTS  (command palette): a discovery tool, slightly more lenient.
//   - FILTER_OPTS  (page filters): "narrow this list" semantics — strict, so
//     only genuinely-relevant rows survive.
//
// Both are far tighter than before and require a near-real substring match
// (typo-tolerant, but not fragment-matching).
// ============================================================

const SEARCH_OPTS: IFuseOptions<SearchDoc> = {
  keys: [
    { name: "title", weight: 0.65 },
    { name: "subtitle", weight: 0.2 },
    { name: "keywords", weight: 0.15 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
  findAllMatches: false,
};

const FILTER_OPTS = {
  threshold: 0.28,
  ignoreLocation: true,
  minMatchCharLength: 2,
  findAllMatches: false,
};

// Single fuzzy index over every build, perk and character, built lazily.
let fuse: Fuse<SearchDoc> | null = null;

function getIndex(): Fuse<SearchDoc> {
  if (!fuse) fuse = new Fuse(searchDocs, SEARCH_OPTS);
  return fuse;
}

export function searchAll(query: string, limit = 30): SearchDoc[] {
  const q = query.trim();
  if (q.length < 2) return [];
  return getIndex()
    .search(q)
    .slice(0, limit)
    .map((r) => r.item);
}

/** Fuzzy filter an arbitrary list by a set of string keys (strict — for page filters). */
export function fuzzyFilter<T>(
  items: readonly T[],
  query: string,
  keys: string[],
): T[] {
  const q = query.trim();
  if (!q) return [...items];
  // A single-character query is too noisy to fuzzy-match; require a prefix hit.
  if (q.length < 2) {
    const lq = q.toLowerCase();
    return items.filter((it) =>
      keys.some((k) => {
        const v = (it as Record<string, unknown>)[k];
        return typeof v === "string" && v.toLowerCase().includes(lq);
      }),
    );
  }
  const local = new Fuse(items, { ...FILTER_OPTS, keys });
  return local.search(q).map((r) => r.item);
}
