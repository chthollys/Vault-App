import { getWishlist } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { WISHLIST_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useWishlist = (enabled: true) =>
  useQuery({ queryKey, queryFn: getWishlist, enabled });

export default useWishlist;
