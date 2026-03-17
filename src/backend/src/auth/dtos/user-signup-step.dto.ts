import { Exclude, Expose } from "class-transformer";
import type { UserSignupStep } from "src/auth/interfaces/signup-state";
import type { UserSignupState } from "src/auth/interfaces/signup-state";
import { ApiProperty } from "@nestjs/swagger";
import { UserSignupStep as UserSignupStepEnum } from "src/auth/interfaces/signup-state";

export class UserSignupStepDto implements UserSignupState {
  @ApiProperty({ enum: UserSignupStepEnum })
  @Expose()
  step: UserSignupStep;

  @Exclude()
  email?: string | undefined;
}
