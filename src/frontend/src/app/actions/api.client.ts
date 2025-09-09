import axiosClient from "@/lib/axios-client";
import type {
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
  const gamesQuery: GamesQuery = { ...sortRule, limit: perPage, page };
  const games = (
    await axiosClient<Game[]>({ url: "/games", params: { ...gamesQuery } })
  ).data;

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
