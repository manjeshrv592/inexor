import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  // Enable static generation
  output: 'standalone', // For VPS deployment
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
    // Configure quality values for LazyImage component
    qualities: [20, 75, 80, 85, 90, 95],
  },
  
  // ISR configuration
  async rewrites() {
    return [
      {
        source: '/api/revalidate/:path*',
        destination: '/api/revalidate/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/world-countries.topojson',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/flags/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
