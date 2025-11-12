import { addCartItem, removeCartItem, toggleCartItem } from "@/lib/db/client";
import { getQueryClient } from "@/lib/utils/get-query-client";
import type { CartWithItems } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCartAction = () => {
  const queryClient = getQueryClient();

  const queryKey = ["user", "cart"];

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const cancelQuery = () => queryClient.cancelQueries({ queryKey });

  const setQueryData = (data: CartWithItems) =>
    queryClient.setQueryData<CartWithItems>(queryKey, data);

  const getPrevQueryData = () =>
    queryClient.getQueryData<CartWithItems>(queryKey);

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
      const prev = getPrevQueryData();
      if (prev) {
        setQueryData({
          ...prev,
          items: prev.items.filter((item) => item.id !== itemId),
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

  const toggle = useMutation({
    mutationFn: toggleCartItem,
    onMutate: async (itemId) => {
      await cancelQuery();
      const prev = getPrevQueryData();
      if (prev) {
        const updatedItems = prev.items.map((item) =>
          item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
        );
        setQueryData({ ...prev, items: updatedItems });
      }

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.prev && setQueryData(ctx.prev);
      toast.error("Something went wrong, please wait and try again");
    },
    onSettled: invalidate,
  });

  return { add, remove, toggle };
};

export default useCartAction;
