import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { VerificationTokenModule } from "src/verification-token/verification-token.module";
import { MailModule } from "src/mail/mail.module";
import { SignupGuard } from "./guards/SignupGuard.guard";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    VerificationTokenModule,
    MailModule,
  ],
  providers: [AuthService, JwtStrategy, SignupGuard],
  controllers: [AuthController],
})
export class AuthModule {}
