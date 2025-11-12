import { getWishlist } from "@/lib/db/client";
import { useQuery } from "@tanstack/react-query";

export const useWishlist = (enabled: true) =>
  useQuery({ queryKey: ["user", "wishlist"], queryFn: getWishlist, enabled });

export default useWishlist;
