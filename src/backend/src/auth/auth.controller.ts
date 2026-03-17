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
import {
  RegisterEmailDto,
  SetPasswordDto,
  VerifyOtpDto,
  UserSignupStepDto,
  CurrentUserDto,
} from "./dtos";
import { User } from "../decorators/current-user.decorator";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { SignupStepGuard } from "./guards/signup-step.guard";
import { SignupStep } from "src/decorators/signup-step.decorator";
import { UserSignupStep } from "./interfaces/signup-state";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { LoginDto } from "src/dtos";
import type { AuthUser } from "./interfaces/jwt";
import type { Response, Request } from "express";
import type { Session } from "express-session";
import { AuthCookieService } from "./auth-cookies.service";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { JwtAuthGuard, OptionalJwtAuthGuard } from "./guards/jwt-auth.guard";
import { GithubAuthGuard } from "./guards/github-auth.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  private readonly frontendUrl =
    process.env.FRONTEND_URL?.trim() || "http://localhost:3000";

  constructor(
    private authService: AuthService,
    private authCookieService: AuthCookieService,
  ) {}

  @Get("/me")
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: "Get current authenticated user" })
  @ApiBearerAuth("access_token")
  @ApiOkWrappedResponse({ type: CurrentUserDto })
  @ApiCommonErrorResponses()
  getCurrentUser(@User() currentUser: AuthUser): CurrentUserDto {
    return { user: currentUser ?? null };
  }

  @Get("signup/step")
  @Serialize(UserSignupStepDto)
  @ApiOperation({ summary: "Get current signup step from session" })
  @ApiOkWrappedResponse({ type: UserSignupStepDto })
  @ApiCommonErrorResponses()
  getSignupStep(@SessionValue() session: Session): UserSignupStepDto {
    return { step: session["signup-state"]?.step ?? UserSignupStep.Start };
  }

  @Post("/signup/email/req-otp")
  @SignupStep(UserSignupStep.Start)
  @UseGuards(SignupStepGuard)
  @ApiOperation({ summary: "Request OTP for email signup" })
  @ApiBody({ type: RegisterEmailDto })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async registerEmailForOtp(
    @SessionValue() session: Session,
    @Body() { email }: RegisterEmailDto,
  ): Promise<string> {
    const response = await this.authService.registerEmailForOtp(email);
    session["signup-state"] = { step: UserSignupStep.VerifyOtp, email };
    return response.message;
  }

  @Post("signup/email/verify-otp")
  @SignupStep(UserSignupStep.VerifyOtp)
  @UseGuards(SignupStepGuard)
  @ApiOperation({ summary: "Verify signup OTP" })
  @ApiBody({ type: VerifyOtpDto })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async verifyOtp(
    @SessionValue() session: Session,
    @Body() { otp }: VerifyOtpDto,
  ): Promise<string> {
    const email = session["signup-state"]?.email;
    const response = await this.authService.verifyOtp(otp, email);
    session["signup-state"] = { step: UserSignupStep.SetPassword, email };
    return response.message;
  }

  @Post("signup/email/set-password")
  @SignupStep(UserSignupStep.SetPassword)
  @UseGuards(SignupStepGuard)
  @ApiOperation({ summary: "Complete signup by setting password" })
  @ApiBody({ type: SetPasswordDto })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async setPassword(
    @Res({ passthrough: true }) res: Response,
    @SessionValue() session: Session,
    @Body() { password }: SetPasswordDto,
  ): Promise<string> {
    const step = session["signup-state"]?.step;
    const email = session["signup-state"]?.email;
    const tokenPair = await this.authService.createAccount(
      step,
      email,
      password,
    );
    this.authCookieService.setAuthCookies(res, tokenPair);
    delete session["signup-state"];
    return "Account created succesfully";
  }

  @Post("/signup/restart")
  @ApiOperation({ summary: "Restart signup flow and clear OTP/session state" })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async restartSignup(
    @SessionValue() session: Session,
  ): Promise<{ message: string }> {
    const email = session["signup-state"]?.email;
    delete session["signup-state"];
    return await this.authService.restartSignup(email);
  }

  @Get("/google")
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Start Google OAuth flow" })
  @ApiOkResponse({ description: "Redirect to Google OAuth consent page" })
  googleAuth() {}

  @Get("/google/callback")
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Google OAuth callback" })
  @ApiOkResponse({ description: "OAuth callback handled, then redirect to frontend" })
  async googleCallback(
    @User() user: AuthUser,
    @Res() res: Response,
  ): Promise<void> {
    const tokens = await this.authService.issueTokenPair({
      sub: user.id,
      email: user.email,
    });
    this.authCookieService.setAuthCookies(res, tokens);
    res.redirect(this.frontendUrl);
  }

  @Get("/github")
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: "Start GitHub OAuth flow" })
  @ApiOkResponse({ description: "Redirect to GitHub OAuth consent page" })
  githubAuth() {}

  @Get("/github/callback")
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: "GitHub OAuth callback" })
  @ApiOkResponse({ description: "OAuth callback handled, then redirect to frontend" })
  async githubCallback(
    @User() user: AuthUser,
    @Res() res: Response,
  ): Promise<void> {
    const tokens = await this.authService.issueTokenPair({
      sub: user.id,
      email: user.email,
    });
    this.authCookieService.setAuthCookies(res, tokens);
    res.redirect(this.frontendUrl);
  }

  @Post("/refresh-token")
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: "Refresh access and refresh tokens using refresh token cookie" })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const tokenPair = await this.authService.refreshToken(
      this.authCookieService.getAuthCookies(req, "refresh_token"),
    );
    this.authCookieService.setAuthCookies(res, tokenPair);
    return "Token refreshed successfully";
  }

  @Post("/login")
  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({ type: LoginDto })
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const tokenPair = await this.authService.login(body.email, body.password);
    this.authCookieService.setAuthCookies(res, tokenPair);
    return "Login successful";
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Logout current user and clear auth cookies" })
  @ApiBearerAuth("access_token")
  @ApiOkWrappedResponse()
  @ApiCommonErrorResponses()
  async logout(
    @User() user: AuthUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    try {
      await this.authService.logout(user.id);
      return "Logout successful";
    } finally {
      this.authCookieService.clearAuthCookies(res);
    }
  }
}
