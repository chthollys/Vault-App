import { GithubLoginButton, GoogleLoginButton } from "@/UI/buttons";

export default function OAuthActionButtons() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <GithubLoginButton>Continue with GitHub</GithubLoginButton>
      <GoogleLoginButton>Continue with Google</GoogleLoginButton>
    </div>
  );
}
