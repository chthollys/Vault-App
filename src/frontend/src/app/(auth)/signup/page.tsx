import { getSignupStep } from "@/app/actions/db.action";
import SignupFlow from "../components/SignupFlow";

export default async function AuthPage() {
  const { step } = await getSignupStep();

  return (
    <>
      <SignupFlow initialStep={step} />
    </>
  );
}
