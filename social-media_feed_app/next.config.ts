import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'images.unsplash.com',"plus.unsplash.com"],
  },
};

export default nextConfig;
