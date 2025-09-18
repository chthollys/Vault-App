import { Injectable } from "@nestjs/common";
import { VerificationTokenRepository } from "./verification-token.repository";
import crypto from "node:crypto";
import type { VerificationToken } from "@prisma/client";

@Injectable()
export class VerificationTokenService {
  constructor(private tokenRepo: VerificationTokenRepository) {}
  upcreate(identifier: string, expiresAt?: Date): Promise<VerificationToken> {
    // 5 min default
    const expires = expiresAt ?? new Date(Date.now() + 5 * 60 * 1000);
    const token = crypto.randomInt(100000, 999999).toString();
    return this.tokenRepo.upsert({
      where: {
        identifier,
      },
      update: {
        token,
        expires,
      },
      create: {
        identifier,
        token,
        expires,
      },
    });
  }

  findOne(
    identifier: string,
    token?: string,
  ): Promise<VerificationToken | null> {
    return this.tokenRepo.findOne({ where: { identifier, token } });
  }

  async deleteAll(identifier: string, token?: string): Promise<number> {
    return (await this.tokenRepo.deleteAll({ where: { identifier, token } }))
      .count;
  }
}
