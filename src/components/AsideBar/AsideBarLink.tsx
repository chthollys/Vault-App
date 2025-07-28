import LinkItem from "@/UI/LinkSection/LinkItem";
import { LinkItemProps } from "@/lib/definitions";

export default function AsideBarLink({ children, href }: LinkItemProps) {
  return <LinkItem href={href}>{children}</LinkItem>;
}
