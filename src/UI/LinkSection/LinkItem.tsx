import Link from "next/link";
import { LinkItemProps } from "~/lib/definitions";

export default function LinkItem({ href, children }: LinkItemProps) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}
