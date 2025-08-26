"use client";

import { Select, SelectItem, type SharedSelection } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const items = [
  { key: "newest", label: "Newest" },
  { key: "popular", label: "Most Popular" },
  { key: "lowest-price", label: "Lowest Price" },
  { key: "highest-price", label: "Highest Price" },
];

export default function Selections() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedKey, setSelectedKey] = useState<string>(
    searchParams.get("sortBy") || "newest"
  );

  useEffect(() => {
    const current = searchParams.get("sortBy") || "newest";
    setSelectedKey(current);
  }, [searchParams]);

  const handleChange = (keys: SharedSelection) => {
    const selectedKeyString =
      typeof keys === "string" || typeof keys === "number"
        ? String(keys)
        : String(Array.from(keys)[0] ?? "newest");

    setSelectedKey(selectedKeyString);

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", selectedKeyString);
    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex min-w-52 items-center gap-2 md:min-w-80">
      <Select
        label="Sort by"
        labelPlacement="outside-left"
        className="w-44 min-w-36 flex-col items-start gap-2 md:w-full md:max-w-72 md:flex-row md:items-center"
        classNames={{
          label: "text-white text-sm font-medium",
        }}
        selectedKeys={[selectedKey]}
        onSelectionChange={handleChange}
        disabled={isPending}
      >
        {items.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
