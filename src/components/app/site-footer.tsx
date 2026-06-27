import Link from "next/link";
import { ROSTER_STATS } from "@/data";

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
              A curated library of Dead by Daylight builds and a complete perk
              knowledgebase, made for players who'd rather browse something
              beautiful than scroll a wall of text.
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

        <div className="flex flex-col gap-3 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">
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
          <p className="shrink-0">Patch {ROSTER_STATS.patch}</p>
        </div>
      </div>
    </footer>
  );
}
