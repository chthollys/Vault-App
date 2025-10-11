"use client";

import { useGames } from "@/app/hooks/useGames";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useFilter } from "@react-aria/i18n";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";
import ImageOptimized from "../ImageOptimized";
import { formatToUSD } from "@/lib/utils";
import { GiGamepad } from "react-icons/gi";

export default function SearchBar() {
  // Get all the prefetched game
  const { data: games } = useGames();
  const router = useRouter();

  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const { contains } = useFilter({ sensitivity: "base" });

  const debouncedInputValue = useDebounce(inputValue, 300) ?? "";
  const normalizedInput = debouncedInputValue.replace(/\s+/g, " ").trim();

  const matchedGames =
    normalizedInput === ""
      ? []
      : games.filter((game) => contains(game.title, normalizedInput));

  const handleSelection = (key: React.Key | null) => {
    if (key) {
      router.push(`/game/${key}`);
    }
  };

  // Handle blur focus when navigating other route
  useEffect(() => {
    setInputValue("");
    inputRef.current?.blur();
  }, [pathname]);

  return (
    <>
      <Autocomplete
        ref={inputRef}
        variant="underlined"
        startContent={<GiGamepad size={35} className="mr-1" />}
        placeholder="Start searching your games"
        radius="full"
        menuTrigger="input"
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={handleSelection}
        defaultFilter={() => true}
        aria-label="search-bar"
        selectorIcon={<></>}
      >
        {inputValue ? (
          matchedGames.map((game) => (
            <AutocompleteItem key={game.id} textValue={game.title}>
              <div className="flex h-fit w-full gap-4 overflow-hidden">
                <div className="h-12 w-24">
                  <ImageOptimized
                    src={game.coverImageUrl}
                    alt={"game-image"}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1 overflow-hidden">
                  <p className="truncate">{game.title}</p>
                  <p>{formatToUSD(game.price)}</p>
                </div>
              </div>
            </AutocompleteItem>
          ))
        ) : (
          <></>
        )}
      </Autocomplete>
    </>
  );
}
