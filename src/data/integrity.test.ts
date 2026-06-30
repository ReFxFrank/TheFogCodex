import { describe, it, expect } from "vitest";
import {
  perks,
  builds,
  characters,
  maps,
  perkBySlug,
  characterBySlug,
  searchDocs,
} from "@/data";
import { glyphForPerk } from "@/lib/perk-glyph";
import { MAP_SETTINGS, MAP_SIZES, MAP_LEANS } from "@/types";

function dupes(slugs: string[]): string[] {
  return slugs.filter((s, i) => slugs.indexOf(s) !== i);
}

describe("slug uniqueness", () => {
  it("has no duplicate slugs in any collection", () => {
    expect(dupes(perks.map((p) => p.slug))).toEqual([]);
    expect(dupes(builds.map((b) => b.slug))).toEqual([]);
    expect(dupes(characters.map((c) => c.slug))).toEqual([]);
    expect(dupes(maps.map((m) => m.slug))).toEqual([]);
  });
});

describe("build integrity", () => {
  it("each build has exactly 4 distinct, existing, role-matched perks", () => {
    for (const b of builds) {
      expect(b.perkSlugs.length, `${b.slug} perk count`).toBe(4);
      expect(new Set(b.perkSlugs).size, `${b.slug} distinct perks`).toBe(4);
      for (const slug of b.perkSlugs) {
        const perk = perkBySlug.get(slug);
        expect(perk, `${b.slug} -> unknown perk ${slug}`).toBeDefined();
        expect(perk?.role, `${b.slug} perk ${slug} role`).toBe(b.role);
      }
    }
  });

  it("each build's character (if set) exists and matches the role", () => {
    for (const b of builds) {
      if (!b.characterSlug) continue;
      const ch = characterBySlug.get(b.characterSlug);
      expect(ch, `${b.slug} -> unknown character`).toBeDefined();
      expect(ch?.role).toBe(b.role);
    }
  });
});

describe("map integrity", () => {
  it("every map uses valid enum values", () => {
    for (const m of maps) {
      expect(MAP_SETTINGS, `${m.slug} setting`).toContain(m.setting);
      expect(MAP_SIZES, `${m.slug} size`).toContain(m.size);
      expect(MAP_LEANS, `${m.slug} lean`).toContain(m.lean);
      expect(m.realm.length, `${m.slug} realm`).toBeGreaterThan(0);
      expect(m.notes.length, `${m.slug} notes`).toBeGreaterThan(0);
    }
  });
});

describe("perk icons", () => {
  it("every perk resolves to a distinct glyph (no duplicates)", () => {
    const glyphs = perks.map((p) => glyphForPerk(p.slug, p.categories, p.role));
    expect(new Set(glyphs).size).toBe(perks.length);
  });
});

describe("search index", () => {
  it("every doc points at an internal href and a known kind", () => {
    const kinds = new Set(["build", "perk", "character", "map"]);
    for (const d of searchDocs) {
      expect(d.href.startsWith("/"), `${d.id} href`).toBe(true);
      expect(kinds.has(d.kind), `${d.id} kind`).toBe(true);
    }
  });

  it("indexes every catalogued entity", () => {
    expect(searchDocs.length).toBe(
      builds.length + perks.length + characters.length + maps.length,
    );
  });
});
