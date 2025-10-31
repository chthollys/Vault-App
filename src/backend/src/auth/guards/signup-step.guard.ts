import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import type { Session } from "express-session";
import { Reflector } from "@nestjs/core";
import { UserSignupStep } from "../types/signup-state";
import { SIGNUP_STEPS } from "utils/constants";

@Injectable()
export class SignupStepGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;
    const currentStep = this.reflector.get<UserSignupStep>(
      SIGNUP_STEPS,
      context.getHandler(),
    );

    const session = req.session as Session;
    const userStep = session["signup-state"]?.step ?? UserSignupStep.Start;

    return userStep >= currentStep;
  }
}
