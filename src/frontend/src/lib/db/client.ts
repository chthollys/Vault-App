import { clientApiFetch } from "@/lib/http/client";
import { ApiRequestError } from "@/lib/http/common";
import type {
  Game,
  ParentChildrenGenre,
  ApiDataResponse,
  CurrentUserSession,
  ApiError,
  CartWithItems,
  CartItem,
} from "@repo/types";
import type { GamesQuery } from "@repo/types";
import { UserSignupStep } from "@/lib/types/auth";

export async function getCurrentUserSession() {
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

export async function getGames(sortRule?: GamesQuery | null) {
  const res = await clientApiFetch<ApiDataResponse<Game[]>>("/games", {
    params: { ...sortRule },
  });
  return res.data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
) {
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

export async function getNestedGenres() {
  const res =
    await clientApiFetch<ApiDataResponse<ParentChildrenGenre[]>>("/genres");
  return res.data;
}

export const getSignupStep = async () => {
  const res =
    await clientApiFetch<ApiDataResponse<{ step: UserSignupStep }>>(
      "/auth/signup/step"
    );
  return res.data;
};

export const getCart = async () => {
  const res = await clientApiFetch<ApiDataResponse<CartWithItems>>("/cart");
  return res.data;
};

export const addCartItem = async (gameId: string) => {
  const res = await clientApiFetch<ApiDataResponse<CartItem>>(
    `/cart/add/${gameId}`
  );
  return res.data;
};

export const removeCartItem = async (itemId: string) => {
  const res = await clientApiFetch<ApiDataResponse<CartItem>>(
    `/cart/remove/${itemId}`
  );
  return res.data;
};
