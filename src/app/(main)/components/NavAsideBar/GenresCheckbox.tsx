"use client";

import Loading from "@/app/(main)/loading";
import { AsideBar } from "@/components/AsideBar";
import type { GenresCheckboxProps } from "@/lib/types/props";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useTransition } from "react";

export default function GenresCheckbox({ genres }: GenresCheckboxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll("category");
    if (categoriesFromUrl) {
      setSelectedCategories(categoriesFromUrl);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const handleCheckboxChange = useCallback(
    (categoryValue: string) => {
      const newSelected = selectedCategories.includes(categoryValue)
        ? selectedCategories.filter((c) => c !== categoryValue)
        : [...selectedCategories, categoryValue];

      setSelectedCategories(newSelected);

      const params = new URLSearchParams(searchParams);
      params.delete("category");

      if (newSelected.length > 0) {
        newSelected.forEach((category) => {
          params.append("category", category);
        });
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams, selectedCategories]
  );

  return (
    <AsideBar.Section label="Filter by Category">
      {isPending && <Loading />}
      <AsideBar.Links>
        {genres.map(({ subGenres }) =>
          subGenres.map(({ id, name }) => {
            return (
              <AsideBar.Checkbox
                key={id}
                name={name}
                label={name}
                checked={selectedCategories.includes(id)}
                onChange={() => handleCheckboxChange(id)}
                disabled={isPending}
              />
            );
          })
        )}
      </AsideBar.Links>
    </AsideBar.Section>
  );
}
