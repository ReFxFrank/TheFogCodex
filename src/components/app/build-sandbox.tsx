"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Copy, Search, Share2, X } from "lucide-react";
import { type Role } from "@/types";
import { perksByRole, charactersByRole, getPerks, getCharacter } from "@/data";
import { fuzzyFilter } from "@/lib/search";
import { titleCase } from "@/lib/utils";
import { PerkSlot } from "./perk-slot";
import { LoadoutRow } from "./loadout-row";
import { FilterCombo } from "./filter-combo";
import { Button } from "@/components/ui/button";

function parseList(v: string | null): string[] {
  return v ? v.split(",").filter(Boolean) : [];
}

export function BuildSandbox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<"build" | "link" | null>(null);

  const role = (params.get("role") as Role) === "killer" ? "killer" : "survivor";
  const selected = parseList(params.get("p")).slice(0, 4);
  const char = params.get("char");

  const update = useCallback(
    (mut: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mut(next);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const setRole = (r: Role) =>
    update((p) => {
      p.set("role", r);
      p.delete("p");
      p.delete("char");
    });

  const togglePerk = (slug: string) =>
    update((p) => {
      const cur = parseList(p.get("p"));
      let next: string[];
      if (cur.includes(slug)) next = cur.filter((s) => s !== slug);
      else if (cur.length >= 4) return;
      else next = [...cur, slug];
      if (next.length) p.set("p", next.join(","));
      else p.delete("p");
    });

  const pool = useMemo(() => {
    const list = perksByRole(role);
    return query ? fuzzyFilter(list, query, ["name", "description"]) : list;
  }, [role, query]);

  const charOptions = useMemo(
    () => charactersByRole(role).map((c) => ({ value: c.slug, label: c.name })),
    [role],
  );

  const selectedPerks = getPerks(selected);
  const character = char ? getCharacter(char) : undefined;

  async function write(which: "build" | "link") {
    const text =
      which === "link" && typeof window !== "undefined"
        ? window.location.href
        : [
            `Custom ${titleCase(role)} build`,
            character ? `Character: ${character.name}` : "",
            `Perks: ${selectedPerks.map((p) => p.name).join(", ") || "(none yet)"}`,
            "— built in The Fog Codex sandbox",
          ]
            .filter(Boolean)
            .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div data-role={role} className="flex flex-col gap-6">
      {/* Live loadout preview */}
      <div className="rounded-2xl glass-elevated p-6 sm:p-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
            {(["survivor", "killer"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                data-role={r}
                onClick={() => setRole(r)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  role === r ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                }`}
              >
                {titleCase(r)}
              </button>
            ))}
          </div>
          <div className="sm:w-60">
            <FilterCombo
              label="Character"
              value={char}
              options={charOptions}
              onChange={(v) => update((p) => (v ? p.set("char", v) : p.delete("char")))}
            />
          </div>
        </div>

        <LoadoutRow
          perkSlugs={[
            selected[0] ?? "",
            selected[1] ?? "",
            selected[2] ?? "",
            selected[3] ?? "",
          ].filter(Boolean)}
          role={role}
          size="lg"
          showNames
          linked={false}
        />
        {selected.length < 4 && (
          <p className="mt-4 text-sm text-ink-3">
            {4 - selected.length} slot{4 - selected.length === 1 ? "" : "s"} open — pick perks below.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button variant="glass" size="sm" onClick={() => write("build")}>
            {copied === "build" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === "build" ? "Copied" : "Copy build"}
          </Button>
          <Button variant="glass" size="sm" onClick={() => write("link")}>
            {copied === "link" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied === "link" ? "Copied" : "Share link"}
          </Button>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => update((p) => p.delete("p"))}
            >
              <X className="h-4 w-4" />
              Clear perks
            </Button>
          )}
        </div>
      </div>

      {/* Perk picker */}
      <div>
        <div className="relative mb-4 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${role} perks…`}
            className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {pool.map((perk) => {
            const isSelected = selected.includes(perk.slug);
            const isFull = selected.length >= 4 && !isSelected;
            return (
              <button
                key={perk.slug}
                type="button"
                disabled={isFull}
                onClick={() => togglePerk(perk.slug)}
                aria-pressed={isSelected}
                className={`flex items-center gap-2 rounded-xl border p-2 text-left transition-colors ${
                  isSelected
                    ? "border-accent bg-accent-soft"
                    : isFull
                      ? "border-white/5 opacity-40"
                      : "border-white/10 hover:border-white/25"
                }`}
              >
                <PerkSlot perk={perk} size="sm" href={null} className="shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-ink">
                    {perk.name}
                  </span>
                  {perk.tierHint && (
                    <span className="text-[10px] text-ink-3">{perk.tierHint}-tier</span>
                  )}
                </span>
                {isSelected && <Check className="h-4 w-4 shrink-0 text-accent" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
