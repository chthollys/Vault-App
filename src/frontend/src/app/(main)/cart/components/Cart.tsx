"use client";

import { useGames } from "@/app/hooks/useGames";
import CartItem from "./CartItem";
import { useContext, useMemo } from "react";
import { CartContext } from "@/store/cart-context";

export default function Cart() {
  const { items } = useContext(CartContext);
  const { data: games } = useGames();

  const gameMap = useMemo(
    () => new Map(games?.map((game) => [game.id, game])),
    [games]
  );

  const cartedGames = items.map((item) => {
    const game = gameMap.get(item.gameId);
    if (!game) return;
    return { item, game };
  });

  return (
    <div className="w-full min-w-[48rem]">
      <ul className="flex w-full flex-col gap-4">
        {cartedGames.map((cartItem) => (
          <li key={cartItem?.item.id}>
            <CartItem game={cartItem?.game} item={cartItem?.item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
