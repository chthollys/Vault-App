import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { VerificationTokenModule } from "src/verification-token/verification-token.module";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),

    UsersModule,
    VerificationTokenModule,
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
