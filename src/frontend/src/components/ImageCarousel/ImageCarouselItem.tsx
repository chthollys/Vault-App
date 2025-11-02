import Image from "@/components/ImageOptimized";
import Link from "next/link";
import type { ImageCarouselItemProps } from "@/lib/types/props";
import { useCarouselContext } from "./ImageCarousel";
import { useMemo } from "react";

export default function ImageCarouselItem({
  image,
  href,
  children,
}: ImageCarouselItemProps) {
  const { length } = useCarouselContext();
  const itemWidth = useMemo(() => Math.floor(100 / length), [length]); // in percentage

  return (
    <div style={{ width: `${itemWidth}%` }} className={`relative h-full`}>
      <Link
        href={href}
        className="block h-full w-full text-inherit no-underline"
      >
        <div className="relative h-full">
          <Image
            src={image}
            alt={"Carousel Image"}
            preload
            draggable={false}
            className="h-full w-full object-cover"
          />
          {children}
        </div>
      </Link>
    </div>
  );
}
