"use client";

import { useState, useTransition } from "react";
import { Flag } from "lucide-react";
import { reportContent } from "@/app/actions/community";
import type { ReportTarget } from "@/types";

interface ReportButtonProps {
  targetType: ReportTarget;
  targetId: string;
  /** "icon" = compact icon-only (for comments); "text" = icon + label. */
  variant?: "icon" | "text";
}

export function ReportButton({ targetType, targetId, variant = "text" }: ReportButtonProps) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    const reason = window.prompt(
      `Report this ${targetType} for staff review. What's wrong with it?`,
    );
    if (reason == null) return; // cancelled
    setError(null);
    start(async () => {
      const res = await reportContent(targetType, targetId, reason);
      if (res.ok) setDone(true);
      else setError(res.error);
    });
  }

  if (done) {
    return <span className="text-xs text-ink-3">Reported — thanks</span>;
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-label={`Report ${targetType}`}
        title={error ?? `Report ${targetType}`}
        className="rounded p-1 text-ink-3 transition-colors hover:text-gold"
      >
        <Flag className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title={error ?? undefined}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-ink-3 transition-colors hover:border-gold/50 hover:text-gold"
    >
      <Flag className="h-3.5 w-3.5" />
      Report
    </button>
  );
}
