"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";
import { registerUser } from "@/app/actions/auth";
import { safeCallbackPath } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CredentialsFormProps {
  mode: "signin" | "register";
  callbackUrl: string;
}

export function CredentialsForm({ mode, callbackUrl }: CredentialsFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    setError(null);
    startTransition(async () => {
      if (mode === "register") {
        const res = await registerUser({ name, email, password });
        if (!res.ok) {
          setError(res.error);
          return;
        }
      }
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(
          mode === "register"
            ? "Account created, but sign-in failed. Try signing in."
            : "Wrong email or password.",
        );
        return;
      }
      router.push(safeCallbackPath(callbackUrl));
      router.refresh();
    });
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      {mode === "register" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
          autoComplete="nickname"
          maxLength={60}
          className="w-full rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        autoComplete="email"
        className="w-full rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder={mode === "register" ? "Password (8+ characters)" : "Password"}
        autoComplete={mode === "register" ? "new-password" : "current-password"}
        className="w-full rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
      />

      {error && <p className="text-sm text-killer">{error}</p>}

      <Button type="submit" variant="accent" size="md" disabled={pending} className="w-full">
        <Mail className="h-4 w-4" />
        {pending
          ? "Working…"
          : mode === "register"
            ? "Create account"
            : "Sign in with email"}
      </Button>

      <p className="text-center text-xs text-ink-3">
        {mode === "register" ? (
          <>
            Already have an account?{" "}
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-accent hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-accent hover:underline"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
