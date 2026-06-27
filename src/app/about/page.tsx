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
    "What The Fog Codex is, how the ratings work, the fan disclaimer, and where the data comes from.",
};

const TIER_MEANING: Record<string, string> = {
  S: "Meta-defining. About as strong as it gets this patch.",
  A: "Really good in most games, without being oppressive.",
  B: "Solid, but it wants the right map, killer, or team to shine.",
  C: "Works fine, but something meta usually does the job better.",
  "off-meta": "Bring it because it's fun, not because it's optimal.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="About"
        title="What this is"
        description="A Dead by Daylight build and perk reference that's actually nice to look at. Most resources are either a randomizer, a wall of text, or a spreadsheet. This is the version I wanted to exist."
        className="mb-10"
      />

      <div className="flex flex-col gap-10">
        <Section title="Everything links to everything">
          <p>
            Every build shows its loadout, what it's for, and what it's bad
            against. Every perk has its own page that lists the builds running it.
            Every character links to their perks and the builds that suit them. So
            you can start anywhere and just keep tapping, and any filtered view you
            land on has its own link you can send to a friend.
          </p>
        </Section>

        <Section title="How the ratings work">
          <p>
            No hype, no “100% win rate” nonsense. Each build gets two separate
            ratings, because strong and easy aren't the same thing:
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
                  <DifficultyDots difficulty="beginner" /> Beginner — value mostly happens on its own.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="intermediate" /> Intermediate — a couple of habits to pick up.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="advanced" /> Advanced — wants good timing and game sense.
                </span>
                <span className="flex items-center gap-3">
                  <DifficultyDots difficulty="expert" /> Expert — easy to throw, scary in the right hands.
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4">
            A high tier doesn't mean it's easy. Plenty of S-tier stuff will lose you
            games until you learn it, which is exactly why the two ratings are
            separate. And every build tells you what it gives up and what it hates
            running into.
          </p>
        </Section>

        <Section title="The “meta history” flags">
          <p>
            Some perks have been buffed, nerfed, and argued about for years. When
            that history actually matters, the perk gets a gold{" "}
            <span className="font-medium text-gold">Meta history</span> note — like
            when something used to be busted and finally got toned down. It's the
            kind of context most build lists skip.
          </p>
        </Section>

        <Section title="A note on accuracy">
          <p>
            The data here is built against{" "}
            <strong className="text-ink-2">Patch {ROSTER_STATS.patch}</strong>. The
            live game has {ROSTER_STATS.totalKillers} killers and{" "}
            {ROSTER_STATS.totalSurvivors} survivors; this covers a solid chunk of
            them — {ROSTER_STATS.cataloguedCharacters} characters,{" "}
            {ROSTER_STATS.cataloguedPerks} perks, {ROSTER_STATS.cataloguedBuilds}{" "}
            builds. Killer tiers are rough community estimates and they move every
            balance patch, so take them as a starting point and trust your own
            results.
          </p>
        </Section>

        <Section title="Where the data comes from">
          <p>
            All the perk text is rewritten in plain English from public community
            references — mostly the DbD wikis and the usual community tier lists and
            stats sites. Nothing here is copied wiki text, and there's no real
            in-game art; every perk and character image is a generated placeholder.
          </p>
        </Section>

        <Section title="Fan-made, obviously">
          <p>
            This is an unofficial fan project and is{" "}
            <strong className="text-ink-2">
              not affiliated with or endorsed by Behaviour Interactive
            </strong>
            . Dead by Daylight and all its characters, perks, and names belong to
            their owners. Made by a fan, for fans.
          </p>
        </Section>

        <div className="rounded-2xl glass p-6 text-center">
          <p className="text-sm text-ink-2">
            Anyway — go{" "}
            <Link href="/builds" className="text-accent hover:underline">
              browse the builds
            </Link>{" "}
            or{" "}
            <Link href="/perks" className="text-accent hover:underline">
              dig through the perks
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
