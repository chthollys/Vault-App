import { ChildrenProp } from "@/lib/types/props";

export default function FooterLinks({ children }: ChildrenProp) {
  return <div className="footer-links">{children}</div>;
}
