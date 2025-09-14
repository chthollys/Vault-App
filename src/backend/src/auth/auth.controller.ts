import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { RegisterEmailDto, SetPassword, VerifyOtpDto } from "src/dtos";
import { User } from "./decorators/current-user.decorator";
import type { AuthUser } from "./types/payload";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/me")
  @UseGuards(PassportAuthGuard("jwt"))
  getCurrentUser(@User() user: AuthUser): AuthUser {
    return user;
  }

  @Post("/signup/email/req-otp")
  registerEmailForOtp(
    @Body() { email }: RegisterEmailDto,
  ): Promise<{ message: string }> {
    return this.authService.registerEmailForOtp(email);
  }

  @Post("signup/email/verify-otp")
  verifyOtp(@Body() { otp, email }: VerifyOtpDto) {
    return this.authService.verifyOtp(otp, email);
  }

  @Post("signup/email/set-password")
  createAccount(@Body() { password }: SetPassword) {}

  @Post("/login")
  login() {}

  @Post("/logout")
  logout() {}
}
