import { getCurrentUser } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return data;
};
