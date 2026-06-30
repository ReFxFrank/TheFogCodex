import { describe, it, expect } from "vitest";
import { fuzzyFilter, searchAll } from "@/lib/search";
import { characters, perks } from "@/data";

describe("fuzzyFilter (page filters)", () => {
  it("returns the whole list for an empty query", () => {
    expect(fuzzyFilter(characters, "", ["name"]).length).toBe(characters.length);
  });

  it("does NOT leak unrelated rows — 'jason' matches only The Slasher", () => {
    // Regression test: the old loose threshold + searching long bio text made
    // 'jason' match every killer's blurb. Name/realName + strict threshold fix it.
    const killers = characters.filter((c) => c.role === "killer");
    const hits = fuzzyFilter(killers, "jason", ["name", "realName"]);
    expect(hits.length).toBe(1);
    expect(hits[0]?.realName?.toLowerCase()).toContain("jason");
  });

  it("matches a real name typo-tolerantly", () => {
    const hits = fuzzyFilter(perks, "decisve strike", ["name"]);
    expect(hits.some((p) => p.slug === "decisive-strike")).toBe(true);
  });
});

describe("searchAll (command palette)", () => {
  it("ignores sub-2-char queries", () => {
    expect(searchAll("a")).toEqual([]);
  });

  it("finds a known perk by name", () => {
    const results = searchAll("dead hard");
    expect(results.some((r) => r.kind === "perk" && r.slug === "dead-hard")).toBe(true);
  });

  it("finds a map by name", () => {
    const results = searchAll("garden of joy");
    expect(results.some((r) => r.kind === "map" && r.slug === "garden-of-joy")).toBe(true);
  });
});
