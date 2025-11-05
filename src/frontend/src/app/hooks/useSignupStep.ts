import { getSignupStep } from "@/lib/db/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSignupStep = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["signup-step"],
    queryFn: getSignupStep,
  });
  return data.step;
};
