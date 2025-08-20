import Link from "next/link";

export default function CreateAccountNow() {
  return (
    <p className="w-full text-right text-xs">
      Don&apos;t have an account yet?
      <Link href={"/signup"} className="ml-1 text-blue-400 hover:underline">
        Create one now!
      </Link>
    </p>
  );
}
