import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Flag, LayoutGrid } from "lucide-react";
import {
  perks,
  getPerk,
  getCharacter,
  getBuildsUsingPerk,
  getMetaNote,
} from "@/data";
import { titleCase } from "@/lib/utils";
import { PerkSlot } from "@/components/app/perk-slot";
import { TierBadge } from "@/components/app/tier-badge";
import { CharacterChip } from "@/components/app/character-chip";
import { BuildCard } from "@/components/app/build-card";
import { EmptyState } from "@/components/app/empty-state";

export function generateStaticParams() {
  return perks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const perk = getPerk(slug);
  if (!perk) return { title: "Perk not found" };
  return { title: perk.name, description: perk.description };
}

export default async function PerkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perk = getPerk(slug);
  if (!perk) notFound();

  const owner = perk.characterSlug ? getCharacter(perk.characterSlug) : undefined;
  const usedIn = getBuildsUsingPerk(perk.slug);
  const metaNote = getMetaNote(perk.slug);

  return (
    <div data-role={perk.role} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href={`/perks?role=${perk.role}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        All {titleCase(perk.role)} perks
      </Link>

      <header className="mt-5 flex flex-col gap-6 rounded-2xl glass-elevated p-6 sm:flex-row sm:items-start sm:p-8">
        <PerkSlot perk={perk} size="lg" href={null} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {perk.role} perk
            </span>
            {perk.tierHint && <TierBadge tier={perk.tierHint} withLabel size="sm" />}
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {perk.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {owner ? (
              <CharacterChip character={owner} href={`/characters/${owner.slug}`} />
            ) : (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ink-3">
                General perk
              </span>
            )}
            {perk.categories.map((c) => (
              <Link
                key={c}
                href={`/perks?role=${perk.role}&cat=${c}`}
                className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-ink-2 transition-colors hover:text-ink"
              >
                {titleCase(c)}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
        <h2 className="mb-2 font-display text-lg font-semibold text-ink">Effect</h2>
        <p className="text-base leading-relaxed text-ink-2">{perk.description}</p>
        <p className="mt-4 text-xs text-ink-3">
          Paraphrased summary — see the in-game perk for exact values.
        </p>
      </section>

      {metaNote && (
        <section className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-6">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-gold">
            <Flag className="h-4 w-4" />
            Meta history
          </div>
          <p className="text-sm leading-relaxed text-ink-2">{metaNote}</p>
        </section>
      )}

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-accent" />
          <h2 className="font-display text-lg font-semibold text-ink">
            Builds using {perk.name}
          </h2>
          <span className="text-sm text-ink-3">({usedIn.length})</span>
        </div>
        {usedIn.length === 0 ? (
          <EmptyState
            title="Not in a featured build yet"
            message="No catalogued build currently runs this perk — but it may still be a strong situational pick."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usedIn.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
