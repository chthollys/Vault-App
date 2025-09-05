import { LinkItem } from "@/UI/link";
import type { LinkItemProps } from "@/lib/types/props";

export default function AsideBarLink({ children, href }: LinkItemProps) {
  return (
    <LinkItem
      href={href}
      className="hover:bg-glass-hover hover:text-accent-light block rounded-sm px-3 py-2 text-sm text-white/70 no-underline transition-(--transition-fast) hover:translate-x-1"
    >
      {children}
    </LinkItem>
  );
}
