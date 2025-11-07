import {
  Modal as HeroModal,
  ModalContent as HeroModalContent,
  ModalHeader as HeroModalHeader,
  ModalBody as HeroModalBody,
  ModalFooter as HeroModalFooter,
} from "@heroui/react";
import type {
  ModalProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "@heroui/react";
import cn from "@/lib/utils/cn";

function Modal({ children, className, ...props }: ModalProps) {
  return (
    <HeroModal className={cn("bg-dark-header", className)} {...props}>
      {children}
    </HeroModal>
  );
}

function ModalTitle({ children, ...props }: ModalHeaderProps) {
  return <HeroModalHeader {...props}>{children}</HeroModalHeader>;
}

function ModalContent({ children, ...props }: ModalContentProps) {
  return <HeroModalContent {...props}>{children}</HeroModalContent>;
}

function ModalBody({ children, ...props }: ModalBodyProps) {
  return <HeroModalBody {...props}>{children}</HeroModalBody>;
}

function ModalFooter({ children, ...props }: ModalFooterProps) {
  return <HeroModalFooter {...props}>{children}</HeroModalFooter>;
}

Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
