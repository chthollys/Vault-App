import { Exclude, Expose } from "class-transformer";
import type { UserSignupStep } from "src/auth/interfaces/signup-state";
import type { UserSignupState } from "src/auth/interfaces/signup-state";

export class UserSignupStepDto implements UserSignupState {
  @Expose()
  step: UserSignupStep;

  @Exclude()
  email?: string | undefined;
}
