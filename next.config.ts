import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Asset configuration for Cloudflare Pages
  assetPrefix: undefined,
  
  // Image optimization
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Ensure static assets are properly handled
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Explicitly set to undefined to prevent static export
  output: undefined,

  // Webpack configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

export default nextConfig;
