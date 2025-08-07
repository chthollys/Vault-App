"use client";

import AsideBar from "@/components/AsideBar/AsideBar";
import { usePathname } from "next/navigation";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";

export const navLinks = [
  {
    label: "Action & Adventure",
    links: [
      { text: "FPS Shooters", href: "/games/all?category=fps" },
      { text: "Action RPG", href: "/games/all?category=action-rpg" },
      { text: "Battle Royale", href: "/games/all?category=battle-royale" },
      { text: "Platformers", href: "/games/all?category=platformers" },
    ],
  },
  {
    label: "Strategy & Simulation",
    links: [
      { text: "RTS Games", href: "/games/all?category=rts" },
      { text: "City Builders", href: "/games/all?category=city-builders" },
      { text: "Turn-Based", href: "/games/all?category=turn-based" },
      { text: "Life Simulation", href: "/games/all?category=life-sim" },
    ],
  },
  {
    label: "RPG & MMO",
    links: [
      { text: "MMORPG", href: "/games/all?category=mmorpg" },
      { text: "JRPG", href: "/games/all?category=jrpg" },
      { text: "Indie RPG", href: "/games/all?category=indie-rpg" },
      { text: "Tactical RPG", href: "/games/all?category=tactical-rpg" },
    ],
  },
  {
    label: "Sports & Racing",
    links: [
      { text: "Racing Sims", href: "/games/all?category=racing-sims" },
      { text: "Sports Games", href: "/games/all?category=sports" },
      { text: "Arcade Racing", href: "/games/all?category=arcade-racing" },
      { text: "Fighting Games", href: "/games/all?category=fighting" },
    ],
  },
  {
    label: "Indie & Casual",
    links: [
      { text: "Indie Games", href: "/games/all?category=indie" },
      { text: "Puzzle Games", href: "/games/all?category=puzzle" },
      { text: "Casual Games", href: "/games/all?category=casual" },
      { text: "Horror Games", href: "/games/all?category=horror" },
    ],
  },
];

export default function InnerNavAsideBar() {
  const path = usePathname();

  return (
    <AsideBar>
      {(path.startsWith("/game/") || path.startsWith("/games/all")) && (
        <QuickAction />
      )}
      {path.startsWith("/games/all") && <GenresCheckbox />}
      {(path === "/" || path.startsWith("/game/")) && <GenreNav />}
    </AsideBar>
  );
}
