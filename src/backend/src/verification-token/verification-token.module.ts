import { Module } from "@nestjs/common";
import { VerificationTokenService } from "./verification-token.service";
import { VerificationTokenRepository } from "./verification-token.repository";

@Module({
  exports: [VerificationTokenService],
  providers: [VerificationTokenService, VerificationTokenRepository],
})
export class VerificationTokenModule {}
