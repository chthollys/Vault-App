export const SALT_ROUNDS = 13;
export const MAIL_TRANSPORT = Symbol("MAIL_TRANSPORT");
export const REDIS_CLIENT = Symbol("REDIS_CLIENT");
export const SIGNUP_STEPS = Symbol("SIGNUP_STEP");
export const JWT_COOKIE_NAME = "jwt";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
export const JWT_COOKIE_EXPIRES = 15 * 60 * 1000; // 1 hour
export const REFRESH_TOKEN_COOKIE_EXPIRES = 30 * 24 * 60 * 60 * 1000; // 30 days
