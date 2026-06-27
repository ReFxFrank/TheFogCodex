import type { Metadata } from "next";
import Link from "next/link";
import { Skull } from "lucide-react";
import { enabledProviders } from "@/auth";
import { LoginButtons } from "@/components/app/login-buttons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to publish your own Dead by Daylight builds, rate, and comment.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const safeCallback = callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/community";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24">
      <div className="w-full rounded-2xl glass-elevated p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-fog-800 font-display text-xl font-bold text-fog-gradient">
          F
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-ink-2">
          Publish your own builds, rate other people's loadouts, and jump into the
          comments. Browsing is free either way — no account needed for that.
        </p>

        <div className="mt-6 text-left">
          <LoginButtons
            github={enabledProviders.github}
            google={enabledProviders.google}
            callbackUrl={safeCallback}
          />
        </div>

        <p className="mt-6 text-xs text-ink-3">
          Signing in means keeping it civil. This is a fan project; the boring
          details live on the{" "}
          <Link href="/about" className="text-accent hover:underline">
            About page
          </Link>
          .
        </p>
      </div>

      <Link
        href="/community"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <Skull className="h-4 w-4" />
        Browse community builds instead
      </Link>
    </div>
  );
}
