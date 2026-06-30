import {
  Anchor,
  ArrowBigUp,
  ArrowDownToLine,
  Backpack,
  Ban,
  Beef,
  BellOff,
  Bomb,
  Bone,
  CircleDot,
  Clock,
  Cog,
  Crosshair,
  DoorClosed,
  DoorOpen,
  Droplet,
  Droplets,
  Ear,
  Eye,
  EyeOff,
  FastForward,
  Feather,
  Flame,
  FlameKindling,
  Footprints,
  Frame,
  Gauge,
  Ghost,
  Hammer,
  Hand,
  Heart,
  HeartCrack,
  HeartHandshake,
  HeartOff,
  HeartPulse,
  Infinity as InfinityIcon,
  Leaf,
  Link,
  Lock,
  Moon,
  Music,
  Pause,
  PersonStanding,
  Pickaxe,
  Rabbit,
  Radar,
  Radiation,
  RadioTower,
  RefreshCw,
  Repeat,
  ScanEye,
  ScanSearch,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Skull,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target,
  Timer,
  TrendingUp,
  Unlock,
  Users,
  UsersRound,
  VenetianMask,
  Volume2,
  VolumeX,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { PerkCategory, Role } from "@/types";

// ============================================================
// Original glyph language for perk emblems.
//
// We don't ship Behaviour Interactive's perk art. Instead every perk gets its
// own clean, role-tinted icon. PERK_GLYPH hand-picks a distinct, sensible glyph
// for each catalogued perk (a heart-pulse for Self-Care, a bomb for Pop Goes
// the Weasel, a beef cut for Barbecue & Chilli, an infinity for Hex: Undying…).
// CATEGORY_GLYPH is the safety net for anything not individually mapped.
// ============================================================

// One distinct glyph per perk, chosen to read like its effect.
const PERK_GLYPH: Record<string, LucideIcon> = {
  // ---- Survivor ----
  adrenaline: Zap,
  "decisive-strike": Unlock,
  "dead-hard": ShieldAlert,
  "off-the-record": VenetianMask,
  unbreakable: PersonStanding,
  "borrowed-time": Clock,
  "prove-thyself": Users,
  "deja-vu": Repeat,
  hyperfocus: Target,
  "stake-out": Crosshair,
  resilience: TrendingUp,
  "windows-of-opportunity": Frame,
  "sprint-burst": Rabbit,
  lithe: Wind,
  "balanced-landing": ArrowDownToLine,
  kindred: UsersRound,
  bond: Link,
  "iron-will": VolumeX,
  "urban-evasion": Footprints,
  "quick-and-quiet": BellOff,
  "dance-with-me": Music,
  "inner-strength": Sparkles,
  "built-to-last": RefreshCw,
  streetwise: Backpack,
  "circle-of-healing": HeartHandshake,
  "shadow-step": Moon,
  exponential: ArrowBigUp,
  "quick-gambit": Wrench,
  vigil: Timer,
  "self-care": HeartPulse,
  "botany-knowledge": Leaf,
  empathy: Heart,
  lightweight: Feather,
  // ---- Killer ----
  "pain-resonance": Anchor,
  "pop-goes-the-weasel": Bomb,
  deadlock: Lock,
  "corrupt-intervention": Ban,
  "grim-embrace": Hand,
  "dead-mans-switch": Pause,
  "lethal-pursuer": ScanEye,
  "nowhere-to-hide": Radar,
  "bbq-and-chili": Beef,
  "darkness-revealed": ScanSearch,
  "sloppy-butcher": Droplets,
  "hex-ruin": Flame,
  "hex-undying": InfinityIcon,
  "devour-hope": Skull,
  pentimento: FlameKindling,
  noed: Bone,
  "no-way-out": DoorClosed,
  bamboozle: FastForward,
  "coup-de-grace": Swords,
  tinkerer: Cog,
  "trail-of-torment": Ghost,
  "dark-devotion": RadioTower,
  "monitor-and-abuse": CircleDot,
  starstruck: Star,
  thanatophobia: HeartCrack,
  "spirit-fury": Hammer,
  enduring: Shield,
  lightborn: Sun,
  coulrophobia: HeartOff,
  eruption: Radiation,
  "infectious-fright": Volume2,
  "brutal-strength": Pickaxe,
  "a-nurses-calling": Eye,
  stridor: Ear,
};

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

/** The emblem glyph for a perk: its hand-picked icon, else its primary category. */
export function glyphForPerk(
  slug: string,
  categories: readonly PerkCategory[] | undefined,
  role: Role,
): LucideIcon {
  return PERK_GLYPH[slug] ?? glyphForCategories(categories, role);
}

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
