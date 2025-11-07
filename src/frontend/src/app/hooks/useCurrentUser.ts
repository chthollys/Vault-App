import { getCurrentUser } from "@/lib/auth-client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
};

export default useCurrentUser;
