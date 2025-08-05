import Image, { type ImageProps } from "next/image";

export default function ImageOptimized({
  src,
  alt,
  className,
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      width={0}
      height={0}
      sizes="100vw"
      className={className}
    />
  );
}
