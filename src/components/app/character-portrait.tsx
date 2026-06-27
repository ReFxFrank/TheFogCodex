import Image from "next/image";
import type { Role } from "@/types";
import { hueFromString, initialsFromName } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

interface CharacterPortraitProps {
  name: string;
  slug: string;
  role: Role;
  portrait?: string;
  className?: string;
  rounded?: "full" | "xl";
}

/** Deterministic, role-tinted portrait placeholder (or real art if set). */
export function CharacterPortrait({
  name,
  slug,
  role,
  portrait,
  className,
  rounded = "full",
}: CharacterPortraitProps) {
  const radius = rounded === "full" ? "rounded-full" : "rounded-xl";

  if (portrait) {
    return (
      <span className={cn("relative block overflow-hidden", radius, className)}>
        <Image src={portrait} alt={name} fill sizes="96px" className="object-cover" />
      </span>
    );
  }

  const hue = hueFromString(slug);
  const accent = role === "killer" ? 354 : 190;
  const a = `hsl(${accent}, ${role === "killer" ? 60 : 50}%, 50%)`;
  const b = `hsl(${(hue + accent) / 2}, 32%, 22%)`;
  const initials = initialsFromName(name);

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
