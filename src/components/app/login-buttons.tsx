"use client";

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

interface LoginButtonsProps {
  github: boolean;
  google: boolean;
  callbackUrl: string;
}

export function LoginButtons({ github, google, callbackUrl }: LoginButtonsProps) {
  if (!github && !google) {
    return (
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm text-ink-2">
        No sign-in provider is configured yet. Set{" "}
        <code className="text-gold">AUTH_GITHUB_ID</code> /{" "}
        <code className="text-gold">AUTH_GOOGLE_ID</code> (and their secrets) in the
        environment to enable sign-in.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {github && (
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl })}
          className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-[#1b1f27] px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-[#232833]"
        >
          <LogIn className="h-4 w-4" />
          Continue with GitHub
        </button>
      )}
      {google && (
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white px-4 py-3 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-white/90"
        >
          <LogIn className="h-4 w-4" />
          Continue with Google
        </button>
      )}
    </div>
  );
}
