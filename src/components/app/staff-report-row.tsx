"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X, Trash2, ExternalLink } from "lucide-react";
import {
  resolveReport,
  deleteBuildAsStaff,
  deleteCommentAsStaff,
} from "@/app/actions/staff";
import type { StaffReportRow as Row } from "@/lib/staff";

function when(date: Date): string {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units: [number, string][] = [
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [s, label] of units) {
    const v = Math.floor(secs / s);
    if (v >= 1) return `${v}${label} ago`;
  }
  return "just now";
}

export function StaffReportRow({ report }: { report: Row }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Something went wrong.");
      else router.refresh();
    });
  }

  function onDeleteContent() {
    const label = report.targetType === "build" ? "build" : "comment";
    if (!window.confirm(`Permanently delete this ${label}?`)) return;
    run(() =>
      report.targetType === "build"
        ? deleteBuildAsStaff(report.targetId)
        : deleteCommentAsStaff(report.targetId),
    );
  }

  return (
    <div className="rounded-2xl glass p-4">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-3">
        <span className="rounded-md border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-medium uppercase tracking-wide text-gold">
          {report.targetType}
        </span>
        <span>reported by {report.reporterName ?? "someone"}</span>
        <span>·</span>
        <span>{when(report.createdAt)}</span>
      </div>

      <p className="mt-2 text-sm text-ink">
        <span className="text-ink-3">Reason:</span> {report.reason}
      </p>

      <p className="mt-1.5 text-sm text-ink-2">
        <span className="text-ink-3">Content:</span>{" "}
        {report.exists ? (
          report.buildId ? (
            <Link
              href={`/community/${report.buildId}`}
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              {report.targetLabel}
              <ExternalLink className="h-3 w-3" />
            </Link>
          ) : (
            report.targetLabel
          )
        ) : (
          <span className="text-ink-3">{report.targetLabel}</span>
        )}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => run(() => resolveReport(report.id, "dismissed"))}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-white/25 hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
          Dismiss
        </button>
        <button
          type="button"
          onClick={() => run(() => resolveReport(report.id, "resolved"))}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-tier-a/40 bg-tier-a/10 px-2.5 py-1.5 text-xs text-tier-a transition-colors hover:bg-tier-a/20"
        >
          <Check className="h-3.5 w-3.5" />
          Mark handled
        </button>
        {report.exists && (
          <button
            type="button"
            onClick={onDeleteContent}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-lg border border-killer/40 px-2.5 py-1.5 text-xs text-killer transition-colors hover:bg-killer/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete {report.targetType}
          </button>
        )}
        {error && <span className="text-xs text-killer">{error}</span>}
      </div>
    </div>
  );
}
