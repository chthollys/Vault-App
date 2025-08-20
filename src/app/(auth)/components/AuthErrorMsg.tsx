"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FormErrorMsg() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const errorType = searchParams.get("error");
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    setModalRoot(document.getElementById("modal"));
  }, []);

  useEffect(() => {
    if (errorType) {
      onOpen();
    }
  }, [errorType, onOpen, router]);

  const handleClose = useCallback(() => {
    onClose();
    router.replace(pathname);
  }, [onClose, router, pathname]);

  if (!modalRoot) return null;

  let errorMsg = "Something went wrong.";

  if (errorType) {
    switch (errorType) {
      case "signup-first": {
        errorMsg = "Please sign up to register your email for OTP code.";
        break;
      }
      default: {
        break;
      }
    }
  }

  return createPortal(
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Oops ...</ModalHeader>
          <ModalBody>{errorMsg}</ModalBody>
          <ModalFooter>
            <Button className="bg-primary" onPress={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("modal")!
  );
}
