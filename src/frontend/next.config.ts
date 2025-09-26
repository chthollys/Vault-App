import { S3_BUCKET_NAME, S3_REGION } from "@/lib/env";
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: { repo: path.resolve(__dirname, "../../packages") },
  },
  reactStrictMode: true,
  transpilePackages: ["repo"],
  webpack: (config) => {
    config.resolve.alias["repo"] = path.resolve(__dirname, "../../packages");
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com`,
        port: "",
        pathname: `/**/*`,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: `/**/*`,
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: `/**/*`,
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
