export enum UserSignupStep {
  Start,
  VerifyOtp,
  SetPassword,
  Done,
}
export interface UserSignupState {
  step: UserSignupStep;
  email?: string;
}
