import type { FooterLinkProps } from "@/lib/types/props";
import Link from "next/link";

export default function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-accent-light text-[0.95rem] text-white/70 no-underline transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
