import { LoginForm } from "../components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // const session = await auth();

  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="m-auto w-full max-w-lg">
      <LoginForm />
    </div>
  );
}
