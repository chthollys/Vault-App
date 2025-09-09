"use client";

import { useRef, useEffect } from "react";
import { useGamesInfinite } from "@/app/hooks/useGamesInfinite";
import GamesGrid from "./GamesGrid";
import Loading from "@/app/loading";
import { GridButton } from "@/UI/buttons";
import type { GamesGridContainerProps } from "@/lib/types/props";

export default function GamesInfiniteGrid({
  sortRule,
  title,
}: GamesGridContainerProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGamesInfinite(sortRule);
  const games = data.pages.flatMap((p) => p.games);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <GamesGrid games={games} title={title} />

      <div ref={loadMoreRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage ? (
          <Loading />
        ) : hasNextPage ? (
          <GridButton>Scroll down to load more</GridButton>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
