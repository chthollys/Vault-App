import { clientApiFetch } from "@/lib/http/client";
import { ApiRequestError } from "@/lib/http/common";
import type {
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
  ApiDataResponse,
  CurrentUserSession,
  ApiError,
  CartWithItems,
} from "@repo/types";
import type { GamesQuery } from "@repo/types";
import { UserSignupStep } from "@/lib/types/auth";

export async function getCurrentUserSession(): Promise<CurrentUserSession | null> {
  try {
    const res =
      await clientApiFetch<ApiDataResponse<CurrentUserSession>>("/auth/me");
    return res.data;
  } catch (err) {
    const error = err as ApiError | ApiRequestError;
    const status = "status" in error ? error.status : undefined;
    if (status === 401 || status === 403) {
      return null;
    }
    throw new Error(error.message);
  }
}

export async function getUsers(): Promise<User> {
  const res = await clientApiFetch<ApiDataResponse<User>>("/users");
  return res.data;
}

export async function getGames(sortRule?: GamesQuery | null): Promise<Game[]> {
  const res = await clientApiFetch<ApiDataResponse<Game[]>>("/games", {
    params: { ...sortRule },
  });
  return res.data;
}

export async function getGame(id: string): Promise<Game> {
  const res = await clientApiFetch<ApiDataResponse<Game>>(`/games/${id}`);
  return res.data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
): Promise<{ games: Game[]; hasMore: boolean }> {
  const params: GamesQuery = { ...sortRule, limit: perPage, page };
  const res = await clientApiFetch<ApiDataResponse<Game[]>>("/games", {
    params,
  });
  const games = res.data;

  return {
    games: games.slice(0, perPage),
    hasMore: games.length > perPage,
  };
}

export async function getNestedGenres(): Promise<ParentChildrenGenre[]> {
  const res =
    await clientApiFetch<ApiDataResponse<ParentChildrenGenre[]>>("/genres");
  return res.data;
}

export async function getGenresByGameId(gameId: string): Promise<Genre[]> {
  const res = await clientApiFetch<ApiDataResponse<Genre[]>>(
    `/games/${gameId}/genres`
  );
  return res.data;
}

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  const res = await clientApiFetch<ApiDataResponse<Review[]>>(
    `/games/${gameId}/reviews`
  );
  return res.data;
};

export const getUserByReviewId = async (reviewId: string): Promise<User> => {
  const res = await clientApiFetch<ApiDataResponse<User>>(
    `/users/review-id/${reviewId}`
  );
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await clientApiFetch<ApiDataResponse<User>>(`/users/${id}`);
  return res.data;
};

export const getUserByEmail = async (email: string) => {
  const res = await clientApiFetch<ApiDataResponse<User>>(
    `/users/email/${email}`
  );
  return res.data;
};

export const getSignupStep = async (): Promise<{ step: UserSignupStep }> => {
  const res =
    await clientApiFetch<ApiDataResponse<{ step: UserSignupStep }>>(
      "/auth/signup/step"
    );
  return res.data;
};

export const getCart = async (): Promise<CartWithItems> => {
  const res = await clientApiFetch<ApiDataResponse<CartWithItems>>("/cart");
  return res.data;
};
