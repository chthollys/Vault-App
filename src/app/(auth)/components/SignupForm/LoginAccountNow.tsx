import Link from "next/link";

export default function LoginAccountNow() {
  return (
    <p className="w-full text-right text-[0.8rem] text-white/70">
      Already have an account?
      <Link href={"/login"} className="ml-1 text-blue-400 hover:underline">
        Login now!
      </Link>
    </p>
  );
}
