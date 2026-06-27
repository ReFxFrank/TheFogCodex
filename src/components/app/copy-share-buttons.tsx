"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyShareButtonsProps {
  /** Clean text summary copied by "Copy build". */
  copyText: string;
  /** Route path (e.g. /builds/foo) — combined with origin for sharing. */
  path: string;
}

export function CopyShareButtons({ copyText, path }: CopyShareButtonsProps) {
  const [copied, setCopied] = useState<"build" | "link" | null>(null);

  async function write(text: string, which: "build" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="glass"
        size="sm"
        onClick={() => write(copyText, "build")}
        aria-label="Copy build summary to clipboard"
      >
        {copied === "build" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied === "build" ? "Copied" : "Copy build"}
      </Button>
      <Button
        variant="glass"
        size="sm"
        onClick={() =>
          write(
            typeof window !== "undefined" ? `${window.location.origin}${path}` : path,
            "link",
          )
        }
        aria-label="Copy shareable link to clipboard"
      >
        {copied === "link" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {copied === "link" ? "Copied" : "Share"}
      </Button>
    </div>
  );
}
