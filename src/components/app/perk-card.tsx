import Link from "next/link";
import { Flag } from "lucide-react";
import type { Perk } from "@/types";
import { getCharacter, getMetaNote } from "@/data";
import { titleCase } from "@/lib/utils";
import { PerkSlot } from "./perk-slot";
import { TierBadge } from "./tier-badge";

interface PerkCardProps {
  perk: Perk;
}

/** Knowledgebase card: emblem, owner, categories, tier hint, effect. */
export function PerkCard({ perk }: PerkCardProps) {
  const owner = perk.characterSlug ? getCharacter(perk.characterSlug) : undefined;
  const metaNote = getMetaNote(perk.slug);

  return (
    <Link
      href={`/perks/${perk.slug}`}
      data-role={perk.role}
      className="group relative flex gap-3 overflow-hidden rounded-2xl glass p-3.5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent focus-visible:-translate-y-1 focus-visible:glow-accent"
    >
      <PerkSlot perk={perk} size="md" href={null} className="shrink-0" />

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-ink">
            {perk.name}
          </h3>
          {perk.tierHint && <TierBadge tier={perk.tierHint} size="sm" />}
        </div>

        <p className="mt-1 text-[11px] text-ink-3">
          {owner ? owner.name : "General perk"}
          <span className="mx-1.5 text-white/15">•</span>
          <span className="uppercase tracking-wide text-accent">{perk.role}</span>
        </p>

        <p className="mt-1.5 line-clamp-2 text-xs text-ink-2">{perk.description}</p>

        <div className="mt-2 flex flex-wrap items-center gap-1">
          {perk.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-3"
            >
              {titleCase(c)}
            </span>
          ))}
          {metaNote && (
            <span
              title={metaNote}
              className="inline-flex items-center gap-1 rounded-md border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold"
            >
              <Flag className="h-2.5 w-2.5" />
              Meta history
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
