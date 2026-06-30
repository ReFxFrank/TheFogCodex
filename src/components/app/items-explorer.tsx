"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Wrench,
  HeartPulse,
  Flashlight,
  KeyRound,
  Map as MapIcon,
  Gift,
  Coins,
  Skull,
  CloudFog,
  Clover,
  Anchor,
  Users,
  ShieldBan,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  ITEM_CATALOG,
  ITEM_RARITIES,
  type CatalogEntry,
  type ItemKind,
  type ItemType,
  type ItemRarity,
  type CatalogSide,
} from "@/data/items-catalog";
import { titleCase } from "@/lib/utils";
import { ChipGroup } from "./filter-chips";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";

const KIND_LABEL: Record<ItemKind, string> = { item: "Items", addon: "Add-ons", offering: "Offerings" };

const TYPE_ICON: Record<Exclude<ItemType, "none">, LucideIcon> = {
  toolbox: Wrench,
  medkit: HeartPulse,
  flashlight: Flashlight,
  key: KeyRound,
  map: MapIcon,
};

// Pick an icon for offerings from their tags.
function offeringIcon(tags: string[]): LucideIcon {
  const t = tags.join(" ");
  if (/mori|kill/.test(t)) return Skull;
  if (/fog|visibility|mist/.test(t)) return CloudFog;
  if (/luck|unhook/.test(t)) return Clover;
  if (/hook|basement|sacrifice/.test(t)) return Anchor;
  if (/spawn|shroud/.test(t)) return Users;
  if (/map|realm|hatch|chest|ward/.test(t)) return MapIcon;
  if (/bloodpoint|points/.test(t)) return Coins;
  if (/nullify|counter|block/.test(t)) return ShieldBan;
  if (/aura/.test(t)) return Sparkles;
  return Gift;
}

function entryIcon(e: CatalogEntry): LucideIcon {
  if (e.itemType !== "none") return TYPE_ICON[e.itemType];
  if (e.kind === "offering") return offeringIcon(e.tags);
  return Gift;
}

const RARITY_STYLE: Record<ItemRarity, string> = {
  common: "border-white/15 bg-white/5 text-ink-2",
  uncommon: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  rare: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "very-rare": "border-violet-400/40 bg-violet-400/10 text-violet-300",
  "ultra-rare": "border-rose-400/40 bg-rose-400/10 text-rose-300",
  event: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  none: "border-white/10 bg-white/5 text-ink-3",
};

const SIDE_STYLE: Record<CatalogSide, string> = {
  survivor: "text-survivor",
  killer: "text-killer",
  both: "text-gold",
};

function ItemCard({ entry }: { entry: CatalogEntry }) {
  const Icon = entryIcon(entry);
  return (
    <div
      data-role={entry.side === "killer" ? "killer" : "survivor"}
      className="flex gap-3 overflow-hidden rounded-2xl glass p-3.5"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center self-start rounded-xl border border-white/10 bg-fog-800 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-ink">
            {entry.name}
          </h3>
          {entry.rarity !== "none" && (
            <span
              className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-medium capitalize ${RARITY_STYLE[entry.rarity]}`}
            >
              {entry.rarity.replace("-", " ")}
            </span>
          )}
        </div>
        <p className="mt-1 text-[11px] text-ink-3">
          {entry.itemType !== "none" ? `${titleCase(entry.itemType)} ${entry.kind === "addon" ? "add-on" : "item"}` : titleCase(entry.kind)}
          <span className="mx-1.5 text-white/15">•</span>
          <span className={`uppercase tracking-wide ${SIDE_STYLE[entry.side]}`}>
            {entry.side === "both" ? "Both" : entry.side}
          </span>
        </p>
        <p className="mt-1.5 line-clamp-3 text-xs text-ink-2">{entry.description}</p>
      </div>
    </div>
  );
}

const KIND_ORDER: Record<ItemKind, number> = { item: 0, addon: 1, offering: 2 };
const RARITY_ORDER: Record<ItemRarity, number> = {
  common: 0, uncommon: 1, rare: 2, "very-rare": 3, "ultra-rare": 4, event: 5, none: 6,
};

export function ItemsExplorer() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<ItemKind | null>(null);
  const [side, setSide] = useState<CatalogSide | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = ITEM_CATALOG.filter((e) => {
      if (kind && e.kind !== kind) return false;
      if (side && e.side !== side) return false;
      if (types.length && !types.includes(e.itemType)) return false;
      if (rarities.length && !rarities.includes(e.rarity)) return false;
      if (needle) {
        const hay = `${e.name} ${e.description} ${e.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    return list.sort(
      (a, b) =>
        KIND_ORDER[a.kind] - KIND_ORDER[b.kind] ||
        RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity] ||
        a.name.localeCompare(b.name),
    );
  }, [q, kind, side, types, rarities]);

  const activeCount =
    (kind ? 1 : 0) + (side ? 1 : 0) + types.length + rarities.length + (q.trim() ? 1 : 0);
  const clearAll = () => {
    setQ("");
    setKind(null);
    setSide(null);
    setTypes([]);
    setRarities([]);
  };

  const typeOptions = [
    { value: "toolbox", label: "Toolbox" },
    { value: "medkit", label: "Med-Kit" },
    { value: "flashlight", label: "Flashlight" },
    { value: "key", label: "Key" },
    { value: "map", label: "Map" },
  ];
  const rarityOptions = ITEM_RARITIES.filter((r) => r !== "none").map((r) => ({
    value: r,
    label: titleCase(r.replace("-", " ")),
  }));

  return (
    <div data-role={side === "killer" ? "killer" : "survivor"} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl glass p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_minmax(0,260px)_minmax(0,200px)]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search items, add-ons & offerings…"
              className="w-full rounded-lg border border-white/10 bg-fog-800/60 py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">Type</span>
            <div className="grid grid-cols-4 gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
              {([null, "item", "addon", "offering"] as (ItemKind | null)[]).map((k) => (
                <button
                  key={k ?? "all"}
                  type="button"
                  onClick={() => setKind(k)}
                  className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                    kind === k ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {k ? KIND_LABEL[k] : "All"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">Side</span>
            <div className="grid grid-cols-4 gap-1 rounded-lg border border-white/10 bg-fog-800/50 p-1">
              {([null, "survivor", "killer", "both"] as (CatalogSide | null)[]).map((s) => (
                <button
                  key={s ?? "all"}
                  type="button"
                  data-role={s === "killer" ? "killer" : undefined}
                  onClick={() => setSide(s)}
                  className={`rounded-md px-1.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                    side === s ? "bg-accent text-fog-950" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s ?? "All"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <ChipGroup
          label="Item type"
          options={typeOptions}
          selected={types}
          onToggle={(v) => toggle(types, setTypes, v)}
        />
        <ChipGroup
          label="Rarity"
          options={rarityOptions}
          selected={rarities}
          onToggle={(v) => toggle(rarities, setRarities, v)}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-3">
          {results.length} {results.length === 1 ? "entry" : "entries"}
        </p>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear filters
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="Nothing in the bloodweb"
          message="No items, add-ons or offerings match these filters."
          action={
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((e) => (
            <ItemCard key={e.slug} entry={e} />
          ))}
        </div>
      )}
    </div>
  );
}
