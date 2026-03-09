# Codemap

## Purpose
Dynamic game detail route segment (`/game/[id]`).

## Files
- `page.tsx`: Server route entry; fetches game by ID, renders detail + review sections, and calls `notFound()` when game is missing.
- `not-found.tsx`: Custom not-found UI for invalid game IDs.

## Subdirectories
- `components`: Detail page sections (title/info/pricing/reviews/actions).
