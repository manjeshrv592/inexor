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
};

export default nextConfig;
