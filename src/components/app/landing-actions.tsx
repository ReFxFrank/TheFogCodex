"use client";

import { useRouter } from "next/navigation";
import { Command as CommandIcon, Dices } from "lucide-react";
import { builds } from "@/data";
import { useCommandPalette } from "./command-palette";
import { Button } from "@/components/ui/button";

export function LandingActions() {
  const router = useRouter();
  const { openPalette } = useCommandPalette();

  function surprise() {
    const pick = builds[Math.floor(Math.random() * builds.length)];
    router.push(`/builds/${pick.slug}`);
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <Button variant="accent" size="lg" onClick={openPalette}>
        <CommandIcon className="h-4 w-4" />
        Search the fog
        <kbd className="ml-1 rounded border border-black/20 bg-black/10 px-1.5 py-0.5 text-[10px]">
          ⌘K
        </kbd>
      </Button>
      <Button variant="glass" size="lg" onClick={surprise}>
        <Dices className="h-4 w-4" />
        Surprise me
      </Button>
    </div>
  );
}
