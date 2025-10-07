"use server";

import { createServerAxios } from "@/lib/axios/server";
import { UserSignupStep } from "@/lib/types/auth";
import type {
  ApiDataResponse,
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
  CurrentUserSession,
  ApiError,
} from "@repo/types";
import type { GamesQuery } from "@repo/types";

export async function getCurrentUserSession(): Promise<CurrentUserSession | null> {
  try {
    const client = await createServerAxios();
    const res = (
      await client.get<ApiDataResponse<CurrentUserSession>>("/auth/me")
    ).data;
    return res.data;
  } catch (err) {
    const error = err as ApiError;
    if (error.status === 401 || error.status === 403) {
      return null;
    }
    throw new Error(error.message);
  }
}

export async function getUsers(): Promise<User> {
  const client = await createServerAxios();
  const res = (await client.get<ApiDataResponse<User>>("/users")).data;
  return res.data;
}

export async function getGames(sortRule?: GamesQuery | null): Promise<Game[]> {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<Game[]>>("/games", {
      params: { ...sortRule },
    })
  ).data;
  return res.data;
}

export async function getGame(id: string): Promise<Game> {
  const client = await createServerAxios();
  const res = (await client.get<ApiDataResponse<Game>>(`/games/${id}`)).data;
  return res.data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
): Promise<{ games: Game[]; hasMore: boolean }> {
  const client = await createServerAxios();
  const params: GamesQuery = { ...sortRule, limit: perPage, page };
  const res = (await client.get<ApiDataResponse<Game[]>>("/games", { params }))
    .data;
  const games = res.data;

  return {
    games: games.slice(0, perPage),
    hasMore: games.length > perPage,
  };
}

export async function getNestedGenres(): Promise<ParentChildrenGenre[]> {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<ParentChildrenGenre[]>>("/genres")
  ).data;
  return res.data;
}

export async function getGenresByGameId(gameId: string): Promise<Genre[]> {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<Genre[]>>(`/games/${gameId}/genres`)
  ).data;
  return res.data;
}

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<Review[]>>(`/games/${gameId}/reviews`)
  ).data;
  return res.data;
};

export const getUserByReviewId = async (reviewId: string): Promise<User> => {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<User>>(`/users/review-id/${reviewId}`)
  ).data;
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const client = await createServerAxios();
  const res = (await client.get<ApiDataResponse<User>>(`/users/${id}`)).data;
  return res.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const client = await createServerAxios();
  const res = (await client.get<ApiDataResponse<User>>(`/users/email/${email}`))
    .data;
  return res.data;
};

export const getSignupStep = async (): Promise<{ step: UserSignupStep }> => {
  const client = await createServerAxios();
  const res = (
    await client.get<ApiDataResponse<{ step: UserSignupStep }>>(
      "/auth/signup/step"
    )
  ).data;
  return res.data;
};

export const getSession = async () => {
  const client = await createServerAxios();
  const res = (await client.get("/auth/session")).data;
  return res;
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
