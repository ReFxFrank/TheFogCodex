import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/app/breadcrumb-jsonld";
import {
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  ShieldAlert,
  Swords,
  Sparkles,
} from "lucide-react";
import {
  builds,
  getBuild,
  getCharacter,
  getPerks,
  getRelatedBuilds,
} from "@/data";
import { titleCase } from "@/lib/utils";
import { LoadoutRow } from "@/components/app/loadout-row";
import { TierBadge } from "@/components/app/tier-badge";
import { DifficultyDots } from "@/components/app/difficulty-dots";
import { CharacterChip } from "@/components/app/character-chip";
import { FavoriteButton } from "@/components/app/favorite-button";
import { CopyShareButtons } from "@/components/app/copy-share-buttons";
import { PerkSlot } from "@/components/app/perk-slot";
import { BuildCard } from "@/components/app/build-card";

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) return { title: "Build not found" };
  return {
    title: build.title,
    description: build.summary,
  };
}

export default async function BuildDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();

  const character = build.characterSlug ? getCharacter(build.characterSlug) : undefined;
  const perks = getPerks(build.perkSlugs);
  const related = getRelatedBuilds(build);

  const copyText = [
    `${build.title} — ${titleCase(build.role)} build (${build.metaTier}-tier)`,
    character ? `Recommended: ${character.name}` : "Works on any character",
    `Perks: ${perks.map((p) => p.name).join(", ")}`,
    `— via The Fog Codex`,
  ].join("\n");

  return (
    <div data-role={build.role} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Builds", path: "/builds" },
          { name: build.title, path: `/builds/${build.slug}` },
        ]}
      />
      <Link
        href={`/builds?role=${build.role}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        All {titleCase(build.role)} builds
      </Link>

      {/* Hero */}
      <header className="mt-5 overflow-hidden rounded-2xl glass-elevated p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={build.metaTier} withLabel />
          <DifficultyDots difficulty={build.difficulty} withLabel />
          <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-ink-3">
            Patch {build.patch}
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {build.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-ink-2">{build.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {character ? (
            <CharacterChip character={character} href={`/characters/${character.slug}`} />
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ink-3">
              Works on any character
            </span>
          )}
          {build.archetypes.map((a) => (
            <span
              key={a}
              className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-ink-2"
            >
              {titleCase(a)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <FavoriteButton slug={build.slug} variant="full" />
          <CopyShareButtons copyText={copyText} path={`/builds/${build.slug}`} />
        </div>
      </header>

      {/* The loadout */}
      <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
        <h2 className="mb-1 font-display text-lg font-semibold text-ink">The loadout</h2>
        <p className="mb-6 text-sm text-ink-3">Tap any perk to open its knowledgebase page.</p>
        <LoadoutRow
          perkSlugs={build.perkSlugs}
          role={build.role}
          size="lg"
          showNames
          extras={build.extras}
        />
      </section>

      {/* Honest read */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoBlock
          icon={<Lightbulb className="h-4 w-4" />}
          label="Why it works"
          accent
        >
          {build.whyItWorks}
        </InfoBlock>
        {build.tradeoffs && (
          <InfoBlock icon={<ShieldAlert className="h-4 w-4" />} label="Trade-offs">
            {build.tradeoffs}
          </InfoBlock>
        )}
        {build.bestAgainst && (
          <InfoBlock
            icon={<Swords className="h-4 w-4" />}
            label="Best against"
            className={build.tradeoffs ? "md:col-span-2" : ""}
          >
            {build.bestAgainst}
          </InfoBlock>
        )}
      </section>

      {/* Perks in this build */}
      <section className="mt-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          The perks in this build
        </h2>
        <ul className="flex flex-col gap-3">
          {perks.map((perk) => (
            <li key={perk.slug}>
              <Link
                href={`/perks/${perk.slug}`}
                data-role={perk.role}
                className="group flex items-start gap-4 rounded-2xl glass p-4 transition-[transform,box-shadow] duration-300 hover:glow-accent"
              >
                <PerkSlot perk={perk} size="md" href={null} className="shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {perk.name}
                    </h3>
                    {perk.tierHint && <TierBadge tier={perk.tierHint} size="sm" />}
                  </div>
                  <p className="mt-1 text-sm text-ink-2">{perk.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent">
                    View perk
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Related builds */}
      {related.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <h2 className="font-display text-lg font-semibold text-ink">Related builds</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <BuildCard key={b.slug} build={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoBlock({
  icon,
  label,
  children,
  accent,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl glass p-6 ${className ?? ""}`}>
      <div
        className={`mb-2 inline-flex items-center gap-2 text-sm font-semibold ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {icon}
        {label}
      </div>
      <p className="text-sm leading-relaxed text-ink-2">{children}</p>
    </div>
  );
}
