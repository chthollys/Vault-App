import { auth } from "@/app/actions/auth";
import AuthForm from "../components/AuthForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/?notice=is-logged-in");
  }

  return (
    <div className="w-full max-w-lg">
      <AuthForm />
    </div>
  );
}
