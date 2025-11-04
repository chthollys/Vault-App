"use client";

import { AccordionItem, Accordion } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { AiFillNotification } from "react-icons/ai";
import { BadgedIcon } from "@/UI/icons";
import { useRouter } from "next/navigation";

const accordionItems = [
  {
    key: "cart",
    title: "Cart",
    route: "/cart",
    icon: <FaCartArrowDown size={20} />,
  },
  {
    key: "event",
    title: "Event and promotion",
    route: "/",
    icon: <AiFillNotification size={20} />,
  },
  {
    key: "notification",
    title: "Notification",
    route: "/",
    icon: <IoNotifications size={20} />,
  },
];

interface UserModalAccordionProps {
  onClose: () => void;
}

export default function UserModalAccordion({
  onClose,
}: UserModalAccordionProps) {
  const [hiddenBadges, setHiddenBadges] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleOnPress = (key: string, route: string) => {
    onClose();
    router.push(route);
    // setHiddenBadges((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <Accordion>
      {accordionItems.map((item) => (
        <AccordionItem
          key={item.key}
          title={item.title}
          aria-label={item.title}
          startContent={
            <BadgedIcon icon={item.icon} isInvisible={hiddenBadges[item.key]} />
          }
          indicator={<IoIosArrowForward />}
          onPress={() => handleOnPress(item.key, item.route)}
          classNames={{
            trigger: "cursor-pointer",
          }}
        ></AccordionItem>
      ))}
    </Accordion>
  );
}
