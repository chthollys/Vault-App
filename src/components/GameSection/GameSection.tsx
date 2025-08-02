import { createContext, useContext } from "react";
import { GameSectionContextObj } from "@/lib/types/context";
import { GameSectionProps } from "@/lib/types/props";
import GameSectionHeader from "./GameSectionHeader";
import GamesGrid from "./GamesGrid";

export const GameSectionContext = createContext<GameSectionContextObj>({
  title: "",
  games: [],
  label: "",
  href: "",
});

export const useGameSectionContext = () => {
  const ctxData = useContext(GameSectionContext);
  if (!ctxData) {
    console.error(
      "Use this component children component inside its parent component (GameSection)"
    );
  }
  return ctxData;
};

export default function GameSection({
  title,
  label = "View All",
  href,
  games,
}: GameSectionProps) {
  const ctxValue: GameSectionContextObj = {
    title,
    games,
    label,
    href,
  };
  return (
    <GameSectionContext.Provider value={ctxValue}>
      <section className="mb-12" aria-labelledby={`${label}-section-title`}>
        <GameSectionHeader />

        <GamesGrid />
      </section>
    </GameSectionContext.Provider>
  );
}
