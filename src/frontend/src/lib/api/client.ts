import { clientApiFetch } from "@/lib/http/client";
import type {
  Game,
  ParentChildrenGenre,
  ApiDataResponse,
  CartWithItems,
  CartItem,
  Wishlist,
  WishlistItem,
} from "@repo/types";
import type { GamesQuery } from "@repo/types";
import { UserSignupStep } from "@/lib/types/auth";

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
  const res = await clientApiFetch<ApiDataResponse<CartItem>>(`/cart/add`, {
    method: "POST",
    json: { gameId },
  });
  return res.data;
};

export const removeCartItem = async (itemId: string) => {
  const res = await clientApiFetch<ApiDataResponse<CartItem>>(
    `/cart/remove/${itemId}`,
    { method: "DELETE" }
  );
  return res.data;
};

export const toggleCartItem = async (itemId: string) => {
  const res = await clientApiFetch<ApiDataResponse<CartItem>>(
    `/cart/toggle-check/${itemId}`,
    {
      method: "PATCH",
    }
  );
  return res.data;
};

export const getWishlist = async () => {
  const res =
    await clientApiFetch<ApiDataResponse<Wishlist>>(`/wishlist/my-list`);
  return res.data;
};

export const addWishlistItem = async (gameId: string) => {
  const res = await clientApiFetch<ApiDataResponse<WishlistItem>>(
    `/wishlist/my-list`,
    { method: "POST", json: { gameId } }
  );
  return res.data;
};

export const removeItemWishList = async (gameId: string) => {
  const res = await clientApiFetch<ApiDataResponse<WishlistItem>>(
    `/wishlist/my-list/${gameId}`,
    { method: "DELETE" }
  );
  return res.data;
};
