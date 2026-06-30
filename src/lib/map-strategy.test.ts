import { describe, it, expect } from "vitest";
import { maps, characterBySlug, perkBySlug } from "@/data";
import { deriveMapStrategy } from "@/lib/map-strategy";

describe("map strategy", () => {
  it("produces recommendations for every map", () => {
    for (const map of maps) {
      const s = deriveMapStrategy(map);
      const total =
        s.killers.length + s.survivorPerks.length + s.killerPerks.length;
      expect(total, `no recommendations for ${map.slug}`).toBeGreaterThan(0);
      expect(s.demand.length).toBeGreaterThan(0);
    }
  });

  it("only recommends real killers (and never survivors) in the killer slot", () => {
    for (const map of maps) {
      for (const k of deriveMapStrategy(map).killers) {
        const c = characterBySlug.get(k.slug);
        expect(c, `${k.slug} not in roster (${map.slug})`).toBeTruthy();
        expect(c?.role).toBe("killer");
      }
    }
  });

  it("puts survivor perks in the survivor column and killer perks in the killer column", () => {
    for (const map of maps) {
      const s = deriveMapStrategy(map);
      for (const p of s.survivorPerks) {
        expect(perkBySlug.get(p.slug)?.role, `${p.slug} (${map.slug})`).toBe(
          "survivor",
        );
      }
      for (const p of s.killerPerks) {
        expect(perkBySlug.get(p.slug)?.role, `${p.slug} (${map.slug})`).toBe(
          "killer",
        );
      }
    }
  });

  it("caps each list at four", () => {
    for (const map of maps) {
      const s = deriveMapStrategy(map);
      expect(s.killers.length).toBeLessThanOrEqual(4);
      expect(s.survivorPerks.length).toBeLessThanOrEqual(4);
      expect(s.killerPerks.length).toBeLessThanOrEqual(4);
    }
  });
});
