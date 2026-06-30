import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import type { GameMap, MapLean } from "@/types";
import { titleCase } from "@/lib/utils";
import { MapEmblem } from "./map-emblem";

const LEAN_BADGE: Record<MapLean, { label: string; cls: string }> = {
  killer: { label: "Killer-sided", cls: "border-killer/40 bg-killer/10 text-killer" },
  balanced: { label: "Balanced", cls: "border-gold/40 bg-gold/10 text-gold" },
  survivor: {
    label: "Survivor-sided",
    cls: "border-survivor/40 bg-survivor/10 text-survivor",
  },
};

export function leanRole(lean: MapLean): "killer" | "survivor" | undefined {
  return lean === "killer" ? "killer" : lean === "survivor" ? "survivor" : undefined;
}

/** Browse card: banner emblem, name, realm, setting/size/lean, defining tags. */
export function MapCard({ map }: { map: GameMap }) {
  const lean = LEAN_BADGE[map.lean];

  return (
    <Link
      href={`/maps/${map.slug}`}
      data-role={leanRole(map.lean)}
      className="group flex flex-col overflow-hidden rounded-2xl glass transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent focus-visible:-translate-y-1 focus-visible:glow-accent"
    >
      <MapEmblem
        name={map.name}
        slug={map.slug}
        setting={map.setting}
        lean={map.lean}
        image={map.image}
        className="aspect-[16/9] w-full"
      />

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-1 font-display text-base font-semibold leading-tight text-ink">
            {map.name}
            {map.licensed && (
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-gold" aria-label="Licensed realm" />
            )}
          </h3>
        </div>

        <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-3">
          <MapPin className="h-3 w-3" />
          {map.realm}
        </p>

        <p className="mt-2 line-clamp-2 text-xs text-ink-2">{map.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${lean.cls}`}>
            {lean.label}
          </span>
          <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-3">
            {titleCase(map.setting)}
          </span>
          <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-3">
            {titleCase(map.size)}
          </span>
        </div>
      </div>
    </Link>
  );
}
