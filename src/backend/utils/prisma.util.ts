import { Prisma } from "@prisma/client";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

export function handlePrismaError(err: any, message: string): never {
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
