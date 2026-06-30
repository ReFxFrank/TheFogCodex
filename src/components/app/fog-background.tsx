/**
 * Ambient fog: the deep gradient is painted on <body> in globals.css;
 * this layers drifting, blurred light pools and a faint grain texture
 * over it. Pure CSS animation — respects prefers-reduced-motion.
 */
export function FogBackground() {
  return (
    <>
      <div className="fog-layer" aria-hidden>
        <div
          className="fog-blob animate-fog-a"
          style={{
            top: "-12%",
            left: "-8%",
            width: "46vw",
            height: "46vw",
            maxWidth: "640px",
            maxHeight: "640px",
            background:
              "radial-gradient(circle, rgba(79,182,199,0.16), transparent 68%)",
          }}
        />
        <div
          className="fog-blob animate-fog-b"
          style={{
            bottom: "-16%",
            right: "-10%",
            width: "52vw",
            height: "52vw",
            maxWidth: "720px",
            maxHeight: "720px",
            background:
              "radial-gradient(circle, rgba(214,50,74,0.14), transparent 68%)",
          }}
        />
        <div
          className="fog-blob animate-fog-a"
          style={{
            top: "30%",
            left: "55%",
            width: "30vw",
            height: "30vw",
            maxWidth: "420px",
            maxHeight: "420px",
            opacity: 0.35,
            background:
              "radial-gradient(circle, rgba(120,130,160,0.12), transparent 70%)",
          }}
        />
      </div>
      <div className="fog-grain" aria-hidden />
    </>
  );
}
