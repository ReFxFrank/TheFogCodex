import {
  Anchor,
  DoorOpen,
  Droplet,
  Eye,
  EyeOff,
  Flame,
  Footprints,
  Gauge,
  Ghost,
  HeartPulse,
  Radar,
  Settings,
  ShieldCheck,
  Skull,
  Sparkles,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { PerkCategory, Role } from "@/types";

// ============================================================
// Original glyph language for perk emblems.
//
// We don't ship Behaviour Interactive's perk art. Instead each perk
// gets a clean, role-tinted icon chosen from its *primary* gameplay
// category — so a healing perk reads as a heart, a tracking perk as a
// radar sweep, a hex as a skull. It's our own iconography, not a copy.
// ============================================================

const CATEGORY_GLYPH: Record<PerkCategory, LucideIcon> = {
  // survivor
  exhaustion: Wind,
  "aura-reading": Eye,
  "gen-repair": Wrench,
  healing: HeartPulse,
  stealth: EyeOff,
  boon: Sparkles,
  endgame: DoorOpen,
  "anti-tunnel": ShieldCheck,
  totem: Flame,
  utility: Settings,
  // killer
  "gen-slowdown": Gauge,
  hex: Skull,
  "anti-heal": Droplet,
  chase: Footprints,
  tracking: Radar,
  "scourge-hook": Anchor,
};

/** Pick the emblem glyph for a perk from its highest-signal category. */
export function glyphForCategories(
  categories: readonly PerkCategory[] | undefined,
  role: Role,
): LucideIcon {
  if (categories) {
    for (const c of categories) {
      const g = CATEGORY_GLYPH[c];
      if (g) return g;
    }
  }
  // No category match — fall back to a role-flavored default.
  return role === "killer" ? Ghost : ShieldCheck;
}
