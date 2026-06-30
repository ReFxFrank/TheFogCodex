import Link from "next/link";
import { ROSTER_STATS } from "@/data";
import { EffectsToggle } from "./effects-toggle";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/8 bg-fog-950/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-fog-800 font-display text-sm font-bold text-fog-gradient">
                F
              </span>
              <span className="font-display text-base font-semibold text-ink">
                The Fog Codex
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Dead by Daylight builds and a full perk reference, for people who'd
              rather not scroll a wall of text to find a loadout.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
            <Link href="/builds" className="text-ink-2 transition-colors hover:text-ink">
              Builds
            </Link>
            <Link href="/perks" className="text-ink-2 transition-colors hover:text-ink">
              Perks
            </Link>
            <Link href="/characters" className="text-ink-2 transition-colors hover:text-ink">
              Characters
            </Link>
            <Link href="/maps" className="text-ink-2 transition-colors hover:text-ink">
              Maps
            </Link>
            <Link href="/community" className="text-ink-2 transition-colors hover:text-ink">
              Community
            </Link>
            <Link href="/builds/new" className="text-ink-2 transition-colors hover:text-ink">
              Sandbox
            </Link>
            <Link
              href="/builds?role=survivor"
              className="text-ink-2 transition-colors hover:text-ink"
            >
              Survive
            </Link>
            <Link
              href="/builds?role=killer"
              className="text-ink-2 transition-colors hover:text-ink"
            >
              Hunt
            </Link>
            <Link href="/about" className="text-ink-2 transition-colors hover:text-ink">
              About
            </Link>
          </nav>
        </div>

        <hr className="rule-glow my-8" />

        <div className="flex flex-col gap-5 text-xs text-ink-3">
          <p className="max-w-3xl leading-relaxed">
            <strong className="font-semibold text-ink-2">Unofficial fan-made resource.</strong>{" "}
            Not affiliated with or endorsed by Behaviour Interactive. Dead by
            Daylight and all related characters, perks, and marks are the
            property of their respective owners. All effect text is paraphrased;
            all art is placeholder. See the{" "}
            <Link href="/about" className="text-accent hover:underline">
              About page
            </Link>{" "}
            for data sources.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/privacy" className="transition-colors hover:text-ink-2">
                Privacy
              </Link>
              <span className="text-white/15" aria-hidden>
                ·
              </span>
              <Link href="/terms" className="transition-colors hover:text-ink-2">
                Terms
              </Link>
              <span className="text-white/15" aria-hidden>
                ·
              </span>
              <Link href="/guidelines" className="transition-colors hover:text-ink-2">
                Guidelines
              </Link>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <EffectsToggle />
              <span>Patch {ROSTER_STATS.patch}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
