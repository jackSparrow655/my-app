import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // fail build if TS errors exist
  },
};

export default nextConfig;
