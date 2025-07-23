"use client";

import { createContext } from "react";
import { GameSectionContextObj, GameSectionProps } from "~/lib/definitions";

import GameSectionHeader from "./GameSectionHeader";
import GamesGrid from "./GamesGrid";
import classes from "./GameSection.module.css";
import { DUMMY_GAMES } from "~/lib/data";

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
}: GameSectionProps) {
  const ctxValue: GameSectionContextObj = {
    title,
    games: DUMMY_GAMES,
    label,
    href,
  };
  return (
    <GameSectionContext.Provider value={ctxValue}>
      <section
        className={classes["game-sections"]}
        aria-labelledby="recommended-title"
      >
        <GameSectionHeader />

        <GamesGrid />
      </section>
    </GameSectionContext.Provider>
  );
}
