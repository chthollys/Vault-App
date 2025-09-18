import { Injectable } from "@nestjs/common";
import type { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { handlePrismaError } from "utils/prisma.util";
import { PrismaErrorCatcher } from "src/error/error.handler";

@Injectable()
export class UsersRepository extends PrismaErrorCatcher {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      return this.errorHandler(err, "Failed to find users.");
    }
  }

  async findUnique(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique(args);
    } catch (error) {
      return this.errorHandler(error, "Failed to fetch user.");
    }
  }

  async findOne(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    try {
      return await this.prisma.user.findFirst(args);
    } catch (error) {
      return this.errorHandler(error, "Failed to fetch user.");
    }
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    try {
      return this.prisma.user.create(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to create new user");
    }
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    try {
      return await this.prisma.user.update(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to update user");
    }
  }

  async upsert(args: Prisma.UserUpsertArgs): Promise<User> {
    try {
      return await this.prisma.user.upsert(args);
    } catch (err) {
      return this.errorHandler(err, "Failed to update and insert user");
    }
  }
}
