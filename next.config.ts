import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so stray lockfiles in parent folders aren't picked up
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
