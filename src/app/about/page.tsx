import type { Metadata } from "next";
import Link from "next/link";
import { ROSTER_STATS } from "@/data";
import { PageHeader } from "@/components/app/page-header";
import { TierBadge } from "@/components/app/tier-badge";
import { DifficultyDots } from "@/components/app/difficulty-dots";
import { META_TIER } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "What The Fog Codex is, how builds are rated, the fan disclaimer, and the data sources behind this unofficial Dead by Daylight resource.",
};

const TIER_MEANING: Record<string, string> = {
  S: "Meta-defining. Among the strongest options this patch — the benchmark others are measured against.",
  A: "Strong and dependable. A great pick in most matches without being oppressive.",
  B: "Solid and situational. Rewards the right map, killer power, or team — with real trade-offs.",
  C: "Niche or fading. Works, but usually outclassed by a meta alternative.",
  "off-meta": "Fun, experimental, or a personal-preference pick. Bring it because you enjoy it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="About"
        title="What this is"
        description="The Fog Codex is a curated, cross-linked library of Dead by Daylight builds and a complete perk knowledgebase — built to be a pleasure to browse rather than a wall of text or a raw stat dump."
        className="mb-10"
      />

      <div className="flex flex-col gap-10">
        <Section title="A graph, not a list">
          <p>
            Every build is a first-class object with a visual loadout, an honest
            read on why it works, and matchup notes. Every perk has its own page
            listing the builds that use it. Every character links to their perks
            and recommended builds. Tap anything, follow it anywhere — the whole
            site is one connected graph, and every filtered view is a real,
            shareable URL.
          </p>
        </Section>

        <Section title="How builds are rated">
          <p>
            We try to give honest signal instead of hype. There is no “100% win
            rate” here. Each build carries two independent ratings:
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <div className="rounded-xl glass p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-display font-semibold text-ink">Meta tier</span>
                <span className="text-sm text-ink-3">how strong, right now</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {META_TIER.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <TierBadge tier={t} size="sm" />
                    <span className="text-ink-2">{TIER_MEANING[t]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl glass p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-display font-semibold text-ink">Difficulty</span>
                <span className="text-sm text-ink-3">how hard to pilot</span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-ink-2">
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="beginner" /> Beginner — forgiving, value comes automatically.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="intermediate" /> Intermediate — a few habits to learn.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="advanced" /> Advanced — rewards timing and game sense.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="expert" /> Expert — high skill floor and ceiling.
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4">
            A high tier doesn&apos;t mean easy: a build can be S-tier and demand
            real mechanical skill. We separate the two on purpose, and we always
            name what a build trades away and what it&apos;s weak against.
          </p>
        </Section>

        <Section title="Meta history flags">
          <p>
            Some perks have been buffed, nerfed, or argued about for years. Where
            that history matters, a perk carries a gold{" "}
            <span className="font-medium text-gold">Meta history</span> flag with a
            short, factual note — for example a perk that was once considered
            overpowered and has since been reined in. It&apos;s context most
            resources leave out.
          </p>
        </Section>

        <Section title="Data &amp; accuracy">
          <p>
            This catalogue is seeded against a snapshot labelled{" "}
            <strong className="text-ink-2">Patch {ROSTER_STATS.patch}</strong>. The
            live game has {ROSTER_STATS.totalKillers} Killers and{" "}
            {ROSTER_STATS.totalSurvivors} Survivors; the Codex catalogues a
            representative slice of {ROSTER_STATS.cataloguedCharacters} characters,{" "}
            {ROSTER_STATS.cataloguedPerks} perks and {ROSTER_STATS.cataloguedBuilds}{" "}
            builds. Killer tiers are approximate community estimates and shift with
            every balance pass — treat them as a starting point for your own
            experimentation, not gospel.
          </p>
        </Section>

        <Section title="Data sources">
          <p>
            Perk effects are paraphrased in our own words from publicly available
            community references — chiefly the community-maintained Dead by
            Daylight wikis and widely-cited community tier lists and statistics
            sites. We don&apos;t reproduce wiki text or in-game art; every perk and
            character image here is a generated placeholder.
          </p>
        </Section>

        <Section title="Unofficial &amp; fan-made">
          <p>
            The Fog Codex is an unofficial fan project. It is{" "}
            <strong className="text-ink-2">
              not affiliated with or endorsed by Behaviour Interactive
            </strong>
            . Dead by Daylight and all related characters, perks, names and marks
            are the property of their respective owners. This site is made by a
            fan, for fans, with respect for the source material.
          </p>
        </Section>

        <div className="rounded-2xl glass p-6 text-center">
          <p className="text-sm text-ink-2">
            Ready to dive back in?{" "}
            <Link href="/builds" className="text-accent hover:underline">
              Browse every build
            </Link>{" "}
            or{" "}
            <Link href="/perks" className="text-accent hover:underline">
              open the perk knowledgebase
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="text-sm leading-relaxed text-ink-2 [&_p+p]:mt-3">{children}</div>
    </section>
  );
}
