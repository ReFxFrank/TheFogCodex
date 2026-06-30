import type { ReactElement } from "react";

// Shared Open Graph / social-share card (1200×630), rendered by next/og's
// ImageResponse. Satori only supports inline styles + flexbox, so everything
// here is deliberately plain.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Accent = "survivor" | "killer" | "neutral";

const ACCENT: Record<Accent, string> = {
  survivor: "#4fb6c7",
  killer: "#d6324a",
  neutral: "#e3b341",
};

export function ogCard({
  title,
  subtitle,
  kind,
  accent = "neutral",
}: {
  title: string;
  subtitle?: string;
  kind: string;
  accent?: Accent;
}): ReactElement {
  const color = ACCENT[accent];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "radial-gradient(1200px 600px at 20% -10%, #161a26 0%, #0a0b0f 60%, #08090e 100%)",
        color: "#f3f4f7",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* top: wordmark + kind */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#12141c",
              fontSize: 34,
              fontWeight: 700,
              color,
            }}
          >
            F
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#c7ccd6",
            }}
          >
            THE FOG CODEX
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color,
          }}
        >
          {kind}
        </div>
      </div>

      {/* bottom: title + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            borderRadius: 999,
            background: color,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#aab0bd",
              fontFamily: "Helvetica, Arial, sans-serif",
              maxWidth: 1000,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}
