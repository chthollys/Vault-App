import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
  Session as SessionValue,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import {
  RegisterEmailDto,
  SetPassword,
  UserSignupStepDto,
  VerifyOtpDto,
} from "src/dtos";
import { User } from "../decorators/current-user.decorator";
import type { AuthUser } from "./types/payload";
import type { Response } from "express";
import type { Session } from "express-session";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { SignupGuard } from "./guards/SignupGuard.guard";
import { SignupStep } from "src/decorators/signup-step.decorator";
import { UserSignupStep } from "./types/signup-state";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/me")
  @UseGuards(PassportAuthGuard("jwt"))
  getCurrentUser(@User() user: AuthUser): AuthUser {
    return user;
  }

  @Get("signup/step")
  @Serialize(UserSignupStepDto)
  getSignupStep(@SessionValue() session: Session): UserSignupStepDto {
    return { step: session["signup-state"]?.step ?? UserSignupStep.Start };
  }

  @Post("/signup/email/req-otp")
  @SignupStep(UserSignupStep.Start)
  @UseGuards(SignupGuard)
  async registerEmailForOtp(
    @SessionValue() session: Session,
    @Body() { email }: RegisterEmailDto,
  ): Promise<{ message: string }> {
    const response = await this.authService.registerEmailForOtp(email);
    session["signup-state"] = { step: UserSignupStep.VerifyOtp, email };
    return response;
  }

  @Post("signup/email/verify-otp")
  @SignupStep(UserSignupStep.VerifyOtp)
  @UseGuards(SignupGuard)
  verifyOtp(
    @SessionValue() session: Session,
    @Body() { otp }: VerifyOtpDto,
  ): Promise<{ message: string }> {
    const email = session["signup-state"]?.email;
    const response = this.authService.verifyOtp(otp, email);
    session["signup-state"] = { step: UserSignupStep.SetPassword, email };
    return response;
  }

  @Post("signup/email/set-password")
  @SignupStep(UserSignupStep.SetPassword)
  @UseGuards(SignupGuard)
  async setPassword(
    @Res({ passthrough: true }) res: Response,
    @SessionValue() session: Session,
    @Body() { password }: SetPassword,
  ): Promise<{ message: string }> {
    const step = session["signup-state"]?.step;
    const email = session["signup-state"]?.email;
    const { access_token } = await this.authService.createAccount(
      step,
      email,
      password,
    );

    res.cookie("jwt", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    delete session["signup-state"];

    return { message: "Account created succesfully" };
  }

  @Post("/signup/restart")
  async restartSignup(
    @SessionValue() session: Session,
  ): Promise<{ message: string }> {
    const email = session["signup-state"]?.email;
    delete session["signup-state"];
    return await this.authService.restartSignup(email);
  }

  @Post("/login")
  login() {}

  @Post("/logout")
  logout() {}
}
