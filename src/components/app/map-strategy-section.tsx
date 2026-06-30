import Link from "next/link";
import { Skull, Shield, Swords, ArrowRight } from "lucide-react";
import type { GameMap } from "@/types";
import { deriveMapStrategy } from "@/lib/map-strategy";
import { titleCase } from "@/lib/utils";
import { TierBadge } from "./tier-badge";

export function MapStrategySection({ map }: { map: GameMap }) {
  const s = deriveMapStrategy(map);
  if (s.killers.length === 0 && s.survivorPerks.length === 0 && s.killerPerks.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold text-ink">
        How to approach {map.name}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{s.demand}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Killers that thrive */}
        {s.killers.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
              <Skull className="h-3.5 w-3.5 text-killer" />
              Killers that tend to thrive
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.killers.map((k) => (
                <Link
                  key={k.slug}
                  href={`/characters/${k.slug}`}
                  data-role="killer"
                  title={k.matched.map(titleCase).join(" · ")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-fog-800/60 px-2.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-accent hover:text-ink"
                >
                  {k.name}
                  {k.tier && <TierBadge tier={k.tier} size="sm" />}
                </Link>
              ))}
            </div>
            {s.strugglesNote && (
              <p className="mt-3 text-xs text-ink-3">{s.strugglesNote}</p>
            )}
          </div>
        )}

        {/* Perks worth bringing */}
        {(s.survivorPerks.length > 0 || s.killerPerks.length > 0) && (
          <div className="flex flex-col gap-5">
            <PerkColumn
              role="survivor"
              label="Survivor perks"
              Icon={Shield}
              perks={s.survivorPerks}
            />
            <PerkColumn
              role="killer"
              label="Killer perks"
              Icon={Swords}
              perks={s.killerPerks}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function PerkColumn({
  role,
  label,
  Icon,
  perks,
}: {
  role: "survivor" | "killer";
  label: string;
  Icon: typeof Shield;
  perks: { slug: string; name: string; reason: string }[];
}) {
  if (perks.length === 0) return null;
  return (
    <div data-role={role}>
      <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
        <Icon className="h-3.5 w-3.5 text-accent" />
        {label}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {perks.map((p) => (
          <li key={p.slug} className="text-sm leading-snug text-ink-3">
            <Link
              href={`/perks/${p.slug}`}
              className="inline-flex items-center gap-0.5 font-medium text-accent hover:underline"
            >
              {p.name}
              <ArrowRight className="h-3 w-3" />
            </Link>{" "}
            — {p.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
