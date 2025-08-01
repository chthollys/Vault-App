import {
  PurpleBadge,
  FeaturedTitle,
  FeaturedPriceSpan,
} from "@/components/Typography";

interface ImageCarouselItemOverlayProps {
  label?: string | number;
  title?: string | number;
  content?: string | number;
}

export default function ImageCarouselItemOverlay({
  label,
  title,
  content,
}: ImageCarouselItemOverlayProps) {
  return (
    <div className="absolute right-0 bottom-0 left-0 z-2 flex h-[60%] w-full items-end bg-[linear-gradient(to_top,_rgba(0,_0,_0,_0.9)_0%,_rgba(0,_0,_0,_0.65)_30%,_rgba(0,_0,_0,_0.25)_75%,_transparent_100%)] p-8 transition-(--transition-normal)">
      {(label || title || content) && (
        <div className="max-w-[600px] text-white">
          {label && <PurpleBadge>{label}</PurpleBadge>}
          {title && <FeaturedTitle className="mb-6">{title}</FeaturedTitle>}

          <div className="flex items-center gap-4">
            {content && <FeaturedPriceSpan>{content}</FeaturedPriceSpan>}
          </div>
        </div>
      )}
    </div>
  );
}
