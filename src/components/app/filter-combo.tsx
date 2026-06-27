"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface FilterComboProps {
  label: string;
  placeholder?: string;
  value: string | null;
  options: ComboOption[];
  onChange: (value: string | null) => void;
}

/** Searchable single-select filter in a popover. */
export function FilterCombo({
  label,
  placeholder = "Search…",
  value,
  options,
  onChange,
}: FilterComboProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = options.find((o) => o.value === value);
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        {label}
      </span>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-fog-800/60 px-3 py-2 text-left text-sm transition-colors hover:border-white/20",
              selected ? "text-ink" : "text-ink-3",
            )}
          >
            <span className="truncate">{selected ? selected.label : `All ${label.toLowerCase()}`}</span>
            {selected ? (
              <X
                className="h-4 w-4 shrink-0 text-ink-3 hover:text-ink"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(null);
                }}
              />
            ) : (
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-ink-3" />
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            align="start"
            className="z-[60] w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl glass-elevated p-1.5"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="mb-1 w-full rounded-lg border border-white/10 bg-fog-900/70 px-2.5 py-1.5 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
            />
            <div className="max-h-56 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-2 py-3 text-center text-xs text-ink-3">No matches.</p>
              )}
              {filtered.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value === value ? null : o.value);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
                >
                  <span className="flex flex-col">
                    <span className="truncate">{o.label}</span>
                    {o.sublabel && (
                      <span className="text-[11px] text-ink-3">{o.sublabel}</span>
                    )}
                  </span>
                  {o.value === value && <Check className="h-4 w-4 text-accent" />}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
