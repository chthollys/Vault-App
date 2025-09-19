import { Injectable } from "@nestjs/common";
import type { Prisma, RefreshToken } from "@prisma/client";
import prisma from "prisma/db";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RefreshTokenRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }
  async create(args: Prisma.RefreshTokenCreateArgs): Promise<RefreshToken> {
    try {
      return await prisma.refreshToken.create(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to create refresh token");
    }
  }

  async findUnique(
    args: Prisma.RefreshTokenFindUniqueArgs,
  ): Promise<RefreshToken | null> {
    try {
      return await prisma.refreshToken.findUnique(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to find refresh token");
    }
  }

  async deleteMany(
    args: Prisma.RefreshTokenDeleteManyArgs,
  ): Promise<Prisma.BatchPayload> {
    try {
      return await prisma.refreshToken.deleteMany(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to delete refresh tokens");
    }
  }
}
