export const IS_PROD = process.env.NODE_ENV === "production";

export const NEST_API_URL =
  process.env.NEST_API_URL ||
  "https://atomic-adriane-chthollys-d6033455.koyeb.app";
export const NEXT_PUBLIC_API_PROXY_BASE =
  process.env.NEXT_PUBLIC_API_PROXY_BASE;

export const NEXT_APP_ORIGIN_URL =
  process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000";

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
