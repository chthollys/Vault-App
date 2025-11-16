import { addWishlistItem, removeItemWishList } from "@/lib/api/client";
import { getQueryClient } from "@/lib/utils/get-query-client";
import type { Wishlist } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { WISHLIST_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useWishlistAction = () => {
  const queryClient = getQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const cancelQuery = () => queryClient.cancelQueries({ queryKey });

  const setQueryData = (data: Wishlist) =>
    queryClient.setQueryData<Wishlist>(queryKey, data);

  const getPrevQueryData = () => queryClient.getQueryData<Wishlist>(queryKey);

  const add = useMutation({
    mutationFn: addWishlistItem,
    onMutate: async (gameId) => {
      await cancelQuery();
      const prev = getPrevQueryData();
      if (prev) {
        const alreadyInWishlist = prev.items.some(
          (item) => item.gameId === gameId
        );

        if (!alreadyInWishlist) {
          setQueryData({
            ...prev,
            items: [
              ...prev.items,
              {
                id: `temp-${gameId}`,
                wishlistId: prev.id,
                gameId,
                addedAt: new Date(),
              },
            ],
          });
        }
      }
      return { prev };
    },
    onSuccess: () => {
      toast.success(`Added to wishlist`);
    },
    onError: (_err, _gameId, ctx) => {
      ctx?.prev && setQueryData(ctx.prev);
      toast.error("Something went wrong, please wait and try again");
    },
    onSettled: invalidate,
  });

  const remove = useMutation({
    mutationFn: removeItemWishList,
    onMutate: async (gameId) => {
      await cancelQuery();
      const prev = getPrevQueryData();
      if (prev) {
        setQueryData({
          ...prev,
          items: [...prev.items].filter((item) => item.gameId !== gameId),
        });
      }
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.prev && setQueryData(ctx.prev);
      toast.error("Something went wrong, please wait and try again");
    },
    onSettled: invalidate,
  });

  return { add, remove };
};

export default useWishlistAction;
