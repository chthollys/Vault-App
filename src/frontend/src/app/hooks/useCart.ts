import { getCart } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { CART_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useCart = (enabled = true) =>
  useQuery({ queryKey, queryFn: getCart, enabled, retry: 2 });

export default useCart;
