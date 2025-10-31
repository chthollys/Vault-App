import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { VerificationTokenModule } from "src/verification-token/verification-token.module";
import { MailModule } from "src/mail/mail.module";
import { SignupStepGuard } from "./guards/signup-step.guard";
import { GoogleStrategy } from "./strategies/google.strategy";
import { AccountsModule } from "./accounts/accounts.module";
import { RefreshTokenModule } from "./refresh-token/refresh-token.module";
import { AuthCookieService } from "./auth-cookies.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    VerificationTokenModule,
    MailModule,
    AccountsModule,
    RefreshTokenModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    SignupStepGuard,
    GoogleStrategy,
    AuthCookieService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
