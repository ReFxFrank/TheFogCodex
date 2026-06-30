import Image from "next/image";
import { Building2, Trees, Warehouse } from "lucide-react";
import type { MapLean, MapSetting } from "@/types";
import { MAP_ART } from "@/data/art-manifest";
import { hueFromString } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

interface MapEmblemProps {
  name: string;
  slug: string;
  setting: MapSetting;
  lean: MapLean;
  image?: string;
  className?: string;
}

const SETTING_GLYPH = {
  outdoor: Trees,
  indoor: Building2,
  mixed: Warehouse,
} as const;

// Hue per lean — crimson (killer), teal (survivor), amber (balanced).
const LEAN_HUE: Record<MapLean, number> = {
  killer: 354,
  survivor: 190,
  balanced: 41,
};

/**
 * A map's banner art. Shows a real image if one is dropped in
 * (public/images/maps/<slug>.jpg) or set via `image`; otherwise draws an
 * original lean-tinted placeholder — a lit field with a faint map grid and a
 * glyph for the setting (trees outdoor, a building indoor, a warehouse mixed).
 */
export function MapEmblem({
  name,
  slug,
  setting,
  lean,
  image,
  className,
}: MapEmblemProps) {
  const src = image ?? MAP_ART[slug];
  if (src) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image src={src} alt={name} fill sizes="400px" className="object-cover" />
      </span>
    );
  }

  const hue = LEAN_HUE[lean];
  const drift = hueFromString(slug);
  const a = `hsl(${hue}, ${lean === "balanced" ? 60 : 55}%, 52%)`;
  const b = `hsl(${(hue + drift) / 2}, 34%, 22%)`;
  const Glyph = SETTING_GLYPH[setting];

  return (
    <span
      className={cn("relative block overflow-hidden", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 160 90"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id={`mg-${slug}`} cx="50%" cy="38%" r="80%">
            <stop offset="0%" stopColor={a} stopOpacity="0.5" />
            <stop offset="55%" stopColor={b} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#08090e" />
          </radialGradient>
        </defs>
        <rect width="160" height="90" fill={`url(#mg-${slug})`} />
        {/* faint map grid */}
        <g stroke={a} strokeOpacity="0.18" strokeWidth="0.75">
          {[20, 40, 60, 80, 100, 120, 140].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="90" />
          ))}
          {[18, 36, 54, 72].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="160" y2={y} />
          ))}
        </g>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <Glyph
          className="h-[34%] w-[34%] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          strokeWidth={1.5}
          style={{ color: `hsl(${hue}, ${lean === "balanced" ? 70 : 65}%, 82%)` }}
        />
      </span>
    </span>
  );
}
