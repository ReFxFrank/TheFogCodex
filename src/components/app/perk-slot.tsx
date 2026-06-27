import Link from "next/link";
import type { Role } from "@/types";
import { PerkIcon } from "./perk-icon";
import { cn } from "@/lib/utils";

type SlotSize = "mini" | "sm" | "md" | "lg";

const SIZE: Record<SlotSize, { frame: string; label: string }> = {
  mini: { frame: "w-9", label: "hidden" },
  sm: { frame: "w-12", label: "text-[10px] mt-1" },
  md: { frame: "w-16 sm:w-[4.5rem]", label: "text-xs mt-1.5" },
  lg: { frame: "w-20 sm:w-24", label: "text-sm mt-2" },
};

interface PerkSlotProps {
  perk?: { slug: string; name: string; role: Role; icon?: string };
  /** Fallback role for an empty slot. */
  role?: Role;
  size?: SlotSize;
  showName?: boolean;
  /** Pass null to render a non-interactive slot. */
  href?: string | null;
  className?: string;
}

/**
 * The signature loadout slot — an ornamental, beveled frame evoking
 * the in-game perk diamond, with the perk name beneath. Renders an
 * empty frame when no perk is supplied.
 */
export function PerkSlot({
  perk,
  role = "survivor",
  size = "md",
  showName = false,
  href,
  className,
}: PerkSlotProps) {
  const s = SIZE[size];

  const frame = (
    <div
      data-role={perk?.role ?? role}
      className={cn("perk-frame", s.frame, className)}
    >
      {perk ? (
        <PerkIcon
          name={perk.name}
          slug={perk.slug}
          role={perk.role}
          icon={perk.icon}
        />
      ) : (
        <span className="text-2xl text-ink-3/50" aria-hidden>
          ◇
        </span>
      )}
    </div>
  );

  const label =
    showName && perk ? (
      <span
        className={cn(
          "block max-w-[7rem] text-center font-medium leading-tight text-ink-2",
          s.label,
        )}
      >
        {perk.name}
      </span>
    ) : null;

  const target = href === undefined && perk ? `/perks/${perk.slug}` : href;

  if (target && perk) {
    return (
      <Link
        href={target}
        title={perk.name}
        className="group/slot flex flex-col items-center outline-none"
      >
        <div className="transition-transform duration-200 group-hover/slot:-translate-y-0.5">
          {frame}
        </div>
        {label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {frame}
      {label}
    </div>
  );
}
