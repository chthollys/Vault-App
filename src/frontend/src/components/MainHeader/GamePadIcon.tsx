"use client";

import { GiGamepad } from "react-icons/gi";
import { motion, type Variants } from "motion/react";

const MotionWrapper = motion.span;

interface GamePadIconAnimatedProps {
  isAnimate?: boolean;
}

const animatingVariants: Variants = {
  start: {
    scale: [1, 1.25, 1],
    rotate: [0, 0, -35, 35, -25, 25, -17.5, 17.5, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
  stop: {
    rotate: [0, -35],
    x: [0, -5],
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export default function GamePadIconAnimated({
  isAnimate = true,
}: GamePadIconAnimatedProps) {
  return (
    <MotionWrapper
      variants={animatingVariants}
      animate={isAnimate ? "start" : "stop"}
      className="mr-1 inline-flex"
    >
      <GiGamepad size={35} />
    </MotionWrapper>
  );
}
