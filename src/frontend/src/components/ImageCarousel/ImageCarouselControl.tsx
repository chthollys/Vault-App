import { useCarouselContext } from "./ImageCarousel";
import { ArrowNavButton } from "@/UI/buttons";

export default function ImageCarouselControl() {
  const { isNavVisible, previousSlide, nextSlide } = useCarouselContext();
  return (
    <div
      style={{ opacity: isNavVisible ? 1 : 0 }}
      className="absolute top-[50%] left-0 z-10 flex w-full -translate-y-1/2 justify-between px-4 py-0 opacity-0 transition-[opacity_0.3s_ease-in-out]"
    >
      <ArrowNavButton onClick={previousSlide}>
        &#10094; {/* Left Arrow */}
      </ArrowNavButton>
      <ArrowNavButton onClick={nextSlide}>
        &#10095; {/* Right Arrow */}
      </ArrowNavButton>
    </div>
  );
}
