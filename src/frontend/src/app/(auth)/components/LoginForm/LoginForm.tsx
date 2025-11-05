"use client";

import {
  FormTitle,
  GameDeveloper,
  GameTitle,
  GlassLine,
} from "@/components/Typography";
import { GameCardWrapper } from "@/components/Wrapper";
import { FormInput, FormPasswordInput } from "@/UI/input";
import CreateAccountNow from "./CreateAccountNow";
import OAuthActionButtons from "../OAuthActionButtons";
import { SignInButton } from "@/UI/buttons";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  // const {} = useMutation();
  return (
    <GameCardWrapper className="border-glass-border static h-full w-full cursor-default overflow-visible border-[1px] border-solid px-16 py-16">
      <form action={"#"} className="flex h-max w-full flex-col gap-6">
        <div className="flex flex-col gap-4 text-center">
          <FormTitle>Welcome Back</FormTitle>
          <GameTitle>Sign in to your account</GameTitle>
        </div>
        <FormInput
          label="Email"
          name="email"
          placeholder="Enter your email address"
          type="email"
          required
          aria-required
        />
        <FormPasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          required
          aria-required
        />
        <SignInButton aria-label="Sign-in-button" type="submit">
          Sign In
        </SignInButton>
        <CreateAccountNow />
        <GlassLine>
          <GameDeveloper className="mx-2 text-nowrap text-white/70">
            or with
          </GameDeveloper>
        </GlassLine>

        <OAuthActionButtons />
      </form>
    </GameCardWrapper>
  );
}
