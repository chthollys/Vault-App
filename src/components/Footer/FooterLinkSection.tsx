import Link from "next/link";
import { ChildrenProp } from "@/lib/types/props";

export interface FooterLinkSectionProps extends ChildrenProp {
  label: string;
}

export default function FooterLinkSection({}) {
  return (
    <>
      <h4>Legal</h4>
      <ul>
        <li>
          <Link href={"#"} className="privacy-policy">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href={"#"}>Terms of Service</Link>
        </li>
        <li>
          <Link href={"#"}>Refund Policy</Link>
        </li>
      </ul>
    </>
  );
}
