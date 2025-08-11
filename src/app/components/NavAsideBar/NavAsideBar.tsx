"use client";

import { AsideBar } from "@/components/AsideBar";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/UI/Spinner";
import { useGenres } from "@/app/hooks/useGenres";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";

export default function NavAsideBar() {
  const path = usePathname();
  const { data: genres, isPending, isError, error } = useGenres();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!genres || isError) {
    throw error;
  }

  return (
    <AsideBar>
      {(path.startsWith("/game/") || path.startsWith("/games/all")) && (
        <QuickAction />
      )}
      {path.startsWith("/games/all") && (
        <Suspense fallback={<LoadingSpinner />}>
          <GenresCheckbox genres={genres} />
        </Suspense>
      )}
      {(path === "/" || path.startsWith("/game/")) && (
        <GenreNav genres={genres} />
      )}
    </AsideBar>
  );
}
