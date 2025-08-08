"use server";

import db from "~/prisma/db";
import bcrypt from "bcrypt";
import { CreateReviewData, CreateUserData } from "@/lib/types/data";

export async function getUsers() {
  return await db.user.findMany({});
}

export async function getGames(categoryIds?: string[] | null) {
  return await db.game.findMany({
    where:
      categoryIds && categoryIds.length > 0
        ? {
            genres: {
              some: {
                genre: {
                  id: {
                    in: categoryIds,
                  },
                },
              },
            },
          }
        : {},
  });
}

export async function getGame(id: string) {
  const response = await db.game.findUnique({
    where: {
      id,
    },
  });
  return response;
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
