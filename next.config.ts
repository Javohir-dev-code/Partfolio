import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lms.owa.uz",
      },
    ],
  },
};

export default nextConfig;
