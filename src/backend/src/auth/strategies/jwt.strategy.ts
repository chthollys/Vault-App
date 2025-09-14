import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JwtPayload } from "../types/payload";
import type { Request } from "express";

function cookieExtractor(req: Request) {
  return req.cookies.jwt || null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }
  validate(payload: JwtPayload) {
    const { sub, email } = payload;
    return { id: sub, email };
  }
}
