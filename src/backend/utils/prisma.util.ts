import { Prisma } from "@prisma/client";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import type { SortingRules } from "repo/types";

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

export const buildGamesQuery = (
  sortRule?: SortingRules | null,
): Prisma.GameFindManyArgs => {
  const where = sortRule?.categories?.length
    ? {
        genres: {
          some: {
            genre: {
              id: {
                in: sortRule.categories,
              },
            },
          },
        },
      }
    : {};

  let orderBy: Record<string, "asc" | "desc"> | undefined;

  if (sortRule?.sortBy?.length) {
    switch (sortRule.sortBy[0]) {
      case "newest":
        orderBy = { releaseDate: "desc" };
        break;
      case "popular":
        orderBy = { popularity: "desc" };
        break;
      case "lowest-price":
        orderBy = { price: "asc" };
        break;
      case "highest-price":
        orderBy = { price: "desc" };
        break;
    }
  }

  return { where, orderBy };
};
