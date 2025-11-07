import { getCart } from "@/lib/db/client";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => useQuery({ queryKey: ["cart"], queryFn: getCart });

export default useCart;
