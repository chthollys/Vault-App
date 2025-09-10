"use server";

import axiosClient from "@/lib/axios-client";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/lib/utils/constants";
import type {
  CreateReviewData,
  CreateUserData,
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
} from "repo/types";
import type { GamesQuery } from "repo/types";

export async function getUsers() {
  return (await axiosClient<User>({ url: "/users", method: "GET" })).data;
}

export async function getGames(sortRule?: GamesQuery | null) {
  return (await axiosClient<Game[]>({ url: "/games", params: { ...sortRule } }))
    .data;
}

export async function getGame(id: string) {
  return (await axiosClient<Game>({ url: `/games/${id}` })).data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
) {
  const params: GamesQuery = { ...sortRule, limit: perPage, page };
  const games = (await axiosClient<Game[]>({ url: "/games", params })).data;

  return {
    games: games.slice(0, perPage),
    hasMore: games.length > perPage,
  };
}

export async function getNestedGenres(): Promise<ParentChildrenGenre[]> {
  return (
    await axiosClient<ParentChildrenGenre[]>({ url: "/genres", method: "GET" })
  ).data;
}

export async function getGenresByGameId(gameId: string): Promise<Genre[]> {
  return (await axiosClient<Genre[]>({ url: `/games/${gameId}/genres` })).data;
}

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  return (await axiosClient<Review[]>({ url: `/games/${gameId}/reviews` }))
    .data;
};

export const getUserByReviewId = async (reviewId: string): Promise<User> => {
  return (await axiosClient<User>({ url: `/users/review-id/${reviewId}` }))
    .data;
};

export const getUserByEmail = async (email: string) => {
  return (await axiosClient<User>({ url: `/users/email/${email}` })).data;
};

// export const saveUserPassword = async (
//   userId: string,
//   plainPassword: string
// ) => {
//   const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
//   const response = await db.user.update({
//     where: { id: userId },
//     data: { password: hashedPassword },
//   });
//   return response;
// };

// export const verifyPassword = async (
//   userId: string,
//   inputPassword: string
// ): Promise<boolean> => {
//   const user = await db.user.findUnique({
//     where: { id: userId },
//     select: { password: true },
//   });
//   if (!user) return false;
//   return bcrypt.compare(inputPassword, user.password || "");
// };

// export const createUser = async (user: CreateUserData) => {
//   const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
//   const response = await db.user.create({
//     data: {
//       ...user,
//       password: hashedPassword,
//       emailVerified: new Date(),
//     },
//   });
//   return response;
// };

// export const createReview = async (review: CreateReviewData) => {
//   const response = await db.review.create({
//     data: review,
//   });
//   return response;
// };
