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
};

export default nextConfig;
