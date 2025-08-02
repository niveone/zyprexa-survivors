import type { NextConfig } from "next";

const nextConfig: {
  typescript: {
    ignoreBuildErrors: boolean;
  };
  reactStrictMode: boolean;
  eslint: {
    ignoreDuringBuilds: boolean;
  };
  compress: boolean;
  poweredByHeader: boolean;
  generateEtags: boolean;
  images: {
    formats: string[];
  };
  output?: 'export';
  trailingSlash?: boolean;
  distDir?: string;
} = {
  // Production optimizations
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Images optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Static export configuration (uncomment for static deployment)
  // output: 'export',
  // trailingSlash: true,
  // distDir: 'out',
};

export default nextConfig;