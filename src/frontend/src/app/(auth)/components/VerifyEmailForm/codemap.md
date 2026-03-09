# Codemap

## Purpose
OTP verification step for signup progression.

## Files
- `index.tsx`: Re-export entry for `VerifyEmailForm`.
- `VerifyEmailForm.tsx`: Client OTP form with schema validation, verify mutation, toast messaging, and signup-step refresh callback.
- `InputOtp.tsx`: Styled wrapper around HeroUI `InputOtp`.

## Notes
- Form submission calls `verifyOtp`.
- On success it refreshes the signup-step query so flow can advance to password setup.
