"use client";

import { useGames } from "@/app/hooks/useGames";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useFilter } from "@react-aria/i18n";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";
import ImageOptimized from "../ImageOptimized";
import { formatToUSD } from "@/lib/utils";

export default function SearchBar() {
  const { data: games } = useGames();
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    setInputValue("");
    inputRef.current?.blur();
  }, [pathname]);

  return (
    <>
      <Autocomplete
        ref={inputRef}
        startContent={<MdManageSearch size={35} />}
        placeholder="Start searching your games"
        radius="full"
        menuTrigger="input"
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={handleSelection}
        defaultFilter={() => true}
        aria-label="search-bar"
      >
        {matchedGames.map((game) => (
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
        ))}
      </Autocomplete>
    </>
  );
}
