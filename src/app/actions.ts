"use server";

import db from "~/prisma/db";
import bcrypt from "bcrypt";
import { CreateReviewData, CreateUserData } from "@/lib/types/data";
import type { SortingRules } from "@/lib/types/utils";

export async function getUsers() {
  return await db.user.findMany({});
}

export async function getGames(sortRule?: SortingRules | null) {
  const where =
    sortRule?.categories && sortRule.categories.length > 0
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
    const sortOption = sortRule.sortBy[0];
    switch (sortOption) {
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
      default:
        orderBy = undefined;
    }
  }

  return await db.game.findMany({
    where,
    ...(orderBy && { orderBy }),
  });
}

export async function getGamesPaginated(
  sortRule: SortingRules | null | undefined,
  page: number,
  perPage: number
) {
  const where =
    sortRule?.categories && sortRule.categories.length > 0
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
    const sortOption = sortRule.sortBy[0];
    switch (sortOption) {
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

  const games = await db.game.findMany({
    where,
    ...(orderBy && { orderBy }),
    skip: page * perPage,
    take: perPage,
  });

  return {
    games,
    hasMore: games.length === perPage,
  };
}
export async function getGame(id: string) {
  const response = await db.game.findUnique({
    where: {
      id,
    },
  });
  return response;
}

export async function getGenres() {
  return await db.genre.findMany({
    where: { parentId: null },
    include: {
      subGenres: true,
    },
  });
}

export async function getGenreByGameId(gameId: string) {
  const response = await db.gameGenre.findMany({
    where: {
      gameId,
    },
    select: {
      genre: true,
    },
  });
  return response;
}

export const getReviewByGameId = async (gameId: string) => {
  const response = await db.review.findMany({
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
};

export const getUserByReviewId = async (reviewId: string) => {
  const response = await db.review.findUnique({
    where: {
      id: reviewId,
    },
    select: {
      user: {
        select: {
          username: true,
          profile: {
            select: {
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  return {
    avatarUrl: response?.user.profile?.avatarUrl ?? null,
    reviewer: response?.user.username ?? null,
  };
};

export const saveUserPassword = async (
  userId: string,
  plainPassword: string
) => {
  const saltRounds = 13;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  const response = await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  return response;
};

export const verifyPassword = async (
  userId: string,
  inputPassword: string
): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  if (!user) return false;
  return bcrypt.compare(inputPassword, user.password);
};

export const createUser = async (user: CreateUserData) => {
  const hashedPassword = await bcrypt.hash(user.password, 13);
  const response = await db.user.create({
    data: {
      ...user,
      password: hashedPassword,
      profile: {
        create: {},
      },
    },
  });
  return response;
};

export const createReview = async (review: CreateReviewData) => {
  const response = await db.review.create({
    data: review,
  });
  return response;
};
