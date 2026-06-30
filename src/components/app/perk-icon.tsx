import Image from "next/image";
import type { PerkCategory, Role } from "@/types";
import { hueFromString } from "@/lib/placeholders";
import { glyphForPerk } from "@/lib/perk-glyph";
import { PERK_ART } from "@/data/art-manifest";
import { cn } from "@/lib/utils";

interface PerkIconProps {
  name: string;
  slug: string;
  role: Role;
  categories?: PerkCategory[];
  icon?: string;
  className?: string;
}

/**
 * The inner emblem of a perk. If real art is supplied via `icon` (or a
 * dropped-in asset in the manifest) it's shown directly. Otherwise we draw
 * our own role-tinted emblem: a radial-lit diamond with a category glyph
 * (heart for healing, radar for tracking, skull for a hex, …).
 */
export function PerkIcon({
  name,
  slug,
  role,
  categories,
  icon,
  className,
}: PerkIconProps) {
  const src = icon ?? PERK_ART[slug];
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        fill
        sizes="80px"
        className={cn("object-cover", className)}
      />
    );
  }

  const hue = hueFromString(slug);
  const accent = role === "killer" ? 354 : 190; // crimson vs teal base
  const a = `hsl(${accent}, ${role === "killer" ? 62 : 52}%, 56%)`;
  const b = `hsl(${(hue + accent) / 2}, 38%, 30%)`;
  // Bright, legible tint for the glyph itself (lighter than the frame accent).
  const glyphColor = `hsl(${accent}, ${role === "killer" ? 75 : 60}%, 80%)`;
  const Glyph = glyphForPerk(slug, categories, role);

  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id={`pg-${slug}`} cx="50%" cy="34%" r="75%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="55%" stopColor={b} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0b0d13" stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={`url(#pg-${slug})`} />
        {/* faint ornamental diamond */}
        <rect
          x="26"
          y="26"
          width="48"
          height="48"
          rx="6"
          transform="rotate(45 50 50)"
          fill="none"
          stroke={a}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>
      {/* category glyph, centered over the emblem */}
      <span className="absolute inset-0 grid place-items-center">
        <Glyph
          className="h-[42%] w-[42%] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          strokeWidth={1.6}
          style={{ color: glyphColor }}
        />
      </span>
    </div>
  );
}
