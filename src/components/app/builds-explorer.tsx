"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, Search, X } from "lucide-react";
import {
  DIFFICULTY,
  META_TIER,
  type Build,
  type Difficulty,
  type MetaTier,
  type Role,
} from "@/types";
import { builds, charactersByRole, characters, perksByRole, perks } from "@/data";
import { fuzzyFilter } from "@/lib/search";
import { useFavorites } from "@/hooks/use-favorites";
import { titleCase } from "@/lib/utils";
import { BuildCard } from "./build-card";
import { FilterCombo } from "./filter-combo";
import { ChipGroup } from "./filter-chips";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";

const TIER_ORDER: Record<MetaTier, number> = { S: 0, A: 1, B: 2, C: 3, "off-meta": 4 };
const DIFF_ORDER: Record<Difficulty, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  expert: 3,
};

const SORTS = [
  { value: "tier", label: "Meta tier" },
  { value: "difficulty", label: "Difficulty" },
  { value: "az", label: "A–Z" },
  { value: "recent", label: "Recently added" },
] as const;

function parseList(v: string | null): string[] {
  return v ? v.split(",").filter(Boolean) : [];
}

export function BuildsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const favorites = useFavorites();
  const [sheetOpen, setSheetOpen] = useState(false);

  const role = (params.get("role") as Role | null) ?? null;
  const arch = parseList(params.get("arch"));
  const char = params.get("char");
  const perk = params.get("perk");
  const diff = parseList(params.get("diff"));
  const tier = parseList(params.get("tier"));
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "tier";
  const favOnly = params.get("fav") === "1";

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
    (key: string, value: string | null) =>
      update((p) => (value ? p.set(key, value) : p.delete(key))),
    [update],
  );

  const toggleInList = useCallback(
    (key: string, value: string) =>
      update((p) => {
        const list = parseList(p.get(key));
        const nl = list.includes(value)
          ? list.filter((x) => x !== value)
          : [...list, value];
        if (nl.length) p.set(key, nl.join(","));
        else p.delete(key);
      }),
    [update],
  );

  const clearAll = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [pathname, router],
  );

  // Options scoped to the active role.
  const roleBuilds = useMemo(
    () => (role ? builds.filter((b) => b.role === role) : builds),
    [role],
  );

  const archOptions = useMemo(() => {
    const set = new Set<string>();
    for (const b of roleBuilds) for (const a of b.archetypes) set.add(a);
    return [...set].sort().map((v) => ({ value: v, label: titleCase(v) }));
  }, [roleBuilds]);

  const charOptions = useMemo(() => {
    const list = role ? charactersByRole(role) : characters;
    return list.map((c) => ({
      value: c.slug,
      label: c.name,
      sublabel: c.killerTier ? `${c.killerTier}-tier` : c.realName,
    }));
  }, [role]);

  const perkOptions = useMemo(() => {
    const list = role ? perksByRole(role) : perks;
    return list.map((p) => ({ value: p.slug, label: p.name }));
  }, [role]);

  // Filter + sort.
  const results = useMemo(() => {
    let list = roleBuilds.filter((b) => {
      if (arch.length && !b.archetypes.some((a) => arch.includes(a))) return false;
      if (char && b.characterSlug !== char) return false;
      if (perk && !b.perkSlugs.includes(perk)) return false;
      if (diff.length && !diff.includes(b.difficulty)) return false;
      if (tier.length && !tier.includes(b.metaTier)) return false;
      if (favOnly && !favorites.includes(b.slug)) return false;
      return true;
    });

    if (q.trim()) {
      const augmented = list.map((b) => ({
        ...b,
        _perks: b.perkSlugs
          .map((s) => perks.find((p) => p.slug === s)?.name ?? s)
          .join(" "),
      }));
      const matched = fuzzyFilter(augmented, q, ["title", "summary", "_perks"]);
      list = matched.map(({ _perks, ...b }) => b as Build);
    }

    const sorted = [...list];
    if (sort === "tier")
      sorted.sort((a, b) => TIER_ORDER[a.metaTier] - TIER_ORDER[b.metaTier]);
    else if (sort === "difficulty")
      sorted.sort((a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]);
    else if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "recent") sorted.reverse();
    return sorted;
  }, [roleBuilds, arch, char, perk, diff, tier, favOnly, favorites, q, sort]);

  const activeCount =
    (role ? 1 : 0) +
    arch.length +
    (char ? 1 : 0) +
    (perk ? 1 : 0) +
    diff.length +
    tier.length +
    (favOnly ? 1 : 0);

  const charName = char ? characters.find((c) => c.slug === char)?.name : null;
  const perkName = perk ? perks.find((p) => p.slug === perk)?.name : null;

  const panel = (
    <div className="flex flex-col gap-5">
      {/* Role segmented control */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          Role
        </span>
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
          {[
            { v: null, l: "All" },
            { v: "survivor" as Role, l: "Survivor" },
            { v: "killer" as Role, l: "Killer" },
          ].map((opt) => {
            const active = role === opt.v;
            return (
              <button
                key={opt.l}
                type="button"
                data-role={opt.v ?? undefined}
                onClick={() => {
                  // changing role clears role-scoped filters
                  update((p) => {
                    if (opt.v) p.set("role", opt.v);
                    else p.delete("role");
                    p.delete("arch");
                    p.delete("char");
                    p.delete("perk");
                  });
                }}
                className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                  active ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                }`}
              >
                {opt.l}
              </button>
            );
          })}
        </div>
      </div>

      <ChipGroup
        label="Archetype"
        options={archOptions}
        selected={arch}
        onToggle={(v) => toggleInList("arch", v)}
      />
      <FilterCombo
        label="Character"
        value={char}
        options={charOptions}
        onChange={(v) => setParam("char", v)}
      />
      <FilterCombo
        label="Includes perk"
        value={perk}
        options={perkOptions}
        onChange={(v) => setParam("perk", v)}
      />
      <ChipGroup
        label="Difficulty"
        options={DIFFICULTY.map((d) => ({ value: d, label: titleCase(d) }))}
        selected={diff}
        onToggle={(v) => toggleInList("diff", v)}
      />
      <ChipGroup
        label="Meta tier"
        options={META_TIER.map((t) => ({
          value: t,
          label: t === "off-meta" ? "Off-meta" : t,
        }))}
        selected={tier}
        onToggle={(v) => toggleInList("tier", v)}
      />
      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-2">
        <input
          type="checkbox"
          checked={favOnly}
          onChange={(e) => setParam("fav", e.target.checked ? "1" : null)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Show only my favorites
      </label>
    </div>
  );

  return (
    <div data-role={role ?? "survivor"} className="flex flex-col gap-6">
      {/* Search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) => setParam("q", e.target.value || null)}
            placeholder="Search builds by name, summary, or perk…"
            className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "tier" ? null : e.target.value)}
            aria-label="Sort builds"
            className="rounded-lg border border-white/10 bg-fog-800/60 px-3 py-2.5 text-sm text-ink outline-none focus-visible:border-accent"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value} className="bg-fog-800">
                Sort: {s.label}
              </option>
            ))}
          </select>
          {/* Mobile filter trigger */}
          <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
            <Dialog.Trigger asChild>
              <Button variant="glass" size="md" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-fog-950">
                    {activeCount}
                  </span>
                )}
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-[90] w-[min(88vw,360px)] overflow-y-auto glass-elevated p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title className="font-display text-lg font-semibold text-ink">
                    Filters
                  </Dialog.Title>
                  <Dialog.Close className="rounded-md p-1 text-ink-3 hover:text-ink">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>
                {panel}
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearAll} className="flex-1">
                    Clear all
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => setSheetOpen(false)}
                    className="flex-1"
                  >
                    Show {results.length}
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Active filter chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {role && <ActiveChip label={titleCase(role)} onRemove={() => setParam("role", null)} />}
          {arch.map((a) => (
            <ActiveChip key={a} label={titleCase(a)} onRemove={() => toggleInList("arch", a)} />
          ))}
          {charName && <ActiveChip label={charName} onRemove={() => setParam("char", null)} />}
          {perkName && (
            <ActiveChip label={`Perk: ${perkName}`} onRemove={() => setParam("perk", null)} />
          )}
          {diff.map((d) => (
            <ActiveChip key={d} label={titleCase(d)} onRemove={() => toggleInList("diff", d)} />
          ))}
          {tier.map((t) => (
            <ActiveChip
              key={t}
              label={t === "off-meta" ? "Off-meta" : `${t}-tier`}
              onRemove={() => toggleInList("tier", t)}
            />
          ))}
          {favOnly && <ActiveChip label="Favorites" onRemove={() => setParam("fav", null)} />}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-medium text-ink-3 underline-offset-2 hover:text-ink hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 glass rounded-2xl p-5">{panel}</div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-ink-3">
            {results.length} {results.length === 1 ? "build" : "builds"}
            {role ? ` · ${titleCase(role)}` : ""}
          </p>
          {results.length === 0 ? (
            <EmptyState
              action={
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((b) => (
                <BuildCard key={b.slug} build={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent-soft py-1 pl-2.5 pr-1.5 text-xs text-ink">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="grid h-4 w-4 place-items-center rounded-full hover:bg-white/10"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
