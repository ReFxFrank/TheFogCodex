import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/app/breadcrumb-jsonld";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, ArrowRight } from "lucide-react";
import {
  characters,
  getCharacter,
  getPerksForCharacter,
  getBuildsForCharacter,
} from "@/data";
import { titleCase } from "@/lib/utils";
import { CharacterPortrait } from "@/components/app/character-portrait";
import { TierBadge } from "@/components/app/tier-badge";
import { PerkSlot } from "@/components/app/perk-slot";
import { BuildCard } from "@/components/app/build-card";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return { title: "Character not found" };
  return { title: character.name, description: character.blurb };
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const perks = getPerksForCharacter(character.slug);
  const recommended = getBuildsForCharacter(character.slug);

  return (
    <div data-role={character.role} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Characters", path: "/characters" },
          { name: character.name, path: `/characters/${character.slug}` },
        ]}
      />
      <Link
        href={`/characters?role=${character.role}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to roster
      </Link>

      <header className="mt-5 flex flex-col gap-6 rounded-2xl glass-elevated p-6 sm:flex-row sm:p-8">
        <CharacterPortrait
          name={character.name}
          slug={character.slug}
          role={character.role}
          portrait={character.portrait}
          rounded="xl"
          className="h-32 w-32 shrink-0 ring-1 ring-white/10 sm:h-40 sm:w-40"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {character.role}
            </span>
            {character.killerTier && (
              <TierBadge tier={character.killerTier} withLabel size="sm" />
            )}
            {character.licensed && (
              <span className="inline-flex items-center gap-1 rounded-md border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-gold">
                <BadgeCheck className="h-3 w-3" />
                Licensed
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {character.name}
          </h1>
          {character.realName && character.realName !== character.name && (
            <p className="text-sm text-ink-3">{character.realName}</p>
          )}
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-2">
            {character.blurb}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {character.archetypeTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-ink-3"
              >
                {titleCase(t)}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Teachable perks */}
      <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
        <h2 className="mb-1 font-display text-lg font-semibold text-ink">Teachable perks</h2>
        <p className="mb-5 text-sm text-ink-3">
          {perks.length > 0
            ? "Perks this character brings to the Bloodweb (catalogued in the Codex)."
            : "This character's teachable perks aren't catalogued in the Codex yet."}
        </p>
        {perks.length > 0 && (
          <div className="flex flex-wrap gap-5">
            {perks.map((perk) => (
              <PerkSlot key={perk.slug} perk={perk} size="lg" showName />
            ))}
          </div>
        )}
      </section>

      {/* Recommended builds */}
      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-display text-lg font-semibold text-ink">
            Recommended builds
          </h2>
          <span className="text-sm text-ink-3">({recommended.length})</span>
        </div>
        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
        ) : (
          <Link
            href={`/builds?role=${character.role}`}
            className="group inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            No build is pinned to {character.name} yet — browse all {titleCase(character.role)}{" "}
            builds
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </section>
    </div>
  );
}
