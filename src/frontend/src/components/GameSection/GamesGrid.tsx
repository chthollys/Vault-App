"use client";

import type { GamesGridProps } from "@/lib/types/props";
import Link from "next/link";
import GameCard from "./GameCard";
import { SectionTitle } from "../Typography";
import { PurpleButton } from "@/UI/buttons";
import { AmoungUsRed } from "@/UI/icons";
import useCart from "@/app/hooks/useCart";
import { useMemo } from "react";
import useCartAction from "@/app/hooks/useCartAction";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useWishlist from "@/app/hooks/useWishlist";
import useWishlistAction from "@/app/hooks/useWishlistAction";
import { toast } from "react-toastify";

export default function GamesGrid({ games, title }: GamesGridProps) {
  const { data: user } = useCurrentUser();
  const { data: cart } = useCart(!!user);
  const { data: wishlist } = useWishlist(!!user);
  const {
    remove: { mutate: removeFromcart },
    add: { mutate: addToCart },
  } = useCartAction();

  const {
    add: { mutate: addWish },
    remove: { mutate: removeWish },
  } = useWishlistAction();

  const cartedGameIds = useMemo(
    () => (user ? new Set(cart?.items.map((item) => item.gameId)) : null),
    [cart, user]
  );

  const wishedGameIds = useMemo(
    () => (user ? new Set(wishlist?.items.map((item) => item.gameId)) : null),
    [user, wishlist]
  );

  const handleToggleCartItem = (gameId: string) => {
    if (cartedGameIds) {
      if (cartedGameIds.has(gameId)) removeFromcart(gameId);
      else addToCart(gameId);
      return;
    }
    toast.info("Please login to add game to your cart");
  };

  const handleToggleWishlistItem = (gameId: string) => {
    if (wishedGameIds) {
      if (wishedGameIds.has(gameId)) removeWish(gameId);
      else addWish(gameId);
      return;
    }
    toast.info("Please login to add game to your wishlist");
  };

  if (!games || games.length < 1) {
    return (
      <div className="mx-auto flex w-fit flex-col items-center gap-4">
        <AmoungUsRed />
        <SectionTitle>Games not found</SectionTitle>
        <Link href={"/games/all"} className="underline">
          <PurpleButton className="text-xl">Back to all games</PurpleButton>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6"
      role="list"
      aria-label={`${title ?? "games"} list`}
    >
      {games.map((game, index) => (
        <GameCard
          key={index}
          game={game}
          isInCart={cartedGameIds?.has(game.id)}
          isInWishlist={wishedGameIds?.has(game.id)}
          onToggleWishList={handleToggleWishlistItem}
          onToggleCartItem={handleToggleCartItem}
        />
      ))}
    </div>
  );
}
