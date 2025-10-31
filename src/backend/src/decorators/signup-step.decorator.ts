import { SetMetadata } from "@nestjs/common";
import { SIGNUP_STEPS } from "utils/constants";
import { UserSignupStep } from "src/auth/interfaces/signup-state";

export const SignupStep = (step: UserSignupStep) =>
  SetMetadata(SIGNUP_STEPS, step);
