import Link from "next/link";
import { ChildrenProps } from "~/lib/definitions";

export interface AsideBarLinkProps extends ChildrenProps {
  href: string;
}

export default function AsideBarLink({ href, children }: AsideBarLinkProps) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}
