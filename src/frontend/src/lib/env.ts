export const IS_PROD = process.env.NODE_ENV === "production";

const NEXT_PUBLIC_API_PROXY_BASE = process.env.NEXT_PUBLIC_API_PROXY_BASE;
const NEXT_PUBLIC_NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;
const NEST_API_URL_INTERNAL = process.env.NEST_API_URL;
export const API_URL =
  NEXT_PUBLIC_API_PROXY_BASE ||
  NEXT_PUBLIC_NEST_API_URL ||
  NEST_API_URL_INTERNAL ||
  "/api";
export const NEST_API_URL =
  NEST_API_URL_INTERNAL || NEXT_PUBLIC_NEST_API_URL || "http://localhost:8000";
export const NEXT_APP_ORIGIN_URL =
  process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000";

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
