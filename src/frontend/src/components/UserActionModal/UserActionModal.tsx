"use client";

import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  User,
} from "@heroui/react";
import type { UserActionModalProps } from "@/lib/types/props";
import UserModalAccordion from "./UserModalAccordion";
import UserActionModalWrapper from "./UserActionModalWrapper";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { DEFAULT_AVATAR_IMG } from "@/lib/utils/constants";

export default function UserActionModal({
  name,
  email,
  iconUrl,
}: UserActionModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <User
        name={name}
        description={email}
        avatarProps={{ src: `${iconUrl ?? DEFAULT_AVATAR_IMG}` }}
        onClick={onOpen}
        className="hover:cursor-pointer"
      />
      <UserActionModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="flex flex-col items-center overflow-hidden">
          <>
            <ModalHeader className="flex flex-col items-center gap-3">
              <Avatar
                src={iconUrl ?? DEFAULT_AVATAR_IMG}
                isBordered
                color="default"
                className="opa h-20 w-20"
              />
              Hello, {name ? name?.split(" ")[0] : email?.split("@")[0]}
            </ModalHeader>

            <ModalBody className="flex w-full flex-col items-center">
              <UserModalAccordion />
              <LogoutButton />
            </ModalBody>

            <ModalFooter className="w-full items-center justify-center text-xs">
              <Link href={"#"} className="hover:underline">
                Privacy & Policy
              </Link>
              <span className="text-[4px]">●</span>
              <Link href={"#"} className="hover:underline">
                Terms of Service
              </Link>
            </ModalFooter>
          </>
        </ModalContent>
      </UserActionModalWrapper>
    </>
  );
}
