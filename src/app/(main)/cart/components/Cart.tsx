"use client";

import { useGames } from "@/app/hooks/useGames";
import CartItem from "./CartItem";

export default function Cart() {
  const { data: games } = useGames();

  return (
    <div className="w-full">
      <ul className="flex w-full flex-col gap-3">
        {games.map((game) => (
          <li key={game.id}>
            <CartItem game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
}
