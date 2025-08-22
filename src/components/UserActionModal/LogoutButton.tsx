"use client";

import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import { IoExitOutline } from "react-icons/io5";

export default function LogoutButton() {
  return (
    <Button
      variant="light"
      startContent={<IoExitOutline size={30} />}
      size="lg"
      onPress={() => signOut()}
    >
      Logout
    </Button>
  );
}
