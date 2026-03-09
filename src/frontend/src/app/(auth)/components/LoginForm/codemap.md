# Codemap

## Purpose
Login card UI module used by `/login`.

## Files
- `index.tsx`: Re-export entry for `LoginForm`.
- `LoginForm.tsx`: Client login card markup (email/password fields, sign-in button, OAuth actions). Mutation wiring is currently placeholder.
- `CreateAccountNow.tsx`: Inline link to `/signup`.

## Notes
- Form currently renders UI only; auth mutation logic is not fully wired in this file.
