import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.17"],
  output: process.env.NEXT_DOCKER_BUILD === "true" ? "standalone" : undefined,
};

export default nextConfig;
