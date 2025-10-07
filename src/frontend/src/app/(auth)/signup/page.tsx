import { UserSignupStep } from "@/lib/types/auth";
import SignupFlow from "../components/SignupFlow";

export default async function AuthPage() {
  return (
    <>
      <SignupFlow initialStep={UserSignupStep.Start} />
    </>
  );
}
