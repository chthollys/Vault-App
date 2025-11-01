export const IS_PROD = process.env.NODE_ENV === "production";

const NEST_API_URL = process.env.NEST_API_URL;
export const NEXT_PUBLIC_API_PROXY_BASE =
  process.env.NEXT_PUBLIC_API_PROXY_BASE;
export const API_URL =
  NEXT_PUBLIC_API_PROXY_BASE || NEST_API_URL || "http://localhost:8000";

export const NEXT_APP_ORIGIN_URL =
  process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000";

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
