import Link from "next/link";
import { CloudFog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <CloudFog className="mb-5 h-12 w-12 text-ink-3" />
      <h1 className="font-display text-3xl font-bold text-ink">Lost in the fog</h1>
      <p className="mt-3 text-ink-2">
        This page has been claimed by the Entity. The build, perk, or character
        you&apos;re looking for isn&apos;t here.
      </p>
      <div className="mt-7 flex gap-3">
        <Button asChild variant="accent" size="md">
          <Link href="/builds">Browse builds</Link>
        </Button>
        <Button asChild variant="glass" size="md">
          <Link href="/">Back to the Codex</Link>
        </Button>
      </div>
    </div>
  );
}
