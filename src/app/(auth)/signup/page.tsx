import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignupForm from "../components/SignupForm/SignupForm";

export default async function SignupPage() {
  const session = await auth();

  if (session) {
    redirect("/?warning=is-logged-in");
  }

  return (
    <div className="m-auto mt-12 w-full max-w-4xl">
      <SignupForm />
    </div>
  );
}
