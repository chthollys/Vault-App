# Codemap

## Purpose
Final signup step module to create and confirm account password.

## Files
- `index.tsx`: Re-export entry for `SetPasswordForm`.
- `SetPasswordForm.tsx`: Client form with zod/react-hook-form validation, debounced password-rule checks, password submit mutation, toast feedback, then redirect to `/`.

## Notes
- Uses `PasswordSchema` and `setPassword` mutation.
- Reads current user after success to personalize success toast.
