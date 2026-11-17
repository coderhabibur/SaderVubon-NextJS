import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Next.js dev indicator badge in bottom-left
  devIndicators: false,
  // Compress assets using gzip/brotli
  compress: true,
  // Strict mode for cleaner React execution
  reactStrictMode: true,
  // Power header removal for security and less headers payload
  poweredByHeader: false,
  // Image optimization
  images: {
    dangerouslyAllowSVG: true,
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
  async redirects() {
    return [
      {
        source: "/order",
        destination: "/khejur-gur-patali-jhola",
        permanent: true,
      },
      {
        source: "/landing",
        destination: "/khejur-gur-patali-jhola",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
