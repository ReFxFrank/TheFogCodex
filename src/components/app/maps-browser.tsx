"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Globe, Trees, Building2, Warehouse } from "lucide-react";
import { MAP_SETTINGS, type MapSetting } from "@/types";
import { maps } from "@/data";
import { fuzzyFilter } from "@/lib/search";
import { MapCard } from "./map-card";
import { EmptyState } from "./empty-state";

const SETTING_TAB = [
  { v: "all" as const, l: "All", Icon: Globe },
  { v: "outdoor" as const, l: "Outdoor", Icon: Trees },
  { v: "indoor" as const, l: "Indoor", Icon: Building2 },
  { v: "mixed" as const, l: "Mixed", Icon: Warehouse },
];

const SIZE_ORDER = { large: 0, medium: 1, small: 2 } as const;

export function MapsBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const settingParam = params.get("setting");
  const setting: MapSetting | "all" = MAP_SETTINGS.includes(
    settingParam as MapSetting,
  )
    ? (settingParam as MapSetting)
    : "all";
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
    let list = setting === "all" ? [...maps] : maps.filter((m) => m.setting === setting);
    if (q.trim()) list = fuzzyFilter(list, q, ["name", "realm", "tags"]);
    return list.sort(
      (a, b) =>
        SIZE_ORDER[a.size] - SIZE_ORDER[b.size] ||
        a.realm.localeCompare(b.realm) ||
        a.name.localeCompare(b.name),
    );
  }, [setting, q]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter maps by setting"
          className="inline-flex gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1"
        >
          {SETTING_TAB.map((t) => (
            <button
              key={t.v}
              role="tab"
              aria-selected={setting === t.v}
              onClick={() =>
                update((p) => (t.v === "all" ? p.delete("setting") : p.set("setting", t.v)))
              }
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                setting === t.v ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
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
            placeholder="Search maps & realms…"
            className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </div>
      </div>

      <p className="text-sm text-ink-3">{results.length} maps</p>

      {results.length === 0 ? (
        <EmptyState
          title="Lost in the fog"
          message="No maps match your search. Try a different name or realm."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((m) => (
            <MapCard key={m.slug} map={m} />
          ))}
        </div>
      )}
    </div>
  );
}
