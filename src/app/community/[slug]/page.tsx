import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { auth } from "@/auth";
import {
  getCommunityBuild,
  getRatingSummary,
  getComments,
} from "@/lib/community";
import { getCharacter, getPerks } from "@/data";
import { titleCase } from "@/lib/utils";
import type { Role } from "@/types";
import { LoadoutRow } from "@/components/app/loadout-row";
import { DifficultyDots } from "@/components/app/difficulty-dots";
import { AuthorChip } from "@/components/app/author-chip";
import { CharacterChip } from "@/components/app/character-chip";
import { PerkSlot } from "@/components/app/perk-slot";
import { RatingWidget } from "@/components/app/rating-widget";
import { CommentsSection } from "@/components/app/comments-section";
import { DeleteBuildButton } from "@/components/app/delete-build-button";
import { ReportButton } from "@/components/app/report-button";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const summary = await getCommunityBuild(slug);
  if (!summary) return { title: "Build not found" };
  return { title: `${summary.build.title} (Community)`, description: summary.build.summary };
}

export default async function CommunityBuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let summary: Awaited<ReturnType<typeof getCommunityBuild>> = null;
  let rating = { avg: 0, count: 0, userValue: null as number | null };
  let comments: Awaited<ReturnType<typeof getComments>> = [];
  let currentUserId: string | null = null;
  try {
    summary = await getCommunityBuild(slug);
    if (summary) {
      const session = await auth();
      currentUserId = session?.user?.id ?? null;
      const [r, c] = await Promise.all([
        getRatingSummary(summary.build.id, currentUserId ?? undefined),
        getComments(summary.build.id),
      ]);
      rating = r;
      comments = c;
    }
  } catch (err) {
    console.error("[community detail] db error:", err);
    summary = null;
  }
  if (!summary) notFound();

  const b = summary.build;
  const role = b.role as Role;
  const isOwner = currentUserId === b.authorId;

  const character = b.characterSlug ? getCharacter(b.characterSlug) : undefined;
  const perks = getPerks(b.perkSlugs);

  return (
    <div data-role={role} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Community builds
      </Link>

      <header className="mt-5 overflow-hidden rounded-2xl glass-elevated p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-accent/40 bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            Community
          </span>
          <DifficultyDots difficulty={b.difficulty as never} withLabel />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            {role}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {b.title}
          </h1>
          {isOwner ? (
            <DeleteBuildButton buildId={b.id} />
          ) : (
            currentUserId && <ReportButton targetType="build" targetId={b.id} />
          )}
        </div>
        <p className="mt-2 max-w-2xl text-base text-ink-2">{b.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <AuthorChip name={summary.authorName} image={summary.authorImage} size="md" />
          {character && <CharacterChip character={character} href={`/characters/${character.slug}`} />}
          {b.archetypes.map((a) => (
            <span
              key={a}
              className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-ink-2"
            >
              {titleCase(a)}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-6 rounded-2xl glass p-6 sm:p-8">
        <h2 className="mb-1 font-display text-lg font-semibold text-ink">The loadout</h2>
        <p className="mb-6 text-sm text-ink-3">Tap any perk to open its knowledgebase page.</p>
        <LoadoutRow perkSlugs={b.perkSlugs} role={role} size="lg" showNames />
      </section>

      {b.whyItWorks && (
        <section className="mt-6 rounded-2xl glass p-6">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <Lightbulb className="h-4 w-4" />
            Why it works
          </div>
          <p className="text-sm leading-relaxed text-ink-2">{b.whyItWorks}</p>
        </section>
      )}

      <div className="mt-6">
        <RatingWidget
          buildId={b.id}
          avg={rating.avg}
          count={rating.count}
          userValue={rating.userValue}
          isAuthenticated={Boolean(currentUserId)}
        />
      </div>

      {perks.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">The perks</h2>
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
                    <h3 className="font-display text-base font-semibold text-ink">
                      {perk.name}
                    </h3>
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
      )}

      <CommentsSection
        buildId={b.id}
        comments={comments}
        currentUserId={currentUserId}
        isAuthenticated={Boolean(currentUserId)}
      />
    </div>
  );
}
