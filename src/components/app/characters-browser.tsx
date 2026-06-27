"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Shield, Skull } from "lucide-react";
import { type MetaTier, type Role } from "@/types";
import { charactersByRole } from "@/data";
import { fuzzyFilter } from "@/lib/search";
import { CharacterCard } from "./character-card";
import { EmptyState } from "./empty-state";

const TIER_ORDER: Record<MetaTier, number> = { S: 0, A: 1, B: 2, C: 3, "off-meta": 4 };

export function CharactersBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const role = (params.get("role") as Role) === "killer" ? "killer" : "survivor";
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

  const results = useMemo(() => {
    let list = charactersByRole(role);
    if (q.trim()) list = fuzzyFilter(list, q, ["name", "realName", "blurb"]);
    return [...list].sort((a, b) => {
      if (role === "killer") {
        const ta = a.killerTier ? TIER_ORDER[a.killerTier] : 5;
        const tb = b.killerTier ? TIER_ORDER[b.killerTier] : 5;
        if (ta !== tb) return ta - tb;
      }
      return a.name.localeCompare(b.name);
    });
  }, [role, q]);

  return (
    <div data-role={role} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter roster by role"
          className="inline-flex gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1"
        >
          {([
            { v: "survivor" as Role, l: "Survivors", Icon: Shield },
            { v: "killer" as Role, l: "Killers", Icon: Skull },
          ]).map((t) => (
            <button
              key={t.v}
              role="tab"
              aria-selected={role === t.v}
              data-role={t.v}
              onClick={() => update((p) => p.set("role", t.v))}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                role === t.v ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
              }`}
            >
              <t.Icon className="h-4 w-4" />
              {t.l}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) =>
              update((p) => (e.target.value ? p.set("q", e.target.value) : p.delete("q")))
            }
            placeholder="Search the roster…"
            className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </div>
      </div>

      <p className="text-sm text-ink-3">
        {results.length} {role === "killer" ? "Killers" : "Survivors"} catalogued
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No one answers the call"
          message="No characters match your search. Try a different name."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((c) => (
            <CharacterCard key={c.slug} character={c} />
          ))}
        </div>
      )}
    </div>
  );
}
