"use server";

import db from "~/prisma/db";
import bcrypt from "bcrypt";
import { buildGameQuery } from "@/lib/utils/utils";
import type { CreateReviewData, CreateUserData } from "@/lib/types/data";
import type { SortingRules } from "@/lib/types/utils";

export async function getUsers() {
  return await db.user.findMany({});
}

export async function getGame(id: string) {
  return await db.game.findUnique({
    where: {
      id,
    },
  });
}

export async function getGames(sortRule?: SortingRules | null) {
  const { where, orderBy } = buildGameQuery(sortRule);
  return db.game.findMany({
    where,
    ...(orderBy && { orderBy }),
  });
}

export async function getGamesPaginated(
  sortRule: SortingRules | null | undefined,
  page: number,
  perPage: number
) {
  const { where, orderBy } = buildGameQuery(sortRule);

  const games = await db.game.findMany({
    where,
    ...(orderBy && { orderBy }),
    skip: page * perPage,
    take: perPage + 1,
  });

  return {
    games: games.slice(0, perPage),
    hasMore: games.length > perPage,
  };
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
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    avatarUrl: response?.user.image ?? null,
    reviewer: response?.user.name ?? null,
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
