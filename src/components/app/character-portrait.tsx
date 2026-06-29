import Image from "next/image";
import { HeartPulse, Skull } from "lucide-react";
import type { Role } from "@/types";
import { hueFromString, initialsFromName } from "@/lib/placeholders";
import { CHARACTER_ART } from "@/data/art-manifest";
import { cn } from "@/lib/utils";

interface CharacterPortraitProps {
  name: string;
  slug: string;
  role: Role;
  portrait?: string;
  className?: string;
  rounded?: "full" | "xl";
}

/**
 * Role-tinted portrait placeholder (or real art if set). The placeholder is
 * a monogram over a radial-lit field, with a faint role watermark — a skull
 * for killers, a pulse for survivors — so it reads as a crafted emblem.
 */
export function CharacterPortrait({
  name,
  slug,
  role,
  portrait,
  className,
  rounded = "full",
}: CharacterPortraitProps) {
  const radius = rounded === "full" ? "rounded-full" : "rounded-xl";
  const src = portrait ?? CHARACTER_ART[slug];

  if (src) {
    return (
      <span className={cn("relative block overflow-hidden", radius, className)}>
        <Image src={src} alt={name} fill sizes="96px" className="object-cover" />
      </span>
    );
  }

  const hue = hueFromString(slug);
  const accent = role === "killer" ? 354 : 190;
  const a = `hsl(${accent}, ${role === "killer" ? 60 : 50}%, 50%)`;
  const b = `hsl(${(hue + accent) / 2}, 32%, 22%)`;
  const initials = initialsFromName(name);
  const Watermark = role === "killer" ? Skull : HeartPulse;

  return (
    <span
      className={cn("relative block overflow-hidden", radius, className)}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id={`cg-${slug}`} cx="50%" cy="28%" r="85%">
            <stop offset="0%" stopColor={a} stopOpacity="0.6" />
            <stop offset="60%" stopColor={b} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#08090e" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#cg-${slug})`} />
        {/* inner ring */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx={rounded === "full" ? "45" : "12"}
          fill="none"
          stroke={a}
          strokeOpacity="0.35"
          strokeWidth="1.25"
        />
      </svg>
      {/* faint role watermark behind the monogram */}
      <span className="absolute inset-0 grid place-items-center">
        <Watermark
          className="h-[58%] w-[58%]"
          strokeWidth={1.1}
          style={{ color: a, opacity: 0.16 }}
        />
      </span>
      {/* monogram — its own SVG overlay so it scales with the container */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <text
          x="50"
          y="52"
          dominantBaseline="central"
          textAnchor="middle"
          fontFamily="var(--font-cinzel), serif"
          fontSize="34"
          fontWeight="700"
          fill="#f3f4f7"
          fillOpacity="0.9"
        >
          {initials}
        </text>
      </svg>
    </span>
  );
}
