import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/quote",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
