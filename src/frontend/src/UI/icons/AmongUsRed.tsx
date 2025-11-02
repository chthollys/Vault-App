import ImageOptimized from "@/components/ImageOptimized";
import { ImageElementProps } from "@/lib/types/props";

export default function AmoungUsRed({
  className = "w-full",
}: Pick<ImageElementProps, "className">) {
  return (
    <ImageOptimized
      className={className}
      src={
        "https://vault-app-bucket.s3.ap-southeast-2.amazonaws.com/default-cover/default-game-not-found.svg"
      }
      alt="game-not-found icon"
      loading="eager"
    />
  );
}
