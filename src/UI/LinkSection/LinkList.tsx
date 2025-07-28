import { LinkListProps } from "@/lib/definitions";

export default function LinkList({ className, children }: LinkListProps) {
  return <ul className={className}>{children}</ul>;
}
