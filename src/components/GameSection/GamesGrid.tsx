import { useContext } from "react";
import GameCard from "./GameCard";
import { GameSectionContext } from "./GameSection";
import classes from "./GameSection.module.css";

export default function GamesGrid() {
  const { title, games } = useContext(GameSectionContext);
  return (
    <div
      className={classes["game-container"]}
      role="list"
      aria-label={`${title} list`}
    >
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </div>
  );
}
