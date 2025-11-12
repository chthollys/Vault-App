"use server";

import { serverApiFetch } from "@/lib/http/server";
import { UserSignupStep } from "@/lib/types/auth";
import type {
  ApiDataResponse,
  Game,
  Genre,
  ParentChildrenGenre,
  Review,
  User,
  GamesQuery,
  Cart,
  CartWithItems,
} from "@repo/types";

export async function getGames(sortRule?: GamesQuery | null) {
  const res = await serverApiFetch<ApiDataResponse<Game[]>>("/games", {
    params: { ...sortRule },
  });
  return res.data;
}

export async function getGame(id: string) {
  const res = await serverApiFetch<ApiDataResponse<Game>>(`/games/${id}`);
  return res.data;
}

export async function getGamesPaginated(
  sortRule: GamesQuery | null | undefined,
  page: number,
  perPage: number
) {
  const params: GamesQuery = { ...sortRule, limit: perPage, page };
  const res = await serverApiFetch<ApiDataResponse<Game[]>>("/games", {
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
    await serverApiFetch<ApiDataResponse<ParentChildrenGenre[]>>("/genres");
  return res.data;
}

export async function getGenresByGameId(gameId: string) {
  const res = await serverApiFetch<ApiDataResponse<Genre[]>>(
    `/games/${gameId}/genres`
  );
  return res.data;
}

export const getReviewsByGameId = async (gameId: string) => {
  const res = await serverApiFetch<ApiDataResponse<Review[]>>(
    `/games/${gameId}/reviews`
  );
  return res.data;
};

export const getUserByReviewId = async (reviewId: string) => {
  const res = await serverApiFetch<ApiDataResponse<User>>(
    `/users/review-id/${reviewId}`
  );
  return res.data;
};

export const getSignupStep = async () => {
  const res =
    await serverApiFetch<ApiDataResponse<{ step: UserSignupStep }>>(
      "/auth/signup/step"
    );
  return res.data;
};

export const getCartByUserId = async (userId: string) => {
  const res = await serverApiFetch<ApiDataResponse<Cart>>(
    `/cart/user/${userId}`
  );
};

export const getCart = async () => {
  const res = await serverApiFetch<ApiDataResponse<CartWithItems>>("/cart");
  return res.data;
};
