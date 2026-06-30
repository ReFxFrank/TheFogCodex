import type { Metadata } from "next";
import { Wrench, HeartPulse, Flashlight, KeyRound, Map as MapIcon, Gift } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import {
  SURVIVOR_ITEMS,
  OFFERING_GROUPS,
  KILLER_ADDON_NOTE,
  type OfferingGroup,
} from "@/data/items";

export const metadata: Metadata = {
  title: "Items, Add-ons & Offerings",
  description:
    "A plain-English guide to Dead by Daylight survivor items (toolbox, medkit, flashlight, key, map), their notable add-ons, killer power add-ons, and what every kind of offering does.",
};

const ITEM_ICON: Record<string, typeof Wrench> = {
  toolbox: Wrench,
  medkit: HeartPulse,
  flashlight: Flashlight,
  key: KeyRound,
  map: MapIcon,
};

const SIDE_BADGE: Record<OfferingGroup["side"], { label: string; cls: string }> = {
  survivor: { label: "Survivor", cls: "border-survivor/40 bg-survivor/10 text-survivor" },
  killer: { label: "Killer", cls: "border-killer/40 bg-killer/10 text-killer" },
  both: { label: "Both sides", cls: "border-gold/40 bg-gold/10 text-gold" },
};

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Reference"
        title="Items, add-ons & offerings"
        description="Survivors bring an item plus up to two add-ons; killers bring two power add-ons; either side can burn an offering. Here's what each one is actually for. Exact numbers shift every patch — treat these as the gist."
        className="mb-10"
      />

      {/* Survivor items */}
      <section className="mb-12" data-role="survivor">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink">Survivor items</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SURVIVOR_ITEMS.map((item) => {
            const Icon = ITEM_ICON[item.slug] ?? Gift;
            return (
              <div key={item.slug} className="flex flex-col rounded-2xl glass p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-fog-800 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">{item.name}</h3>
                    <p className="text-xs text-accent">{item.summary}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.detail}</p>
                <div className="mt-4 border-t border-white/8 pt-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                    Notable add-ons
                  </p>
                  <ul className="flex flex-col gap-1.5 text-xs text-ink-3">
                    {item.addons.map((a) => (
                      <li key={a.name}>
                        <span className="font-medium text-ink-2">{a.name}</span> — {a.note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Offerings */}
      <section className="mb-12">
        <h2 className="mb-1 font-display text-xl font-semibold text-ink">Offerings</h2>
        <p className="mb-4 text-sm text-ink-3">
          Burned before the trial to tilt the odds — points, the map, the fog, spawns, and more.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {OFFERING_GROUPS.map((g) => {
            const badge = SIDE_BADGE[g.side];
            return (
              <div key={g.slug} className="flex flex-col rounded-2xl glass p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                    <Gift className="h-4 w-4 text-gold" />
                    {g.name}
                  </h3>
                  <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${badge.cls}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-2">{g.summary}</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-xs text-ink-3">
                  {g.examples.map((e) => (
                    <li key={e.name}>
                      <span className="font-medium text-ink-2">{e.name}</span> — {e.note}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Killer add-ons */}
      <section data-role="killer">
        <h2 className="mb-3 font-display text-xl font-semibold text-ink">Killer add-ons</h2>
        <p className="rounded-2xl glass p-6 text-sm leading-relaxed text-ink-2">
          {KILLER_ADDON_NOTE}
        </p>
      </section>
    </div>
  );
}
