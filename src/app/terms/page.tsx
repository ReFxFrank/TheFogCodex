import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using The Fog Codex and posting community content.",
};

const UPDATED = "June 2026";
const CONTACT = "hello@thefogcodex.com";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Terms"
        title="Terms of Use"
        description="The short, readable version of the rules for using the site and posting builds, ratings, and comments."
        className="mb-10"
      />
      <p className="mb-8 text-xs text-ink-3">Last updated: {UPDATED}</p>

      <div className="flex flex-col gap-10">
        <Section title="The basics">
          <p>
            By using The Fog Codex you agree to these terms. If you don't agree,
            that's okay — just don't use the site.
          </p>
        </Section>

        <Section title="This is a fan project">
          <p>
            The Fog Codex is an unofficial, fan-made resource and is{" "}
            <strong className="text-ink-2">
              not affiliated with or endorsed by Behaviour Interactive
            </strong>
            . Dead by Daylight and all related names, characters, perks, and marks
            belong to their respective owners. Tier and balance ratings are
            community opinion, not facts — use your own judgement.
          </p>
        </Section>

        <Section title="Your account">
          <p>
            Keep your login details to yourself; you're responsible for what happens
            under your account. Don't impersonate other people, and don't share an
            account in a way that breaks these terms.
          </p>
        </Section>

        <Section title="Content you post">
          <p>
            You keep ownership of the builds, ratings, and comments you create. By
            posting them, you give us permission to host and display them on the site
            so other people can see them. You confirm that what you post is yours to
            share and doesn't break the law or someone else's rights.
          </p>
          <p>
            Anything you post must follow our{" "}
            <Link href="/guidelines" className="text-accent hover:underline">
              Community Guidelines
            </Link>
            . We can remove content, and suspend or remove accounts, that break the
            rules — at our discretion, with the goal of keeping the site useful and
            decent.
          </p>
        </Section>

        <Section title="No warranty">
          <p>
            The site is provided “as is.” We do our best to keep it accurate and
            online, but we don't guarantee it's error-free, always available, or that
            any build will win you games. You use it at your own risk, and to the
            extent the law allows, we're not liable for losses arising from using it.
          </p>
        </Section>

        <Section title="Ending things">
          <p>
            You can delete your content or ask us to remove your account at any time.
            We may suspend or remove accounts that abuse the site or break these
            terms. We may also update these terms; we'll change the date above when
            we do.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Email{" "}
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
