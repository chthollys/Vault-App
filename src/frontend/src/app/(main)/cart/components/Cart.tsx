"use client";

import { useGames } from "@/app/hooks/useGames";
import CartItem from "./CartItem";

export default function Cart() {
  const { data: games } = useGames();

  return (
    <div className="w-full min-w-[48rem]">
      <ul className="flex w-full flex-col gap-4">
        {games.map((game) => (
          <li key={game.id}>
            <CartItem game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
}
