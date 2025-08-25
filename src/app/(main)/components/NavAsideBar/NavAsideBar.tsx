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

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AsideBar>
        {(path.startsWith("/game/") || path.startsWith("/games/all")) && (
          <QuickAction />
        )}
        {path.startsWith("/games/all") && <GenresCheckbox genres={genres} />}
        {(path === "/" || path.startsWith("/game/")) && (
          <GenreNav genres={genres} />
        )}
      </AsideBar>
    </Suspense>
  );
}
