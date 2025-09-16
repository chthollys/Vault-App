export type SignupState = {
  ok: boolean;
  message: string;
  email?: string;
};

export enum UserSignupStep {
  Start,
  VerifyOtp,
  SetPassword,
  Done,
}
