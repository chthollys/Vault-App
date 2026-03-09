# Codemap

## Purpose
Signup start-step module that collects email and triggers OTP delivery.

## Files
- `index.tsx`: Re-export entry for `SignupForm`.
- `SignupForm.tsx`: Client form using `EmailSchema`, sends OTP via mutation, emits toast status, and invalidates signup-step query through `onRefresh`.
- `LoginAccountNow.tsx`: Inline link to `/login`.

## Notes
- Validation and submission are handled with `react-hook-form` + zod resolver.
