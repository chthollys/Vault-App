"use client";

import { AsideBar } from "@/components/AsideBar";
import { usePathname } from "next/navigation";
import { useGenres } from "@/app/hooks/useGenres";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";

export default function NavAsideBar() {
  const path = usePathname();
  const { data: genres } = useGenres();

  return (
    <AsideBar>
      {(path.startsWith("/game/") || path.startsWith("/games/all")) && (
        <QuickAction />
      )}
      {path.startsWith("/games/all") && <GenresCheckbox genres={genres} />}
      {(path === "/" || path.startsWith("/game/")) && (
        <GenreNav genres={genres} />
      )}
    </AsideBar>
  );
}
