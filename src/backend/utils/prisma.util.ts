import { Prisma } from "@prisma/client";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import type { GamesQuery, OrderBy } from "repo/types";
import { GamesQueryDto } from "src/dtos";

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
  sortRule?: GamesQueryDto | null,
): Prisma.GameFindManyArgs => {
  if (!sortRule) {
    return {};
  }

  const { categories: category, sortBy, page, limit } = sortRule;
  const where =
    category?.length && category.length > 0
      ? {
          genres: {
            some: {
              genre: {
                id: {
                  in: category,
                },
              },
            },
          },
        }
      : {};

  let orderBy: Record<string, OrderBy> | undefined;
  if (sortBy?.length) {
    switch (sortBy[0]) {
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
  // For paginated game query
  if (page !== undefined && limit !== undefined) {
    return { where, orderBy, skip: page * limit, take: limit + 1 };
  }

  return { where, orderBy };
};
