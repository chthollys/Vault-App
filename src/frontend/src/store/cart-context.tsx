import type { CartItem, CartWithItems } from "@repo/types";
import { createContext, useState } from "react";

interface CartContextObj {
  cart: CartWithItems | null;
  items: CartItem[];
}

export const CartContext = createContext<CartContextObj>({
  cart: null,
  items: [],
});

interface CartContextProviderProps {
  cart: CartWithItems;
  children: React.ReactNode;
}

export function CartContextProvider({
  cart,
  children,
}: CartContextProviderProps) {
  const [items, setItems] = useState<CartItem[]>(cart.items);
  const ctxVal: CartContextObj = { cart, items };
  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
