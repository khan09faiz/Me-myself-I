import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler */
  reactCompiler: true,

  /* Performance Optimizations */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Compression */
  compress: true,

  /* Production Optimizations */
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  /* Experimental Features */
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'framer-motion',
      '@emailjs/browser',
    ],
  },
};

export default nextConfig;

