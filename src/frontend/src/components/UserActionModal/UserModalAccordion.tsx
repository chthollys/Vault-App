"use client";

import { AccordionItem, Accordion } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { AiFillNotification } from "react-icons/ai";
import { BadgedIcon } from "@/UI/icons";

const accordionItems = [
  {
    key: "cart",
    title: "Cart",
    icon: <FaCartArrowDown size={20} />,
  },
  {
    key: "event",
    title: "Event and promotion",
    icon: <AiFillNotification size={20} />,
  },
  {
    key: "notification",
    title: "Notification",
    icon: <IoNotifications size={20} />,
  },
];

export default function UserModalAccordion() {
  const [hiddenBadges, setHiddenBadges] = useState<Record<string, boolean>>({});

  const handleHideBadge = (key: string) => {
    setHiddenBadges((prev) => ({ ...prev, [key]: true }));
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
          onPress={() => handleHideBadge(item.key)}
          classNames={{
            trigger: "cursor-pointer",
          }}
        ></AccordionItem>
      ))}
    </Accordion>
  );
}
