import type { ChildrenProp } from "@/lib/types/props";
import CartHydration from "./cart-hydration";

export default function CartLayout({ children }: ChildrenProp) {
  return <CartHydration>{children}</CartHydration>;
}
