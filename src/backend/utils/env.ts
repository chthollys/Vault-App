export const IS_PROD = process.env.NODE_ENV === "production";
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DIRECT_URL = process.env.DIRECT_URL;
export const REDIS_URL = process.env.REDIS_URL;

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const S3_REGION = process.env.S3_REGION;

export const GITHUB_SECRET = process.env.GITHUB_SECRET;
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const GITHUB_ID = process.env.GITHU_ID;
export const GOOGLE_ID = process.env.GOOGLE_ID;

export const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
export const EMAIL_SERVER_PORT = process.env.EMAIL_SERVER_PORT;
export const EMAIL_SERVER_USER = process.env.EMAIL_SERVER_USER;
export const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
export const EMAIL_FROM = process.env.EMAIL_FROM;
