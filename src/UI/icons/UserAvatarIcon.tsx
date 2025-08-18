import ImageOptimized from "@/components/ImageOptimized";

interface UserAvatarIconProps {
  imageUrl?: string | null;
}

export default async function UserAvatarIcon({
  imageUrl,
}: UserAvatarIconProps) {
  return (
    <ImageOptimized
      alt="Avatar Icon"
      src={
        imageUrl ??
        "https://vault-app-bucket.s3.ap-southeast-2.amazonaws.com/default-cover/user-default.jpg"
      }
      className="w-8 rounded-md"
    />
  );
}
