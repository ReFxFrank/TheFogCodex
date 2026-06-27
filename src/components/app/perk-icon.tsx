import Image from "next/image";
import type { Role } from "@/types";
import { hueFromString, initialsFromName } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

interface PerkIconProps {
  name: string;
  slug: string;
  role: Role;
  icon?: string;
  className?: string;
}

/**
 * The inner emblem of a perk — a deterministic, role-tinted SVG
 * placeholder. If `icon` is set, the real asset is shown instead.
 */
export function PerkIcon({ name, slug, role, icon, className }: PerkIconProps) {
  if (icon) {
    return (
      <Image
        src={icon}
        alt={name}
        fill
        sizes="80px"
        className={cn("object-cover", className)}
      />
    );
  }

  const hue = hueFromString(slug);
  const initials = initialsFromName(name);
  const accent = role === "killer" ? 354 : 190; // crimson vs teal base
  const a = `hsl(${accent}, ${role === "killer" ? 62 : 52}%, 56%)`;
  const b = `hsl(${(hue + accent) / 2}, 38%, 30%)`;

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
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fontFamily="var(--font-cinzel), serif"
          fontSize="30"
          fontWeight="700"
          fill="#f3f4f7"
          fillOpacity="0.92"
          style={{ letterSpacing: "0.02em" }}
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
