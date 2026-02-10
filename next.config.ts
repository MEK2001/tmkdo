import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
