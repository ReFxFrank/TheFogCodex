"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Upload, LogIn } from "lucide-react";
import { publishBuild } from "@/app/actions/community";
import { DIFFICULTY, ARCHETYPES, type Role } from "@/types";
import { titleCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PublishPanelProps {
  role: Role;
  characterSlug: string | null;
  perkSlugs: string[];
}

export function PublishPanel({ role, characterSlug, perkSlugs }: PublishPanelProps) {
  const router = useRouter();
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [whyItWorks, setWhyItWorks] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTY)[number]>("intermediate");
  const [archetypes, setArchetypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const ready = perkSlugs.length === 4;

  if (status === "loading") {
    return <div className="h-12 rounded-xl glass shimmer" />;
  }

  if (status !== "authenticated") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl glass p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-2">
          Sign in to publish this loadout to the community.
        </p>
        <Button asChild variant="accent" size="sm">
          <Link href="/login?callbackUrl=/builds/new">
            <LogIn className="h-4 w-4" />
            Sign in to publish
          </Link>
        </Button>
      </div>
    );
  }

  function toggleArch(a: string) {
    setArchetypes((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));
  }

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await publishBuild({
        title,
        summary,
        role,
        characterSlug,
        perkSlugs,
        archetypes,
        difficulty,
        whyItWorks,
      });
      if (!res.ok) setError(res.error);
      else if (res.id) router.push(`/community/${res.id}`);
    });
  }

  if (!open) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl glass p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-2">
          Happy with this loadout? Publish it to the community.
        </p>
        <Button variant="accent" size="sm" onClick={() => setOpen(true)} disabled={!ready}>
          <Upload className="h-4 w-4" />
          {ready ? "Publish to community" : "Pick 4 perks to publish"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl glass-elevated p-6">
      <h3 className="font-display text-lg font-semibold text-ink">Publish your build</h3>
      <p className="mt-1 text-sm text-ink-3">
        Give it a title and a short description, then tell people why it works. Your{" "}
        {role} loadout and chosen character travel with it.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <Field label="Title" hint={`${title.length}/80`}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="e.g. Endgame Adrenaline Rush"
            className="w-full rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </Field>

        <Field label="Description" hint={`${summary.length}/200`}>
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={200}
            placeholder="One punchy line that sells the build."
            className="w-full rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </Field>

        <Field label="Why it works (optional)" hint={`${whyItWorks.length}/600`}>
          <textarea
            value={whyItWorks}
            onChange={(e) => setWhyItWorks(e.target.value)}
            maxLength={600}
            rows={3}
            placeholder="The synergy, the game plan, the honest trade-offs."
            className="w-full resize-y rounded-lg border border-white/10 bg-fog-900/60 px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus-visible:border-accent"
          />
        </Field>

        <Field label="Difficulty">
          <div className="flex flex-wrap gap-1.5">
            {DIFFICULTY.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  difficulty === d
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-white/10 text-ink-2 hover:border-white/25"
                }`}
              >
                {titleCase(d)}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Archetypes (optional)">
          <div className="flex flex-wrap gap-1.5">
            {ARCHETYPES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggleArch(a)}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  archetypes.includes(a)
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-white/10 text-ink-2 hover:border-white/25"
                }`}
              >
                {titleCase(a)}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {error && <p className="mt-4 text-sm text-killer">{error}</p>}

      <div className="mt-5 flex items-center gap-2">
        <Button
          variant="accent"
          size="md"
          onClick={submit}
          disabled={pending || !ready || !title.trim() || summary.trim().length < 10}
        >
          <Upload className="h-4 w-4" />
          {pending ? "Publishing…" : "Publish build"}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setOpen(false)} disabled={pending}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        {label}
        {hint && <span className="font-normal normal-case text-ink-3">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
