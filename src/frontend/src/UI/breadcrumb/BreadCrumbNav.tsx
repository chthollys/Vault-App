"use client";

import { BreadcrumbsNavProps } from "@/lib/types/props";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { usePathname } from "next/navigation";

const labelMap: Record<string, string> = {
  store: "Store",
  game: "Game",
  games: "Games",
  cart: "My Cart",
};

export default function BreadcrumbsNav({ currentLabel }: BreadcrumbsNavProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // '/dashboard/blog' => ['dashboard', 'blog']

  const crumbs = [
    { href: "/", label: "Home" },
    ...segments.map((segment, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      let label =
        labelMap[segment] ?? decodeURIComponent(segment).replace(/-/g, " ");
      if (i === segments.length - 1 && currentLabel) {
        label = currentLabel;
      }
      return { href, label };
    }),
  ];

  return (
    <Breadcrumbs role="breadcrumb-navigation" aria-label="Breadcrumb">
      {crumbs.map((crumb) => (
        <BreadcrumbItem key={crumb.href} href={crumb.href}>
          {crumb.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
