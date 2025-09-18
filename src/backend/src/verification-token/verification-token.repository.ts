import { Injectable } from "@nestjs/common";
import type { Prisma, VerificationToken } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class VerificationTokenRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }
  async upsert(
    args: Prisma.VerificationTokenUpsertArgs,
  ): Promise<VerificationToken> {
    try {
      return await this.prisma.verificationToken.upsert(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to create verification token");
    }
  }

  async findOne(
    args: Prisma.VerificationTokenFindFirstArgs,
  ): Promise<VerificationToken | null> {
    try {
      return await this.prisma.verificationToken.findFirst(args);
    } catch (err) {
      return this.errorHandler(err, "Failed fo find verification token");
    }
  }

  async deleteAll(
    args: Prisma.VerificationTokenDeleteManyArgs,
  ): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.verificationToken.deleteMany(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to delete tokens");
    }
  }
}
