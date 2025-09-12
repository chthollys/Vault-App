import { Injectable } from "@nestjs/common";
import { VerificationTokenRepository } from "./verification-token.repository";
import crypto from "node:crypto";

@Injectable()
export class VerificationTokenService {
  constructor(private tokenRepo: VerificationTokenRepository) {}
  create(identifier: string, expires?: Date) {
    return this.tokenRepo.create({
      identifier,
      token: crypto.randomInt(100000, 999999).toString(),
      expires: expires ?? new Date(Date.now() + 10 * 60 * 1000),
    });
  }

  findOne(identifier: string, token?: string) {
    return this.tokenRepo.findOne({ where: { identifier, token } });
  }

  async deleteAll(identifier: string, token?: string): Promise<number> {
    return (await this.tokenRepo.deleteAll({ where: { identifier, token } }))
      .count;
  }
}
