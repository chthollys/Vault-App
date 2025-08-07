import type { GamesGridProps } from "@/lib/types/props";
import GameCard from "./GameCard";
import Wrapper from "../Wrapper/base/Wrapper";
import { memo } from "react";

const GamesGrid = memo(function GamesGrid({ games, title }: GamesGridProps) {
  if (!games) {
    return <p>Failed to fetch games</p>;
  }

  return (
    <Wrapper
      as="div"
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6"
      role="list"
      aria-label={`${title ?? "games"} list`}
    >
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </Wrapper>
  );
});

export default GamesGrid;
