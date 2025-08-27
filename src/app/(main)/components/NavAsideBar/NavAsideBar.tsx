"use client";

import { AsideBar } from "@/components/AsideBar";
import { usePathname } from "next/navigation";
import { useGenres } from "@/app/hooks/useGenres";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";
import { Suspense } from "react";
import { LoadingSpinner } from "@/UI/Spinner";

export default function NavAsideBar() {
  const path = usePathname();
  const { data: genres } = useGenres();

  const noAsideBarRoute = ["/cart"];
  if (noAsideBarRoute.includes(path)) return null;

  const isGamePage = path.startsWith("/game/");
  const isGamesAll = path === "/games/all";
  const isHome = path === "/";

  return (
    <AsideBar>
      {(isGamePage || isGamesAll) && <QuickAction />}
      <Suspense fallback={<LoadingSpinner />}>
        {isGamesAll && genres && <GenresCheckbox genres={genres} />}
        {(isHome || isGamePage) && genres && <GenreNav genres={genres} />}
      </Suspense>
    </AsideBar>
  );
}
