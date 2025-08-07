import type { GamesGridProps } from "@/lib/types/props";
import GameCard from "./GameCard";
import Wrapper from "../Wrapper/base/Wrapper";

export default function GamesGrid({ games, title }: GamesGridProps) {
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
}
