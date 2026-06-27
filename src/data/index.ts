import type {
  Build,
  Character,
  Perk,
  Role,
  SearchDoc,
} from "@/types";
import { PERKS } from "./perks";
import { CHARACTERS } from "./characters";
import { BUILDS } from "./builds";

export { getMetaNote, META_NOTES } from "./meta-notes";
export { ADDONS } from "./addons";
export { OFFERINGS } from "./offerings";

// ============================================================
// In-memory content index, assembled once at module load.
//
// This is a read-heavy content site, so all content lives as
// typed data modules and we build lightweight lookup maps here
// rather than querying a database.
//
// TODO: swap to DB/CMS when content volume demands it.
// ============================================================

// ---- Primary collections ----------------------------------------------------
export const perks: readonly Perk[] = PERKS;
export const characters: readonly Character[] = CHARACTERS;
export const builds: readonly Build[] = BUILDS;

// ---- Slug -> entity maps ----------------------------------------------------
export const perkBySlug = new Map<string, Perk>(PERKS.map((p) => [p.slug, p]));
export const characterBySlug = new Map<string, Character>(
  CHARACTERS.map((c) => [c.slug, c]),
);
export const buildBySlug = new Map<string, Build>(
  BUILDS.map((b) => [b.slug, b]),
);

// ---- Reverse indexes (the graph) --------------------------------------------

/** perk slug -> builds that include it */
export const buildsByPerk = new Map<string, Build[]>();
for (const build of BUILDS) {
  for (const slug of build.perkSlugs) {
    const list = buildsByPerk.get(slug) ?? [];
    list.push(build);
    buildsByPerk.set(slug, list);
  }
}

/** character slug -> builds recommended for them */
export const buildsByCharacter = new Map<string, Build[]>();
for (const build of BUILDS) {
  if (!build.characterSlug) continue;
  const list = buildsByCharacter.get(build.characterSlug) ?? [];
  list.push(build);
  buildsByCharacter.set(build.characterSlug, list);
}

/** character slug -> perks they teach (that exist in the Codex) */
export const perksByCharacter = new Map<string, Perk[]>();
for (const perk of PERKS) {
  if (!perk.characterSlug) continue;
  const list = perksByCharacter.get(perk.characterSlug) ?? [];
  list.push(perk);
  perksByCharacter.set(perk.characterSlug, list);
}

// ---- Helper accessors -------------------------------------------------------
export function getPerk(slug: string): Perk | undefined {
  return perkBySlug.get(slug);
}
export function getPerks(slugs: readonly string[]): Perk[] {
  return slugs
    .map((s) => perkBySlug.get(s))
    .filter((p): p is Perk => Boolean(p));
}
export function getCharacter(slug: string): Character | undefined {
  return characterBySlug.get(slug);
}
export function getBuild(slug: string): Build | undefined {
  return buildBySlug.get(slug);
}
export function getBuildsUsingPerk(slug: string): Build[] {
  return buildsByPerk.get(slug) ?? [];
}
export function getBuildsForCharacter(slug: string): Build[] {
  return buildsByCharacter.get(slug) ?? [];
}
export function getPerksForCharacter(slug: string): Perk[] {
  return perksByCharacter.get(slug) ?? [];
}

export function charactersByRole(role: Role): Character[] {
  return CHARACTERS.filter((c) => c.role === role);
}
export function perksByRole(role: Role): Perk[] {
  return PERKS.filter((p) => p.role === role);
}
export function buildsByRole(role: Role): Build[] {
  return BUILDS.filter((b) => b.role === role);
}

/** Related builds: same archetype or shared perk, excluding the seed build. */
export function getRelatedBuilds(build: Build, limit = 3): Build[] {
  const perkSet = new Set<string>(build.perkSlugs);
  const archSet = new Set<string>(build.archetypes);
  const scored = BUILDS.filter(
    (b) => b.slug !== build.slug && b.role === build.role,
  )
    .map((b) => {
      let score = 0;
      for (const p of b.perkSlugs) if (perkSet.has(p)) score += 2;
      for (const a of b.archetypes) if (archSet.has(a)) score += 1;
      return { build: b, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.build);
}

// ---- Stats ------------------------------------------------------------------
// Live roster counts are larger than the catalogued slice (see /about).
export const ROSTER_STATS = {
  totalKillers: 43,
  totalSurvivors: 50,
  cataloguedBuilds: BUILDS.length,
  cataloguedPerks: PERKS.length,
  cataloguedCharacters: CHARACTERS.length,
  patch: "10.0.1",
} as const;

export const featuredBuilds: Build[] = BUILDS.filter((b) => b.featured);

// ---- Search index (consumed by the ⌘K palette + page search) ----------------
// Generated once at load from every content module.
export const searchDocs: SearchDoc[] = [
  ...BUILDS.map<SearchDoc>((b) => {
    const character = b.characterSlug
      ? characterBySlug.get(b.characterSlug)
      : undefined;
    const perkNames = b.perkSlugs
      .map((s) => perkBySlug.get(s)?.name ?? s)
      .join(" ");
    return {
      id: `build:${b.slug}`,
      kind: "build",
      slug: b.slug,
      title: b.title,
      subtitle: `${b.role === "killer" ? "Killer" : "Survivor"} build · ${b.metaTier}-tier`,
      role: b.role,
      href: `/builds/${b.slug}`,
      keywords: [
        b.title,
        b.summary,
        b.role,
        b.metaTier,
        b.difficulty,
        b.archetypes.join(" "),
        perkNames,
        character?.name ?? "",
      ].join(" "),
    };
  }),
  ...PERKS.map<SearchDoc>((p) => {
    const owner = p.characterSlug
      ? characterBySlug.get(p.characterSlug)
      : undefined;
    return {
      id: `perk:${p.slug}`,
      kind: "perk",
      slug: p.slug,
      title: p.name,
      subtitle: `${p.role === "killer" ? "Killer" : "Survivor"} perk${owner ? ` · ${owner.name}` : ""}`,
      role: p.role,
      href: `/perks/${p.slug}`,
      keywords: [
        p.name,
        p.description,
        p.role,
        p.categories.join(" "),
        owner?.name ?? "",
      ].join(" "),
    };
  }),
  ...CHARACTERS.map<SearchDoc>((c) => ({
    id: `character:${c.slug}`,
    kind: "character",
    slug: c.slug,
    title: c.name,
    subtitle: `${c.role === "killer" ? "Killer" : "Survivor"}${c.killerTier ? ` · ${c.killerTier}-tier` : ""}`,
    role: c.role,
    href: `/characters/${c.slug}`,
    keywords: [
      c.name,
      c.realName ?? "",
      c.role,
      c.blurb,
      c.archetypeTags.join(" "),
    ].join(" "),
  })),
];
