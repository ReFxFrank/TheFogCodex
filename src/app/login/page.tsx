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
          Join the Codex
        </h1>
        <p className="mt-2 text-sm text-ink-2">
          Sign in to publish your own builds, rate the community&apos;s loadouts, and
          join the discussion. Browsing stays free and open — no account needed.
        </p>

        <div className="mt-6 text-left">
          <LoginButtons
            github={enabledProviders.github}
            google={enabledProviders.google}
            callbackUrl={safeCallback}
          />
        </div>

        <p className="mt-6 text-xs text-ink-3">
          By signing in you agree to keep it respectful. This is an unofficial fan
          project — see the{" "}
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
