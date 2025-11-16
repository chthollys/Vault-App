"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import { IoExitOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/auth-client";
import { CURRENTUSER_BASEQUERYKEY as queryKey } from "@/lib/constants";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    mutationKey: ["logout"],
    onError: () => {
      toast.error("Something went wrong with logging out.");
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
      toast.success("Logged out successful");
      router.refresh();
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <Button
      variant="light"
      startContent={isPending ? undefined : <IoExitOutline size={30} />}
      size="lg"
      isLoading={isPending}
      isDisabled={isPending}
      onPress={handleLogout}
    >
      {isPending ? undefined : "Logout"}
    </Button>
  );
}
