import { auth } from "@/auth";
import { LoginForm } from "../components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/?notice=is-logged-in");
  }

  return (
    <div className="m-auto w-full max-w-lg">
      <LoginForm />
    </div>
  );
}
