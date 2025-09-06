import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { handlePrismaError } from "utils/prisma.util";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  private errorHandler = handlePrismaError;

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      return this.errorHandler(err, "Failed to find users.");
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      return this.errorHandler(error, "Failed to find user.");
    }
  }
}
