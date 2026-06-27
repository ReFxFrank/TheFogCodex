"use client";

import { useEffect, useState } from "react";
import { Sparkles, Gauge } from "lucide-react";

const KEY = "fog-codex:fx";

/** Runs before paint (injected in <head>) to apply the saved preference
 *  without a flash of the heavy effects. */
export const fxInitScript = `try{if(localStorage.getItem('${KEY}')==='lite'){document.documentElement.setAttribute('data-fx','lite');}}catch(e){}`;

export function EffectsToggle() {
  const [lite, setLite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLite(document.documentElement.getAttribute("data-fx") === "lite");
  }, []);

  function toggle() {
    const next = !lite;
    setLite(next);
    const html = document.documentElement;
    if (next) html.setAttribute("data-fx", "lite");
    else html.removeAttribute("data-fx");
    try {
      localStorage.setItem(KEY, next ? "lite" : "full");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? lite : undefined}
      title="Disable blur, glow and animation for smoother performance on low-power devices"
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-fog-800/60 px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-white/20 hover:text-ink"
    >
      {lite ? <Gauge className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      {mounted ? (lite ? "Effects: Lite" : "Effects: Full") : "Effects"}
    </button>
  );
}
