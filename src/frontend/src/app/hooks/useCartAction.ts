import { addCartItem, removeCartItem } from "@/lib/db/client";
import { getQueryClient } from "@/lib/utils/get-query-client";
import type { CartWithItems } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCartAction = () => {
  const queryClient = getQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["cart"] });

  const cancelQuery = () => queryClient.cancelQueries({ queryKey: ["cart"] });

  const add = useMutation({
    mutationFn: addCartItem,
    onSuccess: (data) => {
      toast.success(`${data.game.title} added to cart`);
    },
    onSettled: invalidate,
  });

  const remove = useMutation({
    mutationFn: removeCartItem,
    onMutate: async (itemId) => {
      await cancelQuery();
      const prev = queryClient.getQueryData<CartWithItems>(["cart"]);
      if (prev) {
        queryClient.setQueryData<CartWithItems>(["cart"], {
          ...prev,
          items: prev.items.filter((item) => item.id !== itemId),
        });
      }
      return { prev };
    },
    onSuccess: (data) => {
      toast.success(`${data.game.title} removed from cart`);
    },
    onError: (_err, _vars, ctx) => {
      ctx?.prev && queryClient.setQueryData<CartWithItems>(["cart"], ctx.prev);
    },
    onSettled: invalidate,
  });

  return { add, remove };
};

export default useCartAction;
