import type { UserActionModalWrapperProps } from "@/lib/types/props";
import { Modal } from "@heroui/react";

export default function UserActionModalWrapper({
  isOpen,
  onClose,
  onOpenChange,
  children,
}: UserActionModalWrapperProps) {
  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{
        base: "fixed top-2 right-0 border-glass-border shadow-glass bg-nav-bar border-b-[1px] border-solid rounded-3xl",
        closeButton: "absolute top-2 right-4 hover:bg-white/10",
      }}
      shouldBlockScroll={false}
      backdrop="transparent"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0,
            },
          },
        },
      }}
    >
      {children}
    </Modal>
  );
}
