import { GamesGridProps } from "@/lib/types/props";
import GameCard from "./GameCard";

export default function GamesGrid({ games, title }: GamesGridProps) {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6"
      role="list"
      aria-label={`${title} list`}
    >
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </div>
  );
}
