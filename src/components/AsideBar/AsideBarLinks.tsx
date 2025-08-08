import type { LinkListProps } from "@/lib/types/props";
import { LinkList } from "@/UI/link";

export default function AsideBarLinks({ children }: LinkListProps) {
  return <LinkList className="m-0 list-none p-0">{children}</LinkList>;
}
