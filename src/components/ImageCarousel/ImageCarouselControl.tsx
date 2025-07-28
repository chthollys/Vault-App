import classes from "./ImageCarouselControl.module.css";
import { useCarouselContext } from "./ImageCarousel";

export default function ImageCarouselControl() {
  const { isNavVisible, previousSlide, nextSlide } = useCarouselContext();
  return (
    <div
      style={{ opacity: isNavVisible ? 1 : 0 }}
      className={classes["carousel-controls"]}
    >
      <button onClick={previousSlide} className={classes["carousel-button"]}>
        &#10094; {/* Left Arrow */}
      </button>
      <button onClick={nextSlide} className={classes["carousel-button"]}>
        &#10095; {/* Right Arrow */}
      </button>
    </div>
  );
}
