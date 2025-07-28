import classes from "./ImageCarouselItemOverlay.module.css";

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
    <div className={classes["featured-overlay"]}>
      {(label || title || content) && (
        <div className="max-w-[600px] text-white">
          {label && <div className={classes["featured-badge"]}>{label}</div>}
          {title && <h2 className={classes["featured-title"]}>{title}</h2>}

          <div className="flex items-center gap-4">
            {content && (
              <span className={classes["featured-price"]}>{content}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
