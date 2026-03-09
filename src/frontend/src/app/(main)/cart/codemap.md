# Codemap

## Purpose
Cart route segment (`/cart`) with dedicated query hydration and login-gated checkout display.

## Files
- `layout.tsx`: Wraps cart pages in `CartHydration`.
- `cart-hydration.tsx`: Prefetches cart query state and exposes hydrated cache.
- `page.tsx`: Client page; loads current user and cart, renders checkout or login-required empty state.

## Subdirectories
- `components`: Cart title and checkout table module.
