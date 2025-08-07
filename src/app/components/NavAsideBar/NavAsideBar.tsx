"use client";

import AsideBar from "@/components/AsideBar/AsideBar";
import { usePathname } from "next/navigation";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";
import { Suspense } from "react";
import LoadingSpinner from "@/UI/Spinner/LoadingSpinner";

export const navLinks = [
  {
    label: "Action & Adventure",
    links: [
      {
        text: "FPS Shooters",
        href: "/games/all?category=cmdmh0p7s00001v0w8svy3ndc",
      },
      {
        text: "Action RPG",
        href: "/games/all?category=cmdmh0p7s00011v0w17wip180",
      },
      {
        text: "Battle Royale",
        href: "/games/all?category=cmdmh0p7s00021v0wj85faok1",
      },
      {
        text: "Platformers",
        href: "/games/all?category=cmdmh0p7s00031v0wh566vckb",
      },
    ],
  },
  {
    label: "Strategy & Simulation",
    links: [
      {
        text: "RTS Games",
        href: "/games/all?category=cmdmh3mjn00041v0wab6zqubv",
      },
      {
        text: "City Builders",
        href: "/games/all?category=cmdmh3mjn00051v0wx804328p",
      },
      {
        text: "Turn-Based",
        href: "/games/all?category=cmdmh3mjn00061v0wehevnslc",
      },
      {
        text: "Life Simulation",
        href: "/games/all?category=cmdmh3mjn00071v0wm20bo424",
      },
    ],
  },
  {
    label: "RPG & MMO",
    links: [
      { text: "MMORPG", href: "/games/all?category=cmdmh703n00081v0wqzk4kw2c" },
      { text: "JRPG", href: "/games/all?category=cmdmh703n00091v0wip8vcrzu" },
      {
        text: "Indie RPG",
        href: "/games/all?category=cmdmh703n000a1v0w639bwhmv",
      },
      {
        text: "Tactical RPG",
        href: "/games/all?category=cmdmh703n000b1v0ws39y8kmj",
      },
    ],
  },
  {
    label: "Sports & Racing",
    links: [
      {
        text: "Racing Sims",
        href: "/games/all?category=cmdmh9ahg000c1v0wvs6hz28h",
      },
      {
        text: "Sports Games",
        href: "/games/all?category=cmdmh9ahg000d1v0wjbd660za",
      },
      {
        text: "Arcade Racing",
        href: "/games/all?category=cmdmh9ahg000e1v0wth8hkprq",
      },
      {
        text: "Fighting Games",
        href: "/games/all?category=cmdmh9ahg000f1v0w3bnyesx1",
      },
    ],
  },
  {
    label: "Indie & Casual",
    links: [
      {
        text: "Indie Games",
        href: "/games/all?category=cmdmhb2l2000g1v0wc86dpktv",
      },
      {
        text: "Puzzle Games",
        href: "/games/all?category=cmdmhb2l2000h1v0wm99zzxhn",
      },
      {
        text: "Casual Games",
        href: "/games/all?category=cmdmhb2l2000i1v0wvkdk1q91",
      },
      {
        text: "Horror Games",
        href: "/games/all?category=cmdmhb2l2000j1v0w39jf39oe",
      },
    ],
  },
];

export default function NavAsideBar() {
  const path = usePathname();

  return (
    <AsideBar>
      {(path.startsWith("/game/") || path.startsWith("/games/all")) && (
        <QuickAction />
      )}
      {path.startsWith("/games/all") && (
        <Suspense fallback={<LoadingSpinner />}>
          <GenresCheckbox />
        </Suspense>
      )}
      {(path === "/" || path.startsWith("/game/")) && <GenreNav />}
    </AsideBar>
  );
}
