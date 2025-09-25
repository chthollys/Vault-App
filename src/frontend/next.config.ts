import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["repo"],
  webpack: (config) => {
    config.resolve.alias["repo"] = path.resolve(__dirname, "../../packages");
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com`,
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
