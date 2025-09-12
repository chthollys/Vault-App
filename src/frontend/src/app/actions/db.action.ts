"use server";

import axiosClient from "@/lib/axios-client";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/lib/utils/constants";
import type {
  ApiDataResponse,
  CreateReviewData,
  CreateUserData,
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
} from "repo/types";
import type { GamesQuery } from "repo/types";

export async function getUsers(): Promise<User> {
  const res = (await axiosClient.get<ApiDataResponse<User>>("/users")).data;
  return res.data;
}

export async function getGames(sortRule?: GamesQuery | null): Promise<Game[]> {
  const res = (
    await axiosClient.get<ApiDataResponse<Game[]>>("/games", {
      params: { ...sortRule },
    })
  ).data;
  return res.data;
}

export async function getGame(id: string): Promise<Game> {
  const res = (await axiosClient.get<ApiDataResponse<Game>>(`/games/${id}`))
    .data;
  return res.data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
): Promise<{ games: Game[]; hasMore: boolean }> {
  const params: GamesQuery = { ...sortRule, limit: perPage, page };
  const res = (
    await axiosClient.get<ApiDataResponse<Game[]>>("/games", { params })
  ).data;
  const games = res.data;

  return {
    games: games.slice(0, perPage),
    hasMore: games.length > perPage,
  };
}

export async function getNestedGenres(): Promise<ParentChildrenGenre[]> {
  const res = (
    await axiosClient.get<ApiDataResponse<ParentChildrenGenre[]>>("/genres")
  ).data;
  return res.data;
}

export async function getGenresByGameId(gameId: string): Promise<Genre[]> {
  const res = (
    await axiosClient<ApiDataResponse<Genre[]>>({
      url: `/games/${gameId}/genres`,
    })
  ).data;
  return res.data;
}

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  const res = (
    await axiosClient<ApiDataResponse<Review[]>>({
      url: `/games/${gameId}/reviews`,
    })
  ).data;
  return res.data;
};

export const getUserByReviewId = async (reviewId: string): Promise<User> => {
  const res = (
    await axiosClient<ApiDataResponse<User>>({
      url: `/users/review-id/${reviewId}`,
    })
  ).data;
  return res.data;
};

export const getUserByEmail = async (email: string) => {
  const res = (
    await axiosClient<ApiDataResponse<User>>({ url: `/users/email/${email}` })
  ).data;
  return res.data;
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
