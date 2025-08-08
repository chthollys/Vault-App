import Link from "next/link";
import type { LinkItemProps } from "@/lib/types/props";

export default function LinkItem({ href, className, children }: LinkItemProps) {
  return (
    <li className="mb-2">
      <Link href={href} className={className ?? ""}>
        {children}
      </Link>
    </li>
  );
}
