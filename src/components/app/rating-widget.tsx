"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
import { rateBuild } from "@/app/actions/community";
import { cn } from "@/lib/utils";

interface RatingWidgetProps {
  buildId: string;
  avg: number;
  count: number;
  userValue: number | null;
  isAuthenticated: boolean;
}

export function RatingWidget({
  buildId,
  avg,
  count,
  userValue,
  isAuthenticated,
}: RatingWidgetProps) {
  const router = useRouter();
  const [hover, setHover] = useState<number | null>(null);
  const [optimistic, setOptimistic] = useState<number | null>(userValue);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const shown = hover ?? optimistic ?? 0;

  function submit(value: number) {
    if (!isAuthenticated) return;
    setOptimistic(value);
    setError(null);
    startTransition(async () => {
      const res = await rateBuild(buildId, value);
      if (!res.ok) {
        setError(res.error);
        setOptimistic(userValue);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="rounded-2xl glass p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">
              {count > 0 ? avg.toFixed(1) : "—"}
            </span>
            <span className="text-sm text-ink-3">
              {count > 0 ? `from ${count} rating${count === 1 ? "" : "s"}` : "no ratings yet"}
            </span>
          </div>
          {isAuthenticated ? (
            <p className="mt-1 text-xs text-ink-3">
              {optimistic ? `You rated this ${optimistic}/5` : "Tap a star to rate"}
            </p>
          ) : (
            <p className="mt-1 text-xs text-ink-3">
              <Link href={`/login?callbackUrl=/community/${buildId}`} className="text-accent hover:underline">
                Sign in
              </Link>{" "}
              to rate this build
            </p>
          )}
        </div>

        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHover(null)}
          aria-label="Rate this build from 1 to 5 stars"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={!isAuthenticated || pending}
              onMouseEnter={() => isAuthenticated && setHover(n)}
              onClick={() => submit(n)}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              className={cn(
                "rounded p-0.5 transition-transform",
                isAuthenticated && "hover:scale-110",
                !isAuthenticated && "cursor-default",
              )}
            >
              <Star
                className={cn(
                  "h-7 w-7 transition-colors",
                  n <= shown ? "fill-gold text-gold" : "text-ink-3/50",
                )}
              />
            </button>
          ))}
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-killer">{error}</p>}
    </div>
  );
}
