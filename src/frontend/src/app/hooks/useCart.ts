import { getCart } from "@/lib/db/client";
import { useQuery } from "@tanstack/react-query";

export const useCart = (enabled = true) =>
  useQuery({ queryKey: ["user", "cart"], queryFn: getCart, enabled });

export default useCart;
