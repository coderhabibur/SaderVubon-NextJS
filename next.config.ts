import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress assets using gzip/brotli
  compress: true,
  // Strict mode for cleaner React execution
  reactStrictMode: true,
  // Power header removal for security and less headers payload
  poweredByHeader: false,
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sadervubon.com",
      },
    ],
  },
};

export default nextConfig;
