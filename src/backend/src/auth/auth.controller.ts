import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Res,
  Session as SessionValue,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import {
  RegisterEmailDto,
  SetPasswordDto,
  VerifyOtpDto,
  UserSignupStepDto,
} from "./dtos";
import { User } from "../decorators/current-user.decorator";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { SignupGuard } from "./guards/signup.guard";
import { SignupStep } from "src/decorators/signup-step.decorator";
import { UserSignupStep } from "./types/signup-state";
import { RefreshGuard } from "./guards/refresh.guard";
import { LoginDto } from "src/dtos";
import type { AuthUser } from "./types/jwt";
import type { Response, Request } from "express";
import type { Session } from "express-session";
import { AuthCookieService } from "./auth-cookies.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private authCookieService: AuthCookieService,
  ) {}

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
    @Body() { password }: SetPasswordDto,
  ): Promise<{ message: string }> {
    const step = session["signup-state"]?.step;
    const email = session["signup-state"]?.email;
    const tokenPair = await this.authService.createAccount(
      step,
      email,
      password,
    );
    this.authCookieService.setAuthCookies(res, tokenPair);
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

  @Get("/google")
  @UseGuards(PassportAuthGuard("google"))
  googleAuth() {}

  @Get("/google/callback")
  @UseGuards(PassportAuthGuard("google"))
  async googleCallback(
    @User() user: AuthUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthUser> {
    const tokens = await this.authService.issueTokenPair({
      sub: user?.id,
      email: user?.email,
    });
    this.authCookieService.setAuthCookies(res, tokens);
    return user;
  }

  @Post("/refresh-token")
  @UseGuards(RefreshGuard)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokenPair = await this.authService.refreshToken(
      this.authCookieService.getAuthCookies(req, "refresh_token"),
    );
    this.authCookieService.setAuthCookies(res, tokenPair);
    return { message: "Token refreshed successfully" };
  }

  @Post("/login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokenPair = await this.authService.login(body.email, body.password);
    this.authCookieService.setAuthCookies(res, tokenPair);
    return { message: "Login successful" };
  }

  @Post("/logout")
  async logout(@User() user: AuthUser): Promise<{ message: string }> {
    const userId = user.id;
    await this.authService.logout(userId);
    return { message: "Logout successful" };
  }
}
