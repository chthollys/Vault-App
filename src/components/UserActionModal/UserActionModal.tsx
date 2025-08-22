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
        avatarProps={{ src: `${iconUrl}` }}
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
                src={iconUrl ?? ""}
                isBordered
                color="default"
                className="opa h-20 w-20"
              />
              Hello, {name?.split(" ")[0]}.
            </ModalHeader>
            <ModalBody className="w-full">
              <UserModalAccordion />
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
