import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local Falcon serves grid/heatmap images from lf-static-v2.localfalcon.com
    remotePatterns: [{ protocol: "https", hostname: "**.localfalcon.com" }],
  },
};

export default nextConfig;
