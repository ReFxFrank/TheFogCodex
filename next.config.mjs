/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emits a self-contained server at .next/standalone for tiny, dependency-free
  // deploys (Docker / bare Ubuntu). `next start` still works exactly as normal.
  output: "standalone",
  images: {
    // All in-game art is supplied as local SVG/PNG placeholders under /public/images.
    // No remote patterns needed for the fan-resource build.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
