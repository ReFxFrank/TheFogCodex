import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import type { Character } from "@/types";
import { titleCase } from "@/lib/utils";
import { CharacterPortrait } from "./character-portrait";
import { TierBadge } from "./tier-badge";

interface CharacterCardProps {
  character: Character;
}

/** Roster card: portrait, name, tier (killers), archetype tags, licensed mark. */
export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      data-role={character.role}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl glass p-4 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent focus-visible:-translate-y-1 focus-visible:glow-accent"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <CharacterPortrait
          name={character.name}
          slug={character.slug}
          role={character.role}
          portrait={character.portrait}
          rounded="xl"
          className="h-20 w-20 ring-1 ring-white/10 transition group-hover:ring-accent"
        />
        {character.killerTier && (
          <TierBadge
            tier={character.killerTier}
            size="sm"
            className="absolute -right-2 -top-2"
          />
        )}
      </div>

      <h3 className="mt-3 flex items-center gap-1 font-display text-sm font-semibold leading-tight text-ink">
        {character.name}
        {character.licensed && (
          <BadgeCheck
            className="h-3.5 w-3.5 text-gold"
            aria-label="Licensed character"
          />
        )}
      </h3>
      {character.realName && character.realName !== character.name && (
        <p className="text-[11px] text-ink-3">{character.realName}</p>
      )}

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {character.archetypeTags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-ink-3"
          >
            {titleCase(t)}
          </span>
        ))}
      </div>
    </Link>
  );
}
