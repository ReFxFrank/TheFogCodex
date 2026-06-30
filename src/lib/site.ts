// Canonical site origin, used for metadataBase, sitemap, robots, OG URLs and
// JSON-LD. Override with NEXT_PUBLIC_SITE_URL if the domain ever changes.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thefogcodex.com"
).replace(/\/$/, "");

export const SITE_NAME = "The Fog Codex";

export const SITE_DESCRIPTION =
  "Dead by Daylight builds worth actually running, for survivor and killer — with the real loadout, what it's good at, where it falls apart, a full perk reference, and a map guide. Made by a fan.";
