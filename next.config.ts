import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * 
 * Configured to allow external images from Unsplash for homestay photos.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
