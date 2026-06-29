/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile elsewhere on the host doesn't
  // confuse Next's root inference.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // All in-game art is supplied as local SVG/PNG placeholders under /public/images.
    // No remote patterns needed for the fan-resource build.
    formats: ["image/avif", "image/webp"],
  },
  // Baseline security headers on every response. We intentionally skip a strict
  // Content-Security-Policy: the no-FOUC effects toggle runs as an inline
  // <script>, and a nonce-less CSP would block it. The headers below are the
  // high-value, low-risk wins (clickjacking, MIME sniffing, referrer leakage).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
