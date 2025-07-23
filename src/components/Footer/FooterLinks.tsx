import { ChildrenProp } from "~/lib/definitions";

export default function FooterLinks({ children }: ChildrenProp) {
  return <div className="footer-links">{children}</div>;
}
