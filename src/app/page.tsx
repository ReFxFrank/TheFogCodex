import Link from "next/link";
import { ArrowRight, Shield, Skull, Sparkles } from "lucide-react";
import { featuredBuilds, ROSTER_STATS, buildsByRole } from "@/data";
import { BuildCard } from "@/components/app/build-card";
import { LandingActions } from "@/components/app/landing-actions";
import { Reveal } from "@/components/app/reveal";

export default function Home() {
  const survivorCount = buildsByRole("survivor").length;
  const killerCount = buildsByRole("killer").length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex flex-col items-center gap-7 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-2">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          Up to date for Patch {ROSTER_STATS.patch}
        </span>

        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-fog-gradient sm:text-7xl">
          The Fog Codex
        </h1>

        <p className="max-w-2xl text-balance text-lg leading-relaxed text-ink-2">
          Builds and perks for Dead by Daylight, without the 4,000-word articles.
          Every build shows the actual loadout, what it's good at, and where it
          falls apart. Tap a perk to see what it does and who else runs it.
        </p>

        <LandingActions />

        <p className="text-sm text-ink-3">
          {ROSTER_STATS.totalKillers} Killers · {ROSTER_STATS.totalSurvivors} Survivors ·{" "}
          <span className="text-ink-2">{ROSTER_STATS.cataloguedBuilds}</span> builds ·{" "}
          <span className="text-ink-2">{ROSTER_STATS.cataloguedPerks}</span> perks ·{" "}
          <span className="text-ink-2">{ROSTER_STATS.cataloguedMaps}</span> maps catalogued
        </p>
      </section>

      {/* ---------------- Role split ---------------- */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal>
          <Link
            href="/builds?role=survivor"
            data-role="survivor"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl glass p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/15 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <Shield className="h-8 w-8 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Survive</h2>
              <p className="mt-2 max-w-sm text-sm text-ink-2">
                Loop the killer, patch your team up, and get the gates open.
                Anti-tunnel, gen-rush, stealth, boon, and endgame builds.
              </p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {survivorCount} Survivor builds
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            href="/builds?role=killer"
            data-role="killer"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl glass p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <Skull className="h-8 w-8 text-accent" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Hunt</h2>
              <p className="mt-2 max-w-sm text-sm text-ink-2">
                Slow the gens down, find people fast, and snowball before they
                recover. Slowdown, info, hex, stealth, and endgame builds.
              </p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {killerCount} Killer builds
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ---------------- Featured builds ---------------- */}
      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Featured
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
              A few worth trying tonight
            </h2>
          </div>
          <Link
            href="/builds"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink sm:inline-flex"
          >
            All builds
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBuilds.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.05}>
              <BuildCard build={b} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Closing rail ---------------- */}
      <section className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            href: "/perks",
            title: "Perk reference",
            body: `All ${ROSTER_STATS.cataloguedPerks} perks in plain English, tagged by what they do. The ones that got buffed or nerfed into the ground carry a little history note.`,
          },
          {
            href: "/characters",
            title: "The roster",
            body: "Killers and survivors, the perks they bring, a rough tier, and the builds that suit them.",
          },
          {
            href: "/about",
            title: "How the ratings work",
            body: "Why every build tells you what it's bad at instead of pretending it wins every match.",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl glass p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent"
          >
            <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
            <p className="mt-2 text-sm text-ink-2">{card.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent">
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
