"use client";

import { cn } from "@/lib/utils";

export interface ChipOption {
  value: string;
  label: string;
}

interface ChipGroupProps {
  label: string;
  options: ChipOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

/** Multi-select chip row used for archetype / difficulty / tier filters. */
export function ChipGroup({ label, options, selected, onToggle }: ChipGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onToggle(o.value)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors",
                active
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-white/10 text-ink-2 hover:border-white/25 hover:text-ink",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
