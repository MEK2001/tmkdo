import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for deployment
  output: 'export',
  
  // Disable build cache for deployment
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  // Optimize images for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Production optimizations
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Disable features not needed for static export
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
