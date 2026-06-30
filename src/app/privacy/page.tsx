import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What data The Fog Codex collects, why, and your choices.",
};

const UPDATED = "June 2026";
const CONTACT = "hello@thefogcodex.com";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        description="Plain-English version: it's a small fan site. We collect the minimum needed to run accounts and stop spam, we don't sell anything, and there are no ad trackers."
        className="mb-10"
      />
      <p className="mb-8 text-xs text-ink-3">Last updated: {UPDATED}</p>

      <div className="flex flex-col gap-10">
        <Section title="What we collect">
          <ul className="ml-4 list-disc space-y-2">
            <li>
              <strong className="text-ink-2">Your account.</strong> If you sign up with
              email and password, we store your email and a one-way hash of your
              password (never the password itself). If you sign in with GitHub or
              Google, we receive your name, email, and avatar from them.
            </li>
            <li>
              <strong className="text-ink-2">What you post.</strong> Builds, ratings, and
              comments you create, tied to your account.
            </li>
            <li>
              <strong className="text-ink-2">Technical basics.</strong> Your IP address is
              used briefly to rate-limit sign-ins, sign-ups, and posting so the site
              isn't overrun by bots. Standard server/CDN logs may record requests.
            </li>
            <li>
              <strong className="text-ink-2">In your browser only.</strong> Your favourites
              and the “lite effects” toggle live in your browser's local storage —
              they never reach our server.
            </li>
          </ul>
        </Section>

        <Section title="How we use it">
          <p>
            To run your account, show your content with your name on it, keep you
            signed in, and prevent spam and abuse. That's it. We don't sell your
            data, we don't run advertising trackers, and we don't build profiles on
            you.
          </p>
        </Section>

        <Section title="Who else sees it">
          <p>
            Only the services needed to keep the site online: our hosting provider,
            Cloudflare (which sits in front of the site), and — only if you choose to
            use them — the OAuth provider you sign in with (GitHub or Google). No
            advertisers, no data brokers.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            One essential cookie keeps you signed in after you log in. There are no
            advertising or cross-site tracking cookies.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can delete any build or comment you've posted at any time from your{" "}
            <Link href="/profile" className="text-accent hover:underline">
              profile
            </Link>
            . If you want your whole account and its content removed, email us at{" "}
            <span className="text-ink-2">{CONTACT}</span> and we'll take care of it.
            Clearing your browser data removes your local favourites.
          </p>
        </Section>

        <Section title="Retention &amp; age">
          <p>
            We keep your data for as long as your account exists. Dead by Daylight is
            a mature-rated game, so this site is intended for users aged 16 and over.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If this policy changes in a meaningful way, we'll update the date at the
            top. Questions? Reach us at{" "}
            <span className="text-ink-2">{CONTACT}</span>.
          </p>
        </Section>
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
