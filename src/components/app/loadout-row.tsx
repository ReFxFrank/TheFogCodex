import type { LoadoutItem, Role } from "@/types";
import { getPerks } from "@/data";
import { PerkSlot } from "./perk-slot";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<LoadoutItem["kind"], string> = {
  addon: "Add-on",
  offering: "Offering",
  item: "Item",
};

interface LoadoutRowProps {
  perkSlugs: readonly string[];
  role: Role;
  size?: "mini" | "sm" | "md" | "lg";
  showNames?: boolean;
  linked?: boolean;
  extras?: LoadoutItem[];
  className?: string;
}

/** A row of four perk slots — the visual heart of every build. */
export function LoadoutRow({
  perkSlugs,
  role,
  size = "md",
  showNames = false,
  linked = true,
  extras,
  className,
}: LoadoutRowProps) {
  const perks = getPerks(perkSlugs);
  const gap = size === "mini" ? "gap-1.5" : size === "lg" ? "gap-3 sm:gap-4" : "gap-2 sm:gap-3";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className={cn("flex items-start", gap)}>
        {perks.map((perk) => (
          <PerkSlot
            key={perk.slug}
            perk={perk}
            size={size}
            showName={showNames}
            href={linked ? undefined : null}
          />
        ))}
      </div>

      {extras && extras.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {extras.map((x, i) => (
            <span
              key={`${x.kind}-${x.name}-${i}`}
              className="glass inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-ink-2"
              title={x.note}
            >
              <span className="font-semibold uppercase tracking-wide text-[10px] text-accent">
                {KIND_LABEL[x.kind]}
              </span>
              {x.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
