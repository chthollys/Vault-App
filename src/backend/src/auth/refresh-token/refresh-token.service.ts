import { Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "./refresh-token.repository";

@Injectable()
export class RefreshTokenService {
  constructor(private refreshTokenRepo: RefreshTokenRepository) {}

  async create(
    tokenId: string,
    tokenHash: string,
    userId: string,
    expiresAt: Date,
  ) {
    return await this.refreshTokenRepo.create({
      data: {
        tokenId,
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  async findByTokenId(tokenId: string) {
    return await this.refreshTokenRepo.findUnique({
      where: { tokenId },
    });
  }

  async deleteByUserId(userId: string) {
    return await this.refreshTokenRepo.deleteMany({
      where: { userId },
    });
  }

  async deleteByTokenId(tokenId: string) {
    return await this.refreshTokenRepo.deleteMany({
      where: { tokenId },
    });
  }
}
