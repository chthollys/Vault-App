import { Button } from "@mui/material";
import { GameTitle } from "@/components/Typography";
import { GameCardWrapper } from "@/components/Wrapper";
import { FormInput, FormPasswordInput } from "@/UI/input";
import { SignInIcon } from "@/UI/icons";
import { LoadingSpinner } from "@/UI/Spinner";
import { GithubLoginButton, GoogleLoginButton } from "@/UI/buttons";
import LoginError from "./LoginError";

export default function AuthForm() {
  return (
    <GameCardWrapper className="border-glass-border static h-full w-full cursor-default overflow-visible border-[1px] border-solid px-16 py-16">
      <form action={"#"} className="flex h-max w-full flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl font-bold text-white/90">Welcome Back</h1>
          <GameTitle>Sign in to your account</GameTitle>
        </div>
        <FormInput
          label="Email"
          name="email"
          placeholder="Enter your email address"
          type="email"
        />
        <FormPasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
        <Button
          variant="contained"
          className="bg-primary! hover:bg-primary-dark! rounded-md py-3 text-[0.95rem] font-semibold normal-case"
          aria-label="Sign-in-button"
          size="large"
          startIcon={<SignInIcon />}
          loadingIndicator={
            <LoadingSpinner color="white" variant="simple" size="sm" />
          }
        >
          Sign In
        </Button>
        <GithubLoginButton>Continue with GitHub</GithubLoginButton>
        <GoogleLoginButton>Continue with Google</GoogleLoginButton>
      </form>
      <LoginError />
    </GameCardWrapper>
  );
}
