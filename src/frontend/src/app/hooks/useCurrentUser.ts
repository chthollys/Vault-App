import { getCurrentUser } from "@/lib/auth-client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CURRENTUSER_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useCurrentUser = () => {
  return useSuspenseQuery({
    queryKey,
    queryFn: getCurrentUser,
  });
};

export default useCurrentUser;
