"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import { IoExitOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/auth";

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
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
      startContent={<IoExitOutline size={30} />}
      size="lg"
      isLoading={isPending}
      isDisabled={isPending}
      onPress={handleLogout}
    >
      Logout
    </Button>
  );
}
