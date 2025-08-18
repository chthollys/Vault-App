import type { ChildrenProp } from "@/lib/types/props";

export default function FormTitle({ children }: ChildrenProp) {
  return <h1 className="text-4xl font-bold text-white/90">{children}</h1>;
}
