import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'ouch-cdn2.icons8.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'], // Optimize server component bundling
  },
  // Configure webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Disable fs module on client
      };
    }
    return config;
  },
};

export default nextConfig;