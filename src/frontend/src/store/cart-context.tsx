import type { CartItem, CartWithItems, Game } from "@repo/types";
import { createContext, useContext, useMemo, useState } from "react";

interface CartContextObj {
  items: CartItem[];
  games: Game[];
  totalPrice: number;
}

export const CartContext = createContext<CartContextObj>({
  items: [],
  games: [],
  totalPrice: 0,
});

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("Use cart within parent context component");
  }
  return ctx;
};
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
  const [items, _] = useState<CartItem[]>(cart.items);
  const totalPrice = useMemo(() => calculateTotalPrice(items), [items]);
  const games = useMemo(() => items.map((item) => item.game), [items]);

  const ctxVal: CartContextObj = { items, games, totalPrice };
  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
