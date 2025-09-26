import axiosClient from "@/lib/axios-client";
import type {
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
  ApiDataResponse,
  CurrentUserSession,
  ApiError,
} from "repo/types";
import type { GamesQuery } from "@repo/types";
import { UserSignupStep } from "@/lib/types/auth";

export async function getCurrentUserSession(): Promise<CurrentUserSession | null> {
  try {
    const res = (
      await axiosClient.get<ApiDataResponse<CurrentUserSession>>("/auth/me")
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

export const getUserById = async (id: string): Promise<User> => {
  const res = (await axiosClient.get<ApiDataResponse<User>>(`/users/${id}`))
    .data;
  return res.data;
};

export const getUserByEmail = async (email: string) => {
  const res = (
    await axiosClient<ApiDataResponse<User>>({ url: `/users/email/${email}` })
  ).data;
  return res.data;
};

export const getSignupStep = async (): Promise<{ step: UserSignupStep }> => {
  const res = (
    await axiosClient.get<ApiDataResponse<{ step: UserSignupStep }>>(
      "/auth/signup/step",
      { withCredentials: true }
    )
  ).data;
  return res.data;
};

export const getSession = async () => {
  const res = (await axiosClient.get("/auth/session")).data;
  return res;
};
