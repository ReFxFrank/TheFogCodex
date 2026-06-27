"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  KILLER_PERK_CATEGORIES,
  SURVIVOR_PERK_CATEGORIES,
  type MetaTier,
  type Role,
} from "@/types";
import { perks, characters } from "@/data";
import { fuzzyFilter } from "@/lib/search";
import { titleCase } from "@/lib/utils";
import { PerkCard } from "./perk-card";
import { FilterCombo } from "./filter-combo";
import { ChipGroup } from "./filter-chips";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";

const TIER_ORDER: Record<MetaTier, number> = { S: 0, A: 1, B: 2, C: 3, "off-meta": 4 };

function parseList(v: string | null): string[] {
  return v ? v.split(",").filter(Boolean) : [];
}

export function PerksExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const role = (params.get("role") as Role | null) ?? null;
  const cats = parseList(params.get("cat"));
  const owner = params.get("owner");
  const q = params.get("q") ?? "";

  const update = useCallback(
    (mut: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mut(next);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const setParam = useCallback(
    (k: string, v: string | null) => update((p) => (v ? p.set(k, v) : p.delete(k))),
    [update],
  );
  const toggleInList = useCallback(
    (k: string, v: string) =>
      update((p) => {
        const list = parseList(p.get(k));
        const nl = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
        if (nl.length) p.set(k, nl.join(","));
        else p.delete(k);
      }),
    [update],
  );
  const clearAll = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [pathname, router],
  );

  const categoryOptions = useMemo(() => {
    const source =
      role === "killer"
        ? KILLER_PERK_CATEGORIES
        : role === "survivor"
          ? SURVIVOR_PERK_CATEGORIES
          : [...new Set([...SURVIVOR_PERK_CATEGORIES, ...KILLER_PERK_CATEGORIES])];
    return source.map((c) => ({ value: c, label: titleCase(c) }));
  }, [role]);

  const ownerOptions = useMemo(() => {
    const ownedSlugs = new Set(
      perks
        .filter((p) => p.characterSlug && (!role || p.role === role))
        .map((p) => p.characterSlug as string),
    );
    return characters
      .filter((c) => ownedSlugs.has(c.slug))
      .map((c) => ({ value: c.slug, label: c.name }));
  }, [role]);

  const results = useMemo(() => {
    let list = perks.filter((p) => {
      if (role && p.role !== role) return false;
      if (cats.length && !p.categories.some((c) => cats.includes(c))) return false;
      if (owner && p.characterSlug !== owner) return false;
      return true;
    });
    if (q.trim()) list = fuzzyFilter(list, q, ["name", "description"]);
    return [...list].sort((a, b) => {
      const ta = a.tierHint ? TIER_ORDER[a.tierHint] : 5;
      const tb = b.tierHint ? TIER_ORDER[b.tierHint] : 5;
      return ta - tb || a.name.localeCompare(b.name);
    });
  }, [role, cats, owner, q]);

  const activeCount = (role ? 1 : 0) + cats.length + (owner ? 1 : 0);

  return (
    <div data-role={role ?? "survivor"} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl glass p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_200px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setParam("q", e.target.value || null)}
              placeholder="Search perks by name or effect…"
              className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              Role
            </span>
            <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
              {[
                { v: null, l: "All" },
                { v: "survivor" as Role, l: "Surv" },
                { v: "killer" as Role, l: "Kill" },
              ].map((opt) => (
                <button
                  key={opt.l}
                  type="button"
                  data-role={opt.v ?? undefined}
                  onClick={() =>
                    update((p) => {
                      if (opt.v) p.set("role", opt.v);
                      else p.delete("role");
                      p.delete("cat");
                      p.delete("owner");
                    })
                  }
                  className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                    role === opt.v ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
          <FilterCombo
            label="Owner"
            value={owner}
            options={ownerOptions}
            onChange={(v) => setParam("owner", v)}
          />
        </div>
        <ChipGroup
          label="Category"
          options={categoryOptions}
          selected={cats}
          onToggle={(v) => toggleInList("cat", v)}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-3">
          {results.length} {results.length === 1 ? "perk" : "perks"}
        </p>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear filters
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No perks in the fog"
          message="Nothing matches these filters. Try a different role or category."
          action={
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((p) => (
            <PerkCard key={p.slug} perk={p} />
          ))}
        </div>
      )}
    </div>
  );
}
