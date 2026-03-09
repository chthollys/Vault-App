# Codemap

## Purpose
Primary storefront route group. Handles home page, game list/detail routes, cart area, and shared shell layout.

## Route Surface
- `/` from `page.tsx`
- `/games` from `games/page.tsx` (redirects)
- `/games/all` from `games/all/page.tsx`
- `/game/[id]` from `game/[id]/page.tsx`
- `/cart` from `cart/page.tsx`

## Key Files
- `layout.tsx`: Shared shell with header/footer, sidebar, `Hydration`, and main grid scaffold.
- `page.tsx`: Home route rendering `HomePage` inside suspense.
- `games/page.tsx`: Redirect route to `/games/all`.

## Subdirectories
- `components`: Home and sidebar composition components.
- `game`: Dynamic game detail route tree.
- `games`: Games listing route tree.
- `cart`: Cart route tree with its own hydration layer.
