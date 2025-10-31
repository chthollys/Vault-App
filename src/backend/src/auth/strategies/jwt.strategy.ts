import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { AuthUser } from "../interfaces/jwt";
import type { Request } from "express";
import { JWT_SECRET } from "utils/env";
import { JWT_COOKIE_NAME } from "utils/constants";
import { UsersService } from "src/users/users.service";

function cookieExtractor(req: Request) {
  return req.cookies[JWT_COOKIE_NAME] || null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: JWT_SECRET!,
    });
  }
  async validate(payload: any): Promise<AuthUser> {
    if (!payload?.sub) {
      throw new UnauthorizedException("Invalid token payload");
    }
    const { id, email, name, image } = await this.usersService.findById(
      payload.sub,
    );
    return { id, email, name, image };
  }
}
