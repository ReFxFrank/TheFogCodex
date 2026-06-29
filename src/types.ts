// ============================================================
// The Fog Codex — domain types
// Union types are derived from `as const` arrays so the data
// and the UI stay in lock-step. No `any`, ever.
// ============================================================

export const ROLES = ["survivor", "killer"] as const;
export type Role = (typeof ROLES)[number];

// Staff / moderation roles (account-level, unrelated to survivor/killer).
// Hierarchy: user < moderator < admin < owner. Owner is the single top
// authority — it outranks admins (only an owner can change/ban/delete an admin).
export const STAFF_ROLES = ["user", "moderator", "admin", "owner"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

// Perk gameplay categories — used to filter the knowledgebase.
export const SURVIVOR_PERK_CATEGORIES = [
  "exhaustion",
  "aura-reading",
  "gen-repair",
  "healing",
  "stealth",
  "boon",
  "endgame",
  "anti-tunnel",
  "totem",
  "utility",
] as const;
export type SurvivorPerkCategory = (typeof SURVIVOR_PERK_CATEGORIES)[number];

export const KILLER_PERK_CATEGORIES = [
  "gen-slowdown",
  "aura-reading",
  "hex",
  "endgame",
  "anti-heal",
  "chase",
  "tracking",
  "stealth",
  "scourge-hook",
  "utility",
] as const;
export type KillerPerkCategory = (typeof KILLER_PERK_CATEGORIES)[number];

export type PerkCategory = SurvivorPerkCategory | KillerPerkCategory;

// Build playstyle archetypes — the primary filter dimension on /builds.
export const ARCHETYPES = [
  // survivor-leaning
  "meta",
  "anti-tunnel",
  "gen-rush",
  "stealth",
  "altruist",
  "boon",
  "endgame",
  // killer-leaning
  "slowdown",
  "info",
  "hex",
  "chase",
  "snowball",
  "anti-heal",
  "stealth-killer",
  "scourge-hook",
  // shared
  "fun-meme",
  "beginner",
] as const;
export type Archetype = (typeof ARCHETYPES)[number];

export const DIFFICULTY = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
export type Difficulty = (typeof DIFFICULTY)[number];

export const META_TIER = ["S", "A", "B", "C", "off-meta"] as const;
export type MetaTier = (typeof META_TIER)[number];

export interface Character {
  slug: string;
  name: string; // e.g. "The Blight"
  realName?: string; // e.g. "Talbot Grimes"
  role: Role;
  licensed?: boolean; // licensed IP (e.g. Jason, Springtrap, The Ghoul)
  archetypeTags: string[]; // killer: "anti-loop","mobility"; survivor: "looper","support"
  killerTier?: MetaTier; // killers only — current-patch tier (approximate)
  perkSlugs: string[]; // their 3 teachable perks
  blurb: string; // 1–2 sentence lore/role summary (paraphrased)
  portrait?: string; // /images/characters/<slug>.png (placeholder ok)
}

export interface Perk {
  slug: string;
  name: string;
  role: Role;
  characterSlug?: string; // owner; undefined = general/base perk
  categories: PerkCategory[]; // from the category arrays above
  description: string; // PARAPHRASED effect — never copied from a wiki
  tierHint?: MetaTier; // optional community-meta hint
  icon?: string; // /images/perks/<slug>.png (placeholder ok)
}

export interface LoadoutItem {
  name: string;
  kind: "addon" | "offering" | "item";
  note?: string;
}

export type PerkQuad = [string, string, string, string];

export interface Build {
  slug: string;
  title: string; // e.g. "Anti-Tunnel Bully Breaker"
  role: Role;
  characterSlug?: string; // recommended character; undefined = works on anyone
  perkSlugs: PerkQuad; // exactly 4
  archetypes: Archetype[];
  difficulty: Difficulty;
  metaTier: MetaTier;
  summary: string; // one-liner for cards
  whyItWorks: string; // 2–4 sentences, honest, mentions synergy
  tradeoffs?: string; // what it's weak against / the cost
  bestAgainst?: string; // matchup note
  extras?: LoadoutItem[]; // suggested add-ons / offering / item
  patch: string; // "10.0.1"
  featured?: boolean;
}

// ---- Search index entry (built at load time) --------------------------------

export type SearchKind = "build" | "perk" | "character";

export interface SearchDoc {
  id: string; // `${kind}:${slug}`
  kind: SearchKind;
  slug: string;
  title: string;
  subtitle: string;
  role: Role;
  href: string;
  keywords: string; // flattened searchable text
}
