import type { CartItem, CartWithItems } from "@repo/types";
import { createContext, useMemo, useState } from "react";

interface CartContextObj {
  cart: CartWithItems | null;
  items: CartItem[];
  totalPrice: number;
}

export const CartContext = createContext<CartContextObj>({
  cart: null,
  items: [],
  totalPrice: 0,
});

interface CartContextProviderProps {
  cart: CartWithItems;
  children: React.ReactNode;
}

export const calculateTotalPrice = (items: CartItem[]) => {
  let result = 0;
  items
    .filter((item) => item.isChecked)
    .forEach((item) => (result += item.game.price));
  return result;
};

export function CartContextProvider({
  cart,
  children,
}: CartContextProviderProps) {
  const [items, setItems] = useState<CartItem[]>(cart.items);
  const totalPrice = useMemo(() => calculateTotalPrice(items), [items]);

  const ctxVal: CartContextObj = { cart, items, totalPrice };
  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
