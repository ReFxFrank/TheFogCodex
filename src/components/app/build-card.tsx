import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Build } from "@/types";
import { getCharacter } from "@/data";
import { titleCase } from "@/lib/utils";
import { LoadoutRow } from "./loadout-row";
import { TierBadge } from "./tier-badge";
import { DifficultyDots } from "./difficulty-dots";
import { CharacterChip } from "./character-chip";
import { FavoriteButton } from "./favorite-button";

interface BuildCardProps {
  build: Build;
}

/** First-class build object: visual loadout, honest signal, cross-links. */
export function BuildCard({ build }: BuildCardProps) {
  const character = build.characterSlug ? getCharacter(build.characterSlug) : undefined;

  return (
    <Link
      href={`/builds/${build.slug}`}
      data-role={build.role}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent focus-visible:-translate-y-1 focus-visible:glow-accent"
    >
      {/* role accent stripe */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={build.metaTier} size="sm" />
          <DifficultyDots difficulty={build.difficulty} />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            {build.role}
          </span>
        </div>
        <FavoriteButton slug={build.slug} className="-mr-1 -mt-1" />
      </div>

      <h3 className="font-display text-lg font-semibold leading-tight text-ink">
        {build.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-ink-2">{build.summary}</p>

      <div className="my-4">
        <LoadoutRow
          perkSlugs={build.perkSlugs}
          role={build.role}
          size="sm"
          linked={false}
        />
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {character ? (
            <CharacterChip character={character} href={null} />
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-ink-3">
              Any character
            </span>
          )}
          {build.archetypes.slice(0, 1).map((a) => (
            <span
              key={a}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-ink-3"
            >
              {titleCase(a)}
            </span>
          ))}
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
      </div>
    </Link>
  );
}
