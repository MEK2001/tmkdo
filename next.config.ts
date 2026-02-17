import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Generate a static export in the `out` directory for Cloudflare Pages
  output: 'export',

  // Optimize images while remaining compatible with static export
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },

  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
