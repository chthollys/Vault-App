import type { NextConfig } from "next";
import { tr } from "zod/locales";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
        port: "",
        pathname: `/game-cover/**`,
      },
    ],
  },
};

export default nextConfig;
