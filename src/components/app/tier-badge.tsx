import type { MetaTier } from "@/types";
import { cn } from "@/lib/utils";

const TIER_STYLE: Record<MetaTier, { color: string; label: string; ring: string }> = {
  S: { color: "text-tier-s", label: "S", ring: "border-tier-s/45 bg-tier-s/10" },
  A: { color: "text-tier-a", label: "A", ring: "border-tier-a/45 bg-tier-a/10" },
  B: { color: "text-tier-b", label: "B", ring: "border-tier-b/45 bg-tier-b/10" },
  C: { color: "text-tier-c", label: "C", ring: "border-tier-c/45 bg-tier-c/10" },
  "off-meta": {
    color: "text-tier-off",
    label: "Off-meta",
    ring: "border-tier-off/40 bg-tier-off/10",
  },
};

interface TierBadgeProps {
  tier: MetaTier;
  size?: "sm" | "md";
  withLabel?: boolean;
  className?: string;
}

/** Meta-tier pill. The gold S-tier is the standout. */
export function TierBadge({ tier, size = "md", withLabel = false, className }: TierBadgeProps) {
  const s = TIER_STYLE[tier];
  const isShort = tier !== "off-meta";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-bold uppercase tracking-wide",
        s.ring,
        s.color,
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
        tier === "S" && "shadow-[0_0_14px_-2px_rgba(227,179,65,0.45)]",
        className,
      )}
      title={`${tier === "off-meta" ? "Off-meta" : `${tier}-tier`}`}
    >
      <span className={cn(isShort ? (size === "sm" ? "text-xs" : "text-sm") : "")}>
        {s.label}
      </span>
      {withLabel && isShort && (
        <span className="text-[10px] font-medium text-ink-2">tier</span>
      )}
    </span>
  );
}
