"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for server logs / monitoring.
    console.error("[app error]", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <TriangleAlert className="mb-5 h-12 w-12 text-killer" />
      <h1 className="font-display text-3xl font-bold text-ink">Something broke</h1>
      <p className="mt-3 text-ink-2">
        That wasn&apos;t supposed to happen. Try again — and if it keeps happening,
        it&apos;s on our end, not yours.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-ink-3">Reference: {error.digest}</p>
      )}
      <div className="mt-7 flex gap-3">
        <Button variant="accent" size="md" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="glass" size="md">
          <Link href="/">Back to the Codex</Link>
        </Button>
      </div>
    </div>
  );
}
