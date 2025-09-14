export enum UserSignupStep {
  Start,
  VerifyOtp,
  SetPassword,
  Done,
}
export type UserSignupState = { step: UserSignupStep; email?: string };
