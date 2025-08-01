import GameCard from "./GameCard";
import { useGameSectionContext } from "./GameSection";

export default function GamesGrid() {
  const { title, games } = useGameSectionContext();
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
