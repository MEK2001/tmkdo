import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
