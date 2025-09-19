import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { REFRESH_TOKEN_COOKIE_NAME } from "utils/constants";

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;
    const cookies = req.cookies;
    return cookies[REFRESH_TOKEN_COOKIE_NAME] ? true : false;
  }
}
