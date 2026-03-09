# Codemap

## Purpose
Shared auth UI composition layer. Holds reusable header/buttons and the signup step orchestrator.

## Key Files
- `Header.tsx`: Sticky top nav with brand link to home.
- `SignupFlow.tsx`: Client flow controller switching between Signup, OTP verify, and Set Password forms using signup-step query state.
- `OAuthActionButtons.tsx`: GitHub/Google CTA buttons.

## Subdirectories
- `LoginForm`: Login form + helper link exports.
- `SignupForm`: Start step (email submission + OTP send).
- `VerifyEmailForm`: OTP verification input and submit flow.
- `SetPasswordForm`: Final password setup form.
