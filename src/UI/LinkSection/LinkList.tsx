import { LinkListProps } from "@/lib/types/props";

export default function LinkList({ className, children }: LinkListProps) {
  return <ul className={className}>{children}</ul>;
}
