import { ChildrenProp } from "@/lib/definitions";

export default function GameCardInfoWrapper({ children }: ChildrenProp) {
  return <div className="flex flex-1 flex-col p-6">{children}</div>;
}
