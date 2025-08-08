"use client";

import { AsideBar } from "@/components/AsideBar";
import { navLinks } from "./NavAsideBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function GenresCheckbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const getCategoryValue = (href: string) => {
    return new URLSearchParams(href.split("?")[1]).get("category") || "";
  };

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

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, selectedCategories]
  );

  return (
    <AsideBar.Section label="Filter by Category">
      <AsideBar.Links>
        {navLinks.map(({ links }) =>
          links.map(({ text, href }) => {
            const categoryValue = getCategoryValue(href);
            return (
              <AsideBar.Checkbox
                key={text}
                name={text}
                label={text}
                checked={selectedCategories.includes(categoryValue)}
                onChange={() => handleCheckboxChange(categoryValue)}
              />
            );
          })
        )}
      </AsideBar.Links>
    </AsideBar.Section>
  );
}
