"use client";

import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { motion } from "motion/react";
import ImageCarouselItem from "./ImageCarouselItem";
import ImageCarouselItemOverlay from "./ImageCarouselItemOverlay";
import { ChildrenProp } from "@/lib/types/props";
import ImageCarouselControl from "./ImageCarouselControl";

export interface ImageCarouselProps extends ChildrenProp {
  length: number;
}

export interface ImageCarouselContextObj {
  length: number;
  isNavVisible: boolean;
  nextSlide: () => void;
  previousSlide: () => void;
}

export const ImageCarouselContext = createContext<ImageCarouselContextObj>({
  length: 0,
  isNavVisible: false,
  nextSlide: () => {},
  previousSlide: () => {},
});

export const useCarouselContext = () => {
  const ctxData = useContext(ImageCarouselContext);
  if (!ctxData) {
    console.error(
      "Use this component children component inside its parent component (ImageCarousel)"
    );
  }
  return ctxData;
};

export default function ImageCarousel({
  children,
  length,
}: ImageCarouselProps) {
  const [state, setState] = useState({ index: 0, isNavVisible: false });

  const nextSlide = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      index: (prevState.index + 1) % length,
    }));
  }, [length]);

  const previousSlide = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      index: (prevState.index - 1 + length) % length,
    }));
  }, [length]);

  const toggleNav = (state: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isNavVisible: state,
    }));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const ctxValue: ImageCarouselContextObj = {
    length,
    isNavVisible: state.isNavVisible,
    nextSlide,
    previousSlide,
  };

  return (
    <ImageCarouselContext.Provider value={ctxValue}>
      <div
        className="bg-glass backdrop-blur-glass-strong border-glass shadow-glass relative mb-12 h-[400px] overflow-hidden rounded-[1.5rem] border-[1px] border-solid"
        onMouseOver={() => toggleNav(true)}
        onMouseLeave={() => toggleNav(false)}
      >
        <div className={`relative h-full overflow-hidden`}>
          <motion.div
            className="flex h-full"
            style={{ width: `${length * 100}%` }}
            animate={{ x: `-${state.index * (100 / length)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </div>
        <ImageCarouselControl />
      </div>
    </ImageCarouselContext.Provider>
  );
}

ImageCarousel.Item = ImageCarouselItem;
ImageCarousel.Overlay = ImageCarouselItemOverlay;
