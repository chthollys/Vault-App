"use client";

import { Select, SelectItem, type SharedSelection } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { key: "newest", label: "Newest" },
  { key: "popular", label: "Most Popular" },
  { key: "lowest-price", label: "Lowest Price" },
  { key: "highest-price", label: "Highest Price" },
];

export default function Selections() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    router.replace(`?${params.toString()}`);
  };

  return (
    <Select
      label="Sort by"
      labelPlacement="outside-left"
      className="max-w-xs"
      classNames={{
        label: "text-white text-sm font-medium",
      }}
      selectedKeys={[selectedKey]} // controlled
      onSelectionChange={handleChange}
    >
      {items.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
}
