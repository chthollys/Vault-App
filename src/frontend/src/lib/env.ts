export const IS_PROD = process.env.NODE_ENV === "production";

const NEXT_PUBLIC_NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;
const NEST_API_URL = process.env.NEST_API_URL;
export const API_URL = NEXT_PUBLIC_NEST_API_URL || NEST_API_URL;

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;
