"use client";

import { createContext } from "react";
import { GameSectionContextObj, GameSectionProps } from "@/lib/definitions";
import GameSectionHeader from "./GameSectionHeader";
import GamesGrid from "./GamesGrid";
import classes from "./GameSection.module.css";

export const GameSectionContext = createContext<GameSectionContextObj>({
  title: "",
  games: [],
  label: "",
  href: "",
});

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
      <section
        className={classes["game-sections"]}
        aria-labelledby={`${label}-section-title`}
      >
        <GameSectionHeader />

        <GamesGrid />
      </section>
    </GameSectionContext.Provider>
  );
}
