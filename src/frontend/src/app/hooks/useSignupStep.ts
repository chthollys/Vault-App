import { getSignupStep } from "@/lib/api/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SIGNPSTEP_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useSignupStep = () => {
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: getSignupStep,
  });
  return data.step;
};

export default useSignupStep;
