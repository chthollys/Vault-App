import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChildrenProp } from "@/lib/definitions";
import { useCarouselContext } from "./ImageCarousel";
import { useMemo } from "react";

export interface ImageCarouselItemProps extends ChildrenProp {
  image: StaticImageData | string;
  href: string;
}

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
            fill
            priority
            draggable={false}
            className="object-cover"
          />
          {children}
        </div>
      </Link>
    </div>
  );
}
