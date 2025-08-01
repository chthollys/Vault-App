import Link from "next/link";
import { LinkItemProps } from "@/lib/definitions";

export default function LinkItem({ href, className, children }: LinkItemProps) {
  return (
    <li className="mb-2">
      <Link href={href} className={className ?? ""}>
        {children}
      </Link>
    </li>
  );
}
