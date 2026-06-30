import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description: "What's welcome — and what isn't — when you post builds and comments.",
};

const DO = [
  "Keep it about Dead by Daylight — builds, perks, characters, maps, strategy.",
  "Be decent to other players, even when you disagree about the meta.",
  "Post your own builds, or credit where an idea came from.",
  "Use the report button on anything that breaks these rules.",
];

const DONT = [
  "Harassment, hate speech, slurs, threats, or targeting individuals.",
  "Spam, advertising, self-promo, referral links, or links to cheats/malware.",
  "NSFW, illegal, or off-topic content.",
  "Impersonating other people, or passing off someone else's work as your own.",
];

export default function GuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Community"
        title="Community Guidelines"
        description="This is a place to share builds and talk strategy. Keep it useful and keep it civil — that's basically the whole rulebook."
        className="mb-10"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl glass p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <span className="grid h-6 w-6 place-items-center rounded-md border border-tier-a/40 bg-tier-a/10 text-tier-a">
              <Check className="h-4 w-4" />
            </span>
            Please do
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-ink-2">
            {DO.map((t) => (
              <li key={t} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-tier-a" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl glass p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <span className="grid h-6 w-6 place-items-center rounded-md border border-killer/40 bg-killer/10 text-killer">
              <X className="h-4 w-4" />
            </span>
            Please don't
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-ink-2">
            {DONT.map((t) => (
              <li key={t} className="flex gap-2.5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-killer" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl glass p-6 text-sm leading-relaxed text-ink-2">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          What happens if you break the rules
        </h2>
        <p>
          Staff can remove any build or comment, and can suspend or ban accounts.
          We aim to be reasonable — usually that means taking down the content first
          — but repeated or serious violations (harassment, hate, spam) can get an
          account banned without warning. Reported content goes into a staff review
          queue, so the more you{" "}
          <span className="text-ink-2">flag the genuinely bad stuff</span>, the
          faster it gets handled.
        </p>
        <p className="mt-3">
          These guidelines work alongside our{" "}
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
