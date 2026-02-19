import { Injectable } from "@nestjs/common";
import { TokenPair } from "./interfaces/jwt";
import type { CookieOptions, Response, Request } from "express";
import {
  JWT_COOKIE_EXPIRES,
  JWT_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_EXPIRES,
  REFRESH_TOKEN_COOKIE_NAME,
} from "utils/constants";

@Injectable()
export class AuthCookieService {
  private readonly isProd = process.env.NODE_ENV === "production";
  private readonly cookieBase: CookieOptions = {
    httpOnly: true,
    sameSite: this.isProd ? "none" : "lax",
    secure: this.isProd,
  };
  setAuthCookies(res: Response, tokens: Partial<TokenPair>) {
    const { access_token, refresh_token } = tokens;
    if (access_token) {
      res.cookie(JWT_COOKIE_NAME, access_token, {
        ...this.cookieBase,
        maxAge: JWT_COOKIE_EXPIRES,
      });
    }
    if (refresh_token) {
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
        ...this.cookieBase,
        maxAge: REFRESH_TOKEN_COOKIE_EXPIRES,
      });
    }
  }

  getAuthCookies(req: Request, key: "access_token" | "refresh_token") {
    switch (key) {
      case "access_token":
        return req.cookies[JWT_COOKIE_NAME];
      case "refresh_token":
        return req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    }
  }

  clearAuthCookies(res: Response) {
    res.clearCookie(JWT_COOKIE_NAME, this.cookieBase);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, this.cookieBase);
  }
}
