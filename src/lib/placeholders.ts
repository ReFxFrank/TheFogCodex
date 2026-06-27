import type { Role } from "@/types";

// ============================================================
// Deterministic SVG placeholder art.
// No real in-game assets ship with this fan project, so we
// generate tasteful, role-tinted placeholders from the slug.
// Drop a real PNG at the documented path + set the entity's
// `icon`/`portrait` field to use actual art instead.
// ============================================================

/** Stable 0–359 hue from a string (no Math.random — SSR safe). */
export function hueFromString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

/** 1–2 uppercase initials from a display name. */
export function initialsFromName(name: string): string {
  const cleaned = name.replace(/^(The|Boon:|Hex:|Scourge Hook:)\s+/i, "");
  const words = cleaned.split(/[\s&]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Base accent for a role, used to tint placeholders. */
export function roleColor(role: Role): { base: string; deep: string } {
  return role === "killer"
    ? { base: "#d6324a", deep: "#7a1322" }
    : { base: "#4fb6c7", deep: "#155661" };
}
