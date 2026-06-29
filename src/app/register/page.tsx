import type { Metadata } from "next";
import Link from "next/link";
import { Skull } from "lucide-react";
import { enabledProviders } from "@/auth";
import { safeCallbackPath } from "@/lib/utils";
import { LoginButtons } from "@/components/app/login-buttons";
import { CredentialsForm } from "@/components/app/credentials-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Make a Fog Codex account to publish builds, rate, and comment.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const safeCallback = safeCallbackPath(callbackUrl);
  const hasOAuth = enabledProviders.github || enabledProviders.google;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24">
      <div className="w-full rounded-2xl glass-elevated p-8">
        <div className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-fog-800 font-display text-xl font-bold text-fog-gradient">
            F
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            Just an email and a password — no verification email, no fuss.
          </p>
        </div>

        {hasOAuth && (
          <div className="mt-6">
            <LoginButtons
              github={enabledProviders.github}
              google={enabledProviders.google}
              callbackUrl={safeCallback}
            />
            <div className="my-5 flex items-center gap-3 text-xs text-ink-3">
              <span className="h-px flex-1 bg-white/10" />
              or with email
              <span className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        )}

        <div className={hasOAuth ? "" : "mt-6"}>
          <CredentialsForm mode="register" callbackUrl={safeCallback} />
        </div>
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
