"use client";

import AsideBar from "@/components/AsideBar/AsideBar";
import { navLinks } from "./NavAsideBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function GenresCheckbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const getCategoryValue = (href: string) => {
    return new URLSearchParams(href.split("?")[1]).get("category") || "";
  };

  useEffect(() => {
    const categoriesFromUrl = searchParams.get("category");
    if (categoriesFromUrl) {
      setSelectedCategories(categoriesFromUrl.split(","));
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const handleCheckboxChange = (categoryValue: string) => {
    const newSelected = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter((c) => c !== categoryValue)
      : [...selectedCategories, categoryValue];

    console.log(newSelected);
    setSelectedCategories(newSelected);

    const params = new URLSearchParams(searchParams);
    if (newSelected.length > 0) {
      params.set("category", newSelected.join(","));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

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
