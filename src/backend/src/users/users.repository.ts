import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  private handlePrismaError(err: any, message: string): never {
    if (err instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException(err.message);
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      throw new ConflictException(`Unique constraint violation.`);
    }
    throw new InternalServerErrorException(message);
  }

  async findUsers() {
    try {
      return await this.prisma.user.findMany({});
    } catch (err) {
      this.handlePrismaError(err, "Failed to find users.");
    }
  }

  async findUserById(id: string) {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.handlePrismaError(error, "Failed to find user.");
    }
  }
}
