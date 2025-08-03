import Link from "next/link";
import { SectionTitle } from "@/components/Typography";
import PurpleButton from "@/UI/buttons/PurpleButton";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <SectionTitle>Game Not Found</SectionTitle>
      <p className="mt-2 text-base text-white/70">
        Sorry, the game you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6">
        <PurpleButton>Go Back to Home</PurpleButton>
      </Link>
    </div>
  );
}