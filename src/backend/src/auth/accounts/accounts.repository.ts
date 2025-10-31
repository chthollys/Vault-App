import { Injectable } from "@nestjs/common";
import { Account, Prisma } from "@prisma/client";
import { PrismaErrorCatcher } from "src/error/error.handler";
import { PrismaService } from "src/prisma/prisma.service";
import type { AccountWithUser } from "../interfaces/account";

@Injectable()
export class AccountsRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findOne(data: Prisma.AccountWhereUniqueInput): Promise<Account | null> {
    try {
      return await this.prisma.account.findUnique({
        where: data,
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to find credential account");
    }
  }

  async findOneIncludeUser(
    data: Prisma.AccountWhereUniqueInput,
  ): Promise<AccountWithUser | null> {
    try {
      return await this.prisma.account.findUnique({
        where: data,
        include: { user: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to find credential account");
    }
  }

  async upsertWithUser(
    args: Prisma.AccountUpsertArgs,
  ): Promise<AccountWithUser> {
    try {
      return await this.prisma.account.upsert({
        ...args,
        include: { user: true },
      });
    } catch (err) {
      return this.errorHandler(err, "Failed to create credential account");
    }
  }
}
